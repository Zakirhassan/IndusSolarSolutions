import { solutions } from "../data/site";
import SizedImage from "./SizedImage";

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative z-20 flex flex-col items-center justify-center overflow-hidden bg-charcoal px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-24"
    >
      <SizedImage
        src="/images/rooftop-installation.webp"
        alt="Solar power plant"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/60" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2
          className="reveal [--rise-y:28px] font-display text-3xl font-bold text-white md:text-5xl"
        >
          Our Solar Solutions in Kanpur
        </h2>
        <p
          className="reveal [--rise-y:28px] mt-3 text-sm text-white/75"
        >
          From homes to factories, we design and install the right residential,
          commercial or industrial solar system for your needs across Kanpur.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((item) => (
          <div
            key={item.title}
            className="reveal [--rise-y:40px] group flex min-h-[300px] flex-col justify-between rounded-2xl bg-cream-light/90 p-8 backdrop-blur-sm transition-colors duration-500 ease-in-out hover:bg-charcoal-light hover:text-white"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-500 ease-in-out group-hover:text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted transition-colors duration-500 ease-in-out group-hover:text-white/70">
                {item.body}
              </p>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-block w-fit rounded-full border border-ink/20 px-4 py-2 text-xs font-medium text-ink transition-colors duration-500 ease-in-out group-hover:border-white/40 group-hover:text-white"
            >
              Explore Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
