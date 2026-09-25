import { whyChoose } from "../data/site";
import SizedImage from "./SizedImage";

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="relative z-10 flex flex-col justify-center bg-cream px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Who We Are
          </div>
          <h2
            className="reveal [--rise-y:24px] mt-3 font-display text-3xl font-bold text-ink md:text-5xl"
          >
            Why Choose Indus Solar Solutions in Kanpur?
          </h2>
          <p
            className="reveal [--rise-y:24px] mt-4 max-w-md text-sm text-muted"
          >
            There are many significant benefits to installing solar panels with a
            trusted solar company in Kanpur — financial and environmental, both.
          </p>
        </div>

        <div
          className="reveal reveal-scale relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
        >
          <SizedImage
            src="/images/why-choose/engineer.webp"
            alt="Indus Solar Solutions engineer at a solar installation"
            loading="lazy"
            sizes="(min-width: 768px) 560px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl border-t border-ink/10" />

      <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {whyChoose.map((item) => (
          <div
            className="reveal [--rise-y:24px]"
            key={item.title}
          >
            <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
