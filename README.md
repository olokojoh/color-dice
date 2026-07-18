# Колор Дайс / Color Dice

Bilingual static web game for the Russian keyword group `колор дайс` and the English keyword group `color dice roller`. The Russian homepage remains the main site at `/`; a native English version lives at `/en/`. Both pages share the same game behavior while serving language-specific interface copy, metadata, structured content, and SEO text.

## Run Locally

The site has no build step or runtime dependency. Serve the repository root so directory URLs resolve to their `index.html` files:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/` for Russian or `http://127.0.0.1:4173/en/` for English.

## Architecture

- `index.html`: complete homepage HTML, game interface, Russian SEO content, metadata, FAQ, and JSON-LD.
- `en/index.html`: native English game interface and SEO page targeting `color dice roller` and `roll color dice online`.
- `styles.css`: reference-style game UI, responsive layouts, six themes, article pages, and local font declarations.
- `app.js`: language-aware game copy plus random rolls, overlays, scratch interaction, themes, sound, saved results, background canvas, keyboard/fullscreen controls, and test hooks.
- `pravila/index.html`: indexable rules page targeting `правила Колор Дайс`.
- `kak-igrat/index.html`: indexable HowTo page targeting `как играть в Колор Дайс`.
- `o-proekte/`, `kontakty/`, `privacy/`, `terms/`: Russian trust pages marked `noindex, follow`.
- `en/about/`, `en/contact/`, `en/privacy/`, `en/terms/`: matching English trust pages marked `noindex, follow`.
- `robots.txt` and `sitemap.xml`: discovery files. The sitemap includes the four indexable URLs.
- `assets/`: local fonts with their OFL license notice, favicon, and separate 1200x630 Russian and English Open Graph images.
- `output/`: local browser, game-client, and Lighthouse verification artifacts. It is not required at runtime.

All public SEO content is present in the original HTML response. JavaScript only adds interaction. The game is available as soon as the page opens, and the crawlable content remains readable without JavaScript. Reciprocal `ru`/`en` hreflang links connect the two homepage versions, while `/` remains `x-default`.

This is pre-rendered static HTML, equivalent to SSG for search engines. It is not runtime backend SSR, but it is also not a client-rendered shell: crawlers receive titles, descriptions, headings, body copy, links, FAQ content, and JSON-LD directly in the first response.

## Game State

The game uses `crypto.getRandomValues` and selects every die independently from six colors. Preferences and history stay in localStorage:

- `kolor_dais_theme`
- `kolor_dais_sound`
- `kolor_dais_roll_count`
- `kolor_dais_last_result`

There is no server API, account system, analytics, or advertising code. The privacy pages explain the disclosures and consent work required before AdSense is enabled.

Automated game clients can read `window.render_game_to_text()` and advance the background animation with `window.advanceTime(ms)`.

## Production

The intended production origin and all canonical URLs are `https://xn--80ahqbfrbqm.com/` (`колордайс.com`). The public source repository is `https://github.com/olokojoh/color-dice`.

Production uses the Cloudflare Pages project `color-dice`, linked to the repository's `main` branch. The project has no build command and publishes the repository root (`/`). Every push to `main` triggers a production deployment; pull requests receive preview deployments. The generated Pages hostname is `https://color-dice-4uo.pages.dev`.

The Cloudflare zone is active with `terry.ns.cloudflare.com` and `zita.ns.cloudflare.com`. The apex is the only Pages content domain. Proxied apex and `www` CNAME records target `color-dice-4uo.pages.dev`; an active Cloudflare 301 rule redirects `www` to the apex while preserving the path and query string. HTTP redirects to HTTPS.

Google Search Console uses the domain property `sc-domain:xn--80ahqbfrbqm.com`, verified through a persistent Cloudflare DNS TXT record. `https://xn--80ahqbfrbqm.com/sitemap.xml` is submitted successfully and reports four discovered pages.

Contact is handled through the public issue tracker at `https://github.com/olokojoh/color-dice/issues`. The previous `hello@colordice.app` address was removed because the domain has no mail exchange record. If the deployment origin changes, update canonical, hreflang, Open Graph, JSON-LD, sitemap, and robots URLs together; the full list is in `SEO.md`.

The AdSense readiness review, official policy sources, fixed issues, account-side requirements, and ad placement plan are recorded in `ADSENSE_REVIEW.md`.

## Verification

Static checks rerun on 2026-07-18 during the seventh AdSense review:

- `node --check app.js`
- `xmllint --noout sitemap.xml assets/favicon.svg`
- `html-validate 11.5.5` passed all 13 HTML files.
- All 13 files have one H1 and no duplicate IDs. All four JSON-LD blocks parse, and the Russian and English FAQ markup matches the visible questions and answers.
- The 185 anchor instances contain no broken local route or fragment. The five external destinations used by page copy were reachable through the web check, and no page uses `nofollow`.
- Sitemap URLs exactly match the four `index, follow` canonicals. The eight trust pages remain `noindex, follow` and stay out of the sitemap.
- The two privacy pages now state the advertising-cookie disclosures required before AdSense is enabled. No ad code, publisher placeholder, or `ads.txt` entry is present.

The seventh review also completed a fresh dynamic run on 2026-07-18 through a local HTTP server and real Chrome. Both languages passed the normal roll, six-die Mega Roll, six keyboard Scratch reveals, theme and sound changes, and reload-based state restoration. Desktop and 390px mobile pages had no horizontal overflow, and the tested contexts produced no console warnings, console errors, or page errors. The standard web-game client also completed on both homepages; its canvas-only screenshots were not used as layout evidence.

Lighthouse 13.4.0 scored both homepages at Performance 99, Accessibility 100, Best Practices 100, and SEO 100. Russian lab values were FCP 1.50s, LCP 2.10s, TBT 6ms, and CLS 0. English values were FCP 1.50s, LCP 2.10s, TBT 0ms, and CLS 0. The reports are `output/codex-seventh-lighthouse-ru.json` and `output/codex-seventh-lighthouse-en.json`.

A fresh production check on 2026-07-18 still found the old deployment: `/`, `/en/`, `robots.txt`, and `sitemap.xml` returned 200, while `/en/privacy/` returned 404. The live homepage still contained the removed start screen and player-code panel. The current workspace remains uncommitted, and `HEAD` and `origin/main` still point to `229a45b`. No commit, push, deployment, or AdSense account action was performed.
