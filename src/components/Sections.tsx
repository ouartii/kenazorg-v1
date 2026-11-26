import { Link } from "react-router-dom";
import { Mail, Phone, Plus, ArrowRight } from "lucide-react";
import { HOME, SITE } from "../content/site";
import { CONTACT_FORM } from "../content/forms";
import { asset } from "../lib/asset";
import { track } from "../lib/analytics";
import { DynamicForm } from "./Form";
import { Eyebrow } from "./ui";

/** Afsluitende contactsectie met formulier, op elke pagina. */
export function CtaBand({ title = HOME.contactCta.title, text = HOME.contactCta.text }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-titel" className="relative bg-blush">
      <img
        src={asset("images/illustraties.webp")}
        width={1920}
        height={504}
        alt=""
        loading="lazy"
        className="block h-auto w-full"
      />
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>{HOME.contactCta.eyebrow}</Eyebrow>
          <h2 id="cta-titel" className="text-display-md text-espresso">
            {title}
          </h2>
          <p className="mt-5 text-[19px] text-bark">{text}</p>
          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={SITE.phone.href}
                onClick={() => track("click_phone", { location: "cta" })}
                className="group flex items-center gap-4 rounded-2xl bg-cream/70 px-5 py-4 transition-colors hover:bg-cream"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-espresso text-cream">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[14px] text-taupe">Bel ons</span>
                  <span className="text-[19px] font-semibold">{SITE.phone.display}</span>
                  <span className="text-taupe"> · {SITE.mobile.display}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                onClick={() => track("click_email", { location: "cta" })}
                className="group flex items-center gap-4 rounded-2xl bg-cream/70 px-5 py-4 transition-colors hover:bg-cream"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-espresso text-cream">
                  <Mail size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[14px] text-taupe">Mail ons</span>
                  <span className="text-[19px] font-semibold">{SITE.email}</span>
                </span>
              </a>
            </li>
          </ul>
          <p className="mt-8 text-bark">
            Wil je iemand aanmelden?{" "}
            <Link to="/aanmelden/" className="link">
              Ga naar aanmelden
            </Link>
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-[2rem] bg-cream p-6 shadow-soft sm:p-10">
            <h3 className="mb-6 font-display text-[30px] leading-tight">Stuur ons een bericht</h3>
            <DynamicForm def={CONTACT_FORM} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, title = "Veelgestelde vragen" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq-titel" className="py-20 lg:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Goed om te weten</Eyebrow>
          <h2 id="faq-titel" className="text-display-md">
            {title}
          </h2>
          <p className="mt-4 text-bark">
            Staat je vraag er niet tussen?{" "}
            <Link to="/contact/" className="link">
              Neem contact op
            </Link>
            .
          </p>
        </div>
        <div className="divide-y divide-espresso/10 border-y border-espresso/10 lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold text-espresso [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linen transition-transform duration-300 group-open:rotate-45">
                  <Plus size={18} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-prose pb-5 pr-12 text-bark">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArrowLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 font-semibold text-clay-700">
      <span className="underline decoration-clay/40 underline-offset-4 group-hover:decoration-clay-700">{children}</span>
      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
