/**
 * ==================================================================
 *  „Informație înscriere”: conținutul paginii /informatii-inscriere
 * ==================================================================
 *  Modul de DATE pur (fără React), bilingv RO/RU, folosit de
 *  componentele din src/app/_local/ (InfoInscriere, GrupeLive, Galerie)
 *  și de datele structurate FAQPage din pagina serverului.
 *
 *  Reguli respectate:
 *   - cifrele de preț sunt cele confirmate de patron, cu denumirile
 *     oficiale ale taxelor (2.11.2026). Taxa de bază depinde de categorie
 *     (lista patronului din 13.11.2026, aceleași cifre ca în
 *     src/lib/categories.ts): B, 3500 lei (pachetul Standard, până la 25
 *     de rate); A1, A2, A, 3200 lei (motocicleta, 1200 lei împreună cu B,
 *     C, CE sau D, în aceeași înscriere); C, 1800 lei; CE, 1500 lei; D,
 *     1700 lei; treceri: spre A2 și A și spre B, 2000 lei; „C1 la C” și
 *     „D1 la D”, 1500 lei; „B la A1”, 900 lei (fără teorie, se achită la
 *     sediu). Trecerile fără preț confirmat nu au nicio cifră pe pagină;
 *   - în două părți (taxa de înscriere 1/2, 500 lei, + taxa de înscriere
 *     2/2, până la prima lecție de teorie) se achită doar B și A1, A2, A:
 *     2/2 = 3000 lei la B, 2700 lei la A1, A2, A. Celelalte categorii și
 *     trecerile achită taxa de bază dintr-o dată; la fel orice categorie
 *     dacă grupa începe în cel mult 7 zile. Taxa de înscriere 1/2 + 2/2 =
 *     taxa de bază;
 *   - secțiunile „documente” sunt transcrierea fidelă a celor două foi
 *     oficiale „SC GLG PROPERTY SRL” trimise de patron, fără
 *     reinterpretări; termenii juridici (HG 181/2022, Legea 273/1994,
 *     certificatul F-083/e) rămân exact așa;
 *   - NU conține niciun număr de telefon: numărul public vine din
 *     `site.phone` (src/lib/content.ts), ca să existe o singură sursă;
 *   - fără em-dash și en-dash (DESIGN.md), doar virgulă, punct, cratimă.
 * ==================================================================
 */

import type { Lang } from "./content";
import { LOCATION_NAMES, type GroupOption, type StudyLang } from "./schedule";

export type LocationName = (typeof LOCATION_NAMES)[number];

/** Sediile, în ordinea cerută de patron, cu eticheta publică și pagina locală. */
export const INFO_LOCATIONS: {
  name: LocationName;
  label: { ro: string; ru: string };
  path: string;
}[] = [
  { name: "Botanica", label: { ro: "Chișinău, Botanica", ru: "Кишинёв, Ботаника" }, path: "/scoala-auto-botanica" },
  { name: "Buiucani", label: { ro: "Chișinău, Buiucani", ru: "Кишинёв, Буюканы" }, path: "/scoala-auto-buiucani" },
  { name: "Strășeni", label: { ro: "Strășeni", ru: "Стрэшены" }, path: "/scoala-auto-straseni" },
  { name: "Vorniceni", label: { ro: "Vorniceni", ru: "Ворничены" }, path: "/scoala-auto-vorniceni" },
];

/** Un rând din orarul FIX al unui sediu (varianta de rezervă, vezi mai jos). */
export interface FixedRow {
  days: { ro: string; ru: string };
  hours: string;
  language: StudyLang;
}

/**
 * Orarul FIX al cabinetelor, copia publică a practica-glg/lib/groupSchedule.ts
 * (fără numele cabinetelor). Se afișează DOAR când aplicația internă nu
 * răspunde, ca pagina să nu rămână goală: sunt intervalele în care sediul
 * poate ține grupe, nu grupele chiar deschise acum.
 */
const LU_MI = { ro: "Luni și miercuri", ru: "Понедельник и среда" };
const MA_JO = { ro: "Marți și joi", ru: "Вторник и четверг" };
const MA_VI = { ro: "Marți și vineri", ru: "Вторник и пятница" };
const MI_VI = { ro: "Miercuri și vineri", ru: "Среда и пятница" };
const LU_SA = { ro: "Luni și sâmbătă", ru: "Понедельник и суббота" };
const SA = { ro: "Sâmbăta", ru: "По субботам" };

const CITY_HOURS = "09:30, 16:00, 17:30, 19:00";

const cityRows = (withRussian: boolean): FixedRow[] => [
  { days: LU_MI, hours: CITY_HOURS, language: "ro" },
  { days: MA_JO, hours: CITY_HOURS, language: "ro" },
  ...(withRussian
    ? ([
        { days: LU_MI, hours: "17:30, 19:00", language: "ru" },
        { days: MA_JO, hours: "17:30, 19:00", language: "ru" },
      ] as FixedRow[])
    : []),
  { days: SA, hours: "09:00", language: "ro" },
];

export const FIXED_SCHEDULE: Record<LocationName, FixedRow[]> = {
  "Buiucani": cityRows(true),
  "Botanica": cityRows(false),
  "Strășeni": [
    { days: MA_JO, hours: "15:00", language: "ro" },
    { days: MI_VI, hours: "15:00", language: "ro" },
    { days: LU_SA, hours: "15:00 luni, 10:00 sâmbătă", language: "ro" },
  ],
  "Vorniceni": [{ days: MA_VI, hours: "17:00", language: "ro" }],
};

