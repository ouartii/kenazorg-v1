// Alle bedrijfsgegevens en teksten van Kena Zorg staan in deze map.
// Teksten zijn overgenomen van de huidige kenazorg.nl.

export const SITE = {
  name: "Kena Zorg",
  legalName: "Kena Zorg",
  url: "https://kenazorg.nl",
  tagline: "Van kwetsbaarheid naar kracht.",
  address: { street: "Derkinderenstraat 110A", postalCode: "1061 VX", city: "Amsterdam", country: "NL" },
  phone: { display: "085-4013427", href: "tel:+31854013427" },
  mobile: { display: "06-28146625", href: "tel:+31628146625" },
  email: "info@kenazorg.nl",
  emailAdmin: "administratie@kenazorg.nl",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Derkinderenstraat+110A+1061+VX+Amsterdam",
  ageRange: "13 tot 23 jaar",
  aanmeldPdf: "/downloads/Aanmeldformulier-officiele-aanmelding_Kena-Zorg.pdf",
};

export const NAV = [
  { label: "Aanbod", to: "/aanbod/" },
  { label: "Over ons", to: "/overons/" },
  { label: "Hulpvragers", to: "/voor-ouders/" },
  { label: "Contact", to: "/contact/" },
];

export const FOOTER_LINKS = [
  { label: "Privacy verklaring", to: "/privacy-verklaring/" },
  { label: "Klachtenprocedure", to: "/klachtenprocedure/" },
  { label: "Uitsluitingscriteria", to: "/uitsluitingscriteria/" },
  { label: "Werken bij ons", to: "/vacatures/" },
];

// Certificeringen en keurmerken zoals in de footer van de huidige site.
export const CERTIFICATIONS = [
  { name: "ISO 9001 – TÜV NORD Nederland", img: "images/iso-9001.webp", w: 300, h: 300, href: "" },
  { name: "Klachtenportaal Zorg", img: "images/klachtenportaal-zorg.webp", w: 600, h: 72, href: "/klachtenprocedure/" },
  { name: "Jeugdstem – onafhankelijke cliëntenvertrouwenspersoon", img: "images/jeugdstem.svg", w: 378, h: 74, href: "https://jeugdstem.nl/contact" },
  { name: "SKJ – Kwaliteitsregister Jeugd", img: "images/skj.webp", w: 218, h: 115, href: "https://skjeugd.nl" },
  { name: "SBB – Erkend leerbedrijf", img: "images/sbb-erkend-leerbedrijf.webp", w: 300, h: 300, href: "" },
];

