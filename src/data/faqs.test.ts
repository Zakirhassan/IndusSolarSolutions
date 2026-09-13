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