/**
 * Zilele și ora unei grupe, separate din eticheta publică („Luni și Miercuri ·
 * 17:30”). La varianta „Luni 15:00 și Sâmbătă 10:00” orele stau în interiorul
 * zilelor, de aceea coloana de oră rămâne goală în loc să repete textul.
 */
export function splitGroupLabel(o: GroupOption, lang: Lang): { days: string; hours: string } {
  const label = lang === "ru" ? o.labelRu : o.label;
  const i = label.indexOf(" · ");
  if (i < 0) return { days: label, hours: "" };
  return { days: label.slice(0, i), hours: label.slice(i + 3) };
}

/**
 * Public NU se arată câte locuri au mai rămas (cerința patronului, 31.10.2026):
 * rămâne doar punctul colorat și eticheta lui. Vezi `fillLegend`.
 */

/** „2026-11-12” devine „12.11.2026”; orice altceva se ignoră. */
export function formatStart(iso: string | null | undefined): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : "";
}

// ------------------------------------------------------------------
//  Textele paginii
// ------------------------------------------------------------------

/** Un pas din procedura de achitare. */
export interface Step {
  title: string;
  text: string;
}

/** O secțiune transcrisă din foile oficiale ale școlii. */
export interface DocSection {
  id: string;
  title: string;
  /** Rândurile transcrise, fidel. */
  items: string[];
  /** Precizare proprie (de unde vine informația), opțională. */
  note?: string;
}

/** Un rând din tabelul parcului auto. */
export interface FleetRow {
  categories: string;
  vehicles: string;
}

export interface InfoDict {
  hero: { eyebrow: string; h1: string; intro: string[]; jumpLabel: string };
  jump: { groups: string; price: string; gallery: string; docs: string };
  groups: {
    eyebrow: string;
    title: string;
    subtitle: string;
    daysColumn: string;
    hoursColumn: string;
    langColumn: string;
    seatsColumn: string;
    langRo: string;
    langRu: string;
    enrollCta: string;
    seeSediu: string;
    startLabel: string;
    fillLegend: string;
    emptyTitle: string;
    emptyText: string;
    offlineTitle: string;
    offlineText: string;
    fixedTitle: string;
  };
  price: {
    eyebrow: string;
    title: string;
    subtitle: string;
    totalLabel: string;
    totalValue: string;
    totalNote: string;
    installmentsLabel: string;
    installmentsValue: string;
    installmentsNote: string;
    reserveLabel: string;
    reserveValue: string;
    /**
     * Regula celor 24 de ore (cerința patronului, 31.10.2026): cererea online
     * nu ține locul până nu se achită. Pașii întregi ai înscrierii stau pe
     * prima pagină, secțiunea „Procesul de înscriere”, de acolo linkul.
     */
    reserveRuleTitle: string;
    reserveRuleText: string;
    reserveRuleCta: string;
    stepsTitle: string;
    steps: Step[];
    ruleTitle: string;
    ruleText: string;
    contractTitle: string;
    contractText: string;
    otherTitle: string;
    otherText: string;
    otherCategories: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    carPhoto: string;
    fleetVideo: string;
    fleetVideoNote: string;
    reviewsTitle: string;
    reviewsNote: string;
    videoFallback: string;
    soonPrefix: string;
    missing: { id: string; label: string }[];
  };
  docs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sections: DocSection[];
    fleetTitle: string;
    fleetNote: string;
    fleetCategoriesColumn: string;
    fleetVehiclesColumn: string;
    fleet: FleetRow[];
    officeTitle: string;
    officeAddress: string;
    officeNote: string;
  };
  faqTitle: string;
  faqEyebrow: string;
  faq: { q: string; a: string }[];
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    enroll: string;
    call: string;
  };
}

const FLEET_RO: FleetRow[] = [
  { categories: "AM, A1, A2, A", vehicles: "Maya Motors, Andes" },
  { categories: "B1, BE, B", vehicles: "Skoda Fabia, Skoda Scala, Toyota Yaris (cutie mecanică și automată)" },
  { categories: "C1, C1E, CE, C", vehicles: "Volvo FE 320, Volvo FL 290, MAN (cutie mecanică și automată)" },
  { categories: "D1, D1E, DE, D", vehicles: "Irisbus" },
];

const FLEET_RU: FleetRow[] = [
  { categories: "AM, A1, A2, A", vehicles: "Maya Motors, Andes" },
  { categories: "B1, BE, B", vehicles: "Skoda Fabia, Skoda Scala, Toyota Yaris (механическая и автоматическая коробка)" },
  { categories: "C1, C1E, CE, C", vehicles: "Volvo FE 320, Volvo FL 290, MAN (механическая и автоматическая коробка)" },
  { categories: "D1, D1E, DE, D", vehicles: "Irisbus" },
];

/** Cele trei fotografii care lipsesc din public/ (de cerut patronului). */
const MISSING_RO = [
  { id: "sala-de-curs", label: "Fotografii din sala de curs" },
  { id: "sediul", label: "Fotografii cu intrarea în sediu" },
  { id: "oficiul", label: "Fotografii din oficiu, unde se depun actele" },
];
const MISSING_RU = [
  { id: "sala-de-curs", label: "Фотографии учебного класса" },
  { id: "sediul", label: "Фотографии входа в филиал" },
  { id: "oficiul", label: "Фотографии офиса, где подают документы" },
];

