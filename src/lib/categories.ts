/**
 * COPIE a catalogului de categorii din aplicație
 * (practica-glg/lib/enrollment/categories.ts). Cele două fișiere trebuie
 * ținute la fel: parametrii fiecărei categorii (curs teoretic da/nu, cutie de
 * viteze da/nu) hotărăsc ce câmpuri arată formularul de înscriere.
 */
/**
 * ============================================================
 *  Catalogul categoriilor de înscriere (10.11.2026)
 * ============================================================
 *  Patronul: „categoriile / trecerile de categorii în cerere să fie din
 *  selector, nu câmp liber, fiecare să aibă parametrii săi. B->A1 e fără
 *  teorie, nu merge în aceeași grupă."
 *
 *  AICI stau parametrii fiecărei categorii. Când patronul trimite datele
 *  (preț, teorie da/nu, durată, cutie de viteze), se schimbă rândul din
 *  tabelul CATEGORIES și atât: formularele secretarului, API-ul public,
 *  aprobarea, taxa de bază, durata din contract și cererea tipărită citesc
 *  toate de aici.
 *
 *  Modul PUR (fără importuri de server): se folosește și în componente
 *  client. Copia pentru site stă în landing-glg/src/lib/categories.ts;
 *  cele două tabele trebuie ținute la fel.
 * ============================================================
 */

/** Taxa de bază obișnuită, în lei (aceeași valoare ca FULL_LEI din payment-links). */
export const STANDARD_PRICE_LEI = 3500;

export interface CategoryDef {
  /** Textul scris în enrollment_requests.category și pe cererea tipărită. */
  key: string;
  /** „curs" = categorie de la zero; „trecere" = de la o categorie la alta. */
  kind: "curs" | "trecere";
  /** Are curs teoretic? Fără teorie cursantul NU intră în nicio grupă. */
  hasTheory: boolean;
  /** Se alege cutia de viteze? (doar la autoturism) */
  hasTransmission: boolean;
  /** Taxa de bază, în lei. */
  priceLei: number;
  /** Termenul de studii din contract, în luni. */
  months: number;
  /**
   * Taxa de bază se poate achita în două părți (taxa de înscriere 1/2, 500 lei,
   * apoi 2/2)? Patronul, 14.11.2026: „Doar la B pe bucăți”. La toate celelalte
   * categorii (și la A1, A2, A, care între 10.11 și 14.11 se puteau achita în două
   * părți) și la treceri taxa de bază se achită dintr-o dată.
   */
  installments: boolean;
  /**
   * Taxa de bază când categoria se face ÎMPREUNĂ cu B, C, CE sau D, în aceeași
   * înscriere (Ordinul de taxe din 01.09.2026: motocicleta, 1200 lei).
   */
  comboPriceLei?: number;
}

const curs = (key: string, months: number, extra: Partial<CategoryDef> = {}): CategoryDef => ({
  key, kind: "curs", hasTheory: true, hasTransmission: false, priceLei: STANDARD_PRICE_LEI, months, installments: false, ...extra,
});
const trecere = (key: string, extra: Partial<CategoryDef> = {}): CategoryDef => ({
  key, kind: "trecere", hasTheory: true, hasTransmission: false, priceLei: STANDARD_PRICE_LEI, months: 1, installments: false, ...extra,
});

/**
 * Tabelul categoriilor, în ordinea din selector.
 * Cutia de viteze se alege DOAR la autoturism (patronul: „la C, D, E, A nu este cutie").
 * Taxele de bază sunt cele din Ordinul de taxe din 01.09.2026 (Anexa 1) și din lista
 * „Posibilități de înscriere" trimisă de patron pe 13.11.2026:
 *   A1, A2, A = 3200 lei (1200 lei împreună cu B, C, CE sau D); B = 3500; C = 1800;
 *   CE = 1500; D = 1700;
 *   de la B la A2 sau A = 2000; în cadrul categoriei A (A1 la A2, A2 la A) = 2000
 *   (tot 1200 lei împreună cu B, C, CE sau D); de la A1, A2, A sau B1 la B = 2000;
 *   de la C1 la C = 1500; de la D1 la D = 1500.
 * „B la A1" rămâne 900 lei, fără teorie (confirmat de patron pe 10.11.2026; lista din
 * 13.11 numește la 2000 lei doar trecerile spre A2 și A).
 * În două părți (500 lei + restul) se achită doar B (din 14.11.2026; A1, A2, A dintr-o dată).
 */
