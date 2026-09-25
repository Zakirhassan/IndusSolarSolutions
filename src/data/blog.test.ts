import { describe, it, expect } from "vitest";
import { blogArticles, getBlogArticleBySlug, type BlogArticle } from "./blog";
import { allSeo } from "./seo";

// Enforces docs/blog-style-guide.md. If a rule here fails, fix the writing,
// don't loosen the rule.

// Filler that makes posts read as machine-written or salesy.
const BANNED = [
  "honest", "honestly", "delve", "navigate", "navigating", "journey", "unlock",
  "seamless", "robust", "leverage", "game-changer", "game changer", "comprehensive",
  "in today's", "it's worth noting", "it is worth noting", "furthermore", "moreover",
  "whether you're", "look no further", "embark", "elevate", "landscape", "tapestry",
  "in conclusion", "ever-evolving", "harness the power", "peace of mind", "cutting-edge",
  "state-of-the-art", "hassle-free", "stress-free", "complete guide", "ultimate guide",
  "a testament to", "rest assured", "one-stop", "world-class", "best-in-class",
];

function allText(a: BlogArticle): string[] {
  return [
    a.title,
    a.metaDescription,
    a.h1,
    a.shortAnswer,
    ...a.sections.flatMap((s) => [
      s.heading,
      ...s.blocks.flatMap((b) =>
        b.type === "list" ? b.items : b.type === "table" ? [b.caption, ...b.head, ...b.rows.flat()] : [b.text]
      ),
    ]),
    ...a.faqs.flatMap((f) => [f.question, f.answer]),
  ];
}

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const stripLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
const internalLinks = (a: BlogArticle) =>
  allText(a).flatMap((t) => [...t.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]));

describe("blogArticles", () => {
  it("has unique slugs, and the original URLs still exist", () => {
    const slugs = blogArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of ["solar-panel-cost-kanpur-guide", "is-rooftop-solar-worth-it-kanpur", "pm-surya-ghar-application-guide"]) {
      expect(slugs).toContain(s);
    }
  });

  describe.each(blogArticles.map((a) => [a.slug, a] as const))("%s", (_slug, a) => {
    it("uses no banned filler phrases", () => {
      const text = allText(a).join(" ").toLowerCase();
      const hits = BANNED.filter((p) => new RegExp(`\\b${p.replace(/[-']/g, "[-' ]?")}\\b`).test(text));
      expect(hits).toEqual([]);
    });

    it("fits Google's title and description limits", () => {
      expect(a.title.length).toBeLessThanOrEqual(65);
      expect(a.metaDescription.length).toBeGreaterThanOrEqual(110);
      expect(a.metaDescription.length).toBeLessThanOrEqual(160);
    });

    it("opens with a direct short answer of 25-70 words", () => {
      expect(words(a.shortAnswer)).toBeGreaterThanOrEqual(25);
      expect(words(a.shortAnswer)).toBeLessThanOrEqual(70);
    });

    it("is specific: at least 8 concrete figures (₹, units, kW, days, %)", () => {
      const figures = allText(a).join(" ").match(/₹[\d,.]+|\d[\d,.]*\s*(?:%|kW|units?|days|weeks|years|lakh|per watt)/gi) ?? [];
      expect(figures.length).toBeGreaterThanOrEqual(8);
    });

    it("keeps sentences and paragraphs short", () => {
      for (const t of allText(a).map(stripLinks)) {
        for (const sentence of t.split(/(?<=[.?!])\s+/)) expect(words(sentence), sentence).toBeLessThanOrEqual(40);
        expect(words(t), t).toBeLessThanOrEqual(90);
      }
      const all = allText(a).map(stripLinks).join(" ");
      const sentences = all.split(/(?<=[.?!])\s+/);
      expect(words(all) / sentences.length).toBeLessThanOrEqual(22);
    });

    it("barely uses em dashes", () => {
      const dashes = (allText(a).join(" ").match(/—/g) ?? []).length;
      expect(dashes).toBeLessThanOrEqual(2);
    });

    it("links to at least 2 real pages on the site", () => {
      const links = internalLinks(a);
      expect(new Set(links).size).toBeGreaterThanOrEqual(2);
      const paths = new Set(allSeo.map((e) => e.path));
      for (const l of links) expect(paths.has(l), l).toBe(true);
    });

    it("cites at least 2 https sources, including an official portal", () => {
      expect(a.sources.length).toBeGreaterThanOrEqual(2);
      for (const s of a.sources) expect(s.url).toMatch(/^https:\/\//);
      expect(a.sources.some((s) => /\.gov\.in|\.org\.in|uperc\.org/.test(s.url))).toBe(true);
    });

    it("has at least 3 FAQs", () => {
      expect(a.faqs.length).toBeGreaterThanOrEqual(3);
    });

    it("has valid dates, with lastUpdated not before publishedDate", () => {
      expect(a.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.lastUpdated >= a.publishedDate).toBe(true);
    });
  });
});

describe("getBlogArticleBySlug", () => {
  it("finds an article by slug", () => {
    expect(getBlogArticleBySlug("solar-panel-cost-kanpur-guide")?.h1).toBe("Solar Panel Cost in Kanpur (2026)");
    expect(getBlogArticleBySlug("nope")).toBeUndefined();
  });
});
