import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AANBOD, SITE } from "../content/site";
import { ORGANIZATION, useSEO } from "../lib/seo";
import { BlockFrame, Elephant, Eyebrow, Img, PageHero } from "../components/ui";
import { CtaBand } from "../components/Sections";

/** Signature op de aanbodpagina: het pad van fase 1 naar 3, met een olifant die meegroeit. */
function PhasePath() {
  const phases = AANBOD.wonen.phases;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + phases.length) % phases.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  const p = phases[active];

  return (
    <div className="mt-14">
      <div className="relative">
        <div aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-[calc(50%-1px)] hidden border-t-2 border-dashed border-clay/50 sm:block" />
        <div role="tablist" aria-label="Fases beschermd en begeleid wonen" className="relative grid grid-cols-3 gap-2 sm:gap-6">
          {phases.map((ph, i) => (
            <button
              key={ph.n}
              ref={(el) => (tabs.current[i] = el)}
              role="tab"
              id={`fase-tab-${ph.n}`}
              aria-selected={active === i}
              aria-controls="fase-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative flex flex-col items-center rounded-[1.75rem] px-2 py-5 text-center transition-colors sm:px-4 ${
                active === i ? "bg-espresso text-cream" : "bg-cream text-espresso hover:bg-blush/60"
              }`}
            >
              <span className="grid h-20 items-end sm:h-24">
                <Elephant
                  color={active === i ? "#CEA893" : undefined}
                  className={["w-12 sm:w-14", "w-16 sm:w-[4.5rem]", "w-20 sm:w-24"][i]}
                />
              </span>
              <span className={`mt-3 font-display text-[22px] italic ${active === i ? "text-sand" : "text-clay-700"}`}>
                Fase {ph.n}
              </span>
              <span className="mt-1 hidden text-[16px] font-semibold leading-tight sm:block">{ph.short}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="fase-panel"
        role="tabpanel"
        aria-labelledby={`fase-tab-${p.n}`}
        tabIndex={0}
        className="mt-6 grid gap-6 rounded-[2rem] bg-white p-6 shadow-soft sm:p-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <p className="font-display text-[22px] italic text-clay-700">Fase {p.n}</p>
          <h3 className="mt-1 text-[38px] leading-[1.05]">{p.title}</h3>
          <p className="mt-1 text-[18px] font-semibold text-bark">{p.sub}</p>
        </div>
        <p className="text-[18px] leading-relaxed text-bark lg:col-span-8">{p.text}</p>
      </div>
    </div>
  );
}

export default function Aanbod() {
  useSEO({
    title: "Ambulante hulp, crisisopvang & begeleid wonen | Kena Zorg",
    description:
      "Ambulante begeleiding thuis, crisisopvang en beschermd & begeleid wonen in drie fases voor meiden en jonge vrouwen in Amsterdam. Bekijk het aanbod van Kena Zorg.",
    path: "/aanbod/",
    breadcrumb: [{ name: "Aanbod", path: "/aanbod/" }],
    jsonLd: [
      ...[
        ["Ambulante begeleiding thuis", AANBOD.ambulant.body[0]],
        ["Crisisopvang", AANBOD.crisis.body[0]],
        ["Beschermd & begeleid wonen", AANBOD.wonen.intro],
      ].map(([name, description]) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: "Jeugdhulp",
        provider: { "@id": ORGANIZATION["@id"] },
        areaServed: ORGANIZATION.areaServed,
        audience: ORGANIZATION.audience,
        url: `${SITE.url}/aanbod/`,
      })),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow={AANBOD.hero.eyebrow}
        title={AANBOD.hero.title}
        lead={AANBOD.hero.lead}
        crumbs={[{ name: "Aanbod", path: "/aanbod/" }]}
        image={{ name: "rethaferguson", alt: "Een groep jonge vrouwen die samen ontspannen op een bank zitten" }}
      >
        <Link to="/aanmelden/" className="btn-primary">
          Aanmelden <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <a href="#beschermd-begeleid-wonen" className="btn-ghost">
          De drie woonfases
        </a>
      </PageHero>

      <nav aria-label="Op deze pagina" className="sticky top-[76px] z-20 border-y border-espresso/10 bg-cream/95 backdrop-blur lg:top-[88px]">
        <ul className="wrap flex gap-1 overflow-x-auto py-2 text-[15px] font-semibold">
          {[
            ["ambulante-hulp", "Ambulante hulp"],
            ["crisisopvang", "Crisisopvang"],
            ["beschermd-begeleid-wonen", "Beschermd & begeleid wonen"],
          ].map(([id, l]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="flex min-h-[44px] items-center rounded-full px-4 hover:bg-linen">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Ambulant */}
      <section id="ambulante-hulp" aria-labelledby="ambulant-titel" className="py-20 lg:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BlockFrame flip>
              <Img
                name="hand-vast"
                alt="Twee handen die elkaar vasthouden als teken van steun"
                sizes="(min-width: 1024px) 480px, 100vw"
                className="shape-arch-l aspect-[4/5] w-full object-cover"
              />
            </BlockFrame>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow>Thuis</Eyebrow>
            <h2 id="ambulant-titel" className="text-display-lg">
              {AANBOD.ambulant.title}
            </h2>
            <div className="prose-kena mt-6 max-w-prose text-[18px] text-bark">
              {AANBOD.ambulant.body.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
            <p className="mt-8 font-semibold">{AANBOD.ambulant.levelsIntro}</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {AANBOD.ambulant.levels.map((l) => (
                <li key={l} className="rounded-full border border-clay/50 bg-white px-5 py-2.5 font-display text-[22px] italic text-clay-800">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Crisis */}
      <section id="crisisopvang" aria-labelledby="crisis-titel" className="bg-linen py-20 lg:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:order-2 lg:col-span-5">
            <BlockFrame>
              <Img
                name="crisisopvang"
                alt="Jonge vrouw die rustig naar beneden kijkt"
                sizes="(min-width: 1024px) 480px, 100vw"
                className="shape-arch aspect-[4/5] w-full object-cover object-[center_20%]"
              />
            </BlockFrame>
          </div>
          <div className="lg:order-1 lg:col-span-7 lg:pr-8">
            <Eyebrow>Direct een veilige plek</Eyebrow>
            <h2 id="crisis-titel" className="text-display-lg">
              {AANBOD.crisis.title}
            </h2>
            <div className="prose-kena mt-6 max-w-prose text-[18px] text-bark">
              {AANBOD.crisis.body.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.phone.href} className="btn-dark">
                Bel {SITE.phone.display}
              </a>
              <Link to="/aanmelden/" className="btn-ghost">
                Aanmelden
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wonen */}
      <section id="beschermd-begeleid-wonen" aria-labelledby="wonen-titel" className="py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>In drie fases</Eyebrow>
              <h2 id="wonen-titel" className="text-display-lg">
                {AANBOD.wonen.title}
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-[18px] text-bark">{AANBOD.wonen.intro}</p>
            </div>
          </div>
          <div className="mt-14 rounded-[2.5rem] bg-blush/60 p-4 sm:p-10">
            <p className="max-w-3xl px-2 font-display sm:px-0 text-[clamp(1.5rem,2.4vw,2rem)] leading-snug text-espresso">
              {AANBOD.wonen.pathTitle}
            </p>
            <PhasePath />
          </div>
          <figure className="mx-auto mt-20 max-w-4xl text-center">
            <Img
              name="begeleid-wonen"
              alt="Twee jonge vrouwen omhelzen elkaar troostend"
              sizes="(min-width: 768px) 240px, 60vw"
              className="mx-auto aspect-square w-48 rounded-full object-cover"
            />
            <blockquote className="mt-8 font-display text-[clamp(1.6rem,3vw,2.5rem)] italic leading-snug text-espresso">
              {AANBOD.wonen.closing}
            </blockquote>
          </figure>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
