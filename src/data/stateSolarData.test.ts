import { describe, it, expect } from "vitest";
import { stateSolarData, getStateSolarData } from "./stateSolarData";

describe("stateSolarData", () => {
  it("includes all 28 states and 8 union territories", () => {
    expect(stateSolarData.length).toBe(36);
  });

  it("has a plausible tariff and sun-hours range for every entry", () => {
    for (const entry of stateSolarData) {
      expect(entry.avgTariffPerUnit).toBeGreaterThan(0);
      expect(entry.avgTariffPerUnit).toBeLessThanOrEqual(15);
      expect(entry.avgSunHours).toBeGreaterThanOrEqual(3.5);
      expect(entry.avgSunHours).toBeLessThanOrEqual(6.5);
    }
  });

  it("includes Uttar Pradesh with a value consistent with the existing Kanpur-specific calculator", () => {
    const up = getStateSolarData("Uttar Pradesh");
    expect(up).toBeDefined();
    expect(up!.avgSunHours).toBeCloseTo(4.9, 1);
  });

  it("returns undefined for an unknown state", () => {
    expect(getStateSolarData("Narnia")).toBeUndefined();
  });
});
