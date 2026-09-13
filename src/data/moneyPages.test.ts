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
