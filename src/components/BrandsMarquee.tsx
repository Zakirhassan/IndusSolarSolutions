import { brands } from "../data/site";
import SizedImage from "./SizedImage";

export default function BrandsMarquee() {
  const items = [...brands, ...brands, ...brands];

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-white/95 py-7 backdrop-blur-sm md:py-9">
      <div className="flex w-max animate-marquee items-center gap-16 md:gap-20">
        {items.map((brand, i) =>
          brand.logo ? (
            <SizedImage
              key={`${brand.name}-${i}`}
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="h-9 w-auto shrink-0 whitespace-nowrap opacity-80 md:h-12"
            />
          ) : (
            <span
              key={`${brand.name}-${i}`}
              className="whitespace-nowrap font-display text-lg font-semibold text-ink/70 md:text-2xl"
            >
              {brand.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
