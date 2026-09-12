import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { getProductBySlug } from "../data/products";
import { business } from "../data/site";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) return <Navigate to="/products" replace />;

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-charcoal px-6 pb-14 pt-36 md:px-16 md:pt-40">
        <img
          src={product.images[0]}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white"
          >
            <ArrowLeft size={14} /> All Products
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl"
          >
            {product.title}
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-white/75 md:text-base">
            {product.tagline}
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm leading-relaxed text-muted">{product.intro}</p>

            <ul className="mt-8 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-light/60 text-gold-dark">
                    <Check size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
            >
              Ask About {product.title}
            </a>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <img
              src={product.images[1]}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
