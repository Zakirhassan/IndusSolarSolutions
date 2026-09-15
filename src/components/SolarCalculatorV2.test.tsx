import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SolarCalculatorV2 from "./SolarCalculatorV2";

function fillStepOneMonthlyBill(billValue: string) {
  const input = screen.getByLabelText(/monthly electricity bill/i);
  fireEvent.change(input, { target: { value: billValue } });
}

function goToStepTwo() {
  fireEvent.click(screen.getByRole("button", { name: /^next$/i }));
}

function selectStateAndCategory(stateName: string) {
  fireEvent.change(screen.getByLabelText(/state \/ union territory/i), { target: { value: stateName } });
  fireEvent.change(screen.getByLabelText(/customer category/i), { target: { value: "residential" } });
}

describe("SolarCalculatorV2", () => {
  it("walks through all three steps and shows a savings report", () => {
    render(<SolarCalculatorV2 />);

    expect(screen.getByText(/how would you like to calculate/i)).toBeInTheDocument();
    fillStepOneMonthlyBill("3000");
    goToStepTwo();

    expect(screen.getByText(/your location & customer type/i)).toBeInTheDocument();
    selectStateAndCategory("Uttar Pradesh");
    goToStepTwo();

    expect(screen.getByText(/your electricity unit cost/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /calculate my solar savings/i }));

    expect(screen.getByText(/your solar savings report/i)).toBeInTheDocument();
    expect(screen.getByText(/recommended plant size/i)).toBeInTheDocument();
    expect(screen.getByText(/net investment/i)).toBeInTheDocument();
    expect(screen.getByText(/payback period/i)).toBeInTheDocument();
    expect(screen.getByText(/co2/i)).toBeInTheDocument();
  });

  it("shows the subsidy applicable question only for residential", () => {
    render(<SolarCalculatorV2 />);
    fillStepOneMonthlyBill("3000");
    goToStepTwo();
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
});
