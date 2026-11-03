/**
 * Centralized site content for Școala Auto GLG Property.
 * Two full dictionaries (ro / ru); the active one is served by LanguageProvider.
 */

export const site = {
  name: "GLG Property",
  shortName: "GLG",
  phone: "069 792 889",
  phoneHref: "tel:+37369792889",
  /** Numărul în format internațional, fără semne (pentru wa.me / t.me). */
  phoneDigits: "37369792889",
  email: "scoalaauto.glgproperty@gmail.com",
  emailHref: "mailto:scoalaauto.glgproperty@gmail.com",
  social: {
    facebook: "https://www.facebook.com/scoalaautoBuiucani/",
    instagram: "https://www.instagram.com/glgproperty/?hl=ro",
    tiktok: "https://www.tiktok.com/@glgproperty",
  },
};

/**
 * Mesagerie. WhatsApp merge pe numărul școlii (wa.me deschide chat-ul chiar
 * dacă aplicația nu e instalată, din browser).
 *
 * Telegram rămâne GOL intenționat: școala nu are (încă) un cont public
 * confirmat, iar un link `t.me` greșit duce la „user not found”, adică un link
 * mort în antet, în bara de mobil și în secțiunea Contact. Când există contul,
 * se pune aici adresa lui (ex. "https://t.me/scoalaautoglg") și butoanele apar
 * singure în toate cele patru locuri, fără alte modificări.
 */
export const messengers: { whatsapp: string; telegram: string } = {
  whatsapp: `https://wa.me/37369792889`,
  telegram: "",
};

