/**
 * ============================================================
 *  Sediile școlii, conținut pentru paginile locale (SEO local)
 * ============================================================
 *  Un modul de DATE pur (fără React), folosit de paginile
 *  /scoala-auto-<slug> și de datele structurate din JsonLd.tsx.
 *
 *  Reguli:
 *   - numele sediului coincide cu LOCATION_NAMES din src/lib/schedule.ts
 *     (sursa opțiunilor reale de înscriere);
 *   - orarul de mai jos este orarul FIX al cabinetelor (copia publică a
 *     practica-glg/lib/groupSchedule.ts, fără numele cabinetelor). Grupele
 *     chiar deschise acum apar în formularul de la /inscriere;
 *   - ADRESELE: doar cele confirmate (documentul oficial al școlii, apoi surse
 *     publice). Buiucani are adresa din document. Unde nu avem adresa,
 *     `address` este null și pagina afișează „adresa exactă la telefon”.
 *     NU se inventează adrese, nici în schema.org.
 * ============================================================
 */

import { LOCATION_NAMES, type StudyLang } from "./schedule";

export type LocationName = (typeof LOCATION_NAMES)[number];

/** Adresă poștală confirmată (se mapează 1:1 pe schema.org PostalAddress). */
export interface SediuAddress {
  /** Strada și numărul, ex. „str. Alba Iulia 75, bloc V, etaj 5”. */
  street: string;
  /** Localitatea, ex. „Chișinău”. */
  locality: string;
  /** Regiunea administrativă, ex. „Municipiul Chișinău”. */
  region: string;
}

/** Un rând din orarul fix al sediului (zile + ore + limba grupei). */
export interface ScheduleRow {
  days: string;
  daysRu: string;
  /** Orele posibile, ex. „09:30, 16:00, 17:30, 19:00”. */
  hours: string;
  language: StudyLang;
}

export interface SediuContent {
  /** H1 al paginii. */
  h1: string;
  /** Titlul SEO (fără sufixul de brand, îl adaugă pageMetadata). */
  seoTitle: string;
  /** Meta description, 140-160 caractere. */
  description: string;
  /** Paragrafele de introducere. */
  intro: string[];
  /** Eticheta cardului de adresă. */
  addressLabel: string;
  /** Valoarea afișată în cardul de adresă (adresa reală sau invitația de a suna). */
  addressValue: string;
  /** Notă de sub hartă. */
  mapNote: string;
  /** Titlul secțiunii de orar. */
  scheduleTitle: string;
  scheduleNote: string;
  /** Titlul secțiunii de categorii și lista afișată. */
  categoriesTitle: string;
  categories: string[];
  categoriesNote: string;
  /** Pașii de înscriere. */
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** Eticheta butonului de înscriere. */
  cta: string;
  /** Eticheta butonului de telefon. */
  callCta: string;
}

export interface Sediu {
  /** Slug-ul rutei, ex. „scoala-auto-buiucani”. */
  slug: string;
  /** Calea canonică, ex. „/scoala-auto-buiucani”. */
  path: string;
  /** Numele sediului, identic cu cel din formularul de înscriere. */
  location: LocationName;
  /** Eticheta scurtă pentru linkurile interne și pentru breadcrumb. */
  shortName: { ro: string; ru: string };
  /** Adresa confirmată sau null (necunoscută, de cerut). */
  address: SediuAddress | null;
  /** Interogarea pentru harta Google (adresa exactă sau doar localitatea). */
  mapQuery: string;
  /** Localitățile deservite, pentru areaServed. */
  areaServed: string[];
  schedule: ScheduleRow[];
  ro: SediuContent;
  ru: SediuContent;
}

