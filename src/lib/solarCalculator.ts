// Indicative constants for Kanpur — used consistently across the calculator
// page, kW-size pages, and blog content so every estimate on the site agrees.
export const SUN_HOURS_KANPUR = 4.5;
export const SYSTEM_DERATE = 0.8;
export const DEFAULT_TARIFF_PER_UNIT = 8; // ₹/unit, indicative UP domestic mid-slab rate

export function recommendedSystemKw(monthlyUnits: number): number {
  const raw = monthlyUnits / (30 * SUN_HOURS_KANPUR * SYSTEM_DERATE);
  return Math.round(raw * 10) / 10;
}

export function estimateAnnualGenerationUnits(systemKw: number): number {
  return Math.round(systemKw * SUN_HOURS_KANPUR * 365 * SYSTEM_DERATE);
}

export function estimateMonthlyGenerationUnits(systemKw: number): number {
  return Math.round(estimateAnnualGenerationUnits(systemKw) / 12);
}

export function estimateAnnualSavings(
  systemKw: number,
  tariffPerUnit: number = DEFAULT_TARIFF_PER_UNIT
): number {
  return Math.round(estimateAnnualGenerationUnits(systemKw) * tariffPerUnit);
}

export function recommendedKwFromBill(
  monthlyBillRupees: number,
  tariffPerUnit: number = DEFAULT_TARIFF_PER_UNIT
): number {
  const monthlyUnits = monthlyBillRupees / tariffPerUnit;
  return recommendedSystemKw(monthlyUnits);
}
