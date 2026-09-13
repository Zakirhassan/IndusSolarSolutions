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
