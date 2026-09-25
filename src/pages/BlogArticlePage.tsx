import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { blogAuthors, getBlogArticleBySlug, readingMinutes, type BlogBlock } from "../data/blog";
import { getSeo } from "../data/seo";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const linkClass = "font-medium text-accent-dark underline underline-offset-2 hover:text-ink";

// Renders [text](href) inline links: internal paths as router <Link>s,
// external URLs as new-tab anchors.
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} to={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} target="_blank" rel="noopener" className={linkClass}>
          {label}
        </a>
      )
    );
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-ink/85">
          <RichText text={block.text} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`mt-4 space-y-2 pl-5 text-base leading-relaxed text-ink/85 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div className="mt-5 overflow-x-auto rounded-xl border border-ink/10 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="px-3 pt-3 sm:px-4 text-left text-xs font-medium text-muted">{block.caption}</caption>
            <thead>
              <tr className="border-b border-ink/10">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="px-3 py-3 font-semibold text-ink sm:px-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-ink/5 last:border-0">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-3 py-2.5 font-medium text-ink sm:px-4">
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="px-3 py-2.5 text-ink/85 sm:px-4">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className="mt-5 rounded-xl border-l-4 border-accent-dark bg-white px-5 py-4 text-sm leading-relaxed text-ink/85">
          <RichText text={block.text} />
        </p>
      );
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;
  const author = blogAuthors[article.author];

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
          <h1 className="rise mt-4 font-display text-3xl font-bold text-white md:text-5xl">{article.h1}</h1>
          <p className="mt-4 text-sm text-white/70">
            By <span className="font-medium text-white">{author.name}</span>, {author.role}
          </p>
          <p className="mt-1 text-xs text-white/60">
            Updated <time dateTime={article.lastUpdated}>{formatDate(article.lastUpdated)}</time> ·{" "}
            {readingMinutes(article)} min read
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
        <article className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Short answer</div>
            <p className="mt-2 text-base leading-relaxed text-ink">{article.shortAnswer}</p>
          </div>

          {article.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}

          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Common questions</h2>
            <dl className="mt-4 divide-y divide-ink/10 rounded-2xl bg-white px-6 shadow-md">
              {article.faqs.map((faq) => (
                <div key={faq.question} className="py-4">
                  <dt className="font-semibold text-ink">{faq.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/85">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-lg font-bold text-ink">Sources</h2>
            <p className="mt-1 text-xs text-muted">
              Subsidy amounts and tariffs are set by the government and can change. Check the official portals
              before you decide.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <Link to="/blog" className="text-sm font-medium text-accent-dark hover:underline">
            ← All solar guides
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
