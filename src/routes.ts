// Alle routes van de site. Bron voor de router, de prerender en sitemap.xml.
// De paden zijn gelijk aan die van de huidige kenazorg.nl, zodat bestaande links en Google-posities blijven werken.
export type RouteDef = { path: string; page: string; noindex?: boolean; priority?: number };

export const ROUTES: RouteDef[] = [
  { path: "/", page: "Home", priority: 1.0 },
  { path: "/aanbod/", page: "Aanbod", priority: 0.9 },
  { path: "/overons/", page: "OverOns", priority: 0.8 },
  { path: "/voor-ouders/", page: "Hulpvragers", priority: 0.8 },
  { path: "/contact/", page: "Contact", priority: 0.8 },
  { path: "/aanmelden/", page: "Aanmelden", priority: 0.9 },
  { path: "/aanmelden-vooroverleg/", page: "Vooroverleg", priority: 0.7 },
  { path: "/aanmeldformulier/", page: "Aanmeldformulier", priority: 0.7 },
  { path: "/vacatures/", page: "Vacatures", priority: 0.6 },
  { path: "/uitsluitingscriteria/", page: "Uitsluitingscriteria", priority: 0.5 },
  { path: "/klachtenprocedure/", page: "Klachtenprocedure", priority: 0.4 },
  { path: "/privacy-verklaring/", page: "Privacy", priority: 0.3 },
  { path: "/bedankt/", page: "Bedankt", noindex: true },
];
