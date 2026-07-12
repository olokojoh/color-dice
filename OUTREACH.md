# Outreach Automation

The comment-outreach campaign promotes `https://xn--80ahqbfrbqm.com/` using the current `seo-comment-outreach` skill scripts.

## Source and campaign files

- Google Sheet: `外链宣发成功 URL 汇总库` (`1_mSEY-sbLVwU0vRF0KnhoLlxL9enHyDGZU_eWN5I00Q`)
- Source tabs read: `toon-tone 2026-05-19` and `toon-tone 2026-06-11`
- Imported records: 531 rows, 509 unique URLs
- Live scan result: 450 usable comment pages
- Generated campaign data: `output/outreach/color-dice/`
- Daily result tab: `color-dice YYYY-MM-DD`, one `url` column, successful source URLs only

The generated campaign data and publish logs are intentionally ignored by Git. The source sheet is the reusable upstream URL library.

## Daily policy

`scripts/outreach_daily.py` runs unattended and auto-submits article-aware English comments. It stops as soon as the current day reaches 20 unique successful domains (`submitted` or `manual_submitted`). It allows at most three distinct page attempts per source domain and never retries a row already logged.

The runner synchronizes the daily success tab after every successful attempt. The existing service account `gsc-ga4-agent@ace-charter-465315-g3.iam.gserviceaccount.com` has writer access to the sheet. The repository script defaults to the existing credential, while the launch agent uses a mode-`600` copy in its private runtime directory.

## Schedule and operations

macOS launch agent `com.olokojoh.color-dice-outreach` runs daily at 09:30 Asia/Shanghai and once when loaded. Its installed runtime, campaign CSV, credentials, and logs are under `~/Library/Application Support/color-dice-outreach/` because macOS blocks background launch agents from Desktop by default.

Manual run:

```bash
/Users/reyn/Desktop/data/独立开发/toon-tone/gsc-ga4-auth/.venv/bin/python scripts/outreach_daily.py --target 20
```

Inspect the task:

```bash
launchctl print gui/$(id -u)/com.olokojoh.color-dice-outreach
```

Disable the task:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.olokojoh.color-dice-outreach.plist
```
