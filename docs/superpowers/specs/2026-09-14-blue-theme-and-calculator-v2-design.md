# Indus Solar Solutions — Blue Theme, New Pages & Calculator V2

Status: Approved by user, proceeding to implementation plan

## Context

Following a content audit of heliumsolar.in (a different, unrelated business), the
owner of Indus Solar Solutions (Kanpur) wants to close a few structural gaps that
audit surfaced — without touching the business's own honest identity, stats, or
claims (per the existing SEO-redesign spec's non-negotiable: no fabricated
reviews, case studies, prices, or locations). Additionally, the owner wants an
optional blue color theme, a broader "Kanpur & across India" positioning line,
and a rebuilt solar calculator matching a reference flow (Waaree's calculator,
shown via screenshots) with state-aware inputs, a full savings report, and
sharing.

## Non-negotiables (carried over from the original redesign spec)

- No existing page, route, or content is removed or rewritten. This work is
  purely additive plus the two changes explicitly requested (theme, positioning
  copy).
- No fabricated business claims. Team bios, franchise terms, and awards are
  **out of scope for this pass** — they require real data the owner hasn't
  supplied yet (franchise investment/eligibility/benefits are explicitly
  deferred: "I will answer 1 and 2 later").
- Mobile-first Tailwind (base = phone, `md:`/`lg:` = larger), matching the
  existing pattern from the SEO redesign's mobile-first pass.
- SEO stays primary: every new page gets a `seo.ts` entry (title, description,
  schema) so it's picked up by `scripts/prerender.ts` and `sitemap.xml`
  automatically, exactly like existing routes.

## Scope for this pass

1. Blue color theme, toggleable (gold stays default).
2. Sitewide positioning copy: add "Kanpur & across India" framing.
3. Two new pages: `/services` and `/careers`.
4. Solar Calculator V2: multi-step wizard + full savings report + sharing.
5. Image expansion: reuse existing 43 assets more widely + source additional
   real (freely licensed) photography for new pages/sections.

**Explicitly not in this pass:** `/franchise` (blocked on real investment,
eligibility, and benefits data from the owner), any team/leadership bios,
any awards/certifications section, any fabricated project or client claims.

---

## 1. Blue theme toggle

**Token rename, not a hack.** The current accent tokens in `src/index.css` are
named `--color-gold` / `--color-gold-light` / `--color-gold-dark`, and ~20
components reference Tailwind classes generated from them (`text-gold`,
`bg-gold-dark`, etc.). Rather than leave a "gold" class secretly rendering blue,
rename the token family to neutral `--color-accent` / `--color-accent-light` /
`--color-accent-dark`, and do a project-wide mechanical rename of the
`*-gold*` utility classes to `*-accent*` (including the two hardcoded gradient
classes, `.text-gold-gradient` → `.text-accent-gradient` and
`.wordmark-gradient`, which gets its stops repointed). This is a pure rename;
no visual change from today until the toggle is flipped.

**Two palettes, one attribute.** In `src/index.css`:

```css
@theme {
  /* ...existing cream/charcoal/ink tokens, unchanged... */
  --color-accent-light: #e8cf9f; /* gold (default) */
  --color-accent: #c9a876;
  --color-accent-dark: #8a6d3f;
}

[data-color-theme="blue"] {
  --color-accent-light: #d6e6fb;
  --color-accent: #1c5fc4;
  --color-accent-dark: #12356e;
}
```

Setting `data-color-theme="blue"` on `<html>` repoints every existing
`accent`-based utility class site-wide — no component changes needed beyond
the rename above.

**Toggle component.** New `src/components/ThemeToggle.tsx`: a small pill
button (swatch + label) in the Navbar, visible on mobile and desktop. On
click, flips `document.documentElement.dataset.colorTheme` between undefined
(gold) and `"blue"`, and persists the choice to `localStorage`
(`isolar-color-theme`). On mount, an inline script in `index.html` (runs
before paint, same pattern as any FOUC-avoidance snippet) reads
`localStorage` and sets the attribute immediately, so there's no color flash
on reload.

**Testing:** a small component test asserting the toggle flips the `data-`
attribute and persists to `localStorage` (matches existing component test
patterns, e.g. `SolarCalculator.test.tsx`).

