#!/usr/bin/env python3
import argparse
import csv
import gzip
import re
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlparse


USER_AGENT = "Mozilla/5.0 (compatible; ColorDiceOutreach/1.0)"
SKIP_PATH_PARTS = {"author", "category", "feed", "page", "tag", "wp-json"}


def normalize_host(value):
    value = value.strip().lower()
    parsed = urlparse(value if "://" in value else f"https://{value}")
    host = parsed.hostname or ""
    return host[4:] if host.startswith("www.") else host


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=10) as response:
        data = response.read(3_000_000)
        if response.headers.get("Content-Encoding") == "gzip" or url.endswith(".gz"):
            data = gzip.decompress(data)
        return data


def post_candidate(url, domain):
    parsed = urlparse(url)
    current_host = normalize_host(parsed.hostname or "")
    if current_host != domain and not current_host.endswith(f".{domain}"):
        return False
    parts = [part.lower() for part in parsed.path.split("/") if part]
    return bool(parts) and not any(part in SKIP_PATH_PARTS for part in parts)


def discover_domain(domain, per_domain):
    sitemap_urls = [f"https://{domain}/wp-sitemap.xml", f"https://{domain}/sitemap.xml"]
    try:
        robots = fetch(f"https://{domain}/robots.txt").decode("utf-8", "ignore")
        sitemap_urls = re.findall(r"(?im)^sitemap:\s*(\S+)", robots) + sitemap_urls
    except Exception:
        pass

    queue = list(dict.fromkeys(sitemap_urls))
    visited = set()
    candidates = []
    while queue and len(visited) < 8 and len(candidates) < per_domain:
        sitemap_url = queue.pop(0)
        if sitemap_url in visited:
            continue
        visited.add(sitemap_url)
        try:
            root = ET.fromstring(fetch(sitemap_url))
        except Exception:
            continue
        locations = [node.text.strip() for node in root.iter() if node.tag.rsplit("}", 1)[-1] == "loc" and node.text]
        for location in locations:
            path = urlparse(location).path.lower()
            if path.endswith((".xml", ".xml.gz")):
                if location not in visited:
                    queue.append(location)
            elif post_candidate(location, domain) and location not in candidates:
                candidates.append(location)
                if len(candidates) >= per_domain:
                    break
    return domain, candidates or [f"https://{domain}/"]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--per-domain", type=int, default=3)
    parser.add_argument("--workers", type=int, default=16)
    args = parser.parse_args()

    with args.input.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    domains = []
    for row in rows:
        domain = normalize_host(row.get("Site", ""))
        if domain and domain not in domains:
            domains.append(domain)

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        results = dict(executor.map(lambda domain: discover_domain(domain, args.per_domain), domains))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["url", "priority_domain", "priority_rank"])
        writer.writeheader()
        for rank, domain in enumerate(domains, 1):
            for url in results[domain]:
                writer.writerow({"url": url, "priority_domain": domain, "priority_rank": rank})
    print(f"domains: {len(domains)}")
    print(f"urls: {sum(len(urls) for urls in results.values())}")
    print(f"output: {args.output}")


if __name__ == "__main__":
    raise SystemExit(main())
