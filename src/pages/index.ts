import type { ComponentType } from "react";

type Loader = () => Promise<{ default: ComponentType }>;
const pick = <T extends Record<string, unknown>>(p: Promise<T>, k: keyof T) =>
  p.then((m) => ({ default: m[k] as ComponentType }));

// Alle pagina's behalve Home worden lazy geladen.
export const LOADERS: Record<string, Loader> = {
  Aanbod: () => import("./Aanbod"),
  OverOns: () => import("./OverOns"),
  Hulpvragers: () => import("./Hulpvragers"),
  Contact: () => pick(import("./FormPages"), "Contact"),
  Aanmelden: () => pick(import("./FormPages"), "Aanmelden"),
  Vooroverleg: () => pick(import("./FormPages"), "Vooroverleg"),
  Aanmeldformulier: () => pick(import("./FormPages"), "Aanmeldformulier"),
  Vacatures: () => pick(import("./FormPages"), "Vacatures"),
  Uitsluitingscriteria: () => pick(import("./InfoPages"), "Uitsluitingscriteria"),
  Klachtenprocedure: () => pick(import("./InfoPages"), "Klachtenprocedure"),
  Privacy: () => pick(import("./InfoPages"), "Privacy"),
  Bedankt: () => pick(import("./InfoPages"), "Bedankt"),
  NotFound: () => pick(import("./InfoPages"), "NotFound"),
};
