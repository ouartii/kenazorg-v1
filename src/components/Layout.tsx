import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Mail, Menu, Phone, X, ClipboardList, MapPin, ArrowUpRight } from "lucide-react";
import { CERTIFICATIONS, FOOTER_LINKS, NAV, SITE } from "../content/site";
import { asset } from "../lib/asset";
import { gaEnabled, getConsent, setConsent, track, trackPageView } from "../lib/analytics";

function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={asset("images/kena-logo.webp")}
      width={720}
      height={321}
      alt="Kena Zorg"
      className={className}
      decoding="async"
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_1px_0_rgba(56,44,34,.08)] backdrop-blur" : "bg-cream"
      }`}
    >
      <a href="#inhoud" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream">
        Naar de inhoud
      </a>
      <div className="wrap flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Link to="/" aria-label="Kena Zorg – naar de homepage" className="shrink-0">
          <Logo className="h-11 w-auto lg:h-[52px]" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2.5 text-[16px] font-medium transition-colors hover:bg-linen ${
                      isActive ? "text-clay-700" : "text-espresso"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={SITE.phone.href}
            onClick={() => track("click_phone", { location: "header" })}
            className="flex items-center gap-2 text-[15px] font-semibold text-espresso hover:text-clay-700"
          >
            <Phone size={17} aria-hidden="true" />
            {SITE.phone.display}
          </a>
          <Link to="/aanmelden/" className="btn-primary">
            Aanmelden
          </Link>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="flex min-h-[48px] items-center gap-2 rounded-full px-3 text-[16px] font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          <span>{open ? "Sluiten" : "Menu"}</span>
        </button>
      </div>

      <div
        id="mobiel-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-cream px-5 pb-28 pt-4 lg:hidden"
      >
        <nav aria-label="Mobiel menu">
          <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
            {[{ label: "Home", to: "/" }, ...NAV, { label: "Aanmelden", to: "/aanmelden/" }].map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end
                  className={({ isActive }) =>
                    `flex min-h-[60px] items-center font-display text-[30px] ${isActive ? "text-clay-700" : "text-espresso"}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 space-y-3 text-[17px]">
          <a href={SITE.phone.href} className="flex items-center gap-3 font-semibold">
            <Phone size={18} aria-hidden="true" /> {SITE.phone.display}
          </a>
          <a href={SITE.mobile.href} className="flex items-center gap-3 font-semibold">
            <Phone size={18} aria-hidden="true" /> {SITE.mobile.display}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 font-semibold">
            <Mail size={18} aria-hidden="true" /> {SITE.email}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-linen pb-28 pt-16 lg:pb-10">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-14 w-auto" />
            <p className="mt-5 max-w-xs font-display text-[22px] italic leading-snug text-bark">
              Van kwetsbaarheid naar kracht.
            </p>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-[15px] font-bold text-espresso">Kena Zorg</h2>
            <address className="not-italic leading-relaxed text-bark">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </address>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="link mt-3 inline-flex items-center gap-1 text-[15px]">
              <MapPin size={15} aria-hidden="true" /> Route plannen
            </a>
          </div>
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-sans text-[15px] font-bold text-espresso">Contact</h2>
            <ul className="space-y-2 text-bark">
              <li>
                <a href={SITE.phone.href} onClick={() => track("click_phone", { location: "footer" })} className="hover:text-clay-700">
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={SITE.mobile.href} onClick={() => track("click_phone", { location: "footer_mobiel" })} className="hover:text-clay-700">
                  {SITE.mobile.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} onClick={() => track("click_email", { location: "footer" })} className="hover:text-clay-700">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-4 font-sans text-[15px] font-bold text-espresso">Informatie</h2>
            <ul className="space-y-2 text-bark">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-clay-700">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/aanmelden/" className="hover:text-clay-700">
                  Aanmelden
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-espresso/10 pt-10">
          <h2 className="mb-6 font-sans text-[15px] font-bold text-espresso">Certificering en keurmerken</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CERTIFICATIONS.map((c) => {
              const inner = (
                <img
                  src={asset(c.img)}
                  width={c.w}
                  height={c.h}
                  alt={c.name}
                  loading="lazy"
                  className={`w-auto max-w-full object-contain ${c.w / c.h > 3 ? "max-h-[56px]" : "max-h-[88px]"}`}
                />
              );
              const cls =
                "flex h-[124px] items-center justify-center rounded-2xl bg-white px-5 shadow-[0_1px_2px_rgba(56,44,34,.06)] transition-shadow";
              return (
                <li key={c.name}>
                  {c.href.startsWith("http") ? (
                    <a href={c.href} target="_blank" rel="noopener" className={`${cls} hover:shadow-soft`} title={c.name}>
                      {inner}
                    </a>
                  ) : c.href ? (
                    <Link to={c.href} className={`${cls} hover:shadow-soft`} title={c.name}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls} title={c.name}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-[14px] text-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kena Zorg. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <CookieSettingsButton />
            <a href="https://webtik.nl" target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-espresso">
              Website door WebTik <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-espresso/10 bg-cream/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <a
          href={SITE.phone.href}
          onClick={() => track("click_phone", { location: "sticky_bar" })}
          className="flex min-h-[48px] flex-col items-center justify-center rounded-2xl bg-linen text-[13px] font-semibold"
        >
          <Phone size={18} aria-hidden="true" />
          Bellen
        </a>
        <a
          href={`mailto:${SITE.email}`}
          onClick={() => track("click_email", { location: "sticky_bar" })}
          className="flex min-h-[48px] flex-col items-center justify-center rounded-2xl bg-linen text-[13px] font-semibold"
        >
          <Mail size={18} aria-hidden="true" />
          Mailen
        </a>
        <Link
          to="/aanmelden/"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-clay-700 text-[16px] font-semibold text-white"
        >
          <ClipboardList size={18} aria-hidden="true" />
          Aanmelden
        </Link>
      </div>
    </div>
  );
}

const OPEN_COOKIES = "kena:open-cookies";

function CookieSettingsButton() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(gaEnabled()), []);
  if (!show) return null;
  return (
    <button type="button" className="hover:text-espresso" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES))}>
      Cookie-instellingen
    </button>
  );
}

