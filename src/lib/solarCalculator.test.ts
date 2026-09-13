import { describe, it, expect } from "vitest";
import {
  recommendedSystemKw,
  estimateAnnualGenerationUnits,
  estimateMonthlyGenerationUnits,
  estimateAnnualSavings,
  recommendedKwFromBill,
} from "./solarCalculator";

describe("recommendedSystemKw", () => {
  it("recommends 4.6kW for 500 monthly units", () => {
    expect(recommendedSystemKw(500)).toBe(4.6);
  });

  it("recommends 2.8kW for 300 monthly units", () => {
    expect(recommendedSystemKw(300)).toBe(2.8);
  });
});

describe("estimateAnnualGenerationUnits", () => {
  it("estimates 3942 units/year for a 3kW system", () => {
    expect(estimateAnnualGenerationUnits(3)).toBe(3942);
  });

  it("estimates 1314 units/year for a 1kW system", () => {
    expect(estimateAnnualGenerationUnits(1)).toBe(1314);
  });
});

describe("estimateMonthlyGenerationUnits", () => {
  it("estimates 329 units/month for a 3kW system", () => {
    expect(estimateMonthlyGenerationUnits(3)).toBe(329);
  });

  it("estimates 1095 units/month for a 10kW system", () => {
    expect(estimateMonthlyGenerationUnits(10)).toBe(1095);
  });
});

describe("estimateAnnualSavings", () => {
  it("estimates ₹31,536 annual savings for a 3kW system at ₹8/unit", () => {
    expect(estimateAnnualSavings(3, 8)).toBe(31536);
  });

  it("uses the default tariff when none is passed", () => {
    expect(estimateAnnualSavings(3)).toBe(31536);
  });
});

describe("recommendedKwFromBill", () => {
  it("recommends 3.5kW for a ₹3,000 monthly bill at ₹8/unit", () => {
    expect(recommendedKwFromBill(3000, 8)).toBe(3.5);
  });
});
