import { Link } from "react-router-dom";
import { blogArticles } from "../data/blog";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <>
      <Seo {...getSeo("/blog")} />
      <section className="bg-charcoal px-6 pb-10 pt-32 md:px-16 md:pb-14 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
            Solar Guides & Resources
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="font-display text-lg font-semibold text-ink">{article.h1}</div>
              <p className="mt-2 text-sm text-muted">{article.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
