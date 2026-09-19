import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import Seo from "./Seo";

// Regression test for the Sep 2026 SEO audit finding "multiple twitter:title
// / twitter:description values specified": Seo previously rendered its tags
// as JSX, which React 19 hoists into <head> as *new* elements on hydration —
// duplicating the tags scripts/prerender.ts already wrote into the static
// HTML. Seo now updates the existing tags in place instead.
describe("Seo", () => {
  afterEach(() => {
    cleanup();
    document.head.querySelectorAll("meta, link, title").forEach((el) => el.remove());
  });

  it("sets document.title and does not render any DOM nodes itself", () => {
    const { container } = render(<Seo title="Page One" description="Desc one" path="/one" />);
    expect(container).toBeEmptyDOMElement();
    expect(document.title).toBe("Page One");
  });

  it("updates existing head tags in place rather than creating duplicates", () => {
    // Simulate the tags scripts/prerender.ts already injected into the
    // static HTML before React hydrates.
    const existing = document.createElement("meta");
    existing.setAttribute("name", "twitter:title");
    existing.setAttribute("content", "stale prerendered value");
    document.head.appendChild(existing);

    render(<Seo title="Fresh Title" description="Fresh description" path="/one" />);

    const tags = document.head.querySelectorAll('meta[name="twitter:title"]');
    expect(tags).toHaveLength(1);
    expect(tags[0].getAttribute("content")).toBe("Fresh Title");
  });

  it("re-renders (e.g. client-side route change) without accumulating duplicate tags", () => {
    const { rerender } = render(<Seo title="First" description="First desc" path="/first" />);
    rerender(<Seo title="Second" description="Second desc" path="/second" />);

    expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="twitter:description"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://www.indussolarsolutions.com/second"
    );
  });
});
