import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import EmailLink from "./EmailLink";

describe("EmailLink", () => {
  it("never puts the plain address in prerendered HTML", () => {
    const html = renderToString(<EmailLink />);
    expect(html).not.toContain("info@indussolarsolutions.com");
    expect(html).not.toContain("mailto:");
    expect(html).toContain("info [at] indussolarsolutions.com");
  });

  it("reveals a working mailto link once mounted in the browser", () => {
    const { getByRole } = render(<EmailLink />);
    const link = getByRole("link");
    expect(link.getAttribute("href")).toBe("mailto:info@indussolarsolutions.com");
    expect(link.textContent).toBe("info@indussolarsolutions.com");
  });
});
