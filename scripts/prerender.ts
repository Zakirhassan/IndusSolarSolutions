import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppShell from "../src/AppShell";
import { SITE_URL, DEFAULT_IMAGE, allSeo, type SeoEntry } from "../src/data/seo";

const distDir = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error(`${templatePath} not found — run "vite build" before prerendering.`);
}

const template = fs.readFileSync(templatePath, "utf-8");

function absoluteImage(image: string | undefined) {
  const src = image ?? DEFAULT_IMAGE;
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

function schemaScriptTags(schema: SeoEntry["schema"]): string {
  if (!schema) return "";
  const list = Array.isArray(schema) ? schema : [schema];
  return list
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");
}

function injectHead(html: string, entry: SeoEntry) {
  const url = `${SITE_URL}${entry.path}`;
  const image = absoluteImage(entry.image);

  const withMeta = html
    .replace(/<title>.*?<\/title>/s, `<title>${entry.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${entry.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${entry.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${entry.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${entry.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${entry.description}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/s, `<meta name="twitter:image" content="${image}" />`);

  return withMeta.replace("</head>", `${schemaScriptTags(entry.schema)}\n  </head>`);
}

// The <Seo> component renders <title>/<meta>/<link> tags that React can only
// hoist into a real <head> in the browser. Rendered here (a fragment with no
// <head>), they serialize in place inside the body instead — strip them out
// since injectHead() below sets the authoritative versions in the template's
// actual <head>.
function stripLeakedHeadTags(html: string) {
  return html
    .replace(/<title>.*?<\/title>/gs, "")
    .replace(/<meta name="description"[^>]*\/?>/g, "")
    .replace(/<link rel="canonical"[^>]*\/?>/g, "")
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, "")
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, "")
    .replace(/<link rel="preload"[^>]*\/?>/g, "");
}

for (const entry of allSeo) {
  const rawAppHtml = renderToStaticMarkup(
    React.createElement(StaticRouter, { location: entry.path }, React.createElement(AppShell))
  );
  const appHtml = stripLeakedHeadTags(rawAppHtml);

  const html = injectHead(
    template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
    entry
  );

  const outDir = entry.path === "/" ? distDir : path.join(distDir, entry.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${entry.path}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allSeo
  .map(
    (entry) =>
      `  <url>\n    <loc>${SITE_URL}${entry.path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${entry.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
  )
  .join("\n")}\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log("sitemap.xml written");
