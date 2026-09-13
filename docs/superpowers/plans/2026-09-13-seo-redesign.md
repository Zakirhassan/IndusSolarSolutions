# Indus Solar Solutions SEO Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild indussolarsolutions.com into a mobile-first, SEO/SMO-first site covering the full Kanpur solar keyword cluster — ~32 routes, a solar calculator, structured data, and an off-site action checklist — without changing the underlying stack.

**Architecture:** Keep Vite + React 19 + React Router 7 + Tailwind 4 + the existing `scripts/prerender.ts` static-HTML-per-route generator. New content lives in typed data files (`src/data/*.ts`); a small set of reusable page templates (`MoneyPage`, `LocalityPage`, `KwSystemPage`, `BlogArticle`) render that data, so ~28 new routes are produced from ~4 template components instead of 28 near-duplicate files. `seo.ts` derives its route registry from the same data files (single source of truth for title/description/schema), and `prerender.ts` is extended to also inject each route's JSON-LD.

**Tech Stack:** React 19, TypeScript, React Router 7, Tailwind CSS 4, framer-motion, lucide-react, Vite 8, vitest (new — added in Task 1) for the handful of genuinely logic-bearing modules (calculator math, schema builders, data lookups).

**Spec:** `docs/superpowers/specs/2026-09-13-seo-redesign-design.md`

## Global Constraints

- Stack stays Vite + React Router + prerender script — no Next.js/Astro migration.
- No fabricated reviews, case studies, exact prices, or locations. Ranges and estimates must be labeled indicative.
- FAQ (`FAQPage`) JSON-LD only on `/faq`. Other pages may show FAQ content but not the schema.
- Government subsidy figures must link to the official PM Surya Ghar portal / UPNEDA and be phrased as indicative, not guaranteed.
- Every new component is written mobile-first: base (unprefixed) Tailwind classes target phone width; `md:`/`lg:` add the larger-screen overrides.
- Match existing design tokens from `src/index.css`: colors `cream`, `cream-light`, `charcoal`, `charcoal-light`, `ink`, `muted`, `gold-light`, `gold`, `gold-dark`; fonts `font-display` (Sora), `font-body` (Inter, default body).
- Follow existing detail-page visual pattern seen in `src/pages/ProductDetail.tsx`: hero image with gradient overlay + back link + motion `h1`, then a `bg-cream` content section, then shared `Footer`.
- Business data (name, phone, address, WhatsApp) always comes from `src/data/site.ts`'s `business` object — never hardcoded again.
- Currency values formatted as `₹` + comma-separated (e.g. `₹78,000`), no decimal paise.

---

### Task 1: Vitest setup + solar calculator math library

**Files:**
- Create: `src/lib/solarCalculator.ts`
- Create: `src/lib/solarCalculator.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `vitest` devDependency, add `"test": "vitest run"` script)

**Interfaces:**
- Produces: `SUN_HOURS_KANPUR: number`, `SYSTEM_DERATE: number`, `DEFAULT_TARIFF_PER_UNIT: number`, `recommendedSystemKw(monthlyUnits: number): number`, `estimateAnnualGenerationUnits(systemKw: number): number`, `estimateMonthlyGenerationUnits(systemKw: number): number`, `estimateAnnualSavings(systemKw: number, tariffPerUnit?: number): number`, `recommendedKwFromBill(monthlyBillRupees: number, tariffPerUnit?: number): number`

- [ ] **Step 1: Add vitest and wire the test script**

```bash
npm install -D vitest
```

Add to `package.json` `"scripts"`:

```json
"test": "vitest run"
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 2: Write the failing tests**

Create `src/lib/solarCalculator.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import {
  recommendedSystemKw,
  estimateAnnualGenerationUnits,
  estimateMonthlyGenerationUnits,
  estimateAnnualSavings,
  recommendedKwFromBill,
} from "./solarCalculator";

describe("recommendedSystemKw", () => {
  it("recommends 4.6kW for 500 monthly units", () => {
    expect(recommendedSystemKw(500)).toBe(4.6);
  });

  it("recommends 2.8kW for 300 monthly units", () => {
    expect(recommendedSystemKw(300)).toBe(2.8);
  });
});

describe("estimateAnnualGenerationUnits", () => {
  it("estimates 3942 units/year for a 3kW system", () => {
    expect(estimateAnnualGenerationUnits(3)).toBe(3942);
  });

  it("estimates 1314 units/year for a 1kW system", () => {
    expect(estimateAnnualGenerationUnits(1)).toBe(1314);
  });
});

describe("estimateMonthlyGenerationUnits", () => {
  it("estimates 329 units/month for a 3kW system", () => {
    expect(estimateMonthlyGenerationUnits(3)).toBe(329);
  });

  it("estimates 1095 units/month for a 10kW system", () => {
    expect(estimateMonthlyGenerationUnits(10)).toBe(1095);
  });
});

describe("estimateAnnualSavings", () => {
  it("estimates ₹31,536 annual savings for a 3kW system at ₹8/unit", () => {
    expect(estimateAnnualSavings(3, 8)).toBe(31536);
  });

  it("uses the default tariff when none is passed", () => {
    expect(estimateAnnualSavings(3)).toBe(31536);
  });
});

describe("recommendedKwFromBill", () => {
  it("recommends 3.5kW for a ₹3,000 monthly bill at ₹8/unit", () => {
    expect(recommendedKwFromBill(3000, 8)).toBe(3.5);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run src/lib/solarCalculator.test.ts`
Expected: FAIL — `Cannot find module './solarCalculator'`

- [ ] **Step 4: Implement the calculator library**

Create `src/lib/solarCalculator.ts`:

```typescript
// Indicative constants for Kanpur — used consistently across the calculator
// page, kW-size pages, and blog content so every estimate on the site agrees.
export const SUN_HOURS_KANPUR = 4.5;
export const SYSTEM_DERATE = 0.8;
export const DEFAULT_TARIFF_PER_UNIT = 8; // ₹/unit, indicative UP domestic mid-slab rate

export function recommendedSystemKw(monthlyUnits: number): number {
  const raw = monthlyUnits / (30 * SUN_HOURS_KANPUR * SYSTEM_DERATE);
  return Math.round(raw * 10) / 10;
}

export function estimateAnnualGenerationUnits(systemKw: number): number {
  return Math.round(systemKw * SUN_HOURS_KANPUR * 365 * SYSTEM_DERATE);
}

export function estimateMonthlyGenerationUnits(systemKw: number): number {
  return Math.round(estimateAnnualGenerationUnits(systemKw) / 12);
}

export function estimateAnnualSavings(
  systemKw: number,
  tariffPerUnit: number = DEFAULT_TARIFF_PER_UNIT
): number {
  return Math.round(estimateAnnualGenerationUnits(systemKw) * tariffPerUnit);
}

export function recommendedKwFromBill(
  monthlyBillRupees: number,
  tariffPerUnit: number = DEFAULT_TARIFF_PER_UNIT
): number {
  const monthlyUnits = monthlyBillRupees / tariffPerUnit;
  return recommendedSystemKw(monthlyUnits);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run src/lib/solarCalculator.test.ts`
Expected: PASS (10 tests)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/solarCalculator.ts src/lib/solarCalculator.test.ts
git commit -m "Add solar calculator math library with vitest"
```

---

### Task 2: Schema.org JSON-LD helper library

**Files:**
- Create: `src/lib/schema.ts`
- Create: `src/lib/schema.test.ts`

**Interfaces:**
- Consumes: `SITE_URL` from `src/data/seo.ts` (already exported), `business` from `src/data/site.ts` (already exported: `{ name, phone, phoneIntl, address, email, whatsappUrl, callUrl }`)
- Produces: `type JsonLd = Record<string, unknown>`, `breadcrumbSchema(items: { name: string; path: string }[]): JsonLd`, `serviceSchema(opts: { name: string; description: string; path: string; areaServed?: string[] }): JsonLd`, `faqSchema(faqs: { question: string; answer: string }[]): JsonLd`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/schema.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { breadcrumbSchema, serviceSchema, faqSchema } from "./schema";

describe("breadcrumbSchema", () => {
  it("builds a BreadcrumbList with 1-indexed positions and absolute URLs", () => {
    const result = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Subsidy", path: "/solar-subsidy-kanpur" },
    ]);
    expect(result["@type"]).toBe("BreadcrumbList");
    const items = result.itemListElement as { position: number; name: string; item: string }[];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ position: 1, name: "Home" });
    expect(items[1]).toMatchObject({ position: 2, name: "Solar Subsidy" });
    expect(items[1].item).toBe("https://indussolarsolutions.com/solar-subsidy-kanpur");
  });
});

describe("serviceSchema", () => {
  it("builds a Service schema tied to the business as provider", () => {
    const result = serviceSchema({
      name: "Residential Solar Installation",
      description: "Rooftop solar for homes in Kanpur",
      path: "/residential-solar-kanpur",
    });
    expect(result["@type"]).toBe("Service");
    expect(result.serviceType).toBe("Residential Solar Installation");
    expect(result.areaServed).toEqual(["Kanpur"]);
    expect((result.provider as { name: string }).name).toBe("Indus Solar Solutions");
    expect(result.url).toBe("https://indussolarsolutions.com/residential-solar-kanpur");
  });

  it("accepts a custom areaServed list", () => {
    const result = serviceSchema({
      name: "Industrial Solar",
      description: "desc",
      path: "/industrial-solar-kanpur",
      areaServed: ["Kanpur", "Kanpur Dehat"],
    });
    expect(result.areaServed).toEqual(["Kanpur", "Kanpur Dehat"]);
  });
});

describe("faqSchema", () => {
  it("builds an FAQPage with Question/Answer pairs", () => {
    const result = faqSchema([{ question: "Is solar worth it?", answer: "Usually, yes." }]);
    expect(result["@type"]).toBe("FAQPage");
    const entity = result.mainEntity as { "@type": string; name: string; acceptedAnswer: { text: string } }[];
    expect(entity[0].name).toBe("Is solar worth it?");
    expect(entity[0].acceptedAnswer.text).toBe("Usually, yes.");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/schema.test.ts`
Expected: FAIL — `Cannot find module './schema'`

- [ ] **Step 3: Implement the schema library**

Create `src/lib/schema.ts`:

```typescript
import { SITE_URL } from "../data/seo";
import { business } from "../data/site";

export type JsonLd = Record<string, unknown>;

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: opts.areaServed ?? ["Kanpur"],
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/schema.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts src/lib/schema.test.ts
git commit -m "Add JSON-LD schema helper library"
```

---

### Task 3: FAQ data bank

**Files:**
- Create: `src/data/faqs.ts`
- Create: `src/data/faqs.test.ts`

**Interfaces:**
- Produces: `type FaqEntry = { slug: string; question: string; answer: string }`, `faqs: FaqEntry[]`, `getFaqsBySlug(slugs: string[]): FaqEntry[]`

- [ ] **Step 1: Write the failing test**

Create `src/data/faqs.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { faqs, getFaqsBySlug } from "./faqs";

describe("faqs", () => {
  it("has 16 unique-slug entries", () => {
    expect(faqs).toHaveLength(16);
    const slugs = faqs.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getFaqsBySlug", () => {
  it("returns entries in the requested order", () => {
    const result = getFaqsBySlug(["lifespan", "price-general"]);
    expect(result.map((f) => f.slug)).toEqual(["lifespan", "price-general"]);
  });

  it("skips unknown slugs", () => {
    expect(getFaqsBySlug(["not-a-real-slug"])).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/faqs.test.ts`
Expected: FAIL — `Cannot find module './faqs'`

- [ ] **Step 3: Write the data file**

Create `src/data/faqs.ts`:

