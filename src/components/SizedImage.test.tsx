import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import SizedImage from "./SizedImage";

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
});
