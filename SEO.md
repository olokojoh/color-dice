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
- AdSense review decisions and official policy links are maintained in `ADSENSE_REVIEW.md`. No publisher ID, verification placeholder, ad unit, or fake `ads.txt` entry is committed.

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
- July 18 production delivery check: apex `/`, `/en/`, `robots.txt`, and `sitemap.xml` returned HTTPS 200; `www` and HTTP redirected to the apex; `/en/privacy/` still returned 404. The homepage still contained the old start screen and player-code panel, so production remains behind the reviewed workspace.
- Google Search Console: `sc-domain:xn--80ahqbfrbqm.com` is DNS-verified. A transient `General HTTP error` appeared after the 2026-07-15 read even though Googlebot, IPv4, and IPv6 checks returned HTTP 200 with valid XML. `_headers` now gives `sitemap.xml` and `robots.txt` explicit content types and stable one-hour cache revalidation before resubmission.
- Production source audit on 2026-07-13: a normal browser user agent and Googlebot both received the same 33,716-byte Russian HTML document. Its SHA-1 matched the repository version at that time. The current workspace has since changed and is not deployed.
- Do not use `https://colordice.vercel.app/` to audit this repository. That reference site returns an empty `<div id="app"></div>` and stores its UI in a Base64 JavaScript payload; its raw response has only four visible words. A report describing roughly 22 words and suspected CSR is evidence that the reference URL was measured, not `https://xn--80ahqbfrbqm.com/`.
