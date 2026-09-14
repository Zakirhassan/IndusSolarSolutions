import SolarCalculator from "./SolarCalculator";

export default function HomeCalculator() {
  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
          What Could You Save With Solar?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">
          Enter your average monthly electricity bill for an indicative system size and savings estimate.
        </p>
      </div>
      <div className="mt-8">
        <SolarCalculator />
      </div>
    </section>
  );
}