const LU_MI = { days: "Luni și miercuri", daysRu: "Понедельник и среда" };
const MA_JO = { days: "Marți și joi", daysRu: "Вторник и четверг" };
const MA_VI = { days: "Marți și vineri", daysRu: "Вторник и пятница" };
const MI_VI = { days: "Miercuri și vineri", daysRu: "Среда и пятница" };
const SA = { days: "Sâmbăta", daysRu: "По субботам" };
const LU_SA = { days: "Luni și sâmbătă", daysRu: "Понедельник и суббота" };

const CITY_HOURS = "09:30, 16:00, 17:30, 19:00";

/** Orarul fix al sediilor din Chișinău (patru ore pe zi, două perechi de zile). */
const chisinauSchedule = (withRussian: boolean): ScheduleRow[] => [
  { ...LU_MI, hours: CITY_HOURS, language: "ro" },
  { ...MA_JO, hours: CITY_HOURS, language: "ro" },
  ...(withRussian
    ? ([
        { ...LU_MI, hours: "17:30, 19:00", language: "ru" },
        { ...MA_JO, hours: "17:30, 19:00", language: "ru" },
      ] as ScheduleRow[])
    : []),
  { ...SA, hours: "09:00", language: "ro" },
];

const enrollStepsRo = [
  "Completezi cererea de înscriere online, în câteva minute, și alegi acest sediu.",
  "Te sunăm ca să confirmăm grupa, ora și limba de studiu.",
  "Vii la sediu cu buletinul, semnezi cererea-contract și începi cursul.",
];
const enrollStepsRu = [
  "Заполняете заявку онлайн за несколько минут и выбираете этот филиал.",
  "Мы звоним, чтобы подтвердить группу, время и язык обучения.",
  "Приходите в филиал с удостоверением личности, подписываете договор и начинаете курс.",
];

const catsRo = [
  "Categoria B, autoturisme, cutie mecanică sau automată",
  "Categoria B1, cvadricicluri",
  "Alte categorii din cererea-contract (A1, A2, A, C, CE, D) la cerere, întreabă-ne la telefon",
];
const catsRu = [
  "Категория B, легковые автомобили, механика или автомат",
  "Категория B1, квадрициклы",
  "Другие категории из договора (A1, A2, A, C, CE, D) по запросу, уточняйте по телефону",
];

const CATS_NOTE_RO =
  "Cursul de bază acoperă categoriile B1 și B: 3 luni de teorie și 24 de lecții practice pe Skoda Fabia și Skoda Scala. Pentru celelalte categorii grupele se deschid în funcție de cereri, de aceea disponibilitatea o afli la telefon.";
const CATS_NOTE_RU =
  "Базовый курс охватывает категории B1 и B: 3 месяца теории и 24 практических занятия на Skoda Fabia и Skoda Scala. Группы по остальным категориям открываются по мере заявок, наличие уточняйте по телефону.";

const SCHEDULE_NOTE_RO =
  "Acestea sunt intervalele în care sediul poate ține grupe. Grupele deschise chiar acum, cu locurile rămase, le vezi în formularul de înscriere.";
const SCHEDULE_NOTE_RU =
  "Это интервалы, в которые филиал может вести группы. Открытые сейчас группы и свободные места видны в форме заявки.";


const MAP_NOTE_EXACT_RO = "Harta se încarcă de la Google doar după acordul tău pentru media externe.";
const MAP_NOTE_EXACT_RU = "Карта загружается с Google только после вашего согласия на внешние медиа.";
const MAP_NOTE_AREA_RO =
  "Harta arată zona sediului, nu intrarea exactă. Sună-ne la 069 792 889 și îți spunem adresa și cum ajungi.";
const MAP_NOTE_AREA_RU =
  "Карта показывает район филиала, а не точный вход. Позвоните по номеру 069 792 889, и мы подскажем адрес и как добраться.";