const ro: InfoDict = {
  hero: {
    eyebrow: "Înainte să te înscrii",
    h1: "Informații înscriere: grupe, prețuri și acte",
    intro: [
      "Pe această pagină găsești tot ce trebuie să știi înainte de înscriere: grupele deschise chiar acum, prețul desfășurat și pașii achitării, condițiile de vârstă, cum se țin orele de teorie și de practică și cum se susțin examenele interne.",
      "Datele despre grupe se citesc direct din sistemul școlii, la fiecare deschidere a paginii, deci ce vezi aici este ce se poate alege azi.",
    ],
    jumpLabel: "Sari la",
  },
  jump: {
    groups: "Grupele disponibile",
    price: "Preț și achitare",
    gallery: "Galerie",
    docs: "Ce trebuie să știi",
  },
  groups: {
    eyebrow: "Din sistemul școlii",
    title: "Grupele disponibile acum",
    subtitle:
      "Grupele deschise, pe sedii, cu zilele, ora și limba de studiu. Grupele pline nu mai apar în listă.",
    daysColumn: "Zile",
    hoursColumn: "Ora",
    langColumn: "Limba",
    seatsColumn: "Disponibilitate",
    langRo: "Română",
    langRu: "Rusă",
    enrollCta: "Înscrie-te",
    seeSediu: "Despre acest sediu",
    startLabel: "Începe pe",
    fillLegend: "Verde: sunt locuri. Galben: aproape finisată. Roșu: ultimele locuri disponibile.",
    emptyTitle: "Nicio grupă deschisă acum la acest sediu",
    emptyText:
      "Poți lăsa cererea de înscriere oricum: te sunăm imediat ce pornește grupa următoare la acest sediu și îți spunem zilele, ora și limba.",
    offlineTitle: "Lista grupelor nu se poate încărca în acest moment",
    offlineText:
      "Mai jos sunt zilele și orele standard la care fiecare sediu poate ține grupe. Grupele chiar deschise, cu locurile rămase, se văd în formularul de înscriere.",
    fixedTitle: "Orarul standard al sediilor",
  },
  price: {
    eyebrow: "Preț și achitare",
    title: "Cât costă și cum se achită",
    subtitle:
      "Taxa de bază depinde de categorie. Mai jos găsești taxa fiecărei categorii și variantele de achitare.",
    totalLabel: "Pachetul Standard, categoria B",
    totalValue: "3500 lei",
    totalNote: "Taxa de bază a cursului, teorie și practică.",
    installmentsLabel: "Achitare în rate",
    installmentsValue: "până la 25 de rate",
    installmentsNote: "Se aplică pachetului Standard pentru categoria B.",
    reserveLabel: "Taxa de înscriere 1/2, la B și la A1, A2, A",
    reserveValue: "500 lei",
    reserveRuleTitle: "Rezervarea locului: 24 de ore de la trimiterea cererii",
    reserveRuleText:
      "Cererea online nu garantează locul în grupă. După trimitere primești pe email linkurile de plată și ai 24 de ore ca să achiți taxa de bază a categoriei, online sau la sediu. La B și la A1, A2, A poți achita mai întâi taxa de înscriere 1/2, 500 lei; la celelalte categorii și la treceri taxa de bază se achită dintr-o dată. Plata o verifică un angajat al școlii și o confirmă în aceeași zi sau a doua zi. Dacă în 24 de ore plata nu este înregistrată, cererea nu mai ține locul și trebuie depusă din nou. Taxa de înscriere 2/2 (3000 lei la B, 2700 lei la A1, A2, A), în cazul achitării taxei de înscriere 1/2, se achită până la prima lecție de teorie.",
    reserveRuleCta: "Vezi procesul de înscriere, pas cu pas",
    stepsTitle: "Pașii achitării",
    steps: [
      {
        title: "Depui cererea de înscriere",
        text: "Online, de pe telefon, sau la sediu. Alegi sediul, limba și grupa, iar noi te sunăm să confirmăm.",
      },
      {
        title: "La B și la A1, A2, A, dacă grupa începe peste mai mult de 7 zile, rezervi locul cu taxa de înscriere 1/2",
        text: "Taxa de înscriere 1/2, 500 lei, îți ține locul în grupă. Taxa de înscriere 2/2 (3000 lei la B, 2700 lei la A1, A2, A) se achită până la prima lecție de teorie.",
      },
      {
        title: "Dacă grupa începe în cel mult 7 zile sau a început deja, achiți taxa de bază dintr-o dată",
        text: "În acest caz nu mai există varianta în două taxe de înscriere: taxa de bază se achită dintr-o dată, la înscriere. La C, D, CE și la treceri taxa de bază se achită oricum dintr-o dată.",
      },
      {
        title: "Semnezi contractul de studii",
        text: "Contractul se semnează la sediu sau online, cum îți este mai comod.",
      },
      {
        title: "Începi lecțiile de practică",
        text: "Practica pornește doar după ce contractul este semnat și taxa de bază a categoriei este achitată.",
      },
    ],
    ruleTitle: "Regula de care depinde practica",
    ruleText:
      "Nu poți începe lecțiile de practică până nu ai semnat contractul de studii și nu ai achitat taxa de bază a categoriei. Chiar dacă suma este achitată, fără contract semnat nu se face nicio programare la instructor.",
    contractTitle: "Contractul de studii",
    contractText:
      "Se semnează la sediu sau online. Este documentul care, împreună cu achitarea taxei de bază, deschide accesul la orele de practică.",
    otherTitle: "Taxa de bază la celelalte categorii",
    otherText:
      "Motocicleta (A1, A2 sau A), împreună cu B, C, CE sau D în aceeași înscriere: 1200 lei. Treceri de categorie: de la B la A2 sau A, de la A1 la A2 și de la A2 la A, 2000 lei; de la A1, A2, A sau B1 la B, 2000 lei; de la C1 la C și de la D1 la D, 1500 lei; de la B la A1, 900 lei (fără teorie, se achită la sediu). La C, CE, D și la treceri taxa de bază se achită dintr-o dată. Pentru alte treceri sună-ne sau treci pe la sediu.",
    otherCategories: "A1, A2, A: 3200 lei. C: 1800 lei. CE: 1500 lei. D: 1700 lei.",
  },
  gallery: {
    eyebrow: "Galerie",
    title: "Școala, mașinile și recenziile",
    subtitle: "Mașinile pe care înveți, parcul auto în mișcare și recenzii filmate de absolvenți.",
    carPhoto: "Mașină de instruire a școlii",
    fleetVideo: "Parcul auto, video",
    fleetVideoNote: "Videoclipul pornește la click, ca pagina să se încarce repede.",
    reviewsTitle: "Recenzii video de la absolvenți",
    reviewsNote: "Patru recenzii filmate la sediu. Pornesc la click.",
    videoFallback: "Browserul tău nu poate reda acest videoclip.",
    soonPrefix: "în curând",
    missing: MISSING_RO,
  },
  docs: {
    eyebrow: "Din documentele școlii",
    title: "Ce trebuie să știe cursantul",
    subtitle:
      "Textul de mai jos este transcrierea foilor oficiale ale SC GLG PROPERTY SRL: parcul auto, vârsta minimă, frecventarea modulelor, examinarea internă și certificatul de absolvire.",
    sections: [
      {
        id: "varsta",
        title: "Vârsta minimă",
        items: [
          "16 ani pentru AM, A1 și B1.",
          "18 ani pentru B, BE, H și subcategoriile A2, C1, C1E.",
          "20 de ani pentru categoria A, dacă dovedește 2 ani de conducere pe motociclu din subcategoria A2, și pentru triciclu cu putere peste 15 kW.",
          "21 de ani pentru C, CE, F, I și subcategoriile D1, D1E.",
          "24 de ani pentru A, D și DE.",
          "Aptitudine medicală pentru categoria solicitată.",
          "Dovada absolvirii unui program de formare autorizat, confirmată prin înscrieri în Registrul unităților de instruire a conducătorilor de vehicule și formabililor.",
          "Act de identitate aprobat prin Legea nr. 273/1994.",
        ],
        note: "Hotărârea de Guvern nr. 181/2022, art. 19.",
      },
      {
        id: "module",
        title: "Înscrierea și frecventarea modulelor, teorie și practică",
        items: [
          "Se permite absentarea de la cursul teoretic din motive întemeiate, până la 25% din totalul orelor teoretice prevăzute de program.",
          "Schimbarea la alt curs de teorie, cu alt orar, se face doar prin exmatriculare și înmatriculare repetată.",
          "Lecțiile de practică au durata de 90 de minute și se desfășoară conform programului stabilit cu instructorul, ori cu o persoană responsabilă din oficiu, telefonic, cu stabilirea locului de pornire.",
          "Numerele de contact ale instructorilor se găsesc pe fișa de evidență a orelor practice, eliberată cursantului la cursul teoretic, ori la oficiu, în cel mult 3 săptămâni de la începutul instruirii teoretice.",
          "La lecția practică obligatoriu se prezintă cu buletinul de identitate și fișa de evidență a orelor practice; suplimentar este nevoie și de certificatul medical F-083/e.",
          "În cazul neconcordanței cu instructorul, ori dacă graficul instructorului este supraîncărcat, cursantul poate schimba instructorul cu acordul persoanelor responsabile din oficiu.",
          "Pierderea fișei se restabilește la oficiu; semnăturile instructorului și data desfășurării lecțiilor practice sunt colectate individual de cursant.",
        ],
      },
      {
        id: "examinare",
        title: "Examinarea pentru certificatul de absolvire",
        items: [
          "Examenul teoretic intern este gratuit și se susține odată cu toată grupa, la ora și locul stabilite anticipat de profesorul de teorie.",
          "În cazul imposibilității prezentării la examen, cursantul se prezintă într-o zi de vineri, la orele 10:00, 11:00, 12:00, 13:30, 14:30, 15:30 sau 16:30.",
          "În cazul calificativului „respins”, examinarea repetată are loc de marți până vineri, la aceleași ore.",
          "Cu calificativul „admis” la teorie, cursanții se pot înscrie la examenul practic intern.",
          "Examenul practic intern se desfășoară vineri, sâmbătă și, după caz, duminică, prin programare prealabilă la oficiu.",
          "Se pot înscrie cursanții care au obținut „admis” la teorie, au desfășurat toate lecțiile practice obligatorii și prezintă fișa de practică și certificatul medical F-083/e de la medicul de familie ori centrul specializat.",
          "În cazul calificativului „respins”, se efectuează examinarea repetată contra cost; este recomandată desfășurarea orelor suplimentare de instruire.",
          "Cu „admis”, absolvenții se pot prezenta pentru eliberarea certificatului de absolvire în săptămâna următoare.",
        ],
      },
      {
        id: "certificat",
        title: "Certificatul de absolvire",
        items: [
          "Se eliberează cu condiția obținerii calificativului „admis” la ambele examene, teoretic și practic.",
          "Suplimentar, la oficiu trebuie să se regăsească fișa de practică și certificatul medical F-083/e.",
          "Se eliberează contra cost, începând cu săptămâna următoare, de marți până vineri, în intervalul 13:30-16:30.",
        ],
      },
    ],
    fleetTitle: "Parcul auto",
    fleetNote: "Peste 50 de mijloace de transport, pe categorii.",
    fleetCategoriesColumn: "Categorii",
    fleetVehiclesColumn: "Mijloace de transport",
    fleet: FLEET_RO,
    officeTitle: "Sediul din documentele școlii",
    officeAddress: "mun. Chișinău, str. Alba Iulia 75, blocul V, etajul 5",
    officeNote:
      "Aceasta este adresa din foile oficiale ale școlii. Celelalte sedii, cu orarele lor, le găsești pe paginile de sediu.",
  },
  faqEyebrow: "Întrebări frecvente",
  faqTitle: "Răspunsuri scurte la întrebările de dinainte de înscriere",
  faq: [
    {
      q: "Cât costă cursul pentru categoria B?",
      a: "Pachetul Standard acoperă categoriile B1 și B, taxa de bază este de 3500 lei și se poate achita în până la 25 de rate. La celelalte categorii taxa de bază este: A1, A2, A, 3200 lei; C, 1800 lei; CE, 1500 lei; D, 1700 lei. Motocicleta (A1, A2 sau A), împreună cu B, C, CE sau D în aceeași înscriere, 1200 lei. Treceri de categorie: de la B la A2 sau A, de la A1 la A2 și de la A2 la A, 2000 lei; de la A1, A2, A sau B1 la B, 2000 lei; de la C1 la C și de la D1 la D, 1500 lei; de la B la A1, 900 lei (fără teorie, se achită la sediu).",
    },
    {
      q: "Pot rezerva locul în grupă cu taxa de înscriere 1/2?",
      a: "Da, la categoriile B, A1, A2 și A, dacă grupa începe peste mai mult de 7 zile: rezervi locul cu taxa de înscriere 1/2, 500 lei, iar taxa de înscriere 2/2 (3000 lei la B, 2700 lei la A1, A2, A) se achită până la prima lecție de teorie. Dacă grupa începe în cel mult 7 zile sau a început deja, se achită taxa de bază dintr-o dată. La C, D, CE și la treceri taxa de bază se achită întotdeauna dintr-o dată.",
    },
    {
      q: "Când pot începe lecțiile de practică?",
      a: "Doar după ce ai semnat contractul de studii și ai achitat taxa de bază a categoriei. Chiar dacă suma este achitată, fără contract semnat nu se face nicio programare la instructor. Contractul se semnează la sediu sau online.",
    },
    {
      q: "Câte ore de teorie pot lipsi?",
      a: "Se permite absentarea de la cursul teoretic din motive întemeiate, până la 25% din totalul orelor teoretice prevăzute de program. Schimbarea la alt curs de teorie, cu alt orar, se face doar prin exmatriculare și înmatriculare repetată.",
    },
    {
      q: "Cât durează o lecție de practică și ce iau cu mine?",
      a: "Lecția de practică durează 90 de minute și se stabilește cu instructorul sau telefonic, cu o persoană responsabilă din oficiu, inclusiv locul de pornire. La lecție te prezinți obligatoriu cu buletinul de identitate și fișa de evidență a orelor practice; suplimentar este nevoie și de certificatul medical F-083/e.",
    },
    {
      q: "Pot schimba instructorul?",
      a: "Da. În cazul neconcordanței cu instructorul, ori dacă graficul instructorului este supraîncărcat, poți schimba instructorul cu acordul persoanelor responsabile din oficiu.",
    },
    {
      q: "Cum se susțin examenele interne?",
      a: "Examenul teoretic intern este gratuit și se susține odată cu toată grupa, la ora și locul stabilite anticipat de profesorul de teorie. Dacă nu te poți prezenta, vii într-o zi de vineri la 10:00, 11:00, 12:00, 13:30, 14:30, 15:30 sau 16:30. Examenul practic intern se desfășoară vineri, sâmbătă și, după caz, duminică, prin programare prealabilă la oficiu.",
    },
    {
      q: "Când primesc certificatul de absolvire?",
      a: "După calificativul „admis” la ambele examene, teoretic și practic, și cu fișa de practică și certificatul medical F-083/e depuse la oficiu. Se eliberează contra cost, începând cu săptămâna următoare, de marți până vineri, în intervalul 13:30-16:30.",
    },
    {
      q: "De la ce vârstă mă pot înscrie?",
      a: "16 ani pentru AM, A1 și B1, 18 ani pentru B, BE, H și subcategoriile A2, C1, C1E, 21 de ani pentru C, CE, F, I și subcategoriile D1, D1E, 24 de ani pentru A, D și DE. Pentru categoria A sunt suficienți 20 de ani dacă dovedești 2 ani de conducere pe motociclu din subcategoria A2.",
    },
    {
      q: "Ce fac dacă la sediul meu nu este nicio grupă deschisă?",
      a: "Depui cererea de înscriere oricum și te sunăm imediat ce pornește grupa următoare la acel sediu, cu zilele, ora și limba de studiu.",
    },
  ],
  cta: {
    eyebrow: "Următorul pas",
    title: "Gata de înscriere",
    text: "Completezi cererea online în câteva minute, iar noi te sunăm să confirmăm grupa, ora și limba. Dacă preferi să întrebi mai întâi, sună-ne.",
    enroll: "Înscrie-te online",
    call: "Sună",
  },
};

