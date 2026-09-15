import { useState } from "react";
import { business } from "../data/site";
import {
  recommendedKwFromBill,
  estimateMonthlyGenerationUnits,
  estimateAnnualSavings,
} from "../lib/solarCalculator";

export default function SolarCalculator({ compact = false }: { compact?: boolean }) {
  const [bill, setBill] = useState("");
  const monthlyBill = Number(bill);
  const hasValidInput = monthlyBill > 0;

  const recommendedKw = hasValidInput ? recommendedKwFromBill(monthlyBill) : 0;
  const monthlyGeneration = hasValidInput ? estimateMonthlyGenerationUnits(recommendedKw) : 0;
  const annualSavings = hasValidInput ? estimateAnnualSavings(recommendedKw) : 0;

  return (
    <div className={`rounded-2xl bg-white p-6 shadow-lg md:p-8 ${compact ? "" : "mx-auto max-w-xl"}`}>
      <label htmlFor="monthly-bill" className="block text-sm font-medium text-ink">
        Your average monthly electricity bill (₹)
      </label>
      <input
        id="monthly-bill"
        type="number"
        min={0}
        inputMode="numeric"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        placeholder="e.g. 3000"
        className="mt-2 w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-accent-dark"
      />

      {hasValidInput && (
        <div className="mt-6 space-y-3 rounded-xl bg-cream p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Recommended system size</span>
            <span className="font-display font-semibold text-ink">{recommendedKw}kW</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Estimated monthly generation</span>
            <span className="font-display font-semibold text-ink">{monthlyGeneration} units</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Estimated annual savings</span>
            <span className="font-display font-semibold text-ink">₹{annualSavings.toLocaleString("en-IN")}</span>
          </div>
          <p className="pt-1 text-xs leading-relaxed text-muted">
            Indicative estimate based on typical Kanpur sun-hours and an average tariff. Actual results depend on
            your roof and usage — book a free site survey for an exact quote.
          </p>
        </div>
      )}

      <a
        href={business.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 block w-full rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-white transition hover:bg-ink"
      >
        Book a Free Site Survey
      </a>
    </div>
  );
}
