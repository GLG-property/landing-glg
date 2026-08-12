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
  featured?: boolean;
  tagline: string;
  category: string;
  features: string[];
};

export type Dict = {
  banner: { pre: string; amount: string; post: string; cta: string; close: string };
  nav: { items: NavItem[]; menuAria: string; langAria: string };
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
    plans: Plan[];
    note: string;
    noteCta: Cta;
  };
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
  };
};

const ro: Dict = {
  banner: {
    pre: "Voucher cadou de",
    amount: "200 lei",
    post: "la înscrierea în sectoarele Botanica și Buiucani",
    cta: "Profită",
    close: "Închide anunțul",
  },

  nav: {
    items: [
      { label: "Acasă", href: "#acasa" },
      { label: "Cursuri", href: "#cursuri" },
      { label: "Prețuri", href: "#preturi" },
      { label: "Despre noi", href: "#despre" },
      { label: "Contact", href: "#contact" },
    ],
    menuAria: "Meniu",
    langAria: "Schimbă limba",
  },

  hero: {
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
  },

  benefits: [
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
    cta: { label: "Vezi pachetele", href: "#preturi" },
  },

  why: {
    eyebrow: "Mai mult decât o școală auto",
    title: "De ce să alegi",
    titleAccent: "GLG Property",
    subtitle:
      "Te pregătim să conduci cu adevărat, nu doar să treci examenul. Iată ce ne face diferiți.",
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
        text: "Te însoțim de la înscriere până la examen, fără stres și cu tot ce ai nevoie.",
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
    title: "Alege pachetul potrivit",
    titleAccent: "pentru tine",
    subtitle:
      "Trei pachete, aceeași calitate a instruirii. Alegi în funcție de program și buget.",
    categoryLabel: "Categoriile",
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
    ],
    note: "Prețurile detaliate ți le comunicăm la telefon sau direct la centru.",
    noteCta: { label: "Contactează-ne", href: "#contact" },
  },

  steps: {
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
  },

  contact: {
    eyebrow: "Te așteptăm",
    title: "Află unde poți depune",
    titleAccent: "cererea",
    subtitle:
      "Avem patru centre în Chișinău, deschise de luni până sâmbătă. Sună-ne sau treci pe la noi.",
    callUs: "Sună-ne",
    hoursLabel: "Program",
    hours: "Luni – Sâmbătă",
    followUs: "Urmărește-ne",
    mapBadge: "4 centre în Chișinău",
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
          { label: "Pachet Premium", href: "#preturi" },
          { label: "Pachet Standard", href: "#preturi" },
          { label: "Pachet Social", href: "#preturi" },
        ],
      },
      {
        title: "Școala",
        links: [
          { label: "Despre noi", href: "#despre" },
          { label: "Cum te înscrii", href: "#cursuri" },
          { label: "Întrebări frecvente", href: "#intrebari" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: site.phone, href: site.phoneHref },
          { label: "Facebook", href: site.social.facebook },
          { label: "Instagram", href: site.social.instagram },
          { label: "TikTok", href: site.social.tiktok },
        ],
      },
    ],
    rights: "Toate drepturile rezervate. · Școală auto · Chișinău",
    credit: "Creare website - landings.md",
  },
};