export const HOME = {
  hero: {
    eyebrow: "Jeugdzorg voor meiden en jonge vrouwen in Amsterdam",
    titleA: "Van kwetsbaarheid",
    titleB: "naar kracht.",
    lead: "Met begeleiding die echt het verschil maakt.",
    intro:
      "Kena Zorg begeleidt meiden en jonge vrouwen van 13 tot 23 jaar: ambulant thuis, in de crisisopvang en in beschermd en begeleid wonen.",
  },
  services: [
    {
      id: "ambulante-hulp",
      title: "Ambulante hulp",
      text: "Deze begeleiding is erop gericht om een verder traject met de Jeugdzorg te voorkomen en (verdere) ontwrichting van het gezin tegen te gaan.",
      img: "hand-vast",
      alt: "Twee handen die elkaar vasthouden als teken van steun bij ambulante hulp",
    },
    {
      id: "crisisopvang",
      title: "(Crisis)opvang",
      text: "In onze crisisopvang bieden we jongeren een stabiele omgeving waar rust en veiligheid vooropstaan.",
      img: "crisisopvang",
      alt: "Jonge vrouw die rustig naar beneden kijkt, beeld bij crisisopvang",
    },
    {
      id: "beschermd-begeleid-wonen",
      title: "Beschermd & begeleid wonen",
      text: "Ons begeleid wonen traject kenmerkt zich door 3 fases: kleinschalig wonen, semi-zelfstandig wonen en zelfstandig wonen.",
      img: "begeleid-wonen",
      alt: "Twee jonge vrouwen omhelzen elkaar, beeld bij beschermd en begeleid wonen",
    },
  ],
  niche: {
    eyebrow: "Meidenspecifieke problematiek",
    title: "Waar menig organisatie een stap terug doet, zetten wij juist een stap naar voren.",
    body: [
      "Bij ons staat de begeleiding van kwetsbare meiden centraal. Al jarenlang hebben wij ons gespecialiseerd in de specifieke uitdagingen waar meisjes en jonge vrouwen in kwetsbare situaties mee te maken krijgen. Dit is onze niche en onze kracht.",
      "Met lef, ervaring en oprechte toewijding bieden wij begeleiding die verder gaat dan standaard zorg. Met kennis, ervaring en toewijding durven wij te staan naast meiden die extra steun nodig hebben, en bieden wij een veilige omgeving waarin zij kunnen groeien, herstellen en hun toekomst vormgeven.",
    ],
  },
  herd: {
    eyebrow: "Waarom een olifant?",
    title: "Samen sta je altijd sterker.",
    body: "Om onszelf te beschrijven gebruiken we graag de metafoor van de olifant. Een kudde olifanten staat voor alles wat wij belangrijk vinden: kracht, intelligentie en een zeer sterk sociaal netwerk (kudde). Die combinatie van individuele kracht en een sterk sociaal vangnet is wat wij belangrijk vinden.",
    values: [
      { word: "Kracht", text: "De eigen kracht van iedere meid is het vertrekpunt." },
      { word: "Intelligentie", text: "Begeleiding met kennis, ervaring en maatwerk." },
      { word: "Kudde", text: "Een sterk sociaal netwerk dat beschermt en draagt." },
    ],
  },
  contactCta: {
    eyebrow: "Neem contact op",
    title: "Onze ervaren hulpverleners zijn gespecialiseerd in het begeleiden van moeilijke thuissituaties.",
    text: "Elk gezin heeft zijn eigen complexe dynamiek.",
  },
};

export const FAQ = [
  {
    q: "Voor wie is Kena Zorg?",
    a: "Kena Zorg richt zich op meisjes en jonge vrouwen in de leeftijd van 13 tot 23 jaar. Wij zijn gespecialiseerd in meidenspecifieke problematiek en in het begeleiden van moeilijke thuissituaties.",
  },
  {
    q: "Welke hulp bieden jullie?",
    a: "Ambulante begeleiding thuis (licht, preventief of juist specialistisch), crisisopvang en beschermd & begeleid wonen in drie fases: een kleinschalige woonvoorziening met 24/7 begeleiding, semi-zelfstandig wonen en zelfstandig wonen met maatwerk.",
  },
  {
    q: "Hoe meld ik een jeugdige aan?",
    a: "Je kunt je aanmelden voor een vooroverleg of direct een officiële aanmelding doen. Het officiële aanmeldformulier kun je online invullen of als pdf downloaden.",
  },
  {
    q: "Is er een indicatie nodig?",
    a: "Ja. Kena Zorg kan alleen zorg verlenen op basis van een geldige zorgindicatie. Bekijk ook onze uitsluitingscriteria.",
  },
  {
    q: "Wat als terugkeer naar huis niet mogelijk is?",
    a: "Terugkeer naar huis is altijd het eerste doel. Lukt dat niet, dan kan de jeugdige doorstromen naar een volgende fase. Zo voorkomen we dat haar ontwikkeling stilvalt en blijft er altijd perspectief richting zelfstandigheid.",
  },
  {
    q: "Waar kan ik terecht met een klacht?",
    a: "Je kunt een klacht altijd intern bespreken; wij hebben een klachtenfunctionaris. Komen we er samen niet uit, dan kun je terecht bij de externe geschillencommissie Klachtenportaal Zorg.",
  },
];

