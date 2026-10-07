import type { Dictionary } from "./types";
import { pricingRates } from "./pricing-data";

export const nb = {
  business: {
    organizationLabel: "Org.nr.",
    phoneLabel: "Telefon",
    "emailLabel": "E-post",
    "areaLabel": "Tjenesteområde",
    "serviceArea": "Oslo og nærliggende områder",
    "commercial": {
      "heading": "Renhold for bedriften?",
      "description": "Vi tar også imot forespørsler om renhold av næringslokaler. Hvert oppdrag vurderes individuelt. Ta kontakt, så ser vi på om vi kan hjelpe.",
      "action": "Kontakt oss om renhold for bedriften"
    }
  },
  quote: {
    imageAlt: "Tilbudsskjema på en skriveplate ved siden av kluter og en sprayflaske",
    intro: {
      eyebrow: "Be om tilbud",
      heading: "Fortell oss hva du trenger",
      description: "Fyll ut skjemaet for å be om et tilbud på renhold. Du kan velge «Usikker» hvis du ikke vet hvilken tjeneste som passer.",
    },
    form: {
      heading: "Om deg og oppdraget",
      requiredNote: "Felt merket med * må fylles ut. Resten er valgfritt.",
      optional: "valgfritt",
      groups: { contact: "Kontaktopplysninger", job: "Renholdet du ønsker", details: "Mer om behovet" },
      labels: {
        name: "Navn", email: "E-post", phone: "Telefon", service: "Type renhold",
        property: "Type bolig eller lokale (f.eks. leilighet, hus eller kontor)", size: "Omtrentlig størrelse i m²", rooms: "Antall rom",
        location: "Postnummer, sted eller område", frequency: "Hvor ofte", timing: "Ønsket tidspunkt", details: "Hva vil du ha hjelp med?",
      },
      serviceOptions: { home: "Husvask", "move-out": "Flyttevask", window: "Vindusvask", other: "Annet", unsure: "Usikker" },
      frequencyOptions: { once: "Én gang", recurring: "Regelmessig", unsure: "Usikker" },
      choose: "Velg et alternativ",
      helpers: { timing: "Skriv gjerne en dato eller periode. Dette bekrefter ikke ledig kapasitet.", details: "Ta gjerne med oppgaver, prioriteringer og hensyn ved adkomst. Maks 3000 tegn." },
      expectation: "En forespørsel er ikke en bestilling. Omfang og tidspunkt må bekreftes før arbeidet avtales.",
      privacyNotice: "Når du sender inn skjemaet, bruker vi opplysningene dine for å behandle forespørselen og kontakte deg.",
      privacyLink: "Les om personvern",
      honeypot: "La dette feltet stå tomt",
      noScript: "JavaScript må være aktivert for å sende en forespørsel. Ingen opplysninger er sendt.",
      submit: "Send forespørsel",
      pending: "Sender forespørselen …",
      errorHeading: "Se over disse feltene",
      errors: {
        required: "Fyll ut dette feltet.", email: "Skriv en e-postadresse, for eksempel navn@domene.no.",
        phone: "Skriv et telefonnummer med minst fem sifre. Landskode, mellomrom og parenteser kan brukes.",
        number: "Skriv et positivt tall. Antall rom må være et heltall; areal kan ha opptil to desimaler.",
        choice: "Velg eller skriv en gyldig verdi.", tooLong: "Teksten er for lang. Forkort innholdet i feltet.",
      },
      success: "Takk. Forespørselen din er sendt til Vasky. Dette er ikke en bekreftet bestilling.",
      failure: "Vi kunne ikke bekrefte at forespørselen ble sendt. Opplysningene står fortsatt i skjemaet. Prøv igjen.",
    },
    help: { heading: "Usikker på hva du trenger?", contact: "Se kontaktsiden", services: "Utforsk tjenestene" },
  },
  contact: {
    imageAlt: "Arbeidsbord med bærbar datamaskin og telefon ved et vindu",
    "intro": {
      "eyebrow": "Kontakt",
      "heading": "Kontakt Vasky",
      "description": "Har du spørsmål om renhold? Send oss en e-post."
    },
    "quote": {
      "heading": "Ønsker du et tilbud?",
      "description": "Bruk tilbudsskjemaet for å sende opplysninger om renholdet du ønsker.",
      "action": "Be om tilbud"
    }
  },
  pricing: {
    imageAlt: "Arbeidsbord med bærbar datamaskin, notatblokk og penn",
  vatNote: "Alle priser er inkl. MVA.",
  "intro": {
    "eyebrow": "Priser",
    "heading": "Priser på renhold",
    "description": "Se timepriser for husvask og vindusvask, fastpriser for flyttevask og hva som inngår. Prisene nedenfor gjelder renhold av boliger.",
    "primaryAction": "Be om tilbud",
  },
  "hourlyUnit": "per time",
  "home": {
    "heading": "Husvask",
    "scope": {
      "heading": "Dette inngår i standard husvask",
      "description": "Der det er relevant for boligen, omfatter standard husvask følgende oppgaver. Har du andre behov, kan du ta dem opp med oss.",
      "groups": [
        {
          "heading": "Rom og flater",
          "items": [
            "Støvtørking av tilgjengelige flater og karmer",
            "Utvendig rengjøring av kjøkkenflater og kjøkkeninnredning",
            "Utvendig rengjøring av baderomsinventar og sanitærutstyr",
            "Støvsuging av møbler, tepper og gulv",
            "Gulvvask"
          ]
        }
      ]
    },
    "timeHeading": "Veiledende tidsbruk",
    "timeNote": "Tidene er veiledende, ikke en garanti. Faktisk tidsbruk avhenger av størrelse, tilstand og omfang. En ryddig bolig kan vanligvis rengjøres raskere enn en bolig der eiendeler må flyttes underveis.",
    "estimates": [
      {
        "home": "Liten bolig / leilighet",
        "area": "Ca. 50–80 m²",
        "time": "Ca. 1,5–2,5 timer"
      },
      {
        "home": "Standard bolig",
        "area": "Ca. 90–140 m²",
        "time": "Ca. 2–4 timer"
      },
      {
        "home": "Større bolig",
        "area": "Ca. 150–200+ m²",
        "time": "Ca. 4–6 timer"
      }
    ]
  },
  "moveOut": {
    "heading": "Flyttevask",
    "description": "En grundig rengjøring som skal gjøre boligen klar for neste eier eller leietaker. Se fastprisene etter boligens areal og tilleggene nedenfor.",
    "tableCaption": "Fastpriser for flyttevask",
    "areaLabel": "Areal",
    "priceLabel": "Pris",
    "upTo": "Opptil",
    "scope": {
      "heading": "Dette kan inngå i standard flyttevask",
      "description": "Oppgavene nedenfor inngår der de er relevante og trygt tilgjengelige. Utvendig vindusvask utføres bare der vinduene kan nås på en trygg måte.",
      "groups": [
        {
          "heading": "Rom og flater",
          "items": [
            "Tørrmopping eller støvtørking av tak og vegger",
            "Vask av dører, dørkarmer, lister og karmer",
            "Utvendig rengjøring av lysbrytere og stikkontakter",
            "Rengjøring av vinduskarmer",
            "Støvsuging og grundig våtvask av alle gulv",
            "Innvendig og utvendig vindusvask der det er trygt og tilgjengelig",
            "Rengjøring av ventiler"
          ]
        },
        {
          "heading": "Kjøkken",
          "items": [
            "Innvendig og utvendig vask av kjøkkenskap og skuffer",
            "Rengjøring av benkeplater",
            "Rengjøring av vaskekum og kraner"
          ]
        },
        {
          "heading": "Bad",
          "items": [
            "Vask av fliser og vegger",
            "Rengjøring av toalett og servant",
            "Rengjøring av dusj og/eller badekar",
            "Rengjøring av gulvsluk"
          ]
        }
      ]
    },
    "extrasHeading": "Tillegg til flyttevask",
    "extraLabels": {
      "appliances": "Hvitevarer",
      "balcony": "Balkong/veranda",
      "storage": "Bod/kjeller",
      "doubleWindows": "Doble vinduer / innglasset balkong",
      "blinds": "Persienner",
      "fireplace": "Peis"
    },
    "units": {
      "each": "per stk.",
      "squareMetre": "per m²",
      "window": "per vindu"
    },
    "furnishedLabel": "Møblert bolig",
    "furnishedSuffix": "av fastprisen i tillegg",
    "parkingHeading": "Parkering ved flyttevask",
    "parkingNote": "Hvis det ikke er gratis parkering ved boligen, kan parkeringsutgifter komme i tillegg til prisen for flyttevask."
  },
  "window": {
    "heading": "Vindusvask",
    "description": "Vi tilbyr privat vindusvask for eneboliger, rekkehus og leiligheter.",
    "items": [
      "Innvendig vindusvask",
      "Utvendig vindusvask der vinduene er trygt tilgjengelige"
    ]
  },
  "quote": {
      "eyebrow": "Be om tilbud",
      "heading": "Ønsker du et tilbud på renhold?",
      "description": "Send inn opplysninger om boligen og tjenesten du ønsker.",
      "primaryAction": "Be om tilbud",
      "secondaryAction": "Kontakt oss"
    }
},
  about: {
    imageAlt: "Bøtte med rengjøringsutstyr i et lyst soverom",
  "intro": {
    "eyebrow": "Om Vasky",
    "heading": "Renhold handler også om tillit.",
    "description": "Vi startet Vasky med en ambisjon om å ta med oss omtanken og sansen for detaljer fra hotellverdenen til hjemmene og bedriftene vi besøker. For oss handler det om nøye renhold, tydelig kommunikasjon og respekt for eiendommen din.",
    "secondaryAction": "Se våre tjenester"
  },
  "principles": {
      "eyebrow": "Slik ønsker vi å jobbe",
      "heading": "Omtanke i arbeidet og tydelige avtaler",
      "description": "Dette legger vi vekt på når vi tar på oss et oppdrag.",
      "items": [
        {
          "id": "communication",
          "title": "Tydelige avtaler",
          "description": "Vi går gjennom hvilke oppgaver som skal gjøres. Eventuelle endringer avtaler vi med deg."
        },
        {
          "id": "care",
          "title": "Grundig arbeid",
          "description": "Vi legger vekt på detaljene i oppgavene vi har avtalt."
        },
        {
          "id": "respect",
          "title": "Respekt for eiendommen din",
          "description": "Vi lytter til ønsker og praktiske hensyn som er viktige for deg."
        }
      ]
    },
  "quote": {
      "eyebrow": "Ta kontakt",
      "heading": "Vil du vite mer?",
      "description": "Spør oss om tjenestene, eller send en forespørsel om tilbud.",
      "primaryAction": "Be om tilbud",
      "secondaryAction": "Kontakt oss"
    }
},
  services: {
    imageAlt: "Renholder som støvsuger et teppe i en lys stue",
  "intro": {
      "eyebrow": "Våre tjenester",
      "heading": "Renhold for hjemmet",
      "description": "Velg mellom husvask, flyttevask og vindusvask. På prissiden finner du detaljerte oversikter over hva som inngår."
    },
  "pricingAction": "Se priser og hva som inngår",
  "items": [
      {
        "id": "home",
        "title": "Husvask",
        "description": "For deg som ønsker hjelp med rengjøringen hjemme.",
        "scope": [
          "Rengjøring av tilgjengelige flater, kjøkken og bad",
          "Støvsuging og gulvvask"
        ],
        "action": "Be om tilbud på husvask"
      },
      {
        "id": "move-out",
        "title": "Flyttevask",
        "description": "For deg som skal flytte og vil gjøre boligen klar for overlevering.",
        "scope": [
          "Grundig rengjøring av rom, kjøkken og bad",
          "Vindusvask der vinduene er trygt tilgjengelige"
        ],
        "action": "Be om tilbud på flyttevask"
      },
      {
        "id": "window",
        "title": "Vindusvask",
        "description": "Vindusvask for eneboliger, rekkehus og leiligheter.",
        "scope": [
          "Innvendig vindusvask",
          "Utvendig vindusvask der tilgangen er trygg"
        ],
        "action": "Be om tilbud på vindusvask"
      }
    ],
  "choosing": {
      "heading": "Usikker på hva du skal velge?",
      "description": "Velg «Usikker» i tilbudsskjemaet, så hjelper vi deg videre.",
      "action": "Gå til tilbudsskjemaet"
    },
},
  home: {
    hero: {
      eyebrow: "Renhold i Oslo og nærliggende områder",
      heading: "Rene rom. Trygge hender.",
      description: "Husvask, flyttevask og vindusvask med omtanke for hjemmet ditt. Vi legger vekt på grundig arbeid og tydelige avtaler.",
      primaryAction: "Be om tilbud",
      secondaryAction: "Se våre tjenester",
      imageAlt: "Renholder støvsuger et teppe i en lys stue.",
    },
    services: {
      eyebrow: "Våre tjenester",
      heading: "Hva vil du ha hjelp med?",
      description: "Her er våre tre tjenester for hjemmet. Se hva de omfatter, og finn priser på prissiden.",
      items: [
        {
          "id": "home",
          "title": "Husvask",
          "description": "Rengjøring av rom, kjøkken og bad i hjemmet ditt.",
          "imageAlt": "Rengjort kjøkken med trepanel, grønne skap og tregulv."
        },
        {
          "id": "move-out",
          "title": "Flyttevask",
          "description": "Grundig rengjøring av boligen før overlevering til neste eier eller leietaker.",
          "imageAlt": "Rengjort stue med trepanel, sofaer og salongbord."
        },
        {
          "id": "window",
          "title": "Vindusvask",
          "description": "Vask av vinduer hjemme, innvendig og utvendig der tilgangen er trygg.",
          "imageAlt": "Renholder vasker et vindu med nal."
        }
      ],
    },
    process: {
      eyebrow: "Fra forespørsel til tilbud",
      heading: "Slik får du et tilbud",
      steps: [
        {
          "id": "request",
          "title": "Send en forespørsel",
          "description": "Fyll ut tilbudsskjemaet med det du vet om oppdraget."
        },
        {
          "id": "clarify",
          "title": "Vi går gjennom detaljene",
          "description": "Vi tar kontakt om oppgaver, tidspunkt og praktiske hensyn."
        },
        {
          "id": "quote",
          "title": "Vurder tilbudet",
          "description": "Du får et tilbud å ta stilling til. En forespørsel er ikke en bestilling."
        }
      ],
    },
    quote: {
      "eyebrow": "Be om tilbud",
      "heading": "Klar for å få hjelp med renholdet?",
      "description": "Send en forespørsel, eller ta kontakt hvis du har spørsmål.",
      "primaryAction": "Be om tilbud",
      "secondaryAction": "Kontakt oss"
    },
  },
  privacy: {
    heading: "Personvern og informasjonskapsler",
    authorityLink: "Les om rettighetene dine hos Datatilsynet",
    sections: [
      {
        id: "privacy",
        heading: "Personvern",
        paragraphs: ["Vasky behandler personopplysninger når du kontakter oss eller sender inn tilbudsskjemaet. Her forklarer vi hvilke opplysninger nettsiden tar imot, hvordan de brukes, og hvordan du kan kontakte oss om personvern."],
      },
      {
        id: "information",
        heading: "Opplysninger du sender til oss",
        paragraphs: ["I tilbudsskjemaet må du oppgi navn, e-postadresse og ønsket rengjøringstjeneste. De øvrige feltene er valgfrie:"],
        items: [
          "Telefonnummer",
          "Type bolig eller lokale",
          "Omtrentlig størrelse",
          "Antall rom",
          "Postnummer, sted eller område",
          "Hvor ofte du ønsker renhold",
          "Ønsket tidspunkt, skrevet som dato eller periode i et tekstfelt",
          "Tilleggsopplysninger om behovet ditt",
        ],
        note: "Skjemaet krever ikke en gateadresse. Språket du bruker på nettsiden og en teknisk identifikator for innsendingen behandles også når forespørselen sendes. Opplysninger du deler i e-post eller annen kontakt med oss, inngår i henvendelsen din.",
      },
      {
        id: "purpose",
        heading: "Hvorfor vi behandler opplysningene",
        paragraphs: ["Vi bruker opplysningene til å ta imot henvendelsen, vurdere renholdet du ønsker, utarbeide og svare på tilbudsforespørselen og kommunisere med deg om oppdraget."],
      },
      {
        id: "delivery",
        heading: "Hvordan forespørselen sendes",
        paragraphs: [
          "Når du sender inn tilbudsskjemaet, behandles forespørselen gjennom nettsiden og sendes til Vaskys e-postadresse, post@vasky-renhold.no.",
          "Vi bruker eksterne tekniske tjenesteleverandører for å drifte nettsiden og levere henvendelser. Resend brukes nå til å sende e-post fra tilbudsskjemaet. Opplysningene i forespørselen behandles av denne tjenesten som del av e-postleveringen.",
        ],
      },
      {
        id: "retention",
        heading: "Lagring",
        paragraphs: [
          "Vaskys nettside lagrer ikke tilbudsforespørsler i en egen applikasjonsdatabase. Forespørsler leveres som e-post og kan derfor bli liggende i Vaskys e-postkasse og i relevante systemer hos tjenesteleverandørene.",
          "Opplysninger skal ikke oppbevares lenger enn nødvendig for å håndtere henvendelsen og ivareta relevante forretningsmessige og rettslige forpliktelser. Vi oppgir ikke en fast slettefrist her. Kontakt oss hvis du har spørsmål om lagring av din henvendelse.",
        ],
      },
      {
        id: "cookies",
        heading: "Informasjonskapsler",
        paragraphs: [
          "Den nåværende Vasky-nettsiden setter ikke bevisst informasjonskapsler og bruker ikke analyse- eller reklameinformasjonskapsler, markedsføringspiksler eller lignende valgfrie sporingsteknologier. Nettsiden lagrer heller ikke sporingsopplysninger i nettleserens lokale lagring eller øktlagring.",
          "Vanlig teknisk behandling skjer likevel når nettleseren og tjenestene som drifter nettsiden, overfører og viser innhold. Dette kan omfatte nettverksopplysninger og nettleserens mellomlagring av filer. Det betyr ikke at ingen tekniske opplysninger behandles.",
          "Hvis vi senere tar i bruk valgfri analyse- eller markedsføringsteknologi, oppdaterer vi informasjonen og innfører en løsning for samtykke der det er påkrevd, før teknologien tas i bruk.",
        ],
      },
      {
        id: "links",
        heading: "Eksterne lenker",
        paragraphs: ["Nettsiden lenker til tjenester som Facebook og Mittanbud. Dette er vanlige lenker, ikke innebygde sporingsverktøy på Vaskys nåværende nettside. Når du følger en ekstern lenke, gjelder den aktuelle tjenestens egne regler og praksis for personvern og informasjonskapsler."],
      },
      {
        id: "rights",
        heading: "Dine rettigheter",
        paragraphs: ["Avhengig av situasjonen og grunnlaget for behandlingen kan du ha rett til innsyn, retting, sletting og begrensning av behandlingen, og til å protestere der det er aktuelt. Kontakt oss hvis du vil bruke rettighetene dine eller har spørsmål om hvordan opplysningene dine behandles.", "Du kan klage til Datatilsynet, som er tilsynsmyndighet for personvern i Norge."],
      },
      {
        id: "contact",
        heading: "Kontakt",
        paragraphs: ["Har du spørsmål om personvern eller henvendelsen din, kan du kontakte Vasky:"],
      },
      {
        id: "updates",
        heading: "Oppdateringer",
        paragraphs: ["Vi kan oppdatere denne informasjonen hvis nettsiden, tjenesteleverandørene eller måten vi behandler opplysninger på, endres."],
      },
    ],
  },
  shell: {
    skipToContent: "Hopp til innhold",
    homeLabel: "Vasky – forsiden",
    primaryNavigation: "Hovedmeny",
    footerNavigation: "Navigasjon i bunntekst",
    footer: { homeLabel: "Hjem", quickLinksHeading: "Hurtiglenker" },
    menu: "Meny",
    navigation: {
      home: "Forside",
      services: "Tjenester",
      pricing: "Priser",
      about: "Om oss",
      contact: "Kontakt",
      quote: "Be om tilbud",
      privacy: "Personvern og informasjonskapsler",
    },
  },
  placeholder: "Denne siden er under utvikling. Innhold og funksjoner kommer senere.",
  languageSwitcher: {
    label: "Velg språk",
    languages: {
      nb: { shortLabel: "NO", accessibleLabel: "Norsk bokmål" },
      en: { shortLabel: "EN", accessibleLabel: "English" },
    },
  },
  pages: {
    privacy: { heading: "Personvern og informasjonskapsler", title: "Personvern og informasjonskapsler | Vasky", description: "Informasjon om personopplysninger, tilbudsforespørsler og informasjonskapsler på Vaskys nettside." },
    home: { heading: "Vasky", title: "Renhold i Oslo og nærliggende områder | Vasky", description: "Vasky tilbyr husvask, flyttevask og vindusvask i Oslo og nærliggende områder. Se tjenester og priser, eller be om et tilbud på renhold." },
    services: { heading: "Tjenester", title: "Husvask, flyttevask og vindusvask | Vasky", description: "Utforsk Vaskys rengjøringstjenester for boliger i Oslo og nærliggende områder. Se hva husvask, flyttevask og vindusvask omfatter." },
    pricing: { heading: "Priser", title: "Priser på husvask, flyttevask og vindusvask | Vasky", description: `Husvask ${pricingRates.homeHourly} kr/time og vindusvask ${pricingRates.windowHourly} kr/time. Se fastpriser for flyttevask og tilleggstjenester. Alle priser er inkl. MVA.` },
    about: { heading: "Om oss", title: "Om Vasky | Renhold i Oslo og nærliggende områder", description: "Bli kjent med Vasky i Lommedalen og vår tilnærming til renhold: omtanke for hjemmet ditt, grundig arbeid og tydelige avtaler." },
    contact: { heading: "Kontakt", title: "Kontakt Vasky | Renhold i Oslo", description: "Kontakt Vasky på telefon eller e-post om renhold i Oslo og nærliggende områder. Vi holder til i 1350 Lommedalen. Send gjerne en tilbudsforespørsel." },
    quote: { heading: "Be om tilbud", title: "Be om tilbud på renhold | Vasky", description: "Be om tilbud på husvask, flyttevask eller vindusvask i Oslo og nærliggende områder. Beskriv boligen og behovet ditt i Vaskys tilbudsskjema." },
  },
} satisfies Dictionary;
