// Schrijft elke route als echte HTML weg (dist/<route>/index.html), plus 404.html, sitemap.xml en robots.txt.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const SITE = "https://kenazorg.nl";

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const { render, ROUTES: routes } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);

const page = (url, extraHead = "") => {
  const { html, head } = render(url);
  return template.replace("<!--head-->", head + extraHead).replace("<!--app-->", html);
};

for (const r of routes) {
  const extra =
    r.path === "/"
      ? '\n    <link rel="preload" as="image" href="/images/rethaferguson-1400.webp" type="image/webp">'
      : "";
  const out = r.path === "/" ? resolve(dist, "index.html") : resolve(dist, "." + r.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(r.path, extra));
  console.log("prerender", r.path);
}
writeFileSync(resolve(dist, "404.html"), page("/deze-pagina-bestaat-niet/"));

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><priority>${(r.priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join("\n");
writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  resolve(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /bedankt/\n\nSitemap: ${SITE}/sitemap.xml\n`,
);
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
console.log("sitemap.xml, robots.txt en 404.html geschreven");
