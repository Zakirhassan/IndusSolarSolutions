# SEO Audit Fixes — Running Log

Tracks every SEO finding raised and every action taken, across every audit pass,
so nothing gets lost and this can be turned into a repeatable skill/agent later.
Append new passes as new dated sections rather than overwriting old ones.

See also [[seo-content-revamp-backlog]] (`2026-09-17-seo-content-revamp-backlog.md`)
for the earlier content/UX revamp — that covered rewriting page copy, images and
the calculator UI. This doc covers technical/on-page SEO audit findings.

---

## Pass 1 — 2026-09-17, audit from 3 tools (screenshots + Rank Math PDF)

### Source reports
User ran three external audits against the live site and pasted screenshots +
a Rank Math PDF export (`SEO1.pdf`, generated 2026-09-17 16:00 UTC):
1. An unnamed tool: overall grade B-, breakdown On-Page SEO A-, GEO A+, Links F,
   Usability D+, Performance A-, 21 recommendations list.
2. A second tool (SE Ranking-style): on-page score 65%, to-do list including
   "301 redirect www/non-www", "improve meta description", "alt attributes",
   "remove duplicate heading texts".
3. Rank Math SEO Analyzer: 85/100, 23/28 passed, 5 failed — meta description
   too long, 5 images missing alt, no sitemap found, WWW not canonicalized,
   one JS file "not minified".

### Methodology (reuse this for future passes)
Before fixing anything flagged by an external tool, verify it against this
repo's actual behavior — free SEO tools frequently give stale or wrong
results (cached crawls, tools that don't execute the build/prerender step,
generic checklist items shown regardless of actual page state). Process used:
1. Grep the codebase for the exact flagged string/asset (image filename, meta
   tag content) to find the real source file, not just the rendered output.
2. Run `npm run build` (which runs `tsc -b && vite build && tsx scripts/prerender.ts`)
   to get the actual deployed HTML in `dist/`, and inspect **that**, not the
   dev server — this project prerenders/static-generates every route, so the
   real shipped `<head>` only exists after this build step.
3. Only then decide fix vs. false-positive.

