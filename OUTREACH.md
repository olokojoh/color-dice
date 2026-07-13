# Outreach Automation

The comment-outreach campaign promotes `https://xn--80ahqbfrbqm.com/` using the current `seo-comment-outreach` skill scripts.

## Source and campaign files

- Google Sheet: `外链宣发成功 URL 汇总库` (`1_mSEY-sbLVwU0vRF0KnhoLlxL9enHyDGZU_eWN5I00Q`)
- Source tabs read: `toon-tone 2026-05-19` and `toon-tone 2026-06-11`
- Imported records: 531 rows, 509 unique URLs
- Live scan result: 450 usable comment pages
- Priority domain source: `/Users/reyn/Downloads/toon-tone.app-Top sites linking to this page-2026-07-13.csv` (147 domains, ordered by the export's link count)
- Priority discovery result: 345 article URLs found; live scanning retained 76 comment pages across 35 priority domains
- Installed combined queue: 526 pages across 346 domains, with the 76 priority pages first
- Generated campaign data: `output/outreach/color-dice/`
- Daily result tab: `color-dice YYYY-MM-DD`, one `url` column, successful source URLs only

The generated campaign data and publish logs are intentionally ignored by Git. The source sheet is the reusable upstream URL library.

`scripts/discover_outreach_urls.py` reads the priority export at domain level, follows each site's robots and sitemap files, and emits actual article URLs. Those URLs still pass through the shared skill's live comment-form scan before entering the installed queue.

## Daily policy

`scripts/outreach_daily.py` runs unattended and auto-submits article-aware English comments. It processes the full pending pool during the 00:00-09:00 window, with domains from the priority export first. A `submitted` or `manual_submitted` result permanently completes that source domain across all dates, so every remaining page on that domain is skipped. It allows at most three distinct failed page attempts per source domain and never retries a row already logged.

The runner synchronizes the daily success tab after every successful attempt. The existing service account `gsc-ga4-agent@ace-charter-465315-g3.iam.gserviceaccount.com` has writer access to the sheet. The repository script defaults to the existing credential, while the launch agent uses a mode-`600` copy in its private runtime directory.

## Schedule and operations

macOS launch agent `com.olokojoh.color-dice-outreach` starts daily at 00:00 Asia/Shanghai. The runner stops starting new domains at 09:00. Its installed runtime, campaign CSV, priority-domain CSV, credentials, and logs are under `~/Library/Application Support/color-dice-outreach/` because macOS blocks background launch agents from Desktop by default.

Manual run:

```bash
/Users/reyn/Desktop/data/独立开发/toon-tone/gsc-ga4-auth/.venv/bin/python scripts/outreach_daily.py --end-hour 9
```

Inspect the task:

```bash
launchctl print gui/$(id -u)/com.olokojoh.color-dice-outreach
```

Disable the task:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.olokojoh.color-dice-outreach.plist
```