export const AANBOD = {
  hero: {
    eyebrow: "Ons aanbod",
    title: "Samen, zelfstandig en veilig",
    lead: "Jonge vrouwen komen in een omgeving waarin ze leren zelfstandig te worden met de hulp van onze ervaren hulpverleners die haar begeleiden.",
  },
  ambulant: {
    title: "Ambulante begeleiding thuis",
    body: [
      "Onze ervaren hulpverleners zijn gespecialiseerd in het begeleiden van moeilijke thuissituaties. Elk gezin heeft zijn eigen complexe dynamiek. Deze begeleiding is erop gericht om een verder traject met de Jeugdzorg te voorkomen en (verdere) ontwrichting van het gezin tegen te gaan.",
      "De jeugdige krijgt met onze begeleiding de steun die nodig is om obstakels te overwinnen en veerkracht op te bouwen.",
    ],
    levels: ["Licht", "Preventief", "Specialistisch"],
    levelsIntro: "Onze ambulante begeleiding thuis is afhankelijk van de hulpvraag:",
  },
  crisis: {
    title: "Crisisopvang",
    body: [
      "Soms is er direct een veilige plek nodig. In onze crisisopvang bieden we jongeren een stabiele omgeving waar rust en veiligheid vooropstaan.",
      "Ons team van professionals staat klaar om snel te handelen en de juiste begeleiding te bieden, zodat de eerste stappen naar herstel meteen gezet kunnen worden.",
    ],
  },
  wonen: {
    title: "Beschermd & begeleid wonen",
    intro:
      "In Fase 1 verblijft de jeugdige in een kleinschalige groepsvoorziening met 24/7 begeleiding. Wanneer dit niet tot de mogelijkheden behoort, bieden we een zorgvuldig vervolg door doorstroming naar een fase 2 of 3, om zo stilstand in de ontwikkeling te voorkomen en perspectief te behouden.",
    pathTitle: "Samen wordt er gekeken welke fase passend is en of er doorgestroomd kan worden naar de volgende fase.",
    phases: [
      {
        n: 1,
        short: "Kleinschalige woonvoorziening",
        title: "Beschermd wonen",
        sub: "24/7 groepsvoorziening",
        text: "Fase 1 is een kleinschalige groepsvoorziening speciaal voor meiden, met 24/7 begeleiding. Hier creëren we een warme en veilige setting waarin zij tot rust kunnen komen en structuur ervaren. Samen met het netwerk en de begeleiders wordt gekeken of terugkeer naar huis mogelijk is. Dit is altijd het eerste doel. Wanneer terugkeer naar huis niet mogelijk is, kan de jeugdige doorstromen naar een volgende fase. Zo voorkomen we dat haar ontwikkeling stilvalt en blijft er altijd perspectief richting zelfstandigheid.",
      },
      {
        n: 2,
        short: "Semi-zelfstandig wonen",
        title: "Begeleid wonen",
        sub: "semi-zelfstandig",
        text: "In fase 2 woont de jeugdige semi-zelfstandig, samen met andere meiden. De nadruk ligt hierbij op begeleid wonen en het werken aan de doelen die in overleg zijn opgesteld. Er is intensieve begeleiding aanwezig om meiden te ondersteunen bij dagelijkse vaardigheden, het maken van keuzes en het vergroten van zelfstandigheid. Deze fase bereidt hen voor op de stap naar volledig zelfstandig wonen.",
      },
      {
        n: 3,
        short: "Zelfstandig wonen",
        title: "Zelfstandig wonen",
        sub: "met maatwerk",
        text: "Fase 3 is bedoeld voor meiden die fase 1 en 2 succesvol hebben doorlopen en klaar zijn voor zelfstandigheid. In deze fase wonen zij zelfstandig, met begeleiding op de achtergrond die waar nodig wordt ingezet. Daarnaast is er in fase 3 ook ruimte voor maatwerk: sommige meiden zijn minder geschikt voor een groepsvoorziening, maar hebben wel baat bij begeleiding richting zelfstandigheid. Voor hen bieden wij een passende oplossing binnen deze fase, zodat iedere jeugdige de kans krijgt zich te ontwikkelen in een omgeving die bij haar past.",
      },
    ],
    closing:
      "Wij geloven dat iedere jeugdige haar eigen pad bewandelt. Daarom staat maatwerk centraal en bieden wij in elke fase begeleiding die écht bij haar past.",
  },
};

