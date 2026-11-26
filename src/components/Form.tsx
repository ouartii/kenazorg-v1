import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Paperclip, Phone, Mail, Send } from "lucide-react";
import type { Field, FormDef } from "../content/forms";
import { SITE } from "../content/site";
import { sendForm } from "../lib/sendForm";
import { track } from "../lib/analytics";

const MAX_FILE = 8 * 1024 * 1024;
const MAX_TOTAL = 20 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";

type Errors = Record<string, string>;

function FieldView({ f, error, formId }: { f: Field; error?: string; formId: string }) {
  const id = `${formId}-${f.name}`;
  const describedBy = [error ? `${id}-err` : "", "hint" in f && f.hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;
  const err = error ? (
    <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-[14px] font-medium text-[#9B2C1F]">
      <AlertCircle size={15} aria-hidden="true" /> {error}
    </p>
  ) : null;
  const hint = "hint" in f && f.hint ? (
    <p id={`${id}-hint`} className="mt-1.5 text-[14px] text-taupe">
      {f.hint}
    </p>
  ) : null;
  const req = "required" in f && f.required;
  const label = (
    <>
      {f.label}
      {req ? <span className="text-clay-700"> *</span> : null}
    </>
  );

  if (f.kind === "checks" || f.kind === "radio") {
    return (
      <fieldset className="sm:col-span-2" aria-describedby={describedBy}>
        <legend className="label">{label}</legend>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          {f.options.map((o, i) => (
            <label
              key={o}
              className="flex min-h-[48px] cursor-pointer items-start gap-3 rounded-2xl border border-espresso/15 bg-white px-4 py-3 text-[15px] leading-snug transition-colors has-[:checked]:border-clay-700 has-[:checked]:bg-blush/50"
            >
              <input
                type={f.kind === "checks" ? "checkbox" : "radio"}
                name={f.kind === "checks" ? `${f.name}[]` : f.name}
                value={o}
                id={`${id}-${i}`}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#8A5D44]"
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  if (f.kind === "files") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <div className="relative flex min-h-[64px] items-center gap-3 rounded-2xl border border-dashed border-espresso/30 bg-white px-4 py-3">
          <Paperclip size={18} className="shrink-0 text-clay-700" aria-hidden="true" />
          <input
            id={id}
            name={`${f.name}[]`}
            type="file"
            accept={ACCEPT}
            multiple={f.max > 1}
            data-max={f.max}
            aria-describedby={describedBy}
            className="w-full text-[15px] file:mr-4 file:rounded-full file:border-0 file:bg-linen file:px-4 file:py-2 file:font-semibold file:text-espresso hover:file:bg-blush"
          />
        </div>
        {hint}
        {err}
      </div>
    );
  }

  const common = {
    id,
    name: f.name,
    required: req || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `field ${error ? "border-[#9B2C1F]" : ""}`,
  };

  return (
    <div className={f.kind !== "textarea" && f.half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {f.kind === "textarea" ? (
        <textarea {...common} rows={f.rows ?? 4} maxLength={5000} />
      ) : (
        <input {...common} type={f.kind} autoComplete={f.autoComplete} maxLength={200} />
      )}
      {hint}
      {err}
    </div>
  );
}

export function DynamicForm({ def, consent = false, compact = false }: { def: FormDef; consent?: boolean; compact?: boolean }) {
  const ref = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  const validate = (form: HTMLFormElement): Errors => {
    const e: Errors = {};
    const fd = new FormData(form);
    let total = 0;
    for (const s of def.sections)
      for (const f of s.fields) {
        if (f.kind === "files") {
          const input = form.querySelector<HTMLInputElement>(`input[name="${f.name}[]"]`);
          const files = Array.from(input?.files ?? []);
          if (files.length > f.max) e[f.name] = `Kies maximaal ${f.max} bestand${f.max > 1 ? "en" : ""}.`;
          for (const file of files) {
            total += file.size;
            if (file.size > MAX_FILE) e[f.name] = `“${file.name}” is groter dan 8 MB.`;
          }
          continue;
        }
        if (f.kind === "checks") continue;
        const v = String(fd.get(f.name) ?? "").trim();
        if ("required" in f && f.required && !v) e[f.name] = "Dit veld is verplicht.";
        else if (f.kind === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) e[f.name] = "Vul een geldig e-mailadres in.";
        else if (f.kind === "tel" && v && !/^[+0-9 ()-]{8,20}$/.test(v)) e[f.name] = "Vul een geldig telefoonnummer in.";
      }
    if (total > MAX_TOTAL) e._files = "De bijlagen zijn samen groter dan 20 MB. Stuur grote bestanden apart per e-mail.";
    if (consent && !fd.get("akkoord")) e.akkoord = "Geef aan dat je akkoord gaat met de privacyverklaring.";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus("idle");
      const first = Object.keys(e)[0];
      const el = form.querySelector<HTMLElement>(`[name="${first}"], [name="${first}[]"]`);
      el?.focus();
      return;
    }
    setStatus("sending");
    const fd = new FormData(form);
    fd.set("form", def.id);
    const res = await sendForm(fd);
    if (res.ok) {
      track("generate_lead", { form_name: def.label });
      navigate("/bedankt/", { state: { name: String(fd.get("naam") ?? ""), form: def.id } });
    } else {
      setErrors(res.fields ?? {});
      setMessage(res.error);
      setStatus("error");
    }
  };

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="space-y-10" aria-busy={status === "sending"}>
      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${def.id}-website`}>Website</label>
        <input id={`${def.id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {def.sections.map((s, i) => (
        <fieldset key={i} className={s.title ? "border-t border-espresso/10 pt-8 first-of-type:border-0 first-of-type:pt-0" : ""}>
          {s.title && (
            <legend className="float-left mb-5 w-full font-display text-[28px] leading-tight text-espresso">{s.title}</legend>
          )}
          <div className="clear-both">
            {s.intro && <p className="mb-2 text-bark">{s.intro}</p>}
            {s.list && (
              <ul className="mb-5 grid list-disc gap-1 pl-5 text-bark marker:text-clay sm:grid-cols-2">
                {s.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
              {s.fields.map((f) => (
                <FieldView key={f.name} f={f} error={errors[f.name]} formId={def.id} />
              ))}
            </div>
          </div>
        </fieldset>
      ))}

      {errors._files && <p className="font-medium text-[#9B2C1F]">{errors._files}</p>}

      {consent && (
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug">
            <input type="checkbox" name="akkoord" value="ja" className="mt-0.5 h-5 w-5 shrink-0 accent-[#8A5D44]" />
            <span>
              Ik ga akkoord met de verwerking van deze gegevens zoals beschreven in de{" "}
              <Link to="/privacy-verklaring/" className="link">
                privacyverklaring
              </Link>
              . <span className="text-clay-700">*</span>
            </span>
          </label>
          {errors.akkoord && <p className="mt-1.5 text-[14px] font-medium text-[#9B2C1F]">{errors.akkoord}</p>}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-3xl border border-[#9B2C1F]/30 bg-[#FBEDEA] p-5">
          <p className="font-semibold text-[#7A2318]">{message}</p>
          <p className="mt-1 text-[15px] text-bark">Lukt het niet? Neem dan direct contact met ons op.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={SITE.phone.href} className="btn-dark !min-h-[44px] !px-4 !py-2 text-[15px]">
              <Phone size={16} aria-hidden="true" /> {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-ghost !min-h-[44px] !px-4 !py-2 text-[15px]">
              <Mail size={16} aria-hidden="true" /> {SITE.email}
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary min-w-[220px]" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Bezig met versturen…
            </>
          ) : (
            <>
              <Send size={17} aria-hidden="true" /> {def.submit}
            </>
          )}
        </button>
        <p className="text-[14px] text-taupe">
          Velden met <span className="text-clay-700">*</span> zijn verplicht.
        </p>
      </div>
    </form>
  );
}
