import { Link } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { FAQ, HOME, HULPVRAGERS, SITE } from "../content/site";
import { ORGANIZATION, useSEO } from "../lib/seo";
import { asset } from "../lib/asset";
import { track } from "../lib/analytics";
import { Elephant, ElephantPhoto, Eyebrow, Img } from "../components/ui";
import { ArrowLink, CtaBand, Faq, faqJsonLd } from "../components/Sections";

export default function Home() {
  useSEO({
    title: "Jeugdzorg voor meiden in Amsterdam | Kena Zorg",
    description:
      "Kena Zorg begeleidt meiden en jonge vrouwen van 13 tot 23 jaar: ambulante hulp, crisisopvang en beschermd & begeleid wonen in Amsterdam. Meld direct aan.",
    path: "/",
    jsonLd: [
      { "@context": "https://schema.org", ...ORGANIZATION },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: `${SITE.url}/`,
        inLanguage: "nl-NL",
        publisher: { "@id": `${SITE.url}/#organisatie` },
      },
      faqJsonLd(FAQ),
    ],
  });
  const h = HOME.hero;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-6 sm:pt-10 lg:pb-24">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 hidden h-[78%] w-[46%] rounded-bl-[6rem] bg-blush lg:block"
        />
        <div className="wrap relative grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 lg:pr-6">
            <h1>
              <span className="eyebrow !mb-6 font-display">{h.eyebrow}</span>
              <span className="block text-display-xl text-espresso">
                {h.titleA} <span className="italic text-clay-700">{h.titleB}</span>
              </span>
            </h1>
            <p className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-bark">{h.lead}</p>
            <p className="mt-5 max-w-[46ch] text-[18px] text-bark">{h.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/aanmelden/" className="btn-primary">
                Aanmelden <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href={SITE.phone.href} onClick={() => track("click_phone", { location: "hero" })} className="btn-ghost">
                <Phone size={17} aria-hidden="true" /> {SITE.phone.display}
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2 text-[15px] text-taupe">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-clay-700" aria-hidden="true" />
              ISO 9001-gecertificeerd · aangesloten bij Klachtenportaal Zorg · erkend leerbedrijf SBB
            </p>
          </div>

          <div className="relative lg:col-span-6">
            <ElephantPhoto
              src={asset("images/rethaferguson-1400.webp")}
              label="Een groep jonge vrouwen samen op een bank, in de vorm van de Kena-olifant"
              className="relative z-[1] mx-auto w-full max-w-[620px] drop-shadow-[0_30px_40px_rgba(56,44,34,.18)]"
            />
            <div className="relative z-[2] mx-auto -mt-6 w-fit rounded-2xl bg-cream px-5 py-3 text-[15px] shadow-soft sm:absolute sm:bottom-6 sm:left-2 sm:mt-0 lg:-left-4">
              <span className="font-display text-[22px] italic text-clay-700">De kudde</span>
              <span className="block text-bark">Samen sta je altijd sterker.</span>
            </div>
          </div>
        </div>
      </section>

      {/* AANBOD */}
      <section aria-labelledby="aanbod-titel" className="py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Ons aanbod</Eyebrow>
              <h2 id="aanbod-titel" className="max-w-[18ch] text-display-lg">
                Hulp die past bij waar zij nu staat
              </h2>
            </div>
            <ArrowLink to="/aanbod/">Bekijk het volledige aanbod</ArrowLink>
          </div>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {HOME.services.map((s, i) => (
              <li key={s.id} className="reveal group" style={{ transitionDelay: `${i * 90}ms` }}>
                <Link to={`/aanbod/#${s.id}`} className="block">
                  <div className="overflow-hidden rounded-[2rem] rounded-tr-[6rem] bg-blush">
                    <Img
                      name={s.img}
                      alt={s.alt}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="aspect-[4/5] w-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-6 text-[32px] leading-tight text-espresso">{s.title}</h3>
                  <p className="mt-3 text-bark">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-clay-700">
                    Meer informatie
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MEIDENSPECIFIEK */}
      <section aria-labelledby="niche-titel" className="relative overflow-hidden bg-espresso text-cream">
        <Elephant color="#59473B" className="pointer-events-none absolute -right-24 -top-10 w-[560px] opacity-40" />
        <div className="wrap relative grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <Img
              name="omhelzing"
              alt="Twee meiden die elkaar lachend omhelzen"
              sizes="(min-width: 1024px) 460px, 100vw"
              className="shape-arch-l aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 lg:pl-10">
            <p className="eyebrow !text-sand before:!bg-sand">{HOME.niche.eyebrow}</p>
            <h2 id="niche-titel" className="text-display-lg text-cream">
              {HOME.niche.title}
            </h2>
            <div className="prose-kena mt-8 max-w-prose text-[18px] text-cream/85">
              {HOME.niche.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <Link to="/overons/" className="btn mt-9 bg-sand text-espresso hover:bg-blush">
              Meer over Kena Zorg <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* DE KUDDE */}
      <section aria-labelledby="kudde-titel" className="bg-linen py-20 lg:py-28">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{HOME.herd.eyebrow}</Eyebrow>
            <h2 id="kudde-titel" className="text-display-lg">
              {HOME.herd.title}
            </h2>
            <p className="mt-6 text-[18px] text-bark">{HOME.herd.body}</p>
          </div>
          <ul className="mt-16 grid items-end gap-10 sm:grid-cols-3">
            {HOME.herd.values.map((v, i) => (
              <li key={v.word} className="reveal text-center" style={{ transitionDelay: `${i * 120}ms` }}>
                <Elephant className={`mx-auto ${["w-24", "w-32", "w-44"][i]}`} />
                <h3 className="mt-5 text-[34px] text-espresso">{v.word}</h3>
                <p className="mx-auto mt-2 max-w-[26ch] text-bark">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VOOR WIE */}
      <section aria-labelledby="wie-titel" className="py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Hulpvragers</Eyebrow>
              <h2 id="wie-titel" className="text-display-lg">
                Wij staan naast jou
              </h2>
              <p className="mt-4 max-w-prose text-[18px] text-bark">
                Voor meiden zelf, voor hun ouders en voor de professionals om hen heen.
              </p>
            </div>
            <ArrowLink to="/voor-ouders/">Alles voor hulpvragers</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {HULPVRAGERS.groups.map((g, i) => (
              <li key={g.id}>
                <Link
                  to={`/voor-ouders/#${g.id}`}
                  className={`group flex h-full flex-col rounded-[2rem] p-8 transition-shadow hover:shadow-soft sm:p-10 ${
                    ["bg-white border border-espresso/10", "bg-blush", "bg-espresso text-cream"][i]
                  }`}
                >
                  <h3 className="text-[34px] leading-tight">{g.title}</h3>
                  <p className={`mt-4 flex-1 text-[17px] ${i === 2 ? "text-cream/80" : "text-bark"}`}>{g.teaser}</p>
                  <span className={`mt-8 inline-flex items-center gap-2 font-semibold ${i === 2 ? "text-sand" : "text-clay-700"}`}>
                    Lees verder
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-t border-espresso/10">
        <Faq items={FAQ} />
      </div>
      <CtaBand />
    </>
  );
}
