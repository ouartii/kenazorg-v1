// Formulierdefinities. Velden en opties zijn overgenomen van de huidige formulieren op kenazorg.nl.

export type Field =
  | { kind: "text" | "email" | "tel" | "date"; name: string; label: string; required?: boolean; autoComplete?: string; hint?: string; half?: boolean }
  | { kind: "textarea"; name: string; label: string; required?: boolean; hint?: string; rows?: number }
  | { kind: "checks"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "radio"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "files"; name: string; label: string; hint?: string; max: number };

export type Section = { title: string; intro?: string; list?: string[]; fields: Field[] };

export type FormDef = {
  id: "contact" | "vooroverleg" | "aanmelding" | "sollicitatie";
  label: string; // komt in de mail aan Kena Zorg en in het GA4-event
  submit: string;
  sections: Section[];
};

export const CONTACT_FORM: FormDef = {
  id: "contact",
  label: "Contactformulier",
  submit: "Verstuur bericht",
  sections: [
    {
      title: "",
      fields: [
        { kind: "text", name: "naam", label: "Naam", required: true, autoComplete: "name", half: true },
        { kind: "email", name: "email", label: "E-mailadres", required: true, autoComplete: "email", half: true },
        { kind: "tel", name: "telefoon", label: "Telefoonnummer (optioneel)", autoComplete: "tel", half: true },
        { kind: "text", name: "onderwerp", label: "Onderwerp", half: true },
        { kind: "textarea", name: "bericht", label: "Je bericht", required: true, rows: 5 },
      ],
    },
  ],
};

export const VOOROVERLEG_FORM: FormDef = {
  id: "vooroverleg",
  label: "Aanmelden vooroverleg",
  submit: "Vooroverleg aanvragen",
  sections: [
    {
      title: "",
      fields: [
        { kind: "text", name: "naam", label: "Naam", required: true, autoComplete: "name", half: true },
        { kind: "email", name: "email", label: "E-mailadres", required: true, autoComplete: "email", half: true },
        { kind: "tel", name: "telefoon", label: "Telefoonnummer", required: true, autoComplete: "tel", half: true },
        { kind: "text", name: "functie", label: "Functie", autoComplete: "organization-title", half: true },
        { kind: "text", name: "organisatie", label: "Organisatie", autoComplete: "organization" },
      ],
    },
  ],
};

export const SOLLICITATIE_FORM: FormDef = {
  id: "sollicitatie",
  label: "Werken bij Kena Zorg",
  submit: "Verstuur mijn gegevens",
  sections: [
    {
      title: "",
      fields: [
        { kind: "text", name: "naam", label: "Naam", required: true, autoComplete: "name", half: true },
        { kind: "email", name: "email", label: "E-mailadres", required: true, autoComplete: "email", half: true },
        { kind: "tel", name: "telefoon", label: "Telefoonnummer", required: true, autoComplete: "tel" },
        { kind: "files", name: "cv", label: "Upload hier je cv", hint: "Pdf of Word, maximaal 8 MB.", max: 1 },
      ],
    },
  ],
};

