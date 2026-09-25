import { process } from "../data/site";

export default function ProcessSteps() {
  return (
    <section
      id="process"
      className="relative z-30 flex flex-col justify-center bg-cream px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          className="reveal [--rise-y:28px] max-w-md font-display text-3xl font-bold text-ink md:text-5xl"
        >
          Simple Process.
          <br />
          Maximum Efficiency.
        </h2>
        <p
          className="reveal [--rise-y:28px] max-w-sm text-sm text-muted"
        >
          We make switching to solar easy with a clear, hassle-free process designed
          to save you time, money, and energy.
        </p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <div
            key={step.title}
            className={`reveal [--rise-y:40px] group flex min-h-[300px] flex-col justify-between rounded-2xl p-8 transition-colors duration-500 ease-in-out hover:bg-charcoal hover:text-white ${
              i % 2 === 0 ? "bg-cream-light text-ink" : "bg-charcoal-light text-white"
            }`}
          >
            <div>
              <h3 className="font-display text-xl font-semibold">{step.title}</h3>
              <p
                className={`mt-4 text-sm leading-relaxed transition-colors duration-500 ease-in-out group-hover:text-white/70 ${
                  i % 2 === 0 ? "text-muted" : "text-white/70"
                }`}
              >
                {step.body}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-current/20 px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
