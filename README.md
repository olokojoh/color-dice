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
- `ads.txt`: the owner-supplied AdSense authorized-seller record, served from the root domain.
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

Production uses the Cloudflare Pages project `color-dice`, linked to the repository's `main` branch. Pages releases run `node build-pages.mjs` and publish the `dist` output directory, not the repository root. A 2026-07-28 production repair replaced the former configuration with no build command and `/` as the output directory. Every push to `main` triggers a production deployment; pull requests receive preview deployments. The generated Pages hostname is `https://color-dice-4uo.pages.dev`.

`node build-pages.mjs` deletes and rebuilds `dist/` from the explicit allowlist in `public-files.json`. The artifact contains only public routes and assets, so repository documents, build files, `.gitignore`, local output, and run evidence are absent. `dist/` is ignored generated output, while the public GitHub repository remains the intended place to read project documents. The release procedure must commit the reviewed source, publish `dist/` with the required Pages settings, and verify production separately.

Production must be created by a GitHub `main` push whose commit is reachable from the remote `main` ref. Do not promote a `dev` preview artifact to production: Pages can label that ad-hoc deployment as branch `main` without merging the commit in Git, leaving production ahead of the source-of-truth branch.

Cloudflare zone custom rule `67fbadca144f456796089265951f45ec` (`Block repository-only files`) blocks requests before Pages when `http.request.uri.path` is one of `/README.md`, `/SEO.md`, `/progress.md`, `/ADSENSE_REVIEW.md`, `/AGENTS.md`, `/.gitignore`, `/build-pages.mjs`, or `/public-files.json`. Keep this defense with the allowlisted build: the July 28 repair found that removed Pages assets with a seven-day shared-cache lifetime could still be returned on the exact custom-domain URL after a clean deployment, a successful custom purge, and deletion of the source deployment. The blocked paths return 403 on the custom domain; the current `pages.dev` production and preview deployments return 404.

The Cloudflare zone is active with `terry.ns.cloudflare.com` and `zita.ns.cloudflare.com`. The apex is the only Pages content domain. Proxied apex and `www` CNAME records target `color-dice-4uo.pages.dev`; an active Cloudflare 301 rule redirects `www` to the apex while preserving the path and query string. HTTP redirects to HTTPS.

Google Search Console uses the domain property `sc-domain:xn--80ahqbfrbqm.com`, verified through a persistent Cloudflare DNS TXT record. The sitemap is `https://xn--80ahqbfrbqm.com/sitemap.xml`; Cloudflare Pages applies explicit XML/text content types and one-hour revalidation headers through `_headers`. The sitemap was resubmitted successfully on 2026-07-20 and reports four discovered pages.

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
- The two privacy pages now state the advertising-cookie disclosures required before AdSense is enabled. No ad code or placeholder publisher value is present. The root `ads.txt` uses the real record designated by the owner; it does not by itself connect the site to AdSense or indicate approval.

The seventh review also completed a fresh dynamic run on 2026-07-18 through a local HTTP server and real Chrome. Both languages passed the normal roll, six-die Mega Roll, six keyboard Scratch reveals, theme and sound changes, and reload-based state restoration. Desktop and 390px mobile pages had no horizontal overflow, and the tested contexts produced no console warnings, console errors, or page errors. The standard web-game client also completed on both homepages; its canvas-only screenshots were not used as layout evidence.

Lighthouse 13.4.0 scored both homepages at Performance 99, Accessibility 100, Best Practices 100, and SEO 100. Russian lab values were FCP 1.50s, LCP 2.10s, TBT 6ms, and CLS 0. English values were FCP 1.50s, LCP 2.10s, TBT 0ms, and CLS 0. The reports are `output/codex-seventh-lighthouse-ru.json` and `output/codex-seventh-lighthouse-en.json`.

A production check on 2026-07-18 found the deployment behind the workspace: `/en/privacy/` returned 404 and the live homepage still contained the removed start screen and player-code panel. Later pushes closed that gap. A 2026-07-28 pre-release read-only probe found production serving `main` at `8438dc9` for the changed indexable pages, not `dev` at `e0135fc`. During that pre-release review, the R03 sitemap and handoff fixes and the R13 build-output repair had not been deployed. R13 replaced the undeployed R06 and R09 worker approach with the build-output design above. Those review phases did not perform a commit, push, deployment, or AdSense account action.

The July 28 production repair verified Pages build command `node build-pages.mjs`, destination `dist`, and clean production deployment `234acdea-c625-47ff-8df2-22f5c5310621`. Thirteen older deployments that returned repository files were removed through the Pages API; clean preview `8e1d012d-fd07-407d-8e2b-25b86725593c` was retained. The corrective GitHub `main` push at `2af644f` then created production deployment `f752ec96-831f-4cc0-ab44-a5a5e63833f0` through a complete clone/build/deploy, restoring agreement between production and the remote source-of-truth branch. Cloudflare continued serving a removed immutable deployment hostname with `max-age=0, must-revalidate`, even though the deployment no longer appeared in the project list. The account does not control the `pages.dev` zone, so immediate removal of that residual hostname requires Cloudflare Support or deletion of the Pages project; neither is required to protect the custom production domain. Final probes returned 403 for all eight guarded custom-domain paths, 404 on the current `pages.dev` deployment, and 200 for the homepage, English homepage, robots, sitemap, and favicon.
