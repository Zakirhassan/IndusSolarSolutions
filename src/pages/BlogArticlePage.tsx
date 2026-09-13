import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogArticleBySlug } from "../data/blog";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo {...getSeo(`/blog/${article.slug}`)} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: article.h1, path: `/blog/${article.slug}` },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-3xl font-bold text-white md:text-5xl"
          >
            {article.h1}
          </motion.h1>
          <p className="mt-3 text-xs text-white/60">
            By {article.author} · Last updated {article.lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <article className="mx-auto max-w-3xl space-y-8">
          {article.sections.map((section, i) => (
            <div key={section.heading ?? i}>
              {section.heading && (
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <Link to="/blog" className="text-sm font-medium text-gold-dark hover:underline">
            ← Back to all guides
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
