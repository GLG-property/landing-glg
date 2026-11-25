/**
 * Sediile și tipurile de opțiuni ale formularului. OPȚIUNILE REALE (zile + oră
 * + limbă) sunt grupele DESCHISE de școală și vin din aplicație
 * (GET /api/inscriere/optiuni, proxy intern) — vezi src/lib/enroll.ts.
 * Copie a părții publice din practica-glg/lib/groupSchedule.ts.
 */
export type StudyLang = "ro" | "ru";

export const LOCATION_NAMES = ["Buiucani", "Botanica", "Strășeni", "Vorniceni"] as const;

/**
 * Gradul de umplere al grupei (capacitate 30 RO / 15 RU): verde = mai sunt
 * locuri (< 80 %), galben = aproape plină (≥ 80 %), roșu = plină (nu se poate alege).
 */
export type GroupFill = "verde" | "galben" | "rosu";

/** O grupă deschisă, cum o vede publicul (fără cabinet). */
export interface GroupOption {
  id: string;
  dayPair: string;
  slot: string;
  language: StudyLang;
  label: string;
  labelRu: string;
  startDate: string | null;
  /**
   * Umplerea, fără cifre (lipsă = tratată ca „verde”): verde = sunt locuri,
   * galben = aproape finisată, roșu = ultimele locuri disponibile. Numărul de
   * locuri rămase NU se expune public.
   */
  fill?: GroupFill;
}
export interface LocationOptions {
  name: string;
  options: GroupOption[];
}
export interface EnrollOptions {
  locations: LocationOptions[];
}

/**
 * Categoria grupei ca cheie de comparat: „” = grupa obișnuită (fără categorie sau B),
 * altfel categoria cu majuscule. COPIE din practica-glg/lib/groupSchedule.ts (groupCategoryKey).
 */
export function groupCategoryKey(category: string | null | undefined): string {
  const c = (category ?? "").toUpperCase().split(" ").filter(Boolean).join(" ");
  return c === "B" ? "" : c;
}

/**
 * Categoriile cu ora online: marți și joi, 17:30. COPIE din practica-glg/lib/groupSchedule.ts
 * (ONLINE_HOUR_CATEGORIES). Patronul, 24.11.2026: „C1 la C, CE, D, D1 la D - ora automata ma-j
 * 17:30 ONLINE. asa modifica”. „C” simplu NU e în listă. Lista stă doar aici: încă o categorie
 * se adaugă într-un singur loc (și la fel în aplicație).
 */
export const ONLINE_HOUR_CATEGORIES = ["C1 la C", "CE", "D", "D1 la D"] as const;

/**
 * Felul orei unei categorii. COPIE din practica-glg/lib/groupSchedule.ts (categoryHourKind),
 * cele două trebuie ținute la fel. Patronul, 19.11.2026: „trecerile de la o categorie la alta
 * sunt toate 18:00-22:00 vineri. toate restul categoriile inafara de B, inclusiv A,C,E etc sa fie
 * fara ora”.
 *  - "sediu": B (sau fără categorie), cu grupele deschise ale sediului;
 *  - "online": categoriile din ONLINE_HOUR_CATEGORIES, marți și joi 17:30, online (24.11.2026);
 *  - "vineri": orice altă trecere („B la A”, „A la B”, „A1 la A2”), vineri 18:00-22:00;
 *  - "fara": celelalte categorii (A1, A2, A, C), fără zile și fără oră.
 */
export type CategoryHourKind = "sediu" | "vineri" | "fara" | "online";
const ONLINE_CATEGORY_KEYS: ReadonlySet<string> = new Set(ONLINE_HOUR_CATEGORIES.map((c) => groupCategoryKey(c)));
export function categoryHourKind(category: string | null | undefined): CategoryHourKind {
  const k = groupCategoryKey(category);
  if (!k) return "sediu";
  // Ora online se caută ÎNAINTEA trecerilor: „C1 la C” și „D1 la D” sunt și ele treceri.
  if (ONLINE_CATEGORY_KEYS.has(k)) return "online";
  return k.includes(" LA ") ? "vineri" : "fara";
}

export function optionsFor(all: EnrollOptions | null, location: string, lang: StudyLang): GroupOption[] {
  const loc = all?.locations.find((l) => l.name === location);
  return (loc?.options ?? []).filter((o) => o.language === lang);
}

/** Umplerea unei opțiuni (API-ul vechi, fără câmp, înseamnă „mai sunt locuri”). */
export function fillOf(o: GroupOption): GroupFill {
  return o.fill ?? "verde";
}

/**
 * Orice grupă primită de la API se poate alege: cele pline nu mai sunt
 * trimise, iar roșu înseamnă acum „ultimele locuri disponibile”, nu „plină”.
 */
export function isSelectable(o: GroupOption): boolean {
  void o;
  return true;
}
