# Blue Theme, New Pages & Calculator V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a toggleable blue color theme, broaden site positioning copy to "Kanpur & across India," add `/services` and `/careers` pages, and replace the single-input solar calculator with a state-aware multi-step wizard + full savings report — all additive, nothing existing removed.

**Architecture:** Tailwind v4 CSS-variable theming (no JS theme framework) driven by a `data-color-theme` attribute on `<html>`, toggled by a small React component and persisted to `localStorage`. New pages follow the existing data-file + page-component + `seo.ts` entry + `AppShell` route pattern already used throughout the repo. The calculator is a new pure-function library (`solarCalculatorV2.ts`) plus a wizard component, both fully unit/component tested, wired into the two places the old calculator lived (`HomeCalculator`, and the `solar-calculator-kanpur` money page) without deleting the old component.

**Tech Stack:** Vite + React 19 + TypeScript, Tailwind v4 (`@theme` CSS-first config), React Router 7, Vitest + React Testing Library, `lucide-react` icons, `framer-motion`.

**Spec:** `docs/superpowers/specs/2026-09-14-blue-theme-and-calculator-v2-design.md`

## Global Constraints

- No existing route, component, or content is deleted or rewritten beyond the specific edits each task describes.
- No fabricated business claims — franchise/team/awards content is out of scope for this plan.
- Mobile-first Tailwind: base classes target phone width, `md:`/`lg:` add larger-screen overrides.
- Every new route gets a `seo.ts` entry so `scripts/prerender.ts` and `dist/sitemap.xml` pick it up automatically — do not hand-edit `public/sitemap.xml` (it's build-generated).
- All money/financial figures shown to users (subsidy, cost, savings) must be labeled indicative and sourced from figures already published elsewhere on the site (`moneyPages.ts` subsidy copy) or clearly-documented public constants — never invented.
- Business identity constants (`business.name`, `.phone`, `.address`, etc. in `src/data/site.ts`) are never changed by this plan.

---

### Task 1: Rename `gold` theme tokens to `accent` and add the blue palette

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS custom properties `--color-accent-light`, `--color-accent`, `--color-accent-dark` (replacing `--color-gold-*`), plus `--gradient-accent-start/mid/end` and `--gradient-wordmark-start/mid/end`, all overridden under `[data-color-theme="blue"]`. Later tasks (2, 3) depend on these exact names.

- [ ] **Step 1: Replace the `@theme` block and gradient/scrollbar rules**

Replace the full contents of `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  --font-display: "Sora", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-script: "Caveat", cursive;

  --color-cream: #f2ece0;
  --color-cream-light: #f8f4ec;
  --color-charcoal: #221f1c;
  --color-charcoal-light: #2c2824;
  --color-ink: #1a1815;
  --color-muted: #746e63;
  --color-accent-light: #e8cf9f;
  --color-accent: #c9a876;
  --color-accent-dark: #8a6d3f;
}

:root {
  --gradient-accent-start: #f4e3bd;
  --gradient-accent-mid: #d9b47c;
  --gradient-accent-end: #8a6d3f;
  --gradient-wordmark-start: #f6e6c4;
  --gradient-wordmark-mid: #d9b47c;
  --gradient-wordmark-end: #b3894f;
}

[data-color-theme="blue"] {
  --color-accent-light: #d6e6fb;
  --color-accent: #1c5fc4;
  --color-accent-dark: #12356e;
  --gradient-accent-start: #cfe0fb;
  --gradient-accent-mid: #4f8bde;
  --gradient-accent-end: #12356e;
  --gradient-wordmark-start: #d6e6fb;
  --gradient-wordmark-mid: #4f8bde;
  --gradient-wordmark-end: #17407f;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--color-cream);
  color: var(--color-ink);
}

.text-accent-gradient {
  background-image: linear-gradient(
    180deg,
    var(--gradient-accent-start) 0%,
    var(--gradient-accent-mid) 45%,
    var(--gradient-accent-end) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.wordmark-gradient {
  background-image: linear-gradient(
    180deg,
    var(--gradient-wordmark-start) 0%,
    var(--gradient-wordmark-mid) 55%,
    var(--gradient-wordmark-end) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes card-blur-pulse {
  0% {
    filter: blur(0);
  }
  35% {
    filter: blur(6px);
  }
  100% {
    filter: blur(0);
  }
}

.card-hover-img {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.group:hover .card-hover-img {
  transform: scale(1.12) rotate(15deg);
  animation: card-blur-pulse 0.7s ease;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 22s linear infinite;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--color-accent-dark);
  border-radius: 999px;
}
```

- [ ] **Step 2: Verify the dev server still builds with no color regressions**

Run: `npm run dev` (or `npm run build`) and confirm no CSS errors. The site will look unstyled-gold in places until Task 2 renames the class usages — that's expected and fixed next.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: rename gold theme tokens to accent, add blue palette"
```

---

### Task 2: Rename `gold` utility classes to `accent` across all components

**Files:**
- Modify: `src/pages/Projects.tsx`, `src/pages/About.tsx`, `src/pages/BlogArticlePage.tsx`, `src/pages/Contact.tsx`, `src/pages/LocalityPage.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/Products.tsx`, `src/components/Testimonials.tsx`, `src/components/WhatWeOffer.tsx`, `src/components/SolarCalculator.tsx`, `src/components/Navbar.tsx`, `src/components/ServiceAreas.tsx`, `src/components/Faq.tsx`, `src/components/Footer.tsx`, `src/components/Hero.tsx`, `src/components/CTA.tsx`

**Interfaces:**
- Consumes: `--color-accent*` tokens from Task 1.
- Produces: no component still references a `*-gold*` Tailwind class.

- [ ] **Step 1: Run the mechanical rename**

Order matters (longest/most-specific match first) so compound names aren't double-replaced. Run from the repo root:

```bash
FILES="src/pages/Projects.tsx src/pages/About.tsx src/pages/BlogArticlePage.tsx src/pages/Contact.tsx src/pages/LocalityPage.tsx src/pages/ProductDetail.tsx src/pages/Products.tsx src/components/Testimonials.tsx src/components/WhatWeOffer.tsx src/components/SolarCalculator.tsx src/components/Navbar.tsx src/components/ServiceAreas.tsx src/components/Faq.tsx src/components/Footer.tsx src/components/Hero.tsx src/components/CTA.tsx"

for f in $FILES; do
  sed -i \
    -e 's/gold-gradient/accent-gradient/g' \
    -e 's/gold-light/accent-light/g' \
    -e 's/gold-dark/accent-dark/g' \
    -e 's/\bgold\b/accent/g' \
    "$f"
done
```

- [ ] **Step 2: Verify no `gold` references remain in `src/`**

Run: `grep -rn "gold" src/ --include="*.tsx" --include="*.ts" --include="*.css"`
Expected: no output (empty).

- [ ] **Step 3: Run the full test suite and lint**

Run: `npm run test && npm run lint`
Expected: all existing tests still pass (renaming class strings doesn't change behavior); lint clean.

- [ ] **Step 4: Visually spot-check**

Run: `npm run dev`, open the homepage and one money page, confirm the gold look is unchanged (values didn't change, only variable/class names).

- [ ] **Step 5: Commit**

```bash
git add src/pages src/components
git commit -m "refactor: rename gold utility classes to accent"
```

---

### Task 3: Theme toggle component, FOUC-avoidance script, Navbar wiring

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/ThemeToggle.test.tsx`
- Modify: `index.html`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `[data-color-theme="blue"]` CSS selector from Task 1.
- Produces: `ThemeToggle` default export (no props), rendered by `Navbar`.

- [ ] **Step 1: Write the failing component test**

Create `src/components/ThemeToggle.test.tsx`:

```tsx
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-color-theme");
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-color-theme");
  });

  it("defaults to the gold theme with no data attribute set", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute("data-color-theme")).toBeNull();
  });

  it("switches to blue on click and persists the choice", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /blue theme/i }));
    expect(document.documentElement.getAttribute("data-color-theme")).toBe("blue");
    expect(localStorage.getItem("isolar-color-theme")).toBe("blue");
  });

  it("switches back to gold on a second click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /blue theme/i });
    fireEvent.click(button);
    fireEvent.click(screen.getByRole("button", { name: /gold theme/i }));
    expect(document.documentElement.getAttribute("data-color-theme")).toBeNull();
    expect(localStorage.getItem("isolar-color-theme")).toBe("gold");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- ThemeToggle`
Expected: FAIL — `Cannot find module './ThemeToggle'`

- [ ] **Step 3: Implement `ThemeToggle`**

Create `src/components/ThemeToggle.tsx`:

```tsx
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const STORAGE_KEY = "isolar-color-theme";

function applyTheme(theme: "gold" | "blue") {
  if (theme === "blue") {
    document.documentElement.setAttribute("data-color-theme", "blue");
  } else {
    document.documentElement.removeAttribute("data-color-theme");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"gold" | "blue">("gold");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "blue" || stored === "gold") {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === "gold" ? "blue" : "gold";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const nextLabel = theme === "gold" ? "Switch to blue theme" : "Switch to gold theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={nextLabel}
      title={nextLabel}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-ink transition hover:bg-charcoal hover:text-white"
    >
      <Palette size={16} />
    </button>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- ThemeToggle`
Expected: PASS (3 tests)

- [ ] **Step 5: Add the FOUC-avoidance script to `index.html`**

In `index.html`, immediately after the opening `<body>` tag (before `<div id="root">`), add:

```html
  <body>
    <script>
      (function () {
        var t = localStorage.getItem("isolar-color-theme");
        if (t === "blue") document.documentElement.setAttribute("data-color-theme", "blue");
      })();
    </script>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
```

- [ ] **Step 6: Wire `ThemeToggle` into `Navbar`**

In `src/components/Navbar.tsx`, add the import at the top:

```tsx
import ThemeToggle from "./ThemeToggle";
```

In the desktop controls cluster (the `<div className="hidden items-center gap-3 lg:flex">` block containing "Call Now" / "Get a Free Quote"), add the toggle before the "Call Now" link:

```tsx
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={business.callUrl}
            className="rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium text-ink transition hover:bg-charcoal hover:text-white"
          >
            Call Now
          </a>
```

In the mobile expanded menu's CTA row (the `<div className="mt-4 flex gap-3">` block near the bottom), add the toggle alongside Call/Free Quote:

```tsx
          <div className="mt-4 flex gap-3">
            <ThemeToggle />
            <a
              href={business.callUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium"
            >
              <Phone size={14} /> Call
            </a>
```

- [ ] **Step 7: Run the full test suite**

Run: `npm run test`
Expected: all tests pass, including `Navbar` if it has existing tests.

- [ ] **Step 8: Manual check**

Run: `npm run dev`, open the site, click the palette icon in the header — confirm every accent-colored element (buttons, the hero wordmark gradient, badges) switches to blue, and reload the page to confirm it stays blue.

- [ ] **Step 9: Commit**

```bash
git add src/components/ThemeToggle.tsx src/components/ThemeToggle.test.tsx src/components/Navbar.tsx index.html
git commit -m "feat: add blue theme toggle with localStorage persistence"
```

---

### Task 4: "Kanpur & across India" positioning copy

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/pages/About.tsx`

**Interfaces:**
- None (copy-only change, no new exports).

- [ ] **Step 1: Update the hero badge**

In `src/components/Hero.tsx`, find:

```tsx
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Trusted Solar Partner in Kanpur
```

Replace with:

```tsx
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Kanpur's Trusted Solar Partner — Serving Clients Across India
```

- [ ] **Step 2: Add a tagline to the footer**

In `src/components/Footer.tsx`, find:

```tsx
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            Let's Build a Brighter
            <br />
            Future Together
          </h2>
```

Replace with:

```tsx
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            Let's Build a Brighter
            <br />
            Future Together
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Kanpur-based, proudly serving clients across India.
          </p>
```

- [ ] **Step 3: Extend the About intro**

In `src/pages/About.tsx`, find the intro `<p>` (starts `Indus Solar Solutions is a Kanpur-based solar panel installation company...`) and add a sentence at the end, before the closing `</p>`:

```tsx
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Indus Solar Solutions is a Kanpur-based solar panel installation company run by {business.owner},
            serving homes, shops and factories in {business.address}. We started small and grew through repeat
            business and referrals — {impact.heading.toLowerCase()} reflects that: {impact.stats[0].value}
            {impact.stats[0].suffix} projects completed in {impact.stats[1].value} months of operation, all
            handled locally from consultation to after-sales support. Our installation crews work hands-on in and
            around Kanpur, and we take on consultation and project work for clients across India.
          </p>
```

- [ ] **Step 4: Run the full test suite**

Run: `npm run test`
Expected: all tests pass (copy changes don't affect assertions unless a test matched the old exact string — if `Hero.test.tsx` or similar exists and fails on the old string, update its expected text to match).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Footer.tsx src/pages/About.tsx
git commit -m "content: broaden positioning copy to Kanpur and across India"
```

---

### Task 5: `/services` page

**Files:**
- Create: `src/data/services.ts`
- Create: `src/pages/Services.tsx`
- Modify: `src/data/navigation.ts`
- Modify: `src/data/seo.ts`
- Modify: `src/AppShell.tsx`

**Interfaces:**
- Produces: `services` array export from `src/data/services.ts` (`{ title, body, icon }[]`), `Services` default export page component, `/services` route and `seo.ts` entry.

- [ ] **Step 1: Create the services data**

Create `src/data/services.ts`:

```ts
export type ServiceItem = {
  title: string;
  body: string;
};

export const services: ServiceItem[] = [
  {
    title: "Free Consultation & Site Survey",
    body: "We start by understanding your energy needs, checking your roof space and shading, and reviewing your electricity bill — so the system we recommend actually fits your usage and budget, not a generic package.",
  },
  {
    title: "Turnkey Installation",
    body: "From system design and component procurement through installation, commissioning, and net-metering paperwork with your DISCOM — we handle the full project as a single point of contact.",
  },
  {
    title: "Operations & Maintenance",
    body: "Panel cleaning, inverter checks, and periodic performance inspections to keep your system generating at its best for years after installation.",
  },
  {
    title: "Subsidy & Paperwork Assistance",
    body: "For eligible residential systems, we help with portal registration, feasibility applications, and submitting commissioning documents for subsidy disbursal under PM Surya Ghar Muft Bijli Yojana.",
  },
];
```

- [ ] **Step 2: Create the Services page**

Create `src/pages/Services.tsx` (same structural pattern as `About.tsx`):

```tsx
import { motion } from "framer-motion";
import { services } from "../data/services";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>
      <Seo {...getSeo("/services")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <img
          src="/images/technician-rooftop.jpg"
          alt="Indus Solar Solutions technician working on a rooftop installation"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            What We Do
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Beyond selling equipment, Indus Solar Solutions runs the full project lifecycle — from your first
            call through years of after-sales support.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Talk to Our Team
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Add the `/services` SEO entry**

In `src/data/seo.ts`, add a new object to the `staticSeo` array (after the `/about` entry):

```ts
  {
    path: "/services",
    title: "Our Solar Services in Kanpur | Indus Solar Solutions",
    description:
      "Free consultation, turnkey installation, operations & maintenance, and subsidy paperwork assistance — the full range of solar services from Indus Solar Solutions in Kanpur.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  },
```

- [ ] **Step 4: Add the nav link**

In `src/data/navigation.ts`, add a top-level entry after `{ label: "Home", href: "/" }`:

```ts
  { label: "Services", href: "/services" },
```

- [ ] **Step 5: Wire the route**

In `src/AppShell.tsx`, add the import:

```tsx
import Services from "./pages/Services";
```

And add the route after `/about`:

```tsx
        <Route path="/services" element={<Services />} />
```

- [ ] **Step 6: Run the build and test suite**

Run: `npm run test && npm run build`
Expected: tests pass; build succeeds and `dist/services/index.html` exists with correct title/meta tags; `dist/sitemap.xml` includes `/services`.

- [ ] **Step 7: Commit**

```bash
git add src/data/services.ts src/pages/Services.tsx src/data/navigation.ts src/data/seo.ts src/AppShell.tsx
git commit -m "feat: add /services page"
```

---

### Task 6: `/careers` page

**Files:**
- Create: `src/pages/Careers.tsx`
- Modify: `src/data/navigation.ts` (not added to primary nav — see step 3)
- Modify: `src/components/Footer.tsx`
- Modify: `src/data/seo.ts`
- Modify: `src/AppShell.tsx`

**Interfaces:**
- Produces: `Careers` default export page component, `/careers` route and `seo.ts` entry, a "Careers" link in the footer's Company column.

- [ ] **Step 1: Create the Careers page**

Create `src/pages/Careers.tsx`:

```tsx
import { motion } from "framer-motion";
import { business } from "../data/site";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const roleCategories = [
  {
    title: "Installation Technician",
    body: "Hands-on rooftop installation work — mounting structures, panels, wiring, and safety practices.",
  },
  {
    title: "Site Survey & Sales",
    body: "Meeting customers, assessing roofs and energy usage, and helping them choose the right system.",
  },
  {
    title: "Office & Admin Support",
    body: "Coordinating site visits, subsidy paperwork, and customer follow-ups.",
  },
];

export default function Careers() {
  return (
    <>
      <Seo {...getSeo("/careers")} />
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <img
          src="/images/why-choose/engineer.jpg"
          alt="Indus Solar Solutions installation team"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            Build Your Career With Us
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Indus Solar Solutions is a growing, hands-on solar installation team based in Kanpur. We're always
            open to hearing from people interested in the kinds of roles below — send us your details and we'll
            reach out when something fits.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {roleCategories.map((role) => (
              <div key={role.title} className="rounded-2xl bg-white p-5 shadow-md">
                <div className="font-display text-sm font-semibold text-ink">{role.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{role.body}</p>
              </div>
            ))}
          </div>

          <a
            href={`${business.whatsappUrl}?text=${encodeURIComponent(
              "Hi, I'm interested in working with Indus Solar Solutions. Here's a bit about myself:"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Send Us Your Details
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add the `/careers` SEO entry**

In `src/data/seo.ts`, add to `staticSeo` (after the `/services` entry from Task 5):

```ts
  {
    path: "/careers",
    title: "Careers at Indus Solar Solutions | Solar Jobs in Kanpur",
    description:
      "Interested in solar installation, sales, or support roles in Kanpur? Reach out to Indus Solar Solutions about career opportunities.",
    schema: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ]),
  },
```

- [ ] **Step 3: Add the footer link**

In `src/components/Footer.tsx`, in the "Company" column, add a Careers link after Contact:

```tsx
              <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
                <Link to="/about" className="hover:text-white">About</Link>
                <Link to="/projects" className="hover:text-white">Projects</Link>
                <Link to="/blog" className="hover:text-white">Blog</Link>
                <Link to="/contact" className="hover:text-white">Contact</Link>
                <Link to="/careers" className="hover:text-white">Careers</Link>
              </div>
```

- [ ] **Step 4: Wire the route**

In `src/AppShell.tsx`, add the import:

```tsx
import Careers from "./pages/Careers";
```

And the route after `/services`:

```tsx
        <Route path="/careers" element={<Careers />} />
```

- [ ] **Step 5: Run the build and test suite**

Run: `npm run test && npm run build`
Expected: tests pass; `dist/careers/index.html` exists; `/careers` appears in `dist/sitemap.xml`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Careers.tsx src/components/Footer.tsx src/data/seo.ts src/AppShell.tsx
git commit -m "feat: add /careers page"
```

---

### Task 7: State solar data table

**Files:**
- Create: `src/data/stateSolarData.ts`
- Create: `src/data/stateSolarData.test.ts`

**Interfaces:**
- Produces: `StateSolarData` type (`{ name: string; avgTariffPerUnit: number; avgSunHours: number }`), `stateSolarData: StateSolarData[]` array, `getStateSolarData(name: string): StateSolarData | undefined` lookup helper. Task 9 (component) consumes `stateSolarData` and `getStateSolarData`.

- [ ] **Step 1: Write the failing test**

Create `src/data/stateSolarData.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { stateSolarData, getStateSolarData } from "./stateSolarData";

describe("stateSolarData", () => {
  it("includes all 28 states and 8 union territories", () => {
    expect(stateSolarData.length).toBe(36);
  });

  it("has a plausible tariff and sun-hours range for every entry", () => {
    for (const entry of stateSolarData) {
      expect(entry.avgTariffPerUnit).toBeGreaterThan(0);
      expect(entry.avgTariffPerUnit).toBeLessThanOrEqual(15);
      expect(entry.avgSunHours).toBeGreaterThanOrEqual(3.5);
      expect(entry.avgSunHours).toBeLessThanOrEqual(6.5);
    }
  });

  it("includes Uttar Pradesh with a value consistent with the existing Kanpur-specific calculator", () => {
    const up = getStateSolarData("Uttar Pradesh");
    expect(up).toBeDefined();
    expect(up!.avgSunHours).toBeCloseTo(4.9, 1);
  });

  it("returns undefined for an unknown state", () => {
    expect(getStateSolarData("Narnia")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- stateSolarData`
Expected: FAIL — `Cannot find module './stateSolarData'`

- [ ] **Step 3: Implement the data file**

Create `src/data/stateSolarData.ts`:

```ts
// Indicative average residential electricity tariff (₹/unit) and average
// peak sun-hours/day per state/UT, used to auto-fill the solar calculator.
// These are approximate, publicly-known ranges — always adjustable by the
// user in the calculator, and not a substitute for an actual DISCOM bill
// or site survey.
export type StateSolarData = {
  name: string;
  avgTariffPerUnit: number;
  avgSunHours: number;
};

export const stateSolarData: StateSolarData[] = [
  { name: "Andhra Pradesh", avgTariffPerUnit: 7, avgSunHours: 5.4 },
  { name: "Arunachal Pradesh", avgTariffPerUnit: 5, avgSunHours: 4.2 },
  { name: "Assam", avgTariffPerUnit: 7, avgSunHours: 4.3 },
  { name: "Bihar", avgTariffPerUnit: 7, avgSunHours: 4.8 },
  { name: "Chhattisgarh", avgTariffPerUnit: 6, avgSunHours: 5.2 },
  { name: "Goa", avgTariffPerUnit: 4, avgSunHours: 5.3 },
  { name: "Gujarat", avgTariffPerUnit: 7, avgSunHours: 5.7 },
  { name: "Haryana", avgTariffPerUnit: 7, avgSunHours: 5.2 },
  { name: "Himachal Pradesh", avgTariffPerUnit: 5, avgSunHours: 5.0 },
  { name: "Jharkhand", avgTariffPerUnit: 7, avgSunHours: 5.0 },
  { name: "Karnataka", avgTariffPerUnit: 8, avgSunHours: 5.3 },
  { name: "Kerala", avgTariffPerUnit: 7, avgSunHours: 5.0 },
  { name: "Madhya Pradesh", avgTariffPerUnit: 7, avgSunHours: 5.5 },
  { name: "Maharashtra", avgTariffPerUnit: 9, avgSunHours: 5.4 },
  { name: "Manipur", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Meghalaya", avgTariffPerUnit: 6, avgSunHours: 4.2 },
  { name: "Mizoram", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Nagaland", avgTariffPerUnit: 6, avgSunHours: 4.2 },
  { name: "Odisha", avgTariffPerUnit: 6, avgSunHours: 5.0 },
  { name: "Punjab", avgTariffPerUnit: 6, avgSunHours: 5.1 },
  { name: "Rajasthan", avgTariffPerUnit: 7, avgSunHours: 5.8 },
  { name: "Sikkim", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Tamil Nadu", avgTariffPerUnit: 7, avgSunHours: 5.4 },
  { name: "Telangana", avgTariffPerUnit: 8, avgSunHours: 5.3 },
  { name: "Tripura", avgTariffPerUnit: 7, avgSunHours: 4.4 },
  { name: "Uttar Pradesh", avgTariffPerUnit: 7, avgSunHours: 4.9 },
  { name: "Uttarakhand", avgTariffPerUnit: 6, avgSunHours: 4.9 },
  { name: "West Bengal", avgTariffPerUnit: 8, avgSunHours: 4.6 },
  { name: "Andaman and Nicobar Islands", avgTariffPerUnit: 5, avgSunHours: 5.0 },
  { name: "Chandigarh", avgTariffPerUnit: 4, avgSunHours: 5.1 },
  { name: "Dadra and Nagar Haveli and Daman and Diu", avgTariffPerUnit: 3, avgSunHours: 5.5 },
  { name: "Delhi", avgTariffPerUnit: 6, avgSunHours: 5.3 },
  { name: "Jammu and Kashmir", avgTariffPerUnit: 5, avgSunHours: 4.5 },
  { name: "Ladakh", avgTariffPerUnit: 5, avgSunHours: 5.6 },
  { name: "Lakshadweep", avgTariffPerUnit: 4, avgSunHours: 5.2 },
  { name: "Puducherry", avgTariffPerUnit: 4, avgSunHours: 5.4 },
];

export function getStateSolarData(name: string): StateSolarData | undefined {
  return stateSolarData.find((s) => s.name === name);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- stateSolarData`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/data/stateSolarData.ts src/data/stateSolarData.test.ts
git commit -m "feat: add indicative state-wise tariff and sun-hours data"
```

---

### Task 8: Calculator V2 formula library

**Files:**
- Create: `src/lib/solarCalculatorV2.ts`
- Create: `src/lib/solarCalculatorV2.test.ts`

**Interfaces:**
- Consumes: `SYSTEM_DERATE` from `src/lib/solarCalculator.ts` (existing export).
- Produces: `CustomerCategory` type; `recommendedKwFromRoofArea`, `recommendedKwFromMonthlyUnits`, `recommendedKwFromMonthlyBill`, `estimateAnnualGenerationUnitsForState`, `subsidyForResidential`, `systemCostEstimate`, `paybackYears`, `annualRoiPercent`, `co2MitigatedKg`, `treesEquivalent` — all consumed by Task 9's component.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/solarCalculatorV2.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { recommendedSystemKw, estimateAnnualGenerationUnits } from "./solarCalculator";
import {
  recommendedKwFromRoofArea,
  recommendedKwFromMonthlyUnits,
  recommendedKwFromMonthlyBill,
  estimateAnnualGenerationUnitsForState,
  subsidyForResidential,
  systemCostEstimate,
  paybackYears,
  annualRoiPercent,
  co2MitigatedKg,
  treesEquivalent,
} from "./solarCalculatorV2";

describe("recommendedKwFromRoofArea", () => {
  it("recommends 3.5kW for 500 sq ft at the default 70% usable", () => {
    expect(recommendedKwFromRoofArea(500)).toBe(3.5);
  });

  it("respects a custom usable percentage", () => {
    expect(recommendedKwFromRoofArea(1000, 50)).toBe(5);
  });
});

describe("recommendedKwFromMonthlyUnits / recommendedKwFromMonthlyBill", () => {
  it("matches the existing Kanpur-specific formula at 4.5 sun-hours", () => {
    expect(recommendedKwFromMonthlyUnits(500, 4.5)).toBe(recommendedSystemKw(500));
  });

  it("derives units from a bill before recommending kW", () => {
    expect(recommendedKwFromMonthlyBill(3000, 8, 4.5)).toBe(3.5);
  });
});

describe("estimateAnnualGenerationUnitsForState", () => {
  it("matches the existing Kanpur-specific formula at 4.5 sun-hours", () => {
    expect(estimateAnnualGenerationUnitsForState(3, 4.5)).toBe(estimateAnnualGenerationUnits(3));
  });
});

describe("subsidyForResidential", () => {
  it("gives ₹60,000 for a 2kW system", () => {
    expect(subsidyForResidential(2, true)).toBe(60000);
  });

  it("caps at ₹78,000 for a 3kW+ system", () => {
    expect(subsidyForResidential(3, true)).toBe(78000);
    expect(subsidyForResidential(5, true)).toBe(78000);
  });

  it("gives ₹45,000 for a 1.5kW system", () => {
    expect(subsidyForResidential(1.5, true)).toBe(45000);
  });

  it("gives 0 when not applicable", () => {
    expect(subsidyForResidential(3, false)).toBe(0);
  });
});

describe("systemCostEstimate", () => {
  it("estimates residential cost at ₹55,000/kW", () => {
    expect(systemCostEstimate(3, "residential")).toBe(165000);
  });

  it("estimates commercial cost at ₹48,000/kW", () => {
    expect(systemCostEstimate(10, "commercial")).toBe(480000);
  });
});

describe("paybackYears / annualRoiPercent", () => {
  it("computes a 4 year payback for ₹1,00,000 net cost and ₹25,000/yr savings", () => {
    expect(paybackYears(100000, 25000)).toBe(4);
  });

  it("computes 25% annual ROI for the same inputs", () => {
    expect(annualRoiPercent(100000, 25000)).toBe(25);
  });

  it("returns 0 when annual savings is 0", () => {
    expect(paybackYears(100000, 0)).toBe(0);
  });
});

describe("co2MitigatedKg / treesEquivalent", () => {
  it("estimates 24,600kg CO2 over 30 years for 1000 units/year generation", () => {
    expect(co2MitigatedKg(1000)).toBe(24600);
  });

  it("estimates ~39 trees for 24,600kg CO2", () => {
    expect(treesEquivalent(24600)).toBe(39);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- solarCalculatorV2`
Expected: FAIL — `Cannot find module './solarCalculatorV2'`

- [ ] **Step 3: Implement the library**

Create `src/lib/solarCalculatorV2.ts`:

```ts
import { SYSTEM_DERATE } from "./solarCalculator";

// Roof-area sizing: standard industry rule of thumb of ~100 sq ft
// (~9.3 m²) of usable roof area per kW of installed capacity, indicative.
export const SQFT_PER_KW = 100;

// PM Surya Ghar Muft Bijli Yojana residential subsidy structure, matching
// the figures already published on /solar-subsidy-kanpur: ₹30,000/kW for
// the first 2kW, ₹18,000 for the 3rd kW, capped at ₹78,000 total.
export const RESIDENTIAL_SUBSIDY_PER_KW_FIRST_TWO = 30000;
export const RESIDENTIAL_SUBSIDY_THIRD_KW = 18000;
export const RESIDENTIAL_SUBSIDY_CAP = 78000;

export type CustomerCategory = "residential" | "commercial" | "industrial";

// Indicative installed cost per kW (DCR system, incl. installation),
// varying by category due to typical scale/equipment differences.
export const INSTALLED_COST_PER_KW: Record<CustomerCategory, number> = {
  residential: 55000,
  commercial: 48000,
  industrial: 42000,
};

// India grid emission factor baseline (CEA), indicative.
export const GRID_EMISSION_FACTOR_KG_PER_KWH = 0.82;

// Indicative: a mature tree absorbs roughly 21kg CO2/year, ~630kg over 30 years.
export const CO2_KG_PER_TREE_OVER_30_YEARS = 630;

export function recommendedKwFromRoofArea(roofAreaSqFt: number, usablePercent: number = 70): number {
  const usableSqFt = roofAreaSqFt * (usablePercent / 100);
  const raw = usableSqFt / SQFT_PER_KW;
  return Math.round(raw * 10) / 10;
}

export function recommendedKwFromMonthlyUnits(monthlyUnits: number, avgSunHours: number): number {
  const raw = monthlyUnits / (30 * avgSunHours * SYSTEM_DERATE);
  return Math.round(raw * 10) / 10;
}

export function recommendedKwFromMonthlyBill(
  monthlyBillRupees: number,
  tariffPerUnit: number,
  avgSunHours: number
): number {
  const monthlyUnits = monthlyBillRupees / tariffPerUnit;
  return recommendedKwFromMonthlyUnits(monthlyUnits, avgSunHours);
}

export function estimateAnnualGenerationUnitsForState(systemKw: number, avgSunHours: number): number {
  return Math.round(systemKw * avgSunHours * 365 * SYSTEM_DERATE);
}

export function subsidyForResidential(systemKw: number, applicable: boolean): number {
  if (!applicable || systemKw <= 0) return 0;
  const firstTwoKw = Math.min(systemKw, 2);
  const thirdKwPortion = systemKw > 2 ? Math.min(systemKw - 2, 1) : 0;
  const subsidy =
    firstTwoKw * RESIDENTIAL_SUBSIDY_PER_KW_FIRST_TWO + thirdKwPortion * RESIDENTIAL_SUBSIDY_THIRD_KW;
  return Math.min(Math.round(subsidy), RESIDENTIAL_SUBSIDY_CAP);
}

export function systemCostEstimate(systemKw: number, category: CustomerCategory): number {
  return Math.round(systemKw * INSTALLED_COST_PER_KW[category]);
}

export function paybackYears(netInvestment: number, annualSavings: number): number {
  if (annualSavings <= 0) return 0;
  return Math.round((netInvestment / annualSavings) * 10) / 10;
}

export function annualRoiPercent(netInvestment: number, annualSavings: number): number {
  if (netInvestment <= 0) return 0;
  return Math.round((annualSavings / netInvestment) * 1000) / 10;
}

export function co2MitigatedKg(annualGenerationUnits: number, years: number = 30): number {
  return Math.round(annualGenerationUnits * years * GRID_EMISSION_FACTOR_KG_PER_KWH);
}

export function treesEquivalent(totalCo2Kg: number): number {
  return Math.round(totalCo2Kg / CO2_KG_PER_TREE_OVER_30_YEARS);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test -- solarCalculatorV2`
Expected: PASS (all cases above)

- [ ] **Step 5: Commit**

```bash
git add src/lib/solarCalculatorV2.ts src/lib/solarCalculatorV2.test.ts
git commit -m "feat: add calculator v2 formula library with subsidy, cost, ROI and CO2 math"
```

---

### Task 9: `SolarCalculatorV2` wizard component

**Files:**
- Create: `src/components/SolarCalculatorV2.tsx`
- Create: `src/components/SolarCalculatorV2.test.tsx`

**Interfaces:**
- Consumes: `stateSolarData`, `getStateSolarData` (Task 7); all functions from `solarCalculatorV2.ts` (Task 8); `business` from `src/data/site.ts`; `products` from `src/data/products.ts` for the cross-sell strip.
- Produces: `SolarCalculatorV2` default export, prop `{ compact?: boolean }` (matches the old `SolarCalculator`'s prop shape so callers don't need to change).

- [ ] **Step 1: Write the failing component test**

Create `src/components/SolarCalculatorV2.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SolarCalculatorV2 from "./SolarCalculatorV2";

function fillStepOneMonthlyBill(billValue: string) {
  const input = screen.getByLabelText(/monthly electricity bill/i);
  fireEvent.change(input, { target: { value: billValue } });
}

function goToStepTwo() {
  fireEvent.click(screen.getByRole("button", { name: /^next$/i }));
}

function selectStateAndCategory(stateName: string) {
  fireEvent.change(screen.getByLabelText(/state \/ union territory/i), { target: { value: stateName } });
  fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "residential" } });
}

describe("SolarCalculatorV2", () => {
  it("walks through all three steps and shows a savings report", () => {
    render(<SolarCalculatorV2 />);

    expect(screen.getByText(/how would you like to calculate/i)).toBeInTheDocument();
    fillStepOneMonthlyBill("3000");
    goToStepTwo();

    expect(screen.getByText(/your location & customer type/i)).toBeInTheDocument();
    selectStateAndCategory("Uttar Pradesh");
    goToStepTwo();

    expect(screen.getByText(/your electricity unit cost/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /calculate my solar savings/i }));

    expect(screen.getByText(/your solar savings report/i)).toBeInTheDocument();
    expect(screen.getByText(/recommended plant size/i)).toBeInTheDocument();
    expect(screen.getByText(/net investment/i)).toBeInTheDocument();
    expect(screen.getByText(/payback period/i)).toBeInTheDocument();
    expect(screen.getByText(/co2/i)).toBeInTheDocument();
  });

  it("shows the subsidy applicable question only for residential", () => {
    render(<SolarCalculatorV2 />);
    fillStepOneMonthlyBill("3000");
    goToStepTwo();
    fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "commercial" } });
    expect(screen.queryByLabelText(/subsidy applicable/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "residential" } });
    expect(screen.getByLabelText(/subsidy applicable/i)).toBeInTheDocument();
  });

  it("switches to the roof-area input method", () => {
    render(<SolarCalculatorV2 />);
    fireEvent.click(screen.getByRole("button", { name: /roof area/i }));
    expect(screen.getByLabelText(/total rooftop area/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- SolarCalculatorV2`
Expected: FAIL — `Cannot find module './SolarCalculatorV2'`

- [ ] **Step 3: Implement `SolarCalculatorV2`**

Create `src/components/SolarCalculatorV2.tsx`:

```tsx
import { useMemo, useState } from "react";
import { business } from "../data/site";
import { products } from "../data/products";
import { stateSolarData, getStateSolarData } from "../data/stateSolarData";
import {
  type CustomerCategory,
  recommendedKwFromRoofArea,
  recommendedKwFromMonthlyUnits,
  recommendedKwFromMonthlyBill,
  estimateAnnualGenerationUnitsForState,
  subsidyForResidential,
  systemCostEstimate,
  paybackYears,
  annualRoiPercent,
  co2MitigatedKg,
  treesEquivalent,
} from "../lib/solarCalculatorV2";

type Method = "bill" | "units" | "roofArea";
type Step = 1 | 2 | 3 | "results";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function SolarCalculatorV2({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [method, setMethod] = useState<Method>("bill");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [monthlyUnits, setMonthlyUnits] = useState("");
  const [roofAreaSqFt, setRoofAreaSqFt] = useState("");
  const [roofUsablePercent, setRoofUsablePercent] = useState("70");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [category, setCategory] = useState<CustomerCategory>("residential");
  const [subsidyApplicable, setSubsidyApplicable] = useState(true);
  const [tariff, setTariff] = useState(7);

  const selectedState = getStateSolarData(stateName) ?? stateSolarData[0];

  const canProceedFromStepOne =
    (method === "bill" && Number(monthlyBill) > 0) ||
    (method === "units" && Number(monthlyUnits) > 0) ||
    (method === "roofArea" && Number(roofAreaSqFt) > 0);

  const results = useMemo(() => {
    const sunHours = selectedState.avgSunHours;
    let systemKw = 0;
    if (method === "roofArea") {
      systemKw = recommendedKwFromRoofArea(Number(roofAreaSqFt), Number(roofUsablePercent) || 70);
    } else if (method === "units") {
      systemKw = recommendedKwFromMonthlyUnits(Number(monthlyUnits), sunHours);
    } else {
      systemKw = recommendedKwFromMonthlyBill(Number(monthlyBill), tariff, sunHours);
    }

    const annualUnits = estimateAnnualGenerationUnitsForState(systemKw, sunHours);
    const monthlyUnitsGen = Math.round(annualUnits / 12);
    const lifetimeUnits = annualUnits * 30;

    const monthlySavings = Math.round(monthlyUnitsGen * tariff);
    const annualSavings = Math.round(annualUnits * tariff);
    const lifetimeSavings = annualSavings * 30;

    const systemCost = systemCostEstimate(systemKw, category);
    const subsidy = category === "residential" ? subsidyForResidential(systemKw, subsidyApplicable) : 0;
    const netInvestment = Math.max(systemCost - subsidy, 0);

    const payback = paybackYears(netInvestment, annualSavings);
    const roi = annualRoiPercent(netInvestment, annualSavings);

    const co2 = co2MitigatedKg(annualUnits, 30);
    const trees = treesEquivalent(co2);

    return {
      systemKw,
      sunHours,
      monthlyUnitsGen,
      annualUnits,
      lifetimeUnits,
      monthlySavings,
      annualSavings,
      lifetimeSavings,
      systemCost,
      subsidy,
      netInvestment,
      payback,
      roi,
      co2,
      trees,
    };
  }, [method, roofAreaSqFt, roofUsablePercent, monthlyUnits, monthlyBill, tariff, selectedState, category, subsidyApplicable]);

  const shareText = `My indicative solar savings report from Indus Solar Solutions:\n- Recommended system: ${results.systemKw}kW\n- Estimated annual savings: ${inr(results.annualSavings)}\n- Payback period: ${results.payback} years`;

  const shareWhatsApp = () => {
    window.open(`${business.whatsappUrl}?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "My Solar Savings Report"
    )}&body=${encodeURIComponent(shareText)}`;
  };

  const downloadPdf = () => {
    window.print();
  };

  return (
    <div className={`rounded-2xl bg-white p-6 shadow-lg md:p-8 ${compact ? "" : "mx-auto max-w-2xl"}`}>
      {step === 1 && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Step One</div>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">How would you like to calculate?</h3>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {(["bill", "units", "roofArea"] as Method[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`rounded-xl border p-3 text-left text-xs font-medium transition ${
                  method === m ? "border-accent-dark bg-cream" : "border-ink/10"
                }`}
              >
                {m === "bill" ? "Monthly Bill" : m === "units" ? "Monthly Units" : "Roof Area"}
              </button>
            ))}
          </div>

          {method === "bill" && (
            <div className="mt-4">
              <label htmlFor="monthly-bill" className="block text-sm font-medium text-ink">
                Your average monthly electricity bill (₹)
              </label>
              <input
                id="monthly-bill"
                type="number"
                min={0}
                inputMode="numeric"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="e.g. 3000"
                className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
              />
            </div>
          )}

          {method === "units" && (
            <div className="mt-4">
              <label htmlFor="monthly-units" className="block text-sm font-medium text-ink">
                Your monthly electricity consumption (kWh)
              </label>
              <input
                id="monthly-units"
                type="number"
                min={0}
                inputMode="numeric"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(e.target.value)}
                placeholder="e.g. 400"
                className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
              />
            </div>
          )}

          {method === "roofArea" && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="roof-area" className="block text-sm font-medium text-ink">
                  Total rooftop area (sq ft)
                </label>
                <input
                  id="roof-area"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={roofAreaSqFt}
                  onChange={(e) => setRoofAreaSqFt(e.target.value)}
                  placeholder="e.g. 500"
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                />
              </div>
              <div>
                <label htmlFor="roof-usable" className="block text-sm font-medium text-ink">
                  % of roof usable
                </label>
                <input
                  id="roof-usable"
                  type="number"
                  min={0}
                  max={100}
                  value={roofUsablePercent}
                  onChange={(e) => setRoofUsablePercent(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!canProceedFromStepOne}
            onClick={() => setStep(2)}
            className="mt-6 w-full rounded-full bg-charcoal py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Step Two</div>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">Your Location & Customer Type</h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-ink">
                State / Union Territory
              </label>
              <select
                id="state"
                value={stateName}
                onChange={(e) => {
                  setStateName(e.target.value);
                  const found = getStateSolarData(e.target.value);
                  if (found) setTariff(found.avgTariffPerUnit);
                }}
                className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
              >
                {stateSolarData.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-ink">
                Customer Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CustomerCategory)}
                className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
          </div>

          {category === "residential" && (
            <div className="mt-4">
              <label htmlFor="subsidy" className="block text-sm font-medium text-ink">
                Subsidy Applicable?
              </label>
              <select
                id="subsidy"
                value={subsidyApplicable ? "yes" : "no"}
                onChange={(e) => setSubsidyApplicable(e.target.value === "yes")}
                className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
              >
                <option value="yes">With Subsidy (DCR)</option>
                <option value="no">Without Subsidy</option>
              </select>
              <p className="mt-1 text-xs text-muted">
                PM Surya Ghar Muft Bijli Yojana subsidy applies to DCR panels for residential customers only.
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-full border border-ink/15 py-3 text-sm font-semibold text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 rounded-full bg-charcoal py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Step Three</div>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">Your Electricity Unit Cost</h3>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-ink">₹{tariff.toFixed(2)}</span>
              <span className="text-xs text-muted">per kWh (unit)</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={0.25}
              value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="mt-2 w-full accent-accent-dark"
              aria-label="Electricity unit cost"
            />
            <p className="mt-2 text-xs text-muted">
              Auto-filled with {selectedState.name}'s average tariff of ₹{selectedState.avgTariffPerUnit}/kWh.
              Adjust if your actual rate differs.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 rounded-full border border-ink/15 py-3 text-sm font-semibold text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep("results")}
              className="flex-1 rounded-full bg-charcoal py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              Calculate My Solar Savings
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-ink">Your Solar Savings Report</h3>
              <p className="text-xs text-muted">Based on your inputs — results are indicative</p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-medium text-accent-dark underline"
            >
              Start Over
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={shareWhatsApp}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={shareEmail}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
            >
              Email
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
            >
              Download PDF
            </button>
          </div>

          <div className="mt-5 rounded-xl bg-charcoal p-5 text-white">
            <div className="text-xs uppercase tracking-widest text-white/60">Recommended Plant Size</div>
            <div className="mt-1 font-display text-3xl font-bold">{results.systemKw} kWp</div>
            <div className="mt-3 flex gap-6 text-xs text-white/70">
              <span>Daily Generation: {(results.annualUnits / 365).toFixed(1)} kWh</span>
              <span>Peak Sun Hours: {results.sunHours} hrs/day</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-cream p-4 text-center">
              <div className="text-xs text-muted">Monthly</div>
              <div className="font-display font-semibold text-ink">{results.monthlyUnitsGen} kWh</div>
            </div>
            <div className="rounded-xl bg-cream p-4 text-center">
              <div className="text-xs text-muted">Annual</div>
              <div className="font-display font-semibold text-ink">{results.annualUnits} kWh</div>
            </div>
            <div className="rounded-xl bg-cream p-4 text-center">
              <div className="text-xs text-muted">30-Year</div>
              <div className="font-display font-semibold text-ink">{results.lifetimeUnits.toLocaleString("en-IN")} kWh</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-cream p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">
              Electricity Bill Savings (at ₹{tariff.toFixed(2)}/kWh)
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-muted">Monthly</div>
                <div className="font-display font-semibold text-ink">{inr(results.monthlySavings)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">Annual</div>
                <div className="font-display font-semibold text-ink">{inr(results.annualSavings)}</div>
              </div>
              <div>
                <div className="text-xs text-muted">30-Year</div>
                <div className="font-display font-semibold text-ink">{inr(results.lifetimeSavings)}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-cream p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">
              System Cost & Subsidy
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">System Cost (indicative)</span>
                <span className="font-medium text-ink">{inr(results.systemCost)}</span>
              </div>
              {results.subsidy > 0 && (
                <div className="flex justify-between text-accent-dark">
                  <span>PM Surya Ghar Subsidy</span>
                  <span>-{inr(results.subsidy)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-ink/10 pt-2 font-semibold text-ink">
                <span>Net Investment</span>
                <span>{inr(results.netInvestment)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-cream p-4 text-center">
              <div className="font-display text-xl font-bold text-ink">{results.payback} yrs</div>
              <div className="text-xs text-muted">Payback Period</div>
            </div>
            <div className="rounded-xl bg-cream p-4 text-center">
              <div className="font-display text-xl font-bold text-ink">{results.roi}%</div>
              <div className="text-xs text-muted">Annual ROI</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-cream p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">Environmental Impact</div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="font-display font-semibold text-ink">{(results.co2 / 1000).toFixed(1)} T</div>
                <div className="text-xs text-muted">CO2 Emissions Mitigated (30 yrs)</div>
              </div>
              <div>
                <div className="font-display font-semibold text-ink">{results.trees}</div>
                <div className="text-xs text-muted">Trees Planted Equivalent</div>
              </div>
            </div>
          </div>

          {products.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted">Explore Our Products</div>
              <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
                {products.slice(0, 4).map((p) => (
                  <a
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="w-32 shrink-0 rounded-lg border border-ink/10 p-2 text-xs font-medium text-ink hover:border-accent-dark"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted">
            Indicative estimate based on typical sun-hours, tariffs, and installed costs for your state. Actual
            results depend on your roof, usage, and current scheme rules — book a free site survey for an exact
            quote.
          </p>

          <a
            href={business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white transition hover:bg-ink"
          >
            Book a Free Site Survey
          </a>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- SolarCalculatorV2`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm run test`
Expected: all tests pass, including the untouched `SolarCalculator.test.tsx` for the old component.

- [ ] **Step 6: Commit**

```bash
git add src/components/SolarCalculatorV2.tsx src/components/SolarCalculatorV2.test.tsx
git commit -m "feat: add SolarCalculatorV2 multi-step wizard with savings report"
```

---

### Task 10: Wire `SolarCalculatorV2` into the homepage and calculator money page

**Files:**
- Modify: `src/components/HomeCalculator.tsx`
- Modify: `src/pages/MoneyPage.tsx`

**Interfaces:**
- Consumes: `SolarCalculatorV2` (Task 9).

- [ ] **Step 1: Swap the homepage calculator**

In `src/components/HomeCalculator.tsx`, replace the import and usage:

```tsx
import SolarCalculatorV2 from "./SolarCalculatorV2";

export default function HomeCalculator() {
  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          What Could You Save With Solar?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Calculate your recommended system size, savings, and payback period for your state.
        </p>
      </div>
      <div className="mt-8">
        <SolarCalculatorV2 />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render the wizard on the calculator money page**

In `src/pages/MoneyPage.tsx`, add the import:

```tsx
import SolarCalculatorV2 from "../components/SolarCalculatorV2";
```

Then, inside the `<section className="bg-cream ...">` block, insert the calculator between the intro paragraph and the sections list:

```tsx
          <p className="text-sm leading-relaxed text-muted md:text-base">{page.intro}</p>

          {page.slug === "solar-calculator-kanpur" && (
            <div className="mt-8">
              <SolarCalculatorV2 />
            </div>
          )}

          <div className="mt-10 space-y-10">
```

- [ ] **Step 3: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests pass; `npm run build` succeeds; `dist/solar-calculator-kanpur/index.html` renders correctly.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, visit `/` and `/solar-calculator-kanpur` at 375px width, walk through all three steps and confirm the results report renders correctly and the WhatsApp/Email/PDF buttons work.

- [ ] **Step 5: Commit**

```bash
git add src/components/HomeCalculator.tsx src/pages/MoneyPage.tsx
git commit -m "feat: wire SolarCalculatorV2 into homepage and calculator page"
```

---

### Task 11: Image expansion

**Files:**
- Create: `public/images/careers/team-1.jpg` (downloaded)
- Create: `public/images/services/consultation.jpg` (downloaded)
- Modify: `src/pages/Services.tsx`
- Modify: `src/pages/Careers.tsx`

**Interfaces:**
- None (visual-only change).

- [ ] **Step 1: Source two freely-licensed images**

Download two Unsplash photos (free-to-use license) into the repo — a solar-consultation/technician scene for Services, and a small-team/workshop scene for Careers:

```bash
curl -L "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80" -o public/images/services/consultation.jpg
curl -L "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" -o public/images/careers/team-1.jpg
```

Confirm both files downloaded and are valid JPEGs:

```bash
file public/images/services/consultation.jpg public/images/careers/team-1.jpg
```

Expected: both report as `JPEG image data`.

- [ ] **Step 2: Add a second image block to the Services page**

In `src/pages/Services.tsx`, after the services card grid and before the CTA link, add:

```tsx
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img
              src="/images/services/consultation.jpg"
              alt="Solar consultation and site survey in progress"
              className="h-56 w-full object-cover md:h-72"
              loading="lazy"
            />
          </div>
```

- [ ] **Step 3: Swap the Careers hero image**

In `src/pages/Careers.tsx`, change the hero `<img>` `src` from `/images/why-choose/engineer.jpg` to `/images/careers/team-1.jpg`:

```tsx
        <img
          src="/images/careers/team-1.jpg"
          alt="Indus Solar Solutions installation team"
          className="absolute inset-0 h-full w-full object-cover"
        />
```

- [ ] **Step 4: Run the build**

Run: `npm run build`
Expected: build succeeds; both images are copied into `dist/images/`.

- [ ] **Step 5: Manual check**

Run: `npm run dev`, visit `/services` and `/careers`, confirm both new images load correctly at 375px and 1280px widths.

- [ ] **Step 6: Commit**

```bash
git add public/images/services public/images/careers src/pages/Services.tsx src/pages/Careers.tsx
git commit -m "content: add sourced imagery to Services and Careers pages"
```

---

## Final verification (after all tasks)

- [ ] Run `npm run test` — full suite green.
- [ ] Run `npm run lint` — clean.
- [ ] Run `npm run build` — succeeds, `dist/sitemap.xml` includes `/services` and `/careers` alongside every pre-existing route.
- [ ] Manually toggle the theme button and confirm it persists across a reload.
- [ ] Manually complete the calculator wizard for at least one state other than Uttar Pradesh, and confirm the results and share buttons work.
- [ ] Confirm no existing route returns a different result than before this plan (spot-check `/`, `/about`, `/products`, `/solar-subsidy-kanpur`).
