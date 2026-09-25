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

  it("FAQPage schema only on /faq and blog posts, and no question is marked up twice", () => {
    const seen = new Map<string, string>();
    for (const entry of allSeo) {
      const schemas = Array.isArray(entry.schema) ? entry.schema : entry.schema ? [entry.schema] : [];
      for (const s of schemas.filter((s) => s["@type"] === "FAQPage")) {
        expect(entry.path === "/faq" || entry.path.startsWith("/blog/"), entry.path).toBe(true);
        for (const q of s.mainEntity as { name: string }[]) {
          expect(seen.get(q.name), `"${q.name}" on ${entry.path}`).toBeUndefined();
          seen.set(q.name, entry.path);
        }
      }
    }
  });
});