export const OVERONS = {
  hero: {
    eyebrow: "Over Kena Zorg",
    title: "Individuele kracht en een sterk sociaal vangnet",
    lead: "Jonge vrouwen komen in een omgeving waarin ze leren zelfstandig te worden met de hulp van onze ervaren hulpverleners die haar begeleiden.",
  },
  metaphor: [
    "Bij Kena gebruiken we graag de metafoor van de olifant. Een kudde olifanten staat voor kracht, intelligentie en bescherming. Deze eigenschappen symboliseren wie wij zijn en wat wij bieden: een veilige en stabiele omgeving waar jonge vrouwen de ruimte krijgen om te groeien.",
    "De kudde staat voor Kena – onze ervaren hulpverleners en de plek waar de meiden wonen. Waarin meiden hun zelfstandigheid opbouwen en werken aan de uitdagingen in hun leven.",
  ],
  name: {
    intro: "De naam Kena draagt ook een diepere betekenis:",
    het: "“HET (de levenskracht) is er”",
    wij: "“WIJ (als support) zijn er.”",
    outro: "Zo weerspiegelt Kena de balans tussen de eigen kracht van het individu en de steun van een veilige omgeving.",
  },
  visie:
    "Elk meisje en iedere jonge vrouw verdient een veilige plek om te groeien. Kena biedt een stabiele woonomgeving met passende begeleiding, waarin meiden en jonge vrouwen kunnen werken aan hun zelfstandigheid, hun kracht ontwikkelen en de uitdagingen in hun leven aangaan.",
  missie:
    "Met begeleid wonen en beschermd wonen trajecten ondersteunt Kena jonge vrouwen die te maken hebben met complexe uitdagingen. Door een combinatie van persoonlijke begeleiding, preventie en een cultuursensitieve aanpak creëren wij kansen om vanuit moeilijke omstandigheden een nieuw perspectief op te bouwen.",
};

// Uitspraken van medewerkers, zoals op de huidige Over ons-pagina.
export const TEAM_QUOTES = [
  {
    who: "K.A.",
    text: "Bij Kena merkte ik al snel dat waardering niet stopt na je eerste dag. Mijn werk wordt gezien, mijn groei erkend en mijn inzet echt gewaardeerd. Daardoor voel ik me niet alleen een teamlid, maar iemand die waarde toevoegt voor de jongeren en het team!",
  },
  {
    who: "M.O.",
    text: "Ik ben dankbaar voor de kansen en het vertrouwen die ik hier heb gekregen. Mijn werk wordt gewaardeerd en de samenhorigheid voelt als een warm thuis. Dat maakt dat ik elke dag met plezier en trots mijn bijdrage lever.",
  },
  {
    who: "L.B.",
    text: "Ik ben ontzettend blij dat ik bij Kena werk want ik ga elke dag met een glimlach naar mijn werk. Geen dag is hetzelfde en juist die afwisseling maakt het zo leuk. Dankzij het lieve team dat altijd voor je klaarstaat, voelt werken hier echt als thuiskomen.",
  },
  {
    who: "S.A.",
    text: "Bij Kena voel ik me echt gehoord en gewaardeerd. De kracht van ons diverse team geeft mij de kans om te groeien en maakt dat we jongeren beter kunnen ondersteunen.",
  },
];