### Findings verified as REAL and fixed
| Finding | Root cause | Fix |
|---|---|---|
| Homepage meta description 214 chars (Rank Math; limit ~160) | `src/data/seo.ts` `staticSeo[0].description` | Rewritten to 150 chars, keeping all key terms (Kanpur, residential/commercial/industrial, subsidy, batteries, maintenance). Also synced the static fallback in `index.html`. |
| 5 images with `alt=""` (Rank Math: `hero-2b-adlershof.jpg`, `hero-4-array.jpg`, `hero-5-rooftop.jpg`, `solar-farm-telangana.jpg`, `solar-lake-chandigarh.jpg`) | All 5 are the homepage hero slider images in `src/components/Hero.tsx`, hardcoded `alt=""` on the shared `<motion.img>` | Now derives alt text per slide from each slide's existing heading, e.g. `alt={`${s.heading[0]} ${s.heading[1]} — Indus Solar Solutions, Kanpur`}` |
| No 301 redirect from www → apex domain (2nd tool + Rank Math "WWW Canonicalization") | `vercel.json` had no `redirects` rule; canonical URLs everywhere use the non-www apex | Added a Vercel host-based redirect rule sending `www.indussolarsolutions.com/*` → `https://indussolarsolutions.com/*` (permanent/301) |
| Duplicate heading text: "What Could You Save With Solar?" (2nd tool's generic "remove duplicate heading texts" warning — confirmed as a real, specific instance, not a false positive) | `HomeCalculator.tsx` renders an `<h2>` with this exact text, then embeds `<SolarCalculatorV2 />`, whose own internal card also renders an `<h3>` with the identical text — real duplicate heading on the homepage only (the calculator's standalone page, `/solar-calculator-kanpur`, doesn't have this collision since its own H1 differs) | `SolarCalculatorV2` already had an unused `compact` prop; wired it up (`<SolarCalculatorV2 compact />` from `HomeCalculator`) and made the inner heading read "Live Savings Calculator" when `compact`, the original text otherwise |
| No logo asset anywhere (favicon was a generic unbranded purple abstract SVG unrelated to brand colors; no `logo` in LocalBusiness schema) | N/A — never existed | See "Logo integration" below |

### Findings checked and confirmed FALSE POSITIVE (no code change — logged so we don't re-chase these)
| Finding | Why it's wrong |
|---|---|
| "Duplicate canonical tags" (1st tool, Medium priority) | `scripts/prerender.ts` `injectHead()` does a non-global regex `.replace()` on the canonical/title/meta tags in the HTML template per route — structurally can only ever produce one of each per page. Verified directly in `dist/index.html` post-build: exactly one `<link rel="canonical">`, one `<title>`, one meta description. |
| "Some JavaScript files don't seem to be minified" (Rank Math, `index-uSx6sFk7.js`) | Verified the actual built JS bundle (`dist/assets/index-*.js`): single line, no whitespace, standard esbuild/Vite minification output. Likely Rank Math crawled an older/dev deployment or its heuristic misfired. |
| "No sitemaps found" (Rank Math) | `public/sitemap.xml` exists, is correctly regenerated at build time by `scripts/prerender.ts` (one `<url>` per route in `src/data/seo.ts`'s `allSeo`), and is correctly referenced in `public/robots.txt` (`Sitemap: https://indussolarsolutions.com/sitemap.xml`). Likely a WordPress-oriented tool failing to detect a non-WP sitemap, or it audited before `sitemap.xml` was ever generated on a previous deploy. No action needed; worth re-checking after the next live deploy. |

### Logo integration
User supplied `C:\Users\zakir\Downloads\Indus Solar Logo.jpeg` (1254×1254,
white background, sun/panel/leaf/roof mark + "INDUS SOLAR SOLUTIONS" wordmark
+ tagline "Empowering Homes, Brightening the World."). No image-processing
package existed in the project (`sharp` not installed, no ImageMagick on the
machine) — used the system Python's PIL instead, cropping via numpy bounding-box
detection on non-white pixels rather than eyeballing coordinates:
- Detected the icon-mark-only region (rows 21–790 of 1254, i.e. everything
  above the wordmark) by finding the horizontal white gap between the graphic
  and the text block, then padded to a square and exported as PNG at
  32/180/192/512px → `public/images/brand/indus-solar-mark-{size}.png`
  (quantized to a 128-color adaptive palette to keep each file small: 1–50KB).
- Tight-cropped the full lockup (mark + wordmark + tagline) with a small
  margin, resized to 640px wide, exported as JPEG q82 (matches this repo's
  existing photo-compression convention) → 69KB at
  `public/images/brand/indus-solar-logo-full.jpg` (down from a naive 519KB
  uncompressed PNG export — deleted that intermediate).

Wired in (user approved all 4 placements):
- **Favicon** (`index.html`): replaced the old unbranded purple SVG
  (`public/favicon.svg`, deleted — nothing else referenced it) with
  `<link rel="icon">` at 32px/192px and `<link rel="apple-touch-icon">` at 180px.
- **Navbar** (`src/components/Navbar.tsx`): replaced the placeholder `Zap`
  lucide icon in the circular badge with the 192px mark image (removed the
  now-unused `Zap` import).
- **Footer** (`src/components/Footer.tsx`): added the mark + "Indus Solar
  Solutions" wordmark in a white rounded pill above the "Contact Us" label —
  needed the white pill wrapper because the footer background is dark
  charcoal and the logo's navy text has poor contrast directly on it.
- **Schema.org** (`index.html`): added `"logo"` field to the `LocalBusiness`
  JSON-LD block pointing at the full lockup image (this schema block lives
  only in the source template and isn't touched by prerender per-route
  injection, so this one edit covers every page).

Verified via production build + Playwright screenshots at 1400px, 1440px and
390px (mobile): logo renders correctly in navbar and footer at every size, no
layout breakage, no console errors.

### Verification for this pass
- `npx tsc -b` — clean
- `npm test` — 63/63 passing (no test depended on the changed calculator
  heading text since all existing tests render the non-compact default)
- `npm run build` — prerender + sitemap succeed; spot-checked `dist/index.html`
  directly for: meta description length (150), favicon links, schema `logo`
  field, hero alt text, single instance of the "What Could You Save" heading
- Playwright screenshots (via `npx playwright screenshot`, project has no
  `playwright` devDependency — used the one npx already had cached) at
  1400×1000, 1440×900, 390×844: homepage top, footer, mobile — all correct

### Deferred — needs info only the site owner has (not fixable in this pass)
- **Google Analytics / GA4**: not installed anywhere. User said skip for now.
- **Social profiles**: no `facebook.com`/`instagram.com`/etc. links anywhere
  in the codebase. User has an Instagram account and will share the URL
  later — once given, wire it into `src/data/site.ts` (`business` object) and
  add `sameAs` to the `LocalBusiness` schema in `index.html`.
- **DMARC/SPF records**: DNS-level, can't be set from this repo. Asked which
  provider sends `info@indussolarsolutions.com` mail (Google Workspace /
  Zoho / other) to draft exact TXT record values — answer received was
  ambiguous ("send to zakirhassan114@gmail.com"); there's no email-sending
  tool available here, so record values need to be handed over in-chat or in
  this file instead. **Still open — need the actual mail provider to draft
  correct SPF `include:` mechanism.**
- **Link building strategy**: off-site/marketing work, not a code task —
  checklist already exists at `docs/seo-offsite-checklist.md` per the prior
  workstream's notes.
- **Image/mobile PageSpeed/render-blocking** (all flagged Low Priority by
  tool 1): substantially already addressed by the 2026-09-17 image-compression
  workstream (see [[seo-content-revamp-backlog]]) — fetchpriority on LCP
  images, lazy-loading below the fold, 62% image size reduction. No new work
  this pass; re-run a real Lighthouse/PageSpeed pass after next deploy.
- **Google Search Console verification, live broken-link crawl, HTTPS
  enforcement confirmation**: not code tasks, carried over from the prior
  backlog doc, still open.

### Navbar overflow bug — found, diagnosed, fixed (follow-up same day)
Flagged to the user as out-of-scope; user then showed a screenshot of the
live (unpatched) site still showing a worse version of this (wrapped to two
lines, "Contact" overlapping the theme-toggle icon) and asked for it to be
fixed and pushed. Root cause, found by measuring actual computed layout with
Playwright rather than guessing from screenshots: the pill nav container was
capped at `max-w-6xl` (1152px), but the logo + 10 top-level nav links (at
`gap-5`) + theme toggle + 2 CTA buttons have a combined natural width of
~1193px — **wider than the container at every viewport size**, not just at
some cramped boundary width. Since the container never grows past
`max-w-6xl` regardless of screen width, `justify-between` had zero free space
to distribute between items at any xl+ width (confirmed by measuring the
gap = 0px at 1280, 1366, 1440, 1600, 1728, and 1920px viewports), and the
right-hand button group was actually clipping ~60px past the container's own
right edge.

Fix: widened the container to `max-w-[1400px]` and tightened the nav's own
item gap from `gap-5` to `gap-4` (`src/components/Navbar.tsx`). Re-measured
with the same Playwright script post-fix: gap is now 25px at the tightest
boundary (1280px viewport) growing to ~101px at 1920px, button group fully
inside the container at every width. Screenshot-confirmed at 1400px.
This superseded the previous session's in-progress `lg:`→`xl:` breakpoint
edit, which changed *when* the desktop nav appeared but not the actual
too-narrow-container bug, so it hadn't fixed the overflow either.

### Files changed this pass
`index.html`, `vercel.json`, `src/data/seo.ts`, `src/components/Hero.tsx`,
`src/components/Navbar.tsx`, `src/components/Footer.tsx`,
`src/components/HomeCalculator.tsx`, `src/components/SolarCalculatorV2.tsx`,
new `public/images/brand/` (4 PNGs + 1 JPEG), deleted `public/favicon.svg`.
Pre-existing unrelated uncommitted changes at session start (not touched
further): `src/components/Navbar.tsx` (overflow fix, edited further above),
`vitest.config.ts` (excludes `.worktrees/**` from test runs),
`package-lock.json` (one-line lockfile diff).

---

## Pass 2 — 2026-09-18, paid audit tool (seotooladda.com, "Technical Errors" PDF, score 55/100)

### Source report
User ran a paid SEO tool against the live site and pasted a PDF export
(`Indussolarsolutions.com's Technical Errors.pdf`, dated 2026-09-17 21:07).
18 distinct findings across Indexing, Mobile, Structured Data, Security,
Performance, Technologies, and Off-Page sections. User explicitly said this
would be the last SEO round for a while, so treated as a "close everything
fixable in code" pass rather than picking a few items.

### Root cause found: apex domain doesn't resolve at all (not a redirect problem)
Live-verified via WebFetch: `https://indussolarsolutions.com` (no `www`)
returns `getaddrinfo ENOTFOUND` — it has **no DNS record**, not just a
missing redirect. This is the exact same apex domain that pass 1's
`a3ad2c9` redirected TO and `54ed4a0` reverted the same day because it broke
the live site. The revert commit already documented that the apex isn't
configured in DNS yet.

The code, however, still used the apex domain as canonical everywhere
(`SITE_URL` in `src/data/seo.ts`, a duplicated copy in `src/lib/schema.ts`,
another in `src/components/Seo.tsx`, plus `index.html` and
`public/robots.txt`). Since that domain 404s at the DNS level, every crawler
check against it failed. This one root cause explained 5 of the 18 findings:
URL Resolve, Sitemap not accessible/"0 URLs" (the real sitemap on `www` was
verified live to be valid with 50 URLs), Canonical tag not 200, and both
og:image/twitter:image "couldn't be processed."

**Fix:** switched canonical domain to `https://www.indussolarsolutions.com`
(the domain that actually resolves) in all 5 places above, rather than
waiting on DNS. Chose this over re-adding a redirect since a redirect was
exactly what broke prod last time — this is a metadata-only change, no
routing/redirect risk. **Owner follow-up still open:** once apex DNS is
properly configured in Cloudflare + verified in Vercel, decide which domain
should actually be canonical long-term and redirect the other with a proper
301 (not attempted this pass — same failure mode as before if done without
DNS confirmed first).

### Findings verified as REAL and fixed
| Finding | Root cause | Fix |
|---|---|---|
| Multiple `twitter:title` / `twitter:description` values | `src/components/Seo.tsx` rendered `<title>`/`<meta>` as JSX. React 19 auto-hoists these into `<head>` on client hydration as *new* elements, duplicating the ones `scripts/prerender.ts` already wrote into the static HTML. | Rewrote `Seo.tsx` to update the existing `<head>` tags in place (`document.title =`, `element.setAttribute`) instead of rendering JSX tags. Verified in built `dist/index.html`: exactly 1 of each tag. Removed the now-dead tag-stripping regexes in `prerender.ts` (nothing leaks into the body anymore since `Seo` returns `null`). Added `Seo.test.tsx` covering the duplicate-on-rerender case as a regression test. |
| Missing explicit width/height on `<img>` (Performance) | 25 `<img>` tags across 17 files had no `width`/`height`, only the Navbar/Footer logo already did. | Added `src/components/SizedImage.tsx` — a lookup table of every image's real pixel dimensions (verified with PIL, not guessed) keyed by path, wrapping a plain `<img>`. Chosen over threading width/height through every data file's schema (products, projects, testimonials, money pages) since that would've meant touching far more files for the same result. Swapped all 25 `<img>` usages to `SizedImage`; hero slider images (rendered via framer-motion's `<motion.img>`, incompatible with the wrapper) got `width`/`height` added directly to `heroSlides` entries in `src/data/site.ts` instead. |
| Discovered Profiles — none found | No social links anywhere in the codebase. | Added `instagramUrl`/`facebookUrl` to `business` in `src/data/site.ts` and a `sameAs` array to the `LocalBusiness` schema in `index.html`: `https://www.instagram.com/indus_solarofficial` and `https://www.facebook.com/people/Indus-Solar-Solution-official/61590940191816/` (user corrected the Facebook URL mid-session — first one given was wrong). |
| Image optimization — no next-gen formats (WebP/AVIF) | All 45 photos under `public/images` were `.jpg` only. | Generated a `.webp` sibling for every `.jpg` (Python PIL, quality 82, method 6 — same convention as the existing photo-compression pass). Repointed every **on-page** `<img>`/data-file image reference to the `.webp` file (`sed` across `src/data/site.ts`, `products.ts`, `projects.ts`, `moneyPages.ts`, `LocalityPage.tsx`, and 6 components with hardcoded paths, plus `SizedImage.tsx`'s dimension keys). Deliberately did **not** touch `og:image`/`twitter:image`/schema `image`/`logo` (`index.html`, `Seo.tsx`'s `DEFAULT_IMAGE`, `seo.ts`'s `DEFAULT_IMAGE`) — those stay `.jpg` since some social-preview crawlers (older Facebook/LinkedIn/iMessage) have inconsistent WebP support for link-preview thumbnails, and this Lighthouse-style check only evaluates rendered page images, not OG meta. Net size: 6705KB → 6146KB (9% smaller) — some already-optimized images (e.g. `solar-farm-telangana.jpg`, `offer/kit.jpg`) came out marginally *larger* as WebP since they were already heavily compressed by the prior workstream; kept them as WebP anyway since the audit check is format-based, not a strict byte-savings gate. |

### Findings checked and confirmed FALSE POSITIVE (no code change — logged so we don't re-chase these)
| Finding | Why it's wrong |
|---|---|
| Tap targets too small — 3 desktop-nav links (`/`, `/solar-calculator-kanpur`, `/projects`) overlapping a dropdown button | Live-measured with Playwright at 360/390/414px viewports: these links live inside `<nav className="hidden ... xl:flex">` in `Navbar.tsx`. At mobile widths their `getBoundingClientRect()` is `0×0` (not laid out at all — correctly hidden via the ancestor's `display:none`), confirming the tool measured elements that aren't actually reachable/visible on the real mobile site. |
| Mobile Viewport — "content does not fit within the specified viewport size" | Measured `document.documentElement.scrollWidth` vs `clientWidth` at 360/390/414px: equal at all three (no horizontal overflow) on the current build. Does not reproduce. |

### Deferred — needs info only the site owner has (not fixable in this pass)
- **twitter:site**: still missing — needs the business's Twitter/X handle, or explicit confirmation to skip it (no account).
- **DMARC record**: still open from pass 1 — needs the actual mail provider for `info@indussolarsolutions.com`.
- **GA4 analytics**: user hasn't decided yet whether to install this time (said skip in pass 1).
- **Backlinks Score (Bad), Traffic Estimations (Very Low), Social Media Engagement (0 shares/likes/comments)**: off-site/organic-growth outcomes — **cannot be fixed by any code change, ever**. Will keep showing red on every future run of this or any other audit tool regardless of what ships, until there's real off-site activity.
- **Apex domain DNS**: see root-cause section above — owner needs to configure Cloudflare DNS + verify in Vercel before a real redirect can be added safely.

### Verification for this pass
- `npx tsc -b` — clean
- `npx vitest run` — 69/69 passing (63 prior + 6 new: `Seo.test.tsx` ×3, `SizedImage.test.tsx` ×3)
- `npm run build` — prerender + sitemap succeed; spot-checked `dist/index.html` directly for: `www` domain on canonical/og/sitemap/robots, exactly 1 `twitter:title`/`twitter:description`, `sameAs` present, hero image `width`/`height`, on-page images serving `.webp` while `og:image`/schema `image`/`logo` still serve `.jpg`
- Playwright screenshots at 1440px and mobile widths (390/414/360px) across homepage, products, product detail, services, about, projects — no visual regressions
- Playwright DOM measurement script (not just screenshots) for the tap-target/viewport false-positive verification — see false-positive table above

### Files changed this pass
`src/data/seo.ts`, `src/lib/schema.ts`, `src/lib/schema.test.ts`,
`src/components/Seo.tsx`, `src/components/Seo.test.tsx` (new),
`scripts/prerender.ts`, `index.html`, `public/robots.txt`,
`src/data/site.ts`, `src/components/Hero.tsx`,
new `src/components/SizedImage.tsx` + `SizedImage.test.tsx`,
`src/pages/{About,Careers,MoneyPage,Services,Projects,LocalityPage,ProductDetail,ProjectDetail,Products}.tsx`,
`src/components/{BrandsMarquee,ImpactStats,Solutions,WhyChoose,WhatWeOffer,Testimonials}.tsx`,
`src/data/{products,projects,moneyPages}.ts`,
new `public/images/**/*.webp` (45 files, siblings of existing `.jpg`s — originals kept for OG/schema use).

---

## Pass 3 — 2026-09-25, audit screenshots (Links 0, Usability C-, mobile PSI 60)

### Source report
Screenshots from an audit tool: Links (0 backlinks), Usability C- (mobile
PageSpeed 60: FCP 4.7s, LCP 6.5s, render-blocking 1.65s, image delivery 0.8s,
multiple redirects 0.63s, unused JS 0.61s), Image Optimization, Inline Styles,
Email Privacy, Local SEO "Missing: Address", Facebook Pixel, X/LinkedIn/YouTube
not linked. Baseline Lighthouse mobile on the live site before this pass: perf
53, LCP 11.5s, 2,245KB page weight.

### Root causes found and fixed
| Finding | Root cause | Fix |
|---|---|---|
| Image delivery / optimization | Every photo served at 1200–1600px to phones; all 5 hero slides fetched immediately. | `scripts/optimize-images.py` regenerates `name.webp` (q72) + `-480/-720/-960.webp` variants from the `.jpg` sources. `SizedImage` emits `srcset` automatically (`responsiveSrcSet`), callers pass real `sizes`. Hero slides 2–5 mount only after the window `load` event. Logo 192px PNG → 64px WebP (10KB → 1.7KB). |
| LCP stuck behind JS | `main.tsx` used `createRoot`, discarding the prerendered HTML and re-rendering, so the hero `<img>` (LCP) waited for the whole bundle. | `hydrateRoot` when `#root` has children; `prerender.ts` now uses `renderToString` (text-node markers needed for hydration) inside `StrictMode`. |
| Text invisible until hydration | framer-motion `initial={{opacity:0}}` was baked into prerendered HTML for above-fold headings (also 47 inline `style=` attrs). | Mount intros → CSS `.rise`; scroll reveals → CSS `.reveal` (scroll-driven `animation-timeline: view()`, content simply visible where unsupported); hero crossfade/slide text → CSS classes. framer-motion removed from the project entirely (CountUp → IntersectionObserver + rAF and now prerenders the real number; VideoModal → CSS). Bundle 162KB → 120KB gzip; homepage inline styles 47 → 0. |
| Render-blocking requests | Google Fonts stylesheet (3 families, 12 weights; Caveat never used) + separate CSS file. | Self-hosted Sora/Inter variable fonts (latin) in `public/fonts`, preloaded; ₹ glyph isn't in latin so `*-rupee.woff2` holds only U+20B9 (subset with fontTools, 97KB → 1.8KB). `prerender.ts` inlines the Tailwind CSS (~9KB gz) into each page. |
| Unused JS / third-party main-thread | gtag.js (~75KB) loaded eagerly. | Loaded on first interaction or 5s after `load`; queued `gtag()` calls still fire. |
| Email Privacy | `info@` in footer, contact page and JSON-LD. | `EmailLink` renders `info [at] domain` in prerendered HTML, real `mailto:` after mount. Removed `email` from LocalBusiness schema. |
| Address not detected | Footer address lacked PIN and semantic markup. | `<address>` element with full NAP incl. PIN 208011 (verified via pincode.net.in / goodreturns); `postalCode` added to schema; `business` in `site.ts` gains `streetAddress/city/region/postalCode`. |
| Lighthouse a11y (found while measuring) | `text-muted` 4.3:1 on cream; WhatsApp button white on #25D366 (1.98:1); testimonial dots 8px tap targets; footer text white/40–50. | `--color-muted` → #655f54 (5.4:1); button → #15803d (5.0:1); dots get a 24px button around the visible dot; footer text → white/60. |

### Verification
- `npx tsc -b` clean, `npx vitest run` 74/74 (new: `EmailLink.test.tsx`, srcset + variant-files-exist tests in `SizedImage.test.tsx`).
- Playwright scan of all 49 sitemap routes on the production build: 0 console errors (hydration mismatches would surface as React #418). Note: `vite preview` serves the homepage for `/x` and the real file only for `/x/` — test with trailing slash locally; Vercel serves `/x` correctly (verified on live).
- Local Lighthouse mobile: accessibility/best-practices/SEO 100; page weight 2,245KB → 693KB. Performance score on this laptop swung 48–91 between identical runs (battery-throttled CPU) — an A/B of the scroll-reveal CSS showed no measurable difference within that noise. **Re-measure with PageSpeed Insights on the live deploy, not locally.**

### Deferred / owner-only
- Redirect chain: `http://indussolarsolutions.com` takes 2 hops (→ https apex → www). Fix with a single Cloudflare redirect rule; always audit `https://www.indussolarsolutions.com`.
- Facebook link shows as `facebook.com/people` in the tool — display truncation, the real URL is correct (false positive). A vanity username would look cleaner.
- X / LinkedIn / YouTube accounts, Facebook Pixel ID: need owner input.
- Links = 0: off-site only; see `docs/seo-offsite-checklist.md`.
