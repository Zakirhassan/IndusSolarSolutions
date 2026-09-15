import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-color-theme");
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-color-theme");
  });

  it("defaults to the gold theme with no data attribute set", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute("data-color-theme")).toBeNull();
  });

  it("switches to blue on click and persists the choice", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /blue theme/i }));
    expect(document.documentElement.getAttribute("data-color-theme")).toBe("blue");
    expect(localStorage.getItem("isolar-color-theme")).toBe("blue");
  });

  it("switches back to gold on a second click", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /blue theme/i });
    fireEvent.click(button);
    fireEvent.click(screen.getByRole("button", { name: /gold theme/i }));
    expect(document.documentElement.getAttribute("data-color-theme")).toBeNull();
    expect(localStorage.getItem("isolar-color-theme")).toBe("gold");
  });
});
