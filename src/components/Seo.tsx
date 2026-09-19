import { useEffect } from "react";

const SITE_URL = "https://www.indussolarsolutions.com";
const DEFAULT_IMAGE = "/images/hero/hero-2b-adlershof.jpg";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

// Updates the existing <head> tags in place instead of rendering new
// <title>/<meta>/<link> elements. Every route's tags already exist in the
// static HTML (written by scripts/prerender.ts) so that non-JS crawlers see
// correct values; if this component rendered its own copies, React 19's
// automatic head-tag hoisting would insert a second, duplicate set on
// hydration (this is what caused the "multiple twitter:title" /
// "multiple twitter:description" values flagged by the Sep 2026 SEO audit).
function upsertTag(tagName: "meta" | "link", matchAttr: string, matchValue: string, setAttr: string, setValue: string) {
  const selector = `${tagName}[${matchAttr}="${matchValue}"]`;
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(setAttr, setValue);
}

export default function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    document.title = title;
    upsertTag("meta", "name", "description", "content", description);
    upsertTag("link", "rel", "canonical", "href", url);
    upsertTag("meta", "property", "og:title", "content", title);
    upsertTag("meta", "property", "og:description", "content", description);
    upsertTag("meta", "property", "og:url", "content", url);
    upsertTag("meta", "property", "og:image", "content", imageUrl);
    upsertTag("meta", "name", "twitter:title", "content", title);
    upsertTag("meta", "name", "twitter:description", "content", description);
    upsertTag("meta", "name", "twitter:image", "content", imageUrl);
  }, [title, description, url, imageUrl]);

  return null;
}
