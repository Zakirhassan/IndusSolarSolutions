import { SYSTEM_DERATE } from "./solarCalculator";

// Roof-area sizing: standard industry rule of thumb of ~100 sq ft
// (~9.3 m²) of usable roof area per kW of installed capacity, indicative.
export const SQFT_PER_KW = 100;

// PM Surya Ghar Muft Bijli Yojana residential subsidy structure, matching
// the figures already published on /solar-subsidy-kanpur: ₹30,000/kW for
// the first 2kW, ₹18,000 for the 3rd kW, capped at ₹78,000 total.
export const RESIDENTIAL_SUBSIDY_PER_KW_FIRST_TWO = 30000;
export const RESIDENTIAL_SUBSIDY_THIRD_KW = 18000;
export const RESIDENTIAL_SUBSIDY_CAP = 78000;

export type CustomerCategory = "residential" | "commercial" | "industrial";

// Indicative installed cost per kW (DCR system, incl. installation),
// varying by category due to typical scale/equipment differences.
export const INSTALLED_COST_PER_KW: Record<CustomerCategory, number> = {
  residential: 55000,
  commercial: 48000,
  industrial: 42000,
};

// India grid emission factor baseline (CEA), indicative.
export const GRID_EMISSION_FACTOR_KG_PER_KWH = 0.82;

// Indicative: a mature tree absorbs roughly 21kg CO2/year, ~630kg over 30 years.
export const CO2_KG_PER_TREE_OVER_30_YEARS = 630;

export function recommendedKwFromRoofArea(roofAreaSqFt: number, usablePercent: number = 70): number {
  const usableSqFt = roofAreaSqFt * (usablePercent / 100);
  const raw = usableSqFt / SQFT_PER_KW;
  return Math.round(raw * 10) / 10;
}

export function recommendedKwFromMonthlyUnits(monthlyUnits: number, avgSunHours: number): number {
  const raw = monthlyUnits / (30 * avgSunHours * SYSTEM_DERATE);
  return Math.round(raw * 10) / 10;
}

export function recommendedKwFromMonthlyBill(
  monthlyBillRupees: number,
  tariffPerUnit: number,
  avgSunHours: number
): number {
  const monthlyUnits = monthlyBillRupees / tariffPerUnit;
  return recommendedKwFromMonthlyUnits(monthlyUnits, avgSunHours);
}

export function estimateAnnualGenerationUnitsForState(systemKw: number, avgSunHours: number): number {
  return Math.round(systemKw * avgSunHours * 365 * SYSTEM_DERATE);
}

export function subsidyForResidential(systemKw: number, applicable: boolean): number {
  if (!applicable || systemKw <= 0) return 0;
  const firstTwoKw = Math.min(systemKw, 2);
  const thirdKwPortion = systemKw > 2 ? Math.min(systemKw - 2, 1) : 0;
  const subsidy =
    firstTwoKw * RESIDENTIAL_SUBSIDY_PER_KW_FIRST_TWO + thirdKwPortion * RESIDENTIAL_SUBSIDY_THIRD_KW;
  return Math.min(Math.round(subsidy), RESIDENTIAL_SUBSIDY_CAP);
}

export function systemCostEstimate(systemKw: number, category: CustomerCategory): number {
  return Math.round(systemKw * INSTALLED_COST_PER_KW[category]);
}

export function paybackYears(netInvestment: number, annualSavings: number): number {
  if (annualSavings <= 0) return 0;
  return Math.round((netInvestment / annualSavings) * 10) / 10;
}

export function annualRoiPercent(netInvestment: number, annualSavings: number): number {
  if (netInvestment <= 0) return 0;
  return Math.round((annualSavings / netInvestment) * 1000) / 10;
}

export function co2MitigatedKg(annualGenerationUnits: number, years: number = 30): number {
  return Math.round(annualGenerationUnits * years * GRID_EMISSION_FACTOR_KG_PER_KWH);
}

export function treesEquivalent(totalCo2Kg: number): number {
  return Math.round(totalCo2Kg / CO2_KG_PER_TREE_OVER_30_YEARS);
}
