import type { Dictionary } from "./types";

export const en = {
  business: {
    organizationLabel: "Org. no.",
    phoneLabel: "Phone",
    "emailLabel": "Email",
    "areaLabel": "Service area",
    "serviceArea": "Oslo and nearby areas",
    "commercial": {
      "heading": "Cleaning for your business?",
      "description": "We also welcome enquiries about cleaning commercial premises. We assess each job individually. Contact us to discuss whether we can help.",
      "action": "Contact us about business cleaning"
    }
  },
  quote: {
    imageAlt: "Quote form on a clipboard beside cleaning cloths and a spray bottle",
    intro: {
      eyebrow: "Request a quote",
      heading: "Tell us what you need",
      description: "Use the form to request a cleaning quote. You can choose “Not sure” if you need help selecting a service.",
    },
    form: {
      heading: "About you and the work",
      requiredNote: "Fields marked * are required. Everything else is optional.",
      optional: "optional",
      groups: { contact: "Contact details", job: "Your cleaning needs", details: "A little more detail" },
      labels: {
        name: "Name", email: "Email", phone: "Phone number", service: "Type of cleaning",
        property: "Property type (e.g. apartment, house or office)", size: "Approximate size in m²", rooms: "Number of rooms",
        location: "Postcode, town or area", frequency: "Frequency", timing: "Preferred date or period", details: "What would you like help with?",
      },
      serviceOptions: { home: "Home cleaning", "move-out": "Move-out cleaning", window: "Window cleaning", other: "Other", unsure: "Not sure" },
      frequencyOptions: { once: "One-time", recurring: "Recurring", unsure: "Not sure" },
      choose: "Choose an option",
      helpers: { timing: "A date or a period is fine. This does not confirm availability.", details: "Include tasks, priorities and access considerations. Up to 3000 characters." },
      expectation: "An enquiry is not a booking. Scope and timing still need to be confirmed before work is agreed.",
      privacyNotice: "When you submit the form, we use your information to process your enquiry and contact you.",
      privacyLink: "Read about privacy",
      honeypot: "Leave this field empty",
      noScript: "Enable JavaScript to send an enquiry. No information has been sent.",
      submit: "Send enquiry",
      pending: "Sending your enquiry …",
      errorHeading: "Please check these fields",
      errors: {
        required: "Complete this field.", email: "Enter an email address, such as name@domain.com.",
        phone: "Enter a phone number with at least five digits. You can include a country code, spaces and brackets.",
        number: "Enter a positive number. Rooms must be a whole number; size can have up to two decimal places.",
        choice: "Choose or enter a valid value.", tooLong: "This entry is too long. Please shorten it.",
      },
      success: "Thank you. Your enquiry has been sent to Vasky. This is not a confirmed booking.",
      failure: "We could not confirm that your enquiry was sent. Your entries are still in the form. Please try again.",
    },
    help: { heading: "Not sure what you need?", contact: "Visit the contact page", services: "Explore our services" },
  },
  contact: {
    imageAlt: "Desk with a laptop and phone beside a window",
    "intro": {
      "eyebrow": "Contact",
      "heading": "Contact Vasky",
      "description": "Have a question about cleaning? Send us an email."
    },
    "quote": {
      "heading": "Looking for a quote?",
      "description": "Use our quote form to send the details of the cleaning you would like.",
      "action": "Request a quote"
    }
  },
  pricing: {
    imageAlt: "Desk with a laptop, notebook and pen",
  vatNote: "All prices include VAT.",
  "intro": {
    "eyebrow": "Pricing",
    "heading": "Cleaning prices",
    "description": "See hourly rates for home and window cleaning, fixed move-out prices and what each service includes. The prices below apply to residential cleaning.",
    "primaryAction": "Request a quote",
  },
  "hourlyUnit": "per hour",
  "home": {
    "heading": "Home cleaning",
    "scope": {
      "heading": "Standard home cleaning includes",
      "description": "Where relevant to your home, standard cleaning covers the following tasks. You can discuss any additional needs with us.",
      "groups": [
        {
          "heading": "Rooms and surfaces",
          "items": [
            "Dusting accessible surfaces and frames",
            "Cleaning kitchen surfaces and the outside of kitchen units",
            "Cleaning the exterior of bathroom fittings and sanitary fixtures",
            "Vacuuming furniture, carpets and floors",
            "Mopping floors"
          ]
        }
      ]
    },
    "timeHeading": "Indicative cleaning times",
    "timeNote": "These are estimates, not guaranteed completion times. Actual time depends on size, condition and scope. A tidy home can generally be cleaned faster than one where belongings need to be moved during cleaning.",
    "estimates": [
      {
        "home": "Small home / apartment",
        "area": "Approx. 50–80 m²",
        "time": "Approx. 1.5–2.5 hours"
      },
      {
        "home": "Standard home",
        "area": "Approx. 90–140 m²",
        "time": "Approx. 2–4 hours"
      },
      {
        "home": "Larger home",
        "area": "Approx. 150–200+ m²",
        "time": "Approx. 4–6 hours"
      }
    ]
  },
  "moveOut": {
    "heading": "Move-out cleaning",
    "description": "A thorough clean to prepare the home for its next owner or tenant. Fixed prices are based on floor area; additional services are listed below.",
    "tableCaption": "Fixed prices for move-out cleaning",
    "areaLabel": "Floor area",
    "priceLabel": "Price",
    "upTo": "Up to",
    "scope": {
      "heading": "What standard move-out cleaning can include",
      "description": "The following tasks are included where relevant and safely accessible. Exterior windows are cleaned only where they can be reached safely.",
      "groups": [
        {
          "heading": "Rooms and surfaces",
          "items": [
            "Dry mopping or dusting ceilings and walls",
            "Cleaning doors, door frames, skirting boards and trim",
            "Cleaning the outside of light switches and electrical outlets",
            "Cleaning window frames and sills",
            "Vacuuming and thoroughly wet-mopping all floors",
            "Interior and exterior window cleaning where safely accessible",
            "Cleaning vents"
          ]
        },
        {
          "heading": "Kitchen",
          "items": [
            "Cleaning kitchen cupboards and drawers inside and out",
            "Cleaning worktops",
            "Cleaning the sink and taps"
          ]
        },
        {
          "heading": "Bathroom",
          "items": [
            "Cleaning tiles and walls",
            "Cleaning the toilet and washbasin",
            "Cleaning the shower and/or bathtub",
            "Cleaning floor drains"
          ]
        }
      ]
    },
    "extrasHeading": "Move-out cleaning extras",
    "extraLabels": {
      "appliances": "Appliances",
      "balcony": "Balcony/veranda",
      "storage": "Storage room/basement",
      "doubleWindows": "Double windows / glazed balcony",
      "blinds": "Blinds",
      "fireplace": "Fireplace"
    },
    "units": {
      "each": "each",
      "squareMetre": "per m²",
      "window": "per window"
    },
    "furnishedLabel": "Furnished property",
    "furnishedSuffix": "of the fixed price added",
    "parkingHeading": "Parking for move-out cleaning",
    "parkingNote": "If free parking is not available at the property, parking charges may be added to the move-out cleaning price."
  },
  "window": {
    "heading": "Window cleaning",
    "description": "Window cleaning for detached houses, terraced houses and apartments.",
    "items": [
      "Interior window cleaning",
      "Exterior window cleaning where windows are safely accessible"
    ]
  },
  "quote": {
      "eyebrow": "Request a quote",
      "heading": "Would you like a cleaning quote?",
      "description": "Send us the details of your property and the service you would like.",
      "primaryAction": "Request a quote",
      "secondaryAction": "Contact us"
    }
},
  about: {
    imageAlt: "Caddy of cleaning supplies in a bright bedroom",
  "intro": {
    "eyebrow": "About Vasky",
    "heading": "Cleaning starts with trust.",
    "description": "We started Vasky with the ambition of bringing a hotel-inspired standard of care to the homes and businesses we serve. That means an approach built around careful cleaning, attention to detail, clear communication and respect for your property.",
    "secondaryAction": "Explore our services"
  },
  "principles": {
      "eyebrow": "How we aim to work",
      "heading": "Careful work and clear agreements",
      "description": "These principles guide how we approach each job.",
      "items": [
        {
          "id": "communication",
          "title": "Clear agreements",
          "description": "We discuss which tasks to include and agree any changes with you."
        },
        {
          "id": "care",
          "title": "Thorough work",
          "description": "We pay attention to the details of the tasks we have agreed to carry out."
        },
        {
          "id": "respect",
          "title": "Respect for your property",
          "description": "We listen to your preferences and the practical considerations that matter to you."
        }
      ]
    },
  "quote": {
      "eyebrow": "Get in touch",
      "heading": "Would you like to know more?",
      "description": "Ask us about our services, or send a quote enquiry.",
      "primaryAction": "Request a quote",
      "secondaryAction": "Contact us"
    }
},
  services: {
    imageAlt: "Cleaner vacuuming a rug in a bright living room",
  "intro": {
      "eyebrow": "Our services",
      "heading": "Cleaning for your home",
      "description": "Choose from home cleaning, move-out cleaning and window cleaning. The Pricing page lists everything included in each service."
    },
  "pricingAction": "See prices and what’s included",
  "items": [
      {
        "id": "home",
        "title": "Home cleaning",
        "description": "For help with cleaning around the home.",
        "scope": [
          "Cleaning accessible surfaces, kitchens and bathrooms",
          "Vacuuming and mopping floors"
        ],
        "action": "Request a home cleaning quote"
      },
      {
        "id": "move-out",
        "title": "Move-out cleaning",
        "description": "For when you are moving out and preparing your home for handover.",
        "scope": [
          "Thorough cleaning of rooms, kitchens and bathrooms",
          "Window cleaning where windows are safely accessible"
        ],
        "action": "Request a move-out cleaning quote"
      },
      {
        "id": "window",
        "title": "Window cleaning",
        "description": "Window cleaning for detached houses, terraced houses and apartments.",
        "scope": [
          "Interior window cleaning",
          "Exterior window cleaning where access is safe"
        ],
        "action": "Request a window cleaning quote"
      }
    ],
  "choosing": {
      "heading": "Not sure which service to choose?",
      "description": "Select “Not sure” in the quote form and we can help you decide.",
      "action": "Go to the quote form"
    },
},
  home: {
    hero: {
      eyebrow: "Cleaning in Oslo and nearby areas",
      heading: "Clean spaces. Trusted hands.",
      description: "Home cleaning, move-out cleaning and window cleaning with care for your home. We focus on thorough work and clear agreements.",
      primaryAction: "Request a quote",
      secondaryAction: "Explore our services",
      imageAlt: "A cleaner vacuuming a rug in a bright living room.",
    },
    services: {
      eyebrow: "Our services",
      heading: "What would you like help with?",
      description: "Explore our three services for the home. Visit the Pricing page for rates and a full list of what’s included.",
      items: [
        {
          "id": "home",
          "title": "Home cleaning",
          "description": "Cleaning for the rooms, kitchen and bathrooms in your home.",
          "imageAlt": "A cleaner mopping a wooden floor in a bright living room."
        },
        {
          "id": "move-out",
          "title": "Move-out cleaning",
          "description": "A thorough clean before handing over your home to its next owner or tenant.",
          "imageAlt": "A cleaned living room with wood-panelled walls, sofas and a coffee table."
        },
        {
          "id": "window",
          "title": "Window cleaning",
          "description": "Window cleaning for your home, inside and outside where access is safe.",
          "imageAlt": "A cleaner washing a window with a squeegee."
        }
      ],
    },
    process: {
      eyebrow: "From enquiry to quote",
      heading: "How to get a quote",
      steps: [
        {
          "id": "request",
          "title": "Send an enquiry",
          "description": "Complete the quote form with the details you have about the job."
        },
        {
          "id": "clarify",
          "title": "We discuss the details",
          "description": "We get in touch about the tasks, timing and practical arrangements."
        },
        {
          "id": "quote",
          "title": "Consider your quote",
          "description": "You receive a quote to review. Sending an enquiry does not confirm a booking."
        }
      ],
    },
    quote: {
      "eyebrow": "Request a quote",
      "heading": "Ready for help with the cleaning?",
      "description": "Send an enquiry, or contact us if you have a question.",
      "primaryAction": "Request a quote",
      "secondaryAction": "Contact us"
    },
  },
  privacy: {
    heading: "Privacy & Cookies",
    authorityLink: "Read about your rights at Datatilsynet",
    sections: [
      {
        id: "privacy",
        heading: "Privacy",
        paragraphs: ["Vasky processes personal information when you contact us or submit the quote form. This page explains what information the website receives, how it is used, and how to contact us about privacy."],
      },
      {
        id: "information",
        heading: "Information you send us",
        paragraphs: ["The quote form requires your name, email address and the cleaning service you would like. The remaining fields are optional:"],
        items: [
          "Phone number",
          "Property type",
          "Approximate size",
          "Number of rooms",
          "Postcode, town or area",
          "How often you would like cleaning",
          "Preferred timing, entered as a date or period in a text field",
          "Additional details about your needs",
        ],
        note: "The form does not require a street address. Your website language and a technical submission identifier are also processed when the enquiry is sent. Information you share by email or when contacting us in other ways forms part of your enquiry.",
      },
      {
        id: "purpose",
        heading: "Why we use your information",
        paragraphs: ["We use your information to receive your enquiry, assess the cleaning work you would like, prepare and respond to your quote request, and communicate with you about the work."],
      },
      {
        id: "delivery",
        heading: "How your enquiry is sent",
        paragraphs: [
          "When you submit the quote form, your enquiry is processed through the website and sent to Vasky's business email address, post@vasky-renhold.no.",
          "We use external technical service providers to operate the website and deliver enquiries. Resend currently sends email from the quote form and processes the information in your enquiry as part of email delivery.",
        ],
      },
      {
        id: "retention",
        heading: "Storage",
        paragraphs: [
          "The Vasky website does not store quote submissions in an application database. Enquiries are delivered by email and may therefore remain in Vasky's business mailbox and relevant service-provider systems.",
          "Information should not be kept longer than necessary to handle the enquiry and meet relevant business and legal obligations. This page does not specify a fixed deletion period. Contact us if you have questions about how your enquiry is retained.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: [
          "The current Vasky website does not intentionally set cookies or use analytics cookies, advertising cookies, marketing pixels or similar optional tracking technologies. It does not store tracking information in your browser's local storage or session storage either.",
          "Ordinary technical processing still takes place when your browser and the services operating the website transfer and display content. This may include network information and your browser caching files. It does not mean that no technical information is processed.",
          "If we later introduce optional analytics or marketing technology, we will update this information and introduce a consent mechanism where required before that technology is used.",
        ],
      },
      {
        id: "links",
        heading: "External links",
        paragraphs: ["The website links to services such as Facebook and Mittanbud. These are ordinary outbound links, not embedded tracking tools on the current Vasky website. Once you follow an external link, that service's own privacy and cookie practices apply."],
      },
      {
        id: "rights",
        heading: "Your rights",
        paragraphs: ["Depending on the circumstances and the basis for processing, your rights may include access, correction, deletion, restriction of processing and objection where applicable. Contact us if you wish to exercise your rights or have questions about how your information is processed.", "You can lodge a complaint with Datatilsynet, the Norwegian Data Protection Authority."],
      },
      {
        id: "contact",
        heading: "Contact",
        paragraphs: ["If you have questions about privacy or your enquiry, you can contact Vasky:"],
      },
      {
        id: "updates",
        heading: "Updates",
        paragraphs: ["We may update this information if the website, service providers or the way we process information changes."],
      },
    ],
  },
  shell: {
    skipToContent: "Skip to content",
    homeLabel: "Vasky – home",
    primaryNavigation: "Main navigation",
    footerNavigation: "Footer navigation",
    footer: { homeLabel: "Home", quickLinksHeading: "Quick links" },
    menu: "Menu",
    navigation: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      quote: "Request a quote",
      privacy: "Privacy & cookies",
    },
  },
  placeholder: "This page is under development. Content and features will be added later.",
  languageSwitcher: {
    label: "Choose language",
    languages: {
      nb: { shortLabel: "NO", accessibleLabel: "Norsk bokmål" },
      en: { shortLabel: "EN", accessibleLabel: "English" },
    },
  },
  pages: {
    privacy: { heading: "Privacy & Cookies", title: "Privacy & Cookies | Vasky", description: "Information about personal data, quote enquiries and cookies on the Vasky website." },
    home: { heading: "Vasky", title: "Vasky | Cleaning for homes and workplaces", description: "Cleaning for homes and workplaces. Explore home cleaning, move-out cleaning and window cleaning with Vasky." },
    services: { heading: "Services", title: "Cleaning services | Vasky", description: "Explore home cleaning, move-out cleaning and window cleaning. Tell us what you need so we can clarify the scope before preparing a quote." },
    pricing: { heading: "Pricing", title: "Pricing | Vasky", description: "View hourly rates for home and window cleaning, fixed move-out cleaning prices and additional services at Vasky." },
    about: { heading: "About us", title: "About us | Vasky", description: "Learn about Vasky’s approach to cleaning: clear communication, respect for homes and workplaces, and an agreed scope before work begins." },
    contact: { heading: "Contact", title: "Contact | Vasky", description: "Prepare a cleaning enquiry for Vasky. Learn which details are helpful and how we discuss your needs and practical arrangements." },
    quote: { heading: "Request a quote", title: "Request a quote | Vasky", description: "Describe the cleaning you need and share the key details about the work." },
  },
} satisfies Dictionary;
