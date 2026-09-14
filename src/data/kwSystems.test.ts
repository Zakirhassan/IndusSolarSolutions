import { describe, it, expect } from "vitest";
import { kwSystems, getKwSystemBySlug } from "./kwSystems";

describe("kwSystems", () => {
  it("has 5 entries with unique slugs matching /:kw:kw-solar-system-kanpur/", () => {
    expect(kwSystems).toHaveLength(5);
    expect(kwSystems.map((s) => s.slug)).toEqual([
      "1kw-solar-system-kanpur",
      "2kw-solar-system-kanpur",
      "3kw-solar-system-kanpur",
      "5kw-solar-system-kanpur",
      "10kw-solar-system-kanpur",
    ]);
  });

  it("derives monthly generation from the shared calculator formula", () => {
    const threeKw = kwSystems.find((s) => s.kw === 3)!;
    expect(threeKw.monthlyGenerationEstimateUnits).toBe(329);
  });
});

describe("getKwSystemBySlug", () => {
  it("finds a system by slug", () => {
    expect(getKwSystemBySlug("5kw-solar-system-kanpur")?.kw).toBe(5);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getKwSystemBySlug("99kw-solar-system-kanpur")).toBeUndefined();
  });
});