---

## 2. "Kanpur & across India" positioning

Copy-only, three touch points, no stats changed:

- `src/data/site.ts` — add a short `tagline` string surfaced in the header/
  hero: `"Kanpur-based, proudly serving clients across India."`
- `About.tsx` intro paragraph — append a sentence: local installs stay the
  core (Kanpur, hands-on), with a line that consultation/design support is
  available for clients anywhere in India (honest framing — doesn't imply
  physical installation crews everywhere).
- `Footer.tsx` — company blurb line updated the same way.

No new claims about project counts, office locations, or coverage maps.

---

## 3. New page: `/services`

A service-*type* overview, distinct from the existing money pages (which are
organized by market segment/keyword, e.g. `/residential-solar-kanpur`). New
data file `src/data/services.ts`, four entries generalized from real
capabilities already implied by `process` in `site.ts` and the existing money
page content — no invented certifications or SLAs:

1. **Free Consultation & Site Survey** — energy needs, roof/shading
   assessment, budget fit.
2. **Turnkey Installation** — design, procurement, installation,
   commissioning, net-metering paperwork.
3. **Operations & Maintenance** — cleaning, inspection, performance checks.
4. **Subsidy & Paperwork Assistance** — application support for eligible
   residential systems (cross-links to the existing subsidy pages).

New `src/pages/Services.tsx` (same structural pattern as `About.tsx`: hero,
intro, card grid), added to `navigation.ts` as a top-level link, and to
`seo.ts` with its own title/description/breadcrumb schema.

---

## 4. New page: `/careers`

Generic "we're hiring" page per the owner's choice — no invented role counts
or listings. New `src/pages/Careers.tsx`:

- Short intro: growing local team, hands-on solar installation work in and
  around Kanpur.
- A handful of **role categories** (not open-position counts) phrased
  generically: Installation Technician, Site Surveyor/Sales, Office/Admin
  Support — framed as "the kind of roles we hire for," not live openings.
- CTA: WhatsApp/email to send a resume (reuses `business.whatsappUrl` /
  `business.email`, same as existing Contact CTAs).

Added to `navigation.ts` (footer/company group, not primary nav — it's not a
keyword-targeted money page) and `seo.ts`.

---

## 5. Solar Calculator V2

Replaces the single-input `SolarCalculator` component used on the homepage
and `/solar-calculator-kanpur`, with a 3-step wizard + results report,
matching the reference flow's structure (not its visual design — this stays
in the site's own theme/typography).

### Step 1 — Calculation method (tabs)
- **Monthly Bill** (₹) — existing path, unchanged formula.
- **Monthly Units** (kWh) — direct input, skips the bill→units conversion.
- **Roof Area** — sq ft or sq m input + "% of roof usable for solar" (default
  70%, adjustable); converted to kW using the standard industry rule of thumb
  of ~100 sq ft (~9.3 m²) per kW, labeled indicative.

