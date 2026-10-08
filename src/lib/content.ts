/**
 * Centralized site content for Școala Auto GLG Property.
 * Two full dictionaries (ro / ru); the active one is served by LanguageProvider.
 */

export const site = {
  name: "GLG Property",
  shortName: "GLG",
  phone: "069 792 889",
  phoneHref: "tel:+37369792889",
  email: "contact@scoalaautoglg.com",
  social: {
    facebook: "https://www.facebook.com/scoalaautoBuiucani/",
    instagram: "https://www.instagram.com/glgproperty/?hl=ro",
    tiktok: "https://www.tiktok.com/@glgproperty",
  },
};

export type Lang = "ro" | "ru";
export const langs: Lang[] = ["ro", "ru"];
export const langNames: Record<Lang, string> = { ro: "Română", ru: "Русский" };

type Cta = { label: string; href: string };
type NavItem = { label: string; href: string };

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
    slotDaysHint: string;
    scheduleOther: string;
    schedule: string;
    schedulePlaceholder: string;
    practiceLocation: string;
    practiceLocationPlaceholder: string;
    license: string;
    licenseNumber: string;
    licenseIssued: string;
    licenseIssuedPlaceholder: string;
  };
  consent: string;
  consentLinkLabel: string;
  consentSuffix: string;
  submit: string;
  submitting: string;
  callOption: string;
  errors: {
    required: string;
    idnp: string;
    email: string;
    phone: string;
    date: string;
    consent: string;
    checkField: string;
    noRuGroup: string;
    formInvalid: string;
    serverInvalid: string;
    captcha: string;
    rateLimited: string;
    generic: string;
    network: string;
  };
  success: {
    title: string;
    text: string;
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
    primaryCta: Cta;
    secondaryCta: Cta;
    chips: string[];
  };
  benefits: { icon: string; title: string; text: string; tag: string }[];
  stats: { value: number; suffix: string; label: string }[];
  cars: { badge: string; title: string; text: string; chips: string[]; cta: Cta };
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
  };
  enroll: EnrollDict;
  steps: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    items: { title: string; text: string; link?: Cta }[];
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
    followUs: string;
    mapBadge: string;
    mapTitle: string;
    mapConsentText: string;
    mapConsentCta: string;
    centersTitle: string;
    callNow: string;
    sectors: string[];
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
    policyLabel: string;
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
      { label: "Contact", href: "/#contact" },
    ],
    cta: { label: "Înscrie-te", href: "/inscriere" },
    menuAria: "Meniu",
    langAria: "Schimbă limba",
  },

  hero: {
    eyebrow: "Toate categoriile",
    titleTop: "Obținem împreună",
    titleBottom: "permisul tău de conducere",
    subtitle:
      "Teorie și practică cu instructori atestați, mașini moderne și 4 centre în Chișinău. Grupe în română și rusă.",
    primaryCta: { label: "Înscrie-te online", href: "/inscriere" },
    secondaryCta: { label: site.phone, href: site.phoneHref },
    chips: [
      "15.000+ absolvenți",
      "Nr. 1 la rata de promovare",
      "8 ani de experiență",
      "4 centre în Chișinău",
    ],
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
    { value: 15000, suffix: "+", label: "Absolvenți" },
    { value: 8, suffix: "", label: "Ani de experiență" },
    { value: 70, suffix: "+", label: "Instructori & angajați" },
    { value: 4, suffix: "", label: "Centre în Chișinău" },
  ],

  cars: {
    badge: "Parcul auto GLG",
    title: "Mașini moderne, întreținute impecabil",
    text: "Înveți pe aceleași modele pe care vei susține examenul, pe traseele reale de examinare din Chișinău.",
    chips: ["Skoda Fabia", "Skoda Scala", "Trasee de examinare"],
    cta: { label: "Vezi pachetul", href: "#preturi" },
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
        title: "Nr. 1 în Moldova la promovare",
        text: "Cea mai bună rată de promovare a examenelor teoretice și practice din prima încercare.",
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
    eyebrow: "Categoriile B1 și B incluse",
    title: "Un singur pachet,",
    titleAccent: "simplu și complet",
    subtitle:
      "Fără opțiuni complicate: toți cursanții primesc același curs complet, cu program flexibil și plata în rate.",
    categoryLabel: "Categoriile",
    plan: {
      name: "Standard",
      tagline: "Tot ce ai nevoie ca să obții permisul, într-un singur pachet.",
      category: "B1 · B",
      features: [
        "Durată curs: 3 luni",
        "Luni & miercuri sau marți & joi",
        "Orare: 09:30, 16:00, 17:30, 19:00 (18:00 grupa rusă)",
        "24 de lecții practice cu Skoda Fabia și Skoda Scala",
        "Grup de maximum 30 de persoane",
        "Achitare în până la 25 de rate",
      ],
    },
    enrollCta: { label: "Înscrie-te online", href: "/inscriere" },
    note: "Prețurile detaliate ți le comunicăm la telefon sau direct la centru.",
    noteCta: { label: "Contactează-ne", href: "#contact" },
  },

  enroll: {
    eyebrow: "Cerere de înscriere",
    title: "Înscrie-te",
    titleAccent: "online",
    subtitle:
      "Completează cererea-contract de acasă, în câteva minute. Alegi sediul și ora grupei, iar noi te sunăm ca să confirmăm înscrierea.",
    optional: "(opțional)",
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
      phoneFamily: "Contact părinți / soț(ie)",
      phoneFamilyPlaceholder: "nume și telefon",
      raion: "Raion / sector",
      locality: "Localitate",
      street: "Strada",
      number: "Nr.",
      apartment: "Ap.",
      idSeries: "Seria",
      idNumber: "Numărul",
      idIssuedBy: "Eliberat de",
      idIssuedDate: "Data eliberării",
      workplace: "Locul de muncă (instituția)",
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
      slot: "Ora grupei",
      slotPickSediu: "Alege întâi sediul",
      slotSaturday: "Sâmbătă",
      slotDaysHint:
        "Zilele (Luni și Miercuri sau Marți și Joi) le stabilim împreună cu tine când grupa se formează.",
      scheduleOther: "Altă preferință de orar",
      schedule: "Ora disponibilă pentru cursuri",
      schedulePlaceholder: "ex.: după 17:30",
      practiceLocation: "Locația lecțiilor practice",
      practiceLocationPlaceholder: "Alege locația",
      license: "Permis de conducere (dacă ai deja unul)",
      licenseNumber: "Nr. permisului",
      licenseIssued: "Eliberat",
      licenseIssuedPlaceholder: "data / autoritatea",
    },
    consent:
      "Sunt de acord cu prelucrarea datelor mele personale de către GLG Property SRL în scopul înscrierii la cursuri și al întocmirii contractului de școlarizare, conform Legii 133/2011 privind protecția datelor cu caracter personal. Am citit",
    consentLinkLabel: "politica de confidențialitate",
    consentSuffix: ".",
    submit: "Trimite cererea",
    submitting: "Se trimite…",
    callOption: "Preferi să vorbim la telefon?",
    errors: {
      required: "Câmp obligatoriu",
      idnp: "IDNP-ul are exact 13 cifre",
      email: "Adresă de e-mail invalidă",
      phone: "Număr de telefon invalid",
      date: "Dată invalidă",
      consent: "Bifează acordul ca să poți trimite cererea",
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
      title: "Cererea a fost trimisă!",
      text: "Îți mulțumim! Un coleg de la GLG te va suna în curând ca să confirme înscrierea și să-ți răspundă la întrebări.",
      duplicateTitle: "Cererea ta există deja",
      duplicateText:
        "Am primit deja o cerere cu acest telefon sau IDNP în ultimele 24 de ore. Nu e nevoie să o retrimiți, te sunăm noi.",
      back: "Înapoi la pagina principală",
      call: "Sună-ne",
    },
  },

  steps: {
    eyebrow: "Patru pași",
    title: "Cum te înscrii,",
    titleAccent: "pas cu pas",
    subtitle: "De la cerere până la permis.",
    items: [
      {
        title: "Completează cererea",
        text: "Trimiți cererea online în câteva minute, sau ne suni și o completăm împreună.",
        link: { label: "Completează cererea", href: "/inscriere" },
      },
      {
        title: "Confirmăm detaliile",
        text: "Te sunăm și stabilim grupa, orarul și actele necesare.",
        link: { label: "Unde ne găsești?", href: "#contact" },
      },
      {
        title: "Urmezi teoria și practica",
        text: "Cursuri cu instructori experimentați, pe mașini moderne, în română sau rusă.",
      },
      {
        title: "Susții examenul",
        text: "Te pregătim pentru proba teoretică și practică, ca să promovezi din prima.",
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
        a: "Te pregătim pentru categoriile B1 și B, cele mai solicitate pentru autoturisme.",
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
        a: "Da, avem grupe în limba rusă (ora 18:00), pe lângă grupele în limba română.",
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
        a: "Avem 4 centre în Chișinău, deschise de luni până sâmbătă. Ne poți suna la 069 792 889.",
      },
    ],
  },

  contact: {
    eyebrow: "Te așteptăm",
    title: "Află unde poți depune",
    titleAccent: "cererea",
    subtitle:
      "Avem patru centre în Chișinău, deschise de luni până sâmbătă. Sună-ne sau treci pe la noi.",
    callUs: "Sună-ne",
    hoursLabel: "Program",
    hours: "Luni - Sâmbătă",
    followUs: "Urmărește-ne",
    mapBadge: "4 centre în Chișinău",
    mapTitle: "Harta Google, Școala Auto GLG Property, Chișinău",
    mapConsentText: "Harta Google se încarcă doar cu acordul tău pentru media externe. La încărcare, Google poate seta cookie-uri proprii.",
    mapConsentCta: "Afișează harta",
    centersTitle: "Centrele noastre",
    callNow: "Sună acum",
    sectors: ["Botanica", "Buiucani", "și alte 2 centre în Chișinău"],
  },

  footer: {
    heading: "Gata să obții permisul",
    text: "Fă primul pas spre carnetul de conducere. Te așteptăm la unul dintre cele patru centre din Chișinău.",
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
          { label: "Întrebări frecvente", href: "/#intrebari" },
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
        p: "Ai dreptul de acces la datele tale, dreptul la rectificare, la ștergere, la restricționarea prelucrării, dreptul de opoziție și dreptul de a-ți retrage oricând consimțământul. Pentru orice solicitare scrie-ne la contact@scoalaautoglg.com sau sună la 069 792 889. Dacă consideri că drepturile tale au fost încălcate, poți depune o plângere la Centrul Național pentru Protecția Datelor cu Caracter Personal al Republicii Moldova (datepersonale.md).",
      },
      {
        h: "Contact",
        p: "GLG Property SRL, Chișinău, Republica Moldova. E-mail: contact@scoalaautoglg.com. Telefon: 069 792 889.",
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
        p: "GLG Property SRL, Chișinău, Republica Moldova. E-mail: contact@scoalaautoglg.com. Telefon: 069 792 889.",
      },
    ],
  },

  cookies: {
    title: "Cookie-uri și confidențialitate",
    text: "Folosim doar stocare strict necesară (limba aleasă, această alegere). Harta Google din secțiunea Contact se încarcă doar cu acordul tău și poate seta cookie-uri proprii Google. Detalii în",
    policyLabel: "Politica de confidențialitate",
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
      { label: "Контакты", href: "/#contact" },
    ],
    cta: { label: "Записаться", href: "/inscriere" },
    menuAria: "Меню",
    langAria: "Сменить язык",
  },

  hero: {
    eyebrow: "Все категории",
    titleTop: "Вместе получим",
    titleBottom: "твои водительские права",
    subtitle:
      "Теория и практика с аттестованными инструкторами, современные автомобили и 4 филиала в Кишинёве. Группы на румынском и русском языках.",
    primaryCta: { label: "Записаться онлайн", href: "/inscriere" },
    secondaryCta: { label: site.phone, href: site.phoneHref },
    chips: [
      "15 000+ выпускников",
      "№1 по проценту сдачи",
      "8 лет опыта",
      "4 филиала в Кишинёве",
    ],
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
    { value: 15000, suffix: "+", label: "Выпускников" },
    { value: 8, suffix: "", label: "Лет опыта" },
    { value: 70, suffix: "+", label: "Инструкторов и сотрудников" },
    { value: 4, suffix: "", label: "Филиала в Кишинёве" },
  ],

  cars: {
    badge: "Автопарк GLG",
    title: "Современные автомобили в идеальном состоянии",
    text: "Учись на тех же моделях, на которых будешь сдавать экзамен, на реальных экзаменационных маршрутах Кишинёва.",
    chips: ["Skoda Fabia", "Skoda Scala", "Экзаменационные маршруты"],
    cta: { label: "Смотреть пакет", href: "#preturi" },
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
        title: "№1 в Молдове по сдаче экзаменов",
        text: "Лучший в стране процент сдачи теоретического и практического экзаменов с первой попытки.",
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
    eyebrow: "Категории B1 и B включены",
    title: "Один пакет,",
    titleAccent: "простой и полный",
    subtitle:
      "Никаких сложных вариантов: все ученики получают один и тот же полный курс с гибким графиком и рассрочкой.",
    categoryLabel: "Категории",
    plan: {
      name: "Standard",
      tagline: "Всё необходимое для получения прав, в одном пакете.",
      category: "B1 · B",
      features: [
        "Длительность курса: 3 месяца",
        "Понедельник и среда или вторник и четверг",
        "Время: 09:30, 16:00, 17:30, 19:00 (18:00 русская группа)",
        "24 практических занятия на Skoda Fabia и Skoda Scala",
        "Группа до 30 человек",
        "Рассрочка до 25 платежей",
      ],
    },
    enrollCta: { label: "Записаться онлайн", href: "/inscriere" },
    note: "Подробные цены сообщим по телефону или прямо в филиале.",
    noteCta: { label: "Свяжись с нами", href: "#contact" },
  },

  enroll: {
    eyebrow: "Заявка на запись",
    title: "Запишись",
    titleAccent: "онлайн",
    subtitle:
      "Заполни заявку-контракт из дома за несколько минут. Выбери филиал и время группы, а мы позвоним, чтобы подтвердить запись.",
    optional: "(необязательно)",
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
      phoneFamily: "Контакт родителей / супруга(и)",
      phoneFamilyPlaceholder: "имя и телефон",
      raion: "Район / сектор",
      locality: "Населённый пункт",
      street: "Улица",
      number: "Дом",
      apartment: "Кв.",
      idSeries: "Серия",
      idNumber: "Номер",
      idIssuedBy: "Кем выдано",
      idIssuedDate: "Дата выдачи",
      workplace: "Место работы (учреждение)",
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
      slotDaysHint:
        "Дни (понедельник и среда или вторник и четверг) мы согласуем с тобой, когда группа формируется.",
      scheduleOther: "Другие пожелания по расписанию",
      schedule: "Удобное время для занятий",
      schedulePlaceholder: "напр.: после 17:30",
      practiceLocation: "Место практических занятий",
      practiceLocationPlaceholder: "Выберите место",
      license: "Водительское удостоверение (если уже есть)",
      licenseNumber: "Номер удостоверения",
      licenseIssued: "Выдано",
      licenseIssuedPlaceholder: "дата / орган выдачи",
    },
    consent:
      "Я согласен(на) на обработку моих персональных данных компанией GLG Property SRL в целях записи на курсы и оформления договора об обучении, в соответствии с Законом 133/2011 о защите персональных данных. Я ознакомился(лась) с",
    consentLinkLabel: "политикой конфиденциальности",
    consentSuffix: ".",
    submit: "Отправить заявку",
    submitting: "Отправляем…",
    callOption: "Удобнее по телефону?",
    errors: {
      required: "Обязательное поле",
      idnp: "IDNP состоит ровно из 13 цифр",
      email: "Неверный адрес e-mail",
      phone: "Неверный номер телефона",
      date: "Неверная дата",
      consent: "Отметь согласие, чтобы отправить заявку",
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
      title: "Заявка отправлена!",
      text: "Спасибо! Сотрудник GLG скоро позвонит, чтобы подтвердить запись и ответить на твои вопросы.",
      duplicateTitle: "Твоя заявка уже есть",
      duplicateText:
        "Мы уже получили заявку с этим телефоном или IDNP за последние 24 часа. Отправлять повторно не нужно, мы сами позвоним.",
      back: "Вернуться на главную",
      call: "Позвонить",
    },
  },

  steps: {
    eyebrow: "Четыре шага",
    title: "Как записаться,",
    titleAccent: "шаг за шагом",
    subtitle: "От заявки до прав.",
    items: [
      {
        title: "Заполни заявку",
        text: "Отправь заявку онлайн за несколько минут, или позвони нам, и мы заполним её вместе.",
        link: { label: "Заполнить заявку", href: "/inscriere" },
      },
      {
        title: "Подтвердим детали",
        text: "Мы позвоним и согласуем группу, расписание и документы.",
        link: { label: "Где нас найти?", href: "#contact" },
      },
      {
        title: "Пройди теорию и практику",
        text: "Занятия с опытными инструкторами, на современных автомобилях, на румынском или русском.",
      },
      {
        title: "Сдай экзамен",
        text: "Готовим к теории и практике, чтобы сдать с первой попытки.",
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
        a: "Мы готовим к категориям B1 и B, самым востребованным для легковых автомобилей.",
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
        a: "Да, помимо групп на румынском, у нас есть группы на русском языке (в 18:00).",
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
        a: "У нас 4 филиала в Кишинёве, открытых с понедельника по субботу. Звони по номеру 069 792 889.",
      },
    ],
  },

  contact: {
    eyebrow: "Ждём тебя",
    title: "Узнай, где подать",
    titleAccent: "заявление",
    subtitle:
      "У нас четыре филиала в Кишинёве, открытых с понедельника по субботу. Позвони или заходи в гости.",
    callUs: "Позвони нам",
    hoursLabel: "График работы",
    hours: "Понедельник - Суббота",
    followUs: "Подписывайся",
    mapBadge: "4 филиала в Кишинёве",
    mapTitle: "Карта Google, автошкола GLG Property, Кишинёв",
    mapConsentText: "Карта Google загружается только с вашего согласия на внешние медиа. При загрузке Google может устанавливать свои cookie.",
    mapConsentCta: "Показать карту",
    centersTitle: "Наши филиалы",
    callNow: "Звони сейчас",
    sectors: ["Ботаника", "Буюканы", "и ещё 2 филиала в Кишинёве"],
  },

  footer: {
    heading: "Пора получить права",
    text: "Сделай первый шаг к водительскому удостоверению. Ждём тебя в одном из четырёх филиалов в Кишинёве.",
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
          { label: "Частые вопросы", href: "/#intrebari" },
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
        p: "Вы имеете право на доступ к своим данным, на их исправление, удаление, ограничение обработки, право на возражение и право в любой момент отозвать согласие. По любому запросу пишите на contact@scoalaautoglg.com или звоните по номеру 069 792 889. Если вы считаете, что ваши права нарушены, вы можете подать жалобу в Национальный центр по защите персональных данных Республики Молдова (datepersonale.md).",
      },
      {
        h: "Контакты",
        p: "GLG Property SRL, Кишинёв, Республика Молдова. E-mail: contact@scoalaautoglg.com. Телефон: 069 792 889.",
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
        p: "GLG Property SRL, Кишинёв, Республика Молдова. E-mail: contact@scoalaautoglg.com. Телефон: 069 792 889.",
      },
    ],
  },

  cookies: {
    title: "Cookie и конфиденциальность",
    text: "Мы используем только строго необходимое хранилище (выбранный язык, этот выбор). Карта Google в разделе Контакты загружается только с вашего согласия и может устанавливать cookie Google. Подробнее в",
    policyLabel: "Политике конфиденциальности",
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
