import type { Category, Lang } from "./types";

/** Textele de interfață ale blogului (etichete, butoane), în ambele limbi. */
export type BlogDict = {
  blog: string;
  home: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  all: string;
  filterLabel: string;
  categories: Record<Category, string>;
  readArticle: string;
  minRead: string;
  updated: string;
  toc: string;
  faq: string;
  related: string;
  tags: string;
  backToBlog: string;
  news: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    source: string;
    readSource: string;
    all: string;
    disclaimer: string;
    empty: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
    call: string;
    short: string;
    shortButton: string;
  };
  share: string;
};

const ro: BlogDict = {
  blog: "Blog",
  home: "Acasă",
  eyebrow: "Blog GLG Property",
  title: "Ghiduri despre permis",
  titleAccent: "și condus în Moldova",
  subtitle:
    "Articole scrise de instructorii noștri: cum obții permisul, cum te pregătești de examenele ASP, ce reguli noi apar. Plus noutăți din trafic, actualizate automat.",
  all: "Toate",
  filterLabel: "Filtrează după categorie",
  categories: {
    permis: "Permisul de conducere",
    examen: "Examenele ASP",
    costuri: "Costuri",
    categorii: "Categorii de permis",
    sfaturi: "Sfaturi de condus",
    legislatie: "Legislație",
  },
  readArticle: "Citește articolul",
  minRead: "min de citire",
  updated: "Actualizat",
  toc: "Cuprins",
  faq: "Întrebări frecvente",
  related: "Citește și",
  tags: "Etichete",
  backToBlog: "Toate articolele",
  news: {
    eyebrow: "Preluate automat din presă",
    title: "Noutăți",
    titleAccent: "din trafic",
    subtitle:
      "Cele mai noi știri despre condus, permise, amenzi și siguranță rutieră din Republica Moldova, cu link către sursa originală.",
    source: "Sursa",
    readSource: "Citește la sursă",
    all: "Toate noutățile",
    disclaimer:
      "Titlurile și rezumatele aparțin publicațiilor citate. Articolul complet se citește pe site-ul sursei.",
    empty: "Momentan nu avem noutăți de afișat. Revino mai târziu.",
  },
  cta: {
    eyebrow: "Școala Auto GLG Property",
    title: "Gata să începi? Înscrie-te la școala auto",
    text: "Grupe în română și rusă, mașini moderne Skoda, 4 centre în Chișinău și plata în până la 25 de rate. Completezi cererea online în câteva minute și te sunăm noi.",
    button: "Înscrie-te la școala auto",
    call: "Sună-ne",
    short: "Vrei permisul? Te pregătim din prima.",
    shortButton: "Înscrie-te",
  },
  share: "Distribuie",
};

const ru: BlogDict = {
  blog: "Блог",
  home: "Главная",
  eyebrow: "Блог GLG Property",
  title: "Гиды о правах",
  titleAccent: "и вождении в Молдове",
  subtitle:
    "Статьи наших инструкторов: как получить права, как готовиться к экзаменам ASP, какие правила меняются. Плюс новости с дорог, обновляемые автоматически.",
  all: "Все",
  filterLabel: "Фильтр по категории",
  categories: {
    permis: "Водительские права",
    examen: "Экзамены ASP",
    costuri: "Стоимость",
    categorii: "Категории прав",
    sfaturi: "Советы по вождению",
    legislatie: "Законодательство",
  },
  readArticle: "Читать статью",
  minRead: "мин чтения",
  updated: "Обновлено",
  toc: "Содержание",
  faq: "Частые вопросы",
  related: "Читайте также",
  tags: "Теги",
  backToBlog: "Все статьи",
  news: {
    eyebrow: "Автоматически из прессы",
    title: "Новости",
    titleAccent: "с дорог",
    subtitle:
      "Свежие новости о вождении, правах, штрафах и безопасности на дорогах Молдовы, со ссылкой на первоисточник.",
    source: "Источник",
    readSource: "Читать в источнике",
    all: "Все новости",
    disclaimer:
      "Заголовки и краткие описания принадлежат цитируемым изданиям. Полная статья читается на сайте источника.",
    empty: "Пока нет новостей для показа. Загляните позже.",
  },
  cta: {
    eyebrow: "Автошкола GLG Property",
    title: "Готовы начать? Запишитесь в автошколу",
    text: "Группы на румынском и русском, современные Skoda, 4 филиала в Кишинёве и рассрочка до 25 платежей. Заполните заявку онлайн за пару минут, и мы перезвоним.",
    button: "Записаться в автошколу",
    call: "Позвонить",
    short: "Хотите права? Подготовим с первого раза.",
    shortButton: "Записаться",
  },
  share: "Поделиться",
};

export const blogDict: Record<Lang, BlogDict> = { ro, ru };