export const HULPVRAGERS = {
  quote: { text: "Help mij het zelf te doen.", by: "Maria Montessori" },
  groups: [
    {
      id: "jou",
      title: "Voor jou",
      teaser: "Een plek waar je écht gezien en gehoord wordt, waar je jezelf mag zijn en stap voor stap mag groeien.",
      img: "hand-reiken",
      alt: "Twee handen die naar elkaar reiken tegen een zachte lucht",
      body: [
        "Voor jou is er bij Kena een plek waar je écht gezien en gehoord wordt. Een plek waar je jezelf mag zijn, waar je ervaringen mag opdoen en waar je stap voor stap mag groeien.",
        "Wij staan naast jou. Jouw doelen, jouw groei, jouw toekomst.",
      ],
    },
    {
      id: "ouders",
      title: "Voor ouders",
      teaser: "We nemen jullie zorgen serieus en houden jullie betrokken, zodat jullie altijd weten waar jullie dochter staat.",
      img: "help",
      alt: "Letterblokjes die het woord HELP vormen op een terracotta ondergrond",
      body: [
        "Als ouder wil je niets liever dan dat je dochter zich veilig voelt en zich kan ontwikkelen tot een zelfstandige jongvolwassene. Soms is daar extra steun voor nodig. Bij Kena nemen we jullie zorgen serieus en werken we samen aan een stabiele basis voor jullie dochter.",
        "Wij houden jullie betrokken in het traject, zodat jullie altijd weten waar ze staat en welke stappen worden gezet. Vertrouwen, samenwerking en open communicatie zijn voor ons essentieel, want alleen zo kunnen we écht verschil maken.",
      ],
    },
    {
      id: "professionals",
      title: "Voor professionals",
      teaser: "Een transparante en betrokken partner: betrouwbaar in afspraken, zorgvuldig in de uitvoering.",
      img: "puzzel",
      alt: "Een blauw puzzelstukje met een hartje tussen witte puzzelstukjes",
      body: [
        "In de jeugdzorg is samenwerking cruciaal. Bij Kena zetten wij ons in om meiden een veilige woonplek en passende begeleiding te bieden, afgestemd op hun unieke situatie. We werken met duidelijke fases en maatwerktrajecten, zodat er altijd perspectief is op ontwikkeling en zelfstandigheid.",
        "Voor professionals zijn wij een transparante en betrokken partner: betrouwbaar in afspraken, zorgvuldig in de uitvoering en altijd gericht op duurzame resultaten. Samen zorgen we ervoor dat meiden niet stilvallen, maar blijven groeien.",
      ],
    },
  ],
  outro:
    "Onze ambulante begeleiding thuis is afhankelijk van de hulpvraag: “Licht, preventief of juist specialistisch”. Weten wat wij voor jouw hulpvraag kunnen betekenen?",
};

export const VACATURES = {
  title: "Werken bij Kena Zorg",
  lead: "Op zoek naar een nieuwe uitdaging? Bij Kena Zorg zijn we altijd op zoek naar nieuw talent. Vul hieronder je gegevens in, dan nemen wij contact met je op.",
};

export const UITSLUITING = {
  intro: "Kena Zorg kan geen begeleiding of zorg bieden aan cliënten die:",
  items: [
    "Een actieve en ernstige verslavingsproblematiek hebben waarvoor specialistische verslavingszorg noodzakelijk is.",
    "Agressief & gewelddadig gedrag laten zien waardoor de veiligheid van henzelf, andere cliënten of medewerkers in gevaar komt.",
    "Zorg of handelingen nodig hebben die buiten de deskundigheid of bevoegdheid van Kena Zorg vallen.",
    "Een zware lichamelijke beperking hebben waarvoor intensieve medische of verpleegkundige ondersteuning vereist is.",
    "Mannelijk zijn; de begeleiding van Kena Zorg richt zich op meisjes en jonge vrouwen in de leeftijd van 13 tot 23 jaar.",
    "De veiligheid van medewerkers of andere cliënten niet kan worden gegarandeerd.",
    "Er sprake is van seksueel intimiderend, ronsel- of grensoverschrijdend gedrag door cliënten of hun omgeving.",
    "De cliënt de huisregels, begeleiding of voorwaarden van Kena Zorg niet aanvaardt.",
  ],
  after: [
    "Kena Zorg past geen vrijheidsbeperkende maatregelen toe en kan alleen zorg verlenen op basis van een geldige zorgindicatie.",
    "Wanneer tijdens het traject blijkt dat het gedrag of de zorgbehoefte van een cliënt verandert, wordt dit altijd besproken. De cliënt krijgt de kans om samen met de begeleiding tot verbetering te komen. Als dit niet lukt of de veiligheid in het geding blijft, zal Kena Zorg, in overleg met de cliënt en betrokken partijen, meewerken aan het vinden van een passende vervolgplek.",
  ],
};