const ru: InfoDict = {
  hero: {
    eyebrow: "Перед записью",
    h1: "Информация о записи: группы, цены и документы",
    intro: [
      "На этой странице собрано всё, что нужно знать перед записью: открытые сейчас группы, подробная цена и порядок оплаты, требования к возрасту, как проходят занятия теории и практики и как сдаются внутренние экзамены.",
      "Данные о группах читаются напрямую из системы школы при каждом открытии страницы, поэтому здесь видно то, что можно выбрать сегодня.",
    ],
    jumpLabel: "Перейти к",
  },
  jump: {
    groups: "Доступные группы",
    price: "Цена и оплата",
    gallery: "Галерея",
    docs: "Что нужно знать",
  },
  groups: {
    eyebrow: "Из системы школы",
    title: "Группы, доступные сейчас",
    subtitle:
      "Открытые группы по филиалам, с днями, временем, языком обучения и свободными местами. Заполненную группу выбрать нельзя.",
    daysColumn: "Дни",
    hoursColumn: "Время",
    langColumn: "Язык",
    seatsColumn: "Наличие мест",
    langRo: "Румынский",
    langRu: "Русский",
    enrollCta: "Записаться",
    seeSediu: "Об этом филиале",
    startLabel: "Начало",
    fillLegend: "Зелёный: есть места. Жёлтый: почти заполнена. Красный: последние места.",
    emptyTitle: "В этом филиале сейчас нет открытых групп",
    emptyText:
      "Заявку всё равно можно оставить: мы позвоним, как только в этом филиале откроется следующая группа, и сообщим дни, время и язык.",
    offlineTitle: "Список групп сейчас не загружается",
    offlineText:
      "Ниже стандартные дни и часы, в которые каждый филиал может вести группы. Открытые сейчас группы и свободные места видны в форме заявки.",
    fixedTitle: "Стандартное расписание филиалов",
  },
  price: {
    eyebrow: "Цена и оплата",
    title: "Сколько стоит и как оплачивается",
    subtitle:
      "Базовый тариф зависит от категории. Ниже указаны тариф каждой категории и варианты оплаты.",
    totalLabel: "Пакет Стандарт, категория B",
    totalValue: "3500 лей",
    totalNote: "Базовый тариф курса, теория и практика.",
    installmentsLabel: "Оплата частями",
    installmentsValue: "до 25 частей",
    installmentsNote: "Относится к пакету Стандарт для категории B.",
    reserveLabel: "Регистрационный взнос 1/2, для B и для A1, A2, A",
    reserveValue: "500 лей",
    reserveRuleTitle: "Бронирование места: 24 часа с момента отправки заявки",
    reserveRuleText:
      "Заявка онлайн не гарантирует место в группе. После отправки на email приходят ссылки для оплаты, и у вас есть 24 часа, чтобы оплатить базовый тариф категории, онлайн или в филиале. Для B и для A1, A2, A можно сначала оплатить регистрационный взнос 1/2, 500 лей; для остальных категорий и для переходов с категории на категорию базовый тариф оплачивается сразу. Оплату проверяет сотрудник школы и подтверждает её в тот же день или на следующий. Если за 24 часа оплата не зарегистрирована, заявка больше не держит место и её нужно подать заново. Регистрационный взнос 2/2 (3000 лей для B, 2700 лей для A1, A2, A), при оплате регистрационного взноса 1/2, оплачивается до первого занятия теории.",
    reserveRuleCta: "Посмотреть процесс записи, шаг за шагом",
    stepsTitle: "Порядок оплаты",
    steps: [
      {
        title: "Подаёте заявку на запись",
        text: "Онлайн, с телефона, или в филиале. Выбираете филиал, язык и группу, а мы звоним для подтверждения.",
      },
      {
        title: "Для B и для A1, A2, A, если группа начинается более чем через 7 дней, бронируете место регистрационным взносом 1/2",
        text: "Регистрационный взнос 1/2, 500 лей, закрепляет за вами место в группе. Регистрационный взнос 2/2 (3000 лей для B, 2700 лей для A1, A2, A) оплачивается до первого занятия теории.",
      },
      {
        title: "Если группа начинается в течение 7 дней или уже началась, оплачиваете базовый тариф сразу",
        text: "В этом случае варианта с двумя регистрационными взносами нет: базовый тариф оплачивается сразу, при записи. Для C, D, CE и для переходов с категории на категорию базовый тариф в любом случае оплачивается сразу.",
      },
      {
        title: "Подписываете договор об обучении",
        text: "Договор подписывается в филиале или онлайн, как вам удобнее.",
      },
      {
        title: "Начинаете практические занятия",
        text: "Практика начинается только после того, как договор подписан и базовый тариф категории оплачен.",
      },
    ],
    ruleTitle: "Правило, от которого зависит практика",
    ruleText:
      "Нельзя начать практические занятия, пока не подписан договор об обучении и не оплачен базовый тариф категории. Даже если сумма оплачена, без подписанного договора запись к инструктору не производится.",
    contractTitle: "Договор об обучении",
    contractText:
      "Подписывается в филиале или онлайн. Именно он вместе с оплатой базового тарифа открывает доступ к практическим занятиям.",
    otherTitle: "Базовый тариф остальных категорий",
    otherText:
      "Мотоцикл (A1, A2 или A) вместе с B, C, CE или D в одной записи: 1200 лей. Переходы с категории на категорию: с B на A2 или A, с A1 на A2 и с A2 на A, 2000 лей; с A1, A2, A или B1 на B, 2000 лей; с C1 на C и с D1 на D, 1500 лей; с B на A1, 900 лей (без теории, оплачивается в филиале). Для C, CE, D и для переходов базовый тариф оплачивается сразу. По остальным переходам позвоните нам или зайдите в филиал.",
    otherCategories: "A1, A2, A: 3200 лей. C: 1800 лей. CE: 1500 лей. D: 1700 лей.",
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Школа, автомобили и отзывы",
    subtitle: "Автомобили, на которых вы учитесь, автопарк в движении и видеоотзывы выпускников.",
    carPhoto: "Учебный автомобиль школы",
    fleetVideo: "Автопарк, видео",
    fleetVideoNote: "Видео запускается по клику, чтобы страница загружалась быстро.",
    reviewsTitle: "Видеоотзывы выпускников",
    reviewsNote: "Четыре отзыва, снятые в филиале. Запускаются по клику.",
    videoFallback: "Ваш браузер не может воспроизвести это видео.",
    soonPrefix: "скоро",
    missing: MISSING_RU,
  },
  docs: {
    eyebrow: "Из документов школы",
    title: "Что нужно знать ученику",
    subtitle:
      "Текст ниже, это перевод официальных документов SC GLG PROPERTY SRL: автопарк, минимальный возраст, посещение модулей, внутренние экзамены и свидетельство об окончании.",
    sections: [
      {
        id: "varsta",
        title: "Минимальный возраст",
        items: [
          "16 лет для AM, A1 и B1.",
          "18 лет для B, BE, H и подкатегорий A2, C1, C1E.",
          "20 лет для категории A, если подтверждается 2 года управления мотоциклом подкатегории A2, а также для трицикла мощностью более 15 кВт.",
          "21 год для C, CE, F, I и подкатегорий D1, D1E.",
          "24 года для A, D и DE.",
          "Медицинская пригодность для запрашиваемой категории.",
          "Подтверждение окончания авторизованной программы подготовки, подтверждённое записями в Регистре единиц подготовки водителей транспортных средств и обучаемых.",
          "Удостоверение личности, утверждённое Законом № 273/1994.",
        ],
        note: "Постановление Правительства № 181/2022, ст. 19.",
      },
      {
        id: "module",
        title: "Запись и посещение модулей, теория и практика",
        items: [
          "Разрешается пропуск теоретического курса по обоснованным причинам, до 25% от общего числа теоретических часов, предусмотренных программой.",
          "Переход на другой курс теории, с другим расписанием, возможен только через исключение и повторное зачисление.",
          "Практические занятия длятся 90 минут и проходят по графику, согласованному с инструктором либо с ответственным лицом в офисе, по телефону, с определением места начала занятия.",
          "Контактные телефоны инструкторов указаны в карточке учёта практических часов, которая выдаётся ученику на курсе теории либо в офисе, не позднее 3 недель с начала теоретического обучения.",
          "На практическое занятие обязательно приходить с удостоверением личности и карточкой учёта практических часов; дополнительно необходима медицинская справка F-083/e.",
          "При несовместимости с инструктором либо если график инструктора перегружен, ученик может сменить инструктора с согласия ответственных лиц в офисе.",
          "Утерянная карточка восстанавливается в офисе; подписи инструктора и даты проведения практических занятий ученик собирает самостоятельно.",
        ],
      },
      {
        id: "examinare",
        title: "Экзамены на свидетельство об окончании",
        items: [
          "Внутренний теоретический экзамен бесплатный и сдаётся вместе со всей группой, в час и месте, установленных заранее преподавателем теории.",
          "При невозможности явиться на экзамен ученик приходит в пятницу, в 10:00, 11:00, 12:00, 13:30, 14:30, 15:30 или 16:30.",
          "При оценке «не сдал» повторный экзамен проходит со вторника по пятницу, в те же часы.",
          "С оценкой «сдал» по теории ученики могут записаться на внутренний практический экзамен.",
          "Внутренний практический экзамен проходит в пятницу, субботу и, при необходимости, в воскресенье, по предварительной записи в офисе.",
          "Записаться могут ученики, получившие «сдал» по теории, прошедшие все обязательные практические занятия и предъявившие карточку практики и медицинскую справку F-083/e от семейного врача либо из специализированного центра.",
          "При оценке «не сдал» повторный экзамен проводится за плату; рекомендуется провести дополнительные занятия по вождению.",
          "С оценкой «сдал» выпускники могут прийти за свидетельством об окончании на следующей неделе.",
        ],
      },
      {
        id: "certificat",
        title: "Свидетельство об окончании",
        items: [
          "Выдаётся при условии получения оценки «сдал» на обоих экзаменах, теоретическом и практическом.",
          "Дополнительно в офисе должны находиться карточка практики и медицинская справка F-083/e.",
          "Выдаётся за плату, начиная со следующей недели, со вторника по пятницу, с 13:30 до 16:30.",
        ],
      },
    ],
    fleetTitle: "Автопарк",
    fleetNote: "Более 50 транспортных средств, по категориям.",
    fleetCategoriesColumn: "Категории",
    fleetVehiclesColumn: "Транспортные средства",
    fleet: FLEET_RU,
    officeTitle: "Офис по документам школы",
    officeAddress: "мун. Кишинёв, ул. Алба Юлия 75, блок V, 5-й этаж",
    officeNote:
      "Это адрес из официальных документов школы. Остальные филиалы с их расписанием есть на страницах филиалов.",
  },
  faqEyebrow: "Частые вопросы",
  faqTitle: "Короткие ответы на вопросы перед записью",
  faq: [
    {
      q: "Сколько стоит курс категории B?",
      a: "Пакет Стандарт охватывает категории B1 и B, базовый тариф составляет 3500 лей и оплачивается до 25 частей. Базовый тариф остальных категорий: A1, A2, A, 3200 лей; C, 1800 лей; CE, 1500 лей; D, 1700 лей. Мотоцикл (A1, A2 или A) вместе с B, C, CE или D в одной записи, 1200 лей. Переходы с категории на категорию: с B на A2 или A, с A1 на A2 и с A2 на A, 2000 лей; с A1, A2, A или B1 на B, 2000 лей; с C1 на C и с D1 на D, 1500 лей; с B на A1, 900 лей (без теории, оплачивается в филиале).",
    },
    {
      q: "Можно ли забронировать место в группе регистрационным взносом 1/2?",
      a: "Да, для категорий B, A1, A2 и A, если группа начинается более чем через 7 дней: место бронируется регистрационным взносом 1/2, 500 лей, а регистрационный взнос 2/2 (3000 лей для B, 2700 лей для A1, A2, A) оплачивается до первого занятия теории. Если группа начинается в течение 7 дней или уже началась, базовый тариф оплачивается сразу. Для C, D, CE и для переходов с категории на категорию базовый тариф всегда оплачивается сразу.",
    },
    {
      q: "Когда можно начать практические занятия?",
      a: "Только после того, как подписан договор об обучении и оплачен базовый тариф категории. Даже если сумма оплачена, без подписанного договора запись к инструктору не производится. Договор подписывается в филиале или онлайн.",
    },
    {
      q: "Сколько часов теории можно пропустить?",
      a: "Разрешается пропуск теоретического курса по обоснованным причинам, до 25% от общего числа теоретических часов, предусмотренных программой. Переход на другой курс теории, с другим расписанием, возможен только через исключение и повторное зачисление.",
    },
    {
      q: "Сколько длится практическое занятие и что брать с собой?",
      a: "Практическое занятие длится 90 минут и согласуется с инструктором или по телефону с ответственным лицом в офисе, включая место начала занятия. На занятие обязательно приходить с удостоверением личности и карточкой учёта практических часов; дополнительно необходима медицинская справка F-083/e.",
    },
    {
      q: "Можно ли сменить инструктора?",
      a: "Да. При несовместимости с инструктором либо если график инструктора перегружен, можно сменить инструктора с согласия ответственных лиц в офисе.",
    },
    {
      q: "Как проходят внутренние экзамены?",
      a: "Внутренний теоретический экзамен бесплатный и сдаётся вместе со всей группой, в час и месте, установленных заранее преподавателем теории. Если прийти не получается, вы приходите в пятницу в 10:00, 11:00, 12:00, 13:30, 14:30, 15:30 или 16:30. Внутренний практический экзамен проходит в пятницу, субботу и, при необходимости, в воскресенье, по предварительной записи в офисе.",
    },
    {
      q: "Когда выдают свидетельство об окончании?",
      a: "После оценки «сдал» на обоих экзаменах, теоретическом и практическом, и при наличии в офисе карточки практики и медицинской справки F-083/e. Выдаётся за плату, начиная со следующей недели, со вторника по пятницу, с 13:30 до 16:30.",
    },
    {
      q: "С какого возраста можно записаться?",
      a: "16 лет для AM, A1 и B1, 18 лет для B, BE, H и подкатегорий A2, C1, C1E, 21 год для C, CE, F, I и подкатегорий D1, D1E, 24 года для A, D и DE. Для категории A достаточно 20 лет, если подтверждается 2 года управления мотоциклом подкатегории A2.",
    },
    {
      q: "Что делать, если в моём филиале нет открытых групп?",
      a: "Заявку всё равно стоит подать: мы позвоним, как только в этом филиале откроется следующая группа, и сообщим дни, время и язык обучения.",
    },
  ],
  cta: {
    eyebrow: "Следующий шаг",
    title: "Готовы записаться",
    text: "Заявка онлайн заполняется за несколько минут, а мы звоним, чтобы подтвердить группу, время и язык. Если хотите сначала спросить, позвоните нам.",
    enroll: "Записаться онлайн",
    call: "Позвонить",
  },
};

export const infoInscriere: Record<Lang, InfoDict> = { ro, ru };
