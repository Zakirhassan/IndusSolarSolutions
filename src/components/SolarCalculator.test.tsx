import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SolarCalculator from "./SolarCalculator";

describe("SolarCalculator", () => {
  it("shows a recommended system size and savings after entering a monthly bill", () => {
    render(<SolarCalculator />);

    const input = screen.getByLabelText(/monthly electricity bill/i);
    fireEvent.change(input, { target: { value: "3000" } });

    expect(screen.getByText(/3\.5 ?kW/i)).toBeInTheDocument();
    expect(screen.getByText(/indicative/i)).toBeInTheDocument();
  });

  it("shows nothing calculated before any input", () => {
    render(<SolarCalculator />);
    expect(screen.queryByText(/recommended system size/i)).not.toBeInTheDocument();
  });
});