/** Alleen zichtbaar als er GA4 is ingesteld (tracking.config.json). */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (gaEnabled() && getConsent() === null) setOpen(true);
    const h = () => setOpen(true);
    window.addEventListener(OPEN_COOKIES, h);
    return () => window.removeEventListener(OPEN_COOKIES, h);
  }, []);
  if (!open) return null;
  const choose = (g: boolean) => {
    setConsent(g);
    setOpen(false);
    if (g) trackPageView();
  };
  return (
    <div role="dialog" aria-label="Cookiemelding" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-lg rounded-3xl bg-espresso p-6 text-cream shadow-soft lg:bottom-6">
      <p className="text-[15px] leading-relaxed">
        Mogen we anonieme statistieken bijhouden om de website te verbeteren? Lees meer in onze{" "}
        <Link to="/privacy-verklaring/" className="underline underline-offset-4">
          privacyverklaring
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn bg-cream text-espresso hover:bg-blush" onClick={() => choose(true)}>
          Akkoord
        </button>
        <button type="button" className="btn border border-cream/40 text-cream hover:border-cream" onClick={() => choose(false)}>
          Weigeren
        </button>
      </div>
    </div>
  );
}

/** Zachte fade-in van elementen met .reveal zodra ze in beeld komen. */
function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  useReveal();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    trackPageView();
  }, [pathname, hash]);

  // In de preview (HashRouter) mogen gewone #ankers de route niet overschrijven.
  useEffect(() => {
    if (!__PREVIEW__) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("#") && !href.startsWith("#/")) {
        e.preventDefault();
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Header />
      <main id="inhoud">{children}</main>
      <Footer />
      <MobileStickyBar />
      <CookieBanner />
    </>
  );
}
