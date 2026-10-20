/**
 * Noutăți din trafic, preluate automat din fluxurile RSS ale presei din
 * Republica Moldova. Afișăm doar titlu, rezumat scurt, sursă, dată și link
 * către articolul original (fără republicare).
 *
 * Robust: timeout de 5 s per sursă, sursele căzute sunt ignorate, iar dacă
 * toate pică se folosește ultimul rezultat bun păstrat în memorie.
 */

export type NewsLang = "ro" | "ru";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  /** ISO 8601 */
  publishedAt: string;
  lang: NewsLang;
};

type Source = { name: string; url: string; lang: NewsLang };

/** Fluxuri verificate (răspund cu XML) la data implementării. */
export const NEWS_SOURCES: Source[] = [
  { name: "Point.md", url: "https://point.md/ro/rss", lang: "ro" },
  { name: "TV8", url: "https://tv8.md/feed", lang: "ro" },
  { name: "PRO TV Chișinău", url: "https://protv.md/rss", lang: "ro" },
  { name: "Radio Moldova", url: "https://radiomoldova.md/rss", lang: "ro" },
  { name: "NewsMaker", url: "https://newsmaker.md/ro/feed", lang: "ro" },
  { name: "Ziarul de Gardă", url: "https://www.zdg.md/feed", lang: "ro" },
  { name: "Europa Liberă", url: "https://moldova.europalibera.org/api/", lang: "ro" },
  { name: "Autoblog.md", url: "https://autoblog.md/feed", lang: "ro" },
  { name: "Point.md", url: "https://point.md/ru/rss", lang: "ru" },
  { name: "NewsMaker", url: "https://newsmaker.md/ru/feed", lang: "ru" },
];

const TIMEOUT_MS = 5000;
const MAX_AGE_DAYS = 45;
const SUMMARY_MAX = 200;

/**
 * Cuvinte cheie: rămân doar știrile legate de condus, trafic, permis etc.
 * Termenii sunt specifici (nu „mașină”, „drum”, „poliție”), ca să nu intre
 * politică, război sau sport. Lista de excludere taie ce mai scapă.
 */
const KEYWORDS_RO =
  /(\btrafic|rutier|circula[țt]i[ae]i? (rutier|auto)|restric[țt]ii de circula[țt]ie|permis(ul|ului|e|ele|elor)? de conducere|permis(ul)? auto|\bpermis(ul|e|ele)\b|[șs]coal[ăa] auto|[șs]coli(le)? auto|\baccident|\bASP\b|Agen[țt]ia Servicii Publice|\bINSP\b|poli[țt]ia rutier|\b[șs]ofer|autovehicul|carosabil|\bradar|\bpieton|motociclet|ambuteiaj|anvelop|\bpolei\b|ebrietate|alcool la volan|\bla volan\b|puncte de penalizare|examen(ul|ele)? (auto|teoretic|practic)|[îi]nmatricul|\bparcare|\bparc[ăa]ri|semafor|\bvinie|conduc[ăa]tor(i|ii|ul|ilor)? (auto|de vehicul)|limit[ăa] de vitez|dep[ăa][șs]ire[a]? (vitezei|limitei)|drumuri(le)? (na[țt]ionale|publice)|lucr[ăa]ri (de repara[țt]ie|pe) .{0,20}(drum|strad|traseu|bulevard)|trecere(a)? de pietoni|transport(ul)? public|troleibuz|autobuz|microbuz|\bcamion|autocistern|autostrad|\btraseul? (M1|M2|M3|R\d)|s-a izbit|tamponat|r[ăa]sturnat|coliziun|lovit (de|cu) (o |un )?(ma[șs]in|automobil|autovehicul|camion|troleibuz|autobuz|microbuz)|(ma[șs]in[ăa]|automobil(ul)?) a (lovit|luat foc|intrat)|(ma[șs]in[ăa]|automobil) .{0,30}a luat foc|cu ma[șs]ina (în|intr-un|într-un)|centur[ăa] de siguran|telefon(ul)? la volan|taxi(metri[șs]t|ul)?\b|parc(ul)? auto|ma[șs]ini electrice|mobilitate electric)/i;
const KEYWORDS_RU =
  /(водител|вожден|за рул[её]м|\bДТП\b|авари|дорожн|автодорог|на дорог|водительск|автошкол|трафик|пробк[аеиу]\b|пешеход|мотоцикл|парковк|светофор|\bASP\b|\bАГУ\b|Агентств[оа] государственных услуг|гололёд|гололед|\bшин[ыа]\b|нетрезв|сбил|столкн|врезал|перевернул|опрокинул|\bрадар|штрафн(ые|ых|ыми) балл|превышени[ея] скорости|ограничени[ея] скорости|троллейбус|автобус|маршрутк|грузовик|автоцистерн|\bтрасс[аеы]\b|ремонт дорог|перекрыт|движение (по|на) (улиц|трасс|дорог)|ремн[яи] безопасности|телефон за рул|такси\b|электромобил|загорел(ся|ась) (автомобил|машин))/i;

/** Semnale clare de altă tematică (politică, război, sport): le excludem. */
const EXCLUDE_RO =
  /(Zelensk|Ucrain|\bRusi[ae]i?\b|ruse[șs]ti|rachet|\bdron[ăae]|bombard|r[ăa]zboi|\bPAS\b|premier|partid|alegeri|G[ăa]g[ăa]uzi|fotbal|Ronaldo|Parlament|deputat|ministr|pre[șs]edint[ăae]|Maia Sandu|Kremlin|Putin|Trump|NATO)/i;
