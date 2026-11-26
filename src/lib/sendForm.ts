// Post een formulier (inclusief bijlagen) als multipart/form-data naar het eigen PHP-endpoint.
export type SendResult = { ok: true } | { ok: false; error: string; fields?: Record<string, string> };

export async function sendForm(data: FormData): Promise<SendResult> {
  if (__PREVIEW__) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true };
  }
  try {
    const res = await fetch("/api/contact.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
    const json = (await res.json().catch(() => null)) as SendResult | null;
    if (res.ok && json?.ok) return { ok: true };
    return { ok: false, error: (json && !json.ok && json.error) || "Er ging iets mis bij het versturen.", fields: json && !json.ok ? json.fields : undefined };
  } catch {
    return { ok: false, error: "Geen verbinding. Controleer je internet en probeer het opnieuw." };
  }
}
