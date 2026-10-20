/**
 * Tipuri pentru articolele blogului. Conținutul e stocat ca date tipizate
 * (nu MDX), ca să nu avem dependențe noi și build-ul standalone să fie sigur.
 *
 * Text inline: suportă **bold** și linkuri [text](href). Nimic altceva.
 */

export type Lang = "ro" | "ru";

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** Casetă discretă (sfat, atenție, "verifică la ASP"). */
  | { type: "note"; text: string };

export type Section = {
  /** Ancoră pentru cuprins, ASCII. */
  id: string;
  title: string;
  blocks: Block[];
};

export type FaqItem = { q: string; a: string };

export type PostContent = {
  /** H1 al articolului. */
  title: string;
  /** Titlul SEO (tag <title>), max ~60 caractere. */
  seoTitle: string;
  /** Meta description, max ~160 caractere. */
  description: string;
  /** Paragrafele de introducere (înainte de primul H2). CTA-ul vine după ele. */
  intro: string[];
  sections: Section[];
  faq: FaqItem[];
};

export type Category =
  | "permis"
  | "examen"
  | "costuri"
  | "categorii"
  | "sfaturi"
  | "legislatie";

export type Post = {
  /** Slug ASCII curat, fără diacritice. */
  slug: string;
  category: Category;
  tags: string[];
  /** Dată ISO (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  /** Slug-uri de articole înrudite, afișate la final. */
  related: string[];
  ro: PostContent;
  ru: PostContent;
};
