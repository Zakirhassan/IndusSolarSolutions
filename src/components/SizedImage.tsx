import type { ImgHTMLAttributes } from "react";

// Real pixel dimensions of every non-hero photo/logo under public/images,
// so <img> tags can carry width/height (prevents layout shift, and was
// flagged as a Lighthouse/audit failure without them) without every data
// file (products, projects, testimonials, money pages...) needing to carry
// dimensions alongside each image path. Hero slider images are handled
// separately in src/data/site.ts since they're rendered via framer-motion's
// <motion.img>, not this component.
const DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/hero-solar-farm.webp": { width: 1600, height: 900 },
  "/images/impact-sunset.webp": { width: 1600, height: 1083 },
  "/images/offer/battery.webp": { width: 1200, height: 800 },
  "/images/offer/inverters.webp": { width: 1200, height: 900 },
  "/images/offer/kit.webp": { width: 1200, height: 1798 },
  "/images/offer/maintenance.webp": { width: 1200, height: 675 },
  "/images/offer/panels.webp": { width: 1200, height: 900 },
  "/images/offer/structure.webp": { width: 1200, height: 798 },
  "/images/products/battery-1.webp": { width: 1200, height: 800 },
  "/images/products/battery-2.webp": { width: 1200, height: 900 },
  "/images/products/bos-1.webp": { width: 1200, height: 800 },
  "/images/products/bos-2.webp": { width: 1200, height: 800 },
  "/images/products/drive-1.webp": { width: 1200, height: 900 },
  "/images/products/drive-2.webp": { width: 1200, height: 803 },
  "/images/products/inverter-1.webp": { width: 1200, height: 900 },
  "/images/products/inverter-2.webp": { width: 1200, height: 541 },
  "/images/products/kit-1.webp": { width: 1200, height: 1798 },
  "/images/products/kit-2.webp": { width: 1200, height: 800 },
  "/images/products/panels-1.webp": { width: 1200, height: 900 },
  "/images/products/panels-2.webp": { width: 1200, height: 900 },
  "/images/products/structure-1.webp": { width: 1200, height: 798 },
  "/images/products/structure-2.webp": { width: 1200, height: 800 },
  "/images/residential/residential-rooftop-india-1.webp": { width: 1600, height: 616 },
  "/images/residential/residential-rooftop-india-2.webp": { width: 1600, height: 636 },
  "/images/rooftop-installation.webp": { width: 1600, height: 1200 },
  "/images/services/consultation.webp": { width: 1600, height: 1065 },
  "/images/solar-farm-telangana.webp": { width: 1600, height: 900 },
  "/images/solar-lake-chandigarh.webp": { width: 1600, height: 1200 },
  "/images/technician-rooftop.webp": { width: 1600, height: 901 },
  "/images/why-choose/engineer.webp": { width: 1200, height: 800 },
  "/images/hero/hero-2b-adlershof.webp": { width: 1600, height: 1200 },
  "/images/hero/hero-4-array.webp": { width: 1600, height: 1200 },
  "/images/hero/hero-5-rooftop.webp": { width: 1600, height: 900 },
  "/images/testimonials/01.webp": { width: 1200, height: 800 },
  "/images/testimonials/02.webp": { width: 1200, height: 900 },
  "/images/testimonials/03.webp": { width: 1200, height: 675 },
  "/images/testimonials/04.webp": { width: 1200, height: 799 },
  "/images/testimonials/05.webp": { width: 1200, height: 672 },
  "/images/testimonials/06.webp": { width: 1200, height: 675 },
  "/images/testimonials/07.webp": { width: 1200, height: 675 },
  "/images/testimonials/08.webp": { width: 1200, height: 800 },
  "/images/testimonials/09.webp": { width: 1200, height: 800 },
  "/images/testimonials/10.webp": { width: 1200, height: 1622 },
  "/images/brands/jsw.svg": { width: 101, height: 48 },
  "/images/brands/sungrow.svg": { width: 219, height: 48 },
  "/images/brands/msme.svg": { width: 48, height: 48 },
};

type SizedImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

export default function SizedImage({ src, ...props }: SizedImageProps) {
  const dims = DIMENSIONS[src];
  return <img src={src} width={dims?.width} height={dims?.height} {...props} />;
}
