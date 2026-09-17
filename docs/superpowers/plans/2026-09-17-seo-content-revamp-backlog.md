# SEO & Content Revamp — Running Backlog

Tracks every point raised in the 2026-09-17 SEO/content review conversation, split
into independent workstreams (per brainstorming-skill decomposition — this is too
large for a single spec). Each workstream gets its own design/approval pass before
implementation. Check items off as they land; don't remove items even if
deprioritized — mark them `[skipped: reason]` instead so nothing raised gets lost.

Source screenshots referenced below (ss1–ss6) were shared in chat, not saved to
the repo — see conversation history if the specifics need to be re-checked.

---

## Workstream 1 — Bug fixes & theme colors (DONE — 2026-09-17)

- [x] Shorten navbar labels so the bar fits on one line: "Solar Solutions" →
  "Solutions", "Solar Systems" → "Systems", "Solar Calculator" → "Calculator",
  "Solar Subsidy" → "Subsidy" (dropdown item labels stay fully descriptive).
  Verified via screenshot: navbar is a single line at 1400px.
- [x] Fix theme toggle so it actually changes the page background, not just
  accent-colored elements/scrollbar. Root cause was: `--color-cream`,
  `--color-cream-light`, `--color-charcoal`, `--color-charcoal-light` were
  never overridden under `[data-color-theme="blue"]` in `src/index.css` —
  only accent tokens were. Fixed by adding those overrides to the same rule.
- [x] Tune a coherent "royal, modern blue" light theme palette (light sections
  shift to a cool blue-white `#eef3fc` surface, dark sections shift to navy
  `#101a33`) rather than gold-background-with-blue-accents. Accent retuned to
  a more saturated royal blue (`#1d4fd8` / `#0f2f70` dark).
- [x] Verify: full test suite (60/60 pass), Playwright screenshots at 1400px
  and 390px in both themes confirm `body` background actually changes
  (`rgb(238,243,252)` in blue theme, computed via `getComputedStyle`), footer
  visibly shifts to navy, no console errors.

## Workstream 2 — Core Web Vitals / image optimization (DONE — 2026-09-17)

- [x] Compress all images in `public/images/` — resized anything over 1600px
  wide and re-encoded as mozjpeg q78 (png q80). 42 files touched, total
  16.2MB -> 6.3MB (-62%). `hero-solar-farm.jpg` alone: 4.9MB -> 173KB.
- [x] Add `fetchpriority="high"` to every page-type's LCP hero image (Hero.tsx
  homepage slider slide 0, MoneyPage.tsx, LocalityPage.tsx); add
  `loading="lazy"` to below-the-fold images that lacked it (LocalityPage
  project cards + testimonial avatars). CLS was already handled correctly —
  hero sections reserve height via `min-h-[...]` regardless of image load.
- [x] Verified: full test suite (60/60), Playwright screenshot diff before/
  after compression shows no visible quality loss, no failed/4xx requests.
