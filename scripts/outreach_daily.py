#!/usr/bin/env python3
import argparse
import csv
import fcntl
import os
import subprocess
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import quote, urlparse

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account


ROOT = Path(os.environ.get("COLOR_DICE_ROOT", Path(__file__).resolve().parents[1]))
INPUT = Path(os.environ.get("COLOR_DICE_OUTREACH_INPUT", ROOT / "output/outreach/color-dice/drafts/clean.csv"))
PUBLISH_ROOT = Path(os.environ.get("COLOR_DICE_OUTREACH_OUTPUT", ROOT / "output/outreach/color-dice/publish"))
PUBLISHER = Path("/Users/reyn/.codex/skills/seo-comment-outreach/scripts/semi_auto_comment_publish.py")
SERVICE_ACCOUNT = Path(os.environ.get("COLOR_DICE_SHEETS_CREDENTIALS", "/Users/reyn/Desktop/data/独立开发/toon-tone/gsc-ga4-auth/gsc-ga4-agent-service-account.json"))
SPREADSHEET_ID = "1_mSEY-sbLVwU0vRF0KnhoLlxL9enHyDGZU_eWN5I00Q"
SUCCESS_STATUSES = {"submitted", "manual_submitted"}


def host(url):
    value = (urlparse(url).hostname or "").lower()
    return value[4:] if value.startswith("www.") else value


def read_logs(day):
    successes = {}
    successful_hosts = set()
    attempted_rows = set()
    attempts_by_host = defaultdict(set)
    for path in PUBLISH_ROOT.rglob("publish-log-color-dice-*.csv"):
        with path.open(newline="", encoding="utf-8") as handle:
            for row in csv.DictReader(handle):
                source_host = host(row.get("source_url", "")) or row.get("source_host", "")
                row_id = row.get("row_index", "")
                status = row.get("status", "")
                if status in SUCCESS_STATUSES:
                    successful_hosts.add(source_host)
                    if row.get("time", "").startswith(day):
                        successes.setdefault(source_host, row.get("source_url", ""))
                elif status and status != "quit" and row_id:
                    attempted_rows.add(row_id)
                    attempts_by_host[source_host].add(row_id)
    return successes, successful_hosts, attempted_rows, attempts_by_host


def sheet_session():
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT,
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    return AuthorizedSession(credentials)


def sync_sheet(day, urls):
    title = f"color-dice {day}"
    session = sheet_session()
    base = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}"
    response = session.get(base, params={"fields": "properties.title,sheets.properties"})
    response.raise_for_status()
    titles = {item["properties"]["title"] for item in response.json().get("sheets", [])}
    if title not in titles:
        response = session.post(
            f"{base}:batchUpdate",
            json={"requests": [{"addSheet": {"properties": {"title": title, "gridProperties": {"rowCount": 100, "columnCount": 1, "frozenRowCount": 1}}}}]},
        )
        response.raise_for_status()
    range_name = quote(f"'{title}'!A1:A1000", safe="")
    response = session.post(f"{base}/values/{range_name}:clear", json={})
    response.raise_for_status()
    values = [["url"]] + [[url] for url in urls if url]
    range_name = quote(f"'{title}'!A1", safe="")
    response = session.put(
        f"{base}/values/{range_name}",
        params={"valueInputOption": "RAW"},
        json={"range": f"'{title}'!A1", "majorDimension": "ROWS", "values": values},
    )
    response.raise_for_status()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", type=int, default=20)
    args = parser.parse_args()
    PUBLISH_ROOT.mkdir(parents=True, exist_ok=True)
    lock_path = PUBLISH_ROOT / "daily.lock"
    with lock_path.open("w") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print("Another outreach run is active.")
            return 0

        day = date.today().isoformat()
        out_dir = PUBLISH_ROOT / day
        out_dir.mkdir(parents=True, exist_ok=True)
        with INPUT.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.DictReader(handle))

        successes, successful_hosts, attempted_rows, attempts_by_host = read_logs(day)
        sync_sheet(day, list(successes.values()))
        print(f"Starting {day}: {len(successes)}/{args.target} successful domains")
        if len(successes) >= args.target:
            return 0

        for row_number, row in enumerate(rows, 1):
            row_id = row.get("global_row_index", "") or str(row_number)
            source_host = host(row.get("url", ""))
            if source_host in successful_hosts or row_id in attempted_rows or len(attempts_by_host[source_host]) >= 3:
                continue
            command = [
                sys.executable,
                str(PUBLISHER),
                "--input", str(INPUT),
                "--website", "https://xn--80ahqbfrbqm.com/",
                "--name", "Color Dice Roller",
                "--email", "reyn@gmail.com",
                "--default-action", "s",
                "--no-prompt",
                "--rows", str(row_number),
                "--batch-id", f"color-dice-{day}-{row_id}",
                "--out-dir", str(out_dir),
                "--log-prefix", "publish-log-color-dice",
                "--screenshot-prefix", "color-dice-row",
                "--group-by-source-host",
                "--max-attempts-per-host", "3",
                "--screenshot-policy", "failures",
            ]
            subprocess.run(command, cwd=ROOT, check=False)
            successes, successful_hosts, attempted_rows, attempts_by_host = read_logs(day)
            sync_sheet(day, list(successes.values()))
            print(f"Progress {day}: {len(successes)}/{args.target} successful domains")
            if len(successes) >= args.target:
                return 0
        print(f"Candidate pool exhausted at {len(successes)}/{args.target} successful domains.")
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