```typescript
export type FaqEntry = {
  slug: string;
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    slug: "price-general",
    question: "How much does a solar panel cost in Kanpur?",
    answer:
      "Cost depends on system size, panel technology and brand. See our Solar Panel Price in Kanpur guide for indicative ranges from 1kW to 10kW, or contact us for an exact written quote after a free site survey.",
  },
  {
    slug: "price-3kw",
    question: "How much does a 3kW solar system cost in Kanpur?",
    answer:
      "A 3kW rooftop system's price depends on panel technology, mounting structure and site complexity. See our 3kW Solar System page for what's typically included, and get a free site survey for an exact quote.",
  },
  {
    slug: "panel-count-3kw",
    question: "How many solar panels are required for a 3kW system?",
    answer:
      "With commonly used ~540W panels, a 3kW system needs about 6 panels. The exact count depends on the panel wattage chosen.",
  },
  {
    slug: "roof-space",
    question: "How much roof space is required for solar?",
    answer:
      "As a rule of thumb, plan for roughly 100 sq ft of shadow-free roof per kW of system size — so a 3kW system needs around 300 sq ft.",
  },
  {
    slug: "worth-it",
    question: "Is solar worth installing in Kanpur?",
    answer:
      "Kanpur gets strong sun exposure for most of the year, and with rising grid tariffs, rooftop solar typically pays back its cost within a few years for homes and businesses with a reasonably sunny roof. See our full guide for an honest breakdown.",
  },
  {
    slug: "subsidy-amount",
    question: "What is the solar subsidy in Kanpur?",
    answer:
      "Residential rooftop solar under the central government's PM Surya Ghar Muft Bijli Yojana can get a subsidy of up to ₹78,000 depending on system size and eligibility. Subsidy rules are set by the government and can change — always verify current figures on the official PM Surya Ghar portal before deciding.",
  },
  {
    slug: "pm-surya-ghar-apply",
    question: "How do I apply for PM Surya Ghar?",
    answer:
      "Register on the official PM Surya Ghar portal, apply for feasibility approval, get the system installed by an empanelled vendor, and submit net-metering and commissioning documents. See our step-by-step application guide for the full process.",
  },
  {
    slug: "installation-time",
    question: "How long does solar panel installation take?",
    answer:
      "A typical residential rooftop installation takes 1 to 3 days on-site once materials are on hand. Net-metering approval afterward can take a few additional weeks depending on the DISCOM.",
  },
  {
    slug: "best-panel",
    question: "Which solar panel is best for a home?",
    answer:
      "For most Kanpur homes, high-efficiency mono PERC panels offer the best balance of output, durability and price. We help you choose based on your roof size and budget during the free consultation.",
  },
  {
    slug: "generation-3kw",
    question: "How much electricity does a 3kW solar system generate?",
    answer:
      "A well-sited 3kW system in Kanpur generates roughly 320-330 units of electricity per month on average across the year, depending on shading, orientation and weather.",
  },
  {
    slug: "cloudy-weather",
    question: "Does solar work during cloudy weather?",
    answer:
      "Yes — panels still generate power on cloudy days, though output is lower than on clear days. Kanpur has enough sunny days annually for solar to remain worthwhile.",
  },
  {
    slug: "power-cut",
    question: "Does solar work during power cuts?",
    answer:
      "A standard grid-tied solar system shuts off during a power cut for safety, as required by grid codes. If you need power during outages, we can add a hybrid inverter with battery backup.",
  },
  {
    slug: "maintenance",
    question: "What maintenance does a solar system require?",
    answer:
      "Panels need periodic cleaning to remove dust — more frequent in Kanpur's dustier months — and an annual check of wiring, inverter and mounting hardware. We offer maintenance plans after installation.",
  },
  {
    slug: "lifespan",
    question: "What is the lifespan of solar panels?",
    answer:
      "Most panels we install carry a 25-year performance warranty, and typically keep generating usable power well beyond that with basic maintenance.",
  },
  {
    slug: "roof-old-house",
    question: "Can solar panels be installed on an old house?",
    answer:
      "In most cases yes, as long as the roof structure is sound enough to hold the mounting frame. We check roof condition during the free site survey before finalising a design.",
  },
  {
    slug: "net-metering",
    question: "What happens when I generate more electricity than I use?",
    answer:
      "With net metering, surplus units you export to the grid are credited against the units you draw later, reducing your net electricity bill.",
  },
];

export function getFaqsBySlug(slugs: string[]): FaqEntry[] {
  return slugs
    .map((slug) => faqs.find((f) => f.slug === slug))
    .filter((f): f is FaqEntry => f !== undefined);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/faqs.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/faqs.ts src/data/faqs.test.ts
git commit -m "Add FAQ data bank"
```

---

### Task 4: kW system size data

**Files:**
- Create: `src/data/kwSystems.ts`
- Create: `src/data/kwSystems.test.ts`

**Interfaces:**
- Consumes: `estimateMonthlyGenerationUnits` from `src/lib/solarCalculator.ts` (Task 1)
- Produces: `type KwSystemEntry = { slug: string; kw: number; title: string; metaDescription: string; h1: string; suitsWho: string; roofAreaSqFt: number; panelCountEstimate: number; monthlyGenerationEstimateUnits: number; intro: string; faqSlugs: string[] }`, `kwSystems: KwSystemEntry[]`, `getKwSystemBySlug(slug: string): KwSystemEntry | undefined`

- [ ] **Step 1: Write the failing test**

Create `src/data/kwSystems.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { kwSystems, getKwSystemBySlug } from "./kwSystems";

describe("kwSystems", () => {
  it("has 5 entries with unique slugs matching /:kw:kw-solar-system-kanpur/", () => {
    expect(kwSystems).toHaveLength(5);
    expect(kwSystems.map((s) => s.slug)).toEqual([
      "1kw-solar-system-kanpur",
      "2kw-solar-system-kanpur",
      "3kw-solar-system-kanpur",
      "5kw-solar-system-kanpur",
      "10kw-solar-system-kanpur",
    ]);
  });

  it("derives monthly generation from the shared calculator formula", () => {
    const threeKw = kwSystems.find((s) => s.kw === 3)!;
    expect(threeKw.monthlyGenerationEstimateUnits).toBe(329);
  });
});

describe("getKwSystemBySlug", () => {
  it("finds a system by slug", () => {
    expect(getKwSystemBySlug("5kw-solar-system-kanpur")?.kw).toBe(5);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getKwSystemBySlug("99kw-solar-system-kanpur")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/kwSystems.test.ts`
Expected: FAIL — `Cannot find module './kwSystems'`

- [ ] **Step 3: Write the data file**

Create `src/data/kwSystems.ts`:

```typescript
import { estimateMonthlyGenerationUnits } from "../lib/solarCalculator";
import { getFaqsBySlug, type FaqEntry } from "./faqs";

export type KwSystemEntry = {
  slug: string;
  kw: number;
  title: string;
  metaDescription: string;
  h1: string;
  suitsWho: string;
  roofAreaSqFt: number;
  panelCountEstimate: number;
  monthlyGenerationEstimateUnits: number;
  intro: string;
  faqSlugs: string[];
};

const PANEL_WATTAGE = 540;

function buildEntry(
  kw: number,
  suitsWho: string,
  intro: string,
  faqSlugs: string[]
): KwSystemEntry {
  return {
    slug: `${kw}kw-solar-system-kanpur`,
    kw,
    title: `${kw}kW Solar System in Kanpur | Indus Solar Solutions`,
    metaDescription: `${kw}kW solar system in Kanpur — who it suits, roof area needed, estimated generation, and indicative pricing factors. Free site survey included.`,
    h1: `${kw}kW Solar System in Kanpur`,
    suitsWho,
    roofAreaSqFt: kw * 100,
    panelCountEstimate: Math.ceil((kw * 1000) / PANEL_WATTAGE),
    monthlyGenerationEstimateUnits: estimateMonthlyGenerationUnits(kw),
    intro,
    faqSlugs,
  };
}

export const kwSystems: KwSystemEntry[] = [
  buildEntry(
    1,
    "A small household with 1-2 major appliances and a modest monthly bill (roughly ₹800-1,200), or as a starter system for a single-room setup.",
    "A 1kW system is the smallest practical rooftop solar system for a home — a good starting point if your roof space or budget is limited, or as a first step before scaling up later.",
    ["price-general", "roof-space", "lifespan"]
  ),
  buildEntry(
    2,
    "A small to mid-size home with a monthly bill around ₹1,500-2,200, typically running a couple of ACs, a refrigerator and standard appliances.",
    "A 2kW system suits homes with moderate daytime electricity use — enough to meaningfully cut a monthly bill without needing a large roof footprint.",
    ["price-general", "roof-space", "subsidy-amount"]
  ),
  buildEntry(
    3,
    "The most common size for Kanpur homes — suits a mid-size household with a monthly bill around ₹2,500-3,500, running 1-2 ACs, a refrigerator, and regular appliance use.",
    "3kW is the size we install most often for Kanpur homes. It balances upfront cost against meaningful savings, and typically qualifies for the higher tier of PM Surya Ghar subsidy.",
    ["price-3kw", "panel-count-3kw", "generation-3kw", "subsidy-amount"]
  ),
  buildEntry(
    5,
    "A larger home or a small shop/office with a monthly bill around ₹4,000-6,000, or multiple ACs and higher daytime usage.",
    "A 5kW system suits larger households or small commercial spaces with higher daytime consumption — enough roof space and budget to meaningfully offset a bigger bill.",
    ["price-general", "roof-space", "installation-time"]
  ),
  buildEntry(
    10,
    "A larger commercial property, small factory unit, or multiple residential units combined, with substantial daytime electricity consumption.",
    "A 10kW system is typically a commercial or light-industrial installation — see our Commercial Solar and Industrial Solar pages for what changes in design and installation at this scale.",
    ["price-general", "maintenance", "net-metering"]
  ),
];

export function getKwSystemBySlug(slug: string): KwSystemEntry | undefined {
  return kwSystems.find((s) => s.slug === slug);
}

export function getKwSystemFaqs(entry: KwSystemEntry): FaqEntry[] {
  return getFaqsBySlug(entry.faqSlugs);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/kwSystems.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/kwSystems.ts src/data/kwSystems.test.ts
git commit -m "Add kW system size data derived from calculator formulas"
```

---

### Task 5: Locality data

**Files:**
- Create: `src/data/localities.ts`
- Create: `src/data/localities.test.ts`

**Interfaces:**
- Consumes: `testimonials` from `src/data/site.ts` (existing: `{ quote, name, role, image }[]`), `projects` from `src/data/projects.ts` (existing: `{ title, location, image }[]`)
- Produces: `type LocalityEntry = { slug: string; name: string; title: string; metaDescription: string; h1: string; intro: string; matchText: string }`, `localities: LocalityEntry[]`, `getLocalityBySlug(slug: string): LocalityEntry | undefined`, `getTestimonialsForLocality(entry: LocalityEntry): typeof testimonials`, `getProjectsForLocality(entry: LocalityEntry): typeof projects`

- [ ] **Step 1: Write the failing test**

Create `src/data/localities.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import {
  localities,
  getLocalityBySlug,
  getTestimonialsForLocality,
  getProjectsForLocality,
} from "./localities";

describe("localities", () => {
  it("has 6 entries with unique slugs", () => {
    expect(localities).toHaveLength(6);
    const slugs = localities.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(6);
  });

  it("each locality has at least one matching testimonial and one matching project", () => {
    for (const entry of localities) {
      expect(getTestimonialsForLocality(entry).length).toBeGreaterThan(0);
      expect(getProjectsForLocality(entry).length).toBeGreaterThan(0);
    }
  });
});

describe("getLocalityBySlug", () => {
  it("finds Kidwai Nagar", () => {
    expect(getLocalityBySlug("solar-panel-installation-kidwai-nagar")?.name).toBe("Kidwai Nagar");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getLocalityBySlug("solar-panel-installation-nowhere")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/localities.test.ts`
Expected: FAIL — `Cannot find module './localities'`

- [ ] **Step 3: Write the data file**

Create `src/data/localities.ts`:

```typescript
import { testimonials } from "./site";
import { projects } from "./projects";

export type LocalityEntry = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  matchText: string;
};

function buildEntry(name: string, matchText: string, intro: string): LocalityEntry {
  const slug = `solar-panel-installation-${matchText
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  return {
    slug,
    name,
    title: `Solar Panel Installation in ${name}, Kanpur | Indus Solar Solutions`,
    metaDescription: `Rooftop solar panel installation in ${name}, Kanpur — real local projects, free site survey, and after-sales support from Indus Solar Solutions.`,
    h1: `Solar Panel Installation in ${name}, Kanpur`,
    intro,
    matchText,
  };
}

