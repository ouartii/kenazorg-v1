// Pad naar een bestand in /public, werkt ook in de preview-build (base "./").
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, "");
