export type MoneyPageSection = {
  heading: string;
  body: string;
  /** Optional bullet breakdown rendered under the body paragraph. */
  bullets?: string[];
  /** Optional label/value stat row (e.g. subsidy amounts, price ranges). */
  stats?: { label: string; value: string }[];
  /** Optional supporting photo — most sections have none; used sparingly. */
  image?: string;
  imageAlt?: string;
};

export type MoneyPageEntry = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  targetKeyword: string;
  heroImage: string;
  intro: string;
  sections: MoneyPageSection[];
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
    heroImage: "/images/hero/hero-5-rooftop.webp",
    intro:
      "Indus Solar Solutions installs rooftop solar systems across Kanpur — from single homes in Kidwai Nagar to factory rooftops in Panki. Every installation starts with a free site visit so the system we design actually matches your roof, budget and electricity usage, not a generic package.",
    sections: [
      {
        heading: "From First Call to a Working System",
        body: "A typical residential project runs through six stages, most completed within a few weeks depending on DISCOM turnaround on net-metering:",
        bullets: [
          "Free consultation & site survey — roof measurement, shading check, review of past electricity bills",
          "System design & subsidy application (where eligible) sized to your actual usage, not a round number",
          "Procurement of panels, inverter, mounting structure and balance-of-system components",
          "On-site installation — most residential rooftops completed within 1–3 days",
          "Commissioning and net-metering paperwork filed with your DISCOM",
          "Subsidy disbursal follow-up and after-sales support once the system is live",
        ],
      },
      {
        heading: "Residential, Commercial & Industrial — Different Jobs, Different Design",
        body: "A 3kW home system and a 50kW factory system aren't the same project scaled up — they draw power differently, sit on different roofs, and need different mounting engineering. See our dedicated Residential Solar, Commercial Solar and Industrial Solar pages for what changes at each scale.",
      },
      {
        heading: "Why Installation Quality Matters More Than the Panel Brand",
        body: "A solar panel is rated to run for 25 years, but a poorly torqued mounting frame, an undersized cable, or a rushed roof penetration can cause problems long before the panel itself degrades. We use corrosion-resistant mounting structures rated for Kanpur's weather, certified balance-of-system components, and inspect every installation ourselves before handover.",
        image: "/images/residential/residential-rooftop-india-1.webp",
        imageAlt: "Small rooftop solar panel array installed on a home in a dense Indian residential neighbourhood",
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
    heroImage: "/images/hero/hero-4-array.webp",
    intro:
      "Rooftop solar turns unused roof space into a source of savings. Whether it's a flat concrete roof, a sloped tin shed, or a factory rooftop, we design the mounting layout, tilt angle and wiring to fit what you actually have — not the other way around.",
    sections: [
      {
        heading: "What We Check on a Free Site Survey",
        body: "Four things decide whether — and how — a roof works for solar:",
        bullets: [
          "Shadow-free sun hours through the day (trees, water tanks and neighbouring buildings all matter)",
          "Roof orientation — south-facing gets the most sun through the year in Kanpur",
          "Structural strength to safely hold the mounting frame and panels",
          "Cable routing access to your meter and inverter location",
        ],
      },
      {
        heading: "Flat Roof vs Sloped Roof: Two Different Mounting Jobs",
        stats: [
          { label: "Flat RCC roofs", value: "Tilted frames" },
          { label: "Sloped metal sheds", value: "Rail-mounted" },
        ],
        body: "Flat RCC roofs, common across Kanpur homes and shops, use tilted mounting frames set at the optimal angle for year-round generation. Sloped metal-shed roofs, common on factories and warehouses, typically use rail-mounted systems that follow the existing slope instead. We size and mount each type differently rather than forcing one frame design onto every roof.",
      },
      {
        heading: "One Point of Contact From Survey to Commissioning",
        body: "After the site survey and design, we handle procurement, installation, wiring, and net-metering paperwork with your DISCOM ourselves — so you're not coordinating between a panel supplier, an electrician and a paperwork agent separately.",
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
    heroImage: "/images/rooftop-installation.webp",
    intro:
      "Most Kanpur households considering solar are trying to solve one problem: an electricity bill that keeps climbing. A correctly sized rooftop system can cut that bill significantly, and for most homes it qualifies for both a central and a state subsidy that lower the upfront cost together.",
    sections: [
      {
        heading: "Sizing a System for Your Home",
        body: "We size residential systems from your last few months of electricity bills, not guesswork. As a rough guide before your free survey:",
        stats: [
          { label: "1kW", value: "₹800–1,200/mo bill" },
          { label: "2kW", value: "₹1,500–2,200/mo bill" },
          { label: "3kW", value: "₹2,500–3,500/mo bill" },
          { label: "5kW", value: "₹4,000–6,000/mo bill" },
        ],
      },
      {
        heading: "Homes in Kanpur Qualify for Two Subsidies, Not One",
        body: "Residential rooftop solar in Kanpur is eligible for the central government's PM Surya Ghar Muft Bijli Yojana, and Uttar Pradesh separately runs its own UPNEDA top-up subsidy on the same installation. See our Solar Subsidy in Kanpur page for the full central-plus-state breakdown and current figures — we handle the paperwork for both.",
      },
      {
        heading: "What's Included in a Residential Package",
        body: "Panels, inverter, mounting structure, cabling and protection gear, installation, commissioning, and subsidy application assistance for both schemes — one point of contact from quote to a working system.",
        image: "/images/residential/residential-rooftop-india-2.webp",
        imageAlt: "Rooftop solar panels installed on a residential home in a dense Indian neighbourhood, city skyline in the background",
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
    heroImage: "/images/offer/panels.webp",
    intro:
      "Commercial electricity tariffs are usually higher than residential ones, which is the main reason a rooftop system pays back faster for a shop, office or commercial building than for many homes. We size commercial systems around actual daytime load — the hours your business is open and drawing the most power.",
    sections: [
      {
        heading: "Why the Payback Math Works Out Faster",
        body: "Businesses typically consume most of their electricity during working hours — the same hours solar panels generate the most power. That overlap means a larger share of your generation directly offsets grid electricity at commercial tariff rates, rather than being exported at lower rates and drawn back later.",
      },
      {
        heading: "Sizing for Shops, Offices & Retail",
        body: "We assess three things before proposing a size: sanctioned load, monthly consumption pattern, and available roof or terrace space. The system is then designed to cover as much of your daytime usage as the roof physically allows — net metering handles anything you draw outside sunlight hours.",
      },
      {
        heading: "Installation Scheduled Around Your Business, Not Ours",
        body: "We plan wiring, shutdowns and the installation timeline around your operating hours wherever possible, so a solar project doesn't become a reason to close early or lose a trading day.",
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
    heroImage: "/images/solar-farm-telangana.webp",
    intro:
      "Industrial units and factories around Kanpur and Kanpur Dehat often run high, steady daytime loads. That load profile — flat, predictable, and concentrated in daylight hours — is exactly where a larger rooftop or ground-mount solar system delivers the most savings per rupee invested.",
    sections: [
      {
        heading: "Engineered for the Roof and the Load, Not a Standard Template",
        body: "Factory sheds typically have large sloped metal roofs or open yard space suited to ground-mount arrays. Mounting structures are engineered for the specific wind and load conditions of the site, and the system is sized against your actual sanctioned industrial load and shift pattern rather than a fixed catalogue size.",
      },
      {
        heading: "Working Around Production, Not Against It",
        body: "Factories can't always pause a production line for solar work. Installation timing and any required shutdowns are coordinated with your production schedule in advance, in blocks that fit around it.",
      },
      {
        heading: "One Contractor for the Full EPC Scope",
        body: "For industrial projects we handle design, procurement, installation and commissioning, plus net-metering or open-access coordination where applicable.",
        bullets: [
          "Site assessment and load study",
          "Structural and electrical design for the specific roof/yard",
          "Procurement and installation",
          "Commissioning and grid/net-metering or open-access coordination",
        ],
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
    heroImage: "/images/offer/kit.webp",
    intro:
      "Two 3kW quotes from two different vendors can differ by tens of thousands of rupees, and the reason usually isn't one vendor overcharging — it's that \"3kW system\" doesn't specify panel technology, inverter type, or mounting complexity. This page explains what actually drives the price, so a quote makes sense rather than reading as a single unexplained number.",
    sections: [
      {
        heading: "Five Things That Move the Price",
        body: "For the same system size, these choices change the final number more than anything else:",
        bullets: [
          "Panel technology — standard poly vs high-efficiency mono PERC or bifacial",
          "Inverter type — string inverter vs hybrid, battery-ready inverter",
          "Mounting structure complexity — flat-roof tilted frame vs sloped-roof rail mount vs ground mount",
          "Cable run length and roof accessibility",
          "Whether battery storage is included",
        ],
      },
      {
        heading: "System Size at a Glance",
        body: "Roof area and panel count both scale roughly linearly with system size (using common ~540W panels, about 100 sq ft per kW). Browse each size below for who it typically suits and estimated monthly generation.",
        stats: [
          { label: "1kW", value: "~2 panels" },
          { label: "3kW", value: "~6 panels" },
          { label: "5kW", value: "~10 panels" },
          { label: "10kW", value: "~19 panels" },
        ],
      },
      {
        heading: "The Only Number Worth Trusting Is a Written Quote",
        body: "A free site survey lets us measure your roof, review your electricity bills, and give you a written quote covering exactly what's included — panels, inverter, mounting, cabling, installation and commissioning — with no line items added after the fact.",
      },
    ],
    faqSlugs: ["price-general", "price-3kw", "panel-count-3kw", "roof-space"],
  },
  {
    slug: "solar-subsidy-kanpur",
    title: "Solar Subsidy in Kanpur | Central + State Breakdown — Indus Solar Solutions",
    metaDescription:
      "Solar subsidy in Kanpur explained — the central PM Surya Ghar scheme plus Uttar Pradesh's own state top-up, eligibility, and how to apply, with links to official sources.",
    h1: "Solar Subsidy in Kanpur: Central + State Breakdown",
    targetKeyword: "solar subsidy Kanpur",
    heroImage: "/images/technician-rooftop.webp",
    intro:
      "Homes in Kanpur can draw on two separate subsidies for rooftop solar, not one — a central government scheme and a Uttar Pradesh state top-up, stacked on the same installation. Most explanations online only cover the central scheme; this page breaks out both, in plain terms, with links to verify current figures officially.",
    sections: [
      {
        heading: "Central Government: PM Surya Ghar Muft Bijli Yojana",
        body: "Administered by the Ministry of New and Renewable Energy (MNRE), this is the base subsidy available to residential households nationwide, structured per kW of system size up to a cap:",
        stats: [
          { label: "1kW", value: "₹30,000" },
          { label: "2kW", value: "₹60,000" },
          { label: "3kW+", value: "₹78,000 cap" },
        ],
        bullets: [
          "₹30,000 per kW for the first 2kW",
          "₹18,000 for the 3rd kW",
          "Capped at ₹78,000 total, regardless of system size beyond 3kW",
        ],
      },
      {
        heading: "Uttar Pradesh State Top-Up: UPNEDA",
        body: "On top of the central subsidy, the Uttar Pradesh New and Renewable Energy Development Agency (UPNEDA) runs its own state-level incentive for the same residential installation — one of the reasons UP's combined subsidy is among the highest in India.",
        stats: [{ label: "UPNEDA top-up", value: "₹15,000/kW, up to ₹30,000/household" }],
      },
      {
        heading: "Combined: What a 3kW Home System Can Receive",
        body: "Stacking both schemes on a 3kW residential system in Kanpur looks like this. Both schemes can change eligibility rules, disbursal timelines or figures at any point — we confirm your exact eligible amount during the free consultation, and always treat the official PM Surya Ghar portal and UPNEDA's rooftop solar portal as the source of truth over any third-party page, including this one.",
        stats: [
          { label: "Central (PM Surya Ghar)", value: "₹78,000" },
          { label: "State (UPNEDA)", value: "₹30,000" },
          { label: "Combined total", value: "up to ₹1,08,000" },
        ],
      },
      {
        heading: "Who's Eligible",
        body: "Both schemes target residential households installing grid-connected rooftop solar through an MNRE-empanelled vendor. Commercial and industrial installations are not covered under either residential scheme. We check your eligibility for both as part of the free consultation.",
      },
      {
        heading: "How We Help With the Paperwork",
        body: "We assist with portal registration, feasibility application, installation, and submitting commissioning documents for disbursal under both schemes — see our step-by-step PM Surya Ghar application guide for the full central-scheme process.",
      },
      {
        heading: "Official Sources to Verify Independently",
        body: "PM Surya Ghar national portal (central scheme), UPNEDA's rooftop solar portal (Uttar Pradesh state top-up), and your local DISCOM for net-metering rules — we point you to each so you can check current figures yourself rather than take our word for it.",
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
    heroImage: "/images/why-choose/engineer.webp",
    intro:
      "PM Surya Ghar Muft Bijli Yojana is the central government's flagship rooftop solar subsidy scheme. It's the larger of the two subsidies available to Kanpur homeowners — see our Solar Subsidy in Kanpur page if you want the central-plus-Uttar-Pradesh-state breakdown side by side; this page focuses on the central scheme itself and how to apply.",
    sections: [
      {
        heading: "What the Scheme Covers",
        body: "A capital subsidy for residential rooftop solar installations, structured by system size, along with simplified net-metering processes and loans through participating banks. Full current details are published on the official PM Surya Ghar portal — we keep this page updated, but the government portal is always the source of truth.",
      },
      {
        heading: "Step-by-Step Application Process",
        body: "Six steps from registration to receiving the subsidy:",
        bullets: [
          "Register on the national portal with your electricity consumer number and DISCOM details",
          "Apply for rooftop solar and receive feasibility approval",
          "Get the system installed by an MNRE-registered/empanelled vendor",
          "Submit plant details for net-meter installation",
          "After inspection, the DISCOM issues a commissioning certificate",
          "Submit bank account details and a cancelled cheque through the portal to receive the subsidy directly",
        ],
      },
      {
        heading: "Kanpur & Uttar Pradesh Specifics",
        body: "UPNEDA coordinates rooftop solar promotion at the state level in Uttar Pradesh, and your local DISCOM handles net-metering approval. We work within these local processes rather than a generic pan-India workflow — and we apply for UPNEDA's own state top-up subsidy alongside this central scheme, not as a separate afterthought.",
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
    heroImage: "/images/impact-sunset.webp",
    intro:
      "Enter your details below to get an indicative recommended system size, estimated generation, and estimated savings — the report updates live as you type. This is a starting estimate based on typical sun-hours for your state; your exact numbers depend on your roof and usage pattern, which we confirm with a free site survey.",
    sections: [
      {
        heading: "How This Estimate Is Calculated",
        body: "Recommended system size comes from your monthly electricity usage (or roof area, if you use that method instead). Annual generation is estimated using your state's average usable sun-hours and a standard system derate factor that accounts for real-world losses — wiring, temperature, dust, and inverter efficiency. Savings are estimated using an indicative per-unit tariff, which you can adjust if your actual DISCOM slab rate differs. This tool gives a starting point, not a quote.",
      },
    ],
    faqSlugs: ["price-general", "generation-3kw", "worth-it"],
  },
];

export function getMoneyPageBySlug(slug: string): MoneyPageEntry | undefined {
  return moneyPages.find((p) => p.slug === slug);
}