export const localities: LocalityEntry[] = [
  buildEntry(
    "Kidwai Nagar",
    "Kidwai Nagar",
    "Kidwai Nagar, home to our own office near Sabji Mandi, is one of the areas we know best — a mix of residential streets and commercial market frontage, most with flat RCC roofs well suited to solar."
  ),
  buildEntry(
    "Kalyanpur",
    "Kalyanpur",
    "Kalyanpur, near IIT Kanpur, is a mix of established residential colonies and newer construction — most homes here have flat roofs with good south-facing exposure for solar."
  ),
  buildEntry(
    "Panki",
    "Panki",
    "Panki Industrial Area is home to factories and industrial units with large sloped or flat roofs and high daytime power consumption — exactly the profile where rooftop solar delivers the fastest payback."
  ),
  buildEntry(
    "Civil Lines",
    "Civil Lines",
    "Civil Lines is Kanpur's commercial and administrative hub, with offices and commercial buildings that run high daytime loads — a strong fit for commercial rooftop solar."
  ),
  buildEntry(
    "Kakadeo",
    "Kakadeo",
    "Kakadeo is a dense residential and commercial market area — smaller roof footprints here mean careful system design matters more to get the most out of available space."
  ),
  buildEntry(
    "Swaroop Nagar",
    "Swaroop Nagar",
    "Swaroop Nagar is an established residential colony with larger independent houses — many with generous flat-roof space well suited to a full-size residential solar system."
  ),
];

export function getLocalityBySlug(slug: string): LocalityEntry | undefined {
  return localities.find((l) => l.slug === slug);
}

export function getTestimonialsForLocality(entry: LocalityEntry): typeof testimonials {
  return testimonials.filter((t) => t.role.includes(entry.matchText));
}

