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
      "Residential rooftop solar in Kanpur can draw on two subsidies: the central government's PM Surya Ghar Muft Bijli Yojana (up to ₹78,000) plus Uttar Pradesh's own UPNEDA state top-up (up to ₹30,000), a combined total of up to ₹1,08,000 depending on system size and eligibility. See our Solar Subsidy in Kanpur page for the full breakdown — subsidy rules are set by the government and can change, so always verify current figures on the official PM Surya Ghar and UPNEDA portals before deciding.",
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