const ru: Dict = {
  banner: {
    pre: "Подарочный ваучер на",
    amount: "200 леев",
    post: "при записи в секторах Ботаника и Буюканы",
    cta: "Воспользуйся",
    close: "Закрыть объявление",
  },

  nav: {
    items: [
      { label: "Главная", href: "#acasa" },
      { label: "Курсы", href: "#cursuri" },
      { label: "Цены", href: "#preturi" },
      { label: "О нас", href: "#despre" },
      { label: "Контакты", href: "#contact" },
    ],
    menuAria: "Меню",
    langAria: "Сменить язык",
  },

  hero: {
    eyebrow: "Все категории",
    titleTop: "Вместе получим",
    titleBottom: "твои водительские права",
    subtitle:
      "Независимо от выбранной категории, мы обеспечим твой успех на экзамене. Теория и практика с самыми компетентными инструкторами Республики Молдова.",
    primaryCta: { label: site.phone, href: site.phoneHref },
    secondaryCta: { label: "Смотреть пакеты", href: "#preturi" },
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
      text: "Учись на том языке, который тебе удобнее. У нас есть отдельные группы на румынском и русском языках.",
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
      text: "Пакеты Standard и Social можно оплатить в рассрочку до 25 платежей — учись без лишних забот о расходах.",
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
    cta: { label: "Смотреть пакеты", href: "#preturi" },
  },

  why: {
    eyebrow: "Больше, чем автошкола",
    title: "Почему стоит выбрать",
    titleAccent: "GLG Property",
    subtitle:
      "Мы учим по-настоящему водить, а не просто сдавать экзамен. Вот что нас отличает.",
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
        text: "Мы рядом от записи до экзамена — без стресса и со всем необходимым.",
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
    title: "Выбери свой пакет",
    titleAccent: "обучения",
    subtitle:
      "Три пакета — одинаково высокое качество обучения. Выбирай по графику и бюджету.",
    categoryLabel: "Категории",
    plans: [
      {
        name: "Premium",
        badge: "Индивидуально",
        tagline: "Для тех, кто хочет быстрых результатов и маленьких групп.",
        category: "B1 · B",
        features: [
          "Длительность курса: 3 месяца",
          "Занятия только по субботам",
          "24 практических занятия на Skoda Scala по экзаменационным маршрутам",
          "Всего 12 человек в группе",
          "Бесплатные учебники",
          "Бесплатный теоретический и практический экзамен",
          "Бесплатный сертификат об обучении",
          "Полная оплата при подаче заявления",
        ],
      },
      {
        name: "Standard",
        badge: "Самый популярный",
        featured: true,
        tagline: "Идеальный баланс между гибким графиком и ценой.",
        category: "B1 · B",
        features: [
          "Длительность курса: 3 месяца",
          "Понедельник и среда или вторник и четверг",
          "Время: 09:30, 16:00, 17:30, 19:00 (18:00 — русская группа)",
          "15 занятий на Skoda Fabia + 9 на Skoda Scala",
          "Группа из 30 человек",
          "Рассрочка на 25 платежей",
          "Подарочный ваучер на 200 леев",
        ],
      },
      {
        name: "Social",
        badge: "Сниженная цена",
        tagline: "Для людей, получающих социальную поддержку.",
        category: "B1 · B",
        features: [
          "Длительность курса: 3 месяца",
          "Понедельник и среда или вторник и четверг",
          "Скидка 50% на теорию",
          "24 практических занятия на Skoda Fabia",
          "Группа из 30 человек",
          "Рассрочка на 25 платежей",
          "Нужны документы от местных органов власти, подтверждающие социальную уязвимость",
        ],
      },
    ],
    note: "Подробные цены сообщим по телефону или прямо в филиале.",
    noteCta: { label: "Свяжись с нами", href: "#contact" },
  },

  steps: {
    eyebrow: "Просто от начала до конца",
    title: "Как записаться,",
    titleAccent: "шаг за шагом",
    subtitle: "От первого визита до прав в кармане.",
    items: [
      {
        title: "Выбери подходящий пакет",
        text: "Сравни пакеты Premium, Standard и Social и выбери тот, что подходит именно тебе.",
        link: { label: "Смотреть цены", href: "#preturi" },
      },
      {
        title: "Подай заявление в филиале",
        text: "Приходи в один из 4 филиалов в Кишинёве и заполни заявление о записи.",
        link: { label: "Где нас найти?", href: "#contact" },
      },
      {
        title: "Проходи теорию и практику",
        text: "Учись с опытными инструкторами на современных автомобилях, в группе на румынском или русском языке.",
      },
      {
        title: "Сдай экзамен и получи права",
        text: "Мы основательно готовим к теоретическому и практическому экзамену — чтобы сдать с первой попытки.",
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
        a: "Мы готовим к категориям B1 и B — самым востребованным для легковых автомобилей.",
      },
      {
        q: "Сколько длится курс?",
        a: "Все пакеты рассчитаны на 3 месяца и включают и теорию, и практику.",
      },
      {
        q: "Можно ли платить в рассрочку?",
        a: "Да. Пакеты Standard и Social можно оплатить в рассрочку до 25 платежей. Пакет Premium оплачивается полностью при подаче заявления.",
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
    hours: "Понедельник – Суббота",
    followUs: "Подписывайся",
    mapBadge: "4 филиала в Кишинёве",
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
          { label: "Пакет Premium", href: "#preturi" },
          { label: "Пакет Standard", href: "#preturi" },
          { label: "Пакет Social", href: "#preturi" },
        ],
      },
      {
        title: "Автошкола",
        links: [
          { label: "О нас", href: "#despre" },
          { label: "Как записаться", href: "#cursuri" },
          { label: "Частые вопросы", href: "#intrebari" },
        ],
      },
      {
        title: "Контакты",
        links: [
          { label: site.phone, href: site.phoneHref },
          { label: "Facebook", href: site.social.facebook },
          { label: "Instagram", href: site.social.instagram },
          { label: "TikTok", href: site.social.tiktok },
        ],
      },
    ],
    rights: "Все права защищены. · Автошкола · Кишинёв",
    credit: "Создание сайта - landings.md",
  },
};

export const dictionaries: Record<Lang, Dict> = { ro, ru };
