/// <reference types="node" />
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { existsSync } from "node:fs";
import SizedImage, { DIMENSIONS, responsiveSrcSet } from "./SizedImage";

describe("SizedImage", () => {
  it("sets width/height for a known image path", () => {
    const { getByAltText } = render(
      <SizedImage src="/images/technician-rooftop.webp" alt="technician" />
    );
    const img = getByAltText("technician");
    expect(img.getAttribute("width")).toBe("1600");
    expect(img.getAttribute("height")).toBe("901");
  });

  it("renders without dimensions for an unmapped path instead of throwing", () => {
    const { getByAltText } = render(<SizedImage src="/images/unknown.webp" alt="unknown" />);
    const img = getByAltText("unknown");
    expect(img.getAttribute("width")).toBeNull();
    expect(img.getAttribute("height")).toBeNull();
  });

  it("forwards other img props like loading and className", () => {
    const { getByAltText } = render(
      <SizedImage src="/images/technician-rooftop.webp" alt="technician" loading="lazy" className="rounded" />
    );
    const img = getByAltText("technician");
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.className).toBe("rounded");
  });

  it("adds a srcset of the generated 480/720/960 variants plus the original", () => {
    const { getByAltText } = render(
      <SizedImage src="/images/technician-rooftop.webp" alt="technician" sizes="50vw" />
    );
    const img = getByAltText("technician");
    expect(img.getAttribute("srcset")).toBe(
      "/images/technician-rooftop-480.webp 480w, /images/technician-rooftop-720.webp 720w, /images/technician-rooftop-960.webp 960w, /images/technician-rooftop.webp 1600w"
    );
    expect(img.getAttribute("sizes")).toBe("50vw");
  });

  it("every srcset variant file exists on disk", () => {
    for (const [src, { width }] of Object.entries(DIMENSIONS)) {
      const candidates = responsiveSrcSet(src, width)?.split(", ").map((c) => c.split(" ")[0]) ?? [];
      for (const path of candidates) expect(existsSync(`public${path}`), path).toBe(true);
    }
  });

  it("skips srcset for svgs and unmapped images", () => {
    const { getByAltText } = render(<SizedImage src="/images/brands/jsw.svg" alt="jsw" />);
    expect(getByAltText("jsw").getAttribute("srcset")).toBeNull();
    expect(getByAltText("jsw").getAttribute("sizes")).toBeNull();
  });
});
