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
