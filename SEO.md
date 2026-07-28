# SEO Implementation

This site follows `/Users/reyn/Desktop/data/独立开发/onpage-seo-vibe-coding-playbook.md`.

## Keyword Map

| URL | Search intent | Primary keyword group | Indexing | Schema |
|---|---|---|---|---|
| `/` | Use the tool | `колор дайс`, `цветные кубики онлайн`, `генератор случайных цветов` | `index, follow` | `WebSite`, `WebApplication`, `FAQPage` |
| `/en/` | Use the tool in English | `color dice roller`, `roll color dice online`, `random color dice` | `index, follow` | `WebPage`, `WebApplication`, `FAQPage` |
| `/pravila/` | Learn meanings and rules | `правила Колор Дайс`, `значения цветов Колор Дайс` | `index, follow` | `Article`, `BreadcrumbList` |
| `/kak-igrat/` | Follow a tutorial | `как играть в Колор Дайс` | `index, follow` | `HowTo`, `BreadcrumbList` |
| `/o-proekte/` | Trust information | About page | `noindex, follow` | None |
| `/kontakty/` | Contact | Contact page | `noindex, follow` | None |
| `/privacy/` | Policy | Privacy policy | `noindex, follow` | None |
| `/terms/` | Policy | Terms | `noindex, follow` | None |
| `/en/about/` | English trust information | About page | `noindex, follow` | None |
| `/en/contact/` | English contact | Contact page | `noindex, follow` | None |
| `/en/privacy/` | English policy | Privacy policy | `noindex, follow` | None |
| `/en/terms/` | English policy | Terms | `noindex, follow` | None |

The Russian homepage remains the main site and owns the Russian transactional keyword group. `/en/` is an independently written English version rather than a literal translation. It follows English search intent with direct tool instructions, dice-count guidance, color-rule ideas, use cases, randomness details, and matching FAQ content. The two Russian supporting pages keep their separate informational intents.

## On-Page Evidence

| Page | Title chars | Description chars | Visible words | Exact phrase occurrences | Occurrence rate | H1 count |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 54 | 146 | 1137 | 23 for `колор дайс` | 2.02% | 1 |
| `/en/` | 53 | 158 | 1169 | 20 for `color dice` | 1.71% | 1 |
| `/pravila/` | 56 | 154 | 608 | 13 for `колор дайс` | 2.14% | 1 |
| `/kak-igrat/` | 52 | 155 | 638 | 11 for `колор дайс` | 1.72% | 1 |

The July 18 count uses static body text from the initial HTML, excluding `script`, `style`, `noscript`, and `aria-hidden` subtrees. The occurrence rate is exact phrase occurrences divided by visible word tokens. These numbers are regression checks, not Google ranking or AdSense thresholds. Google's public guidance asks for useful, original content and natural language; it does not set a required word count or keyword percentage.

Every indexable page has a unique title, description, H1, self-canonical, page-appropriate hreflang, Open Graph tags, Twitter card tags, and parseable JSON-LD. `/` and `/en/` have reciprocal `ru` and `en` alternates; `/` is the `x-default`. Both homepage FAQ schemas now match their visible FAQ answers exactly.

## Technical Decisions

- Static HTML satisfies the playbook's SSG/SSR requirement: titles, headings, body copy, internal links, examples, and FAQs exist without client rendering.
- Rendering model: pre-rendered static HTML (SSG-equivalent), not runtime backend SSR and not JavaScript-only CSR.
- Directory URLs provide clean lowercase, hyphenated paths with trailing slashes.
- `sitemap.xml` contains all four indexable URLs and excludes all eight noindex trust URLs.
- `robots.txt` permits crawling and declares the sitemap.
- All internal links are crawlable and do not use `nofollow`.
- Local WOFF2 fonts remove third-party font requests. `assets/fonts/OFL.txt` carries the Lilita One and Nunito copyright notices and SIL OFL 1.1 terms.
- The Russian Open Graph image is `/assets/kolor-dais-og.png`; the English 1200x630 image is `/assets/color-dice-og.jpg`.
- Below-fold content remains fully rendered in browser screenshots and is present in the original HTML response.
- The background canvas is decorative and `aria-hidden`; dice results have text alternatives and live status.
- The game has no entry gate. Visitors and reviewers see the working tool immediately, and the first full-screen transition occurs only after a roll button is pressed.
- English visitors can reach native About, Contact, Privacy, and Terms pages from the homepage footer.
- AdSense review decisions and official policy links are maintained in `ADSENSE_REVIEW.md`. The root `ads.txt` contains the seller record designated by the owner. No ad unit, site-verification placeholder, or fake seller entry is committed.
- Cloudflare Pages releases must use build command `node build-pages.mjs` and build output directory `dist`, not the repository root. The script rebuilds the artifact from `public-files.json`, so repository documents, build files, `.gitignore`, local output, and run evidence are absent. Deployment and production verification are separate release steps.
- A production deployment commit must be reachable from the remote GitHub `main` ref. Promoting a `dev` preview can make Pages report branch `main` while serving a commit that GitHub `main` does not contain, so preview promotion is not an accepted release path.
- Cloudflare custom rule `67fbadca144f456796089265951f45ec` blocks the eight repository-only paths listed in `README.md` before they reach Pages. This is a delivery safeguard for stale exact-URL objects, not an SEO landing-page rule; none of those paths belongs in the sitemap or internal navigation.