export const sedii: Sediu[] = [
  {
    slug: "scoala-auto-buiucani",
    path: "/scoala-auto-buiucani",
    location: "Buiucani",
    shortName: { ro: "Școală auto Buiucani", ru: "Автошкола Буюканы" },
    // Adresa sediului principal, din documentul oficial al școlii
    // („SC GLG PROPERTY SRL”): mun. Chișinău, str. Alba Iulia 75, blocul V,
    // etajul 5. Înlocuiește varianta publică anterioară („bd. Alba Iulia 75/N”).
    address: { street: "str. Alba Iulia 75, bloc V, etaj 5", locality: "Chișinău", region: "Municipiul Chișinău" },
    // Harta primește COORDONATELE intersecției str. Alba Iulia cu str. Onisifor
    // Ghibu (8.11.2026, Jardan): căutarea „Alba Iulia 75" punea pinul pe altă
    // școală auto, mai la vest.
    mapQuery: "47.0353,28.7759",
    areaServed: ["Chișinău"],
    schedule: chisinauSchedule(true),
    ro: {
      h1: "Școală auto în Buiucani, Chișinău",
      seoTitle: "Școală auto în Buiucani, Chișinău",
      description:
        "Școală auto în Buiucani, Chișinău: str. Alba Iulia 75, grupe în română și rusă, orare de la 09:30 până la 19:00, categoria B, 24 de lecții practice. Înscriere online.",
      intro: [
        "Sediul nostru principal este în sectorul Buiucani, pe str. Alba Iulia 75, blocul V, etajul 5, în Chișinău. Aici învață cele mai multe grupe, aici sunt și singurele grupe în limba rusă, iar cabinetele de teorie permit orare de dimineață, de după-amiază și de seară.",
        "Cursul durează 3 luni și include 24 de lecții practice pe Skoda Fabia și Skoda Scala, inclusiv pe traseele reale de examinare din Chișinău. Plata se poate face în până la 25 de rate.",
      ],
      addressLabel: "Adresa",
      addressValue: "str. Alba Iulia 75, blocul V, etajul 5, Chișinău",
      mapNote: MAP_NOTE_EXACT_RO,
      scheduleTitle: "Orarul grupelor de teorie la Buiucani",
      scheduleNote: SCHEDULE_NOTE_RO,
      categoriesTitle: "Ce categorii se predau la Buiucani",
      categories: catsRo,
      categoriesNote: CATS_NOTE_RO,
      stepsTitle: "Cum te înscrii la sediul Buiucani",
      steps: enrollStepsRo,
      faqTitle: "Întrebări frecvente despre sediul Buiucani",
      faq: [
        {
          q: "Unde se află sediul din Buiucani?",
          a: "Pe str. Alba Iulia 75, blocul V, etajul 5, în sectorul Buiucani din Chișinău. Suntem deschiși de luni până sâmbătă, iar la telefon 069 792 889 îți explicăm cum ajungi.",
        },
        {
          q: "Sunt grupe în limba rusă la Buiucani?",
          a: "Da. Buiucani este singurul sediu cu grupe în limba rusă, la orele 17:30 și 19:00, luni și miercuri sau marți și joi.",
        },
        {
          q: "Pot face teoria dimineața?",
          a: "Da, la Buiucani se deschid grupe și la ora 09:30, pe lângă cele de 16:00, 17:30 și 19:00, plus grupele de sâmbătă de la 09:00.",
        },
        {
          q: "Primesc voucherul de 200 de lei la Buiucani?",
          a: "Da, voucherul se acordă la depunerea cererii de înscriere în sectoarele Buiucani și Botanica.",
        },
      ],
      cta: "Înscrie-te la Buiucani",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Автошкола в Буюканах, Кишинёв",
      seoTitle: "Автошкола Буюканы, Кишинёв, ул. Алба Юлия 75",
      description:
        "Автошкола в Буюканах, Кишинёв: ул. Алба Юлия 75, группы на русском и румынском, занятия с 09:30 до 19:00, категория B, 24 практических занятия. Заявка онлайн.",
      intro: [
        "Главный филиал находится в секторе Буюканы, на ул. Алба Юлия 75, блок V, этаж 5, в Кишинёве. Здесь учится больше всего групп, здесь же единственные группы на русском языке, а кабинеты теории позволяют утренние, дневные и вечерние занятия.",
        "Курс длится 3 месяца и включает 24 практических занятия на Skoda Fabia и Skoda Scala, в том числе по реальным экзаменационным маршрутам Кишинёва. Оплата возможна до 25 частей.",
      ],
      addressLabel: "Адрес",
      addressValue: "ул. Алба Юлия 75, блок V, этаж 5, Кишинёв",
      mapNote: MAP_NOTE_EXACT_RU,
      scheduleTitle: "Расписание групп теории в Буюканах",
      scheduleNote: SCHEDULE_NOTE_RU,
      categoriesTitle: "Какие категории преподаём в Буюканах",
      categories: catsRu,
      categoriesNote: CATS_NOTE_RU,
      stepsTitle: "Как записаться в филиал Буюканы",
      steps: enrollStepsRu,
      faqTitle: "Частые вопросы о филиале Буюканы",
      faq: [
        {
          q: "Где находится филиал в Буюканах?",
          a: "На ул. Алба Юлия 75, блок V, этаж 5, сектор Буюканы, Кишинёв. Работаем с понедельника по субботу, по телефону 069 792 889 подскажем, как добраться.",
        },
        {
          q: "Есть ли группы на русском языке в Буюканах?",
          a: "Да. Буюканы единственный филиал с группами на русском языке, в 17:30 и 19:00, по понедельникам и средам или по вторникам и четвергам.",
        },
        {
          q: "Можно ли заниматься теорией утром?",
          a: "Да, в Буюканах открываются группы и в 09:30, помимо 16:00, 17:30 и 19:00, а также субботние группы в 09:00.",
        },
        {
          q: "Дают ли ваучер на 200 лей в Буюканах?",
          a: "Да, ваучер выдаётся при подаче заявки в секторах Буюканы и Ботаника.",
        },
      ],
      cta: "Записаться в Буюканы",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "scoala-auto-botanica",
    path: "/scoala-auto-botanica",
    location: "Botanica",
    shortName: { ro: "Școală auto Botanica", ru: "Автошкола Ботаника" },
    // Adresa dată de patron pe 3.11.2026: str. Sarmizegetusa 43, etajul 2,
    // cabinetul 206. Harta primește doar strada și numărul.
    address: { street: "str. Sarmizegetusa 43, etaj 2, cabinet 206", locality: "Chișinău", region: "Municipiul Chișinău" },
    mapQuery: "str. Sarmizegetusa 43, Chișinău",
    areaServed: ["Chișinău"],
    schedule: chisinauSchedule(false),
    ro: {
      h1: "Școală auto în Botanica, Chișinău",
      seoTitle: "Școală auto Botanica, Chișinău, orar",
      description:
        "Școală auto în sectorul Botanica, Chișinău: grupe de teorie la 09:30, 16:00, 17:30 și 19:00, categoria B, 24 de lecții practice pe Skoda. Înscriere online sau la telefon.",
      intro: [
        "În sectorul Botanica din Chișinău avem cabinete de teorie cu aceleași orare ca la sediul principal: dimineața la 09:30, după-amiaza la 16:00 și 17:30, seara la 19:00, plus grupe de sâmbătă.",
        "Cursul durează 3 luni, include 24 de lecții practice pe Skoda Fabia și Skoda Scala și se poate achita în până la 25 de rate. Grupele de la Botanica se predau în limba română; pentru grupe în limba rusă te așteptăm la Buiucani.",
      ],
      addressLabel: "Adresa",
      addressValue: "str. Sarmizegetusa 43, etajul 2, cabinetul 206, Chișinău",
      mapNote: MAP_NOTE_EXACT_RO,
      scheduleTitle: "Orarul grupelor de teorie la Botanica",
      scheduleNote: SCHEDULE_NOTE_RO,
      categoriesTitle: "Ce categorii se predau la Botanica",
      categories: catsRo,
      categoriesNote: CATS_NOTE_RO,
      stepsTitle: "Cum te înscrii la sediul Botanica",
      steps: enrollStepsRo,
      faqTitle: "Întrebări frecvente despre sediul Botanica",
      faq: [
        {
          q: "Care este adresa sediului din Botanica?",
          a: "Str. Sarmizegetusa 43, etajul 2, cabinetul 206, Chișinău. Suntem deschiși de luni până sâmbătă; dacă nu găsești intrarea, sună la 069 792 889.",
        },
        {
          q: "Ce orare are teoria la Botanica?",
          a: "Grupele se deschid la 09:30, 16:00, 17:30 și 19:00, luni și miercuri sau marți și joi, plus grupe de sâmbătă de la 09:00.",
        },
        {
          q: "Sunt grupe în limba rusă la Botanica?",
          a: "Nu, grupele în limba rusă se țin doar la sediul din Buiucani. La Botanica predăm în limba română.",
        },
        {
          q: "Primesc voucherul de 200 de lei la Botanica?",
          a: "Da, voucherul se acordă la depunerea cererii de înscriere în sectoarele Botanica și Buiucani.",
        },
      ],
      cta: "Înscrie-te la Botanica",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Автошкола в Ботанике, Кишинёв",
      seoTitle: "Автошкола Ботаника, Кишинёв, группы и расписание",
      description:
        "Автошкола в секторе Ботаника, Кишинёв: группы теории в 09:30, 16:00, 17:30 и 19:00, категория B, 24 практических занятия на Skoda. Заявка онлайн или по телефону.",
      intro: [
        "В секторе Ботаника в Кишинёве у нас кабинеты теории с тем же расписанием, что и в главном филиале: утром в 09:30, днём в 16:00 и 17:30, вечером в 19:00, плюс субботние группы.",
        "Курс длится 3 месяца, включает 24 практических занятия на Skoda Fabia и Skoda Scala, оплата возможна до 25 частей. Группы в Ботанике ведутся на румынском языке; группы на русском ждут вас в Буюканах.",
      ],
      addressLabel: "Адрес",
      addressValue: "ул. Сармизеджетуза 43, этаж 2, кабинет 206, Кишинёв",
      mapNote: MAP_NOTE_EXACT_RU,
      scheduleTitle: "Расписание групп теории в Ботанике",
      scheduleNote: SCHEDULE_NOTE_RU,
      categoriesTitle: "Какие категории преподаём в Ботанике",
      categories: catsRu,
      categoriesNote: CATS_NOTE_RU,
      stepsTitle: "Как записаться в филиал Ботаника",
      steps: enrollStepsRu,
      faqTitle: "Частые вопросы о филиале Ботаника",
      faq: [
        {
          q: "Какой адрес филиала в Ботанике?",
          a: "Ул. Сармизеджетуза 43, этаж 2, кабинет 206, Кишинёв. Работаем с понедельника по субботу; если не нашли вход, позвоните по номеру 069 792 889.",
        },
        {
          q: "Какое расписание теории в Ботанике?",
          a: "Группы открываются в 09:30, 16:00, 17:30 и 19:00, по понедельникам и средам или по вторникам и четвергам, плюс субботние группы в 09:00.",
        },
        {
          q: "Есть ли группы на русском языке в Ботанике?",
          a: "Нет, группы на русском языке проходят только в филиале Буюканы. В Ботанике преподаём на румынском.",
        },
        {
          q: "Дают ли ваучер на 200 лей в Ботанике?",
          a: "Да, ваучер выдаётся при подаче заявки в секторах Ботаника и Буюканы.",
        },
      ],
      cta: "Записаться в Ботанику",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "scoala-auto-straseni",
    path: "/scoala-auto-straseni",
    location: "Strășeni",
    shortName: { ro: "Școală auto Strășeni", ru: "Автошкола Стрэшены" },
    // Adresa filialei, confirmată de patron (31.10.2026).
    address: { street: "str. Mihai Eminescu 32/2", locality: "Strășeni", region: "Raionul Strășeni" },
    mapQuery: "str. Mihai Eminescu 32, Strășeni",
    areaServed: ["Strășeni"],
    schedule: [
      { ...MA_JO, hours: "15:00", language: "ro" },
      { ...MI_VI, hours: "15:00", language: "ro" },
      { ...LU_SA, hours: "15:00 luni, 10:00 sâmbătă", language: "ro" },
    ],
    ro: {
      h1: "Școală auto în Strășeni",
      seoTitle: "Școală auto Strășeni, str. Mihai Eminescu 32/2",
      description:
        "Școală auto în Strășeni, str. Mihai Eminescu 32/2: grupe de teorie de la ora 15:00, categoria B, 24 de lecții practice pe Skoda, plata în rate. Înscriere online.",
      intro: [
        "Filiala din Strășeni este pe str. Mihai Eminescu 32/2. Aici teoria se ține după-amiaza, de la ora 15:00, ca să poți veni după școală sau după program, plus o grupă cu sâmbăta dimineață.",
        "Cursul este același ca în Chișinău: 3 luni de teorie, 24 de lecții practice pe Skoda Fabia și Skoda Scala și plata în până la 25 de rate. Nu trebuie să te deplasezi la Chișinău pentru orele de teorie.",
      ],
      addressLabel: "Adresa",
      addressValue: "str. Mihai Eminescu 32/2, Strășeni",
      mapNote: MAP_NOTE_EXACT_RO,
      scheduleTitle: "Orarul grupelor de teorie la Strășeni",
      scheduleNote: SCHEDULE_NOTE_RO,
      categoriesTitle: "Ce categorii se predau la Strășeni",
      categories: catsRo,
      categoriesNote: CATS_NOTE_RO,
      stepsTitle: "Cum te înscrii la filiala Strășeni",
      steps: enrollStepsRo,
      faqTitle: "Întrebări frecvente despre filiala Strășeni",
      faq: [
        {
          q: "Unde se află filiala din Strășeni?",
          a: "Pe str. Mihai Eminescu 32/2, în Strășeni. Suntem deschiși de luni până sâmbătă, iar la 069 792 889 îți explicăm cum ajungi.",
        },
        {
          q: "La ce oră este teoria la Strășeni?",
          a: "De la ora 15:00, marți și joi sau miercuri și vineri. Există și varianta luni de la 15:00 cu sâmbătă de la 10:00.",
        },
        {
          q: "Trebuie să merg la Chișinău pentru curs?",
          a: "Nu pentru teorie, aceasta se ține la Strășeni. Practica și examenul la ASP se stabilesc împreună cu instructorul, sună-ne pentru detalii.",
        },
        {
          q: "Se poate achita în rate la Strășeni?",
          a: "Da, aceleași condiții ca în Chișinău: până la 25 de rate. Prețul exact ți-l comunicăm la telefon sau la filială.",
        },
      ],
      cta: "Înscrie-te la Strășeni",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Автошкола в Стрэшенах",
      seoTitle: "Автошкола Стрэшены, ул. Михай Эминеску 32/2",
      description:
        "Автошкола в Стрэшенах, ул. Михай Эминеску 32/2: группы теории с 15:00, категория B, 24 практических занятия на Skoda, оплата частями. Заявка онлайн.",
      intro: [
        "Филиал в Стрэшенах находится на ул. Михай Эминеску 32/2. Теория проходит днём, с 15:00, чтобы можно было прийти после школы или после работы, плюс есть группа с занятием в субботу утром.",
        "Курс такой же, как в Кишинёве: 3 месяца теории, 24 практических занятия на Skoda Fabia и Skoda Scala, оплата до 25 частей. Ездить в Кишинёв на теорию не нужно.",
      ],
      addressLabel: "Адрес",
      addressValue: "ул. Михай Эминеску 32/2, Стрэшены",
      mapNote: MAP_NOTE_EXACT_RU,
      scheduleTitle: "Расписание групп теории в Стрэшенах",
      scheduleNote: SCHEDULE_NOTE_RU,
      categoriesTitle: "Какие категории преподаём в Стрэшенах",
      categories: catsRu,
      categoriesNote: CATS_NOTE_RU,
      stepsTitle: "Как записаться в филиал Стрэшены",
      steps: enrollStepsRu,
      faqTitle: "Частые вопросы о филиале Стрэшены",
      faq: [
        {
          q: "Где находится филиал в Стрэшенах?",
          a: "На ул. Михай Эминеску 32/2, Стрэшены. Работаем с понедельника по субботу, по телефону 069 792 889 подскажем, как добраться.",
        },
        {
          q: "Во сколько проходит теория в Стрэшенах?",
          a: "С 15:00, по вторникам и четвергам или по средам и пятницам. Есть вариант понедельник в 15:00 и суббота в 10:00.",
        },
        {
          q: "Нужно ли ездить в Кишинёв на курс?",
          a: "На теорию нет, она проходит в Стрэшенах. Практику и экзамен в ASP согласуете с инструктором, звоните за деталями.",
        },
        {
          q: "Можно ли платить частями в Стрэшенах?",
          a: "Да, условия те же, что в Кишинёве: до 25 частей. Точную стоимость сообщим по телефону или в филиале.",
        },
      ],
      cta: "Записаться в Стрэшены",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "scoala-auto-vorniceni",
    path: "/scoala-auto-vorniceni",
    location: "Vorniceni",
    shortName: { ro: "Școală auto Vorniceni", ru: "Автошкола Ворничены" },
    // Adresa confirmată de patron (31.10.2026): cursurile se țin în incinta liceului.
    address: { street: "str. Sfatul Țării 14", locality: "Vorniceni", region: "Raionul Strășeni" },
    mapQuery: "Liceul Teoretic Ion Inculeț, str. Sfatul Țării 14, Vorniceni",
    areaServed: ["Vorniceni", "Strășeni"],
    schedule: [{ ...MA_VI, hours: "17:00", language: "ro" }],
    ro: {
      h1: "Școală auto în Vorniceni",
      seoTitle: "Școală auto Vorniceni, str. Sfatul Țării 14",
      description:
        "Școală auto în Vorniceni, raionul Strășeni: grupă de teorie marți și vineri de la 17:00, categoria B, 24 de lecții practice pe Skoda, plata în rate. Înscriere online.",
      intro: [
        "La Vorniceni, în raionul Strășeni, ținem teoria marți și vineri de la ora 17:00, ca să poți veni după program, fără să te deplasezi la Chișinău.",
        "Cursul este identic cu cel din Chișinău: 3 luni de teorie, 24 de lecții practice pe Skoda Fabia și Skoda Scala și plata în până la 25 de rate.",
      ],
      addressLabel: "Adresa",
      addressValue: "Liceul Teoretic „Ion Inculeț”, str. Sfatul Țării 14, Vorniceni",
      mapNote: MAP_NOTE_AREA_RO,
      scheduleTitle: "Orarul grupei de teorie la Vorniceni",
      scheduleNote: SCHEDULE_NOTE_RO,
      categoriesTitle: "Ce categorii se predau la Vorniceni",
      categories: catsRo,
      categoriesNote: CATS_NOTE_RO,
      stepsTitle: "Cum te înscrii la Vorniceni",
      steps: enrollStepsRo,
      faqTitle: "Întrebări frecvente despre sediul Vorniceni",
      faq: [
        {
          q: "Care este adresa sediului din Vorniceni?",
          a: "Orele se țin la Liceul Teoretic „Ion Inculeț”, str. Sfatul Țării 14, Vorniceni. Suntem deschiși de luni până sâmbătă, iar la 069 792 889 îți explicăm cum ajungi.",
        },
        {
          q: "Când se țin orele de teorie la Vorniceni?",
          a: "Marți și vineri, de la ora 17:00. Dacă grupa este plină, te putem înscrie la Strășeni sau te anunțăm când pornește următoarea.",
        },
        {
          q: "Câte grupe aveți la Vorniceni?",
          a: "Un singur cabinet, deci o grupă pe perioadă. De aceea merită să depui cererea din timp.",
        },
        {
          q: "Practica se face la Vorniceni?",
          a: "Orele de practică se stabilesc cu instructorul, în funcție de traseele de examinare. Sună-ne și îți explicăm cum funcționează pentru cursanții din raion.",
        },
      ],
      cta: "Înscrie-te la Vorniceni",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Автошкола в Ворниченах",
      seoTitle: "Автошкола Ворничены, ул. Сфатул Цэрий 14",
      description:
        "Автошкола в Ворниченах, район Стрэшены: группа теории по вторникам и пятницам с 17:00, категория B, 24 практических занятия на Skoda, оплата частями.",
      intro: [
        "В Ворниченах, район Стрэшены, теория проходит по вторникам и пятницам с 17:00, чтобы можно было прийти после работы и не ездить в Кишинёв.",
        "Курс такой же, как в Кишинёве: 3 месяца теории, 24 практических занятия на Skoda Fabia и Skoda Scala, оплата до 25 частей.",
      ],
      addressLabel: "Адрес",
      addressValue: "Теоретический лицей «Ион Инкулец», ул. Сфатул Цэрий 14, Ворничены",
      mapNote: MAP_NOTE_AREA_RU,
      scheduleTitle: "Расписание группы теории в Ворниченах",
      scheduleNote: SCHEDULE_NOTE_RU,
      categoriesTitle: "Какие категории преподаём в Ворниченах",
      categories: catsRu,
      categoriesNote: CATS_NOTE_RU,
      stepsTitle: "Как записаться в Ворничены",
      steps: enrollStepsRu,
      faqTitle: "Частые вопросы о филиале Ворничены",
      faq: [
        {
          q: "Какой адрес филиала в Ворниченах?",
          a: "Занятия проходят в Теоретическом лицее «Ион Инкулец», ул. Сфатул Цэрий 14, Ворничены. Работаем с понедельника по субботу, по телефону 069 792 889 подскажем, как добраться.",
        },
        {
          q: "Когда проходят занятия теории в Ворниченах?",
          a: "По вторникам и пятницам с 17:00. Если группа заполнена, запишем в Стрэшены или сообщим о старте следующей.",
        },
        {
          q: "Сколько групп в Ворниченах?",
          a: "Один кабинет, значит одна группа за период. Поэтому заявку стоит подать заранее.",
        },
        {
          q: "Практика проходит в Ворниченах?",
          a: "Практические занятия согласуются с инструктором, с учётом экзаменационных маршрутов. Позвоните, и мы объясним, как это работает для учеников из района.",
        },
      ],
      cta: "Записаться в Ворничены",
      callCta: "Позвонить 069 792 889",
    },
  },
];

export function getSediu(slug: string): Sediu | undefined {
  return sedii.find((s) => s.slug === slug);
}

/** Ca `getSediu`, dar aruncă la build dacă slug-ul nu există (rută greșită). */
export function requireSediu(slug: string): Sediu {
  const found = getSediu(slug);
  if (!found) throw new Error(`Sediu necunoscut: ${slug}`);
  return found;
}

/** Linkuri scurte către sedii, pentru navigarea internă dintre paginile locale. */
export function sediiLinks(exceptSlug?: string): { path: string; ro: string; ru: string }[] {
  return sedii
    .filter((s) => s.slug !== exceptSlug)
    .map((s) => ({ path: s.path, ro: s.shortName.ro, ru: s.shortName.ru }));
}
