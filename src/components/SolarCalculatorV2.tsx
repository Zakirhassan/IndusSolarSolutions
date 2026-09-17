import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { business } from "../data/site";
import { products } from "../data/products";
import { stateSolarData, getStateSolarData } from "../data/stateSolarData";
import {
  type CustomerCategory,
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
} from "../lib/solarCalculatorV2";

type Method = "bill" | "units" | "roofArea";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function SolarCalculatorV2({ compact = false }: { compact?: boolean }) {
  const [method, setMethod] = useState<Method>("bill");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [monthlyUnits, setMonthlyUnits] = useState("");
  const [roofAreaSqFt, setRoofAreaSqFt] = useState("");
  const [roofUsablePercent, setRoofUsablePercent] = useState("70");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [category, setCategory] = useState<CustomerCategory>("residential");
  const [subsidyApplicable, setSubsidyApplicable] = useState(true);
  const [tariff, setTariff] = useState(7);
  const [tariffTouched, setTariffTouched] = useState(false);

  const selectedState = getStateSolarData(stateName) ?? stateSolarData[0];
  const effectiveTariff = tariffTouched ? tariff : selectedState.avgTariffPerUnit;

  const hasValidInput =
    (method === "bill" && Number(monthlyBill) > 0) ||
    (method === "units" && Number(monthlyUnits) > 0) ||
    (method === "roofArea" && Number(roofAreaSqFt) > 0);

  const results = useMemo(() => {
    const sunHours = selectedState.avgSunHours;
    let systemKw = 0;
    if (method === "roofArea") {
      systemKw = recommendedKwFromRoofArea(Number(roofAreaSqFt), Number(roofUsablePercent) || 70);
    } else if (method === "units") {
      systemKw = recommendedKwFromMonthlyUnits(Number(monthlyUnits), sunHours);
    } else {
      systemKw = recommendedKwFromMonthlyBill(Number(monthlyBill), effectiveTariff, sunHours);
    }

    const annualUnits = estimateAnnualGenerationUnitsForState(systemKw, sunHours);
    const monthlyUnitsGen = Math.round(annualUnits / 12);
    const lifetimeUnits = annualUnits * 30;

    const monthlySavings = Math.round(monthlyUnitsGen * effectiveTariff);
    const annualSavings = Math.round(annualUnits * effectiveTariff);
    const lifetimeSavings = annualSavings * 30;

    const systemCost = systemCostEstimate(systemKw, category);
    const subsidy = category === "residential" ? subsidyForResidential(systemKw, subsidyApplicable) : 0;
    const netInvestment = Math.max(systemCost - subsidy, 0);

    const payback = paybackYears(netInvestment, annualSavings);
    const roi = annualRoiPercent(netInvestment, annualSavings);

    const co2 = co2MitigatedKg(annualUnits, 30);
    const trees = treesEquivalent(co2);

    return {
      systemKw,
      sunHours,
      monthlyUnitsGen,
      annualUnits,
      lifetimeUnits,
      monthlySavings,
      annualSavings,
      lifetimeSavings,
      systemCost,
      subsidy,
      netInvestment,
      payback,
      roi,
      co2,
      trees,
    };
  }, [
    method,
    roofAreaSqFt,
    roofUsablePercent,
    monthlyUnits,
    monthlyBill,
    effectiveTariff,
    selectedState,
    category,
    subsidyApplicable,
  ]);

  const shareText = `My indicative solar savings report from Indus Solar Solutions:\n- Recommended system: ${results.systemKw}kW\n- Estimated annual savings: ${inr(results.annualSavings)}\n- Payback period: ${results.payback} years`;

  const shareWhatsApp = () => {
    window.open(`${business.whatsappUrl}?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      "My Solar Savings Report"
    )}&body=${encodeURIComponent(shareText)}`;
  };

  const downloadPdf = () => {
    window.print();
  };

  const resetAll = () => {
    setMethod("bill");
    setMonthlyBill("");
    setMonthlyUnits("");
    setRoofAreaSqFt("");
    setRoofUsablePercent("70");
    setStateName("Uttar Pradesh");
    setCategory("residential");
    setSubsidyApplicable(true);
    setTariffTouched(false);
  };

  return (
    <div className={`rounded-2xl bg-white p-6 shadow-lg md:p-8 ${compact ? "" : "mx-auto max-w-5xl"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-dark">
            <Sparkles size={14} /> Solar Savings Calculator
          </div>
          <h3 className="mt-1 font-display text-lg font-bold text-ink md:text-xl">
            {compact ? "Live Savings Calculator" : "What Could You Save With Solar?"}
          </h3>
          <p className="mt-1 text-xs text-muted md:text-sm">
            Fill in your details below — your savings report updates instantly as you go.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink hover:bg-cream"
        >
          Reset
        </button>
      </div>

      <div className={compact ? "mt-6 flex flex-col gap-6" : "mt-6 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start"}>
        {/* Inputs — all visible together, no wizard steps */}
        <div className="space-y-5">
          <div className="rounded-xl border border-ink/10 p-4">
            <h4 className="font-display text-sm font-semibold text-ink">How would you like to calculate?</h4>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["bill", "units", "roofArea"] as Method[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`rounded-xl border p-3 text-left text-xs font-medium transition ${
                    method === m ? "border-accent-dark bg-cream" : "border-ink/10"
                  }`}
                >
                  {m === "bill" ? "Monthly Bill" : m === "units" ? "Monthly Units" : "Roof Area"}
                </button>
              ))}
            </div>

            {method === "bill" && (
              <div className="mt-4">
                <label htmlFor="monthly-bill" className="block text-sm font-medium text-ink">
                  Your average monthly electricity bill (₹)
                </label>
                <input
                  id="monthly-bill"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="e.g. 3000"
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                />
              </div>
            )}

            {method === "units" && (
              <div className="mt-4">
                <label htmlFor="monthly-units" className="block text-sm font-medium text-ink">
                  Your monthly electricity consumption (kWh)
                </label>
                <input
                  id="monthly-units"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={monthlyUnits}
                  onChange={(e) => setMonthlyUnits(e.target.value)}
                  placeholder="e.g. 400"
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                />
              </div>
            )}

            {method === "roofArea" && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="roof-area" className="block text-sm font-medium text-ink">
                    Total rooftop area (sq ft)
                  </label>
                  <input
                    id="roof-area"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={roofAreaSqFt}
                    onChange={(e) => setRoofAreaSqFt(e.target.value)}
                    placeholder="e.g. 500"
                    className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                  />
                </div>
                <div>
                  <label htmlFor="roof-usable" className="block text-sm font-medium text-ink">
                    % of roof usable
                  </label>
                  <input
                    id="roof-usable"
                    type="number"
                    min={0}
                    max={100}
                    value={roofUsablePercent}
                    onChange={(e) => setRoofUsablePercent(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-ink/10 p-4">
            <h4 className="font-display text-sm font-semibold text-ink">Your Location & Customer Type</h4>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-ink">
                  State / Union Territory
                </label>
                <select
                  id="state"
                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                    setTariffTouched(false);
                  }}
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                >
                  {stateSolarData.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-ink">
                  Customer Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CustomerCategory)}
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
            </div>

            {category === "residential" && (
              <div className="mt-4">
                <label htmlFor="subsidy" className="block text-sm font-medium text-ink">
                  Subsidy Applicable?
                </label>
                <select
                  id="subsidy"
                  value={subsidyApplicable ? "yes" : "no"}
                  onChange={(e) => setSubsidyApplicable(e.target.value === "yes")}
                  className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
                >
                  <option value="yes">With Subsidy (DCR)</option>
                  <option value="no">Without Subsidy</option>
                </select>
                <p className="mt-1 text-xs text-muted">
                  PM Surya Ghar Muft Bijli Yojana subsidy applies to DCR panels for residential customers only.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-ink/10 p-4">
            <h4 className="font-display text-sm font-semibold text-ink">Your Electricity Unit Cost</h4>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-ink">₹{effectiveTariff.toFixed(2)}</span>
                <span className="text-xs text-muted">per kWh (unit)</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.25}
                value={effectiveTariff}
                onChange={(e) => {
                  setTariff(Number(e.target.value));
                  setTariffTouched(true);
                }}
                className="mt-2 w-full accent-accent-dark"
                aria-label="Electricity unit cost"
              />
              <p className="mt-2 text-xs text-muted">
                Auto-filled with {selectedState.name}'s average tariff of ₹{selectedState.avgTariffPerUnit}/kWh.
                Adjust if your actual rate differs.
              </p>
            </div>
          </div>
        </div>

        {/* Results — always visible, updates live with every input above */}
        <div className={compact ? "" : "lg:sticky lg:top-28"}>
          {!hasValidInput ? (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-ink/15 p-8 text-center">
              <Sparkles size={22} className="text-accent-dark" />
              <p className="mt-3 text-sm font-medium text-ink">Your savings report will appear here</p>
              <p className="mt-1 text-xs text-muted">
                Enter your monthly bill, units, or roof area on the left to see it update live.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink">Your Solar Savings Report</h3>
                <span className="text-xs text-muted">Updates live</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareEmail}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={downloadPdf}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium"
                >
                  Print / Save as PDF
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-charcoal p-5 text-white">
                <div className="text-xs uppercase tracking-widest text-white/60">Recommended Plant Size</div>
                <div className="mt-1 font-display text-3xl font-bold">{results.systemKw} kWp</div>
                <div className="mt-3 flex gap-6 text-xs text-white/70">
                  <span>Daily Generation: {(results.annualUnits / 365).toFixed(1)} kWh</span>
                  <span>Peak Sun Hours: {results.sunHours} hrs/day</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-cream p-4 text-center">
                  <div className="text-xs text-muted">Monthly</div>
                  <div className="font-display font-semibold text-ink">
                    {results.monthlyUnitsGen.toLocaleString("en-IN")} kWh
                  </div>
                </div>
                <div className="rounded-xl bg-cream p-4 text-center">
                  <div className="text-xs text-muted">Annual</div>
                  <div className="font-display font-semibold text-ink">
                    {results.annualUnits.toLocaleString("en-IN")} kWh
                  </div>
                </div>
                <div className="rounded-xl bg-cream p-4 text-center">
                  <div className="text-xs text-muted">30-Year</div>
                  <div className="font-display font-semibold text-ink">
                    {results.lifetimeUnits.toLocaleString("en-IN")} kWh
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-cream p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Electricity Bill Savings (at ₹{effectiveTariff.toFixed(2)}/kWh)
                </div>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-muted">Monthly</div>
                    <div className="font-display font-semibold text-ink">{inr(results.monthlySavings)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Annual</div>
                    <div className="font-display font-semibold text-ink">{inr(results.annualSavings)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted">30-Year</div>
                    <div className="font-display font-semibold text-ink">{inr(results.lifetimeSavings)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-cream p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted">
                  System Cost &amp; Subsidy
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">System Cost (indicative)</span>
                    <span className="font-medium text-ink">{inr(results.systemCost)}</span>
                  </div>
                  {results.subsidy > 0 && (
                    <div className="flex justify-between text-accent-dark">
                      <span>PM Surya Ghar Subsidy</span>
                      <span>-{inr(results.subsidy)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-ink/10 pt-2 font-semibold text-ink">
                    <span>Net Investment</span>
                    <span>{inr(results.netInvestment)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-cream p-4 text-center">
                  <div className="font-display text-xl font-bold text-ink">{results.payback} yrs</div>
                  <div className="text-xs text-muted">Payback Period</div>
                </div>
                <div className="rounded-xl bg-cream p-4 text-center">
                  <div className="font-display text-xl font-bold text-ink">{results.roi}%</div>
                  <div className="text-xs text-muted">Annual ROI</div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-cream p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted">Environmental Impact</div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="font-display font-semibold text-ink">{(results.co2 / 1000).toFixed(1)} T</div>
                    <div className="text-xs text-muted">CO2 Emissions Mitigated (30 yrs)</div>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-ink">{results.trees}</div>
                    <div className="text-xs text-muted">Trees Planted Equivalent</div>
                  </div>
                </div>
              </div>

              {products.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted">Explore Our Products</div>
                  <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
                    {products.slice(0, 4).map((p) => (
                      <a
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="w-32 shrink-0 rounded-lg border border-ink/10 p-2 text-xs font-medium text-ink hover:border-accent-dark"
                      >
                        {p.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs leading-relaxed text-muted">
                Indicative estimate based on typical sun-hours, tariffs, and installed costs for your state. Actual
                results depend on your roof, usage, and current scheme rules — book a free site survey for an exact
                quote.
              </p>

              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white transition hover:bg-ink"
              >
                Book a Free Site Survey
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