## URL Replacement Checklist

If production moves away from `https://xn--80ahqbfrbqm.com`, replace the origin in:

1. Canonical and hreflang links in the four indexable HTML pages.
2. Open Graph URL and image values.
3. JSON-LD URLs and image values.
4. `sitemap.xml` locations.
5. The sitemap declaration in `robots.txt`.
6. The production section of `README.md`.

## Verification Evidence

- July 18 static validation: all 13 HTML files pass `html-validate 11.5.5`; `app.js` passes `node --check`; the sitemap and favicon pass XML parsing.
- JSON-LD: all four schema blocks parse as JSON. Both FAQ schemas match visible questions and answers exactly. This is a local consistency check, not a promise that Google will show a rich result.
- Crawlability: all 185 anchor instances have valid local routes and fragments or one of five checked external destinations. Sitemap inclusion exactly matches the four indexable canonicals.
- July 18 dynamic validation: local HTTP resources returned 200; both homepages passed normal roll, six-die Mega Roll, six keyboard Scratch reveals, theme, sound, and reload-based saved-state checks. Desktop and 390px mobile pages had no horizontal overflow, console warnings, console errors, or page errors.
- July 18 Lighthouse 13.4.0: both homepages scored Performance 99, Accessibility 100, Best Practices 100, and SEO 100. Russian FCP/LCP/TBT/CLS were 1.50s/2.10s/6ms/0; English values were 1.50s/2.10s/0ms/0.
- July 18 production delivery check: apex `/`, `/en/`, `robots.txt`, and `sitemap.xml` returned HTTPS 200; `www` and HTTP redirected to the apex; `/en/privacy/` still returned 404 and the homepage still contained the old start screen and player-code panel. Later pushes closed this gap.
- July 27 pre-release production delivery check: all 12 HTML routes, `robots.txt`, `sitemap.xml`, the seller record, and both Open Graph images returned HTTPS 200 and matched commit `8438dc9` byte for byte; an unknown route returned 404. At that check, the July 27 Mode B copy and image edits were on `dev` at `e0135fc` and were not part of the deployed `main` revision. During the July 28 pre-release review, the R03 sitemap and handoff fixes and the R13 build-output repair had not been deployed. R13 replaced the undeployed R06 and R09 worker approach with the build-output design.
- July 28 repository-file exposure repair: Pages was configured with `node build-pages.mjs` and `dist`, and clean production deployment `234acdea-c625-47ff-8df2-22f5c5310621` returned 404 for repository documents on `pages.dev`. Exact custom-domain URLs still returned seven-day cached copies from `8438dc9`; zone custom purge and removal of 13 unsafe historical deployments did not invalidate those objects. Active WAF custom rule `Block repository-only files` now returns 403 for all eight guarded paths, with or without query strings. A corrective GitHub `main` push at `2af644f` produced deployment `f752ec96-831f-4cc0-ab44-a5a5e63833f0` through successful clone, build, and deploy stages; its 26 public files byte-matched the local `dist` artifact. Public smoke probes for `/`, `/en/`, `robots.txt`, `sitemap.xml`, and the favicon remained 200. One removed immutable deployment hostname still returned the old file with `max-age=0, must-revalidate`; only Cloudflare Support or project deletion can remove that residual `pages.dev` hostname immediately.
- Google Search Console: `sc-domain:xn--80ahqbfrbqm.com` is DNS-verified. A transient `General HTTP error` appeared after the 2026-07-15 read even though Googlebot, IPv4, and IPv6 checks returned HTTP 200 with valid XML. After deploying explicit content types and one-hour cache revalidation through `_headers`, the sitemap was resubmitted on 2026-07-20 and immediately returned `Success`, last read Jul 20, with four discovered pages and zero videos.
- Production source audit on 2026-07-13: a normal browser user agent and Googlebot both received the same 33,716-byte Russian HTML document. Its SHA-1 matched the repository version at that time. Later commits changed both the repository and the deployment; the July 27 check above records the state observed on that date.
- Do not use `https://colordice.vercel.app/` to audit this repository. That reference site returns an empty `<div id="app"></div>` and stores its UI in a Base64 JavaScript payload; its raw response has only four visible words. A report describing roughly 22 words and suspected CSR is evidence that the reference URL was measured, not `https://xn--80ahqbfrbqm.com/`.