export function getProjectsForLocality(entry: LocalityEntry): typeof projects {
  return projects.filter((p) => p.location.includes(entry.matchText));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/localities.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/localities.ts src/data/localities.test.ts
git commit -m "Add locality data with real matching testimonials/projects"
```

---

### Task 6: Money page data (9 core SEO pages)

**Files:**
- Create: `src/data/moneyPages.ts`
- Create: `src/data/moneyPages.test.ts`

**Interfaces:**
- Consumes: `getFaqsBySlug` from `src/data/faqs.ts` (Task 3)
- Produces: `type MoneyPageEntry = { slug: string; title: string; metaDescription: string; h1: string; targetKeyword: string; heroImage: string; intro: string; sections: { heading: string; body: string }[]; faqSlugs: string[] }`, `moneyPages: MoneyPageEntry[]`, `getMoneyPageBySlug(slug: string): MoneyPageEntry | undefined`

- [ ] **Step 1: Write the failing test**

Create `src/data/moneyPages.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { moneyPages, getMoneyPageBySlug } from "./moneyPages";

describe("moneyPages", () => {
  it("has 9 entries with unique slugs", () => {
    expect(moneyPages).toHaveLength(9);
    const slugs = moneyPages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(9);
  });

  it("every entry has at least 1 section and at least 2 faqSlugs", () => {
    for (const page of moneyPages) {
      expect(page.sections.length).toBeGreaterThanOrEqual(1);
      expect(page.faqSlugs.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("getMoneyPageBySlug", () => {
  it("finds the residential solar page", () => {
    expect(getMoneyPageBySlug("residential-solar-kanpur")?.h1).toBe(
      "Residential Solar Panels for Homes in Kanpur"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/moneyPages.test.ts`
Expected: FAIL — `Cannot find module './moneyPages'`

- [ ] **Step 3: Write the data file**

Create `src/data/moneyPages.ts`:

```typescript
export type MoneyPageEntry = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  targetKeyword: string;
  heroImage: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqSlugs: string[];
};

export const moneyPages: MoneyPageEntry[] = [
  {
    slug: "solar-panel-installation-kanpur",
    title: "Solar Panel Installation in Kanpur | Indus Solar Solutions",
    metaDescription:
      "Get rooftop solar panel installation in Kanpur for homes, shops, and factories. Free site survey, subsidy assistance, and after-sales support from Indus Solar Solutions.",
    h1: "Solar Panel Installation in Kanpur",
    targetKeyword: "solar panel installation Kanpur",
    heroImage: "/images/hero/hero-5-rooftop.jpg",
    intro:
      "Indus Solar Solutions installs rooftop solar systems across Kanpur — from single homes in Kidwai Nagar to factory rooftops in Panki. Every installation starts with a free site visit so the system we design actually matches your roof, budget and electricity usage, not a generic package.",
    sections: [
      {
        heading: "How Installation Works",
        body: "We start with a free consultation and site survey to measure your roof, check shading and assess your electricity bill. From there we design a system sized to your actual usage, apply for any subsidy you're eligible for, install the panels, inverter and wiring, and handle commissioning and net-metering paperwork with your DISCOM. Most residential installations are completed on-site within 1-3 days; net-metering approval can take a few additional weeks.",
      },
      {
        heading: "Residential, Commercial & Industrial Installation",
        body: "We install systems for homes, shops, offices and factories across Kanpur and Kanpur Dehat, sizing each system differently — see our dedicated Residential Solar, Commercial Solar and Industrial Solar pages for what changes at each scale.",
      },
      {
        heading: "Why Installation Quality Matters",
        body: "A poorly installed system underperforms for its entire 25-year life. We use corrosion-resistant mounting structures rated for Kanpur's weather, certified balance-of-system components, and check every installation before handover — not just the panels themselves.",
      },
    ],
    faqSlugs: ["installation-time", "roof-old-house", "maintenance", "roof-space"],
  },
  {
    slug: "rooftop-solar-kanpur",
    title: "Rooftop Solar in Kanpur | Installation & Solutions — Indus Solar Solutions",
    metaDescription:
      "Rooftop solar solutions for Kanpur homes and businesses — residential, commercial and industrial rooftop systems, sized to your roof and designed for Kanpur's sun and weather.",
    h1: "Rooftop Solar Installation in Kanpur",
    targetKeyword: "rooftop solar Kanpur",
    heroImage: "/images/hero/hero-4-array.jpg",
    intro:
      "Rooftop solar turns unused roof space into a source of savings. Whether it's a flat concrete roof, a sloped tin shed, or a factory rooftop, we design the mounting layout, tilt angle and wiring to fit what you actually have.",
    sections: [
      {
        heading: "What Makes a Roof Good for Solar",
        body: "The main things we check during a free site survey: shadow-free hours through the day, roof orientation (south-facing gets the most sun in Kanpur), structural strength to hold the mounting frame, and access for cabling to your meter and inverter location. Most Kanpur rooftops — flat RCC roofs especially — work well for solar.",
      },
      {
        heading: "Flat Roof vs Sloped Roof Systems",
        body: "Flat RCC roofs, common across Kanpur homes and shops, use tilted mounting frames set at the optimal angle for year-round generation. Sloped metal-shed roofs, common on factories and warehouses, typically use rail-mounted systems that follow the existing slope. We size and mount each differently rather than using a one-size-fits-all frame.",
      },
      {
        heading: "From Roof Survey to Commissioning",
        body: "After the site survey and design, we handle procurement, installation, wiring, and net-metering paperwork with your DISCOM, so you don't have to coordinate multiple vendors.",
      },
    ],
    faqSlugs: ["roof-space", "roof-old-house", "cloudy-weather", "power-cut"],
  },
  {
    slug: "residential-solar-kanpur",
    title: "Residential Solar Panels for Homes in Kanpur | Indus Solar Solutions",
    metaDescription:
      "Solar panel systems for homes in Kanpur — cut your monthly electricity bill, apply for PM Surya Ghar subsidy, and get a system sized to your household's usage.",
    h1: "Residential Solar Panels for Homes in Kanpur",
    targetKeyword: "residential solar Kanpur",
    heroImage: "/images/rooftop-installation.jpg",
    intro:
      "Most Kanpur households considering solar are trying to solve one problem: an electricity bill that keeps climbing. A correctly sized rooftop system can cut that bill significantly and, for most homes, qualifies for a central government subsidy that lowers the upfront cost.",
    sections: [
      {
        heading: "Sizing a System for Your Home",
        body: "We size residential systems from your last few months of electricity bills, not guesswork — typically 1kW to 5kW covers most Kanpur homes depending on family size and appliance usage. See our 1kW through 10kW system pages for what each size actually covers, or use our solar calculator for a quick estimate.",
      },
      {
        heading: "PM Surya Ghar Subsidy for Homes",
        body: "Residential rooftop solar is eligible for subsidy under the central government's PM Surya Ghar Muft Bijli Yojana — up to ₹78,000 depending on system size and eligibility. We help with the application, but exact figures should be confirmed on the official portal since scheme terms can change. See our Solar Subsidy in Kanpur and PM Surya Ghar guide pages for the current process.",
      },
      {
        heading: "What's Included",
        body: "Our residential packages include panels, inverter, mounting structure, cabling and protection gear, installation, commissioning, and subsidy application assistance — one point of contact from quote to a working system.",
      },
    ],
    faqSlugs: ["price-general", "subsidy-amount", "roof-space", "lifespan"],
  },
  {
    slug: "commercial-solar-kanpur",
    title: "Commercial Solar Installation in Kanpur | Indus Solar Solutions",
    metaDescription:
      "Solar power for shops, offices and commercial buildings in Kanpur — reduce operating costs with rooftop solar sized for commercial electricity usage and load patterns.",
    h1: "Commercial Solar Installation in Kanpur",
    targetKeyword: "commercial solar installation Kanpur",
    heroImage: "/images/offer/panels.jpg",
    intro:
      "Commercial electricity tariffs are usually higher than residential ones, which means a rooftop system pays back faster for a shop, office or commercial building than it does for many homes. We size commercial systems around actual daytime load, when your business is open and consuming the most power.",
    sections: [
      {
        heading: "Why Commercial Solar Pays Back Faster",
        body: "Businesses typically consume most of their electricity during working hours — the same hours solar panels generate the most power. That overlap means a larger share of your generation offsets grid electricity directly at commercial tariff rates, rather than being exported at lower rates.",
      },
      {
        heading: "Sizing for Shops, Offices & Retail",
        body: "We assess your sanctioned load, monthly consumption and available roof or terrace space, then design a system that covers as much of your daytime usage as the roof allows. Net metering handles any electricity you draw outside sunlight hours.",
      },
      {
        heading: "Minimal Disruption to Business Hours",
        body: "Installation is scheduled around your operating hours where possible, and we plan wiring and shutdowns to keep disruption to your business as short as possible.",
      },
    ],
    faqSlugs: ["price-general", "installation-time", "net-metering", "maintenance"],
  },
  {
    slug: "industrial-solar-kanpur",
    title: "Industrial Solar Installation in Kanpur | Indus Solar Solutions",
    metaDescription:
      "Large-scale rooftop solar for factories and industrial units in Kanpur and Kanpur Dehat — cut per-unit power costs with systems engineered for industrial loads.",
    h1: "Industrial Solar Installation in Kanpur",
    targetKeyword: "industrial solar Kanpur",
    heroImage: "/images/solar-farm-telangana.jpg",
    intro:
      "Industrial units and factories around Kanpur and Kanpur Dehat often run high, steady daytime loads — exactly the load profile where a larger rooftop or ground-mount solar system delivers the most savings per rupee invested.",
    sections: [
      {
        heading: "Engineered for Industrial Roofs and Loads",
        body: "Factory sheds typically have large sloped metal roofs or open yard space suited to ground-mount arrays. We design mounting structures rated for the wind and load conditions of the site, and size the system against your actual sanctioned industrial load and shift patterns.",
      },
      {
        heading: "Planning Around Production Schedules",
        body: "We coordinate installation timing and any required shutdowns with your production schedule, since factories can't always pause operations for solar work.",
      },
      {
        heading: "Solar EPC for Industrial Sites",
        body: "For industrial projects we handle the full EPC scope — design, procurement, installation, and commissioning — plus net-metering or open-access coordination where applicable, so your team deals with one contractor, not five.",
      },
    ],
    faqSlugs: ["price-general", "maintenance", "lifespan", "net-metering"],
  },
  {
    slug: "solar-panel-price-kanpur",
    title: "Solar Panel Price in Kanpur: 1kW–10kW Systems | Indus Solar Solutions",
    metaDescription:
      "What affects solar panel price in Kanpur — panel technology, inverter, mounting, and site complexity — with indicative ranges for 1kW to 10kW systems and what's included.",
    h1: "Solar Panel Price in Kanpur: 1kW–10kW Systems",
    targetKeyword: "solar panel price Kanpur",
    heroImage: "/images/offer/kit.jpg",
    intro:
      "Solar system price varies by size and by what's included — panel brand and technology, inverter type, mounting structure, cable length, and site complexity all move the final number. Rather than quote a single misleading figure, this page explains what drives the price so you know what you're actually paying for.",
    sections: [
      {
        heading: "What Changes the Price",
        body: "Panel technology (standard poly vs high-efficiency mono PERC or bifacial), inverter type (string vs hybrid with battery-ready capability), mounting structure complexity, cable run length, roof accessibility, and whether battery storage is included all affect the final cost. Two 3kW systems can be priced differently depending on these choices — we walk through each option during your free consultation.",
      },
      {
        heading: "System Size by kW",
        body: "Browse our dedicated pages for each common size — 1kW, 2kW, 3kW, 5kW and 10kW — covering who each size typically suits, roof area needed, and estimated monthly generation.",
      },
      {
        heading: "Getting an Accurate Quote",
        body: "The only way to get a number you can rely on is a free site survey — we measure your roof, review your electricity bills, and give you a written quote covering exactly what's included, with no hidden line items added later.",
      },
    ],
    faqSlugs: ["price-general", "price-3kw", "panel-count-3kw", "roof-space"],
  },
  {
    slug: "solar-subsidy-kanpur",
    title: "Solar Subsidy in Kanpur | PM Surya Ghar Guide — Indus Solar Solutions",
    metaDescription:
      "Solar subsidy in Kanpur explained — eligibility, the PM Surya Ghar scheme, and how to apply, with links to official government sources for current figures.",
    h1: "Solar Subsidy in Kanpur: Eligibility & How to Apply",
    targetKeyword: "solar subsidy Kanpur",
    heroImage: "/images/technician-rooftop.jpg",
    intro:
      "The central government's PM Surya Ghar Muft Bijli Yojana is the main subsidy route for residential rooftop solar in Kanpur and across Uttar Pradesh. This page explains eligibility and the application process in plain terms — for the full guide on the scheme itself, see our PM Surya Ghar in Kanpur page.",
    sections: [
      {
        heading: "Who Is Eligible",
        body: "The scheme is aimed at residential households installing grid-connected rooftop solar. Eligibility and subsidy amounts depend on system size and are set by the Ministry of New and Renewable Energy (MNRE) — commercial and industrial installations are generally not covered under this residential scheme. We check your eligibility as part of the free consultation.",
      },
      {
        heading: "Indicative Subsidy Amount",
        body: "As published by the scheme, residential subsidy is structured per kW for the first few kW of system size, up to a stated maximum (commonly cited as up to ₹78,000 for larger residential systems). Because government schemes can be revised, always confirm current figures on the official PM Surya Ghar portal or with UPNEDA before finalising your decision — we'll point you to both.",
      },
      {
        heading: "How We Help With the Paperwork",
        body: "We assist with portal registration, feasibility application, installation by an empanelled vendor, and submitting commissioning documents for subsidy disbursal — see our step-by-step PM Surya Ghar application guide.",
      },
      {
        heading: "Official Resources",
        body: "PM Surya Ghar national portal, UPNEDA (Uttar Pradesh New and Renewable Energy Development Agency) for state-level rooftop solar information, and your local DISCOM for net-metering rules — we link to each so you can verify details independently.",
      },
    ],
    faqSlugs: ["subsidy-amount", "pm-surya-ghar-apply", "net-metering"],
  },
  {
    slug: "pm-surya-ghar-kanpur",
    title: "PM Surya Ghar Yojana in Kanpur | Guide & Application — Indus Solar Solutions",
    metaDescription:
      "PM Surya Ghar Muft Bijli Yojana explained for Kanpur residents — what the scheme covers, eligibility, and the step-by-step application process.",
    h1: "PM Surya Ghar Yojana in Kanpur: Guide & Application",
    targetKeyword: "PM Surya Ghar Kanpur",
    heroImage: "/images/why-choose/engineer.jpg",
    intro:
      "PM Surya Ghar Muft Bijli Yojana is the central government's flagship rooftop solar subsidy scheme, launched to help households install rooftop solar with financial support. Here's what it means for homeowners in Kanpur.",
    sections: [
      {
        heading: "What the Scheme Covers",
        body: "The scheme provides a capital subsidy for residential rooftop solar installations, structured by system size, along with simplified processes for net-metering and loans through participating banks. Full current details are published on the official PM Surya Ghar portal — we keep this page updated but always treat the government portal as the source of truth.",
      },
      {
        heading: "Step-by-Step Application Process",
        body: "1. Register on the national portal with your electricity consumer number and DISCOM details. 2. Apply for rooftop solar and receive feasibility approval. 3. Get the system installed by an MNRE-registered/empanelled vendor. 4. Submit plant details for net-meter installation. 5. After inspection, the DISCOM issues a commissioning certificate. 6. Submit bank account details and a cancelled cheque through the portal to receive the subsidy directly. We assist through each of these steps.",
      },
      {
        heading: "Kanpur & Uttar Pradesh Specifics",
        body: "In Uttar Pradesh, UPNEDA coordinates rooftop solar promotion at the state level, and your local DISCOM handles net-metering approval. We work within these local processes rather than a generic pan-India workflow.",
      },
    ],
    faqSlugs: ["pm-surya-ghar-apply", "subsidy-amount", "net-metering"],
  },
  {
    slug: "solar-calculator-kanpur",
    title: "Solar Savings Calculator for Kanpur | Indus Solar Solutions",
    metaDescription:
      "Estimate the right solar system size, generation, and potential savings for your home or business in Kanpur — enter your monthly electricity bill to get started.",
    h1: "Solar Savings Calculator for Kanpur",
    targetKeyword: "solar calculator Kanpur",
    heroImage: "/images/impact-sunset.jpg",
    intro:
      "Enter your average monthly electricity bill below to get an indicative recommended system size, estimated generation, and estimated annual savings. This is a starting estimate based on typical Kanpur sun-hours — your exact numbers depend on your roof and usage pattern, which we confirm with a free site survey.",
    sections: [
      {
        heading: "How This Estimate Is Calculated",
        body: "We estimate recommended system size from your monthly electricity usage, then estimate annual generation using Kanpur's average usable sun-hours and a standard system derate factor that accounts for real-world losses (wiring, temperature, dust, inverter efficiency). Savings are estimated using an indicative per-unit tariff — your actual DISCOM slab rate may differ. This tool gives a starting point, not a quote.",
      },
    ],
    faqSlugs: ["price-general", "generation-3kw", "worth-it"],
  },
];

export function getMoneyPageBySlug(slug: string): MoneyPageEntry | undefined {
  return moneyPages.find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/moneyPages.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/moneyPages.ts src/data/moneyPages.test.ts
git commit -m "Add money page content data for 9 core SEO pages"
```

---

### Task 7: Blog article data

**Files:**
- Create: `src/data/blog.ts`
- Create: `src/data/blog.test.ts`

**Interfaces:**
- Produces: `type BlogArticle = { slug: string; title: string; metaDescription: string; h1: string; publishedDate: string; lastUpdated: string; author: string; sections: { heading?: string; paragraphs: string[] }[] }`, `blogArticles: BlogArticle[]`, `getBlogArticleBySlug(slug: string): BlogArticle | undefined`

- [ ] **Step 1: Write the failing test**

Create `src/data/blog.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { blogArticles, getBlogArticleBySlug } from "./blog";

describe("blogArticles", () => {
  it("has 3 entries with unique slugs and an honest author label", () => {
    expect(blogArticles).toHaveLength(3);
    const slugs = blogArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(3);
    for (const article of blogArticles) {
      expect(article.author).toBe("Indus Solar Solutions Team");
      expect(article.sections.length).toBeGreaterThan(1);
    }
  });
});

describe("getBlogArticleBySlug", () => {
  it("finds the cost guide article", () => {
    expect(getBlogArticleBySlug("solar-panel-cost-kanpur-guide")?.h1).toBe(
      "Solar Panel Cost in Kanpur: Complete Guide"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/blog.test.ts`
Expected: FAIL — `Cannot find module './blog'`

- [ ] **Step 3: Write the data file**

Create `src/data/blog.ts`:

```typescript
export type BlogArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  publishedDate: string;
  lastUpdated: string;
  author: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "solar-panel-cost-kanpur-guide",
    title: "Solar Panel Cost in Kanpur: Complete Guide | Indus Solar Solutions",
    metaDescription:
      "What actually drives solar panel cost in Kanpur — panel technology, inverter type, mounting structure, and site complexity — explained honestly, with no fixed fake prices.",
    h1: "Solar Panel Cost in Kanpur: Complete Guide",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-13",
    author: "Indus Solar Solutions Team",
    sections: [
      {
        paragraphs: [
          "If you've started researching solar for your home or business in Kanpur, you've probably noticed prices quoted online vary a lot — sometimes by tens of thousands of rupees for what looks like the same size system. That's because 'solar panel cost' isn't one number; it's the sum of several components and choices, and vendors bundle them differently.",
        ],
      },
      {
        heading: "What's Actually in the Price",
        paragraphs: [
          "A complete solar installation includes panels, an inverter, mounting structure, cabling and protection equipment (the 'balance of system'), and labour for installation and commissioning. Panel technology alone can shift the price meaningfully — standard polycrystalline panels cost less upfront than high-efficiency mono PERC or bifacial panels, which generate more power per square foot but cost more per panel. Similarly, a basic string inverter costs less than a hybrid inverter that's ready for battery backup.",
        ],
      },
      {
        heading: "Why Size Isn't the Only Variable",
        paragraphs: [
          "Two 5kW systems can be priced quite differently depending on roof type (a flat RCC roof needs different mounting than a sloped metal shed), cable run length between panels and your meter/inverter location, and whether the site needs extra structural reinforcement. This is why we do a free site survey before quoting — a price based on system size alone, without seeing your roof, is a guess.",
        ],
      },
      {
        heading: "Where Government Subsidy Fits In",
        paragraphs: [
          "For residential systems, the PM Surya Ghar Muft Bijli Yojana subsidy can offset a meaningful part of the upfront cost — see our Solar Subsidy in Kanpur guide for current eligibility and how to apply. Commercial and industrial systems generally don't qualify for this particular scheme, but often have a faster payback anyway due to higher daytime tariffs.",
        ],
      },
      {
        heading: "How to Get a Number You Can Trust",
        paragraphs: [
          "Rather than comparing a single headline price across vendors, ask what's included: panel brand and warranty, inverter brand and warranty, mounting structure material and rating, and what happens if something needs servicing after year one. We provide a written, itemised quote after every site survey, and you're welcome to compare it against any other quote line by line.",
        ],
      },
    ],
  },
  {
    slug: "is-rooftop-solar-worth-it-kanpur",
    title: "Is Rooftop Solar Worth It in Kanpur? Complete 2026 Guide",
    metaDescription:
      "An honest look at whether rooftop solar pays off in Kanpur — sun exposure, payback time, and when solar makes less sense.",
    h1: "Is Rooftop Solar Worth It in Kanpur?",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-13",
    author: "Indus Solar Solutions Team",
    sections: [
      {
        paragraphs: [
          "This is the first question almost every Kanpur homeowner asks before installing solar, and it deserves an honest answer rather than a sales pitch: for most homes and businesses with a reasonably sunny, shadow-free roof, yes — but the payback period and savings depend on your specific electricity usage and roof, not a generic average.",
        ],
      },
      {
        heading: "Kanpur's Sun Exposure",
        paragraphs: [
          "Kanpur gets strong sun exposure across most of the year, with the monsoon months (roughly July-September) reducing output somewhat due to cloud cover. Across a full year, panels still generate meaningfully even on partly cloudy days — solar doesn't need direct, unbroken sunshine to work, just daylight.",
        ],
      },
      {
        heading: "What Actually Determines Payback Time",
        paragraphs: [
          "The two biggest factors are your current monthly electricity bill (higher bills mean more room for savings) and whether you can use the subsidy available for residential systems. A household spending ₹3,000+ a month on electricity, with an unshaded roof, typically sees a payback period of a few years, after which the system continues generating essentially free electricity for the remainder of its 25-year warranty period.",
        ],
      },
      {
        heading: "When Solar Makes Less Sense",
        paragraphs: [
          "Solar is a weaker fit for a home with very low electricity usage, a heavily shaded roof (from trees or neighbouring buildings), or a roof that can't safely support the mounting structure. We'll tell you honestly during the site survey if your situation isn't a good fit — it doesn't help either of us to install a system that won't perform.",
        ],
      },
      {
        heading: "The Honest Way to Decide",
        paragraphs: [
          "Look at your last 6-12 months of electricity bills, check whether your roof gets consistent sun through the day, and get a free site survey and written quote. From there the payback math is specific to your home, not a generic city-wide average.",
        ],
      },
    ],
  },
  {
    slug: "pm-surya-ghar-application-guide",
    title: "How to Apply for PM Surya Ghar: Step-by-Step Guide",
    metaDescription:
      "The exact steps to apply for PM Surya Ghar Muft Bijli Yojana rooftop solar subsidy — portal registration through subsidy disbursal.",
    h1: "How to Apply for PM Surya Ghar: Step-by-Step",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-13",
    author: "Indus Solar Solutions Team",
    sections: [
      {
        paragraphs: [
          "PM Surya Ghar Muft Bijli Yojana is applied for entirely through the official national portal, plus coordination with your local DISCOM for net metering. Here's the process in the order it actually happens, based on how we walk clients through it.",
        ],
      },
      {
        heading: "Step 1: Register on the Portal",
        paragraphs: [
          "Create an account on the official PM Surya Ghar portal using your electricity consumer number, mobile number, and state/DISCOM details. This is a free government portal — we never ask clients to pay us for registration itself.",
        ],
      },
      {
        heading: "Step 2: Apply for Rooftop Solar",
        paragraphs: [
          "Submit your application for rooftop solar through the portal. The relevant DISCOM reviews it for technical feasibility (available capacity, sanctioned load) and issues an approval before installation can proceed.",
        ],
      },
      {
        heading: "Step 3: Installation by an Empanelled Vendor",
        paragraphs: [
          "Once approved, the system must be installed by a vendor registered/empanelled for the scheme. We handle the installation and provide the documentation needed for the next steps.",
        ],
      },
      {
        heading: "Step 4: Net Meter Application & Commissioning",
        paragraphs: [
          "After installation, you apply for a net meter through the portal. The DISCOM inspects the installation and, once satisfied, issues a commissioning certificate confirming the system is correctly grid-connected.",
        ],
      },
      {
        heading: "Step 5: Subsidy Disbursal",
        paragraphs: [
          "With the commissioning certificate in hand, you submit your bank account details and a cancelled cheque through the portal. The subsidy is then disbursed directly to your bank account by the government — not routed through the installer.",
        ],
      },
      {
        heading: "A Few Honest Notes",
        paragraphs: [
          "Processing times vary by DISCOM workload and season, and scheme terms can be updated by the government — always check the official portal for the current process and timelines rather than relying solely on this guide. We assist with the paperwork at every step, but the subsidy itself is disbursed by the government directly to you.",
        ],
      },
    ],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/blog.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/blog.ts src/data/blog.test.ts
git commit -m "Add blog article content data"
```

---

### Task 8: Extend `seo.ts` registry to cover every new route

**Files:**
- Modify: `src/data/seo.ts`
- Create: `src/data/seo.test.ts`

**Interfaces:**
- Consumes: `moneyPages` (Task 6), `kwSystems` (Task 4), `localities` (Task 5), `blogArticles` (Task 7), `faqs` (Task 3), `breadcrumbSchema`/`serviceSchema`/`faqSchema` (Task 2)
- Produces: extends existing `SeoEntry` type with `schema?: import("../lib/schema").JsonLd | import("../lib/schema").JsonLd[]`; `allSeo: SeoEntry[]` now includes every route from Tasks 3-7 plus `/faq`, `/about`, `/contact`, `/blog`, `/projects/:slug`-less static `/blog` index (project detail entries stay dynamic, handled like `productSeo`)

- [ ] **Step 1: Write the failing test**

Create `src/data/seo.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { allSeo } from "./seo";

describe("allSeo", () => {
  it("has no duplicate paths", () => {
    const paths = allSeo.map((e) => e.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("includes every money page, kW page, and locality page", () => {
    const paths = allSeo.map((e) => e.path);
    expect(paths).toContain("/solar-subsidy-kanpur");
    expect(paths).toContain("/3kw-solar-system-kanpur");
    expect(paths).toContain("/solar-panel-installation-kidwai-nagar");
    expect(paths).toContain("/faq");
    expect(paths).toContain("/about");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/blog/solar-panel-cost-kanpur-guide");
  });

  it("only the /faq entry carries FAQPage schema", () => {
    for (const entry of allSeo) {
      const schemas = Array.isArray(entry.schema) ? entry.schema : entry.schema ? [entry.schema] : [];
      const hasFaqSchema = schemas.some((s) => s["@type"] === "FAQPage");
      if (hasFaqSchema) {
        expect(entry.path).toBe("/faq");
      }
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/seo.test.ts`
Expected: FAIL — new paths not yet present, e.g. `/solar-subsidy-kanpur` missing

- [ ] **Step 3: Extend `seo.ts`**

Modify `src/data/seo.ts` — replace the whole file:

```typescript
import { products } from "./products";
import { moneyPages } from "./moneyPages";
import { kwSystems } from "./kwSystems";
import { localities, getTestimonialsForLocality, getProjectsForLocality } from "./localities";
import { blogArticles } from "./blog";
import { faqs, getFaqsBySlug } from "./faqs";
import { breadcrumbSchema, serviceSchema, faqSchema, type JsonLd } from "../lib/schema";

export const SITE_URL = "https://indussolarsolutions.com";
export const DEFAULT_IMAGE = "/images/hero/hero-2b-adlershof.jpg";

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  image?: string;
  schema?: JsonLd | JsonLd[];
};

export const staticSeo: SeoEntry[] = [
  {
    path: "/",
    title: "Indus Solar Solutions | Best Solar Company in Kanpur",
    description:
      "Indus Solar Solutions is Kanpur's trusted solar panel installation company — residential, commercial & industrial rooftop solar, solar subsidy assistance, batteries and maintenance in Kidwai Nagar and nearby areas.",
    schema: breadcrumbSchema([{ name: "Home", path: "/" }]),
  },
  {
    path: "/products",
    title: "Solar Products in Kanpur | Panels, Inverters & Batteries — Indus Solar Solutions",
    description:
      "Solar panels, inverters, mounting structures, batteries and complete solar kits supplied and installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
  },
  {
    path: "/projects",
    title: "Solar Installation Projects in Kanpur | Indus Solar Solutions",
    description:
      "Solar installations completed across Kanpur and Kanpur Dehat — residential, commercial and industrial rooftop solar projects by Indus Solar Solutions.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
  },
  {
    path: "/about",
    title: "About Indus Solar Solutions | Solar Company in Kanpur",
    description:
      "Indus Solar Solutions is a Kanpur-based solar panel installation company serving homes, businesses and factories in Kidwai Nagar and nearby areas.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  },
  {
    path: "/contact",
    title: "Contact Indus Solar Solutions | Solar Company in Kanpur",
    description:
      "Get in touch with Indus Solar Solutions for a free solar site survey and quote in Kanpur — call, WhatsApp, or send us a message.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  },
  {
    path: "/faq",
    title: "Solar Panel FAQs | Indus Solar Solutions",
    description:
      "Answers to common questions about solar panel cost, subsidy, installation time, maintenance and more in Kanpur.",
    schema: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    ],
  },
  {
    path: "/blog",
    title: "Solar Guides & Resources | Indus Solar Solutions",
    description:
      "Guides on solar panel cost, subsidy eligibility, and whether rooftop solar is worth it in Kanpur.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  },
];

export const productSeo: SeoEntry[] = products.map((p) => ({
  path: `/products/${p.slug}`,
  title: `${p.title} in Kanpur | Price & Installation — Indus Solar Solutions`,
  description: `${p.tagline}. Installed by Indus Solar Solutions, Kanpur's trusted solar panel installation company.`,
  image: p.images[0],
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: p.title, path: `/products/${p.slug}` },
  ]),
}));

export const moneyPageSeo: SeoEntry[] = moneyPages.map((p) => ({
  path: `/${p.slug}`,
  title: p.title,
  description: p.metaDescription,
  image: p.heroImage,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: p.h1, path: `/${p.slug}` },
    ]),
    serviceSchema({ name: p.h1, description: p.metaDescription, path: `/${p.slug}` }),
  ],
}));

export const kwSystemSeo: SeoEntry[] = kwSystems.map((s) => ({
  path: `/${s.slug}`,
  title: s.title,
  description: s.metaDescription,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Panel Price in Kanpur", path: "/solar-panel-price-kanpur" },
      { name: s.h1, path: `/${s.slug}` },
    ]),
    serviceSchema({ name: s.h1, description: s.metaDescription, path: `/${s.slug}` }),
  ],
}));

export const localitySeo: SeoEntry[] = localities.map((l) => ({
  path: `/${l.slug}`,
  title: l.title,
  description: l.metaDescription,
  image: getProjectsForLocality(l)[0]?.image ?? getTestimonialsForLocality(l)[0]?.image,
  schema: [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Panel Installation", path: "/solar-panel-installation-kanpur" },
      { name: l.h1, path: `/${l.slug}` },
    ]),
    serviceSchema({ name: l.h1, description: l.metaDescription, path: `/${l.slug}` }),
  ],
}));

export const blogSeo: SeoEntry[] = blogArticles.map((a) => ({
  path: `/blog/${a.slug}`,
  title: a.title,
  description: a.metaDescription,
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: a.h1, path: `/blog/${a.slug}` },
  ]),
}));

export const allSeo: SeoEntry[] = [
  ...staticSeo,
  ...productSeo,
  ...moneyPageSeo,
  ...kwSystemSeo,
  ...localitySeo,
  ...blogSeo,
];

export function getSeo(path: string): SeoEntry {
  return allSeo.find((entry) => entry.path === path) ?? staticSeo[0];
}

// Re-exported for pages that need FAQ subsets without importing faqs.ts directly.
export { getFaqsBySlug };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/seo.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite to check nothing else broke**

Run: `npx vitest run`
Expected: PASS (all suites from Tasks 1-8)

- [ ] **Step 6: Commit**

```bash
git add src/data/seo.ts src/data/seo.test.ts
git commit -m "Extend seo.ts registry with all new routes and per-page schema"
```

---

### Task 9: Extend `prerender.ts` to inject JSON-LD

**Files:**
- Modify: `scripts/prerender.ts`

**Interfaces:**
- Consumes: `entry.schema` from `SeoEntry` (Task 8)
- Produces: prerendered HTML for each route gets a `<script type="application/ld+json">` block per non-empty `entry.schema`, inserted before `</head>`

- [ ] **Step 1: Add the schema injection step**

Modify `scripts/prerender.ts` — in the `injectHead` function, after the existing `.replace(...)` chain and before `return`, add:

```typescript
function schemaScriptTags(schema: SeoEntry["schema"]): string {
  if (!schema) return "";
  const list = Array.isArray(schema) ? schema : [schema];
  return list
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");
}
```

Then change the `injectHead` function's final return to inject before `</head>`:

```typescript
function injectHead(html: string, entry: SeoEntry) {
  const url = `${SITE_URL}${entry.path}`;
  const image = absoluteImage(entry.image);

  const withMeta = html
    .replace(/<title>.*?<\/title>/s, `<title>${entry.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${entry.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${entry.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${entry.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${entry.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${entry.description}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/s, `<meta name="twitter:image" content="${image}" />`);

  return withMeta.replace("</head>", `${schemaScriptTags(entry.schema)}\n  </head>`);
}
```

- [ ] **Step 2: Verify with a full build**

Run: `npm run build`
Expected: build succeeds, and `dist/solar-subsidy-kanpur/index.html` contains a `<script type="application/ld+json">` block with `"@type":"Service"` in it.

Verify: `grep -o "application/ld+json" dist/solar-subsidy-kanpur/index.html` — should match twice (breadcrumb + service).

- [ ] **Step 3: Commit**

```bash
git add scripts/prerender.ts
git commit -m "Inject per-route JSON-LD schema during prerender"
```

---

### Task 10: `Breadcrumbs` component

**Files:**
- Create: `src/components/Breadcrumbs.tsx`

**Interfaces:**
- Consumes: `Link` from `react-router-dom`, `ChevronRight` from `lucide-react`
- Produces: `export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] })`

- [ ] **Step 1: Implement the component**

Create `src/components/Breadcrumbs.tsx`:

```tsx
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 md:text-sm">
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="shrink-0 text-white/40" />}
          {i === items.length - 1 ? (
            <span className="text-white">{item.name}</span>
          ) : (
            <Link to={item.path} className="hover:text-white">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Breadcrumbs.tsx
git commit -m "Add Breadcrumbs component"
```

---

### Task 11: `Faq` accordion component

**Files:**
- Create: `src/components/Faq.tsx`

**Interfaces:**
- Consumes: `FaqEntry` type from `src/data/faqs.ts` (Task 3), `useState` from React, `ChevronDown` from `lucide-react`
- Produces: `export default function Faq({ items, heading }: { items: { question: string; answer: string }[]; heading?: string })`

- [ ] **Step 1: Implement the component**

Create `src/components/Faq.tsx`:

```tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export default function Faq({ items, heading = "Frequently Asked Questions" }: { items: FaqItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">{heading}</h2>
        <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold text-ink md:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gold-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-muted md:text-base">{item.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Faq.tsx
git commit -m "Add Faq accordion component"
```

---

### Task 12: `SolarCalculator` component

**Files:**
- Create: `src/components/SolarCalculator.tsx`
- Create: `src/components/SolarCalculator.test.tsx`
- Modify: `package.json` (add `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` devDependencies)
- Modify: `vitest.config.ts` (switch environment to jsdom, add setup file)
- Create: `src/test/setup.ts`

**Interfaces:**
- Consumes: `recommendedKwFromBill`, `estimateMonthlyGenerationUnits`, `estimateAnnualSavings` from `src/lib/solarCalculator.ts` (Task 1)
- Produces: `export default function SolarCalculator({ compact }: { compact?: boolean })`

- [ ] **Step 1: Add React Testing Library**

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

Update `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Write the failing test**

Create `src/components/SolarCalculator.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SolarCalculator from "./SolarCalculator";

describe("SolarCalculator", () => {
  it("shows a recommended system size and savings after entering a monthly bill", () => {
    render(<SolarCalculator />);

    const input = screen.getByLabelText(/monthly electricity bill/i);
    fireEvent.change(input, { target: { value: "3000" } });

    expect(screen.getByText(/3\.5 ?kW/i)).toBeInTheDocument();
    expect(screen.getByText(/indicative/i)).toBeInTheDocument();
  });

  it("shows nothing calculated before any input", () => {
    render(<SolarCalculator />);
    expect(screen.queryByText(/recommended system size/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/components/SolarCalculator.test.tsx`
Expected: FAIL — `Cannot find module './SolarCalculator'`

- [ ] **Step 4: Implement the component**

Create `src/components/SolarCalculator.tsx`:

```tsx
import { useState } from "react";
import { business } from "../data/site";
import {
  recommendedKwFromBill,
  estimateMonthlyGenerationUnits,
  estimateAnnualSavings,
} from "../lib/solarCalculator";

export default function SolarCalculator({ compact = false }: { compact?: boolean }) {
  const [bill, setBill] = useState("");
  const monthlyBill = Number(bill);
  const hasValidInput = monthlyBill > 0;

  const recommendedKw = hasValidInput ? recommendedKwFromBill(monthlyBill) : 0;
  const monthlyGeneration = hasValidInput ? estimateMonthlyGenerationUnits(recommendedKw) : 0;
  const annualSavings = hasValidInput ? estimateAnnualSavings(recommendedKw) : 0;

  return (
    <div className={`rounded-2xl bg-white p-6 shadow-lg md:p-8 ${compact ? "" : "mx-auto max-w-xl"}`}>
      <label htmlFor="monthly-bill" className="block text-sm font-medium text-ink">
        Your average monthly electricity bill (₹)
      </label>
      <input
        id="monthly-bill"
        type="number"
        min={0}
        inputMode="numeric"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        placeholder="e.g. 3000"
        className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-gold-dark"
      />

      {hasValidInput && (
        <div className="mt-6 space-y-3 rounded-xl bg-cream p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Recommended system size</span>
            <span className="font-display font-semibold text-ink">{recommendedKw}kW</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Estimated monthly generation</span>
            <span className="font-display font-semibold text-ink">{monthlyGeneration} units</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Estimated annual savings</span>
            <span className="font-display font-semibold text-ink">₹{annualSavings.toLocaleString("en-IN")}</span>
          </div>
          <p className="pt-1 text-xs leading-relaxed text-muted">
            Indicative estimate based on typical Kanpur sun-hours and an average tariff. Actual results depend on
            your roof and usage — book a free site survey for an exact quote.
          </p>
        </div>
      )}

      <a
        href={business.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white transition hover:bg-ink"
      >
        Book a Free Site Survey
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/SolarCalculator.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Run full test suite**

Run: `npx vitest run`
Expected: PASS (all suites)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts src/components/SolarCalculator.tsx src/components/SolarCalculator.test.tsx
git commit -m "Add SolarCalculator component with React Testing Library coverage"
```

---

### Task 13: `MoneyPage` template component

**Files:**
- Create: `src/pages/MoneyPage.tsx`

**Interfaces:**
- Consumes: `getMoneyPageBySlug` (Task 6), `getFaqsBySlug` (Task 3), `getSeo` (Task 8), `Seo` (existing), `Breadcrumbs` (Task 10), `Faq` (Task 11), `Footer` (existing), `business` (existing)
- Produces: `export default function MoneyPage({ slug }: { slug: string })` — the route element passes `slug` directly (see Task 21), not via `useParams`, since each money page is mounted on its own static path

- [ ] **Step 1: Implement the template**

Create `src/pages/MoneyPage.tsx`:

```tsx
import { motion } from "framer-motion";
import { getMoneyPageBySlug } from "../data/moneyPages";
import { getFaqsBySlug } from "../data/faqs";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function MoneyPage({ slug }: { slug: string }) {
  const page = getMoneyPageBySlug(slug);
  if (!page) throw new Error(`Unknown money page slug: ${slug}`);

  const faqItems = getFaqsBySlug(page.faqSlugs);

  return (
    <>
      <Seo {...getSeo(`/${page.slug}`)} />
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:min-h-[60vh] md:px-16 md:pb-14 md:pt-40">
        <img src={page.heroImage} alt={page.h1} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: page.h1, path: `/${page.slug}` }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {page.h1}
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">{page.intro}</p>

          <div className="mt-10 space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{section.body}</p>
              </div>
            ))}
          </div>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Free Quote
          </a>
        </div>
      </section>

      {faqItems.length > 0 && <Faq items={faqItems} />}

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/MoneyPage.tsx
git commit -m "Add MoneyPage template component"
```

---

### Task 14: `LocalityPage` template component

**Files:**
- Create: `src/pages/LocalityPage.tsx`

**Interfaces:**
- Consumes: `getLocalityBySlug`, `getTestimonialsForLocality`, `getProjectsForLocality` (Task 5), `getSeo` (Task 8), `Seo`, `Breadcrumbs`, `Footer`, `business`
- Produces: `export default function LocalityPage({ slug }: { slug: string })` — the route element passes `slug` directly (see Task 21), not via `useParams`

- [ ] **Step 1: Implement the template**

Create `src/pages/LocalityPage.tsx`:

```tsx
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getLocalityBySlug, getTestimonialsForLocality, getProjectsForLocality } from "../data/localities";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function LocalityPage({ slug }: { slug: string }) {
  const locality = getLocalityBySlug(slug);
  if (!locality) throw new Error(`Unknown locality slug: ${slug}`);

  const localTestimonials = getTestimonialsForLocality(locality);
  const localProjects = getProjectsForLocality(locality);
  const heroImage = localProjects[0]?.image ?? "/images/hero/hero-5-rooftop.jpg";

  return (
    <>
      <Seo {...getSeo(`/${locality.slug}`)} />
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:min-h-[60vh] md:px-16 md:pb-14 md:pt-40">
        <img src={heroImage} alt={locality.h1} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Solar Panel Installation", path: "/solar-panel-installation-kanpur" },
              { name: locality.name, path: `/${locality.slug}` },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {locality.h1}
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">{locality.intro}</p>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Free Quote for {locality.name}
          </a>
        </div>

        {localProjects.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              Projects in {locality.name}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {localProjects.map((p) => (
                <div key={p.title} className="overflow-hidden rounded-2xl bg-white shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-display text-sm font-semibold text-ink">{p.title}</div>
                    <div className="mt-1 text-xs text-muted">{p.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {localTestimonials.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              What {locality.name} Customers Say
            </h2>
            <div className="mt-6 space-y-6">
              {localTestimonials.map((t) => (
                <div key={t.name} className="rounded-2xl bg-white p-6 shadow-md">
                  <Quote size={22} className="text-gold-dark" fill="currentColor" />
                  <p className="mt-3 text-sm leading-relaxed text-ink/85">{t.quote}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-display text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-muted">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/LocalityPage.tsx
git commit -m "Add LocalityPage template component"
```

---

### Task 15: `KwSystemPage` template component

**Files:**
- Create: `src/pages/KwSystemPage.tsx`

**Interfaces:**
- Consumes: `getKwSystemBySlug`, `getKwSystemFaqs` (Task 4), `getSeo` (Task 8), `Seo`, `Breadcrumbs`, `Faq`, `Footer`, `business`
- Produces: `export default function KwSystemPage({ slug }: { slug: string })` — the route element passes `slug` directly (see Task 21), not via `useParams`

- [ ] **Step 1: Implement the template**

Create `src/pages/KwSystemPage.tsx`:

```tsx
import { motion } from "framer-motion";
import { getKwSystemBySlug, getKwSystemFaqs } from "../data/kwSystems";
import { getSeo } from "../data/seo";
import { business } from "../data/site";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function KwSystemPage({ slug }: { slug: string }) {
  const system = getKwSystemBySlug(slug);
  if (!system) throw new Error(`Unknown kW system slug: ${slug}`);

  const faqItems = getKwSystemFaqs(system);

  return (
    <>
      <Seo {...getSeo(`/${system.slug}`)} />
      <section className="relative bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Solar Panel Price in Kanpur", path: "/solar-panel-price-kanpur" },
              { name: system.h1, path: `/${system.slug}` },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {system.h1}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">{system.intro}</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">{system.kw}kW</div>
            <div className="mt-1 text-xs text-muted">System Size</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">~{system.panelCountEstimate}</div>
            <div className="mt-1 text-xs text-muted">Panels (indicative)</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">~{system.roofAreaSqFt} sq ft</div>
            <div className="mt-1 text-xs text-muted">Roof Area Needed</div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="font-display text-2xl font-bold text-ink">
              ~{system.monthlyGenerationEstimateUnits}
            </div>
            <div className="mt-1 text-xs text-muted">Units/Month (indicative)</div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Who This Size Suits</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{system.suitsWho}</p>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Get a Quote for a {system.kw}kW System
          </a>
        </div>
      </section>

      {faqItems.length > 0 && <Faq items={faqItems} />}

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/KwSystemPage.tsx
git commit -m "Add KwSystemPage template component"
```

---

### Task 16: `BlogArticle` template + blog index page

**Files:**
- Create: `src/pages/BlogArticlePage.tsx`
- Create: `src/pages/Blog.tsx`

**Interfaces:**
- Consumes: `getBlogArticleBySlug`, `blogArticles` (Task 7), `getSeo` (Task 8), `Seo`, `Breadcrumbs`, `Footer`

- [ ] **Step 1: Implement the article template**

Create `src/pages/BlogArticlePage.tsx`:

```tsx
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogArticleBySlug } from "../data/blog";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo {...getSeo(`/blog/${article.slug}`)} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: article.h1, path: `/blog/${article.slug}` },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            {article.h1}
          </motion.h1>
          <p className="mt-3 text-xs text-white/60">
            By {article.author} · Last updated {article.lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <article className="mx-auto max-w-3xl space-y-8">
          {article.sections.map((section, i) => (
            <div key={section.heading ?? i}>
              {section.heading && (
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <Link to="/blog" className="text-sm font-medium text-gold-dark hover:underline">
            ← Back to all guides
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Implement the blog index**

Create `src/pages/Blog.tsx`:

```tsx
import { Link } from "react-router-dom";
import { blogArticles } from "../data/blog";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <>
      <Seo {...getSeo("/blog")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
            Solar Guides & Resources
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="font-display text-lg font-semibold text-ink">{article.h1}</div>
              <p className="mt-2 text-sm text-muted">{article.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/BlogArticlePage.tsx src/pages/Blog.tsx
git commit -m "Add blog index and article template pages"
```

---

### Task 17: Navigation data + `Navbar` restructure

**Files:**
- Create: `src/data/navigation.ts`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Produces: `type NavLink = { label: string; href: string }`, `type NavGroup = { label: string; items: NavLink[] }`, `type NavEntry = NavLink | NavGroup`, `isNavGroup(entry: NavEntry): entry is NavGroup`, `navGroups: NavEntry[]`

- [ ] **Step 1: Write the navigation data**

Create `src/data/navigation.ts`:

```typescript
export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

export const navGroups: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Solar Solutions",
    items: [
      { label: "Solar Panel Installation", href: "/solar-panel-installation-kanpur" },
      { label: "Rooftop Solar", href: "/rooftop-solar-kanpur" },
      { label: "Residential Solar", href: "/residential-solar-kanpur" },
      { label: "Commercial Solar", href: "/commercial-solar-kanpur" },
      { label: "Industrial Solar", href: "/industrial-solar-kanpur" },
    ],
  },
  {
    label: "Solar Systems",
    items: [
      { label: "1kW System", href: "/1kw-solar-system-kanpur" },
      { label: "2kW System", href: "/2kw-solar-system-kanpur" },
      { label: "3kW System", href: "/3kw-solar-system-kanpur" },
      { label: "5kW System", href: "/5kw-solar-system-kanpur" },
      { label: "10kW System", href: "/10kw-solar-system-kanpur" },
    ],
  },
  { label: "Solar Calculator", href: "/solar-calculator-kanpur" },
  {
    label: "Solar Subsidy",
    items: [
      { label: "Solar Subsidy in Kanpur", href: "/solar-subsidy-kanpur" },
      { label: "PM Surya Ghar", href: "/pm-surya-ghar-kanpur" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Rewrite `Navbar.tsx`**

Replace `src/components/Navbar.tsx`:

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Phone, ChevronDown } from "lucide-react";
import { business } from "../data/site";
import { navGroups, isNavGroup } from "../data/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-6xl items-center justify-between rounded-full bg-cream-light/90 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-gold-light">
            <Zap size={16} fill="currentColor" />
          </span>
          Indus Solar
        </Link>

        <nav className="hidden items-center gap-6 font-body text-sm font-medium text-ink/80 lg:flex">
          {navGroups.map((entry) =>
            isNavGroup(entry) ? (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(entry.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button className="flex items-center gap-1 transition hover:text-ink" type="button">
                  {entry.label}
                  <ChevronDown size={14} />
                </button>
                {openGroup === entry.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-56 rounded-2xl bg-white p-2 shadow-xl">
                      {entry.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-cream hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={entry.href} to={entry.href} className="transition hover:text-ink">
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.callUrl}
            className="rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium text-ink transition hover:bg-charcoal hover:text-white"
          >
            Call Now
          </a>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white transition hover:bg-ink"
          >
            Get a Free Quote
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-20 max-h-[75vh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-3xl bg-cream-light p-5 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1 font-body text-base">
            {navGroups.map((entry) =>
              isNavGroup(entry) ? (
                <div key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenGroup(mobileOpenGroup === entry.label ? null : entry.label)}
                    className="flex w-full items-center justify-between py-2 text-left"
                  >
                    {entry.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileOpenGroup === entry.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileOpenGroup === entry.label && (
                    <div className="flex flex-col gap-1 border-l border-ink/10 pl-4">
                      {entry.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-ink/80"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={entry.href} to={entry.href} onClick={() => setOpen(false)} className="py-2">
                  {entry.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-4 flex gap-3">
            <a
              href={business.callUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white"
            >
              Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
```

Note: the existing `Home` page's hash-scroll target `Link to="/#home"` becomes plain `Link to="/"` since the homepage no longer needs a `#home` anchor for the nav brand link — verify in Task 20 that `Home.tsx` still has an element for any remaining `#`-anchor nav items (`About` and `Contact` are now real routes, not homepage anchors, per the site map).

- [ ] **Step 3: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 4: Commit**

```bash
git add src/data/navigation.ts src/components/Navbar.tsx
git commit -m "Restructure Navbar with dropdown groups, mobile-first"
```

---

### Task 18: `Footer` restructure

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `business` (existing), `localities` (Task 5)

- [ ] **Step 1: Rewrite the footer link columns**

Modify `src/components/Footer.tsx` — replace the `Quick Links` block (the `<div className="mt-10">...Quick Links...</div>` section) with four columns, and import `localities`:

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { business } from "../data/site";
import { localities } from "../data/localities";
```

Replace the single "Quick Links" block with:

```tsx
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                Solar Solutions
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
                <Link to="/residential-solar-kanpur" className="hover:text-white">Residential</Link>
                <Link to="/commercial-solar-kanpur" className="hover:text-white">Commercial</Link>
                <Link to="/industrial-solar-kanpur" className="hover:text-white">Industrial</Link>
                <Link to="/rooftop-solar-kanpur" className="hover:text-white">Rooftop Solar</Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                Solar Resources
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
                <Link to="/solar-calculator-kanpur" className="hover:text-white">Solar Calculator</Link>
                <Link to="/solar-panel-price-kanpur" className="hover:text-white">Solar Price</Link>
                <Link to="/solar-subsidy-kanpur" className="hover:text-white">Solar Subsidy</Link>
                <Link to="/pm-surya-ghar-kanpur" className="hover:text-white">PM Surya Ghar</Link>
                <Link to="/faq" className="hover:text-white">FAQs</Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                Service Areas
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
                {localities.map((l) => (
                  <Link key={l.slug} to={`/${l.slug}`} className="hover:text-white">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                Company
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
                <Link to="/about" className="hover:text-white">About</Link>
                <Link to="/projects" className="hover:text-white">Projects</Link>
                <Link to="/blog" className="hover:text-white">Blog</Link>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </div>
            </div>
          </div>
```

Remove the now-unused `nav` import from `src/data/site.ts` in this file if no other reference to it remains in `Footer.tsx`.

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Restructure Footer with Solutions/Resources/Areas/Company columns"
```

---

### Task 19: `About`, `Contact`, `FaqPage` bespoke pages

**Files:**
- Create: `src/pages/About.tsx`
- Create: `src/pages/Contact.tsx`
- Create: `src/pages/FaqPage.tsx`

**Interfaces:**
- Consumes: `business`, `impact`, `whyChoose` from `src/data/site.ts` (existing), `faqs` from `src/data/faqs.ts` (Task 3), `getSeo`, `Seo`, `Breadcrumbs`, `Faq`, `Footer`

- [ ] **Step 1: Implement `About.tsx`**

Create `src/pages/About.tsx`:

```tsx
import { motion } from "framer-motion";
import { business, impact, whyChoose } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Seo {...getSeo("/about")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <img
          src="/images/why-choose/engineer.jpg"
          alt="Indus Solar Solutions team"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            About Indus Solar Solutions
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Indus Solar Solutions is a Kanpur-based solar panel installation company run by {business.owner},
            serving homes, shops and factories in {business.address}. We started small and grew through repeat
            business and referrals — {impact.heading.toLowerCase()} reflects that: {impact.stats[0].value}
            {impact.stats[0].suffix} projects completed in {impact.stats[1].value} months of operation, all
            handled locally from consultation to after-sales support.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{item.title}</div>
                <div className="text-xs text-gold-dark">{item.hindi}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Implement `Contact.tsx`**

Create `src/pages/Contact.tsx`:

```tsx
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Seo {...getSeo("/contact")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            Contact Indus Solar Solutions
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          <a href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-6 text-center shadow-md">
            <MapPin size={22} className="mx-auto text-gold-dark" />
            <div className="mt-3 text-sm text-ink">{business.address}</div>
          </a>
          <a href={business.callUrl} className="rounded-2xl bg-white p-6 text-center shadow-md">
            <Phone size={22} className="mx-auto text-gold-dark" />
            <div className="mt-3 text-sm text-ink">+91 {business.phone}</div>
          </a>
          <a href={`mailto:${business.email}`} className="rounded-2xl bg-white p-6 text-center shadow-md">
            <Mail size={22} className="mx-auto text-gold-dark" />
            <div className="mt-3 text-sm text-ink">{business.email}</div>
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Message Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Implement `FaqPage.tsx`**

Create `src/pages/FaqPage.tsx`:

```tsx
import { motion } from "framer-motion";
import { faqs } from "../data/faqs";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function FaqPage() {
  return (
    <>
      <Seo {...getSeo("/faq")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            Solar Panel FAQs
          </motion.h1>
        </div>
      </section>

      <Faq items={faqs} heading="All Questions" />

      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.tsx src/pages/Contact.tsx src/pages/FaqPage.tsx
git commit -m "Add About, Contact, and FAQ pages"
```

---

### Task 20: Homepage updates + Projects/ProjectDetail pages

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/components/HomeCalculator.tsx`
- Create: `src/components/ServiceAreas.tsx`
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/ProjectDetail.tsx`
- Modify: `src/data/projects.ts` (add `slug` field)

**Interfaces:**
- Consumes: `SolarCalculator` (Task 12), `localities` (Task 5), `projects` (existing, extended with `slug`)
- Produces: `ProjectEntry` gains `slug: string`; `getProjectBySlug(slug: string): ProjectEntry | undefined`

- [ ] **Step 1: Add slugs to `projects.ts`**

Modify `src/data/projects.ts` — replace the whole file:

```typescript
export type ProjectEntry = {
  slug: string;
  title: string;
  location: string;
  image: string;
};

// Placeholder entries — replace with Indus Solar Solutions' real project list
// (client name/type, location, capacity) once available.
export const projects: ProjectEntry[] = [
  { slug: "rooftop-solar-kidwai-nagar", title: "Rooftop Solar Installation", location: "Kidwai Nagar, Kanpur", image: "/images/technician-rooftop.jpg" },
  { slug: "residential-rooftop-kalyanpur", title: "Residential Rooftop System", location: "Kalyanpur, Kanpur", image: "/images/rooftop-installation.jpg" },
  { slug: "commercial-rooftop-panki", title: "Commercial Rooftop Array", location: "Panki Industrial Area, Kanpur", image: "/images/solar-farm-telangana.jpg" },
  { slug: "shop-office-civil-lines", title: "Shop & Office Solar Setup", location: "Civil Lines, Kanpur", image: "/images/solar-lake-chandigarh.jpg" },
  { slug: "factory-rooftop-kanpur-dehat", title: "Factory Rooftop Installation", location: "Kanpur Dehat", image: "/images/hero-solar-farm.jpg" },
  { slug: "ground-mount-kanpur-outskirts", title: "Ground-Mount Solar System", location: "Kanpur Outskirts", image: "/images/technician-rooftop.jpg" },
  { slug: "residential-upgrade-swaroop-nagar", title: "Residential Solar Upgrade", location: "Swaroop Nagar, Kanpur", image: "/images/rooftop-installation.jpg" },
  { slug: "cold-storage-kanpur-dehat", title: "Cold Storage Rooftop Solar", location: "Kanpur Dehat", image: "/images/solar-farm-telangana.jpg" },
  { slug: "shop-rooftop-naveen-market", title: "Shop Rooftop Installation", location: "Naveen Market, Kanpur", image: "/images/solar-lake-chandigarh.jpg" },
  { slug: "office-building-kakadeo", title: "Office Building Solar System", location: "Kakadeo, Kanpur", image: "/images/hero-solar-farm.jpg" },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Add project detail entries to `seo.ts`**

Modify `src/data/seo.ts` — add after the `blogSeo` export (and import `projects`, `breadcrumbSchema` is already imported):

```typescript
import { projects } from "./projects";

export const projectSeo: SeoEntry[] = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  title: `${p.title} in ${p.location} | Indus Solar Solutions`,
  description: `${p.title} completed by Indus Solar Solutions in ${p.location}.`,
  image: p.image,
  schema: breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: p.title, path: `/projects/${p.slug}` },
  ]),
}));
```

And add `...projectSeo,` to the `allSeo` array alongside the other spreads.

- [ ] **Step 3: Create `ProjectDetail.tsx`**

Create `src/pages/ProjectDetail.tsx`:

```tsx
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <Seo {...getSeo(`/projects/${project.slug}`)} />
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-charcoal px-6 pb-14 pt-32 md:px-16 md:pt-40">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white">
            <ArrowLeft size={14} /> All Projects
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {project.title}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">{project.location}</p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 md:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted">
            {project.title} completed by Indus Solar Solutions in {project.location}. Contact us for details on
            system size, components used, and generation for this project.
          </p>
          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Ask About a Similar Project
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Add a "Projects" grid link to project detail pages in `Projects.tsx`**

Modify `src/pages/Projects.tsx` — find where each project card is rendered and wrap it in `<Link to={`/projects/${p.slug}`}>` instead of a non-linking `<div>`, using the existing card markup unchanged (read the current file's card JSX before editing so the wrap doesn't disturb existing className/motion props).

- [ ] **Step 5: Create `ServiceAreas.tsx`**

Create `src/components/ServiceAreas.tsx`:

```tsx
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { localities } from "../data/localities";

export default function ServiceAreas() {
  return (
    <section className="bg-cream-light px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          Kanpur Service Areas
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {localities.map((l) => (
            <Link
              key={l.slug}
              to={`/${l.slug}`}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink shadow-sm transition hover:shadow-md"
            >
              <MapPin size={14} className="shrink-0 text-gold-dark" />
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create `HomeCalculator.tsx`**

Create `src/components/HomeCalculator.tsx`:

```tsx
import SolarCalculator from "./SolarCalculator";

export default function HomeCalculator() {
  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          What Could You Save With Solar?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Enter your average monthly electricity bill for an indicative system size and savings estimate.
        </p>
      </div>
      <div className="mt-8">
        <SolarCalculator />
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Wire into `Home.tsx`**

Modify `src/pages/Home.tsx` — update the H1 source and add the two new sections. First, read `src/components/Hero.tsx` to find its current `h1` (from `heroSlides[].heading`) and confirm the rendered `<h1>` — if `Hero.tsx` renders each slide's `heading` array as an `<h1>`, no change needed there since the spec's target H1 text ("Solar Panel Installation & Rooftop Solar Solutions in Kanpur") is a keyword goal, not a literal copy requirement for the animated hero — instead add a visually-hidden canonical H1 for SEO immediately after the `<Hero />` call if `Hero.tsx` does not already render a single stable `<h1>`. Add this line right after `<Hero />` in `Home.tsx`:

```tsx
<h1 className="sr-only">Solar Panel Installation & Rooftop Solar Solutions in Kanpur</h1>
```

(Skip this step only if inspection of `Hero.tsx` shows it already renders exactly one stable `<h1>` per page load with equivalent keyword coverage — if so, edit that text in place instead of adding a duplicate hidden one.)

Then update the imports and JSX to add `ServiceAreas` and `HomeCalculator`:

```tsx
import HomeCalculator from "../components/HomeCalculator";
import ServiceAreas from "../components/ServiceAreas";
```

Insert `<HomeCalculator />` after `<WhatWeOffer />` and `<ServiceAreas />` after `<ProcessSteps />` (before `<ImpactStats />`), keeping all existing sections in place.

- [ ] **Step 8: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 9: Commit**

```bash
git add src/pages/Home.tsx src/pages/Projects.tsx src/pages/ProjectDetail.tsx src/data/projects.ts src/data/seo.ts src/components/HomeCalculator.tsx src/components/ServiceAreas.tsx
git commit -m "Update homepage with calculator/service-areas sections and add project detail pages"
```

---

### Task 21: Wire all new routes in `AppShell.tsx`

**Files:**
- Modify: `src/AppShell.tsx`

**Interfaces:**
- Consumes: every page component from Tasks 13-20

- [ ] **Step 1: Rewrite the route table**

Replace `src/AppShell.tsx`:

```tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FaqPage from "./pages/FaqPage";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";
import MoneyPage from "./pages/MoneyPage";
import KwSystemPage from "./pages/KwSystemPage";
import LocalityPage from "./pages/LocalityPage";
import { moneyPages } from "./data/moneyPages";
import { kwSystems } from "./data/kwSystems";
import { localities } from "./data/localities";

export default function AppShell() {
  return (
    <div className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        {moneyPages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<MoneyPage slug={p.slug} />} />
        ))}
        {kwSystems.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<KwSystemPage slug={s.slug} />} />
        ))}
        {localities.map((l) => (
          <Route key={l.slug} path={`/${l.slug}`} element={<LocalityPage slug={l.slug} />} />
        ))}
      </Routes>
      <WhatsAppButton />
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (all suites)

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`, then visit `/solar-subsidy-kanpur`, `/3kw-solar-system-kanpur`, `/solar-panel-installation-kidwai-nagar`, `/faq`, `/blog/is-rooftop-solar-worth-it-kanpur` in the browser. Expected: each renders its own distinct H1 and content, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/AppShell.tsx
git commit -m "Wire all new SEO routes into AppShell"
```

---

### Task 22: Mobile-first + image lazy-load audit of existing components

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/WhatWeOffer.tsx`
- Modify: `src/components/WhyChoose.tsx`
- Modify: `src/components/Solutions.tsx`
- Modify: `src/components/ProcessSteps.tsx`
- Modify: `src/components/ImpactStats.tsx`
- Modify: `src/components/Testimonials.tsx`
- Modify: `src/components/BrandsMarquee.tsx`

- [ ] **Step 1: Read each file and check for desktop-first patterns**

For each file listed above, read it and check for two issues: (a) any unprefixed Tailwind class that assumes desktop width without a narrower mobile equivalent already set (e.g. a fixed `w-[500px]` with no smaller base, or text sized only at `md:text-lg` with no base `text-*` class before it — Tailwind's mobile-first convention requires the unprefixed class to be the phone-width style); (b) any `<img>` tag missing `loading="lazy"` that isn't the LCP hero image.

- [ ] **Step 2: Fix missing base (mobile) styles**

Where a `md:`-or-larger-prefixed utility has no corresponding unprefixed base utility of the same CSS property (e.g. `md:text-5xl` with no preceding `text-*`), add an explicit smaller base class so phone-width rendering is intentional, not inherited from the browser default. Do this inline per component — there is no single shared pattern to extract since each component's existing base classes already mostly follow this convention (confirmed by inspection of `Hero.tsx`/`CTA.tsx`/`Testimonials.tsx` during planning); this step is a verification-and-fix pass, not a rewrite.

- [ ] **Step 3: Add `loading="lazy"` to below-the-fold images**

In each file, add `loading="lazy"` to every `<img>` tag except: the first hero slide image in `Hero.tsx` (LCP element — must stay eager) and any image rendered inside the first viewport of `Home.tsx`'s initial layout. `Testimonials.tsx`'s carousel images, `WhatWeOffer.tsx`'s offer-card images, `WhyChoose.tsx`'s image, `BrandsMarquee.tsx`'s logos, and `ImpactStats.tsx`'s photo all qualify for `loading="lazy"`.

- [ ] **Step 4: Verify it builds**

Run: `npx tsc -b`
Expected: no type errors

- [ ] **Step 5: Manual viewport check**

Run: `npm run dev`, open the dev server in a browser, use devtools responsive mode at 375px width and check `/`, `/solar-calculator-kanpur`, and one locality page for horizontal scroll, overlapping text, or unreadably small tap targets. Fix any found before proceeding.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/WhatWeOffer.tsx src/components/WhyChoose.tsx src/components/Solutions.tsx src/components/ProcessSteps.tsx src/components/ImpactStats.tsx src/components/Testimonials.tsx src/components/BrandsMarquee.tsx
git commit -m "Mobile-first pass: base-style audit and lazy-loaded below-the-fold images"
```

---

### Task 23: Off-site SEO/SMO checklist document

**Files:**
- Create: `docs/seo-offsite-checklist.md`

- [ ] **Step 1: Write the checklist**

Create `docs/seo-offsite-checklist.md`:

```markdown
# Off-Site SEO & SMO Checklist — Indus Solar Solutions

This is action the business owner does directly — none of it is code. Work
top to bottom; each section unlocks the next.

## 1. Google Business Profile

- [ ] Claim/verify the listing for "Indus Solar Solutions" at the Kidwai
      Nagar, Sabji Mandi address.
- [ ] Set primary category to the most accurate solar-specific category
      available; add secondary categories only where genuinely applicable.
- [ ] Fill in phone, website (indussolarsolutions.com), hours, services,
      and a description matching the site's real language — no
      exaggerated claims.
- [ ] Upload real project photos (not stock) as they become available:
      before/after roof shots, panels, inverter, team on-site, handover.
- [ ] Keep NAP (name, address, phone) identical across the website, GBP,
      and every directory listing below.

## 2. Reviews

- [ ] After every completed installation: confirm the customer is happy,
      then ask for a Google review — in person or via WhatsApp, not a
      generic bulk blast.
- [ ] Never buy reviews, write them yourself, or ask staff to post as
      customers — this violates Google's policies and risks the listing.
- [ ] Encourage specific reviews (system size, area, what stood out) over
      generic "good service" — these read as more credible and cover more
      long-tail search terms naturally.

## 3. Local Backlinks & Directories

Target quality over volume — 20 genuine local links beat 2,000 spam links.

- [ ] Kanpur/UP business directories (search for active, real ones —
      avoid auto-generated spam directories).
- [ ] Local news coverage when there's a real story (e.g. a housing
      society project, a large commercial install) — pitch to a local
      Kanpur publication.
- [ ] Industry associations (renewable energy, MSME, electrical
      contractor bodies) the business can legitimately join.
- [ ] Partnerships with builders, architects, electrical contractors, and
      housing society RWAs — cross-referral relationships, documented on
      the site as case studies where both sides agree.

## 4. Search Console & Analytics

- [ ] Verify the domain in Google Search Console; submit
      `https://indussolarsolutions.com/sitemap.xml`.
- [ ] Set up GA4 and add the measurement ID as an environment variable
      (`VITE_GA_MEASUREMENT_ID`) — not yet wired into the codebase since
      no real ID exists; wire it once the ID is available.
- [ ] Track: phone clicks, WhatsApp clicks, quote form submissions,
      calculator usage.
- [ ] Add the site to Bing Webmaster Tools as well.

## 5. SMO — Social Media

- [ ] Use one consistent handle/name across Instagram, Facebook, and
      YouTube matching the GBP listing exactly.
- [ ] Turn real completed projects into posts: before/after photos,
      a short install timelapse, customer testimonial (with permission).
- [ ] Map site content to video ideas: the 3kW/5kW system pages, the
      subsidy guide, and the "is it worth it" blog article all convert
      naturally into short explainer videos — embed the YouTube video
      back on the matching page once it exists.
- [ ] Do not buy followers or engagement — it doesn't move local search
      prominence and can look inauthentic to real customers.

## 6. Ongoing Cadence

- [ ] Every new completed project → GBP photo update → review request →
      (if customer agrees) case study/testimonial entry → social post.
- [ ] Review this checklist quarterly — scheme details (PM Surya Ghar
      subsidy amounts, application steps) can change; re-verify against
      the official portal and update `src/data/moneyPages.ts` and
      `src/data/blog.ts` if so.
```

- [ ] **Step 2: Commit**

```bash
git add docs/seo-offsite-checklist.md
git commit -m "Add off-site SEO/SMO action checklist"
```

---

### Task 24: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full type check**

Run: `npx tsc -b`
Expected: no errors

- [ ] **Step 2: Full test suite**

Run: `npx vitest run`
Expected: all suites from Tasks 1-12 pass

- [ ] **Step 3: Full production build + prerender**

Run: `npm run build`
Expected: succeeds, prints `prerendered <path>` for every route including all new money/kW/locality/blog pages, ends with `sitemap.xml written`

- [ ] **Step 4: Verify sitemap coverage**

Run: `grep -c "<loc>" dist/sitemap.xml`
Expected: count matches `allSeo.length` (staticSeo + productSeo + moneyPageSeo + kwSystemSeo + localitySeo + blogSeo + projectSeo — roughly 32+ entries; confirm the exact number against the current `allSeo` array rather than assuming a fixed figure, since it's derived data)

- [ ] **Step 5: Verify robots.txt still points to the sitemap**

Run: `cat public/robots.txt`
Expected: unchanged, still contains `Sitemap: https://indussolarsolutions.com/sitemap.xml`

- [ ] **Step 6: Manual mobile viewport pass**

Run: `npm run preview`, open in a browser, use devtools responsive mode at 375px and 768px. Visit: `/`, `/solar-calculator-kanpur`, `/3kw-solar-system-kanpur`, `/solar-panel-installation-kalyanpur`, `/solar-subsidy-kanpur`, `/faq`, `/blog`. Check: no horizontal scroll, nav drawer opens/closes correctly, calculator input is usable on a touch-sized viewport, FAQ accordion expands/collapses.

- [ ] **Step 7: Verify JSON-LD is present and valid JSON on a sample of routes**

Run: `node -e "const fs=require('fs'); const html=fs.readFileSync('dist/solar-subsidy-kanpur/index.html','utf8'); const matches=[...html.matchAll(/<script type=\"application\/ld\+json\">(.*?)<\/script>/gs)]; matches.forEach(m => JSON.parse(m[1])); console.log(matches.length, 'valid JSON-LD blocks found')"`
Expected: prints `2 valid JSON-LD blocks found` (breadcrumb + service) with no thrown `SyntaxError`

- [ ] **Step 8: Final commit (if any fixes were made during verification)**

```bash
git add -A
git commit -m "Fix issues found during final verification pass"
```

(Skip this commit if verification found nothing to fix.)
