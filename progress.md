Original prompt: 一比一复刻 https://colordice.vercel.app/ 这个网站，围绕 колор дайс 关键词建站，并做 SEO。建站要求严格遵循 /Users/reyn/Desktop/data/独立开发/onpage-seo-vibe-coding-playbook.md

Follow-up prompt: 保留俄语主站，并在 `/en/` 新增英文原版页面；英文 SEO 内容参考原站表达方式但使用英文原生写法，不直接翻译。

## Current state

- The workspace started empty on 2026-07-11.
- The live reference was inspected at 1280x720 and 390x844. Reference screenshots are stored in `output/playwright/`.
- The implementation uses static HTML, CSS, and JavaScript. Public page content is present in HTML without requiring client rendering.
- `index.html` contains the complete Russian homepage structure, game UI, on-page content, internal links, metadata, and JSON-LD.
- `styles.css` recreates the blue glass-panel game while providing responsive layouts and six themes.
- `app.js` now provides the start flow, cryptographic color rolls, normal/mega/scratch modes, sound, themes, local player state, keyboard/fullscreen controls, `render_game_to_text`, and `advanceTime`.
- `/` remains the Russian main and `x-default` page. `/en/` is a separate English search landing page with 1317 words of native English copy, a 54-character title, a 158-character description, one H1, matching FAQ schema, and its own 1200x630 sharing image.
- The shared game script selects copy from the document language. English dynamic output covers dice labels and results, themes, sound state, roll overlays, Mega Roll, Scratch Card progress, and player-code messages. Stored results are remapped by stable color ID so switching languages cannot leak old localized names.
- The two homepages include reciprocal `ru`/`en` hreflang links and visible language navigation. The sitemap now includes four indexable URLs.
- The language navigation now uses a globe icon and a two-item menu. It remains visible in the first viewport before the game starts, marks the current language, keeps ordinary crawlable links to both versions, closes with the other toolbar menus, and fits at 390px without overflow.
- Rendering is pre-rendered static HTML (SSG-equivalent). There is no runtime backend renderer, but SEO content does not depend on client JavaScript and is present in the first HTTP response.
- The required web-game client completed the start-to-roll flow. Its state output reported `mode: ready`, three visible results, and no JavaScript exception. The only logged error was the expected missing font asset, which was then added locally.
- Desktop and mobile page screenshots confirm the game panel fits without overlap. Mega mode reveals each die and exposes its close action; scratch mode renders three silver cards and supports keyboard reveal through to the completed state.
- The Russian homepage contains 1015 visible words, the English homepage contains 1317, and the rules and HowTo pages contain 601 and 657. Titles and descriptions are within the playbook ranges, and exact-keyword phrase density remains natural.
- Final Lighthouse scores are Performance 99, Accessibility 100, Best Practices 100, and SEO 100. Lab metrics: FCP 1.4 s, LCP 2.1 s, TBT 0 ms, CLS 0.
- Final browser captures show the game and SEO sections rendered. `html-validate` passes all nine HTML files, XML and all four JSON-LD blocks parse, 118 local anchor links resolve, all public routes and sharing assets return HTTP 200, and special-mode close controls are disabled whenever their overlays are hidden.
- English desktop and 390px mobile browser checks show no horizontal page overflow or overlapping game controls. Normal roll, six-dice selection, theme change, player validation, Mega Roll, and all six keyboard scratch reveals were completed in English; the Russian start-to-roll path was then rechecked.
- The required game client finished in `mode: ready` for both routes with localized color names and two completed rolls. Browser console errors/warnings: none.
- English Lighthouse scores: Performance 98, Accessibility 100, Best Practices 100, SEO 100. Lab metrics: FCP 1.7 s, LCP 2.1 s, TBT 30 ms, CLS 0.
- Git repository: public `https://github.com/olokojoh/color-dice`, default branch `main`, created and pushed with the local `olokojoh` GitHub account.
- Cloudflare Pages project: `color-dice` (`color-dice-4uo.pages.dev`), source type `github`, repository `olokojoh/color-dice`, production branch `main`, no build command, output directory `/`, automatic production and preview deployments enabled.
- Cloudflare zone `колордайс.com` is active in account `cbc3bde77f12dad362c481794bb7e314`. Its assigned nameservers are `terry.ns.cloudflare.com` and `zita.ns.cloudflare.com`; Namecheap and the `.com` registry use this pair.
- The apex Pages custom domain is active. Proxied apex and `www` CNAME records target `color-dice-4uo.pages.dev`; Page Rule `244c375c77ff6dd743b1a96f98c7b1bb` redirects `www` to the apex with HTTP 301 while preserving path/query. HTTP requests redirect to HTTPS.
- GitHub push `45f7478` triggered production deployment `cce3c4d8-823e-495d-8d4c-f1a68ff05ac6`, which completed successfully. No direct upload deployment was used.
- Production verification: apex `/`, `/en/`, `/robots.txt`, and `/sitemap.xml` return HTTPS 200; `www` and HTTP requests return the expected 301 redirects.
- A 2026-07-13 follow-up source audit confirmed that production is static HTML rather than CSR: browser and Googlebot responses were identical to repository `index.html`, with 987 Russian words in raw HTML and 1,298 English words under the same tokenizer. The reported 22-word CSR page was the separate `colordice.vercel.app` reference, whose response contains an empty app root and Base64-injected UI.
- Google Search Console domain property `sc-domain:xn--80ahqbfrbqm.com` was created and verified on 2026-07-12 using Cloudflare DNS TXT record `6b56879f69f8d91f35dbaeece6e6da27`. Keep this TXT record to retain ownership.
- `https://xn--80ahqbfrbqm.com/sitemap.xml` was submitted in Search Console. After refresh, its status was `Success`, type `Sitemap`, last read `Jul 12, 2026`, with four discovered pages and zero discovered videos.
- The OAuth refresh token in `/Users/reyn/Desktop/data/独立开发/toon-tone/gsc-ga4-auth/oauth_token.json` returned `invalid_grant` and remains untouched. Search Console setup used the already signed-in owner browser session instead; no credentials were copied into this repository.

## SEO decisions

- Primary keyword group: `колор дайс`, `цветные кубики онлайн`, `генератор случайных цветов`.
- English keyword group: `color dice roller`, `roll color dice online`, `random color dice`.
- Intended production URL and canonical: `https://xn--80ahqbfrbqm.com/`.
- The Russian homepage owns the Russian transactional intent, while `/en/` owns the English equivalent. `/pravila/` and `/kak-igrat/` target separate Russian informational intents.
- Privacy, terms, and contact pages will exist for trust but remain `noindex, follow`.

## Remaining work

- Confirm that the owner controls `hello@colordice.app`; replace the contact address if needed.
- Backlink outreach is prepared from 509 unique historical success URLs. The live scan produced 450 candidates, and `scripts/outreach_daily.py` caps each day at 20 successful unique domains while syncing `color-dice YYYY-MM-DD` to the shared success workbook. See `OUTREACH.md`.
- Before Cloudflare setup, the reference deployment at `https://colordice.vercel.app/` still served the original “Roll Color Dice – Bongo” site; it is not the production target for this repository.
