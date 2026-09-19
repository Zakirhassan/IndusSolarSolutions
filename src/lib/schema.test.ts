import { describe, it, expect } from "vitest";
import { breadcrumbSchema, serviceSchema, faqSchema } from "./schema";

describe("breadcrumbSchema", () => {
  it("builds a BreadcrumbList with 1-indexed positions and absolute URLs", () => {
    const result = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solar Subsidy", path: "/solar-subsidy-kanpur" },
    ]);
    expect(result["@type"]).toBe("BreadcrumbList");
    const items = result.itemListElement as { position: number; name: string; item: string }[];
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ position: 1, name: "Home" });
    expect(items[1]).toMatchObject({ position: 2, name: "Solar Subsidy" });
    expect(items[1].item).toBe("https://www.indussolarsolutions.com/solar-subsidy-kanpur");
  });
});

describe("serviceSchema", () => {
  it("builds a Service schema tied to the business as provider", () => {
    const result = serviceSchema({
      name: "Residential Solar Installation",
      description: "Rooftop solar for homes in Kanpur",
      path: "/residential-solar-kanpur",
    });
    expect(result["@type"]).toBe("Service");
    expect(result.serviceType).toBe("Residential Solar Installation");
    expect(result.areaServed).toEqual(["Kanpur"]);
    expect((result.provider as { name: string }).name).toBe("Indus Solar Solutions");
    expect(result.url).toBe("https://www.indussolarsolutions.com/residential-solar-kanpur");
  });

  it("accepts a custom areaServed list", () => {
    const result = serviceSchema({
      name: "Industrial Solar",
      description: "desc",
      path: "/industrial-solar-kanpur",
      areaServed: ["Kanpur", "Kanpur Dehat"],
    });
    expect(result.areaServed).toEqual(["Kanpur", "Kanpur Dehat"]);
  });
});

describe("faqSchema", () => {
  it("builds an FAQPage with Question/Answer pairs", () => {
    const result = faqSchema([{ question: "Is solar worth it?", answer: "Usually, yes." }]);
    expect(result["@type"]).toBe("FAQPage");
    const entity = result.mainEntity as { "@type": string; name: string; acceptedAnswer: { text: string } }[];
    expect(entity[0].name).toBe("Is solar worth it?");
    expect(entity[0].acceptedAnswer.text).toBe("Usually, yes.");
  });
});
