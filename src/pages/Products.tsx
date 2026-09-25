import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data/products";
import Seo from "../components/Seo";
import SizedImage from "../components/SizedImage";
import { getSeo } from "../data/seo";
import Footer from "../components/Footer";

export default function Products() {
  return (
    <>
      <Seo {...getSeo("/products")} />
      <section className="relative overflow-hidden bg-charcoal px-6 pb-16 pt-36 md:px-16 md:pb-20 md:pt-40">
        <div className="absolute inset-0 flex">
          <div className="relative w-1/2">
            <SizedImage
              src="/images/offer/panels.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative w-1/2">
            <SizedImage
              src="/images/why-choose/engineer.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent-light">
            Our Products
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
            Everything you need for a complete solar system
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70">
            From panels to pumps, we supply and install every component of your
            solar system, backed by manufacturer warranties and local support.
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
          {products.map((p) => (
            <div
              className="reveal [--rise-y:30px]"
              key={p.slug}
            >
              <Link
                to={`/products/${p.slug}`}
                className="group relative block aspect-[16/11] overflow-hidden rounded-2xl shadow-md"
              >
                <SizedImage
                  src={p.images[0]}
                  alt={p.title}
                  sizes="(min-width: 1200px) 560px, (min-width: 640px) calc(50vw - 88px), calc(100vw - 48px)"
                  className="card-hover-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition group-hover:bg-accent-light">
                  <ArrowUpRight size={16} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-display text-lg font-semibold text-white md:text-xl">
                    {p.title}
                  </div>
                  <p className="mt-1 text-sm text-white/75">{p.tagline}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
