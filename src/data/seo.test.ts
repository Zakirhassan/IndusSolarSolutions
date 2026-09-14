import { describe, it, expect } from "vitest";
import { allSeo } from "./seo";

describe("allSeo", () => {
  it("has no duplicate paths", () => {
    const paths = allSeo.map((e) => e.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("includes every money page, kW page, and locality page", () => {
    const paths = allSeo.map((e) => e.path);
    expect(paths).toContain("/solar-subsidy-kanpur");
    expect(paths).toContain("/3kw-solar-system-kanpur");
    expect(paths).toContain("/solar-panel-installation-kidwai-nagar");
    expect(paths).toContain("/faq");
    expect(paths).toContain("/about");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/blog/solar-panel-cost-kanpur-guide");
  });

  it("only the /faq entry carries FAQPage schema", () => {
    for (const entry of allSeo) {
      const schemas = Array.isArray(entry.schema) ? entry.schema : entry.schema ? [entry.schema] : [];
      const hasFaqSchema = schemas.some((s) => s["@type"] === "FAQPage");
      if (hasFaqSchema) {
        expect(entry.path).toBe("/faq");
      }
    }
  });
});