export const CATEGORIES: readonly CategoryDef[] = [
  curs("A1", 3, { priceLei: 3200, comboPriceLei: 1200 }),
  curs("A2", 3, { priceLei: 3200, comboPriceLei: 1200 }),
  curs("A", 3, { priceLei: 3200, comboPriceLei: 1200 }),
  curs("B", 3, { hasTransmission: true, installments: true }),
  curs("C", 2, { priceLei: 1800 }),
  curs("CE", 1.5, { priceLei: 1500 }),
  curs("D", 2, { priceLei: 1700 }),
  trecere("B la A1", { hasTheory: false, priceLei: 900 }),
  trecere("B la A2", { priceLei: 2000, comboPriceLei: 1200 }),
  trecere("B la A", { priceLei: 2000, comboPriceLei: 1200 }),
  trecere("A1 la A2", { priceLei: 2000, comboPriceLei: 1200 }),
  trecere("A2 la A", { priceLei: 2000, comboPriceLei: 1200 }),
  trecere("A1 la B", { hasTransmission: true, priceLei: 2000 }),
  trecere("A2 la B", { hasTransmission: true, priceLei: 2000 }),
  trecere("A la B", { hasTransmission: true, priceLei: 2000 }),
  trecere("B1 la B", { hasTransmission: true, priceLei: 2000 }),
  trecere("C1 la C", { priceLei: 1500 }),
  trecere("D1 la D", { priceLei: 1500 }),
];

/**
 * Cele mai dese înscrieri la două categorii deodată (lista patronului, 13.11.2026,
 * punctele 6-9): prima categorie la taxa ei, a doua (A2 sau A) la 1200 lei.
 * Selectorul le arată ca alegeri rapide; în cerere rămân două categorii separate.
 */
export const CATEGORY_COMBOS: readonly (readonly [string, string])[] = [
  ["B", "A2"], ["B", "A"], ["C", "A2"], ["C", "A"], ["CE", "A2"], ["CE", "A"], ["D", "A"],
];