- [ ] Re-check actual Lighthouse/PageSpeed score on the deployed site once
  merged (can't run real Lighthouse against localhost in this environment) —
  recommend the owner run PageSpeed Insights after deploy to confirm.

## Workstream 3 — Content rewrite: remove "AI slop," add real depth (MOSTLY DONE — 2026-09-17)

User's own framing: pages like Solar Subsidy and Solar Solutions read as
AI-generated, follow the same repeated structural pattern on every page, and
need to read like they were written by a professional who specializes in
solar — with all data/claims verified and validated, not just plausible-sounding.

- [x] Verified new facts via web research before writing anything: Uttar
  Pradesh runs its own UPNEDA state top-up subsidy (₹15,000/kW, capped
  ₹30,000/household) **on top of** the central PM Surya Ghar subsidy
  (₹78,000 cap) — corroborated across UPNEDA-adjacent sources and Tata
  Power's own guide. The site previously only mentioned the central scheme;
  this was a real, missing, non-fabricated fact.
- [x] Rewrote all 9 `moneyPages.ts` entries (the Solar Solutions/Subsidy/
  Price/Calculator pages) — extended the page template
  (`MoneyPageSection`) to support bullets, stat-grids and inline images
  alongside prose, then varied which shape each page/section uses so pages
  no longer share one identical "intro + 3 uniform paragraphs" structure.
  Every fact reused is one already published elsewhere on the site (kW
  sizing bill ranges, panel counts, subsidy figures) — nothing invented.
- [x] Built the explicit **Central + State subsidy breakdown** on
  `/solar-subsidy-kanpur`: separate stat-grid sections for PM Surya Ghar
  (central) and UPNEDA (state), then a combined-total section
  (₹78,000 + ₹30,000 = up to ₹1,08,000 for a 3kW system), each with its own
  "verify on the official portal" hedge. Updated `/pm-surya-ghar-kanpur` to
  cross-reference it, and fixed the `subsidy-amount` FAQ answer, which had
  gone inconsistent (central-only) the moment the new page shipped.
- [x] Sourced 2 genuine, properly-licensed residential rooftop photos (CC
  BY-SA 4.0, Nizil Shah / Wikimedia Commons — real homes in Mehsana,
  Gujarat, not a stock solar farm) after finding the existing image library
  was **entirely generic international stock photography** with no
  authentic Indian/residential content — see finding below. Cropped,
  compressed, credited at `public/images/residential/CREDITS.md`, and woven
  into the Installation and Residential Solar pages via the new inline-image
  section slot.
- [x] Fixed a real honesty issue found along the way: `About.tsx`'s hero
  image alt text claimed to show "Indus Solar Solutions team," but the
  photo is a generic stock shot of an unrelated utility-scale solar farm —
  corrected the alt text so it no longer implies it's this business's own
  people/work (the site's own non-negotiable, already followed for
  testimonials/projects, had drifted here).
- [x] Verified: `tsc -b` clean, full test suite (63/63), `npm run build`
  (prerender + sitemap), Playwright screenshots of the subsidy, residential
  and price pages confirm the new stat/bullet/image layout renders
  correctly with no console errors.

**Known gap, not fixed this pass:** the broader image library
(`hero-2b-adlershof.jpg`, `why-choose/engineer.jpg`, `careers/team-1.jpg`,
etc.) is still generic international stock photography — a Japanese/East
Asian commercial rooftop, a Western open-field solar farm, and Western
coworkers standing in for the "Careers" team photo. None of it is
misrepresented as this business's own work (already fine per the original
spec's rule), but none of it reads as Indian or residential either, which
was part of the original complaint. Replacing it properly means either the
owner's own real project photos, or a further round of the same
verify-a-real-license sourcing done here for the 2 new photos — flagging
as a follow-up rather than guessing more stock replacements under time
pressure.
- [ ] Lighter pass on `localities.ts` (6 short intros) and `kwSystems.ts` (5
  entries): reviewed both — these already read as distinct, locality/size-
  specific copy anchored to real linked projects/testimonials, not the
  repeated-template pattern the moneyPages had. Left as-is; revisit only if
  they still read flat once the moneyPages fix is live for comparison.

## Workstream 4 — Solar Calculator redesign (DONE — 2026-09-17)

- [x] Redesigned `SolarCalculatorV2` from a multi-step "next → next → next"
  wizard into a single-page, live-updating layout — all three input cards
  (method, location/customer, tariff) and the results report are visible
  together; the report recomputes on every keystroke via the existing
  `useMemo`, no "Next"/"Calculate" button required. Desktop: two-column
  (inputs left, sticky live report right). Mobile: single stacked column,
  same live behavior. Added a placeholder state in the report column before
  any valid input is entered, and a "Reset" action.
  Also widened the `/solar-calculator-kanpur` page's calculator container
  (`max-w-3xl` -> `max-w-5xl`, pulled out of the article-text wrapper) so the
  two-column layout has room; `HomeCalculator` (homepage) already had enough
  width.
- [x] Verified: rewrote `SolarCalculatorV2.test.tsx` for the new no-wizard
  behavior (63/63 tests pass across the suite), `npm run build` succeeds
  (prerender + sitemap unaffected), Playwright screenshots at 1400px and
  390px confirm the live two-column report on the dedicated calculator page
  and the correct stacked mobile layout.

## Reference — Technical SEO scorecard (audited 2026-09-17, see chat for full table)

Already solid: meta titles/descriptions, canonical tags, schema markup
(LocalBusiness/Breadcrumb/Service/FAQ), sitemap.xml, robots.txt, og/twitter
tags, no noindex tags, one H1 per page, clean slugs, internal linking.

Not verifiable from code / needs owner action, not a dev task:
- [ ] Broken-link crawl (needs a live crawl of the deployed site)
- [ ] Backlink strategy execution (off-page/marketing — checklist already
  exists at `docs/seo-offsite-checklist.md`)
- [ ] Google Search Console verification (needs owner's GSC account access)
- [ ] HTTPS enforcement confirmation (hosting/DNS-level, not app code)
