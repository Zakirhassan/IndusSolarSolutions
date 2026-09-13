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
