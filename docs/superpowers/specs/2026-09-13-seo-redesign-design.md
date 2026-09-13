# Indus Solar Solutions — SEO-First Site Redesign

Date: 2026-09-13
Status: Approved by user, proceeding to implementation plan

## 1. Goal and intent

**Primary goal — SEO:** rebuild indussolarsolutions.com into a mobile-first,
SEO-first site covering the full Kanpur solar keyword cluster (installation,
residential/commercial/industrial, subsidy/PM Surya Ghar, kW-size systems,
local areas), so Google can find, crawl, and rank it for buyer-intent local
searches. Every page targets a specific keyword with genuine, non-duplicated
content — not keyword stuffing.

**Secondary goal — SMO:** make every page and case study easy to *share and
recognize* across social channels — correct Open Graph/Twitter cards on every
route (already partly in place, extended to all new pages), consistent brand
name/logo/handle usage, and content written so it doubles as source material
for Instagram/Facebook/YouTube posts (before/after photos, project write-ups,
testimonials). SMO here means shareability and brand consistency, not paid
social ads or follower-count growth — those aren't in scope.

**Non-negotiable:** keep every claim honest — no fabricated reviews, case
studies, prices, or locations. Trust is the thing local SEO actually rewards
(Google's own ranking factors are relevance, distance, and prominence — the
last one built from real reviews, real links, real citations).

## 2. Non-goals

- **No framework migration.** The existing Vite + React Router + `scripts/prerender.ts`
  setup already bakes per-route `<title>`/meta/canonical/OG/JSON-LD into static HTML
  at build time, which is the actual SEO requirement Next.js SSR would otherwise be
  used for. Extend this pattern; do not introduce Next.js/Astro.
- **No off-site execution.** Google Business Profile setup, review collection,
  backlink outreach, YouTube, and local PR are the owner's actions, not code. This
  work produces a checklist document, not automation.
- **No fabricated content.** No invented review counts, fake testimonials, made-up
  exact prices, or duplicated locality pages with only the place-name swapped.
  Existing placeholder data (testimonials, `projects.ts`) stays labeled as such;
  new locality pages only cover areas where the existing data already has a
  genuine testimonial/project tied to them (Kidwai Nagar, Kalyanpur, Panki, Civil
  Lines, Kakadeo, Swaroop Nagar).

## 3. Architecture

Keep: Vite, React 19, React Router 7, Tailwind 4, `scripts/prerender.ts`,
`src/data/seo.ts` as the single per-route metadata registry consumed by both the
`<Seo>` component (client) and the prerender script (build-time head injection +
sitemap generation).

Extend `seo.ts`'s `SeoEntry` type to carry an optional `schema` field (JSON-LD
object or array) so page-specific structured data (Service, BreadcrumbList) is
part of the same registry the prerender script already walks, instead of a
second parallel system. The prerender script's `injectHead` gets one more
replacement step that inserts a `<script type="application/ld+json">` block
before `</head>` when `entry.schema` is present, in addition to the global
LocalBusiness/Organization/WebSite JSON-LD already hardcoded in `index.html`
(kept as-is — it's already correct and applies site-wide).

## 4. Site map

All new routes are static (no `:param` needed except existing `/products/:slug`
and `/projects/:slug`, the latter being new). Each row = one new page.

| URL | Primary keyword | H1 |
|---|---|---|
| `/solar-panel-installation-kanpur` | solar panel installation Kanpur | Solar Panel Installation in Kanpur |
| `/rooftop-solar-kanpur` | rooftop solar Kanpur | Rooftop Solar Installation in Kanpur |
| `/residential-solar-kanpur` | residential solar Kanpur | Residential Solar Panels for Homes in Kanpur |
| `/commercial-solar-kanpur` | commercial solar installation Kanpur | Commercial Solar Installation in Kanpur |
| `/industrial-solar-kanpur` | industrial solar Kanpur | Industrial Solar Installation in Kanpur |
| `/solar-panel-price-kanpur` | solar panel price Kanpur | Solar Panel Price in Kanpur: 1kW–10kW Systems |
| `/solar-subsidy-kanpur` | solar subsidy Kanpur | Solar Subsidy in Kanpur: Eligibility & How to Apply |
| `/pm-surya-ghar-kanpur` | PM Surya Ghar Kanpur | PM Surya Ghar Yojana in Kanpur: Guide & Application |
| `/solar-calculator-kanpur` | solar calculator Kanpur | Solar Savings Calculator for Kanpur |
| `/1kw-solar-system-kanpur` | 1kW solar panel Kanpur | 1kW Solar System in Kanpur |
| `/2kw-solar-system-kanpur` | 2kW solar panel Kanpur | 2kW Solar System in Kanpur |
| `/3kw-solar-system-kanpur` | 3kW solar panel Kanpur | 3kW Solar System in Kanpur |
| `/5kw-solar-system-kanpur` | 5kW solar system Kanpur | 5kW Solar System in Kanpur |
| `/10kw-solar-system-kanpur` | 10kW solar system Kanpur | 10kW Solar System in Kanpur |
| `/solar-panel-installation-kidwai-nagar` | solar installer Kidwai Nagar | Solar Panel Installation in Kidwai Nagar, Kanpur |
| `/solar-panel-installation-kalyanpur` | solar installer Kalyanpur | Solar Panel Installation in Kalyanpur, Kanpur |
| `/solar-panel-installation-panki` | solar installer Panki | Solar Panel Installation in Panki, Kanpur |
| `/solar-panel-installation-civil-lines` | solar installer Civil Lines | Solar Panel Installation in Civil Lines, Kanpur |
| `/solar-panel-installation-kakadeo` | solar installer Kakadeo | Solar Panel Installation in Kakadeo, Kanpur |
| `/solar-panel-installation-swaroop-nagar` | solar installer Swaroop Nagar | Solar Panel Installation in Swaroop Nagar, Kanpur |
| `/faq` | solar FAQ Kanpur | Solar Panel FAQs |
| `/about` | solar company in Kanpur | About Indus Solar Solutions |
| `/contact` | contact solar company Kanpur | Contact Indus Solar Solutions |
| `/blog` | — (index) | Solar Guides & Resources |
| `/blog/solar-panel-cost-kanpur-guide` | solar system price Kanpur | Solar Panel Cost in Kanpur: Complete Guide |
| `/blog/is-rooftop-solar-worth-it-kanpur` | is solar worth it Kanpur | Is Rooftop Solar Worth It in Kanpur? |
| `/blog/pm-surya-ghar-application-guide` | PM Surya Ghar apply | How to Apply for PM Surya Ghar: Step-by-Step |
| `/projects/:slug` | (per project) | (per project title) |

Existing routes kept: `/`, `/products`, `/products/:slug`, `/projects` (becomes
the case-studies index, enhanced, same URL — no redirect needed).

Homepage H1 changes to: "Solar Panel Installation & Rooftop Solar Solutions in
Kanpur" (currently no explicit H1 pattern reviewed — will confirm in Hero.tsx
during implementation).

