import CountUp from "./CountUp";
import { impact } from "../data/site";
import SizedImage from "./SizedImage";

export default function ImpactStats() {
  return (
    <section className="relative z-40 flex items-center bg-cream px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl shadow-xl md:h-[85vh] md:grid-cols-5">
        <div className="relative min-h-[260px] md:col-span-3">
          <SizedImage
            src={impact.photo}
            alt="Solar panels installed by Indus Solar Solutions"
            loading="lazy"
            sizes="(min-width: 768px) 700px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center bg-cream-light p-8 md:col-span-2 md:p-12">
          <h2
            className="reveal [--rise-y:28px] font-display text-2xl font-bold text-ink md:text-3xl"
          >
            {impact.heading}
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
            {impact.stats.map((stat) => (
              <div
                className="reveal [--rise-y:28px]"
                key={stat.label}
              >
                <div className="font-display text-4xl font-extrabold text-ink md:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold text-ink">{stat.label}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
