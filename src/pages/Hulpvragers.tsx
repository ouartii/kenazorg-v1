import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HULPVRAGERS } from "../content/site";
import { useSEO } from "../lib/seo";
import { BlockFrame, Breadcrumbs, Img } from "../components/ui";
import { CtaBand } from "../components/Sections";

export default function Hulpvragers() {
  useSEO({
    title: "Hulp voor meiden, ouders en verwijzers | Kena Zorg",
    description:
      "Voor jou, voor ouders en voor professionals: zo werkt Kena Zorg samen aan een veilige plek en passende begeleiding voor meiden en jonge vrouwen in Amsterdam.",
    path: "/voor-ouders/",
    breadcrumb: [{ name: "Hulpvragers", path: "/voor-ouders/" }],
  });

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-8 sm:pt-12 lg:pb-24">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Hulpvragers", path: "/voor-ouders/" }]} />
          <h1 className="eyebrow">Hulp voor meiden, ouders en professionals</h1>
          <figure className="max-w-5xl">
            <blockquote className="text-display-xl italic text-espresso">“{HULPVRAGERS.quote.text}”</blockquote>
            <figcaption className="mt-6 text-[17px] font-semibold text-taupe">— {HULPVRAGERS.quote.by}</figcaption>
          </figure>
          <nav aria-label="Kies wie je bent" className="mt-12">
            <ul className="flex flex-wrap gap-3">
              {HULPVRAGERS.groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="btn-ghost">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {HULPVRAGERS.groups.map((g, i) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`${g.id}-titel`}
          className={`py-20 lg:py-28 ${i === 1 ? "bg-linen" : ""}`}
        >
          <div className="wrap grid items-center gap-14 lg:grid-cols-12">
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
              <BlockFrame flip={i % 2 === 0}>
                <Img
                  name={g.img}
                  alt={g.alt}
                  eager={i === 0}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className={`${i % 2 ? "shape-arch" : "shape-arch-l"} aspect-[5/4] w-full object-cover`}
                />
              </BlockFrame>
            </div>
            <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
              <h2 id={`${g.id}-titel`} className="text-display-lg">
                {g.title}
              </h2>
              <div className="prose-kena mt-6 max-w-prose text-[18px] text-bark">
                {g.body.map((t) => (
                  <p key={t.slice(0, 20)}>{t}</p>
                ))}
              </div>
              {g.id === "professionals" && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/aanmelden-vooroverleg/" className="btn-primary">
                    Vooroverleg aanvragen
                  </Link>
                  <Link to="/aanmeldformulier/" className="btn-ghost">
                    Officiële aanmelding
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="pb-20 lg:pb-28">
        <div className="wrap">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-espresso p-8 text-cream sm:p-12 md:flex-row md:items-center">
            <p className="max-w-2xl font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug">{HULPVRAGERS.outro}</p>
            <Link to="/aanbod/" className="btn shrink-0 bg-sand text-espresso hover:bg-blush">
              Aanbod Kena Zorg <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
