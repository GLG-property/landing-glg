/**
 * ============================================================
 *  Paginile de categorie de permis (SEO: „permis categoria X în Chișinău”)
 * ============================================================
 *  Modul de DATE pur (fără React), folosit de paginile /permis-categoria-<x>
 *  și de datele structurate din JsonLd.tsx.
 *
 *  Onestitate:
 *   - cursul pe care îl livrăm efectiv, cu durată și lecții practice, este cel
 *     de categoriile B1 și B (vezi pricing din src/lib/content.ts). Doar acolo
 *     scriem durata și numărul de lecții;
 *   - categoriile A1/A2/A, C/CE și D figurează în cererea-contract oficială
 *     (src/lib/enroll.ts), deci se pot cere, dar grupele se deschid în funcție
 *     de cereri: pe acele pagini scriem „detalii la telefon”, fără durate și
 *     fără prețuri inventate;
 *   - condițiile de vârstă sunt preluate din articolele noastre de blog
 *     (src/lib/blog/articles/*), care trimit la ASP pentru verificare.
 * ============================================================
 */

export interface CategorieContent {
  /** H1 al paginii. */
  h1: string;
  /** Titlul SEO (fără sufixul de brand). */
  seoTitle: string;
  /** Meta description, 140-160 caractere. */
  description: string;
  intro: string[];
  includesTitle: string;
  includes: string[];
  /** Durata, sau invitația de a suna acolo unde nu o cunoaștem. */
  durationTitle: string;
  duration: string;
  agesTitle: string;
  ages: string[];
  agesNote: string;
  stepsTitle: string;
  steps: string[];
  /** Blocul de trimitere la ghidul din blog. */
  guideTitle: string;
  guideText: string;
  guideCta: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: string;
  callCta: string;
}

export interface Categorie {
  /** Slug-ul rutei, ex. „permis-categoria-b”. */
  slug: string;
  /** Calea canonică. */
  path: string;
  /** Codurile acoperite, pentru schema.org (courseCode). */
  codes: string[];
  /** Articolul de blog corespunzător (src/lib/blog/articles/*). */
  blogSlug: string;
  /** true = cursul se ține ca pachet standard, cu durată cunoscută. */
  standardPackage: boolean;
  ro: CategorieContent;
  ru: CategorieContent;
}

const ON_REQUEST_STEPS_RO = [
  "Ne suni la 069 792 889 sau depui cererea online și alegi categoria dorită.",
  "Verificăm împreună condițiile de vârstă, stagiu și adeverința medicală.",
  "Te anunțăm când se deschide grupa pentru categoria ta și semnăm cererea-contract.",
];
const ON_REQUEST_STEPS_RU = [
  "Звоните по номеру 069 792 889 или подаёте заявку онлайн, выбрав нужную категорию.",
  "Вместе проверяем требования по возрасту, стажу и медицинской справке.",
  "Сообщаем, когда откроется группа по вашей категории, и подписываем договор.",
];

const ASP_NOTE_RO =
  "Condițiile legale se pot modifica, de aceea le verifici și la ASP înainte de înscriere. Noi te ajutăm cu calendarul, ca examenul să cadă exact când împlinești vârsta minimă.";
const ASP_NOTE_RU =
  "Требования закона могут меняться, поэтому перед записью уточните их и в ASP. Мы помогаем с календарём, чтобы экзамен пришёлся ровно на минимальный возраст.";

