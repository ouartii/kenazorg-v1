import { createContext, useContext, useEffect, type ReactNode } from "react";
import { SITE } from "../content/site";

export type SeoData = {
  title: string; // max. 60 tekens
  description: string; // 140–160 tekens
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object[];
  breadcrumb?: { name: string; path: string }[];
};

type Collector = { data?: SeoData };
const SeoContext = createContext<Collector | null>(null);

export function SeoProvider({ collector, children }: { collector: Collector; children: ReactNode }) {
  return <SeoContext.Provider value={collector}>{children}</SeoContext.Provider>;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const ORGANIZATION = {
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": `${SITE.url}/#organisatie`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/images/kena-logo.png`,
  image: `${SITE.url}/og-image.jpg`,
  telephone: "+31854013427",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: "NL",
  },
  areaServed: { "@type": "City", name: "Amsterdam" },
  audience: { "@type": "PeopleAudience", suggestedGender: "female", suggestedMinAge: 13, suggestedMaxAge: 23 },
};

export function headTags(d: SeoData): string {
  const url = SITE.url + d.path;
  const image = d.image ?? `${SITE.url}/og-image.jpg`;
  const ld: object[] = [...(d.jsonLd ?? [])];
  if (d.breadcrumb?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...d.breadcrumb].map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: SITE.url + b.path,
      })),
    });
  }
  return [
    `<title data-seo>${esc(d.title)}</title>`,
    `<meta data-seo name="description" content="${esc(d.description)}">`,
    `<meta data-seo name="robots" content="${d.noindex ? "noindex, follow" : "index, follow"}">`,
    `<link data-seo rel="canonical" href="${url}">`,
    `<meta data-seo property="og:type" content="website">`,
    `<meta data-seo property="og:locale" content="nl_NL">`,
    `<meta data-seo property="og:site_name" content="${SITE.name}">`,
    `<meta data-seo property="og:title" content="${esc(d.title)}">`,
    `<meta data-seo property="og:description" content="${esc(d.description)}">`,
    `<meta data-seo property="og:url" content="${url}">`,
    `<meta data-seo property="og:image" content="${image}">`,
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
    `<meta data-seo name="twitter:title" content="${esc(d.title)}">`,
    `<meta data-seo name="twitter:description" content="${esc(d.description)}">`,
    `<meta data-seo name="twitter:image" content="${image}">`,
    ...ld.map((o) => `<script data-seo type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
}

export function useSEO(d: SeoData) {
  const collector = useContext(SeoContext);
  if (collector) collector.data = d; // server-side: wordt opgehaald door prerender
  useEffect(() => {
    document.head.querySelectorAll("[data-seo]").forEach((n) => n.remove());
    const tpl = document.createElement("template");
    tpl.innerHTML = headTags(d);
    document.head.append(tpl.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d.path]);
}
