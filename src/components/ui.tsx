import { useId, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { asset } from "../lib/asset";
import { IMAGES } from "../lib/images";
import { ELEPHANT_BODY, ELEPHANT_EAR, ELEPHANT_TUSK } from "../lib/elephant";

/** Responsieve WebP-afbeelding uit /public/images. */
export function Img({
  name,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const meta = IMAGES[name];
  const srcSet = meta.sizes.map((s) => `${asset(`images/${name}-${s}.webp`)} ${Math.min(s, meta.w)}w`).join(", ");
  return (
    <img
      src={asset(`images/${name}-800.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      {...(eager ? { fetchpriority: "high" } : {})}
      className={className}
    />
  );
}

/** Logo-verloop van de olifant, herbruikbaar in SVG's. */
function LogoGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="61.65" x2="0" y2="340.11" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#bb8c6f" />
      <stop offset=".33" stopColor="#c9a18b" />
      <stop offset=".5" stopColor="#cea893" />
      <stop offset=".69" stopColor="#c19d89" />
      <stop offset=".83" stopColor="#9a7d6c" />
      <stop offset=".95" stopColor="#59473b" />
      <stop offset="1" stopColor="#382c22" />
    </linearGradient>
  );
}

/** Signature: een foto in de vorm van de Kena-olifant. */
export function ElephantPhoto({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="70 55 340 292" role="img" aria-label={label} className={className}>
      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={ELEPHANT_BODY} />
        </clipPath>
        <LogoGradient id={`grad-${uid}`} />
        <linearGradient id={`fade-${uid}`} x1="0" y1="200" x2="0" y2="345" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#382c22" stopOpacity="0" />
          <stop offset="1" stopColor="#382c22" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <path d={ELEPHANT_BODY} fill={`url(#grad-${uid})`} />
      <image
        href={src}
        x="76"
        y="61"
        width="328"
        height="280"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#clip-${uid})`}
      />
      <path d={ELEPHANT_BODY} fill={`url(#fade-${uid})`} />
      <path d={ELEPHANT_TUSK} fill={`url(#grad-${uid})`} />
      <path d={ELEPHANT_EAR} fill={`url(#grad-${uid})`} />
    </svg>
  );
}

/** Massieve olifant in het logoverloop (of in een effen kleur). */
export function Elephant({ className = "", color }: { className?: string; color?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="70 55 340 292" aria-hidden="true" className={className}>
      {!color && (
        <defs>
          <LogoGradient id={`eg-${uid}`} />
        </defs>
      )}
      <path d={ELEPHANT_BODY} fill={color ?? `url(#eg-${uid})`} />
      <path d={ELEPHANT_TUSK} fill={color ?? `url(#eg-${uid})`} />
      <path d={ELEPHANT_EAR} fill={color ?? `url(#eg-${uid})`} />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-6 text-[14px] text-taupe">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="hover:text-espresso">
            Home
          </Link>
        </li>
        {items.map((b, i) => (
          <li key={b.path} className="flex items-center gap-1">
            <ChevronRight size={14} aria-hidden="true" />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-espresso">
                {b.name}
              </span>
            ) : (
              <Link to={b.path} className="hover:text-espresso">
                {b.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Fotokader met de overlappende blush/rose-vlakken uit de huidige huisstijl. */
export function BlockFrame({
  children,
  flip = false,
  className = "",
}: {
  children: ReactNode;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute -top-4 sm:-top-6 h-[70%] w-[62%] rounded-[2rem] bg-blush ${flip ? "-left-3 sm:-left-6" : "-right-3 sm:-right-6"}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -bottom-4 sm:-bottom-6 h-[45%] w-[40%] rounded-[1.5rem] bg-rose/70 ${flip ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5"}`}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Kop voor subpagina's. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: { name: string; path: string }[];
  image?: { name: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pt-12 lg:pb-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className={image ? "lg:col-span-6" : "lg:col-span-9"}>
          <Breadcrumbs items={crumbs} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-display-lg text-espresso">{title}</h1>
          {lead && <p className="mt-6 max-w-prose text-[19px] leading-relaxed text-bark">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-6 lg:pl-8">
            <BlockFrame>
              <Img
                name={image.name}
                alt={image.alt}
                eager
                sizes="(min-width: 1024px) 560px, 100vw"
                className="shape-arch aspect-[5/4] w-full object-cover shadow-soft"
              />
            </BlockFrame>
          </div>
        )}
      </div>
    </section>
  );
}