/** „B-A1", „b -> a1", „B → A1", „B LA A1" => „B LA A1" (forma de comparat). */
function norm(raw: string | null | undefined): string {
  return (raw ?? "")
    .toUpperCase()
    .replace(/[„”“"']/g, "")
    .replace(/\s*(->|→|=>)\s*/g, " LA ")
    .replace(/ *[-–—] */g, " LA ")
    .replace(/\s+/g, " ")
    .trim();
}

const BY_NORM = new Map(CATEGORIES.map((c) => [norm(c.key), c]));

/** Categoria din catalog pentru textul de pe cerere, oricum ar fi scris; null dacă nu e în catalog. */
export function findCategory(raw: string | null | undefined): CategoryDef | null {
  return BY_NORM.get(norm(raw)) ?? null;
}

/**
 * Parametrii categoriei de pe cerere. Textele vechi, din afara catalogului
 * („B la A/A2", „AM"…), primesc valorile obișnuite, cu cutia de viteze doar
 * dacă e vorba de autoturism (B).
 */
export function categoryDef(raw: string | null | undefined): CategoryDef {
  const found = findCategory(raw);
  if (found) return found;
  const n = norm(raw);
  const isTransition = / LA /.test(n);
  const target = isTransition ? n.split(" LA ").pop() ?? "" : n;
  return {
    key: (raw ?? "").trim(),
    kind: isTransition ? "trecere" : "curs",
    hasTheory: true,
    // Necunoscut sau gol = tratăm ca B (se cere cutia), ca până acum.
    hasTransmission: n === "" || /^B1?$/.test(target),
    priceLei: STANDARD_PRICE_LEI,
    months: isTransition ? 1 : 3,
    // Gol sau necunoscut scris ca B: în două părți, ca la B; orice altceva, dintr-o dată.
    installments: n === "" || n === "B",
  };
}

/** Taxa de bază se poate achita în două părți (500 lei + restul)? Doar B (din 14.11.2026). */
export function categoryAllowsInstallments(raw: string | null | undefined): boolean {
  return categoryDef(raw).installments;
}

/** Categoriile cu care motocicleta are taxa de bază redusă, dacă se fac în aceeași înscriere. */
const COMBO_WITH = new Set(["B", "C", "CE", "D"]);

/** Categoria la care se ajunge, cu majuscule: „B la A2" => „A2", „C" => „C". */
export function categoryTarget(raw: string | null | undefined): string {
  const n = norm(raw);
  return n.includes(" LA ") ? n.split(" LA ").pop() ?? "" : n;
}

/** Categoria de la care se pleacă la o trecere: „B la A2" => „B"; null la un curs de la zero. */
export function categoryFrom(raw: string | null | undefined): string | null {
  const n = norm(raw);
  return n.includes(" LA ") ? n.split(" LA ")[0] ?? null : null;
}

export type CategoryVehicle = "moto" | "auto" | "camion" | "remorca" | "autobuz";

/** Vehiculul categoriei (eticheta din selector). */
export function categoryVehicle(raw: string | null | undefined): CategoryVehicle {
  const t = categoryTarget(raw);
  if (t === "AM" || t === "A" || t === "A1" || t === "A2") return "moto";
  if (t === "CE" || t === "C1E") return "remorca";
  if (t === "C" || t === "C1") return "camion";
  if (t === "D" || t === "D1") return "autobuz";
  return "auto";
}

/**
 * Taxa de bază a categoriei într-o înscriere cu mai multe categorii: motocicleta
 * (A1, A2, A și trecerile spre A2 și A) costă 1200 lei când în aceeași înscriere se
 * face și B, C, CE sau D (de la zero sau prin trecere); altfel taxa din catalog.
 */
export function categoryPriceIn(raw: string | null | undefined, all: readonly (string | null | undefined)[]): number {
  const def = categoryDef(raw);
  if (def.comboPriceLei && all.some((o) => COMBO_WITH.has(categoryTarget(o)))) return def.comboPriceLei;
  return def.priceLei;
}

/** Perechile din selector, cu taxa fiecărei categorii din pereche. */
export function categoryCombos(): { first: CategoryDef; second: CategoryDef; firstLei: number; secondLei: number }[] {
  return CATEGORY_COMBOS.map(([a, b]) => ({
    first: categoryDef(a),
    second: categoryDef(b),
    firstLei: categoryPriceIn(a, [a, b]),
    secondLei: categoryPriceIn(b, [a, b]),
  }));
}

/** Opțiunile selectorului pe două grupe: categorii de la zero și treceri de categorie. */
export function categoryGroups(): { curs: CategoryDef[]; trecere: CategoryDef[] } {
  return { curs: CATEGORIES.filter((c) => c.kind === "curs"), trecere: CATEGORIES.filter((c) => c.kind === "trecere") };
}

/** Textul canonic al categoriei („B-A1" => „B la A1"); ce nu e în catalog rămâne cum a fost scris. */
export function canonicalCategory(raw: string | null | undefined): string {
  return findCategory(raw)?.key ?? (raw ?? "").trim();
}

/** Se alege cutia de viteze la categoria asta? */
export function categoryHasTransmission(raw: string | null | undefined): boolean {
  return categoryDef(raw).hasTransmission;
}

/** Are curs teoretic (deci grupă)? */
export function categoryHasTheory(raw: string | null | undefined): boolean {
  return categoryDef(raw).hasTheory;
}

/**
 * Opțiunile selectorului: catalogul, plus valoarea veche a cererii dacă nu
 * e în catalog (ca o cerere scrisă demult să nu-și piardă categoria).
 */
export function categoryOptions(current?: string | null): { value: string; label: string; legacy?: boolean }[] {
  const opts: { value: string; label: string; legacy?: boolean }[] = CATEGORIES.map((c) => ({ value: c.key, label: c.key }));
  const cur = (current ?? "").trim();
  if (cur && !findCategory(cur)) opts.push({ value: cur, label: cur, legacy: true });
  return opts;
}

/** Listă de categorii distincte (după forma canonică), fără goluri, în ordinea dată. */
export function distinctCategories(list: readonly (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const c = canonicalCategory(raw);
    if (!c) continue;
    const k = norm(c);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(c);
  }
  return out;
}
