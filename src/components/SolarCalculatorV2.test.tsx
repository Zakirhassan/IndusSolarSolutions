import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SolarCalculatorV2 from "./SolarCalculatorV2";

describe("SolarCalculatorV2", () => {
  it("shows a placeholder until valid input is given, then a live-updating report — no wizard steps", () => {
    render(<SolarCalculatorV2 />);

    // All sections are visible together — no "Next" buttons, no step gating.
    expect(screen.getByText(/how would you like to calculate/i)).toBeInTheDocument();
    expect(screen.getByText(/your location & customer type/i)).toBeInTheDocument();
    expect(screen.getByText(/your electricity unit cost/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^next$/i })).not.toBeInTheDocument();

    expect(screen.getByText(/savings report will appear here/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/monthly electricity bill/i), { target: { value: "3000" } });

    expect(screen.getByText(/your solar savings report/i)).toBeInTheDocument();
    expect(screen.getByText(/recommended plant size/i)).toBeInTheDocument();
    expect(screen.getByText(/net investment/i)).toBeInTheDocument();
    expect(screen.getByText(/payback period/i)).toBeInTheDocument();
    expect(screen.getByText(/co2/i)).toBeInTheDocument();
  });

  it("updates the report live as inputs change, without any submit action", () => {
    render(<SolarCalculatorV2 />);

    fireEvent.change(screen.getByLabelText(/monthly electricity bill/i), { target: { value: "3000" } });
    const firstReport = screen.getByText(/kwp/i).textContent;

    fireEvent.change(screen.getByLabelText(/monthly electricity bill/i), { target: { value: "9000" } });
    const secondReport = screen.getByText(/kwp/i).textContent;

    expect(secondReport).not.toBe(firstReport);
  });

  it("shows the subsidy applicable question only for residential", () => {
    render(<SolarCalculatorV2 />);
    fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "commercial" } });
    expect(screen.queryByLabelText(/subsidy applicable/i)).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "residential" } });
    expect(screen.getByLabelText(/subsidy applicable/i)).toBeInTheDocument();
  });

  it("switches to the roof-area input method", () => {
    render(<SolarCalculatorV2 />);
    fireEvent.click(screen.getByRole("button", { name: /roof area/i }));
    expect(screen.getByLabelText(/total rooftop area/i)).toBeInTheDocument();
  });

  it("auto-fills the tariff from the selected state and lets the user override it", () => {
    render(<SolarCalculatorV2 />);
    fireEvent.change(screen.getByLabelText(/monthly electricity bill/i), { target: { value: "3000" } });

    fireEvent.change(screen.getByLabelText(/state \/ union territory/i), { target: { value: "Maharashtra" } });
    expect(screen.getAllByText(/₹9\.00/).length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText(/electricity unit cost/i), { target: { value: "12" } });
    expect(screen.getAllByText(/₹12\.00/).length).toBeGreaterThan(0);
  });

  it("resets every field back to defaults", () => {
    render(<SolarCalculatorV2 />);
    fireEvent.change(screen.getByLabelText(/monthly electricity bill/i), { target: { value: "3000" } });
    expect(screen.getByText(/your solar savings report/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^reset$/i }));
    expect(screen.getByText(/savings report will appear here/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly electricity bill/i)).toHaveValue(null);
  });
});
