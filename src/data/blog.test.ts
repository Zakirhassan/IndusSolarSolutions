import { describe, it, expect } from "vitest";
import { blogArticles, getBlogArticleBySlug } from "./blog";

describe("blogArticles", () => {
  it("has 3 entries with unique slugs and an honest author label", () => {
    expect(blogArticles).toHaveLength(3);
    const slugs = blogArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(3);
    for (const article of blogArticles) {
      expect(article.author).toBe("Indus Solar Solutions Team");
      expect(article.sections.length).toBeGreaterThan(1);
    }
  });
});

describe("getBlogArticleBySlug", () => {
  it("finds the cost guide article", () => {
    expect(getBlogArticleBySlug("solar-panel-cost-kanpur-guide")?.h1).toBe(
      "Solar Panel Cost in Kanpur: Complete Guide"
    );
  });
});
