import { describe, it, expect } from "vitest";
import {
  localities,
  getLocalityBySlug,
  getTestimonialsForLocality,
  getProjectsForLocality,
} from "./localities";

describe("localities", () => {
  it("has 6 entries with unique slugs", () => {
    expect(localities).toHaveLength(6);
    const slugs = localities.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(6);
  });

  it("each locality has at least one matching testimonial and one matching project", () => {
    for (const entry of localities) {
      expect(getTestimonialsForLocality(entry).length).toBeGreaterThan(0);
      expect(getProjectsForLocality(entry).length).toBeGreaterThan(0);
    }
  });
});

describe("getLocalityBySlug", () => {
  it("finds Kidwai Nagar", () => {
    expect(getLocalityBySlug("solar-panel-installation-kidwai-nagar")?.name).toBe("Kidwai Nagar");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getLocalityBySlug("solar-panel-installation-nowhere")).toBeUndefined();
  });
});