export const AANMELD_FORM: FormDef = {
  id: "aanmelding",
  label: "Officiële aanmelding",
  submit: "Aanmelding versturen",
  sections: [
    {
      title: "Personalia jeugdige",
      fields: [
        { kind: "text", name: "naam_jeugdige", label: "Naam", required: true, half: true },
        { kind: "date", name: "geboortedatum_jeugdige", label: "Geboortedatum", required: true, half: true },
        { kind: "text", name: "leeftijd_jeugdige", label: "Leeftijd", half: true },
        { kind: "text", name: "geslacht_jeugdige", label: "Geslacht", hint: "Indien van toepassing: genderidentiteit en gewenste aanspreekvorm.", half: true },
        { kind: "text", name: "verblijfplaats", label: "Huidige verblijfplaats", half: true },
        { kind: "text", name: "woonplaatsbeginsel", label: "Woonplaatsbeginsel", half: true },
      ],
    },
    {
      title: "Aanmelding betreft",
      fields: [
        {
          kind: "checks",
          name: "woonperspectief_keuze",
          label: "Het woonperspectief",
          options: [
            "Langdurig wonen",
            "Uitstroom naar huis",
            "Crisisopvang",
            "Doorstroom naar andere woonorganisatie",
            "Verblijf met behandeling (therapie en onderzoek)",
          ],
        },
        {
          kind: "checks",
          name: "fasering",
          label: "Fasering",
          options: [
            "Fase 1: 24-uurs begeleiding en ondersteuning",
            "Fase 2: Richting zelfstandigheid met groepsgenoten en ambulante hulpverlening",
            "Fase 3: Zelfstandig wonen met ambulante hulpverlening",
            "Nader te bespreken",
          ],
        },
      ],
    },
    {
      title: "Aanmeldinformatie",
      fields: [
        { kind: "textarea", name: "reden", label: "Reden van aanmelding", required: true, rows: 4 },
        { kind: "textarea", name: "woonperspectief_na_plaatsing", label: "Woonperspectief na plaatsing", rows: 3 },
      ],
    },
    {
      title: "Juridische maatregel(en) en kader(s)",
      fields: [
        {
          kind: "checks",
          name: "maatregelen",
          label: "Van toepassing",
          options: [
            "Geen maatregel",
            "Voorlopige ondertoezichtstelling (VOTS)",
            "Ondertoezichtstelling (OTS)",
            "Voorlopige voogdij",
            "Voogdij",
            "Jeugdreclassering",
            "Machtiging voor gesloten plaatsing",
            "Machtiging uithuisplaatsing (MUHP)",
            "Adoptie",
            "Anders",
          ],
        },
        { kind: "files", name: "bijlagen_maatregelen", label: "Upload hier de bijlagen", hint: "Maximaal 3 bestanden (pdf, Word of afbeelding), elk maximaal 8 MB.", max: 3 },
      ],
    },
    {
      title: "Aanmelder of verwijzer",
      fields: [
        { kind: "text", name: "naam", label: "Naam", required: true, autoComplete: "name", half: true },
        { kind: "text", name: "relatie", label: "Relatie tot jeugdige", half: true },
        { kind: "tel", name: "telefoon", label: "Telefoonnummer", required: true, autoComplete: "tel", half: true },
        { kind: "email", name: "email", label: "E-mailadres aanmelder", required: true, autoComplete: "email", half: true },
        { kind: "text", name: "gemeente", label: "Verantwoordelijke gemeente" },
        { kind: "radio", name: "verwijzende_instantie", label: "Bent u verwijzende instantie?", options: ["Nee", "Ja"] },
        { kind: "text", name: "instantie_functie", label: "Zo ja: instantie en uw functie" },
      ],
    },
    {
      title: "Wettelijk gezagdragers",
      fields: [
        { kind: "text", name: "gezag1_naam", label: "Naam wettelijke gezagdrager 1", half: true },
        { kind: "text", name: "gezag1_contact", label: "Contactgegevens", half: true },
        { kind: "text", name: "gezag2_naam", label: "Naam wettelijke gezagdrager 2", half: true },
        { kind: "text", name: "gezag2_contact", label: "Contactgegevens", half: true },
        { kind: "text", name: "ouder1_naam", label: "Indien van toepassing: ouder zonder gezag 1", half: true },
        { kind: "text", name: "ouder1_contact", label: "Contactgegevens", half: true },
        { kind: "text", name: "ouder2_naam", label: "Indien van toepassing: ouder zonder gezag 2", half: true },
        { kind: "text", name: "ouder2_contact", label: "Contactgegevens", half: true },
      ],
    },
    {
      title: "Netwerk",
      fields: [
        { kind: "text", name: "gezinssetting", label: "Gezinssetting" },
        { kind: "text", name: "netwerk_bijzonderheden", label: "Bijzonderheden" },
        { kind: "textarea", name: "betrokkenheid", label: "Wie is betrokken tijdens het verblijf en op welke manier?", rows: 3 },
      ],
    },
    {
      title: "Hulpverlening, zorg en dagbesteding",
      fields: [
        { kind: "text", name: "hulp_organisatie", label: "Huidige of laatste hulpverlening: naam organisatie", half: true },
        { kind: "text", name: "hulp_contactpersoon", label: "Contactpersoon en verantwoordelijkheid", half: true },
        { kind: "text", name: "hulp_contact", label: "Contactgegevens organisatie", half: true },
        { kind: "text", name: "eerdere_hulp", label: "Indien van toepassing: eerdere hulpverlening (organisatie en rol)", half: true },
      ],
    },
    {
      title: "Medische zorg",
      fields: [
        { kind: "text", name: "huisartspraktijk", label: "Naam huisartsenpraktijk", half: true },
        { kind: "text", name: "huisarts", label: "Naam huisarts", half: true },
        { kind: "textarea", name: "medicatie", label: "Voorgeschreven medicatie en de voorschrijver", rows: 2 },
      ],
    },
    {
      title: "Gegevens (laatst bezochte) school of dagbesteding",
      fields: [
        { kind: "text", name: "school", label: "Naam school of dagbesteding", half: true },
        { kind: "text", name: "school_uren", label: "Aantal uren per week", half: true },
        { kind: "text", name: "school_contact", label: "Contactpersoon en gegevens" },
        { kind: "text", name: "dagbesteding_zicht", label: "Geen school of dagbesteding: is er zicht op dagbesteding die de jeugdige kan volgen?" },
      ],
    },
    {
      title: "Omschrijving van de zorgen en krachten",
      fields: [
        { kind: "textarea", name: "veiligheid", label: "Welke veiligheidsrisico's kunnen invloed hebben op het verblijf en de begeleiding?", rows: 2 },
        { kind: "textarea", name: "groepssituaties", label: "Hoe functioneert de jeugdige binnen groepssituaties?", rows: 2 },
        { kind: "textarea", name: "ondersteuningsbehoeften", label: "Ondersteuningsbehoeften", rows: 2 },
        { kind: "textarea", name: "diagnoses", label: "Diagnoses", rows: 2 },
        { kind: "textarea", name: "welzijn", label: "Psychisch en fysiek welzijn", rows: 2 },
        { kind: "textarea", name: "seksuele_ontwikkeling", label: "Seksuele ontwikkeling", rows: 2 },
        { kind: "textarea", name: "social_media", label: "Social media", rows: 2 },
        { kind: "textarea", name: "overige", label: "Overige bijzonderheden", rows: 2 },
      ],
    },
    {
      title: "Hulpvragen & verwachtingen voor ondersteuning bij Kena Zorg",
      fields: [
        { kind: "textarea", name: "hulpvraag_jeugdige", label: "Jeugdige", rows: 2 },
        { kind: "textarea", name: "hulpvraag_opvoeders", label: "Opvoeder(s)", rows: 2 },
        { kind: "textarea", name: "hulpvraag_verwijzer", label: "Verwijzer", rows: 2 },
        { kind: "textarea", name: "hulpvraag_anderen", label: "Andere betrokkenen", rows: 2 },
      ],
    },
    {
      title: "Dossiervorming",
      intro: "Voeg de informatie voor dossiervorming graag toe als bijlage:",
      list: [
        "Juridische maatregelen",
        "Verslagen van eerdere hulpverlening",
        "Psychologische onderzoeken/diagnoses",
        "Indicatie: Bepaling Jeugdhulp",
        "Schoolgegevens en dagbesteding",
        "Overige relevante documenten",
      ],
      fields: [{ kind: "files", name: "bijlagen_dossier", label: "Bijlagen dossier", hint: "Maximaal 3 bestanden, elk maximaal 8 MB.", max: 3 }],
    },
  ],
};
