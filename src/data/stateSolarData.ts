// Indicative average residential electricity tariff (₹/unit) and average
// peak sun-hours/day per state/UT, used to auto-fill the solar calculator.
// These are approximate, publicly-known ranges — always adjustable by the
// user in the calculator, and not a substitute for an actual DISCOM bill
// or site survey.
export type StateSolarData = {
  name: string;
  avgTariffPerUnit: number;
  avgSunHours: number;
};

export const stateSolarData: StateSolarData[] = [
  { name: "Andhra Pradesh", avgTariffPerUnit: 7, avgSunHours: 5.4 },
  { name: "Arunachal Pradesh", avgTariffPerUnit: 5, avgSunHours: 4.2 },
  { name: "Assam", avgTariffPerUnit: 7, avgSunHours: 4.3 },
  { name: "Bihar", avgTariffPerUnit: 7, avgSunHours: 4.8 },
  { name: "Chhattisgarh", avgTariffPerUnit: 6, avgSunHours: 5.2 },
  { name: "Goa", avgTariffPerUnit: 4, avgSunHours: 5.3 },
  { name: "Gujarat", avgTariffPerUnit: 7, avgSunHours: 5.7 },
  { name: "Haryana", avgTariffPerUnit: 7, avgSunHours: 5.2 },
  { name: "Himachal Pradesh", avgTariffPerUnit: 5, avgSunHours: 5.0 },
  { name: "Jharkhand", avgTariffPerUnit: 7, avgSunHours: 5.0 },
  { name: "Karnataka", avgTariffPerUnit: 8, avgSunHours: 5.3 },
  { name: "Kerala", avgTariffPerUnit: 7, avgSunHours: 5.0 },
  { name: "Madhya Pradesh", avgTariffPerUnit: 7, avgSunHours: 5.5 },
  { name: "Maharashtra", avgTariffPerUnit: 9, avgSunHours: 5.4 },
  { name: "Manipur", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Meghalaya", avgTariffPerUnit: 6, avgSunHours: 4.2 },
  { name: "Mizoram", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Nagaland", avgTariffPerUnit: 6, avgSunHours: 4.2 },
  { name: "Odisha", avgTariffPerUnit: 6, avgSunHours: 5.0 },
  { name: "Punjab", avgTariffPerUnit: 6, avgSunHours: 5.1 },
  { name: "Rajasthan", avgTariffPerUnit: 7, avgSunHours: 5.8 },
  { name: "Sikkim", avgTariffPerUnit: 6, avgSunHours: 4.3 },
  { name: "Tamil Nadu", avgTariffPerUnit: 7, avgSunHours: 5.4 },
  { name: "Telangana", avgTariffPerUnit: 8, avgSunHours: 5.3 },
  { name: "Tripura", avgTariffPerUnit: 7, avgSunHours: 4.4 },
  { name: "Uttar Pradesh", avgTariffPerUnit: 7, avgSunHours: 4.9 },
  { name: "Uttarakhand", avgTariffPerUnit: 6, avgSunHours: 4.9 },
  { name: "West Bengal", avgTariffPerUnit: 8, avgSunHours: 4.6 },
  { name: "Andaman and Nicobar Islands", avgTariffPerUnit: 5, avgSunHours: 5.0 },
  { name: "Chandigarh", avgTariffPerUnit: 4, avgSunHours: 5.1 },
  { name: "Dadra and Nagar Haveli and Daman and Diu", avgTariffPerUnit: 3, avgSunHours: 5.5 },
  { name: "Delhi", avgTariffPerUnit: 6, avgSunHours: 5.3 },
  { name: "Jammu and Kashmir", avgTariffPerUnit: 5, avgSunHours: 4.5 },
  { name: "Ladakh", avgTariffPerUnit: 5, avgSunHours: 5.6 },
  { name: "Lakshadweep", avgTariffPerUnit: 4, avgSunHours: 5.2 },
  { name: "Puducherry", avgTariffPerUnit: 4, avgSunHours: 5.4 },
];

export function getStateSolarData(name: string): StateSolarData | undefined {
  return stateSolarData.find((s) => s.name === name);
}
