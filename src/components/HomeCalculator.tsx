import SolarCalculatorV2 from "./SolarCalculatorV2";

export default function HomeCalculator() {
  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          What Could You Save With Solar?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Calculate your recommended system size, savings, and payback period for your state.
        </p>
      </div>
      <div className="mt-8">
        <SolarCalculatorV2 compact />
      </div>
    </section>
  );
}
