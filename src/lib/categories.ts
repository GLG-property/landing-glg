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
   * apoi 2/2)? Patronul, 10.11.2026: doar la B și la A1, A2, A; la celelalte
   * categorii și la treceri taxa de bază se achită dintr-o dată.
   */
  installments: boolean;
  /**
   * Taxa de bază când categoria se face ÎMPREUNĂ cu B, C, D sau CE, în aceeași
   * înscriere (patronul, 10.11.2026: A2 și A, 1200 lei).
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
 * Cutia de viteze se alege DOAR la B (patronul: „la C, D, E, A nu este cutie").
 * Taxele de bază confirmate de patron pe 10.11.2026, odată cu linkurile de plată:
 * A1, A2, A = 3200 lei (A2 și A = 1200 lei împreună cu B, C, D sau CE); B = 3500;
 * C = 1800; D și CE = 1500; „B la A1" = 900 (fără teorie); „B la A2" și
 * „B la A" = 2000. Trecerile fără preț confirmat rămân pe 3500 până vin datele.
 * În două părți (500 lei + restul) se achită doar B și A1, A2, A.
 */
export const CATEGORIES: readonly CategoryDef[] = [
  curs("A1", 3, { priceLei: 3200, installments: true }),
  curs("A2", 3, { priceLei: 3200, installments: true, comboPriceLei: 1200 }),
  curs("A", 3, { priceLei: 3200, installments: true, comboPriceLei: 1200 }),
  curs("B", 3, { hasTransmission: true, installments: true }),
  curs("C", 2, { priceLei: 1800 }),
  curs("D", 2, { priceLei: 1500 }),
  curs("CE", 1.5, { priceLei: 1500 }),
  trecere("B la A1", { hasTheory: false, priceLei: 900 }),
  trecere("B la A2", { priceLei: 2000 }),
  trecere("B la A", { priceLei: 2000 }),
  trecere("A1 la A2"),
  trecere("A2 la A"),
  trecere("B1 la B", { hasTransmission: true }),
  trecere("C1 la C"),
  trecere("D1 la D"),
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

/** Taxa de bază se poate achita în două părți (500 lei + restul)? Doar B și A1, A2, A. */
export function categoryAllowsInstallments(raw: string | null | undefined): boolean {
  return categoryDef(raw).installments;
}

/** Categoriile cu care A2 și A au taxa de bază redusă, dacă se fac în aceeași înscriere. */
const COMBO_WITH = new Set(["B", "C", "D", "CE"]);

/**
 * Taxa de bază a categoriei într-o înscriere cu mai multe categorii: A2 și A
 * costă 1200 lei împreună cu B, C, D sau CE; altfel taxa din catalog.
 */
export function categoryPriceIn(raw: string | null | undefined, all: readonly (string | null | undefined)[]): number {
  const def = categoryDef(raw);
  if (def.comboPriceLei && all.some((o) => COMBO_WITH.has(norm(o)))) return def.comboPriceLei;
  return def.priceLei;
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
