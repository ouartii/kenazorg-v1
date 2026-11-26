import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, Phone } from "lucide-react";
import { KLACHTEN, SITE, UITSLUITING } from "../content/site";
import { PRIVACY, PRIVACY_DATE } from "../content/privacy";
import { useSEO } from "../lib/seo";
import { asset } from "../lib/asset";
import { Breadcrumbs, Elephant, Eyebrow } from "../components/ui";

function TextPage({
  crumb,
  eyebrow,
  title,
  children,
}: {
  crumb: { name: string; path: string };
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-24 pt-8 sm:pt-12">
      <div className="wrap">
        <Breadcrumbs items={[crumb]} />
        <div className="grid gap-10 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="hyphens-auto text-display-md">{title}</h1>
              <Elephant className="mt-10 hidden w-40 opacity-90 lg:block" />
            </div>
          </header>
          <div className="text-[17px] leading-relaxed text-bark lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  useSEO({
    title: "Privacyverklaring | Kena Zorg",
    description:
      "Lees hoe Kena Zorg omgaat met persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang we ze bewaren, met wie we ze delen en welke rechten u heeft.",
    path: "/privacy-verklaring/",
    breadcrumb: [{ name: "Privacyverklaring", path: "/privacy-verklaring/" }],
  });
  return (
    <TextPage crumb={{ name: "Privacyverklaring", path: "/privacy-verklaring/" }} eyebrow={PRIVACY_DATE} title="Privacyverklaring">
      <div className="space-y-8">
        {PRIVACY.map((b, i) => (
          <div key={i}>
            {b.h && <h2 className="mb-3 font-display text-[28px] leading-tight text-espresso">{b.h}</h2>}
            {b.p?.map((t) => (
              <p key={t.slice(0, 24)} className="mb-3">
                {t}
              </p>
            ))}
            {b.ul && (
              <ul className="mb-3 space-y-2">
                {b.ul.map((t) => (
                  <li key={t.slice(0, 24)} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
            {b.pAfter?.map((t) => (
              <p key={t.slice(0, 24)} className="mb-3">
                {t}
              </p>
            ))}
          </div>
        ))}
      </div>
    </TextPage>
  );
}

export function Klachtenprocedure() {
  useSEO({
    title: "Klachtenprocedure | Kena Zorg",
    description:
      "Heeft u een klacht? Lees hoe Kena Zorg klachten behandelt: intern met een klachtenfunctionaris en extern via de onafhankelijke geschillencommissie Klachtenportaal Zorg.",
    path: "/klachtenprocedure/",
    breadcrumb: [{ name: "Klachtenprocedure", path: "/klachtenprocedure/" }],
  });
  return (
    <TextPage crumb={{ name: "Klachtenprocedure", path: "/klachtenprocedure/" }} eyebrow="Informatie" title="Klachtenprocedure">
      <div className="space-y-4">
        {KLACHTEN.intro.map((t) => (
          <p key={t.slice(0, 20)}>{t}</p>
        ))}
      </div>
      <img
        src={asset("images/klachtenportaal-zorg.webp")}
        width={600}
        height={72}
        alt="Klachtenportaal Zorg"
        loading="lazy"
        className="mt-8 h-auto w-64 rounded-xl bg-white p-4"
      />
      <ol className="mt-12 space-y-5">
        {KLACHTEN.steps.map((s, i) => (
          <li key={i} className="relative rounded-[2rem] bg-white p-7 shadow-[0_1px_2px_rgba(56,44,34,.06)] sm:p-9">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[44px] italic leading-none text-clay">{i + 1}</span>
              <h2 className="font-display text-[28px] leading-tight text-espresso">{s.role}</h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {s.items.map((t) => (
                <li key={t.slice(0, 24)} className="flex gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-clay-700" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </TextPage>
  );
}

export function Uitsluitingscriteria() {
  useSEO({
    title: "Uitsluitingscriteria | Kena Zorg",
    description:
      "Lees voor welke situaties Kena Zorg geen begeleiding of zorg kan bieden. Kena Zorg richt zich op meisjes en jonge vrouwen van 13 tot 23 jaar met een zorgindicatie.",
    path: "/uitsluitingscriteria/",
    breadcrumb: [{ name: "Uitsluitingscriteria", path: "/uitsluitingscriteria/" }],
  });
  return (
    <TextPage crumb={{ name: "Uitsluitingscriteria", path: "/uitsluitingscriteria/" }} eyebrow="Informatie" title="Uitsluitingscriteria Kena Zorg">
      <p className="text-[19px] font-semibold text-espresso">{UITSLUITING.intro}</p>
      <ul className="mt-6 divide-y divide-espresso/10 rounded-[2rem] bg-white px-7 shadow-[0_1px_2px_rgba(56,44,34,.06)]">
        {UITSLUITING.items.map((t, i) => (
          <li key={i} className="flex gap-4 py-5">
            <span className="font-display text-[26px] italic leading-none text-clay">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-4">
        {UITSLUITING.after.map((t) => (
          <p key={t.slice(0, 20)}>{t}</p>
        ))}
      </div>
    </TextPage>
  );
}

export function Bedankt() {
  const { state } = useLocation() as { state: { name?: string; form?: string } | null };
  useSEO({
    title: "Bedankt voor je bericht | Kena Zorg",
    description: "Je bericht is goed aangekomen bij Kena Zorg. We nemen zo snel mogelijk contact met je op.",
    path: "/bedankt/",
    noindex: true,
  });
  const first = state?.name?.split(" ")[0];
  const steps = [
    "Je ontvangt een bevestiging per e-mail.",
    "Een van onze medewerkers bekijkt je bericht.",
    "We nemen zo snel mogelijk contact met je op.",
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="wrap max-w-3xl text-center">
        <Elephant className="mx-auto w-40" />
        <h1 className="mt-8 text-display-lg">{first ? `Bedankt, ${first}!` : "Bedankt!"}</h1>
        <p className="mt-5 text-[19px] text-bark">Je bericht is goed bij ons aangekomen.</p>
        <ol className="mx-auto mt-10 max-w-md space-y-3 text-left">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(56,44,34,.06)]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso font-display text-[18px] text-cream">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-bark">Is het dringend? Bel ons direct.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href={SITE.phone.href} className="btn-primary">
            <Phone size={17} aria-hidden="true" /> {SITE.phone.display}
          </a>
          <Link to="/" className="btn-ghost">
            Terug naar home
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NotFound() {
  useSEO({
    title: "Pagina niet gevonden | Kena Zorg",
    description: "Deze pagina bestaat niet (meer). Ga terug naar de homepage van Kena Zorg of bekijk ons aanbod.",
    path: "/404",
    noindex: true,
  });
  return (
    <section className="py-20 sm:py-28">
      <div className="wrap max-w-3xl text-center">
        <Elephant className="mx-auto w-48" />
        <p className="mt-8 font-display text-[22px] italic text-clay-700">404</p>
        <h1 className="mt-2 text-display-lg">Deze pagina is de kudde kwijt</h1>
        <p className="mt-5 text-[19px] text-bark">De pagina die je zoekt bestaat niet (meer). Misschien helpt een van deze links.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Naar de homepage <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/aanbod/" className="btn-ghost">
            Ons aanbod
          </Link>
          <Link to="/contact/" className="btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
