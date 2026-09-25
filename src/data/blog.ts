// Blog articles. Writing rules live in docs/blog-style-guide.md and are
// enforced by src/data/blog.test.ts (banned filler phrases, every article
// needs figures, internal links, sources and FAQs). Inline links use
// markdown syntax: [text](/internal-path) or [text](https://external).

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  publishedDate: string;
  lastUpdated: string;
  author: keyof typeof blogAuthors;
  // 2-3 sentence direct answer shown above the article (and used by search
  // engines / AI answers as the snippet).
  shortAnswer: string;
  sections: { heading: string; blocks: BlogBlock[] }[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
};

export const blogAuthors = {
  abul: {
    name: "Abul Hassan",
    role: "Owner, Indus Solar Solutions, Kanpur",
  },
} as const;

export const blogArticles: BlogArticle[] = [
  {
    slug: "solar-panel-cost-kanpur-guide",
    title: "Solar Panel Cost in Kanpur 2026: Price After Subsidy",
    metaDescription:
      "Our Kanpur prices: 3kW rooftop solar for ₹1.65–1.95 lakh before subsidy, about ₹57,000–87,000 after the ₹1.08 lakh subsidy. What changes the price.",
    h1: "Solar Panel Cost in Kanpur (2026)",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-25",
    author: "abul",
    shortAnswer:
      "We install a 3kW on-grid rooftop system in Kanpur for ₹1.65–1.95 lakh before subsidy, and 1–2kW systems at about ₹70,000 per kW. Homes can claim up to ₹78,000 from PM Surya Ghar plus up to ₹30,000 from UPNEDA, so a 3kW system nets out at ₹57,000–87,000. You pay the full price first and the subsidy follows commissioning.",
    sections: [
      {
        heading: "Our prices, before and after subsidy",
        blocks: [
          {
            type: "p",
            text: "The subsidy is fixed per household, not a percentage of the price. It is ₹30,000 per kW for the first 2kW and ₹18,000 for the 3rd kW from PM Surya Ghar, plus ₹15,000 per kW up to ₹30,000 from UPNEDA. Above 3kW it stops growing.",
          },
          {
            type: "table",
            caption: "Indus Solar Solutions installed prices for homes in Kanpur (on-grid, 2026)",
            head: ["System", "Our price", "Total subsidy", "You pay after subsidy"],
            rows: [
              ["1kW", "about ₹70,000", "₹45,000", "about ₹25,000"],
              ["2kW", "about ₹1,40,000", "₹90,000", "about ₹50,000"],
              ["3kW", "₹1,65,000–1,95,000", "₹1,08,000", "₹57,000–87,000"],
            ],
          },
          {
            type: "p",
            text: "Small systems cost more per kW because the inverter, structure, wiring and paperwork cost nearly the same at any size. That is why 3kW works out cheaper per kW than 1kW. Where your 3kW price lands in the range depends on the roof and the parts chosen, covered below. You can estimate your size and savings with our [solar calculator](/solar-calculator-kanpur).",
          },
        ],
      },
      {
        heading: "The panel rule that moves the price: DCR",
        blocks: [
          {
            type: "p",
            text: "To get the PM Surya Ghar subsidy, panels must be DCR (Domestic Content Requirement): both the cells and the module made in India. DCR panels cost about ₹8–11 more per watt than panels built with imported cells. On 3kW (3,000 watts) that is ₹24,000–33,000 extra.",
          },
          {
            type: "p",
            text: "This is the most common reason two 3kW quotes differ. A cheap quote with non-DCR panels can look ₹30,000 lower and then lose you ₹78,000 of subsidy. Ask for the panel model and its DCR certificate in writing.",
          },
        ],
      },
      {
        heading: "What else changes the price",
        blocks: [
          {
            type: "list",
            items: [
              "Inverter type. A plain on-grid inverter is the cheapest. A hybrid inverter, which can add batteries later, costs more.",
              "Mounting structure. A flat RCC roof takes a standard galvanised iron frame. Tin sheds, sloped roofs or a raised frame (so you can still use the roof below) need more steel.",
              "Cable length. If the inverter and meter are far from the roof, you pay for longer DC and AC cable runs.",
              "Earthing and lightning protection. These should be in every quote. If one quote leaves them out, it isn't cheaper, it's incomplete.",
            ],
          },
        ],
      },
      {
        heading: "What a complete quote should list",
        blocks: [
          {
            type: "p",
            text: "Compare quotes line by line, not by the total. Each of these should be named, with brand and model where it applies:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Panel brand, wattage, number of panels, DCR status and warranty (product and performance).",
              "Inverter brand, capacity and warranty.",
              "Structure material, height and coating.",
              "DC and AC cable, distribution boxes, earthing kit and lightning arrester.",
              "Net-meter application with KESCO and any meter charges.",
              "Who files the PM Surya Ghar and UPNEDA subsidy paperwork.",
              "Free service visits after installation, and how many years they cover.",
            ],
          },
          {
            type: "p",
            text: "We give a written, itemised quote after a free site visit. The subsidy steps are covered in our [PM Surya Ghar application guide](/blog/pm-surya-ghar-application-guide), and the central and state amounts are broken down on the [solar subsidy in Kanpur](/solar-subsidy-kanpur) page.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a 3kW solar system cost in Kanpur after subsidy?",
        answer:
          "About ₹57,000–87,000 in 2026. Our installed price for 3kW is ₹1.65–1.95 lakh, minus the ₹1.08 lakh combined PM Surya Ghar and UPNEDA subsidy.",
      },
      {
        question: "Is the subsidy deducted from the price upfront?",
        answer:
          "No. You pay the installer the full price. The central and state subsidies are credited to your bank account after the system is commissioned and the net meter is installed.",
      },
      {
        question: "Does a 5kW system get more subsidy than 3kW?",
        answer: "No. The central subsidy is capped at ₹78,000 and the UP top-up at ₹30,000, both reached at 3kW.",
      },
    ],
    sources: [
      { label: "PM Surya Ghar Muft Bijli Yojana: official portal", url: "https://pmsuryaghar.gov.in/" },
      { label: "UPNEDA: Uttar Pradesh New and Renewable Energy Development Agency", url: "https://upneda.org.in/" },
      { label: "Market comparison: 3kW system prices in UP, city-wise (SolarSahi, 2026)", url: "https://solarsahi.com/learn/pricing-and-roi/3kw-solar-system-price-uttar-pradesh/" },
      { label: "DCR vs non-DCR panels: subsidy rules and cost (Bridgeway Power, 2026)", url: "https://bridgewaypower.in/blog/dcr-vs-non-dcr-solar-panel-subsidy" },
    ],
  },
  {
    slug: "is-rooftop-solar-worth-it-kanpur",
    title: "Is Rooftop Solar Worth It in Kanpur? 2026 Payback Math",
    metaDescription:
      "On KESCO's tariff, a home using 400 units a month saves about ₹2,000 a month with 3kW solar and recovers the net cost in 2.3–3.5 years.",
    h1: "Is Rooftop Solar Worth It in Kanpur?",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-25",
    author: "abul",
    shortAnswer:
      "For a Kanpur home using about 300 units or more a month, usually yes. On the current KESCO tariff, a 3kW system cuts a 400-unit bill from about ₹2,840 to about ₹780 a month. After the ₹1.08 lakh subsidy, the net cost is typically recovered in 2.3 to 3.5 years, and the panels are warranted for 25.",
    sections: [
      {
        heading: "The numbers on a real KESCO bill",
        blocks: [
          {
            type: "p",
            text: "KESCO bills urban homes in slabs: ₹5.50 a unit for the first 150 units, ₹6.00 for units 151–300, and ₹6.50 above 300. On top of that there is a fixed charge of ₹110 per kW of sanctioned load each month, plus 5% electricity duty.",
          },
          {
            type: "p",
            text: "A 3kW system in Kanpur generates about 320–330 units a month averaged over the year. With net metering, every unit it produces is taken off the units you are billed for. Here is a household on a 3kW sanctioned load using 400 units a month:",
          },
          {
            type: "table",
            caption: "Monthly bill for 400 units, 3kW sanctioned load (KESCO urban domestic tariff)",
            head: ["", "Without solar", "With 3kW solar"],
            rows: [
              ["Units billed", "400", "75"],
              ["Energy charge", "₹2,375", "₹413"],
              ["Fixed charge (3kW × ₹110)", "₹330", "₹330"],
              ["Electricity duty (5%)", "₹135", "₹37"],
              ["Approximate bill", "₹2,840", "₹780"],
            ],
          },
          {
            type: "p",
            text: "That is a saving of about ₹2,060 a month, or ₹24,700 a year. Note that the fixed charge doesn't go away. Solar replaces units, not the connection.",
          },
        ],
      },
      {
        heading: "Payback time",
        blocks: [
          {
            type: "p",
            text: "Our installed price for 3kW is ₹1.65–1.95 lakh in 2026. After the combined ₹1.08 lakh subsidy, you are left with ₹57,000–87,000. At ₹24,700 a year saved, that is recovered in about 2.3 to 3.5 years. The prices and subsidy are explained in our [solar panel cost guide](/blog/solar-panel-cost-kanpur-guide).",
          },
          {
            type: "note",
            text: "Two things stretch this in practice. You pay the full price first and the subsidy arrives weeks or months after commissioning. And output drops in the monsoon (July to September) and on foggy December and January mornings, then peaks from March to May. The yearly average already includes this, but month-to-month savings will swing.",
          },
        ],
      },
      {
        heading: "When solar is a weak fit",
        blocks: [
          {
            type: "list",
            items: [
              "Low usage. At 100–150 units a month you pay the cheapest ₹5.50 slab, so each unit saved is worth less, and payback gets closer to 5–6 years.",
              "Shade. A water tank, a neighbour's taller building or a tree across the panels in the afternoon can cut output far more than the shaded area suggests.",
              "No usable roof. Rented flats and shared terraces need written permission from the owner or society before a net meter will be approved.",
              "Oversizing. Surplus units left at the end of the financial year are paid at roughly ₹3–3.6 a unit, far below what you pay to buy. Size the system to your usage, not your roof.",
            ],
          },
        ],
      },
      {
        heading: "Check your own numbers",
        blocks: [
          {
            type: "p",
            text: "Take the units (not the rupees) from your last 12 KESCO bills and average them. That average decides the right system size. Our [solar calculator](/solar-calculator-kanpur) runs this for you, and the [3kW system page](/3kw-solar-system-kanpur) shows what that size suits.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How many units does a 3kW solar system generate in Kanpur?",
        answer:
          "About 320–330 units a month on average across the year, with more in March–May and less during the monsoon and winter fog.",
      },
      {
        question: "Does solar remove the fixed charge on my KESCO bill?",
        answer: "No. The fixed charge of ₹110 per kW of sanctioned load stays. Solar reduces the units you are billed for.",
      },
      {
        question: "What happens to extra units I export?",
        answer:
          "With net metering they are credited against units you use later. Anything left at the end of the financial year is paid out at a rate of roughly ₹3–3.6 per unit.",
      },
    ],
    sources: [
      { label: "UPERC tariff order for UP DISCOMs, FY 2025-26", url: "https://www.uperc.org/App_File/UPPCLTariffOrderFY2025-26-pdf1122202564623PM.pdf" },
      { label: "KESCO domestic tariff slabs 2026-27 (TheDiscomBill)", url: "https://thediscombill.com/tariffs/uttar-pradesh/kesco/" },
      { label: "Net metering in Uttar Pradesh: settlement and timelines (Rudransh Solartech)", url: "https://rudranshsolartech.com/net-metering-uttar-pradesh-uppcl/" },
      { label: "PM Surya Ghar Muft Bijli Yojana: official portal", url: "https://pmsuryaghar.gov.in/" },
    ],
  },
  {
    slug: "pm-surya-ghar-application-guide",
    title: "PM Surya Ghar in Kanpur: How to Apply (2026 Steps)",
    metaDescription:
      "How to claim ₹78,000 PM Surya Ghar plus ₹30,000 UPNEDA subsidy in Kanpur: documents, 6 portal steps, KESCO net metering and a 6–10 week timeline.",
    h1: "How to Apply for PM Surya Ghar in Kanpur",
    publishedDate: "2026-09-13",
    lastUpdated: "2026-09-25",
    author: "abul",
    shortAnswer:
      "Register at pmsuryaghar.gov.in with your KESCO consumer number, get feasibility approval, have a registered vendor install DCR panels, then apply for the net meter. After KESCO inspects and commissions the system, you submit your bank details and the subsidy is paid to your account. Expect about 6–10 weeks from application to net meter.",
    sections: [
      {
        heading: "Documents to keep ready",
        blocks: [
          {
            type: "list",
            items: [
              "Latest KESCO electricity bill (for the consumer number and sanctioned load).",
              "Aadhaar of the person named on the electricity connection.",
              "Bank passbook or a cancelled cheque for that person's account.",
              "Proof of roof ownership, or written consent from the owner or society if you don't own it.",
              "A mobile number and email you check, since approvals arrive as portal notifications.",
            ],
          },
        ],
      },
      {
        heading: "The 6 steps, in order",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Register on [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in/): select Uttar Pradesh, then KESCO as your DISCOM, and enter your consumer number.",
              "Apply for rooftop solar on the portal. KESCO checks technical feasibility against your sanctioned load and approves or asks for changes, usually in 15–30 days.",
              "Choose a vendor registered on the portal and get the system installed with DCR panels. Non-DCR panels make the application ineligible.",
              "Submit installation details and apply for the net meter through the portal.",
              "KESCO inspects the installation, fits the net meter and issues the commissioning report.",
              "Enter your bank details on the portal. The central subsidy is paid directly into your account, not through the installer.",
            ],
          },
          {
            type: "p",
            text: "The UPNEDA state top-up (up to ₹30,000) is processed on the same installation. We track both claims for our customers. The amounts for each system size are on our [solar subsidy in Kanpur](/solar-subsidy-kanpur) page.",
          },
        ],
      },
      {
        heading: "How long it takes",
        blocks: [
          {
            type: "table",
            caption: "Typical time per stage for a Kanpur home",
            head: ["Stage", "Typical time"],
            rows: [
              ["Feasibility approval from KESCO", "15–30 days"],
              ["Installation", "7–15 days after approval"],
              ["Inspection by KESCO", "7–15 days"],
              ["Net meter fitted", "7–15 days"],
              ["Total, application to net meter", "about 6–10 weeks"],
            ],
          },
          {
            type: "p",
            text: "Subsidy credit follows after commissioning and varies with the government's disbursal cycle. Delays usually come from a mismatch between the name on the electricity bill and the bank account, or a sanctioned load lower than the system size. Fix both before you apply.",
          },
        ],
      },
      {
        heading: "Mistakes that cost people the subsidy",
        blocks: [
          {
            type: "list",
            items: [
              "Installing before feasibility approval. Work done before approval is not eligible.",
              "Non-DCR panels, or a vendor not registered on the portal.",
              "Bank account in a different name from the electricity connection.",
              "Paying anyone a fee to register. Registration on the government portal is free.",
            ],
          },
          {
            type: "p",
            text: "Not sure what size to apply for? Start with the [solar panel cost guide](/blog/solar-panel-cost-kanpur-guide) and our [calculator](/solar-calculator-kanpur).",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How long does PM Surya Ghar take in Kanpur?",
        answer:
          "About 6–10 weeks from application to net meter installation with KESCO. The subsidy is credited after commissioning.",
      },
      {
        question: "Can I get PM Surya Ghar and the UP state subsidy together?",
        answer:
          "Yes. Residential homes in Uttar Pradesh can receive up to ₹78,000 from PM Surya Ghar and up to ₹30,000 from UPNEDA on the same installation, a total of ₹1,08,000.",
      },
      {
        question: "Is the subsidy paid to the installer?",
        answer: "No. It is paid directly into the bank account of the person named on the electricity connection.",
      },
    ],
    sources: [
      { label: "PM Surya Ghar Muft Bijli Yojana: official portal", url: "https://pmsuryaghar.gov.in/" },
      { label: "UPNEDA: Uttar Pradesh New and Renewable Energy Development Agency", url: "https://upneda.org.in/" },
      { label: "Non-DCR panels under the 'Give It Up' option (Saur Energy)", url: "https://www.saurenergy.com/solar-energy-news/non-dcr-solar-panels-can-be-used-under-pm-surya-ghar-under-give-it-up-option-mnre-12016430" },
      { label: "UPPCL net metering process and timelines (Quickest Solar)", url: "https://quickestimate.co/blog/upcl-uppcl-net-metering-guide" },
    ],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

// ~200 words per minute across the short answer, body and FAQs.
export function readingMinutes(article: BlogArticle): number {
  const text = [
    article.shortAnswer,
    ...article.sections.flatMap((s) =>
      s.blocks.flatMap((b) =>
        b.type === "list" ? b.items : b.type === "table" ? b.rows.flat() : [b.text]
      )
    ),
    ...article.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
