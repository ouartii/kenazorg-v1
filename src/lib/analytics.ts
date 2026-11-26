// GA4 via gtag (alleen geladen als tracking.config.json een meet-ID bevat, en pas na toestemming actief).
const clean = (url: string) => {
  try {
    const u = new URL(url);
    ["token", "session_id", "sid"].forEach((k) => u.searchParams.delete(k));
    return u.toString();
  } catch {
    return url;
  }
};

export const gaEnabled = () => typeof window !== "undefined" && !!window.__GA_ID && typeof window.gtag === "function";

export function track(event: string, params: Record<string, unknown> = {}) {
  if (!gaEnabled()) return;
  window.gtag!("event", event, params);
}

export function trackPageView() {
  if (!gaEnabled()) return;
  window.gtag!("event", "page_view", { page_location: clean(window.location.href), page_title: document.title });
}

export function setConsent(granted: boolean) {
  try {
    localStorage.setItem("kena-consent", granted ? "granted" : "denied");
  } catch {
    /* opslag niet beschikbaar */
  }
  if (gaEnabled()) window.gtag!("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
}

export function getConsent(): "granted" | "denied" | null {
  try {
    return (localStorage.getItem("kena-consent") as "granted" | "denied" | null) ?? null;
  } catch {
    return null;
  }
}
