import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText, MapPin, Mail, Phone, Smartphone, Users } from "lucide-react";
import { SITE, VACATURES } from "../content/site";
import { AANMELD_FORM, CONTACT_FORM, SOLLICITATIE_FORM, VOOROVERLEG_FORM } from "../content/forms";
import { ORGANIZATION, useSEO } from "../lib/seo";
import { asset } from "../lib/asset";
import { track } from "../lib/analytics";
import { Breadcrumbs, Elephant, Eyebrow } from "../components/ui";
import { DynamicForm } from "../components/Form";
import { TeamQuotes } from "./OverOns";

function FormShell({
  crumbs,
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-24 pt-8 sm:pt-12">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="text-display-lg">{title}</h1>
              {lead && <div className="mt-6 text-[18px] text-bark">{lead}</div>}
              {aside}
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard() {
  return (
    <ul className="mt-8 space-y-4 text-[17px]">
      <li className="flex gap-3">
        <MapPin className="mt-1 shrink-0 text-clay-700" size={19} aria-hidden="true" />
        <span>
          <strong className="block">Kena Zorg</strong>
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
          <br />
          <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="link text-[15px]">
            Route plannen
          </a>
        </span>
      </li>
      <li className="flex gap-3">
        <Phone className="mt-1 shrink-0 text-clay-700" size={19} aria-hidden="true" />
        <a href={SITE.phone.href} onClick={() => track("click_phone", { location: "contact" })} className="font-semibold hover:text-clay-700">
          {SITE.phone.display}
        </a>
      </li>
      <li className="flex gap-3">
        <Smartphone className="mt-1 shrink-0 text-clay-700" size={19} aria-hidden="true" />
        <a href={SITE.mobile.href} onClick={() => track("click_phone", { location: "contact_mobiel" })} className="font-semibold hover:text-clay-700">
          {SITE.mobile.display}
        </a>
      </li>
      <li className="flex gap-3">
        <Mail className="mt-1 shrink-0 text-clay-700" size={19} aria-hidden="true" />
        <a href={`mailto:${SITE.email}`} onClick={() => track("click_email", { location: "contact" })} className="font-semibold hover:text-clay-700">
          {SITE.email}
        </a>
      </li>
    </ul>
  );
}

export function Contact() {
  useSEO({
    title: "Contact | Kena Zorg Amsterdam",
    description:
      "Heb je een vraag? Neem contact op met Kena Zorg aan de Derkinderenstraat 110A in Amsterdam. Bel 085-4013427, mail info@kenazorg.nl of stuur een bericht.",
    path: "/contact/",
    breadcrumb: [{ name: "Contact", path: "/contact/" }],
    jsonLd: [{ "@context": "https://schema.org", "@type": "ContactPage", about: { "@id": ORGANIZATION["@id"] } }],
  });
  return (
    <FormShell
      crumbs={[{ name: "Contact", path: "/contact/" }]}
      eyebrow="Heb je een vraag?"
      title="Neem contact op"
      lead="Onze ervaren hulpverleners zijn gespecialiseerd in het begeleiden van moeilijke thuissituaties. Bel, mail of stuur ons een bericht."
      aside={<ContactCard />}
    >
      <h2 className="mb-6 font-display text-[32px]">Stuur ons een bericht</h2>
      <DynamicForm def={CONTACT_FORM} />
    </FormShell>
  );
}

export function Aanmelden() {
  useSEO({
    title: "Aanmelden bij Kena Zorg | Vooroverleg of aanmelding",
    description:
      "Wil je een jeugdige aanmelden bij Kena Zorg? Vraag een vooroverleg aan of doe direct een officiële aanmelding via het online formulier of de pdf.",
    path: "/aanmelden/",
    breadcrumb: [{ name: "Aanmelden", path: "/aanmelden/" }],
  });
  const options = [
    {
      to: "/aanmelden-vooroverleg/",
      icon: Users,
      title: "Aanmelden vooroverleg",
      text: "Eerst samen kijken of Kena Zorg passend is? Laat je gegevens achter, dan plannen we een vooroverleg.",
      cta: "Vooroverleg aanvragen",
      dark: false,
    },
    {
      to: "/aanmeldformulier/",
      icon: FileText,
      title: "Officiële aanmelding",
      text: "Direct aanmelden met het volledige aanmeldformulier, online of als pdf.",
      cta: "Naar het aanmeldformulier",
      dark: true,
    },
  ];
  return (
    <section className="relative overflow-hidden pb-24 pt-8 sm:pt-12">
      <Elephant color="#E7D4C8" className="pointer-events-none absolute -right-20 top-10 hidden w-[520px] lg:block" />
      <div className="wrap relative">
        <Breadcrumbs items={[{ name: "Aanmelden", path: "/aanmelden/" }]} />
        <Eyebrow>Aanmelden</Eyebrow>
        <h1 className="max-w-[16ch] text-display-lg">Aanmelden bij Kena Zorg</h1>
        <p className="mt-6 max-w-prose text-[19px] text-bark">
          Wil jij je aanmelden bij Kena Zorg? Hieronder vind je de optie om je aan te melden voor een vooroverleg of een officiële
          aanmelding.
        </p>
        <ul className="mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {options.map((o) => (
            <li key={o.to}>
              <Link
                to={o.to}
                className={`group flex h-full flex-col rounded-[2rem] p-8 transition-shadow hover:shadow-soft sm:p-10 ${
                  o.dark ? "bg-espresso text-cream" : "border border-espresso/10 bg-white"
                }`}
              >
                <o.icon size={30} className={o.dark ? "text-sand" : "text-clay-700"} aria-hidden="true" />
                <h2 className="mt-6 text-[34px] leading-tight">{o.title}</h2>
                <p className={`mt-3 flex-1 ${o.dark ? "text-cream/80" : "text-bark"}`}>{o.text}</p>
                <span className={`mt-8 inline-flex items-center gap-2 font-semibold ${o.dark ? "text-sand" : "text-clay-700"}`}>
                  {o.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-4xl rounded-[2rem] bg-linen p-8 text-bark">
          <p>
            <strong className="text-espresso">Goed om te weten:</strong> Kena Zorg richt zich op meisjes en jonge vrouwen van{" "}
            {SITE.ageRange} en kan alleen zorg verlenen op basis van een geldige zorgindicatie. Lees ook onze{" "}
            <Link to="/uitsluitingscriteria/" className="link">
              uitsluitingscriteria
            </Link>
            . Vragen? Bel{" "}
            <a href={SITE.phone.href} className="link">
              {SITE.phone.display}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export function Vooroverleg() {
  useSEO({
    title: "Aanmelden voor een vooroverleg | Kena Zorg",
    description:
      "Vraag een vooroverleg aan bij Kena Zorg. Vul je naam, functie en organisatie in, dan nemen we contact op om samen te kijken of onze begeleiding passend is.",
    path: "/aanmelden-vooroverleg/",
    breadcrumb: [
      { name: "Aanmelden", path: "/aanmelden/" },
      { name: "Vooroverleg", path: "/aanmelden-vooroverleg/" },
    ],
  });
  return (
    <FormShell
      crumbs={[
        { name: "Aanmelden", path: "/aanmelden/" },
        { name: "Vooroverleg", path: "/aanmelden-vooroverleg/" },
      ]}
      eyebrow="Aanmelden"
      title="Aanmelden vooroverleg"
      lead="Laat je gegevens achter. We nemen contact met je op om een vooroverleg in te plannen."
      aside={
        <p className="mt-8 text-bark">
          Liever direct aanmelden?{" "}
          <Link to="/aanmeldformulier/" className="link">
            Officiële aanmelding
          </Link>
        </p>
      }
    >
      <DynamicForm def={VOOROVERLEG_FORM} />
    </FormShell>
  );
}

export function Aanmeldformulier() {
  useSEO({
    title: "Officiële aanmelding | Aanmeldformulier Kena Zorg",
    description:
      "Meld een jeugdige officieel aan bij Kena Zorg. Vul het aanmeldformulier online in met bijlagen, of download het aanmeldformulier als pdf.",
    path: "/aanmeldformulier/",
    breadcrumb: [
      { name: "Aanmelden", path: "/aanmelden/" },
      { name: "Officiële aanmelding", path: "/aanmeldformulier/" },
    ],
  });
  return (
    <FormShell
      crumbs={[
        { name: "Aanmelden", path: "/aanmelden/" },
        { name: "Officiële aanmelding", path: "/aanmeldformulier/" },
      ]}
      eyebrow="Aanmelden"
      title="Officiële aanmelding"
      lead="Om je aan te melden bij Kena Zorg kun je het onderstaande formulier invullen of het formulier hier downloaden."
      aside={
        <div className="mt-8 space-y-6">
          <a href={asset(SITE.aanmeldPdf)} className="btn-dark" download>
            <Download size={18} aria-hidden="true" /> Aanmeldformulier downloaden (pdf)
          </a>
          <p className="text-[15px] text-taupe">
            Kena Zorg kan alleen zorg verlenen op basis van een geldige zorgindicatie. Bekijk vooraf de{" "}
            <Link to="/uitsluitingscriteria/" className="link">
              uitsluitingscriteria
            </Link>
            .
          </p>
        </div>
      }
    >
      <DynamicForm def={AANMELD_FORM} consent />
    </FormShell>
  );
}

export function Vacatures() {
  useSEO({
    title: "Werken bij Kena Zorg | Vacatures jeugdzorg Amsterdam",
    description:
      "Op zoek naar een nieuwe uitdaging in de jeugdzorg? Kena Zorg is altijd op zoek naar nieuw talent. Laat je gegevens en cv achter, dan nemen wij contact op.",
    path: "/vacatures/",
    breadcrumb: [{ name: "Werken bij ons", path: "/vacatures/" }],
  });
  return (
    <>
      <FormShell
        crumbs={[{ name: "Werken bij ons", path: "/vacatures/" }]}
        eyebrow="Werken bij ons"
        title={VACATURES.title}
        lead={VACATURES.lead}
      >
        <DynamicForm def={SOLLICITATIE_FORM} consent />
      </FormShell>
      <TeamQuotes cta={false} />
    </>
  );
}