/** Linkul de WhatsApp cu mesajul deja scris (în limba paginii). */
export function whatsappHref(text: string): string {
  return `${messengers.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type Lang = "ro" | "ru";
export const langs: Lang[] = ["ro", "ru"];
export const langNames: Record<Lang, string> = { ro: "Română", ru: "Русский" };

type Cta = { label: string; href: string };
type NavItem = { label: string; href: string };
/** O persoană din organigramă; `initials` lipsă = se deduc din nume. */
export type TeamPerson = {
  name: string;
  role: string;
  initials?: string;
  /** Fotografia din /public/echipa (pătrată, 400x400); lipsă = avatar cu inițiale. */
  photo?: string;
};

export type Plan = {
  name: string;
  badge?: string;
  tagline: string;
  category: string;
  features: string[];
};

export type EnrollDict = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  optional: string;
  /** Eticheta butonului „?” (accesibilitate) și explicațiile per câmp. */
  helpLabel: string;
  help: {
    lastName: string;
    firstName: string;
    idnp: string;
    birthDate: string;
    sex: string;
    citizenship: string;
    phoneMobile: string;
    email: string;
    phoneHome: string;
    phoneFamily: string;
    raion: string;
    locality: string;
    street: string;
    number: string;
    apartment: string;
    idSeries: string;
    idNumber: string;
    idIssuedDate: string;
    idIssuedBy: string;
    licenseNumber: string;
    licenseIssued: string;
    sediu: string;
    studyLanguage: string;
    slot: string;
    category: string;
    transmission: string;
    workplace: string;
    referral: string;
  };
  sections: {
    personal: string;
    contact: string;
    address: string;
    documents: string;
    course: string;
  };
  fields: {
    lastName: string;
    firstName: string;
    citizenship: string;
    citizenshipPlaceholder: string;
    idnp: string;
    idnpHint: string;
    birthDate: string;
    sex: string;
    sexM: string;
    sexF: string;
    email: string;
    phoneMobile: string;
    phoneHome: string;
    phoneFamily: string;
    phoneFamilyPlaceholder: string;
    raion: string;
    locality: string;
    street: string;
    number: string;
    apartment: string;
    idSeries: string;
    idNumber: string;
    idIssuedBy: string;
    idIssuedDate: string;
    workplace: string;
    referral: string;
    referralRecommendation: string;
    referralSocial: string;
    category: string;
    studyLanguage: string;
    langRo: string;
    langRu: string;
    transmission: string;
    transmissionManual: string;
    transmissionAuto: string;
    sediu: string;
    sediuPlaceholder: string;
    slot: string;
    slotPickSediu: string;
    slotSaturday: string;
    noOpenGroups: string;
    slotDaysHint: string;
    /** Umplerea grupei (punct colorat): verde / galben / roșu. */
    fillSpots: string;
    fillAlmost: string;
    fillFull: string;
    /** Explicația culorilor de lângă grupe. */
    fillLegend: string;
    scheduleOther: string;
    schedule: string;
    schedulePlaceholder: string;
    practiceLocation: string;
    practiceLocationPlaceholder: string;
    license: string;
    licenseNumber: string;
    licenseIssued: string;
    licenseIssuedPlaceholder: string;
    /** Pozele buletinului (față obligatorie, verso opțional). */
    idPhoto: string;
    idPhotoFront: string;
    idPhotoBack: string;
    idPhotoHint: string;
    idPhotoTake: string;
    idPhotoChoose: string;
    idPhotoProcessing: string;
    idPhotoChange: string;
    idPhotoRemove: string;
    idPhotoPdf: string;
  };
  /** Blocul „Contractul de studii”: PDF gol de citit + bifa obligatorie. */
  contract: {
    title: string;
    text: string;
    view: string;
    agree: string;
  };
  consent: string;
  consentLinkLabel: string;
  consentSuffix: string;
  /** Rezumatul regulii de rezervare, chiar înaintea butonului de trimitere. */
  reserveNotice: { title: string; text: string };
  submit: string;
  submitting: string;
  callOption: string;
  /** Mesajul de sus când datele vin din formularul scurt al primei pagini. */
  prefillNotice: string;
  errors: {
    required: string;
    idnp: string;
    email: string;
    phone: string;
    date: string;
    consent: string;
    contract: string;
    photoMissing: string;
    fileTooBig: string;
    fileType: string;
    checkField: string;
    noRuGroup: string;
    formInvalid: string;
    serverInvalid: string;
    captcha: string;
    rateLimited: string;
    generic: string;
    network: string;
  };
  /**
   * Ecranul de după trimiterea cererii: „Verifică-ți emailul”, termenul de 24
   * de ore și cele două butoane de plată. Emailul poate întârzia sau poate să
   * nu plece deloc, de aceea linkurile de aici sunt calea sigură.
   */
  success: {
    title: string;
    text: string;
    /** „Am trimis linkurile de plată la” (urmează adresa completată). */
    sentTo: string;
    /** Ce face omul dacă emailul nu ajunge. */
    noEmail: string;
    /** Blocul cu termenul. */
    deadlineTitle: string;
    deadlineText: string;
    /** „Achită până” (urmează data și ora în fusul Chișinăului). */
    deadlinePrefix: string;
    /** Cuvântul dinaintea orei: „ora” / „в”. */
    deadlineTimeWord: string;
    /** Contorul discret: „mai ai 23 h 58 min”. */
    countdownPrefix: string;
    hoursShort: string;
    minutesShort: string;
    countdownExpired: string;
    /** Blocul cu cele două butoane de plată. */
    payTitle: string;
    payReserve: string;
    payReserveNote: string;
    payFull: string;
    payFullNote: string;
    /** Varianta „vin la sediu”. */
    officeTitle: string;
    officeText: string;
    officeCta: string;
    /** Plata e verificată de un angajat. */
    verifyTitle: string;
    verifyText: string;
    /** Ce se întâmplă dacă nu achită în 24 de ore. */
    missedTitle: string;
    missedText: string;
    duplicateTitle: string;
    duplicateText: string;
    back: string;
    call: string;
  };
};

export type Dict = {
  banner: { pre: string; amount: string; post: string; cta: string; close: string };
  nav: { items: NavItem[]; cta: Cta; menuAria: string; langAria: string };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    imageAlt: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    /** Ce putem susține despre plată (fără cifre inventate) + linkul la pachet. */
    priceLine: string;
    priceCta: Cta;
    /** Categoriile predate, ca etichete mici sub titlu (nu în titlu). */
    categoriesLabel: string;
    categories: string[];
    chips: string[];
  };
  /** Butoanele de mesagerie și bara fixă de pe telefon. */
  messengers: {
    whatsapp: string;
    /** Mesajul deja scris în WhatsApp. */
    whatsappText: string;
    telegram: string;
    bar: { call: string; enroll: string };
  };
  benefits: { icon: string; title: string; text: string; tag: string }[];
  stats: { value: number; suffix: string; label: string }[];
  cars: { badge: string; title: string; text: string; chips: string[]; cta: Cta; enrollCta: Cta };
  /** Secțiunea „Video": clipurile școlii din public/video/ (VideoReels.tsx). */
  videos: {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    fallback: string;
    items: { id: string; label: string }[];
  };
  /** „Echipa noastră”: organigrama pe nivele, fără poze (carduri cu inițiale). */
  team: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    /** Vârful organigramei (administrația). */
    root: TeamPerson;
    /** Nivelurile cu persoane numite (manageri, secretariat), de sus în jos. */
    levels: { label: string; people: TeamPerson[] }[];
    /** Echipele mari, doar cu număr (profesori, operatori, instructori). */
    groups: { label: string; count: string; note: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    imageAlt: string;
    items: { icon: string; title: string; text: string }[];
  };
  voucher: { badge: string; title: string; text: string; cta: Cta };
  pricing: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    categoryLabel: string;
    plan: Plan;
    enrollCta: Cta;
    note: string;
    noteCta: Cta;
    /** Categoriile din afara pachetului Standard: preț la telefon sau la sediu. */
    other: { title: string; text: string; categories: string[]; cta: Cta };
  };
  /** Formularul scurt de pe prima pagină (nume, telefon, sediu). */
  quick: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    sediu: string;
    sediuPlaceholder: string;
    consent: string;
    consentLinkLabel: string;
    consentSuffix: string;
    submit: string;
    note: string;
    callLabel: string;
    errors: { name: string; phone: string; sediu: string; consent: string };
  };
  enroll: EnrollDict;
  /**
   * „Procesul de înscriere”, pașii de la cerere până la prima lecție.
   * `warn` e chenarul de atenționare din pasul achitării (24 de ore).
   */
  steps: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    items: { icon: string; title: string; text: string; warn?: string; link?: Cta }[];
  };
  testimonials: { eyebrow: string; title: string; titleAccent: string; caption: string; videoFallback: string };
  faq: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cardQuestion: string;
    items: { q: string; a: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    callUs: string;
    hoursLabel: string;
    hours: string;
    /** Eticheta cardului de e-mail (adresa e scrisă vizibil lângă ea). */
    writeUs: string;
    followUs: string;
    mapBadge: string;
    mapTitle: string;
    mapConsentText: string;
    mapConsentCta: string;
    centersTitle: string;
    callNow: string;
    /** Centrele arătate pe hartă: numele, adresa și căutarea pentru Google Maps. */
    centers: { name: string; address: string; mapQuery: string }[];
    mapOpen: string;
  };
  footer: {
    heading: string;
    text: string;
    columns: { title: string; links: NavItem[] }[];
    rights: string;
    credit: string;
    privacy: string;
    terms: string;
    cookieSettings: string;
  };
  floating: { label: string; call: string };
  /** Secțiunea „Școală auto în Chișinău": text local, cu linkuri interne în notația [text](href). */
  guide: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paragraphs: string[];
  };
  notFound: {
    eyebrow: string;
    title: string;
    text: string;
    cta: Cta;
    home: Cta;
    linksTitle: string;
    links: NavItem[];
  };
  privacy: {
    title: string;
    updated: string;
    sections: { h: string; p: string }[];
  };
  terms: {
    title: string;
    updated: string;
    sections: { h: string; p: string }[];
  };
  cookies: {
    title: string;
    text: string;
    /** Textul scurt al benzii de jos (un rând pe desktop, maximum două pe mobil). */
    short: string;
    /** Linkul scurt din bandă („Detalii”), cu titlul complet în aria-label. */
    more: string;
    policyLabel: string;
    accept: string;
    acceptAll: string;
    necessaryOnly: string;
    prefs: string;
    save: string;
    categories: {
      necessary: { label: string; desc: string };
      media: { label: string; desc: string };
    };
  };
};

const ro: Dict = {
  banner: {
    pre: "Voucher cadou de",
    amount: "200 lei",
    post: "la înscrierea în sectoarele Botanica și Buiucani",
    cta: "Detalii",
    close: "Închide anunțul",
  },

  nav: {
    items: [
      { label: "Acasă", href: "/#acasa" },
      { label: "Despre noi", href: "/#despre" },
      { label: "Cursuri", href: "/#cursuri" },
      { label: "Informație înscriere", href: "/informatii-inscriere" },
      { label: "Echipa", href: "/#echipa" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/#contact" },
    ],
    cta: { label: "Înscrie-te", href: "/inscriere" },
    menuAria: "Meniu",
    langAria: "Schimbă limba",
  },

  hero: {
    eyebrow: "Școala Auto GLG Property din Republica Moldova",
    titleTop: "Școală auto în Chișinău",
    titleBottom: "pentru toate categoriile de permis",
    // Subtitlul rămâne scurt (mai scurt decât varianta testată la auditul
    // RAP-CVFM6G), ca butonul de înscriere să stea în primul ecran pe telefon.
    // Cele patru sedii apar explicit, cerința patronului din 31.10.2026.
    subtitle:
      "Instructori atestați, mașini moderne, grupe RO și RU. Chișinău Botanica, Chișinău Buiucani, Strășeni, Vorniceni.",
    imageAlt: "Sediul Școlii Auto GLG Property din Chișinău, sala de curs și dotările, în video",
    primaryCta: { label: "Înscrie-te online", href: "/inscriere" },
    secondaryCta: { label: site.phone, href: site.phoneHref },
    priceLine: "Pachetul Standard se achită în până la 25 de rate.",
    priceCta: { label: "Vezi prețul", href: "#preturi" },
    categoriesLabel: "Categorii",
    categories: ["A1", "A2", "A", "B1", "B", "C", "CE", "D"],
    chips: [
      "20.000+ absolvenți",
      "10 ani de experiență",
      "80+ instructori",
      "4 centre de instruire",
    ],
  },

  messengers: {
    whatsapp: "WhatsApp",
    whatsappText: "Bună ziua! Vreau detalii despre cursuri.",
    telegram: "Telegram",
    bar: { call: "Sună", enroll: "Înscrie-te" },
  },

  benefits: [
    {
      icon: "languages",
      title: "Grupe în română și rusă",
      text: "Grupe separate în limba română și în limba rusă. Alegi limba în care înveți.",
      tag: "RO / RU",
    },
    {
      icon: "car",
      title: "Mașini moderne Skoda",
      text: "Faci practica pe Skoda Fabia și Skoda Scala, bine întreținute, inclusiv pe traseele reale de examinare.",
      tag: "Fabia · Scala",
    },
    {
      icon: "wallet",
      title: "Plata în 25 de rate",
      text: "Cursul se poate achita în până la 25 de rate.",
      tag: "0% stres",
    },
  ],

  stats: [
    { value: 20000, suffix: "+", label: "Absolvenți" },
    { value: 10, suffix: "", label: "Ani de experiență" },
    { value: 80, suffix: "+", label: "Instructori" },
    { value: 4, suffix: "", label: "Centre: Botanica, Buiucani, Strășeni, Vorniceni" },
  ],

  // Parcul auto: cifra și modelele sunt cele din documentul oficial al școlii
  // („peste 50 de mijloace de transport”, pe categorii). Fără alte adăugiri.
  cars: {
    badge: "Parcul auto GLG",
    title: "Peste 50 de vehicule, întreținute impecabil",
    text: "Avem peste 50 de vehicule de instruire, pentru toate categoriile, cu cutie mecanică și automată. Înveți pe aceleași modele pe care vei susține examenul, pe traseele reale de examinare din Chișinău.",
    chips: [
      "B1, B, BE: Skoda Fabia, Skoda Scala, Toyota Yaris",
      "C1, C, C1E, CE: Volvo FE 320, Volvo FL 290, MAN",
      "D1, D, D1E, DE: Irisbus",
      "AM, A1, A2, A: Maya Motors, Andes",
    ],
    cta: { label: "Vezi pachetul", href: "#preturi" },
    enrollCta: { label: "Înscrie-te online", href: "/inscriere" },
  },

  videos: {
    eyebrow: "Video",
    title: "Școala auto GLG Property,",
    accent: "văzută din interior",
    subtitle: "Sediul, sala de curs, poligonul, mașinile și oamenii care te învață să conduci. Apasă Play pe orice clip.",
    fallback: "Browserul tău nu poate reda acest videoclip.",
    items: [
      { id: "despre-scoala", label: "Despre Școala Auto GLG Property" },
      { id: "sediu", label: "Sediul, sala de curs și dotările" },
      { id: "poligon", label: "Poligonul de instruire" },
      { id: "parc-auto", label: "Parcul auto: mașini noi Skoda" },
      { id: "pe-scurt", label: "GLG Property, pe scurt" },
      { id: "informatii", label: "Informații utile pentru cursanți" },
      { id: "interviu-cursanta", label: "Interviu la sediu, cu o cursantă" },
      { id: "interviu", label: "Interviu cu echipa GLG" },
      { id: "lectie", label: "Lecție de conducere, din mașină" },
      { id: "parerea-cursantei", label: "Părerea unei cursante" },
    ],
  },

  team: {
    eyebrow: "Oamenii din spatele școlii",
    title: "Echipa",
    titleAccent: "noastră",
    subtitle:
      "De la administrație până la instructorul de lângă tine în mașină: o echipă mare, organizată pe niveluri, ca fiecare cursant să aibă pe cineva care răspunde.",
    root: { name: "Școala Auto GLG Property", role: "Administrația", initials: "GLG" },
    levels: [
      {
        label: "Director",
        people: [{ name: "Nicic Veaceslav", role: "Director", photo: "/echipa/nicic-veaceslav.jpg" }],
      },
      {
        label: "Manageri",
        people: [
          { name: "Vlad", role: "Manager 1" },
          { name: "Malai Cristian", role: "Manager 2", photo: "/echipa/malai-cristian.jpg" },
          { name: "Ion", role: "Manager 3" },
        ],
      },
      {
        label: "Secretariat administrativ",
        people: [
          { name: "Dosca Viorica", role: "Secretar", photo: "/echipa/dosca-viorica.jpg" },
          { name: "Rebeca", role: "Secretar" },
        ],
      },
    ],
    groups: [
      { label: "Profesori de teorie", count: "10", note: "Cursuri în română și rusă, la toate sediile." },
      { label: "Operatori", count: "5", note: "Programează lecțiile practice și țin legătura cu tine." },
      { label: "Instructori", count: "80+", note: "Atestați, pe Skoda Fabia și Skoda Scala." },
    ],
  },

  why: {
    eyebrow: "Mai mult decât o școală auto",
    title: "De ce să alegi",
    titleAccent: "GLG Property",
    subtitle:
      "Te pregătim să conduci cu adevărat, nu doar să treci examenul.",
    imageAlt: "Elev la volan într-o mașină de instruire GLG Property",
    items: [
      {
        icon: "trophy",
        title: "20.000+ absolvenți în 10 ani",
        text: "Experiență adunată în 10 ani de activitate, cu peste 20.000 de absolvenți și 80+ instructori atestați.",
      },
      {
        icon: "userCheck",
        title: "Instructori cu experiență",
        text: "Instruire de calitate, personalizată în funcție de nevoile fiecărui cursant.",
      },
      {
        icon: "car",
        title: "Vehicule moderne",
        text: "Mașini bine întreținute care asigură condiții optime și o experiență realistă de condus.",
      },
      {
        icon: "lifebuoy",
        title: "Suport complet",
        text: "Te însoțim de la înscriere până la examen.",
      },
    ],
  },

  voucher: {
    badge: "Ofertă",
    title: "Voucher cadou de 200 lei",
    text: "Primești un voucher cadou în valoare de 200 lei la depunerea cererii de înscriere în sectoarele Botanica și Buiucani.",
    cta: { label: "Solicită voucherul", href: "#contact" },
  },

  pricing: {
    eyebrow: "Pachetul Standard, categoriile B1 și B",
    title: "Un singur pachet,",
    titleAccent: "simplu și complet",
    subtitle:
      "Pachetul Standard este pentru categoriile B1 și B, cu program flexibil și plata în rate. Pregătim și categoriile A1, A2, A, C, CE și D, iar prețul lor ți-l spunem la telefon sau la sediu.",
    categoryLabel: "Categoriile",
    plan: {
      name: "Standard",
      tagline: "Tot ce ai nevoie ca să obții permisul categoria B, într-un singur pachet.",
      category: "B1 · B",
      features: [
        "Durată curs: 3 luni",
        "Luni & miercuri, marți & joi sau weekend",
        "Orare: 09:30, 16:00, 17:30, 19:00; weekend: sâmbăta de la 09:00 (grupele în limba rusă: 17:30 și 19:00, la Buiucani)",
        "24 de lecții practice cu Skoda Fabia și Skoda Scala",
        "Grup de maximum 30 de persoane",
        "Achitare în până la 25 de rate",
      ],
    },
    enrollCta: { label: "Înscrie-te online", href: "/inscriere" },
    note: "Prețurile detaliate ți le comunicăm la telefon sau direct la centru.",
    noteCta: { label: "Contactează-ne", href: "#contact" },
    other: {
      title: "Celelalte categorii",
      text: "Pregătim și categoriile A1, A2, A, C, CE și D. Pentru ele, prețul și orarul depind de categorie, așa că ți le spunem la telefon sau la sediu.",
      categories: ["A1", "A2", "A", "C", "CE", "D"],
      cta: { label: site.phone, href: site.phoneHref },
    },
  },

  quick: {
    eyebrow: "Cerere rapidă",
    title: "Gata să obții",
    titleAccent: "permisul",
    subtitle:
      "Lasă-ne numele, telefonul și sediul. Continui cererea cu aceste câmpuri deja completate, iar noi te sunăm ca să confirmăm înscrierea.",
    name: "Nume și prenume",
    namePlaceholder: "ex. Popescu Ion",
    phone: "Telefon",
    phonePlaceholder: "069 000 000",
    sediu: "Sediul",
    sediuPlaceholder: "Alege sediul",
    consent:
      "Sunt de acord cu prelucrarea datelor mele personale ca să fiu contactat despre cursuri. Am citit",
    consentLinkLabel: "politica de confidențialitate",
    consentSuffix: ".",
    submit: "Continuă cererea",
    note: "Mai departe îți cerem doar datele din buletin, ca să putem întocmi cererea-contract.",
    callLabel: "Preferi să vorbim la telefon?",
    errors: {
      name: "Scrie numele și prenumele",
      phone: "Număr de telefon invalid",
      sediu: "Alege sediul",
      consent: "Bifează acordul ca să poți continua",
    },
  },

  enroll: {
    eyebrow: "Cerere de înscriere",
    title: "Înscrie-te",
    titleAccent: "online",
    subtitle:
      "Completează cererea-contract de acasă, în câteva minute. Alegi sediul și ora grupei, iar noi te sunăm ca să confirmăm înscrierea.",
    optional: "(opțional)",
    helpLabel: "Explicație",
    help: {
      lastName: "Aici scrii numele de familie, exact cum este în buletin.",
      firstName: "Aici scrii prenumele, exact cum este în buletin.",
      idnp: "Codul personal de 13 cifre de pe buletin (IDNP). Fără spații.",
      birthDate: "Data nașterii, ca în buletin. Te poți înscrie și înainte de 18 ani; examenul la ASP se dă de la 18 ani.",
      sex: "Alege așa cum apare în buletin.",
      citizenship: "Țara al cărei cetățean ești, de regulă Republica Moldova. Dacă ai alt buletin, scrie cetățenia de pe el.",
      phoneMobile: "Numărul tău de mobil. Pe el te sunăm ca să confirmăm înscrierea și grupa.",
      email: "Adresa ta de e-mail. Aici primești confirmarea și informațiile despre curs.",
      phoneHome: "Telefonul fix de acasă, dacă ai. Poți lăsa gol.",
      phoneFamily: "Numele și telefonul unei persoane apropiate (rudă, prieten, cunoscut) pe care o putem suna dacă nu răspunzi tu. Este obligatoriu.",
      raion: "Raionul sau municipiul din adresa de domiciliu, de exemplu Chișinău sau Strășeni.",
      locality: "Orașul, satul sau comuna din adresa de domiciliu.",
      street: "Strada din adresa de domiciliu, fără număr. Dacă localitatea nu are străzi, poți lăsa gol.",
      number: "Numărul casei sau al blocului. Poți lăsa gol.",
      apartment: "Numărul apartamentului, dacă locuiești la bloc. Poți lăsa gol.",
      idSeries: "Seria buletinului: litera de la început (de exemplu A sau B).",
      idNumber: "Numărul buletinului: cifrele de după serie.",
      idIssuedDate: "Data eliberării, scrisă pe buletin.",
      idIssuedBy: "Instituția care a eliberat buletinul, așa cum scrie pe act (de exemplu ASP, oficiul 01).",
      licenseNumber: "Doar dacă ai deja permis de conducere: numărul lui. Dacă nu ai permis, lasă gol.",
      licenseIssued: "Data și locul eliberării permisului pe care îl ai deja. Lasă gol dacă nu ai permis.",
      sediu: "Sediul unde vrei să faci cursul de teorie: Buiucani sau Botanica în Chișinău, Strășeni sau Vorniceni.",
      studyLanguage: "Limba în care vrei să înveți. Grupe în română sunt la toate sediile; în rusă doar la Buiucani.",
      slot: "Grupa deschisă acum la sediul ales: zilele și ora cursului de teorie. Dacă nu îți convine, alege alt sediu sau te sunăm când pornește următoarea.",
      category: "Categoria pe care vrei să o obții. Pentru autoturism alegi B.",
      transmission: "Cutia de viteze pe care faci practica. Cu permis luat pe automată nu ai voie să conduci mașină cu cutie mecanică.",
      workplace: "Cu ce te ocupi: unde lucrezi sau unde înveți (de exemplu student, elev, angajat la…). Opțional, apare în cererea-contract.",
      referral: "De unde ai aflat de noi. Ne ajută să știm ce funcționează.",
    },
    sections: {
      personal: "Date personale",
      contact: "Date de contact",
      address: "Domiciliul",
      documents: "Actul de identitate",
      course: "Cursul dorit",
    },
    fields: {
      lastName: "Nume",
      firstName: "Prenume",
      citizenship: "Cetățenia",
      citizenshipPlaceholder: "Republica Moldova",
      idnp: "IDNP",
      idnpHint: "13 cifre, ca în buletin",
      birthDate: "Data nașterii",
      sex: "Sex",
      sexM: "Masculin",
      sexF: "Feminin",
      email: "E-mail",
      phoneMobile: "Telefon mobil",
      phoneHome: "Telefon domiciliu",
      phoneFamily: "Telefonul unei rude / prieten / cunoscut",
      phoneFamilyPlaceholder: "nume și telefon, ex. mama, 069 000 000",
      raion: "Raion / sector",
      locality: "Localitate",
      street: "Strada",
      number: "Nr.",
      apartment: "Ap.",
      idSeries: "Seria",
      idNumber: "Numărul",
      idIssuedBy: "Eliberat de",
      idIssuedDate: "Data eliberării",
      workplace: "Ocupația",
      referral: "De unde ai aflat de școală?",
      referralRecommendation: "Recomandare",
      referralSocial: "Rețele de socializare",
      category: "Categoria solicitată",
      studyLanguage: "Limba de studii",
      langRo: "Română",
      langRu: "Rusă",
      transmission: "Instruirea practică la cutie",
      transmissionManual: "Mecanică",
      transmissionAuto: "Automată",
      sediu: "Sediul (grupa de teorie)",
      sediuPlaceholder: "Alege sediul",
      slot: "Grupa (zilele și ora)",
      slotPickSediu: "Alege întâi sediul",
      slotSaturday: "Sâmbătă",
      slotDaysHint:
        "Zilele (Luni și Miercuri, Marți și Joi sau weekend, sâmbăta) le stabilim împreună cu tine când grupa se formează.",
      noOpenGroups: "Momentan nu e deschisă nicio grupă la acest sediu. Trimite cererea și te sunăm când pornește următoarea.",
      fillSpots: "sunt locuri",
      fillAlmost: "aproape finisată",
      fillFull: "ultimele locuri disponibile",
      fillLegend: "Verde: sunt locuri. Galben: aproape finisată. Roșu: ultimele locuri disponibile.",
      scheduleOther: "Altă preferință de orar",
      schedule: "Ora disponibilă pentru cursuri",
      schedulePlaceholder: "ex.: după 17:30",
      practiceLocation: "Locația lecțiilor practice",
      practiceLocationPlaceholder: "Alege locația",
      license: "Permis de conducere (dacă ai deja unul)",
      licenseNumber: "Nr. permisului",
      licenseIssued: "Eliberat",
      licenseIssuedPlaceholder: "data / autoritatea",
      idPhoto: "Poza buletinului",
      idPhotoFront: "Fața buletinului",
      idPhotoBack: "Verso buletinului",
      idPhotoHint: "Fotografiază buletinul cu telefonul sau alege o poză / PDF. Fața este obligatorie, verso-ul opțional. Poza se micșorează automat.",
      idPhotoTake: "Fotografiază",
      idPhotoChoose: "Alege o poză sau un PDF",
      idPhotoProcessing: "Se pregătește poza…",
      idPhotoChange: "Schimbă",
      idPhotoRemove: "Șterge",
      idPhotoPdf: "Fișier PDF",
    },
    contract: {
      title: "Contractul de studii",
      text: "Înainte de a trimite cererea, citește contractul de studii al școlii (model gol, fără datele tale). Îl semnezi la sediu, la înscriere.",
      view: "Vezi contractul (PDF)",
      agree: "Am citit și sunt de acord cu prevederile contractului de studii.",
    },
    consent:
      "Sunt de acord cu prelucrarea datelor mele personale de către GLG Property SRL în scopul înscrierii la cursuri și al întocmirii contractului de școlarizare, conform Legii 133/2011 privind protecția datelor cu caracter personal. Am citit",
    consentLinkLabel: "politica de confidențialitate",
    consentSuffix: ".",
    reserveNotice: {
      title: "Locul în grupă se rezervă doar după achitare",
      text: "După ce trimiți cererea primești pe email linkurile de plată și ai 24 de ore ca să achiți taxa de înscriere 1/2, 500 lei (taxa de înscriere 2/2, 3000 lei, la sediu, până la prima lecție de teorie), sau taxa de bază, 3500 lei, dintr-o dată. Poți achita online sau la sediu. Dacă în 24 de ore plata nu este înregistrată, cererea nu mai ține locul în grupă.",
    },
    submit: "Trimite cererea",
    submitting: "Se trimite…",
    callOption: "Preferi să vorbim la telefon?",
    prefillNotice:
      "Am preluat datele din formularul scurt. Verifică-le și completează restul câmpurilor, ca să putem întocmi cererea-contract.",
    errors: {
      required: "Câmp obligatoriu",
      idnp: "IDNP-ul are exact 13 cifre",
      email: "Adresă de e-mail invalidă",
      phone: "Număr de telefon invalid",
      date: "Dată invalidă",
      consent: "Bifează acordul ca să poți trimite cererea",
      contract: "Citește contractul de studii și bifează că ești de acord cu prevederile lui",
      photoMissing: "Poza buletinului lipsește: adaugă cel puțin fața buletinului",
      fileTooBig: "Fișier prea mare: alege o poză sau un PDF de cel mult 2 MB",
      fileType: "Fișier neacceptat: alege o poză (JPG, PNG) sau un PDF",
      checkField: "Verifică acest câmp",
      noRuGroup:
        "Grupe în limba rusă avem doar la Buiucani (17:30 și 19:00). Alege Buiucani sau limba română.",
      formInvalid: "Verifică câmpurile marcate cu roșu.",
      serverInvalid: "Unele câmpuri nu au fost acceptate. Verifică-le și trimite din nou.",
      captcha: "Verificarea anti-robot a eșuat. Reîncarcă pagina și încearcă din nou.",
      rateLimited: "Prea multe cereri de pe această conexiune. Încearcă peste o oră sau sună-ne.",
      generic: "Ceva n-a mers. Încearcă din nou sau sună-ne la " + site.phone + ".",
      network: "Nu am putut trimite cererea. Verifică conexiunea la internet și încearcă din nou.",
    },
    success: {
      title: "Verifică-ți emailul",
      text: "Cererea a fost trimisă. Pe email ai linkurile de plată, iar aceleași linkuri le ai și mai jos, ca să poți achita chiar acum.",
      sentTo: "Am trimis linkurile de plată la",
      noEmail:
        "Dacă emailul nu ajunge în câteva minute, verifică și folderul Spam. Nu aștepta emailul: achită direct de pe butoanele de mai jos.",
      deadlineTitle: "Locul în grupă se rezervă doar după achitare",
      deadlineText:
        "Cererea singură nu îți ține locul. Ai 24 de ore ca să achiți taxa de înscriere 1/2, de 500 lei, sau taxa de bază, de 3500 lei.",
      deadlinePrefix: "Achită până",
      deadlineTimeWord: "ora",
      countdownPrefix: "mai ai",
      hoursShort: "h",
      minutesShort: "min",
      countdownExpired: "termenul de 24 de ore a trecut",
      payTitle: "Achită online, acum",
      payReserve: "Achită 500 lei (taxa de înscriere 1/2)",
      payReserveNote:
        "Îți rezervă locul în grupă. Taxa de înscriere 2/2, 3000 lei, se achită la sediu, până la prima lecție de teorie.",
      payFull: "Achită 3500 lei (taxa de bază)",
      payFullNote: "Taxa de bază acoperă tot cursul, teorie și practică. Nu mai ai nimic de achitat la sediu.",
      officeTitle: "Sau vino la unul dintre sedii în 24 de ore",
      officeText:
        "Poți achita și la sediu, în numerar sau prin card, în același termen de 24 de ore. Adresele și programul sediilor sunt în secțiunea de contact.",
      officeCta: "Vezi sediile și programul",
      verifyTitle: "Plata o verifică un angajat",
      verifyText:
        "Un angajat al școlii verifică plata și îți confirmă locul în grupă în aceeași zi sau a doua zi. Păstrează dovada plății (captura din aplicația bancară sau bonul de la sediu) până la confirmare.",
      missedTitle: "Dacă nu achiți în 24 de ore",
      missedText:
        "Cererea nu mai ține locul în grupă, iar locul trece la următoarea persoană. Poți trimite cererea din nou, dar grupa aleasă s-ar putea umple până atunci.",
      duplicateTitle: "Cererea ta există deja",
      duplicateText:
        "Am primit deja o cerere cu acest telefon sau IDNP în ultimele 24 de ore. Nu e nevoie să o retrimiți, dar locul se rezervă doar după achitare, din butoanele de mai jos.",
      back: "Înapoi la pagina principală",
      call: "Sună-ne",
    },
  },

  steps: {
    eyebrow: "Șase pași",
    title: "Procesul de",
    titleAccent: "înscriere",
    subtitle: "De la cererea online până la prima lecție, cu termenul de achitare la vedere.",
    items: [
      {
        icon: "fileText",
        title: "Completezi cererea online",
        text: "Durează câteva minute: datele tale, sediul, grupa și limba de studiu.",
        link: { label: "Completează cererea", href: "/inscriere" },
      },
      {
        icon: "mail",
        title: "Primești pe email linkurile de plată",
        text: "Verifici emailul imediat. Aceleași linkuri apar și pe ecranul de confirmare, după trimitere.",
      },
      {
        icon: "clock",
        title: "În 24 de ore achiți",
        text: "Taxa de înscriere 1/2, 500 lei, iar taxa de înscriere 2/2, 3000 lei, la sediu, sau taxa de bază, 3500 lei, dintr-o dată. Online, prin link, sau la sediu.",
        warn: "Fără achitare în 24 de ore cererea nu mai ține locul în grupă și trebuie trimisă din nou.",
      },
      {
        icon: "badgeCheck",
        title: "Un angajat verifică plata",
        text: "Verificăm plata în aceeași zi sau a doua zi și îți confirmăm locul în grupă.",
      },
      {
        icon: "fileSignature",
        title: "Te sunăm și semnezi contractul",
        text: "Contractul de studii se semnează online sau la sediu, cum îți este mai comod.",
        link: { label: "Unde ne găsești?", href: "#contact" },
      },
      {
        icon: "car",
        title: "Începi teoria, apoi practica",
        text: "Teoria pornește la data grupei alese, iar lecțiile de practică vin după, cu instructorul tău.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Recenzii reale de la absolvenți",
    title: "Ce spun",
    titleAccent: "elevii noștri",
    caption: "Recenzie absolvent GLG",
    videoFallback: "Browserul tău nu suportă redarea video.",
  },

  faq: {
    eyebrow: "Ai o întrebare?",
    title: "Întrebări",
    titleAccent: "frecvente",
    subtitle: "Găsești aici cele mai importante răspunsuri.",
    cardQuestion: "Nu găsești răspunsul?",
    items: [
      {
        q: "Ce categorii pot obține la GLG Property?",
        a: "Pregătim categoriile A1, A2, A, B1, B, C, CE și D. Pachetul Standard de pe site este pentru categoriile B1 și B (autoturism); pentru A1, A2, A, C, CE și D, prețul și orarul ți le spunem la telefon sau la sediu.",
      },
      {
        q: "Cum mă înscriu?",
        a: "Completezi cererea de înscriere online în câteva minute, iar noi te sunăm ca să confirmăm. Poți depune cererea și direct la centru.",
      },
      {
        q: "Cât durează cursul?",
        a: "Cursul durează 3 luni și include atât teoria, cât și practica.",
      },
      {
        q: "Pot achita în rate?",
        a: "Da. Cursul se poate achita în până la 25 de rate.",
      },
      {
        q: "Se predă și în limba rusă?",
        a: "Da, avem grupe în limba rusă la sediul Buiucani, la orele 17:30 și 19:00, pe lângă grupele în limba română de la toate sediile.",
      },
      {
        q: "Cu ce mașini se fac orele de practică?",
        a: "Cu Skoda Fabia și Skoda Scala, inclusiv pe traseele reale de examinare.",
      },
      {
        q: "Cum primesc voucherul de 200 lei?",
        a: "Îl primești la depunerea cererii de înscriere în sectoarele Botanica și Buiucani.",
      },
      {
        q: "Unde vă găsesc?",
        a: "Avem centre la Chișinău Botanica, Chișinău Buiucani, Strășeni și Vorniceni, deschise de luni până sâmbătă. Ne poți suna la 069 792 889.",
      },
    ],
  },

  contact: {
    eyebrow: "Te așteptăm",
    title: "Află unde poți depune",
    titleAccent: "cererea",
    subtitle:
      "Avem 4 centre: Chișinău Botanica, Chișinău Buiucani, Strășeni și Vorniceni, deschise de luni până sâmbătă. Sună-ne sau treci pe la noi.",
    callUs: "Sună-ne",
    hoursLabel: "Program",
    hours: "Luni - Sâmbătă",
    writeUs: "Scrie-ne",
    followUs: "Urmărește-ne",
    mapBadge: "Chișinău · Strășeni · Vorniceni",
    mapTitle: "Harta Google, Școala Auto GLG Property, Chișinău",
    mapConsentText: "Harta Google se încarcă doar cu acordul tău pentru media externe. La încărcare, Google poate seta cookie-uri proprii.",
    mapConsentCta: "Afișează harta",
    centersTitle: "Centrele noastre",
    callNow: "Sună acum",
    centers: [
      { name: "Chișinău, Buiucani", address: "str. Alba Iulia 75, blocul V, etajul 5", mapQuery: "str. Alba Iulia 75, Chișinău" },
      { name: "Chișinău, Botanica", address: "str. Sarmizegetusa 43, etajul 2, cabinetul 206", mapQuery: "str. Sarmizegetusa 43, Chișinău" },
      { name: "Strășeni", address: "str. Mihai Eminescu 32/2", mapQuery: "str. Mihai Eminescu 32, Strășeni" },
      { name: "Vorniceni", address: "Liceul Teoretic „Ion Inculeț”, str. Sfatul Țării 14", mapQuery: "Liceul Teoretic Ion Inculeț, Sfatul Țării 14, Vorniceni, Strășeni" },
    ],
    mapOpen: "Vezi pe hartă",
  },

  footer: {
    heading: "Te așteptăm la GLG",
    text: "Fă primul pas spre carnetul de conducere. Te așteptăm la unul dintre centrele noastre din Chișinău, Strășeni sau Vorniceni.",
    columns: [
      {
        title: "Cursuri",
        links: [
          { label: "Înscriere online", href: "/inscriere" },
          { label: "Pachetul Standard", href: "/#preturi" },
        ],
      },
      {
        title: "Școala",
        links: [
          { label: "Despre noi", href: "/#despre" },
          { label: "Cum te înscrii", href: "/#cursuri" },
          { label: "Informație înscriere", href: "/informatii-inscriere" },
          // „Echipa” nu încape în antet pe ecranele de 1024-1280px, de aceea
          // linkul are un loc fix aici.
          { label: "Echipa", href: "/#echipa" },
          { label: "Întrebări frecvente", href: "/#intrebari" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: site.phone, href: site.phoneHref },
          { label: site.email, href: `mailto:${site.email}` },
          { label: "Luni - Sâmbătă", href: "/#contact" },
        ],
      },
    ],
    rights: "Toate drepturile rezervate. Școală auto · Chișinău",
    credit: "Creare website - landings.md",
    privacy: "Politica de confidențialitate",
    terms: "Termeni și condiții",
    cookieSettings: "Setări cookies",
  },

  floating: { label: "Contactează-ne", call: "Sună-ne" },

  guide: {
    eyebrow: "Școală auto în Chișinău",
    title: "Cum obții permisul",
    titleAccent: "categoria B în Moldova",
    paragraphs: [
      "GLG Property este o școală auto din Chișinău, cu sedii în sectoarele Buiucani și Botanica și grupe de teorie la Strășeni și Vorniceni. De 10 ani pregătim viitori șoferi pentru permisul de conducere (categoriile A1, A2, A, B1, B, C, CE, D), în română și în rusă, cu instructori atestați și mașini Skoda Fabia și Skoda Scala, pe traseele reale de examinare.",
      "Pașii sunt simpli. Te înscrii la o școală auto autorizată, urmezi cursul de teorie (3 luni, luni și miercuri, marți și joi sau sâmbăta, în grupa de weekend) și cele 24 de lecții practice din [pachetul Standard](/#preturi), apoi susții examenul teoretic și cel practic la Agenția Servicii Publice. Pentru dosar ai nevoie de buletin și de certificat medical, iar vârsta minimă pentru categoria B este de 18 ani.",
      "Alegi sediul și ora grupei direct din [formularul de înscriere online](/inscriere), iar noi te sunăm ca să confirmăm. Cursul se achită în până la 25 de rate, iar la înscrierea în sectoarele Botanica și Buiucani primești un voucher cadou de 200 lei. Sfaturi pentru examen și noutăți găsești pe [blogul școlii](/blog), iar adresele și programul, în secțiunea [Contact](/#contact).",
    ],
  },

  notFound: {
    eyebrow: "Eroare 404",
    title: "Pagina nu există",
    text: "Linkul poate fi greșit sau pagina a fost mutată. Te poți întoarce pe pagina principală sau poți trimite direct cererea de înscriere la școala auto.",
    cta: { label: "Înscrie-te online", href: "/inscriere" },
    home: { label: "Pagina principală", href: "/" },
    linksTitle: "Poate te interesează",
    links: [
      { label: "Despre școala auto", href: "/#despre" },
      { label: "Pachetul Standard, categoria B", href: "/#preturi" },
      { label: "Cum te înscrii", href: "/#cursuri" },
      { label: "Întrebări frecvente", href: "/#intrebari" },
      { label: "Blog", href: "/blog" },
      { label: "Contact și sedii", href: "/#contact" },
    ],
  },

  privacy: {
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare: august 2026",
    sections: [
      {
        h: "Cine suntem",
        p: "Operatorul datelor tale este GLG Property SRL, școală auto autorizată din Chișinău, Republica Moldova (site: scoalaautoglg.com). Prelucrăm date cu caracter personal în conformitate cu Legea nr. 133/2011 privind protecția datelor cu caracter personal și cu principiile Regulamentului (UE) 2016/679 (GDPR).",
      },
      {
        h: "Ce date colectăm",
        p: "Prin formularul de înscriere online colectăm datele necesare întocmirii cererii-contract de școlarizare: nume și prenume, IDNP, data nașterii, sexul, cetățenia, datele actului de identitate (seria, numărul, data și autoritatea emiterii), adresa de domiciliu, numărul de telefon, adresa de e-mail, locul de muncă (opțional) și, dacă există, datele permisului de conducere. Nu colectăm alte date și nu folosim datele din formular pentru publicitate.",
      },
      {
        h: "De ce le colectăm",
        p: "Folosim aceste date pentru: procesarea cererii tale de înscriere și contactarea ta telefonică pentru confirmare, întocmirea contractului de școlarizare și a dosarului cerut de lege pentru admiterea la examene, comunicarea informațiilor legate de curs. Temeiul prelucrării este consimțământul tău și încheierea contractului de școlarizare.",
      },
      {
        h: "Cui le transmitem",
        p: "Datele ajung în sistemul intern de evidență al școlii, accesibil doar personalului autorizat. Le transmitem autorităților publice (de exemplu Agenția Servicii Publice) doar atunci când legea o cere pentru admiterea la examen. Nu vindem și nu transmitem datele tale altor companii în scop de marketing.",
      },
      {
        h: "Cât timp le păstrăm",
        p: "Păstrăm datele pe durata școlarizării și apoi pe termenul cerut de legislație pentru arhivarea dosarelor de școlarizare. Dacă trimiți formularul dar nu te înscrii, poți cere oricând ștergerea datelor.",
      },
      {
        h: "Cookie-uri și stocare locală",
        p: "Site-ul folosește doar stocare strict necesară: limba aleasă, închiderea anunțului promoțional și alegerea ta privind cookie-urile. Nu folosim cookie-uri de publicitate sau de urmărire. Harta Google din secțiunea Contact se încarcă doar cu acordul tău pentru media externe; la încărcare, Google poate seta cookie-uri proprii conform politicii sale. Îți poți schimba oricând alegerea din linkul Setări cookies aflat în subsolul paginii.",
      },
      {
        h: "Drepturile tale",
        p: "Ai dreptul de acces la datele tale, dreptul la rectificare, la ștergere, la restricționarea prelucrării, dreptul de opoziție și dreptul de a-ți retrage oricând consimțământul. Pentru orice solicitare scrie-ne la scoalaauto.glgproperty@gmail.com sau sună la 069 792 889. Dacă consideri că drepturile tale au fost încălcate, poți depune o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal al Republicii Moldova (datepersonale.md).",
      },
      {
        h: "Contact",
        p: "GLG Property SRL, Chișinău, Republica Moldova. E-mail: scoalaauto.glgproperty@gmail.com. Telefon: 069 792 889.",
      },
    ],
  },

  terms: {
    title: "Termeni și condiții",
    updated: "Ultima actualizare: august 2026",
    sections: [
      {
        h: "Cine suntem",
        p: "Site-ul scoalaautoglg.com este operat de GLG Property SRL, școală auto autorizată din Chișinău, Republica Moldova. Folosind acest site, ești de acord cu termenii de mai jos.",
      },
      {
        h: "Obiectul site-ului",
        p: "Site-ul prezintă serviciile școlii auto și îți permite să trimiți o cerere de înscriere online. Trimiterea formularului nu creează un contract și nu garantează un loc în grupă: contractul de școlarizare se semnează la sediu, după ce te contactăm telefonic pentru confirmare.",
      },
      {
        h: "Rezervarea locului în grupă",
        p: "Cererea trimisă online nu garantează locul în grupă. Locul se rezervă doar după achitarea taxei de înscriere 1/2, de 500 lei, sau a taxei de bază, de 3500 lei, în 24 de ore de la trimiterea cererii. Plata se poate face online, prin linkurile primite pe email, sau la sediu. Plățile sunt verificate de un angajat al școlii și se confirmă în aceeași zi sau a doua zi. Dacă în 24 de ore plata nu este înregistrată, cererea nu mai ține locul și trebuie depusă din nou. Taxa de înscriere 2/2, 3000 lei, în cazul achitării taxei de înscriere 1/2, se achită până la prima lecție de teorie.",
      },
      {
        h: "Utilizarea site-ului",
        p: "Te obligi să introduci în formular date reale și complete, care te privesc pe tine. Este interzisă folosirea site-ului în mod abuziv: trimiterea de cereri false sau repetate, încercările de acces neautorizat, perturbarea funcționării site-ului.",
      },
      {
        h: "Prețuri și informații",
        p: "Informațiile de pe site, inclusiv cele despre cursuri și oferte, au caracter informativ și pot fi actualizate fără preaviz. Prețurile finale și condițiile concrete se confirmă telefonic sau la sediu, înainte de semnarea contractului.",
      },
      {
        h: "Proprietate intelectuală",
        p: "Conținutul site-ului (texte, imagini, materiale video, logo) aparține GLG Property SRL sau este folosit cu acordul titularilor. Copierea sau republicarea fără acordul nostru scris este interzisă.",
      },
      {
        h: "Date personale și cookie-uri",
        p: "Modul în care prelucrăm datele personale trimise prin formular și cookie-urile folosite de site sunt descrise în Politica de confidențialitate, disponibilă în subsolul paginii.",
      },
      {
        h: "Răspundere",
        p: "Ne străduim ca informațiile de pe site să fie corecte și actuale, dar nu răspundem pentru indisponibilități temporare ale site-ului sau ale serviciilor externe integrate (de exemplu harta Google). Site-ul este oferit ca atare, fără garanții suplimentare.",
      },
      {
        h: "Legea aplicabilă",
        p: "Acești termeni sunt guvernați de legislația Republicii Moldova. Eventualele litigii se soluționează pe cale amiabilă, iar dacă nu este posibil, de instanțele competente din Chișinău.",
      },
      {
        h: "Contact",
        p: "GLG Property SRL, Chișinău, Republica Moldova. E-mail: scoalaauto.glgproperty@gmail.com. Telefon: 069 792 889.",
      },
    ],
  },

  cookies: {
    title: "Cookie-uri și confidențialitate",
    text: "Folosim doar stocare strict necesară (limba aleasă, această alegere). Harta Google din secțiunea Contact se încarcă doar cu acordul tău și poate seta cookie-uri proprii Google. Detalii în",
    short: "Folosim cookie-uri strict necesare și, cu acordul tău, harta Google.",
    more: "Detalii",
    policyLabel: "Politica de confidențialitate",
    accept: "Accept",
    acceptAll: "Accept toate",
    necessaryOnly: "Doar necesare",
    prefs: "Preferințe",
    save: "Salvează alegerea",
    categories: {
      necessary: {
        label: "Strict necesare",
        desc: "Limba aleasă, închiderea anunțului și memorarea acestei alegeri. Nu pot fi dezactivate.",
      },
      media: {
        label: "Media externe (Google Maps)",
        desc: "Încarcă harta Google din secțiunea Contact. Google poate seta cookie-uri proprii.",
      },
    },
  },
};

const ru: Dict = {
  banner: {
    pre: "Подарочный ваучер на",
    amount: "200 леев",
    post: "при записи в секторах Ботаника и Буюканы",
    cta: "Подробнее",
    close: "Закрыть объявление",
  },

  nav: {
    items: [
      { label: "Главная", href: "/#acasa" },
      { label: "О нас", href: "/#despre" },
      { label: "Курсы", href: "/#cursuri" },
      { label: "Информация о записи", href: "/informatii-inscriere" },
      { label: "Команда", href: "/#echipa" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/#contact" },
    ],
    cta: { label: "Записаться", href: "/inscriere" },
    menuAria: "Меню",
    langAria: "Сменить язык",
  },

  hero: {
    eyebrow: "Автошкола GLG Property",
    titleTop: "Автошкола в Кишинёве",
    titleBottom: "для всех категорий прав",
    subtitle:
      "Аттестованные инструкторы, современные автомобили, группы RO и RU. Кишинёв Ботаника, Кишинёв Буюканы, Стрэшены, Ворничены.",
    imageAlt: "Офис автошколы GLG Property в Кишинёве, учебный класс и оснащение, на видео",
    primaryCta: { label: "Записаться онлайн", href: "/inscriere" },
    secondaryCta: { label: site.phone, href: site.phoneHref },
    priceLine: "Пакет Standard можно оплатить в рассрочку до 25 платежей.",
    priceCta: { label: "Смотреть цену", href: "#preturi" },
    categoriesLabel: "Категории",
    categories: ["A1", "A2", "A", "B1", "B", "C", "CE", "D"],
    chips: [
      "20 000+ выпускников",
      "10 лет опыта",
      "80+ инструкторов",
      "4 центра обучения",
    ],
  },

  messengers: {
    whatsapp: "WhatsApp",
    whatsappText: "Здравствуйте! Хочу узнать подробнее о курсах.",
    telegram: "Telegram",
    bar: { call: "Позвонить", enroll: "Записаться" },
  },

  benefits: [
    {
      icon: "languages",
      title: "Группы на румынском и русском",
      text: "Отдельные группы на румынском и русском языках. Выбирай язык, на котором учишься.",
      tag: "RO / RU",
    },
    {
      icon: "car",
      title: "Современные автомобили Skoda",
      text: "Практика на ухоженных Skoda Fabia и Skoda Scala, в том числе на реальных экзаменационных маршрутах.",
      tag: "Fabia · Scala",
    },
    {
      icon: "wallet",
      title: "Рассрочка на 25 платежей",
      text: "Курс можно оплатить в рассрочку до 25 платежей.",
      tag: "0% стресса",
    },
  ],

  stats: [
    { value: 20000, suffix: "+", label: "Выпускников" },
    { value: 10, suffix: "", label: "Лет опыта" },
    { value: 80, suffix: "+", label: "Инструкторов" },
    { value: 4, suffix: "", label: "Филиалы: Ботаника, Буюканы, Стрэшены, Ворничены" },
  ],

  cars: {
    badge: "Автопарк GLG",
    title: "Более 50 учебных машин в идеальном состоянии",
    text: "У нас более 50 учебных транспортных средств, по всем категориям, с механикой и автоматом. Учись на тех же моделях, на которых будешь сдавать экзамен, на реальных экзаменационных маршрутах Кишинёва.",
    chips: [
      "B1, B, BE: Skoda Fabia, Skoda Scala, Toyota Yaris",
      "C1, C, C1E, CE: Volvo FE 320, Volvo FL 290, MAN",
      "D1, D, D1E, DE: Irisbus",
      "AM, A1, A2, A: Maya Motors, Andes",
    ],
    cta: { label: "Смотреть пакет", href: "#preturi" },
    enrollCta: { label: "Записаться онлайн", href: "/inscriere" },
  },

  videos: {
    eyebrow: "Видео",
    title: "Автошкола GLG Property",
    accent: "изнутри",
    subtitle: "Офис, учебный класс, автодром, машины и люди, которые научат вас водить. Нажмите Play на любом ролике.",
    fallback: "Ваш браузер не может воспроизвести это видео.",
    items: [
      { id: "despre-scoala", label: "Об автошколе GLG Property" },
      { id: "sediu", label: "Офис, учебный класс и оснащение" },
      { id: "poligon", label: "Учебный автодром" },
      { id: "parc-auto", label: "Автопарк: новые машины Skoda" },
      { id: "pe-scurt", label: "GLG Property, коротко" },
      { id: "informatii", label: "Полезная информация для учеников" },
      { id: "interviu-cursanta", label: "Интервью в офисе, с ученицей" },
      { id: "interviu", label: "Интервью с командой GLG" },
      { id: "lectie", label: "Урок вождения, из машины" },
      { id: "parerea-cursantei", label: "Мнение ученицы" },
    ],
  },

  team: {
    eyebrow: "Люди, которые стоят за школой",
    title: "Наша",
    titleAccent: "команда",
    subtitle:
      "От администрации до инструктора рядом с тобой в машине: большая команда, организованная по уровням, чтобы у каждого ученика был тот, кто отвечает.",
    root: { name: "Автошкола GLG Property", role: "Администрация", initials: "GLG" },
    levels: [
      {
        label: "Директор",
        people: [{ name: "Ничик Вячеслав", role: "Директор", photo: "/echipa/nicic-veaceslav.jpg" }],
      },
      {
        label: "Менеджеры",
        people: [
          { name: "Влад", role: "Менеджер 1" },
          { name: "Малай Кристиан", role: "Менеджер 2", photo: "/echipa/malai-cristian.jpg" },
          { name: "Ион", role: "Менеджер 3" },
        ],
      },
      {
        label: "Административный секретариат",
        people: [
          { name: "Доска Виорика", role: "Секретарь", photo: "/echipa/dosca-viorica.jpg" },
          { name: "Ребека", role: "Секретарь" },
        ],
      },
    ],
    groups: [
      { label: "Преподаватели теории", count: "10", note: "Занятия на румынском и русском, во всех филиалах." },
      { label: "Операторы", count: "5", note: "Планируют практические занятия и держат с тобой связь." },
      { label: "Инструкторы", count: "80+", note: "Аттестованные, на Skoda Fabia и Skoda Scala." },
    ],
  },

  why: {
    eyebrow: "Больше, чем автошкола",
    title: "Почему стоит выбрать",
    titleAccent: "GLG Property",
    subtitle:
      "Мы учим по-настоящему водить, а не просто сдавать экзамен.",
    imageAlt: "Ученик за рулём учебного автомобиля GLG Property",
    items: [
      {
        icon: "trophy",
        title: "20 000+ выпускников за 10 лет",
        text: "Опыт, накопленный за 10 лет работы: более 20 000 выпускников и 80+ аттестованных инструкторов.",
      },
      {
        icon: "userCheck",
        title: "Опытные инструкторы",
        text: "Качественное обучение с индивидуальным подходом к каждому ученику.",
      },
      {
        icon: "car",
        title: "Современный автопарк",
        text: "Ухоженные автомобили обеспечивают оптимальные условия и реалистичный опыт вождения.",
      },
      {
        icon: "lifebuoy",
        title: "Полное сопровождение",
        text: "Мы рядом от записи до экзамена.",
      },
    ],
  },

  voucher: {
    badge: "Акция",
    title: "Подарочный ваучер на 200 леев",
    text: "Получи подарочный ваучер на 200 леев при подаче заявления о записи в секторах Ботаника и Буюканы.",
    cta: { label: "Получить ваучер", href: "#contact" },
  },

  pricing: {
    eyebrow: "Пакет Standard, категории B1 и B",
    title: "Один пакет,",
    titleAccent: "простой и полный",
    subtitle:
      "Пакет Standard предназначен для категорий B1 и B, с гибким графиком и рассрочкой. Мы готовим также к категориям A1, A2, A, C, CE и D, а их цену сообщим по телефону или в филиале.",
    categoryLabel: "Категории",
    plan: {
      name: "Standard",
      tagline: "Всё необходимое для получения прав категории B, в одном пакете.",
      category: "B1 · B",
      features: [
        "Длительность курса: 3 месяца",
        "Понедельник и среда, вторник и четверг или выходные",
        "Время: 09:30, 16:00, 17:30, 19:00; выходные: суббота с 09:00 (группы на русском: 17:30 и 19:00, филиал Буюканы)",
        "24 практических занятия на Skoda Fabia и Skoda Scala",
        "Группа до 30 человек",
        "Рассрочка до 25 платежей",
      ],
    },
    enrollCta: { label: "Записаться онлайн", href: "/inscriere" },
    note: "Подробные цены сообщим по телефону или прямо в филиале.",
    noteCta: { label: "Свяжись с нами", href: "#contact" },
    other: {
      title: "Остальные категории",
      text: "Мы готовим также к категориям A1, A2, A, C, CE и D. Для них цена и расписание зависят от категории, поэтому сообщим их по телефону или в филиале.",
      categories: ["A1", "A2", "A", "C", "CE", "D"],
      cta: { label: site.phone, href: site.phoneHref },
    },
  },

  quick: {
    eyebrow: "Быстрая заявка",
    title: "Пора получить",
    titleAccent: "права",
    subtitle:
      "Оставь имя, телефон и филиал. Заявку продолжишь с уже заполненными полями, а мы позвоним, чтобы подтвердить запись.",
    name: "Фамилия и имя",
    namePlaceholder: "напр. Попеску Ион",
    phone: "Телефон",
    phonePlaceholder: "069 000 000",
    sediu: "Филиал",
    sediuPlaceholder: "Выбери филиал",
    consent:
      "Я согласен(на) на обработку моих персональных данных, чтобы со мной связались по поводу курсов. Я ознакомился(лась) с",
    consentLinkLabel: "политикой конфиденциальности",
    consentSuffix: ".",
    submit: "Продолжить заявку",
    note: "Дальше попросим только данные из удостоверения личности, чтобы оформить заявление-договор.",
    callLabel: "Удобнее по телефону?",
    errors: {
      name: "Укажи фамилию и имя",
      phone: "Неверный номер телефона",
      sediu: "Выбери филиал",
      consent: "Отметь согласие, чтобы продолжить",
    },
  },

  enroll: {
    eyebrow: "Заявка на запись",
    title: "Запишись",
    titleAccent: "онлайн",
    subtitle:
      "Заполни заявку-контракт из дома за несколько минут. Выбери филиал и время группы, а мы позвоним, чтобы подтвердить запись.",
    optional: "(необязательно)",
    helpLabel: "Подсказка",
    help: {
      lastName: "Здесь пишешь фамилию, точно как в удостоверении личности.",
      firstName: "Здесь пишешь имя, точно как в удостоверении личности.",
      idnp: "Персональный код из 13 цифр с удостоверения (IDNP). Без пробелов.",
      birthDate: "Дата рождения, как в удостоверении. Записаться можно и до 18 лет; экзамен в ASP сдают с 18 лет.",
      sex: "Выбери так, как указано в удостоверении.",
      citizenship: "Страна, гражданином которой ты являешься, обычно Республика Молдова. Если у тебя другой документ, укажи гражданство из него.",
      phoneMobile: "Твой мобильный номер. По нему мы позвоним, чтобы подтвердить запись и группу.",
      email: "Твой адрес электронной почты. Сюда придут подтверждение и информация о курсе.",
      phoneHome: "Домашний стационарный телефон, если есть. Можно оставить пустым.",
      phoneFamily: "Имя и телефон близкого человека (родственник, друг, знакомый), которому мы можем позвонить, если ты не отвечаешь. Обязательно.",
      raion: "Район или муниципий из адреса проживания, например Кишинёв или Стрэшены.",
      locality: "Город, село или коммуна из адреса проживания.",
      street: "Улица из адреса проживания, без номера. Если в населённом пункте нет улиц, можно оставить пустым.",
      number: "Номер дома. Можно оставить пустым.",
      apartment: "Номер квартиры, если живёшь в многоквартирном доме. Можно оставить пустым.",
      idSeries: "Серия удостоверения: буква в начале (например A или B).",
      idNumber: "Номер удостоверения: цифры после серии.",
      idIssuedDate: "Дата выдачи, указанная в удостоверении.",
      idIssuedBy: "Орган, выдавший удостоверение, как написано в документе (например ASP, офис 01).",
      licenseNumber: "Только если у тебя уже есть водительское удостоверение: его номер. Если прав нет, оставь пустым.",
      licenseIssued: "Дата и место выдачи имеющихся прав. Оставь пустым, если прав нет.",
      sediu: "Филиал, где хочешь проходить теорию: Буюканы или Ботаника в Кишинёве, Стрэшены или Ворничены.",
      studyLanguage: "Язык обучения. Группы на румынском есть во всех филиалах; на русском только в Буюканах.",
      slot: "Открытая сейчас группа в выбранном филиале: дни и время занятий по теории. Если не подходит, выбери другой филиал или мы позвоним, когда стартует следующая.",
      category: "Категория, которую хочешь получить. Для легкового автомобиля выбирай B.",
      transmission: "Коробка передач, на которой проходишь практику. С правами на автомат нельзя водить машину с механикой.",
      workplace: "Чем ты занимаешься: где работаешь или учишься (например студент, школьник, работаю в…). Необязательно, указывается в заявлении-договоре.",
      referral: "Откуда ты узнал о нас. Помогает понять, что работает.",
    },
    sections: {
      personal: "Личные данные",
      contact: "Контактные данные",
      address: "Место жительства",
      documents: "Удостоверение личности",
      course: "Курс обучения",
    },
    fields: {
      lastName: "Фамилия",
      firstName: "Имя",
      citizenship: "Гражданство",
      citizenshipPlaceholder: "Республика Молдова",
      idnp: "IDNP",
      idnpHint: "13 цифр, как в удостоверении личности",
      birthDate: "Дата рождения",
      sex: "Пол",
      sexM: "Мужской",
      sexF: "Женский",
      email: "E-mail",
      phoneMobile: "Мобильный телефон",
      phoneHome: "Домашний телефон",
      phoneFamily: "Телефон родственника / друга / знакомого",
      phoneFamilyPlaceholder: "имя и телефон, напр. мама, 069 000 000",
      raion: "Район / сектор",
      locality: "Населённый пункт",
      street: "Улица",
      number: "Дом",
      apartment: "Кв.",
      idSeries: "Серия",
      idNumber: "Номер",
      idIssuedBy: "Кем выдано",
      idIssuedDate: "Дата выдачи",
      workplace: "Род занятий",
      referral: "Откуда узнал(а) о школе?",
      referralRecommendation: "Рекомендация",
      referralSocial: "Социальные сети",
      category: "Желаемая категория",
      studyLanguage: "Язык обучения",
      langRo: "Румынский",
      langRu: "Русский",
      transmission: "Практика на коробке передач",
      transmissionManual: "Механика",
      transmissionAuto: "Автомат",
      sediu: "Филиал (группа теории)",
      sediuPlaceholder: "Выбери филиал",
      slot: "Время группы",
      slotPickSediu: "Сначала выбери филиал",
      slotSaturday: "Суббота",
      slotDaysHint: "Выбери подходящую группу: дни и время указаны для группы, которая набирается сейчас.",
      noOpenGroups: "Сейчас в этом филиале нет открытой группы. Отправь заявку, и мы позвоним, когда стартует следующая.",
      fillSpots: "есть места",
      fillAlmost: "почти заполнена",
      fillFull: "последние места",
      fillLegend: "Зелёный: есть места. Жёлтый: почти заполнена. Красный: последние места.",
      scheduleOther: "Другие пожелания по расписанию",
      schedule: "Удобное время для занятий",
      schedulePlaceholder: "напр.: после 17:30",
      practiceLocation: "Место практических занятий",
      practiceLocationPlaceholder: "Выберите место",
      license: "Водительское удостоверение (если уже есть)",
      licenseNumber: "Номер удостоверения",
      licenseIssued: "Выдано",
      licenseIssuedPlaceholder: "дата / орган выдачи",
      idPhoto: "Фото удостоверения личности",
      idPhotoFront: "Лицевая сторона",
      idPhotoBack: "Оборотная сторона",
      idPhotoHint: "Сфотографируй удостоверение телефоном или выбери фото / PDF. Лицевая сторона обязательна, оборотная по желанию. Фото уменьшается автоматически.",
      idPhotoTake: "Сфотографировать",
      idPhotoChoose: "Выбрать фото или PDF",
      idPhotoProcessing: "Готовим фото…",
      idPhotoChange: "Заменить",
      idPhotoRemove: "Удалить",
      idPhotoPdf: "Файл PDF",
    },
    contract: {
      title: "Договор об обучении",
      text: "Перед отправкой заявки прочитай договор об обучении школы (пустой образец, без твоих данных). Подписывается в офисе при записи.",
      view: "Посмотреть договор (PDF)",
      agree: "Я прочитал(а) и согласен(на) с условиями договора об обучении.",
    },
    consent:
      "Я согласен(на) на обработку моих персональных данных компанией GLG Property SRL в целях записи на курсы и оформления договора об обучении, в соответствии с Законом 133/2011 о защите персональных данных. Я ознакомился(лась) с",
    consentLinkLabel: "политикой конфиденциальности",
    consentSuffix: ".",
    reserveNotice: {
      title: "Место в группе бронируется только после оплаты",
      text: "После отправки заявки на email придут ссылки для оплаты, и у тебя есть 24 часа, чтобы оплатить регистрационный взнос 1/2, 500 лей (регистрационный взнос 2/2, 3000 лей, в филиале, до первого занятия теории), или базовый тариф, 3500 лей, сразу. Оплатить можно онлайн или в филиале. Если за 24 часа оплата не зарегистрирована, заявка больше не держит место в группе.",
    },
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    callOption: "Удобнее по телефону?",
    prefillNotice:
      "Мы перенесли данные из короткой формы. Проверь их и заполни остальные поля, чтобы мы могли оформить заявление-договор.",
    errors: {
      required: "Обязательное поле",
      idnp: "IDNP состоит ровно из 13 цифр",
      email: "Неверный адрес e-mail",
      phone: "Неверный номер телефона",
      date: "Неверная дата",
      consent: "Отметь согласие, чтобы отправить заявку",
      contract: "Прочитай договор об обучении и отметь, что согласен(на) с его условиями",
      photoMissing: "Нет фото удостоверения: добавь хотя бы лицевую сторону",
      fileTooBig: "Файл слишком большой: выбери фото или PDF не больше 2 МБ",
      fileType: "Неподдерживаемый файл: выбери фото (JPG, PNG) или PDF",
      checkField: "Проверь это поле",
      noRuGroup:
        "Группы на русском языке есть только в филиале Buiucani (17:30 и 19:00). Выбери Buiucani или румынский язык.",
      formInvalid: "Проверь поля, отмеченные красным.",
      serverInvalid: "Некоторые поля не были приняты. Проверь их и отправь снова.",
      captcha: "Анти-бот проверка не пройдена. Перезагрузи страницу и попробуй ещё раз.",
      rateLimited: "Слишком много заявок с этого подключения. Попробуй через час или позвони нам.",
      generic: "Что-то пошло не так. Попробуй ещё раз или позвони нам: " + site.phone + ".",
      network: "Не удалось отправить заявку. Проверь подключение к интернету и попробуй снова.",
    },
    success: {
      title: "Проверь свою почту",
      text: "Заявка отправлена. Ссылки для оплаты пришли на email, и те же ссылки есть ниже, чтобы можно было оплатить сразу.",
      sentTo: "Ссылки для оплаты отправлены на",
      noEmail:
        "Если письмо не придёт за несколько минут, проверь папку Спам. Не жди письмо: оплати прямо с кнопок ниже.",
      deadlineTitle: "Место в группе бронируется только после оплаты",
      deadlineText:
        "Сама заявка место не держит. У тебя есть 24 часа, чтобы оплатить регистрационный взнос 1/2, 500 лей, или базовый тариф, 3500 лей.",
      deadlinePrefix: "Оплати до",
      deadlineTimeWord: "в",
      countdownPrefix: "осталось",
      hoursShort: "ч",
      minutesShort: "мин",
      countdownExpired: "срок в 24 часа истёк",
      payTitle: "Оплатить онлайн, сейчас",
      payReserve: "Оплатить 500 лей (регистрационный взнос 1/2)",
      payReserveNote:
        "Закрепляет за тобой место в группе. Регистрационный взнос 2/2, 3000 лей, оплачивается в филиале, до первого занятия теории.",
      payFull: "Оплатить 3500 лей (базовый тариф)",
      payFullNote: "Базовый тариф покрывает весь курс, теорию и практику. В филиале платить больше нечего.",
      officeTitle: "Или приходи в один из филиалов в течение 24 часов",
      officeText:
        "Оплатить можно и в филиале, наличными или картой, в тот же срок, 24 часа. Адреса и график филиалов есть в разделе контактов.",
      officeCta: "Посмотреть филиалы и график",
      verifyTitle: "Оплату проверяет сотрудник",
      verifyText:
        "Сотрудник школы проверяет оплату и подтверждает место в группе в тот же день или на следующий. Сохрани подтверждение оплаты (скриншот из банковского приложения или чек из филиала) до подтверждения.",
      missedTitle: "Если не оплатить за 24 часа",
      missedText:
        "Заявка больше не держит место в группе, и место переходит следующему человеку. Заявку можно отправить снова, но выбранная группа к тому времени может заполниться.",
      duplicateTitle: "Твоя заявка уже есть",
      duplicateText:
        "Мы уже получили заявку с этим телефоном или IDNP за последние 24 часа. Отправлять повторно не нужно, но место бронируется только после оплаты, с кнопок ниже.",
      back: "Вернуться на главную",
      call: "Позвонить",
    },
  },

  steps: {
    eyebrow: "Шесть шагов",
    title: "Процесс",
    titleAccent: "записи",
    subtitle: "От заявки онлайн до первого занятия, со сроком оплаты на виду.",
    items: [
      {
        icon: "fileText",
        title: "Заполняешь заявку онлайн",
        text: "Занимает несколько минут: твои данные, филиал, группа и язык обучения.",
        link: { label: "Заполнить заявку", href: "/inscriere" },
      },
      {
        icon: "mail",
        title: "Получаешь на email ссылки для оплаты",
        text: "Проверяешь почту сразу. Те же ссылки видны и на экране подтверждения, после отправки.",
      },
      {
        icon: "clock",
        title: "За 24 часа оплачиваешь",
        text: "Регистрационный взнос 1/2, 500 лей, а регистрационный взнос 2/2, 3000 лей, в филиале, или базовый тариф, 3500 лей, сразу. Онлайн, по ссылке, или в филиале.",
        warn: "Без оплаты за 24 часа заявка больше не держит место в группе, и её нужно отправить заново.",
      },
      {
        icon: "badgeCheck",
        title: "Сотрудник проверяет оплату",
        text: "Проверяем оплату в тот же день или на следующий и подтверждаем место в группе.",
      },
      {
        icon: "fileSignature",
        title: "Мы звоним, ты подписываешь договор",
        text: "Договор об обучении подписывается онлайн или в филиале, как тебе удобнее.",
        link: { label: "Где нас найти?", href: "#contact" },
      },
      {
        icon: "car",
        title: "Начинаешь теорию, затем практику",
        text: "Теория начинается в дату выбранной группы, а практические занятия идут после, с твоим инструктором.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Настоящие отзывы выпускников",
    title: "Что говорят",
    titleAccent: "наши ученики",
    caption: "Отзыв выпускника GLG",
    videoFallback: "Твой браузер не поддерживает воспроизведение видео.",
  },

  faq: {
    eyebrow: "Есть вопрос?",
    title: "Частые",
    titleAccent: "вопросы",
    subtitle: "Здесь собраны самые важные ответы.",
    cardQuestion: "Остались вопросы?",
    items: [
      {
        q: "Какие категории можно получить в GLG Property?",
        a: "Мы готовим к категориям A1, A2, A, B1, B, C, CE и D. Пакет Standard на сайте предназначен для категорий B1 и B (легковой автомобиль); для A1, A2, A, C, CE и D цену и расписание сообщим по телефону или в филиале.",
      },
      {
        q: "Как записаться?",
        a: "Заполни заявку онлайн за несколько минут, мы перезвоним для подтверждения. Заявку можно подать и прямо в филиале.",
      },
      {
        q: "Сколько длится курс?",
        a: "Курс длится 3 месяца и включает и теорию, и практику.",
      },
      {
        q: "Можно ли платить в рассрочку?",
        a: "Да. Курс можно оплатить в рассрочку до 25 платежей.",
      },
      {
        q: "Есть ли обучение на русском языке?",
        a: "Да, у нас есть группы на русском языке в филиале Буюканы, в 17:30 и 19:00, помимо групп на румынском во всех филиалах.",
      },
      {
        q: "На каких автомобилях проходит практика?",
        a: "На Skoda Fabia и Skoda Scala, в том числе на реальных экзаменационных маршрутах.",
      },
      {
        q: "Как получить ваучер на 200 леев?",
        a: "Ваучер выдаётся при подаче заявления о записи в секторах Ботаника и Буюканы.",
      },
      {
        q: "Где вас найти?",
        a: "У нас филиалы: Кишинёв Ботаника, Кишинёв Буюканы, Стрэшены и Ворничены, открытые с понедельника по субботу. Звони по номеру 069 792 889.",
      },
    ],
  },

  contact: {
    eyebrow: "Ждём тебя",
    title: "Узнай, где подать",
    titleAccent: "заявление",
    subtitle:
      "У нас 4 филиала: Кишинёв Ботаника, Кишинёв Буюканы, Стрэшены и Ворничены, открытые с понедельника по субботу. Позвони или заходи в гости.",
    callUs: "Позвони нам",
    hoursLabel: "График работы",
    hours: "Понедельник - Суббота",
    writeUs: "Напиши нам",
    followUs: "Подписывайся",
    mapBadge: "Кишинёв · Стрэшены · Ворничены",
    mapTitle: "Карта Google, автошкола GLG Property, Кишинёв",
    mapConsentText: "Карта Google загружается только с вашего согласия на внешние медиа. При загрузке Google может устанавливать свои cookie.",
    mapConsentCta: "Показать карту",
    centersTitle: "Наши филиалы",
    callNow: "Звони сейчас",
    centers: [
      { name: "Кишинёв, Буюканы", address: "ул. Алба Юлия 75, блок V, этаж 5", mapQuery: "str. Alba Iulia 75, Chișinău" },
      { name: "Кишинёв, Ботаника", address: "ул. Сармизеджетуза 43, этаж 2, кабинет 206", mapQuery: "str. Sarmizegetusa 43, Chișinău" },
      { name: "Стрэшены", address: "ул. Михай Эминеску 32/2", mapQuery: "str. Mihai Eminescu 32, Strășeni" },
      { name: "Ворничены", address: "Теоретический лицей «Ион Инкулец», ул. Сфатул Цэрий 14", mapQuery: "Liceul Teoretic Ion Inculeț, Sfatul Țării 14, Vorniceni, Strășeni" },
    ],
    mapOpen: "Смотреть на карте",
  },

  footer: {
    heading: "Ждём тебя в GLG",
    text: "Сделай первый шаг к водительскому удостоверению. Ждём тебя в одном из наших филиалов в Кишинёве, Стрэшенах или Ворниченах.",
    columns: [
      {
        title: "Курсы",
        links: [
          { label: "Запись онлайн", href: "/inscriere" },
          { label: "Пакет Standard", href: "/#preturi" },
        ],
      },
      {
        title: "Автошкола",
        links: [
          { label: "О нас", href: "/#despre" },
          { label: "Как записаться", href: "/#cursuri" },
          { label: "Информация о записи", href: "/informatii-inscriere" },
          { label: "Команда", href: "/#echipa" },
          { label: "Частые вопросы", href: "/#intrebari" },
          { label: "Блог", href: "/blog" },
        ],
      },
      {
        title: "Контакты",
        links: [
          { label: site.phone, href: site.phoneHref },
          { label: site.email, href: `mailto:${site.email}` },
          { label: "Понедельник - Суббота", href: "/#contact" },
        ],
      },
    ],
    rights: "Все права защищены. Автошкола · Кишинёв",
    credit: "Создание сайта - landings.md",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    cookieSettings: "Настройки cookie",
  },

  floating: { label: "Связаться с нами", call: "Позвонить" },

  guide: {
    eyebrow: "Автошкола в Кишинёве",
    title: "Как получить права",
    titleAccent: "категории B в Молдове",
    paragraphs: [
      "GLG Property, автошкола в Кишинёве с филиалами в секторах Буюканы и Ботаника и группами теории в Стрэшенах и Ворниченах. Уже 10 лет мы готовим будущих водителей к получению прав (категории A1, A2, A, B1, B, C, CE, D), на румынском и русском языках, с аттестованными инструкторами и автомобилями Skoda Fabia и Skoda Scala, на реальных экзаменационных маршрутах.",
      "Шаги простые. Записываешься в лицензированную автошколу, проходишь курс теории (3 месяца, понедельник и среда, вторник и четверг или суббота, в группе выходного дня) и 24 практических занятия из [пакета Standard](/#preturi), затем сдаёшь теоретический и практический экзамены в Агентстве государственных услуг. Для досье нужны удостоверение личности и медицинская справка, а минимальный возраст для категории B составляет 18 лет.",
      "Филиал и время группы выбираешь прямо в [форме онлайн-записи](/inscriere), а мы перезвоним для подтверждения. Курс можно оплатить в рассрочку до 25 платежей, а при записи в секторах Ботаника и Буюканы ты получаешь подарочный ваучер на 200 леев. Советы к экзамену и новости читай в [блоге автошколы](/blog), а адреса и график работы смотри в разделе [Контакты](/#contact).",
    ],
  },

  notFound: {
    eyebrow: "Ошибка 404",
    title: "Страница не найдена",
    text: "Возможно, ссылка неверна или страница была перемещена. Вернись на главную или сразу отправь заявку на запись в автошколу.",
    cta: { label: "Записаться онлайн", href: "/inscriere" },
    home: { label: "На главную", href: "/" },
    linksTitle: "Возможно, тебе пригодится",
    links: [
      { label: "Об автошколе", href: "/#despre" },
      { label: "Пакет Standard, категория B", href: "/#preturi" },
      { label: "Как записаться", href: "/#cursuri" },
      { label: "Частые вопросы", href: "/#intrebari" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты и филиалы", href: "/#contact" },
    ],
  },

  privacy: {
    title: "Политика конфиденциальности",
    updated: "Последнее обновление: август 2026",
    sections: [
      {
        h: "Кто мы",
        p: "Оператором ваших данных является GLG Property SRL, лицензированная автошкола в Кишинёве, Республика Молдова (сайт: scoalaautoglg.com). Мы обрабатываем персональные данные в соответствии с Законом № 133/2011 о защите персональных данных и принципами Регламента (ЕС) 2016/679 (GDPR).",
      },
      {
        h: "Какие данные мы собираем",
        p: "Через форму онлайн-записи мы собираем данные, необходимые для оформления заявления-договора об обучении: фамилию и имя, IDNP, дату рождения, пол, гражданство, данные удостоверения личности (серия, номер, дата и орган выдачи), адрес проживания, номер телефона, адрес электронной почты, место работы (по желанию) и, если есть, данные водительского удостоверения. Другие данные мы не собираем и не используем данные из формы для рекламы.",
      },
      {
        h: "Зачем мы их собираем",
        p: "Мы используем эти данные для: обработки вашей заявки и телефонного звонка для подтверждения, оформления договора об обучении и досье, требуемого законом для допуска к экзаменам, передачи информации, связанной с курсом. Основание обработки: ваше согласие и заключение договора об обучении.",
      },
      {
        h: "Кому мы их передаём",
        p: "Данные попадают во внутреннюю систему учёта автошколы, доступную только уполномоченным сотрудникам. Государственным органам (например, Агентству государственных услуг) мы передаём данные только тогда, когда этого требует закон для допуска к экзамену. Мы не продаём и не передаём ваши данные другим компаниям в маркетинговых целях.",
      },
      {
        h: "Как долго мы их храним",
        p: "Мы храним данные в течение обучения, а затем в течение срока, установленного законодательством для архивирования учебных досье. Если вы отправили форму, но не записались, вы можете в любой момент попросить удалить данные.",
      },
      {
        h: "Cookie и локальное хранилище",
        p: "Сайт использует только строго необходимое хранилище: выбранный язык, закрытие рекламного объявления и ваш выбор относительно cookie. Мы не используем рекламные или отслеживающие cookie. Карта Google в разделе Контакты загружается только с вашего согласия на внешние медиа; при загрузке Google может устанавливать свои cookie согласно своей политике. Вы можете в любой момент изменить свой выбор по ссылке Настройки cookie внизу страницы.",
      },
      {
        h: "Ваши права",
        p: "Вы имеете право на доступ к своим данным, на их исправление, удаление, ограничение обработки, право на возражение и право в любой момент отозвать согласие. По любому запросу пишите на scoalaauto.glgproperty@gmail.com или звоните по номеру 069 792 889. Если вы считаете, что ваши права нарушены, вы можете подать жалобу в Национальный центр по защите персональных данных Республики Молдова (datepersonale.md).",
      },
      {
        h: "Контакты",
        p: "GLG Property SRL, Кишинёв, Республика Молдова. E-mail: scoalaauto.glgproperty@gmail.com. Телефон: 069 792 889.",
      },
    ],
  },

  terms: {
    title: "Условия использования",
    updated: "Последнее обновление: август 2026",
    sections: [
      {
        h: "Кто мы",
        p: "Сайт scoalaautoglg.com управляется GLG Property SRL, лицензированной автошколой в Кишинёве, Республика Молдова. Используя этот сайт, вы соглашаетесь с приведёнными ниже условиями.",
      },
      {
        h: "Назначение сайта",
        p: "Сайт представляет услуги автошколы и позволяет отправить заявку на запись онлайн. Отправка формы не создаёт договор и не гарантирует место в группе: договор об обучении подписывается в офисе, после того как мы свяжемся с вами по телефону для подтверждения.",
      },
      {
        h: "Бронирование места в группе",
        p: "Отправленная онлайн заявка не гарантирует место в группе. Место бронируется только после оплаты регистрационного взноса 1/2, 500 лей, или базового тарифа, 3500 лей, в течение 24 часов с момента отправки заявки. Оплатить можно онлайн, по ссылкам, полученным на email, или в филиале. Платежи проверяет сотрудник школы и подтверждает их в тот же день или на следующий. Если за 24 часа оплата не зарегистрирована, заявка больше не держит место и её нужно подать заново. Регистрационный взнос 2/2, 3000 лей, при оплате регистрационного взноса 1/2, оплачивается до первого занятия теории.",
      },
      {
        h: "Использование сайта",
        p: "Вы обязуетесь указывать в форме настоящие и полные данные, относящиеся к вам. Запрещено злоупотреблять сайтом: отправлять ложные или повторные заявки, пытаться получить несанкционированный доступ, нарушать работу сайта.",
      },
      {
        h: "Цены и информация",
        p: "Информация на сайте, включая сведения о курсах и предложениях, носит информационный характер и может обновляться без предупреждения. Окончательные цены и конкретные условия подтверждаются по телефону или в офисе, до подписания договора.",
      },
      {
        h: "Интеллектуальная собственность",
        p: "Содержимое сайта (тексты, изображения, видео, логотип) принадлежит GLG Property SRL или используется с согласия правообладателей. Копирование или публикация без нашего письменного согласия запрещены.",
      },
      {
        h: "Персональные данные и cookie",
        p: "То, как мы обрабатываем персональные данные из формы и какие cookie использует сайт, описано в Политике конфиденциальности, доступной внизу страницы.",
      },
      {
        h: "Ответственность",
        p: "Мы стараемся, чтобы информация на сайте была точной и актуальной, но не отвечаем за временную недоступность сайта или внешних встроенных сервисов (например, карты Google). Сайт предоставляется как есть, без дополнительных гарантий.",
      },
      {
        h: "Применимое право",
        p: "Настоящие условия регулируются законодательством Республики Молдова. Возможные споры решаются мирным путём, а если это невозможно, компетентными судами Кишинёва.",
      },
      {
        h: "Контакты",
        p: "GLG Property SRL, Кишинёв, Республика Молдова. E-mail: scoalaauto.glgproperty@gmail.com. Телефон: 069 792 889.",
      },
    ],
  },

  cookies: {
    title: "Cookie и конфиденциальность",
    text: "Мы используем только строго необходимое хранилище (выбранный язык, этот выбор). Карта Google в разделе Контакты загружается только с вашего согласия и может устанавливать cookie Google. Подробнее в",
    short: "Используем только необходимые cookie и, с твоего согласия, карту Google.",
    more: "Подробнее",
    policyLabel: "Политике конфиденциальности",
    accept: "Принять",
    acceptAll: "Принять все",
    necessaryOnly: "Только необходимые",
    prefs: "Настройки",
    save: "Сохранить выбор",
    categories: {
      necessary: {
        label: "Строго необходимые",
        desc: "Выбранный язык, закрытие объявления и сохранение этого выбора. Нельзя отключить.",
      },
      media: {
        label: "Внешние медиа (Google Maps)",
        desc: "Загружает карту Google в разделе Контакты. Google может устанавливать свои cookie.",
      },
    },
  },
};

export const dictionaries: Record<Lang, Dict> = { ro, ru };
