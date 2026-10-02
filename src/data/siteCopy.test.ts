import { describe, it, expect } from "vitest";
import { findBannedPhrases } from "./bannedPhrases";
import { heroSlides, heroStat, whyChoose, offerItems, solutions, process, impact } from "./site";
import { faqs } from "./faqs";
import { kwSystems } from "./kwSystems";
import { localities } from "./localities";
import { moneyPages } from "./moneyPages";
import { products } from "./products";
import { projects } from "./projects";
import { services } from "./services";
import { allSeo } from "./seo";

// Same filler rules as the blog (docs/blog-style-guide.md), applied to the
// rest of the site's copy. Testimonials are deliberately not checked: they
// are customers' own words and must not be rewritten.
const copy: Record<string, unknown> = {
  heroSlides,
  heroStat,
  whyChoose,
  offerItems,
  solutions,
  process,
  impact,
  faqs,
  kwSystems,
  localities,
  moneyPages,
  products,
  projects,
  services,
  seo: allSeo.map(({ title, description }) => ({ title, description })),
};

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("site copy", () => {
  it.each(Object.entries(copy))("%s uses no banned filler phrases", (_name, value) => {
    const hits = strings(value).flatMap((s) => findBannedPhrases(s).map((p) => `"${p}" in: ${s.slice(0, 80)}`));
    expect(hits).toEqual([]);
  });
});
