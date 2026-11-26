import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { OVERONS, TEAM_QUOTES } from "../content/site";
import { useSEO } from "../lib/seo";
import { Elephant, Eyebrow, PageHero } from "../components/ui";
import { CtaBand } from "../components/Sections";

export function TeamQuotes({ cta = true }: { cta?: boolean }) {
  return (
    <section aria-labelledby="team-titel" className="bg-linen py-20 lg:py-28">
      <div className="wrap">
        <Eyebrow>Werken bij Kena</Eyebrow>
        <h2 id="team-titel" className="max-w-[20ch] text-display-lg">
          Wat onze mensen zeggen over Kena Zorg
        </h2>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {TEAM_QUOTES.map((q, i) => (
            <li key={q.who} className={`reveal rounded-[2rem] bg-cream p-8 sm:p-10 ${i % 2 ? "md:translate-y-10" : ""}`}>
              <figure>
                <Quote size={28} className="text-clay" aria-hidden="true" />
                <blockquote className="mt-4 text-[18px] leading-relaxed text-bark">{q.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-espresso font-display text-[18px] text-cream">
                    {q.who.replace(/\./g, "").slice(0, 2)}
                  </span>
                  <span className="font-semibold text-espresso">{q.who}</span>
                  <span className="text-taupe">· medewerker</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {cta && (
          <div className="mt-20">
            <Link to="/vacatures/" className="btn-dark">
              Werken bij Kena Zorg <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default function OverOns() {
  useSEO({
    title: "Over ons: kracht en een sterk vangnet | Kena Zorg",
    description:
      "Kena Zorg biedt meiden en jonge vrouwen een veilige plek om te groeien. Lees over onze visie, missie en waarom de olifant symbool staat voor wie wij zijn.",
    path: "/overons/",
    breadcrumb: [{ name: "Over ons", path: "/overons/" }],
  });

  return (
    <>
      <PageHero
        eyebrow={OVERONS.hero.eyebrow}
        title={OVERONS.hero.title}
        lead={OVERONS.hero.lead}
        crumbs={[{ name: "Over ons", path: "/overons/" }]}
        image={{ name: "handen-tafel", alt: "Handen van verschillende vrouwen die op elkaar rusten op een houten tafel" }}
      />

      <section aria-labelledby="olifant-titel" className="py-20 lg:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-[3rem] bg-blush" />
            <Elephant className="relative mx-auto w-[80%] max-w-[420px] py-10" />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow>Kena Zorg</Eyebrow>
            <h2 id="olifant-titel" className="text-display-lg">
              De kudde staat voor Kena
            </h2>
            <div className="prose-kena mt-6 max-w-prose text-[18px] text-bark">
              {OVERONS.metaphor.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="naam-titel" className="bg-espresso py-20 text-cream lg:py-28">
        <div className="wrap">
          <p className="eyebrow !text-sand before:!bg-sand">De betekenis van de naam</p>
          <h2 id="naam-titel" className="sr-only">
            De betekenis van de naam Kena
          </h2>
          <p className="max-w-2xl text-[19px] text-cream/80">{OVERONS.name.intro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <p className="rounded-[2rem] border border-cream/15 p-8 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight">
              {OVERONS.name.het}
            </p>
            <p className="rounded-[2rem] bg-sand p-8 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-espresso">
              {OVERONS.name.wij}
            </p>
          </div>
          <p className="mt-10 max-w-2xl text-[19px] text-cream/80">{OVERONS.name.outro}</p>
        </div>
      </section>

      <section aria-label="Visie en missie" className="py-20 lg:py-28">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {[
            ["Onze visie", OVERONS.visie],
            ["Onze missie", OVERONS.missie],
          ].map(([t, x], i) => (
            <article key={t} className={`rounded-[2rem] p-8 sm:p-12 ${i ? "bg-blush" : "bg-linen"}`}>
              <h2 className="text-display-md">{t}</h2>
              <p className="mt-5 text-[18px] leading-relaxed text-bark">{x}</p>
            </article>
          ))}
        </div>
      </section>

      <TeamQuotes />
      <CtaBand />
    </>
  );
}