## 5. Shared components/patterns

- **`Breadcrumbs`** — renders visible breadcrumb nav + returns a `BreadcrumbList`
  schema object for the page's `seo.ts` entry.
- **`Faq`** — accordion component taking `{question, answer}[]`; used on `/faq`
  and embedded (subset) on money pages. Only `/faq` itself carries `FAQPage`
  JSON-LD (per plan rule: don't add FAQ schema just because a section exists).
- **`ServiceSchema` helper** — builds a `Service` JSON-LD object for money pages
  (residential/commercial/industrial/installation/rooftop).
- **`SolarCalculator`** — inputs: monthly bill (₹) or roof area (sq ft), property
  type. Formula: recommended kW ≈ monthly units ÷ (30 × 4.5 avg sun-hours ×
  0.8 derate); generation = kW × 4.5 sun-hours × 365 × 0.8; savings = generation
  × ₹8/unit indicative tariff (labeled "indicative — actual tariff varies by
  DISCOM slab"). Output includes a disclaimer and a CTA to book a free survey.
  Used standalone on `/solar-calculator-kanpur` and embedded (compact variant)
  on the homepage.
- **`LocalityPage` template** — one component driven by a `localities.ts` data
  entry (name, matching testimonials filtered from `site.ts`, matching projects
  filtered from `projects.ts`, short local-context paragraph). Six data entries,
  one component, six routes — avoids duplicated page code.
- **`KwSystemPage` template** — one component driven by `kwSystems.ts` (size,
  who it suits, roof area needed, indicative panel count, indicative generation,
  FAQs). Five data entries, one component, five routes.

## 6. Data additions (`src/data/`)

- `localities.ts` — 6 entries: `{ slug, name, intro, nearbyLandmarks? }`
- `kwSystems.ts` — 5 entries: `{ slug, kw, suitsWho, roofAreaSqFt, panelCountEstimate, monthlyGenerationEstimate, faqs }`
- `faqs.ts` — the full FAQ bank from the plan (16 questions), tagged by which
  page(s) embed a subset
- `blog.ts` — 3 article entries: `{ slug, title, description, publishedDate, lastUpdated, body (structured sections) }`
- `seo.ts` — extended with entries for every new route above, plus `schema` field

`projects.ts` gains optional fields (`systemSizeKw?`, `date?`) left undefined
where unknown — no invented numbers for existing placeholder entries.

## 7. Navigation & footer

Navbar restructured to match the plan's grouping (Home, Solar Solutions
dropdown [Residential/Commercial/Industrial/Rooftop], Solar Systems dropdown
[1–10kW], Solar Calculator, Solar Subsidy dropdown [Subsidy/PM Surya Ghar],
Projects, About, Blog, Contact) — collapses to a mobile drawer, not a mega-menu,
below `md`. Footer gets Solar Solutions / Solar Resources / Service Areas /
Company link columns instead of the current single flat `nav` list.

## 8. Mobile-first & images

Every new component is written mobile-first (base styles = phone, `md:`/`lg:`
overrides = larger). Existing components get a pass to flip any desktop-first
patterns. Images: reuse the existing 43 assets across new pages contextually
(not just repeating hero images), add descriptive (non-stuffed) `alt` text,
convert `<img>` usage to include explicit `width`/`height` and `loading="lazy"`
(except above-the-fold hero images, which stay eager) to protect CLS/LCP.

## 9. Off-site deliverable

`docs/seo-offsite-checklist.md` — Google Business Profile setup/verification,
review-request flow, local backlink/directory targets, partnership ideas,
Search Console + GA4 setup steps (with placeholder env vars for the
measurement ID since real IDs aren't available). This is a document, not code.

Same file also covers the SMO side: which pages/case studies to turn into
Instagram/Facebook posts and YouTube videos, consistent NAP + handle usage
across profiles, and a posting cadence tied to real installations (not
generic content) — again a checklist for the owner to execute, not code.

## 10. Verification

`tsc -b && vite build && tsx scripts/prerender.ts` must succeed and produce all
~34 routes' `index.html` + updated `sitemap.xml`. Manual check: dev server at
375px and 768px viewports for the new templates (locality, kW, calculator,
FAQ) before calling the work done. No existing automated test suite exists to
extend.
