import { describe, it, expect } from "vitest";
import { recommendedSystemKw, estimateAnnualGenerationUnits } from "./solarCalculator";
import {
  recommendedKwFromRoofArea,
  recommendedKwFromMonthlyUnits,
  recommendedKwFromMonthlyBill,
  estimateAnnualGenerationUnitsForState,
  subsidyForResidential,
  systemCostEstimate,
  paybackYears,
  annualRoiPercent,
  co2MitigatedKg,
  treesEquivalent,
} from "./solarCalculatorV2";

describe("recommendedKwFromRoofArea", () => {
  it("recommends 3.5kW for 500 sq ft at the default 70% usable", () => {
    expect(recommendedKwFromRoofArea(500)).toBe(3.5);
  });

  it("respects a custom usable percentage", () => {
    expect(recommendedKwFromRoofArea(1000, 50)).toBe(5);
  });
});

describe("recommendedKwFromMonthlyUnits / recommendedKwFromMonthlyBill", () => {
  it("matches the existing Kanpur-specific formula at 4.5 sun-hours", () => {
    expect(recommendedKwFromMonthlyUnits(500, 4.5)).toBe(recommendedSystemKw(500));
  });

  it("derives units from a bill before recommending kW", () => {
    expect(recommendedKwFromMonthlyBill(3000, 8, 4.5)).toBe(3.5);
  });
});

describe("estimateAnnualGenerationUnitsForState", () => {
  it("matches the existing Kanpur-specific formula at 4.5 sun-hours", () => {
    expect(estimateAnnualGenerationUnitsForState(3, 4.5)).toBe(estimateAnnualGenerationUnits(3));
  });
});

describe("subsidyForResidential", () => {
  it("gives ₹60,000 for a 2kW system", () => {
    expect(subsidyForResidential(2, true)).toBe(60000);
  });

  it("caps at ₹78,000 for a 3kW+ system", () => {
    expect(subsidyForResidential(3, true)).toBe(78000);
    expect(subsidyForResidential(5, true)).toBe(78000);
  });

  it("gives ₹45,000 for a 1.5kW system", () => {
    expect(subsidyForResidential(1.5, true)).toBe(45000);
  });

  it("gives 0 when not applicable", () => {
    expect(subsidyForResidential(3, false)).toBe(0);
  });
});

describe("systemCostEstimate", () => {
  it("estimates residential cost at ₹55,000/kW", () => {
    expect(systemCostEstimate(3, "residential")).toBe(165000);
  });

  it("estimates commercial cost at ₹48,000/kW", () => {
    expect(systemCostEstimate(10, "commercial")).toBe(480000);
  });
});

describe("paybackYears / annualRoiPercent", () => {
  it("computes a 4 year payback for ₹1,00,000 net cost and ₹25,000/yr savings", () => {
    expect(paybackYears(100000, 25000)).toBe(4);
  });

  it("computes 25% annual ROI for the same inputs", () => {
    expect(annualRoiPercent(100000, 25000)).toBe(25);
  });

  it("returns 0 when annual savings is 0", () => {
    expect(paybackYears(100000, 0)).toBe(0);
  });
});

describe("co2MitigatedKg / treesEquivalent", () => {
  it("estimates 24,600kg CO2 over 30 years for 1000 units/year generation", () => {
    expect(co2MitigatedKg(1000)).toBe(24600);
  });

  it("estimates ~39 trees for 24,600kg CO2", () => {
    expect(treesEquivalent(24600)).toBe(39);
  });
});
