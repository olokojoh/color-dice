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

The Russian homepage remains the main site and owns the Russian transactional keyword group. `/en/` is an independently written English version rather than a literal translation. It follows English search intent with direct tool instructions, dice-count guidance, color-rule ideas, use cases, randomness details, and matching FAQ content. The two Russian supporting pages keep their separate informational intents.

## On-Page Evidence

| Page | Title chars | Description chars | Visible words | Exact primary phrase density | H1 count |
|---|---:|---:|---:|---:|---:|
| `/` | 55 | 159 | 1015 | 2.76% | 1 |
| `/en/` | 54 | 158 | 1317 | 1.97% for `color dice` | 1 |
| `/pravila/` | 56 | 154 | 601 | 2.16% | 1 |
| `/kak-igrat/` | 52 | 155 | 657 | 1.98% | 1 |

Every indexable page has a unique title, description, H1, self-canonical, appropriate hreflang, Open Graph tags, Twitter card tags, and valid JSON-LD. `/` and `/en/` have reciprocal `ru` and `en` alternates; `/` is the `x-default`. Both homepage FAQ schemas match their visible FAQ answers.

## Technical Decisions

- Static HTML satisfies the playbook's SSG/SSR requirement: titles, headings, body copy, internal links, examples, and FAQs exist without client rendering.
- Rendering model: pre-rendered static HTML (SSG-equivalent), not runtime backend SSR and not JavaScript-only CSR.
- Directory URLs provide clean lowercase, hyphenated paths with trailing slashes.
- `sitemap.xml` contains all four indexable URLs and excludes all four noindex URLs.
- `robots.txt` permits crawling and declares the sitemap.
- All internal links are crawlable and do not use `nofollow`.
- Local WOFF2 fonts remove third-party font requests.
- The Russian Open Graph image is `/assets/kolor-dais-og.png`; the English 1200x630 image is `/assets/color-dice-og.jpg`.
- Below-fold content remains fully rendered in browser screenshots and is present in the original HTML response.
- The background canvas is decorative and `aria-hidden`; dice results have text alternatives and live status.

## URL Replacement Checklist

If production moves away from `https://xn--80ahqbfrbqm.com`, replace the origin in:

1. Canonical and hreflang links in the four indexable HTML pages.
2. Open Graph URL and image values.
3. JSON-LD URLs and image values.
4. `sitemap.xml` locations.
5. The sitemap declaration in `robots.txt`.
6. The production section of `README.md`.

## Verification Evidence

- HTML validation: all nine HTML files pass `html-validate`.
- JSON-LD: all four schema blocks parse as JSON and Lighthouse reports valid structured data.
- Crawlability: all 118 local anchor links resolve; sitemap inclusion exactly matches robots indexing directives.
- Local HTTP: pages, robots, sitemap, fonts, favicon, script, stylesheet, and OG image return 200.
- Lighthouse final scores: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- Core Web Vitals lab values: FCP 1.4 s, LCP 2.1 s, TBT 0 ms, CLS 0.
- English Lighthouse scores: Performance 98, Accessibility 100, Best Practices 100, SEO 100. Lab values: FCP 1.7 s, LCP 2.1 s, TBT 30 ms, CLS 0.
- Production delivery: the apex and English routes return HTTPS 200 through Cloudflare Pages, `www` redirects to the canonical apex with 301, and production robots/sitemap responses match their repository files.