const EXCLUDE_RU =
  /(Зеленск|Украин|Росси[ия]|российск|ракет|\bдрон|бомб|войн|\bPAS\b|премьер|парти[яи]|выбор(ы|ах|ов)|Гагауз|футбол|Парламент|депутат|министр|президент|Санду|Кремл|Путин|Трамп|НАТО)/i;

/* ---------- parsare XML minimală, fără dependențe ---------- */

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function cleanText(raw: string | undefined): string {
  if (!raw) return "";
  let s = raw.trim();
  const cdata = /^<!\[CDATA\[([\s\S]*?)\]\]>$/.exec(s);
  if (cdata) s = cdata[1];
  s = s.replace(/<!\[CDATA\[|\]\]>/g, "");
  s = decodeEntities(s);
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeEntities(s);
  return s.replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string | undefined {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i");
  const m = re.exec(block);
  return m ? m[1] : undefined;
}

/** Atom: <link href="..."/> */
function atomLink(block: string): string | undefined {
  const alt = /<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i.exec(block);
  if (alt) return alt[1];
  const any = /<link[^>]*href=["']([^"']+)["']/i.exec(block);
  return any ? any[1] : undefined;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.\s]+$/, "") + "…";
}

function parseFeed(xml: string, src: Source): NewsItem[] {
  const blocks =
    xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) ??
    xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi) ??
    [];
  const items: NewsItem[] = [];
  for (const b of blocks) {
    const title = cleanText(tag(b, "title"));
    const linkRaw = tag(b, "link");
    const url = (linkRaw && cleanText(linkRaw)) || atomLink(b) || cleanText(tag(b, "guid"));
    const summary = cleanText(
      tag(b, "description") ?? tag(b, "summary") ?? tag(b, "content:encoded") ?? tag(b, "content")
    );
    const dateRaw = cleanText(
      tag(b, "pubDate") ?? tag(b, "dc:date") ?? tag(b, "published") ?? tag(b, "updated")
    );
    const date = dateRaw ? new Date(dateRaw) : null;
    if (!title || !url || !/^https?:\/\//i.test(url)) continue;
    const publishedAt =
      date && !Number.isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
    items.push({
      id: url,
      title,
      summary: truncate(summary === title ? "" : summary, SUMMARY_MAX),
      url,
      source: src.name,
      publishedAt,
      lang: src.lang,
    });
  }
  return items;
}

/* ---------- fetch cu timeout ---------- */

async function fetchSource(src: Source): Promise<NewsItem[]> {
  const res = await fetch(src.url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; GLGBlogBot/1.0; +https://scoalaautoglg.com)",
      accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5",
    },
  });
  if (!res.ok) throw new Error(`${src.name}: HTTP ${res.status}`);
  const text = await res.text();
  if (!/<(rss|feed|rdf:RDF)[\s>]/i.test(text.slice(0, 2000))) {
    throw new Error(`${src.name}: răspunsul nu este RSS/Atom`);
  }
  return parseFeed(text, src);
}

function isRelevant(item: NewsItem): boolean {
  const hay = `${item.title} ${item.summary}`;
  return item.lang === "ru"
    ? KEYWORDS_RU.test(hay) && !EXCLUDE_RU.test(hay)
    : KEYWORDS_RO.test(hay) && !EXCLUDE_RO.test(hay);
}

function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .slice(0, 80);
}

/* ---------- cache de rezervă în memorie ---------- */

type Store = { items: NewsItem[]; at: number };
const g = globalThis as unknown as { __glgNews?: Store };

/**
 * Returnează știrile relevante, cele mai noi primele, din ambele limbi.
 * Pagina care o apelează trebuie să aibă `revalidate` (ISR) ca să nu lovim
 * sursele la fiecare cerere.
 */
export async function getNews(limit = 12): Promise<NewsItem[]> {
  const results = await Promise.allSettled(NEWS_SOURCES.map(fetchSource));
  const all: NewsItem[] = [];
  let ok = 0;
  for (const r of results) {
    if (r.status === "fulfilled") {
      ok++;
      all.push(...r.value);
    }
  }

  if (ok === 0) {
    return g.__glgNews ? g.__glgNews.items.slice(0, limit) : [];
  }

  const minDate = Date.now() - MAX_AGE_DAYS * 86400_000;
  const seen = new Set<string>();
  const items = all
    .filter(isRelevant)
    .filter((i) => new Date(i.publishedAt).getTime() >= minDate)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .filter((i) => {
      const key = `${i.lang}:${normalizeTitle(i.title)}`;
      if (seen.has(key) || seen.has(i.url)) return false;
      seen.add(key);
      seen.add(i.url);
      return true;
    });

  // păstrăm un echilibru: nu lăsăm o singură sursă să ocupe toată lista
  const perSource = new Map<string, number>();
  const balanced = items.filter((i) => {
    const n = perSource.get(`${i.lang}:${i.source}`) ?? 0;
    if (n >= Math.max(4, Math.ceil(limit / 2))) return false;
    perSource.set(`${i.lang}:${i.source}`, n + 1);
    return true;
  });

  const ro = balanced.filter((i) => i.lang === "ro").slice(0, limit);
  const ru = balanced.filter((i) => i.lang === "ru").slice(0, limit);
  const out = [...ro, ...ru];

  if (out.length > 0) g.__glgNews = { items: out, at: Date.now() };
  return out;
}
