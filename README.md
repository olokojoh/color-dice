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
- `app.js`: language-aware game copy plus random rolls, overlays, scratch interaction, themes, sound, local player state, background canvas, keyboard/fullscreen controls, and test hooks.
- `pravila/index.html`: indexable rules page targeting `правила Колор Дайс`.
- `kak-igrat/index.html`: indexable HowTo page targeting `как играть в Колор Дайс`.
- `o-proekte/`, `kontakty/`, `privacy/`, `terms/`: trust pages marked `noindex, follow`.
- `robots.txt` and `sitemap.xml`: discovery files. The sitemap includes the four indexable URLs.
- `assets/`: local fonts, favicon, and separate 1200x630 Russian and English Open Graph images.
- `output/`: local browser, game-client, and Lighthouse verification artifacts. It is not required at runtime.

All public SEO content is present in the original HTML response. JavaScript only adds interaction. Without JavaScript, the start overlay is not displayed and the crawlable content remains readable. Reciprocal `ru`/`en` hreflang links connect the two homepage versions, while `/` remains `x-default`.

This is pre-rendered static HTML, equivalent to SSG for search engines. It is not runtime backend SSR, but it is also not a client-rendered shell: crawlers receive titles, descriptions, headings, body copy, links, FAQ content, and JSON-LD directly in the first response.

## Game State

The game uses `crypto.getRandomValues` and selects every die independently from six colors. Preferences and history stay in localStorage:

- `kolor_dais_theme`
- `kolor_dais_sound`
- `kolor_dais_player_code`
- `kolor_dais_roll_count`
- `kolor_dais_last_result`

There is no server API, account system, analytics, or advertising tracker.

Automated game clients can read `window.render_game_to_text()` and advance the background animation with `window.advanceTime(ms)`.

## Production

The intended production origin and all canonical URLs are `https://xn--80ahqbfrbqm.com/` (`колордайс.com`). The public source repository is `https://github.com/olokojoh/color-dice`.

Production uses the Cloudflare Pages project `color-dice`, linked to the repository's `main` branch. The project has no build command and publishes the repository root (`/`). Every push to `main` triggers a production deployment; pull requests receive preview deployments. The generated Pages hostname is `https://color-dice-4uo.pages.dev`.

The contact page currently uses `hello@colordice.app`. Replace it before launch if that mailbox is not controlled by the site owner. If the deployment origin changes, update canonical, hreflang, Open Graph, JSON-LD, sitemap, and robots URLs together; the full list is in `SEO.md`.

## Verification

Verified on 2026-07-12:

- `node --check app.js`
- `xmllint --noout sitemap.xml assets/favicon.svg`
- `html-validate` passed all nine HTML files.
- All 118 local anchor links resolve and none use `nofollow`.
- All public routes and assets return HTTP 200 from the local server.
- Desktop and 390px mobile screenshots show no overlapping controls or horizontal page overflow.
- The first viewport keeps a globe language selector visible before the game starts; it exposes both languages as crawlable links, marks the current language, and navigates correctly between `/` and `/en/`.
- Normal roll, mega roll, scratch reveal, keyboard reveal, theme/player menus, and local state were exercised.
- Final web-game client states reached `mode: ready` with English names on `/en/` and Russian names on `/`, with no console errors.
- Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100, with 0 ms total blocking time.
- English Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.7 s, LCP 2.1 s, TBT 30 ms, CLS 0.

The Lighthouse JSON reports are at `output/lighthouse-final.json` and `output/lighthouse-en.json`; game-client artifacts are under `output/web-game-ru/` and `output/web-game-en/`.
