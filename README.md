# kenazorg.nl – nieuwe website

Redesign van kenazorg.nl door WebTik. Alle teksten, foto's, het logo, de formulieren en de certificeringen komen van de huidige site; het ontwerp is afgeleid van het Kena-logo.

## Merkrichting

- **Doelgroep:** verwijzers en professionals in de jeugdzorg (aanmelden), ouders, en meiden van 13–23 jaar zelf. Zij zoeken rust, veiligheid en betrouwbaarheid.
- **Persoonlijkheid:** warm, beschermend en krachtig, als de kudde uit het logo.
- **Kleuren (uit het verloop van de olifant):** espresso `#382C22`, bark `#59473B`, clay `#BB8C6F` / actiekleur `#8A5D44`, sand `#CEA893`, blush `#E7D4C8`, linen `#F4EBE4`, cream `#FBF7F3`. Alle tekstcombinaties halen WCAG AA.
- **Letters:** Cormorant Garamond (koppen, sluit aan bij het klassieke KENA-woordmerk) + Figtree (lezen). Zelf gehost.
- **Signature:** de hero-foto zit ín de olifant uit het logo, de kudde komt terug als drie meegroeiende olifanten (kracht, intelligentie, kudde) en op /aanbod/ als interactief fasepad (fase 1 → 3).
- **Huisstijl-elementen van de oude site:** de overlappende blush/rose-vlakken achter foto's en de illustratiebalk met vrouwenportretten.

## Pagina's (zelfde URL's als de huidige site)

`/` · `/aanbod/` · `/overons/` · `/voor-ouders/` (Hulpvragers) · `/contact/` · `/aanmelden/` · `/aanmelden-vooroverleg/` · `/aanmeldformulier/` · `/vacatures/` · `/uitsluitingscriteria/` · `/klachtenprocedure/` · `/privacy-verklaring/` · `/bedankt/` (noindex) · `404.html`

Omdat de paden gelijk blijven, zijn er geen redirects nodig voor de pagina's zelf. `.htaccess` stuurt oude WordPress-URL's (`/homepagina-nieuw/`, `/feed/`, `/wp-content/…`, de oude pdf-link) door.

## Techniek

Vite + React 18 + TypeScript + Tailwind 3 + react-router-dom, lucide-react. Elke route wordt bij de build als HTML gepre-rendered.

```bash
npm ci
npm run dev        # lokaal ontwikkelen
npm run build      # dist/ met alle pagina's, sitemap.xml, robots.txt, 404.html
```

- Teksten: `src/content/` (`site.ts`, `privacy.ts`, `forms.ts`)
- Formulieren: `public/api/contact.php` (contact, vooroverleg, officiële aanmelding met bijlagen, sollicitatie met cv), gebrande bevestigingsmail in `_mail-confirm.php`. Vereist PHP 8.1+.
- Configuratie: kopieer `private-example/kenazorg-config.php` naar `private/kenazorg-config.php` naast `httpdocs` op de server en vul daar het SMTP-wachtwoord in.
- Deploy: `.github/workflows/deploy.yml` bouwt bij push naar `main` en publiceert `dist/` naar branch `deploy` → Plesk Git → `httpdocs`.
- Analytics: vul `tracking.config.json` (GA4-ID en Search Console-tag). Pas dan verschijnen gtag (Consent Mode v2, standaard geweigerd) en de cookiebanner.

## Open punten voor Mike / Kena Zorg

1. **Privacy van het aanmeldformulier.** Het officiële aanmeldformulier bevat bijzondere persoonsgegevens (diagnoses, medicatie, juridische maatregelen) en bijlagen. Net als op de oude site gaan die per e-mail naar Kena. Laat Kena bevestigen dat de ontvangende mailbox dit veilig mag ontvangen (versleuteld/beveiligd mailen, bijvoorbeeld via hun zorgmailoplossing), of laat alleen de pdf-route open.
2. **GA4 en Search Console:** meet-ID en verificatietag ontbreken nog.
3. **WhatsApp:** staat 06-28146625 op WhatsApp? Dan kan een WhatsApp-knop in de mobiele balk en bij de formulierfoutmelding.
4. **Privacyverklaring:** de verwijzing naar `/beleidsprocedures` (bestaat niet) is vervangen door "deze pagina"; de blokken "Formulieren op deze website" en "Cookies en websitestatistieken" zijn nieuw. Laat Kena dit controleren.
5. **Certificaten:** de hero noemt ISO 9001, Klachtenportaal Zorg en SBB-erkend leerbedrijf op basis van de logo's in de oude footer. Laat Kena bevestigen dat de certificaten geldig zijn.
6. **Foto's:** dit zijn de (stock)foto's van de huidige site. Echte foto's van team en woonlocatie zouden sterker werken. Een foto met iStock-watermerk uit een ongepubliceerde conceptpagina is niet gebruikt.
7. **KvK-nummer** staat niet op de huidige site en dus ook niet op de nieuwe; toevoegen als Kena dat wil.
8. **Footer-credit** "Website door WebTik" eventueel aanpassen.
9. **DNS/e-mail:** SPF, DKIM en DMARC instellen voor `noreply@kenazorg.nl` en formuliermails testen in de inbox (niet spam).
