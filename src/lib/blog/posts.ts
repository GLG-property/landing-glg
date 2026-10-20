import type { Category, Lang, Post, PostContent } from "./types";
import { post as permisB } from "./articles/permis-categoria-b-moldova";
import { post as examenTeoretic } from "./articles/examen-teoretic-asp";
import { post as examenPractic } from "./articles/examen-practic-asp";
import { post as catCosta } from "./articles/cat-costa-scoala-auto";
import { post as mecanicaAutomata } from "./articles/mecanica-sau-automata";
import { post as categoriaA } from "./articles/permis-categoria-a";
import { post as iarna } from "./articles/condusul-iarna";
import { post as bLaC } from "./articles/trecerea-de-la-b-la-c";
import { post as incepator } from "./articles/sofer-incepator";
import { post as amenzi } from "./articles/amenzi-puncte-penalizare";
import { post as cumAlegi } from "./articles/cum-alegi-scoala-auto";
import { post as acte } from "./articles/acte-necesare-inscriere";

export type { Category, Lang, Post, PostContent } from "./types";

export const siteUrl = "https://scoalaautoglg.com";

/** Toate articolele, cele mai noi primele. */
export const posts: Post[] = [
  permisB,
  examenTeoretic,
  examenPractic,
  catCosta,
  mecanicaAutomata,
  categoriaA,
  iarna,
  bLaC,
  incepator,
  amenzi,
  cumAlegi,
  acte,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

/**
 * Interfața convenită cu sitemap.ts: sincron, doar slug + updatedAt (ISO).
 */
export function getAllPosts(): { slug: string; updatedAt: string }[] {
  return posts.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(post: Post): Post[] {
  const related = post.related
    .map((slug) => getPost(slug))
    .filter((p): p is Post => p !== undefined && p.slug !== post.slug);
  if (related.length >= 3) return related.slice(0, 3);
  // completăm cu cele mai noi articole din aceeași categorie, apoi cu restul
  const extra = posts.filter(
    (p) => p.slug !== post.slug && !related.some((r) => r.slug === p.slug)
  );
  extra.sort((a, b) => {
    const sa = a.category === post.category ? 0 : 1;
    const sb = b.category === post.category ? 0 : 1;
    return sa - sb;
  });
  return [...related, ...extra].slice(0, 3);
}

/** Numărul de cuvinte din conținutul unei limbi (pentru timpul de citire). */
export function wordCount(c: PostContent): number {
  const parts: string[] = [c.title, ...c.intro];
  for (const s of c.sections) {
    parts.push(s.title);
    for (const b of s.blocks) {
      if (b.type === "p" || b.type === "note") parts.push(b.text);
      else parts.push(...b.items);
    }
  }
  for (const f of c.faq) parts.push(f.q, f.a);
  return parts
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Minute de citire, minimum 1, la ~200 de cuvinte pe minut. */
export function readingTime(c: PostContent): number {
  return Math.max(1, Math.round(wordCount(c) / 200));
}

/** Rezumat ușor de trimis către componentele client (fără tot conținutul). */
export type PostSummary = {
  slug: string;
  category: Category;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: Record<Lang, number>;
  ro: { title: string; description: string };
  ru: { title: string; description: string };
};

export function toSummary(p: Post): PostSummary {
  return {
    slug: p.slug,
    category: p.category,
    tags: p.tags,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    readingTime: { ro: readingTime(p.ro), ru: readingTime(p.ru) },
    ro: { title: p.ro.title, description: p.ro.description },
    ru: { title: p.ru.title, description: p.ru.description },
  };
}

export function getAllSummaries(): PostSummary[] {
  return posts.map(toSummary);
}

export const categories: Category[] = [
  "permis",
  "examen",
  "costuri",
  "categorii",
  "sfaturi",
  "legislatie",
];

/** Formatează o dată ISO (YYYY-MM-DD) pentru afișare, în limba cerută. */
export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
