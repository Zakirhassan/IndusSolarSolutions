import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { offerItems } from "../data/site";
import SizedImage from "./SizedImage";

export default function WhatWeOffer() {
  return (
    <section className="relative z-[5] flex flex-col justify-center bg-cream-light px-6 py-14 md:sticky md:top-0 md:min-h-screen md:px-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted">
          What We Offer
        </div>
        <h2
          className="reveal [--rise-y:24px] mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-ink md:text-5xl"
        >
          Customized Solar Panel Installation Solutions in Kanpur
        </h2>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2">
        {offerItems.map((item) => (
          <div
            className="reveal [--rise-y:30px]"
            key={item.title}
          >
            <Link
              to={item.href}
              className="group relative block aspect-[16/11] overflow-hidden rounded-2xl shadow-md"
            >
              <SizedImage
                src={item.image}
                alt={item.title}
                loading="lazy"
                sizes="(min-width: 1200px) 560px, (min-width: 640px) calc(50vw - 88px), calc(100vw - 48px)"
                className="card-hover-img absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition group-hover:bg-accent-light">
                <ArrowUpRight size={16} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display text-lg font-semibold text-white md:text-xl">
                  {item.title}
                </div>
                <p className="mt-1 text-sm text-white/75">{item.body}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