export const categorii: Categorie[] = [
  {
    slug: "permis-categoria-b",
    path: "/permis-categoria-b",
    codes: ["B", "B1"],
    blogSlug: "cum-obtii-permisul-de-conducere-categoria-b-moldova",
    standardPackage: true,
    ro: {
      h1: "Permis categoria B în Chișinău",
      seoTitle: "Permis categoria B în Chișinău, curs 3 luni",
      description:
        "Curs pentru permis categoria B în Chișinău: 3 luni de teorie, 24 de lecții practice pe Skoda, grupe RO și RU, plata în până la 25 de rate. Înscrie-te online.",
      intro: [
        "Categoria B este permisul pentru autoturism, cel mai căutat în Republica Moldova, și cursul principal al Școlii Auto GLG Property. Îl ținem în Chișinău, în sectoarele Buiucani și Botanica, și în filialele din Strășeni și Vorniceni.",
        "Pachetul este unul singur, complet, și acoperă categoriile B1 și B. Nu trebuie să alegi între variante: toți cursanții primesc aceeași teorie și același număr de lecții practice.",
      ],
      includesTitle: "Ce include cursul de categoria B",
      includes: [
        "Teorie cu profesori atestați, în grupe de maximum 30 de persoane",
        "24 de lecții practice pe Skoda Fabia, Skoda Scala și Toyota Yaris",
        "Practică pe traseele reale de examinare din Chișinău",
        "Grupe în limba română la toate sediile și în limba rusă la Buiucani",
        "Cutie mecanică sau automată, la alegere",
        "Fișa de școlarizare la final, actul cu care te programezi la ASP",
        "Achitare în până la 25 de rate",
      ],
      durationTitle: "Cât durează",
      duration:
        "Cursul durează 3 luni și cuprinde atât teoria, cât și practica. Teoria se ține luni și miercuri, marți și joi sau în weekend, sâmbăta de la 09:00; orele din timpul săptămânii sunt 09:30, 16:00, 17:30 și 19:00, iar la Buiucani grupele în limba rusă sunt la 17:30 și 19:00.",
      agesTitle: "Condițiile legale de vârstă",
      ages: [
        "Examenul la ASP pentru categoria B se susține de la 18 ani împliniți.",
        "Te poți înscrie la școala auto mai devreme, ca să termini cursul până la 18 ani.",
        "Ai nevoie de adeverință medicală care atestă aptitudinea de a conduce.",
        "Pentru B1, cvadricicluri, condițiile se verifică la ASP, sună-ne și le clarificăm.",
      ],
      agesNote: ASP_NOTE_RO,
      stepsTitle: "Cum te înscrii",
      steps: [
        "Completezi cererea de înscriere online și alegi sediul, limba și ora grupei.",
        "Te sunăm ca să confirmăm grupa și stabilim data primei ședințe.",
        "Vii la sediu cu buletinul, semnezi cererea-contract și începi teoria.",
      ],
      guideTitle: "Ghidul complet, pas cu pas",
      guideText:
        "Am scris un ghid detaliat despre permisul de categoria B în Republica Moldova: actele necesare, examenele la ASP, taxele și cât durează tot procesul.",
      guideCta: "Citește ghidul despre categoria B",
      faqTitle: "Întrebări frecvente despre categoria B",
      faq: [
        {
          q: "Cât durează cursul pentru categoria B?",
          a: "3 luni, cu teorie și practică incluse. La final primești fișa de școlarizare, actul cu care te programezi la examenul ASP.",
        },
        {
          q: "Câte lecții practice am la categoria B?",
          a: "24 de lecții practice, pe Skoda Fabia, Skoda Scala și Toyota Yaris, inclusiv pe traseele reale de examinare din Chișinău.",
        },
        {
          q: "Pot face practica pe cutie automată?",
          a: "Da, alegi cutia la înscriere. Atenție: cu permisul luat pe automată nu ai voie să conduci mașină cu cutie mecanică.",
        },
        {
          q: "Cât costă cursul de categoria B?",
          a: "Prețul ți-l comunicăm la telefon sau direct la sediu, pentru că depinde de condițiile de plată. Se poate achita în până la 25 de rate.",
        },
        {
          q: "Se poate învăța în limba rusă?",
          a: "Da, grupele în limba rusă se țin la sediul din Buiucani, la orele 17:30 și 19:00.",
        },
      ],
      cta: "Înscrie-te la categoria B",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Права категории B в Кишинёве",
      seoTitle: "Права категории B в Кишинёве, курс 3 месяца",
      description:
        "Курс на права категории B в Кишинёве: 3 месяца теории, 24 практических занятия на Skoda, группы на русском и румынском, оплата до 25 частей. Заявка онлайн.",
      intro: [
        "Категория B это права на легковой автомобиль, самые востребованные в Молдове и основной курс Автошколы GLG Property. Проводим его в Кишинёве, в секторах Буюканы и Ботаника, а также в филиалах Стрэшены и Ворничены.",
        "Пакет один и полный, он охватывает категории B1 и B. Выбирать между вариантами не нужно: все ученики получают одинаковую теорию и одинаковое количество практических занятий.",
      ],
      includesTitle: "Что входит в курс категории B",
      includes: [
        "Теория с аттестованными преподавателями, группы до 30 человек",
        "24 практических занятия на Skoda Fabia, Skoda Scala и Toyota Yaris",
        "Практика по реальным экзаменационным маршрутам Кишинёва",
        "Группы на румынском во всех филиалах и на русском в Буюканах",
        "Механика или автомат, на выбор",
        "Свидетельство об окончании курса, документ для записи в ASP",
        "Оплата до 25 частей",
      ],
      durationTitle: "Сколько длится",
      duration:
        "Курс длится 3 месяца и включает теорию и практику. Теория проходит по понедельникам и средам, по вторникам и четвергам или в выходные, по субботам с 09:00; в будни занятия в 09:30, 16:00, 17:30 или 19:00, а в Буюканах группы на русском в 17:30 и 19:00.",
      agesTitle: "Требования по возрасту",
      ages: [
        "Экзамен в ASP на категорию B сдают с 18 полных лет.",
        "Записаться в автошколу можно раньше, чтобы закончить курс к 18 годам.",
        "Нужна медицинская справка о пригодности к управлению.",
        "Условия для B1, квадрициклы, уточняются в ASP, позвоните и мы разберём их вместе.",
      ],
      agesNote: ASP_NOTE_RU,
      stepsTitle: "Как записаться",
      steps: [
        "Заполняете заявку онлайн и выбираете филиал, язык и время группы.",
        "Мы звоним, подтверждаем группу и назначаем дату первого занятия.",
        "Приходите в филиал с удостоверением личности, подписываете договор и начинаете теорию.",
      ],
      guideTitle: "Полное руководство, шаг за шагом",
      guideText:
        "Мы написали подробное руководство о правах категории B в Молдове: нужные документы, экзамены в ASP, пошлины и сколько длится весь процесс.",
      guideCta: "Читать руководство о категории B",
      faqTitle: "Частые вопросы о категории B",
      faq: [
        {
          q: "Сколько длится курс на категорию B?",
          a: "3 месяца, теория и практика включены. В конце выдаём свидетельство об окончании, документ для записи на экзамен в ASP.",
        },
        {
          q: "Сколько практических занятий на категории B?",
          a: "24 занятия, на Skoda Fabia, Skoda Scala и Toyota Yaris, в том числе по реальным экзаменационным маршрутам Кишинёва.",
        },
        {
          q: "Можно ли учиться на автомате?",
          a: "Да, коробку выбираете при записи. Важно: с правами, полученными на автомате, нельзя управлять машиной с механикой.",
        },
        {
          q: "Сколько стоит курс категории B?",
          a: "Стоимость сообщим по телефону или в филиале, она зависит от условий оплаты. Доступна оплата до 25 частей.",
        },
        {
          q: "Можно ли учиться на русском языке?",
          a: "Да, группы на русском языке проходят в филиале Буюканы, в 17:30 и 19:00.",
        },
      ],
      cta: "Записаться на категорию B",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "permis-categoria-a",
    path: "/permis-categoria-a",
    codes: ["A", "A1", "A2"],
    blogSlug: "permis-categoria-a-a1-a2-ce-trebuie-sa-stii",
    standardPackage: false,
    ro: {
      h1: "Permis categoria A, A1 și A2 în Chișinău",
      seoTitle: "Permis categoria A, A1, A2 în Chișinău",
      description:
        "Permis de motocicletă în Chișinău: categoriile A1, A2 și A, condițiile de vârstă, examenul la ASP și cum ceri o grupă la Școala Auto GLG Property. Detalii la telefon.",
      intro: [
        "Permisul pentru două roți are patru trepte: AM pentru scutere, A1, A2 și A. Treapta depinde de puterea motocicletei și de vârsta ta, iar categoria superioară le include pe cele inferioare.",
        "Categoriile A1, A2 și A figurează în cererea-contract a Școlii Auto GLG Property, deci le poți cere. Grupele de motocicletă se deschid în funcție de numărul de cereri, de aceea disponibilitatea și condițiile exacte ți le confirmăm la telefon.",
      ],
      includesTitle: "Ce înseamnă fiecare categorie",
      includes: [
        "AM: ciclomotoare și scutere cu viteză maximă constructivă de până la 45 km/h",
        "A1: motociclete de până la 125 cm³ și cel mult 11 kW, plus tricicluri de până la 15 kW",
        "A2: motociclete de cel mult 35 kW, cu raport putere pe masă de cel mult 0,2 kW/kg",
        "A: motociclete fără limită de putere, cu sau fără ataș, și tricicluri de peste 15 kW",
        "Examenul teoretic are același format ca la categoria B: 24 de întrebări în 30 de minute",
        "Proba practică se dă pe poligon: slalom, ocolirea obstacolului, frânare controlată",
        "Pregătirea practică se face pe motociclete Maya Motors și Andes, din parcul nostru de peste 50 de vehicule",
      ],
      durationTitle: "Durata cursului",
      duration:
        "Durata depinde de categoria cerută și de grupa care se deschide, de aceea nu o publicăm aici. Sună-ne la 069 792 889 și îți spunem exact ce grupe sunt planificate și cât durează pregătirea.",
      agesTitle: "Condițiile legale de vârstă",
      ages: [
        "AM: de la 16 ani.",
        "A1: de la 16 ani.",
        "A2: de la 18 ani.",
        "A: de la 20 de ani dacă deții A2 de cel puțin 2 ani, sau de la 24 de ani pentru acces direct.",
        "Dacă ai permis de categoria B de cel puțin 24 de luni, legislația prevede posibilitatea de a obține A1 după un curs complet de instruire practică; condițiile exacte se verifică la ASP.",
      ],
      agesNote: ASP_NOTE_RO,
      stepsTitle: "Cum ceri o grupă de motocicletă",
      steps: ON_REQUEST_STEPS_RO,
      guideTitle: "Ghidul despre permisul de motocicletă",
      guideText:
        "Am scris un ghid despre categoriile AM, A1, A2 și A: ce poți conduce cu fiecare, cum arată examenul pe poligon și ce echipament îți trebuie.",
      guideCta: "Citește ghidul despre categoria A",
      faqTitle: "Întrebări frecvente despre categoria A",
      faq: [
        {
          q: "De la ce vârstă pot conduce un scuter în Moldova?",
          a: "De la 16 ani, cu permis de subcategoria AM, pentru ciclomotoare cu viteză maximă constructivă de până la 45 km/h. Verifică condițiile actuale la ASP.",
        },
        {
          q: "Pot lua direct categoria A?",
          a: "Da, dacă ai împlinit 24 de ani. Sub această vârstă treci întâi prin A2 și aștepți 2 ani.",
        },
        {
          q: "Aveți grupe pentru motocicletă acum?",
          a: "Categoriile A1, A2 și A sunt în cererea-contract, iar grupele se deschid în funcție de cereri. Sună-ne la 069 792 889 și îți spunem ce este planificat.",
        },
        {
          q: "Cât costă cursul de motocicletă?",
          a: "Prețul ți-l comunicăm la telefon, pentru că depinde de categorie și de grupa deschisă. Nu publicăm tarife pe care nu le putem garanta.",
        },
      ],
      cta: "Trimite cererea pentru categoria A",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Права категорий A, A1 и A2 в Кишинёве",
      seoTitle: "Права категорий A, A1, A2 в Кишинёве",
      description:
        "Мотоправа в Кишинёве: категории A1, A2 и A, требования по возрасту, экзамен в ASP и как запросить группу в Автошколе GLG Property. Детали по телефону.",
      intro: [
        "Права на две колеса имеют четыре ступени: AM для скутеров, A1, A2 и A. Ступень зависит от мощности мотоцикла и вашего возраста, а высшая категория включает низшие.",
        "Категории A1, A2 и A есть в договоре Автошколы GLG Property, значит их можно запросить. Мотогруппы открываются по мере заявок, поэтому наличие и точные условия подтверждаем по телефону.",
      ],
      includesTitle: "Что означает каждая категория",
      includes: [
        "AM: мопеды и скутеры с максимальной конструктивной скоростью до 45 км/ч",
        "A1: мотоциклы до 125 см³ и мощностью до 11 кВт, трициклы до 15 кВт",
        "A2: мотоциклы мощностью до 35 кВт, отношение мощности к массе до 0,2 кВт/кг",
        "A: мотоциклы без ограничения мощности, с коляской или без, и трициклы свыше 15 кВт",
        "Теоретический экзамен как для категории B: 24 вопроса за 30 минут",
        "Практика на площадке: слалом, объезд препятствия, контролируемое торможение",
        "Практическая подготовка на мотоциклах Maya Motors и Andes, из нашего парка более 50 единиц транспорта",
      ],
      durationTitle: "Длительность курса",
      duration:
        "Длительность зависит от запрошенной категории и от открываемой группы, поэтому мы её здесь не публикуем. Позвоните по номеру 069 792 889, и мы расскажем, какие группы запланированы и сколько идёт подготовка.",
      agesTitle: "Требования по возрасту",
      ages: [
        "AM: с 16 лет.",
        "A1: с 16 лет.",
        "A2: с 18 лет.",
        "A: с 20 лет при стаже A2 не менее 2 лет или с 24 лет напрямую.",
        "При стаже категории B не менее 24 месяцев закон допускает получение A1 после полного практического курса; точные условия уточняйте в ASP.",
      ],
      agesNote: ASP_NOTE_RU,
      stepsTitle: "Как запросить мотогруппу",
      steps: ON_REQUEST_STEPS_RU,
      guideTitle: "Руководство о мотоправах",
      guideText:
        "Мы написали руководство о категориях AM, A1, A2 и A: что можно водить с каждой, как выглядит экзамен на площадке и какая нужна экипировка.",
      guideCta: "Читать руководство о категории A",
      faqTitle: "Частые вопросы о категории A",
      faq: [
        {
          q: "С какого возраста можно водить скутер в Молдове?",
          a: "С 16 лет, с правами подкатегории AM, для мопедов со скоростью до 45 км/ч. Актуальные условия уточняйте в ASP.",
        },
        {
          q: "Можно ли сразу получить категорию A?",
          a: "Да, с 24 лет. Моложе нужно сначала два года на A2.",
        },
        {
          q: "Есть ли у вас мотогруппы сейчас?",
          a: "Категории A1, A2 и A есть в договоре, группы открываются по мере заявок. Позвоните по номеру 069 792 889, и мы скажем, что запланировано.",
        },
        {
          q: "Сколько стоит мотокурс?",
          a: "Стоимость сообщим по телефону, она зависит от категории и открытой группы. Мы не публикуем тарифы, которые не можем гарантировать.",
        },
      ],
      cta: "Отправить заявку на категорию A",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "permis-categoria-c",
    path: "/permis-categoria-c",
    codes: ["C", "CE"],
    blogSlug: "trecerea-de-la-b-la-c-ce-d",
    standardPackage: false,
    ro: {
      h1: "Permis categoria C și CE în Chișinău",
      seoTitle: "Permis categoria C și CE în Chișinău",
      description:
        "Permis categoria C și CE în Chișinău: vârsta minimă, stagiul cerut, examenul ASP de 30 de întrebări și traseul de 45 de minute. Cere o grupă la 069 792 889.",
      intro: [
        "Categoria C este permisul pentru camion, iar CE pentru autotren, adică cap tractor cu semiremorcă sau camion cu remorcă de peste 750 kg. Sunt categoriile cerute cel mai des de companiile de transport de marfă.",
        "Categoriile C și CE figurează în cererea-contract a Școlii Auto GLG Property. Grupele profesionale se deschid în funcție de numărul de cereri, de aceea disponibilitatea și durata exactă ți le confirmăm la telefon.",
      ],
      includesTitle: "Ce acoperă categoriile de marfă",
      includes: [
        "C1: autovehicule de marfă cu masa maximă autorizată între 3.500 și 7.500 kg",
        "C: autovehicule de marfă cu masa maximă autorizată de peste 3.500 kg",
        "C1E și CE: aceleași vehicule cuplate cu remorcă de peste 750 kg",
        "Teoria are 30 de întrebări în 38 de minute, cu minimum 27 de răspunsuri corecte",
        "Proba practică se dă pe traseu real, cu durată de minimum 45 de minute",
        "Adeverința medicală pentru categoriile profesionale cere un control mai amănunțit",
        "Pregătirea practică se face pe camioane Volvo FE 320, Volvo FL 290 și MAN, cu cutie mecanică și automată",
      ],
      durationTitle: "Durata cursului",
      duration:
        "Durata depinde de categoria cerută, de stagiul pe care îl ai deja și de grupa care se deschide. Sună-ne la 069 792 889 pentru detalii, nu publicăm aici o durată pe care nu o putem garanta.",
      agesTitle: "Condițiile legale de vârstă",
      ages: [
        "C1 și C1E: de la 18 ani, cu permis de categoria B.",
        "C și CE: de la 21 de ani, cu permis de categoria B; pentru CE trebuie să deții deja categoria C.",
        "Nu se poate obține CE fără C, de regulă cele două se iau una după alta.",
        "Adeverința medicală pentru categoriile profesionale verifică vedere, auz și afecțiuni cardiovasculare.",
      ],
      agesNote: ASP_NOTE_RO,
      stepsTitle: "Cum ceri o grupă de categoria C",
      steps: ON_REQUEST_STEPS_RO,
      guideTitle: "Ghidul de la categoria B la C, CE sau D",
      guideText:
        "Am scris un ghid despre categoriile profesionale: vârsta minimă, stagiul cerut, examenele la ASP și ce înseamnă pentru o carieră în transport.",
      guideCta: "Citește ghidul despre C, CE și D",
      faqTitle: "Întrebări frecvente despre categoria C",
      faq: [
        {
          q: "De la ce vârstă pot obține categoria C?",
          a: "De la 21 de ani, cu permis de categoria B. Subcategoria C1, până la 7.500 kg, se poate obține de la 18 ani. Verifică la ASP, condițiile se pot actualiza.",
        },
        {
          q: "Pot lua direct CE, fără C?",
          a: "Nu. Pentru CE trebuie să deții deja categoria C. De regulă, cele două se obțin una după alta.",
        },
        {
          q: "Câte întrebări are examenul teoretic pentru C și CE?",
          a: "30 de întrebări în 38 de minute, cu minimum 27 de răspunsuri corecte pentru calificativul Admis.",
        },
        {
          q: "Aveți grupe pentru categoria C acum?",
          a: "Categoriile C și CE sunt în cererea-contract, iar grupele profesionale se deschid în funcție de cereri. Sună-ne la 069 792 889 și îți spunem ce este planificat.",
        },
      ],
      cta: "Trimite cererea pentru categoria C",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Права категорий C и CE в Кишинёве",
      seoTitle: "Права категорий C и CE в Кишинёве, условия",
      description:
        "Права категорий C и CE в Кишинёве: минимальный возраст, стаж, экзамен ASP из 30 вопросов и маршрут 45 минут. Запросите группу по номеру 069 792 889.",
      intro: [
        "Категория C это права на грузовик, а CE на автопоезд, то есть тягач с полуприцепом или грузовик с прицепом свыше 750 кг. Эти категории чаще всего требуют транспортные компании.",
        "Категории C и CE есть в договоре Автошколы GLG Property. Профессиональные группы открываются по мере заявок, поэтому наличие и точную длительность подтверждаем по телефону.",
      ],
      includesTitle: "Что охватывают грузовые категории",
      includes: [
        "C1: грузовые автомобили разрешённой массой от 3 500 до 7 500 кг",
        "C: грузовые автомобили разрешённой массой свыше 3 500 кг",
        "C1E и CE: те же машины в сцепке с прицепом свыше 750 кг",
        "Теория: 30 вопросов за 38 минут, минимум 27 правильных ответов",
        "Практика на реальном маршруте, не менее 45 минут",
        "Медсправка для профессиональных категорий требует более подробного осмотра",
        "Практическая подготовка на грузовиках Volvo FE 320, Volvo FL 290 и MAN, механика и автомат",
      ],
      durationTitle: "Длительность курса",
      duration:
        "Длительность зависит от запрошенной категории, от имеющегося стажа и от открываемой группы. Звоните по номеру 069 792 889 за деталями, мы не публикуем сроки, которые не можем гарантировать.",
      agesTitle: "Требования по возрасту",
      ages: [
        "C1 и C1E: с 18 лет, при наличии категории B.",
        "C и CE: с 21 года, при наличии категории B; для CE нужна уже полученная категория C.",
        "Получить CE без C нельзя, обычно их берут одну за другой.",
        "Медсправка для профессиональных категорий проверяет зрение, слух и сердечно-сосудистые заболевания.",
      ],
      agesNote: ASP_NOTE_RU,
      stepsTitle: "Как запросить группу категории C",
      steps: ON_REQUEST_STEPS_RU,
      guideTitle: "Руководство: с категории B на C, CE или D",
      guideText:
        "Мы написали руководство о профессиональных категориях: минимальный возраст, стаж, экзамены в ASP и что это значит для карьеры в транспорте.",
      guideCta: "Читать руководство о C, CE и D",
      faqTitle: "Частые вопросы о категории C",
      faq: [
        {
          q: "С какого возраста можно получить категорию C?",
          a: "С 21 года при наличии категории B. Подкатегория C1, до 7 500 кг, доступна с 18 лет. Уточните в ASP, условия могут обновляться.",
        },
        {
          q: "Можно ли сразу CE, без C?",
          a: "Нет. Для CE нужна уже полученная категория C. Обычно их берут одну за другой.",
        },
        {
          q: "Сколько вопросов в теории на C и CE?",
          a: "30 вопросов за 38 минут, минимум 27 правильных ответов для оценки Допущен.",
        },
        {
          q: "Есть ли у вас группы на категорию C сейчас?",
          a: "Категории C и CE есть в договоре, профессиональные группы открываются по мере заявок. Позвоните по номеру 069 792 889, и мы скажем, что запланировано.",
        },
      ],
      cta: "Отправить заявку на категорию C",
      callCta: "Позвонить 069 792 889",
    },
  },
  {
    slug: "permis-categoria-d",
    path: "/permis-categoria-d",
    codes: ["D", "D1"],
    blogSlug: "trecerea-de-la-b-la-c-ce-d",
    standardPackage: false,
    ro: {
      h1: "Permis categoria D în Chișinău",
      seoTitle: "Permis categoria D în Chișinău, condiții",
      description:
        "Permis categoria D în Chișinău, autobuz și microbuz: vârsta minimă, stagiul cerut, examenul ASP și cum ceri o grupă la Școala Auto GLG Property. Detalii la telefon.",
      intro: [
        "Categoria D este permisul pentru transportul de persoane cu autobuzul, iar subcategoria D1 pentru microbuze de până la 16 locuri. Cerințele sunt cele mai stricte dintre toate categoriile, pentru că transporți oameni.",
        "Categoria D figurează în cererea-contract a Școlii Auto GLG Property. Grupele se deschid în funcție de numărul de cereri, de aceea disponibilitatea și durata exactă ți le confirmăm la telefon.",
      ],
      includesTitle: "Ce acoperă categoriile de persoane",
      includes: [
        "D1: autovehicule pentru transport de persoane cu până la 16 locuri în afara conducătorului",
        "D: autovehicule pentru transport de persoane fără limita de 16 locuri, adică autobuze",
        "D1E și DE: aceleași vehicule cuplate cu remorcă de peste 750 kg",
        "Teoria are 30 de întrebări în 38 de minute, cu minimum 27 de răspunsuri corecte",
        "Proba practică se dă pe traseu real, cu durată de minimum 45 de minute",
        "Pentru transportul de persoane, cerințele medicale sunt cele mai stricte",
        "Pregătirea practică se face pe autobuze Irisbus din parcul școlii",
      ],
      durationTitle: "Durata cursului",
      duration:
        "Durata depinde de categoria cerută, de stagiul pe care îl ai deja și de grupa care se deschide. Sună-ne la 069 792 889 pentru detalii, nu publicăm aici o durată pe care nu o putem garanta.",
      agesTitle: "Condițiile legale de vârstă",
      ages: [
        "D1 și D1E: de la 21 de ani, cu permis de categoria B de cel puțin 24 de luni.",
        "D și DE: de la 24 de ani, cu permis de subcategoria D1 sau de categoria C de cel puțin 24 de luni.",
        "Pentru transportul public de persoane se cere și atestatul profesional corespunzător.",
        "Școlile auto pot primi cursanți cu câteva luni înainte de împlinirea vârstei, ca examenul să cadă exact la vârsta minimă.",
      ],
      agesNote: ASP_NOTE_RO,
      stepsTitle: "Cum ceri o grupă de categoria D",
      steps: ON_REQUEST_STEPS_RO,
      guideTitle: "Ghidul de la categoria B la C, CE sau D",
      guideText:
        "Am scris un ghid despre categoriile profesionale: vârsta minimă, stagiul cerut, examenele la ASP și traseul tipic de carieră în transportul de persoane.",
      guideCta: "Citește ghidul despre C, CE și D",
      faqTitle: "Întrebări frecvente despre categoria D",
      faq: [
        {
          q: "De la ce vârstă pot obține categoria D?",
          a: "De la 24 de ani, cu permis de subcategoria D1 sau de categoria C de cel puțin 24 de luni. Subcategoria D1 se poate obține de la 21 de ani. Verifică la ASP.",
        },
        {
          q: "Am nevoie de categoria C înainte de D?",
          a: "Pentru categoria D se cere permis de subcategoria D1 sau de categoria C de cel puțin 24 de luni. Pentru D1 este suficientă categoria B de cel puțin 24 de luni.",
        },
        {
          q: "Câte întrebări are examenul teoretic pentru D?",
          a: "30 de întrebări în 38 de minute, cu minimum 27 de răspunsuri corecte pentru calificativul Admis.",
        },
        {
          q: "Aveți grupe pentru categoria D acum?",
          a: "Categoria D este în cererea-contract, iar grupele se deschid în funcție de cereri. Sună-ne la 069 792 889 și îți spunem ce este planificat.",
        },
      ],
      cta: "Trimite cererea pentru categoria D",
      callCta: "Sună la 069 792 889",
    },
    ru: {
      h1: "Права категории D в Кишинёве",
      seoTitle: "Права категории D в Кишинёве, условия и возраст",
      description:
        "Права категории D в Кишинёве, автобус и микроавтобус: минимальный возраст, стаж, экзамен ASP и как запросить группу в Автошколе GLG Property.",
      intro: [
        "Категория D это права на перевозку пассажиров автобусом, а подкатегория D1 на микроавтобусы до 16 мест. Требования самые строгие из всех категорий, потому что вы перевозите людей.",
        "Категория D есть в договоре Автошколы GLG Property. Группы открываются по мере заявок, поэтому наличие и точную длительность подтверждаем по телефону.",
      ],
      includesTitle: "Что охватывают пассажирские категории",
      includes: [
        "D1: пассажирские автомобили до 16 мест, помимо места водителя",
        "D: пассажирские автомобили без ограничения в 16 мест, то есть автобусы",
        "D1E и DE: те же машины в сцепке с прицепом свыше 750 кг",
        "Теория: 30 вопросов за 38 минут, минимум 27 правильных ответов",
        "Практика на реальном маршруте, не менее 45 минут",
        "Для перевозки пассажиров медицинские требования самые строгие",
        "Практическая подготовка на автобусах Irisbus из парка школы",
      ],
      durationTitle: "Длительность курса",
      duration:
        "Длительность зависит от запрошенной категории, от имеющегося стажа и от открываемой группы. Звоните по номеру 069 792 889 за деталями, мы не публикуем сроки, которые не можем гарантировать.",
      agesTitle: "Требования по возрасту",
      ages: [
        "D1 и D1E: с 21 года, при стаже категории B не менее 24 месяцев.",
        "D и DE: с 24 лет, при стаже подкатегории D1 или категории C не менее 24 месяцев.",
        "Для общественных пассажирских перевозок требуется и профессиональный аттестат.",
        "Автошколы принимают учеников за несколько месяцев до нужного возраста, чтобы экзамен пришёлся ровно на минимальный возраст.",
      ],
      agesNote: ASP_NOTE_RU,
      stepsTitle: "Как запросить группу категории D",
      steps: ON_REQUEST_STEPS_RU,
      guideTitle: "Руководство: с категории B на C, CE или D",
      guideText:
        "Мы написали руководство о профессиональных категориях: минимальный возраст, стаж, экзамены в ASP и типичный карьерный путь в пассажирских перевозках.",
      guideCta: "Читать руководство о C, CE и D",
      faqTitle: "Частые вопросы о категории D",
      faq: [
        {
          q: "С какого возраста можно получить категорию D?",
          a: "С 24 лет, при стаже подкатегории D1 или категории C не менее 24 месяцев. Подкатегория D1 доступна с 21 года. Уточните в ASP.",
        },
        {
          q: "Нужна ли категория C перед D?",
          a: "Для категории D требуется подкатегория D1 или категория C со стажем не менее 24 месяцев. Для D1 достаточно категории B со стажем 24 месяца.",
        },
        {
          q: "Сколько вопросов в теории на категорию D?",
          a: "30 вопросов за 38 минут, минимум 27 правильных ответов для оценки Допущен.",
        },
        {
          q: "Есть ли у вас группы на категорию D сейчас?",
          a: "Категория D есть в договоре, группы открываются по мере заявок. Позвоните по номеру 069 792 889, и мы скажем, что запланировано.",
        },
      ],
      cta: "Отправить заявку на категорию D",
      callCta: "Позвонить 069 792 889",
    },
  },
];

export function getCategorie(slug: string): Categorie | undefined {
  return categorii.find((c) => c.slug === slug);
}

/** Ca `getCategorie`, dar aruncă la build dacă slug-ul nu există (rută greșită). */
export function requireCategorie(slug: string): Categorie {
  const found = getCategorie(slug);
  if (!found) throw new Error(`Categorie necunoscută: ${slug}`);
  return found;
}

const SHORT_LABEL: Record<string, { ro: string; ru: string }> = {
  "permis-categoria-b": { ro: "Permis categoria B", ru: "Права категории B" },
  "permis-categoria-a": { ro: "Permis categoria A, A1, A2", ru: "Права категорий A, A1, A2" },
  "permis-categoria-c": { ro: "Permis categoria C și CE", ru: "Права категорий C и CE" },
  "permis-categoria-d": { ro: "Permis categoria D", ru: "Права категории D" },
};

/** Linkuri scurte către celelalte categorii, pentru navigarea internă. */
export function categoriiLinks(exceptSlug?: string): { path: string; ro: string; ru: string }[] {
  return categorii
    .filter((c) => c.slug !== exceptSlug)
    .map((c) => ({ path: c.path, ...SHORT_LABEL[c.slug] }));
}

/** Eticheta scurtă a unei categorii (breadcrumb, linkuri). */
export function categorieLabel(slug: string): { ro: string; ru: string } {
  return SHORT_LABEL[slug] ?? { ro: slug, ru: slug };
}
