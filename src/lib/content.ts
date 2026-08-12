/**
 * Centralized site content for Școala Auto GLG Property.
 * All copy is in Romanian, adapted from the school's existing information.
 */

export const site = {
  name: "GLG Property",
  shortName: "GLG",
  tagline: "Școală auto",
  phone: "069 792 889",
  phoneHref: "tel:+37369792889",
  email: "contact@scoalaautoglg.com",
  social: {
    facebook: "https://www.facebook.com/scoalaautoBuiucani/",
    instagram: "https://www.instagram.com/glgproperty/?hl=ro",
    tiktok: "https://www.tiktok.com/@glgproperty",
  },
};

export const nav = [
  { label: "Acasă", href: "#acasa" },
  { label: "Cursuri", href: "#cursuri" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Despre noi", href: "#despre" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Toate categoriile",
  titleTop: "Obținem împreună",
  titleBottom: "permisul tău de conducere",
  subtitle:
    "Indiferent de categoria dorită, îți asigurăm succesul la examen. Teorie și practică alături de cei mai competenți instructori din Republica Moldova.",
  primaryCta: { label: site.phone, href: site.phoneHref },
  secondaryCta: { label: "Vezi pachetele", href: "#preturi" },
  chips: [
    "15.000+ absolvenți",
    "Nr. 1 la rata de promovare",
    "8 ani de experiență",
    "4 centre în Chișinău",
  ],
};

export const benefits = [
  {
    icon: "languages",
    title: "Grupe în română și rusă",
    text: "Alegi limba în care înveți cel mai confortabil. Avem grupe separate în limba română și în limba rusă.",
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
    text: "Pachetele Standard și Social se pot achita în până la 25 de rate, ca să înveți fără grija cheltuielilor.",
    tag: "0% stres",
  },
];

export const stats = [
  { value: 15000, suffix: "+", label: "Absolvenți" },
  { value: 8, suffix: "", label: "Ani de experiență" },
  { value: 70, suffix: "+", label: "Instructori & angajați" },
  { value: 4, suffix: "", label: "Centre în Chișinău" },
];

export const why = {
  eyebrow: "Mai mult decât o școală auto",
  title: "De ce să alegi",
  titleAccent: "GLG Property",
  subtitle:
    "Te pregătim să conduci cu adevărat, nu doar să treci examenul. Iată ce ne face diferiți.",
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
      text: "Te însoțim de la înscriere până la examen, fără stres și cu tot ce ai nevoie.",
    },
  ],
};

export const voucher = {
  badge: "Ofertă",
  title: "Voucher cadou de 200 lei",
  text: "Primești un voucher cadou în valoare de 200 lei la depunerea cererii de înscriere în sectoarele Botanica și Buiucani.",
  cta: { label: "Solicită voucherul", href: "#contact" },
};

export type Plan = {
  name: string;
  badge?: string;
  featured?: boolean;
  tagline: string;
  category: string;
  features: string[];
};

export const pricing = {
  eyebrow: "Categoriile B1 și B incluse",
  title: "Alege pachetul potrivit",
  titleAccent: "pentru tine",
  subtitle:
    "Trei pachete, aceeași calitate a instruirii. Alegi în funcție de program și buget.",
  plans: [
    {
      name: "Premium",
      badge: "Individual",
      tagline: "Pentru cei care vor rezultate rapide și grupe mici.",
      category: "B1 · B",
      features: [
        "Durată curs: 3 luni",
        "Ore doar sâmbăta",
        "24 lecții practice cu Skoda Scala pe traseele de examinare",
        "Doar 12 persoane în grup",
        "Manuale gratuite",
        "Examen teoretic și practic gratuit",
        "Certificat de instruire gratuit",
        "Achitare deplină la depunerea cererii",
      ],
    },
    {
      name: "Standard",
      badge: "Cel mai popular",
      featured: true,
      tagline: "Echilibrul perfect între program flexibil și preț.",
      category: "B1 · B",
      features: [
        "Durată curs: 3 luni",
        "Luni & miercuri sau marți & joi",
        "Orare: 09:30, 16:00, 17:30, 19:00 (18:00 grupa rusă)",
        "15 lecții cu Skoda Fabia + 9 cu Skoda Scala",
        "Grup de 30 persoane",
        "Achitare în 25 de rate",
        "Voucher cadou de 200 lei",
      ],
    },
    {
      name: "Social",
      badge: "Preț redus",
      tagline: "Pentru persoanele care beneficiază de sprijin social.",
      category: "B1 · B",
      features: [
        "Durată curs: 3 luni",
        "Luni & miercuri sau marți & joi",
        "50% reducere la teorie",
        "24 lecții practice cu Skoda Fabia",
        "Grup de 30 persoane",
        "Achitare în 25 de rate",
        "Necesită acte APL ce confirmă vulnerabilitatea socială",
      ],
    },
  ] as Plan[],
};

export const steps = {
  eyebrow: "Simplu de la început până la final",
  title: "Cum te înscrii,",
  titleAccent: "pas cu pas",
  subtitle: "De la prima vizită până la permisul în buzunar.",
  items: [
    {
      title: "Alege pachetul potrivit",
      text: "Compari pachetele Premium, Standard și Social și alegi ce ți se potrivește.",
      link: { label: "Vezi prețurile", href: "#preturi" },
    },
    {
      title: "Depune cererea la un centru",
      text: "Te apropii de unul dintre cele 4 centre din Chișinău și completezi cererea de înscriere.",
      link: { label: "Unde ne găsești?", href: "#contact" },
    },
    {
      title: "Urmezi cursurile de teorie și practică",
      text: "Înveți cu instructori experimentați, pe mașini moderne, în grupă în limba română sau rusă.",
    },
    {
      title: "Susții examenul și iei permisul",
      text: "Te pregătim temeinic pentru examenul teoretic și practic, ca să promovezi din prima.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Recenzii reale de la absolvenți",
  title: "Ce spun",
  titleAccent: "elevii noștri",
};

export const faq = {
  eyebrow: "Ai o întrebare?",
  title: "Întrebări",
  titleAccent: "frecvente",
  subtitle: "Găsești aici cele mai importante răspunsuri.",
  items: [
    {
      q: "Ce categorii pot obține la GLG Property?",
      a: "Te pregătim pentru categoriile B1 și B, cele mai solicitate pentru autoturisme.",
    },
    {
      q: "Cât durează cursul?",
      a: "Toate pachetele au o durată de 3 luni și includ atât teoria, cât și practica.",
    },
    {
      q: "Pot achita în rate?",
      a: "Da. Pachetele Standard și Social se pot achita în până la 25 de rate. Pachetul Premium se achită integral la depunerea cererii.",
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
};

export const contact = {
  eyebrow: "Te așteptăm",
  title: "Află unde poți depune",
  titleAccent: "cererea",
  subtitle:
    "Avem patru centre în Chișinău, deschise de luni până sâmbătă. Sună-ne sau treci pe la noi.",
  hours: "Luni – Sâmbătă",
  sectors: ["Botanica", "Buiucani", "și alte 2 centre în Chișinău"],
};