### Step 2 — Location & customer type
- **State/UT dropdown** — new `src/data/stateSolarData.ts`: all 28 states + 8
  UTs, each with an *indicative* average residential tariff (₹/unit) and
  average peak sun-hours/day, sourced from public MNRE/CEA-range estimates.
  Every entry is labeled "indicative — adjust if your actual rate differs" in
  the UI (mirrors the reference screenshots' own disclaimer pattern), same
  honesty bar as the existing subsidy copy ("confirm current figures on the
  official portal").
- **Customer category** — Residential / Commercial / Industrial.
- **Subsidy applicable?** (shown only when Residential is selected) — With
  Subsidy (DCR) / Without Subsidy. Commercial/Industrial never show this —
  PM Surya Ghar is residential-only, matching the existing subsidy page copy.

### Step 3 — Electricity unit cost
Slider ₹1–₹30/unit, auto-filled from the selected state's tariff, manually
adjustable — exact UX from the reference screenshots.

### Results report
- **Recommended Plant Size** (kWp), **Daily Generation** (kWh),
  **Peak Sun Hours** used.
- **Electricity Generation** — Monthly / Annual / 30-year total kWh.
- **Financial Savings** — Monthly / Annual / 30-year bill savings at the
  chosen tariff.
- **System Cost & Subsidy** (only meaningfully shown with a cost estimate) —
  System Cost (using an indicative ₹/kW installed-cost constant, clearly
  labeled "get an exact quote"), minus PM Surya Ghar subsidy when
  Residential + Subsidy Applicable (reusing the site's existing figures:
  ₹30,000/kW for the first 2kW + ₹18,000 for the 3rd kW, capped at ₹78,000 —
  same numbers already published on `/solar-subsidy-kanpur`, not new), Net
  Investment.
- **Payback Period** (years) and **Annual ROI %** — derived from net
  investment ÷ annual savings.
- **Environmental Impact** — CO₂ mitigated over 30 years (using India's
  published grid emission factor, ~0.82 kg CO₂/kWh, CEA baseline) and a
  trees-equivalent conversion, both labeled as estimates.
- **Cross-sell**, not e-commerce: a small "Explore our products" strip linking
  to relevant `/products/:slug` pages (no cart/checkout exists on this site,
  so this replaces the reference's "Shop Now" product grid with the site's
  existing lead-gen pattern).
- **Share** — WhatsApp (`wa.me` link with a prefilled summary), Email
  (`mailto:` with prefilled subject/body), **Download PDF** via the browser's
  native print-to-PDF (`window.print()` against a print-optimized view) —
  avoids adding a new PDF-generation dependency for a one-click convenience
  feature.
- Disclaimer line, adapted from the existing calculator's own wording:
  "Indicative estimate based on typical sun-hours, tariffs, and installed
  costs for your state. Actual results depend on your roof, usage, and
  current scheme rules — book a free site survey for an exact quote."

### Implementation shape
- `src/lib/solarCalculatorV2.ts` (new, alongside the existing
  `solarCalculator.ts` which stays — its exports are reused where the
  formulas match) with pure, independently testable functions:
  `recommendedKwFromRoofArea`, `subsidyForResidential(kw, applicable)`,
  `systemCostEstimate(kw, category)`, `paybackYears`, `annualRoiPercent`,
  `co2MitigatedKg`, `treesEquivalent` — each with a `.test.ts`, following the
  repo's existing TDD convention (every lib file is tested; `schema.test.ts`,
  `solarCalculator` covered indirectly via component tests today, this adds
  direct unit coverage).
- `src/data/stateSolarData.ts` (new) — the state tariff/sun-hours table.
- `src/components/SolarCalculatorV2.tsx` (new component; old
  `SolarCalculator.tsx` stays in the tree but is swapped out of `HomeCalculator`
  and the calculator money page in favor of the new one — nothing is deleted,
  satisfying "don't remove existing pages/items," and the old component
  remains available if needed later).
- Mounted in two places, both already existing routes: `HomeCalculator`
  (homepage, compact mode) and `/solar-calculator-kanpur` (full page, via the
  existing `MoneyPage` template's content slot).

---

## 6. Images

- Reuse existing `public/images/*` assets more widely — the Services and
  Careers pages, and the calculator results view, draw from images already
  in the repo (e.g. `technician-rooftop.jpg`, `why-choose/engineer.jpg`) where
  a genuine match exists, rather than defaulting to plain color blocks.
- For genuinely new needs (Careers hero, Services page hero/cards), source a
  small number of additional freely-licensed photos (Unsplash, direct
  download into `public/images/` — not hotlinked, for performance and so the
  static prerender/CDN deploy stays self-contained) — generic solar/
  installation/team stock imagery, not photos presented as this specific
  business's own work.

---

## Verification

- `npm run test` — new `.test.ts`/`.test.tsx` files for: theme toggle
  component, each new `solarCalculatorV2.ts` function, `SolarCalculatorV2`
  component (step navigation, results rendering).
- `npm run build` (`tsc -b && vite build && tsx scripts/prerender.ts`) —
  confirms `/services`, `/careers`, and the updated calculator route all
  prerender correctly and appear in `dist/sitemap.xml`.
- Manual check at 375px and 768px widths for the new pages and the
  calculator wizard (mobile-first requirement).
- Manual toggle check: flip the theme button, confirm every accent-colored
  element (buttons, links, badges) switches, confirm it persists on reload.