export const KLACHTEN = {
  intro: [
    "Naast de primaire en ondersteunende processen hebben wij voor de behandeling van klachten een klachtenprocedure geformuleerd. Hierin houden wij rekening met de actuele wetgeving over dit onderwerp, zo is er onder andere een klachtenfunctionaris en zijn wij lid van een onafhankelijke geschillencommissie.",
    "Onze klachtenprocedure geeft onze cliënten en ouders de mogelijkheid om intern de klacht neer te leggen en te bespreken. Mochten wij er onderling niet uitkomen of geeft de klacht hier aanleiding voor, kan er contact worden gezocht met de externe geschillencommissie Klachtenportaal Zorg. Hierover zijn alle cliënten geïnformeerd, nieuwe cliënten worden geïnformeerd via de zorgovereenkomst. Hieronder wordt de klachtenprocedure beschreven.",
  ],
  steps: [
    {
      role: "Medewerk(st)er",
      items: [
        "Ontvangt een mondelinge of schriftelijke klacht van een cliënt, familielid, medewerk(st)er of andere betrokken personen of partijen (stakeholders).",
        "Hoort de klacht aan en neemt indien mogelijk en noodzakelijk direct maatregelen.",
        "Legt de melding vast op het klachtenformulier en verstrekt deze aan de Klachtenfunctionaris. Geeft de eventuele direct genomen maatregelen aan op het formulier.",
        "Informeert bij dringende zaken direct de Klachtenfunctionaris over de klacht.",
      ],
    },
    {
      role: "Interne klachtenfunctionaris",
      items: [
        "Beoordeelt of de procedure goed gevolgd is. Mocht dit niet het geval zijn dan wordt de klacht teruggelegd.",
        "Beoordeelt de aanleiding inhoudelijk.",
        "Stelt vast of er maatregelen getroffen moeten worden en legt dit vast op het formulier.",
        "Wanneer geen maatregelen noodzakelijk zijn, wordt de klacht gearchiveerd en worden eventuele betrokkenen op de hoogte gesteld van deze beslissing.",
      ],
    },
    {
      role: "Interne klachtenfunctionaris",
      items: [
        "Stelt vast of de melding besproken moet worden in het teamoverleg.",
        "Stelt, eventueel op basis van het gehouden overleg, vast welke maatregelen genomen moeten worden.",
        "Draagt er zorg voor dat de maatregelen worden uitgevoerd. De genomen maatregelen worden geëvalueerd in de jaarlijkse Directiebeoordeling.",
        "Stelt vast of het doorvoeren van wijzigingen in het kwaliteitssysteem noodzakelijk is.",
        "Brengt de betrokkenen op de hoogte van de afhandeling van de melding.",
        "Werkt het klachtenformulier bij.",
      ],
    },
    {
      role: "Kwaliteitscoördinator",
      items: [
        "Archiveert het klachtenformulier. Indien de indiener niet tevreden is over de klachtenafhandeling, kan deze contact opnemen met de onafhankelijke klachtencommissie van Kena Zorg.",
      ],
    },
  ],
};
