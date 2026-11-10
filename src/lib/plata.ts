/**
 * ==================================================================
 *  Achitarea și rezervarea locului în grupă
 * ==================================================================
 *  SINGURA sursă de pe site pentru sume, termen și linkurile de plată
 *  (coduri QR publice BNM MIA). Orice componentă care arată o sumă sau
 *  un buton de plată citește de aici, ca să nu existe două cifre
 *  diferite pe două pagini.
 *
 *  Regula patronului (31.10.2026), cu denumirile oficiale ale taxelor
 *  (2.11.2026): după trimiterea cererii omul are 24 de ore ca să achite
 *  taxa de înscriere 1/2, 500 lei (taxa de înscriere 2/2, 3000 lei, la
 *  sediu, până la prima lecție de teorie), sau taxa de bază, 3500 lei,
 *  dintr-o dată. Taxa de înscriere 1/2 + 2/2 = taxa de bază. Fără
 *  achitare în 24 de ore cererea nu mai ține locul în grupă.
 *
 *  Taxa de bază depinde de categorie (10.11.2026): în două părți (taxa de
 *  înscriere 1/2, 500 lei, apoi 2/2) se achită doar B și A1, A2, A; celelalte
 *  categorii și trecerile achită taxa de bază dintr-o dată. Fiecare taxă de
 *  bază are linkul ei, pe sumă; unde școala nu are link, plata se face la
 *  sediu. Vezi `PaymentPlan`, `localPaymentPlans` și `safePaymentPlans`.
 *
 *  Modul pur, fără React: poate fi folosit și pe server.
 * ==================================================================
 */

import type { Lang } from "./content";
import { categoryAllowsInstallments, categoryPriceIn, distinctCategories } from "./categories";

export const PLATA = {
  /** Taxa de înscriere 1/2, cea care rezervă locul în grupă. */
  reserve: 500,
  /** Taxa de înscriere 2/2, de achitat la sediu. */
  rest: 3000,
  /** Taxa de bază a pachetului Standard, categoria B. */
  full: 3500,
  /** Termenul de achitare, în ore, de la trimiterea cererii. */
  deadlineHours: 24,
  /** Codurile QR publice BNM MIA, generate de școală. */
  links: {
    reserve: "https://mia-qr.bnm.md/1/m/BNM/AGR5b7cc0fa59524357ba75248cb956aaff",
    full: "https://mia-qr.bnm.md/1/m/BNM/AGR10e421dd8fb1446fb5a4a5a3f3efe99d",
  },
} as const;

export type PaymentLinks = { reserve: string; full: string };

/** Termenul implicit: 24 de ore de acum (când aplicația nu trimite `paymentDueAt`). */
export function defaultPaymentDueAt(from: number = Date.now()): string {
  return new Date(from + PLATA.deadlineHours * 3_600_000).toISOString();
}

function httpsUrl(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return /^https:\/\/[^\s]+$/.test(s) ? s : null;
}

/**
 * Linkurile venite de la aplicație, verificate. Orice lipsă sau valoare
 * suspectă cade pe linkurile locale: ecranul de după trimitere e singura cale
 * sigură către plată, deci nu are voie să rămână fără butoane.
 */
export function safePaymentLinks(raw: unknown): PaymentLinks {
  const d = (typeof raw === "object" && raw !== null ? raw : {}) as {
    reserve?: unknown;
    full?: unknown;
  };
  return {
    reserve: httpsUrl(d.reserve) ?? PLATA.links.reserve,
    full: httpsUrl(d.full) ?? PLATA.links.full,
  };
}

/**
 * Linkurile pentru taxa de bază achitată dintr-o dată, pe SUMĂ: fiecare cod QR
 * MIA încasează o sumă fixă. COPIE a tabelului din aplicație
 * (practica-glg/lib/enrollment/payment-links.ts, FULL_LINK_BY_AMOUNT); cele
 * două trebuie ținute la fel.
 *   3500 lei: B · 3200 lei: A1, A2, A · 2000 lei: B la A2, B la A ·
 *   1800 lei: C · 1500 lei: D și CE · 1200 lei: A2 sau A împreună cu B, C, D, CE.
 */
const FULL_LINK_BY_AMOUNT: Record<number, string> = {
  [PLATA.full]: PLATA.links.full,
  3200: "https://mia-qr.bnm.md/1/m/BNM/AGR141d11bcb82c49f5911acdfd3e6abf27",
  2000: "https://mia-qr.bnm.md/1/m/BNM/AGR9f837accd3d0498294c9680fff7d86f4",
  1800: "https://mia-qr.bnm.md/1/m/BNM/AGRf2729bb805e04d558bd34a19102e1490",
  1500: "https://mia-qr.bnm.md/1/m/BNM/AGR10d092f5663e4438b76e665d6edfe6dd",
  1200: "https://mia-qr.bnm.md/1/m/BNM/AGRaf7b2a09c9454dc38b34350acffa1ba3",
};

/** Linkul de plată pentru taxa de bază de `amount` lei; null dacă școala nu are link pe suma asta. */
export function fullPaymentLink(amount: number): string | null {
  return FULL_LINK_BY_AMOUNT[amount] ?? null;
}

/**
 * Cum se achită taxa de bază a unei categorii din înscriere. Aceeași formă ca
 * în aplicație (practica-glg/lib/enrollment/payment-plan.ts), trimisă în
 * câmpul `payments` al răspunsului de la POST /api/inscriere.
 */
export interface PaymentPlan {
  /** Categoria, cum e scrisă pe cerere („B", „C", „B la A1"…). */
  category: string;
  /** Taxa de bază, în lei. */
  price: number;
  /** Se poate achita în două părți (500 lei + taxa de înscriere 2/2)? */
  installments: boolean;
  /** Linkul pentru taxa de înscriere 1/2 (500 lei); null când se achită dintr-o dată. */
  reserve: string | null;
  /** Linkul pentru taxa de bază întreagă; null dacă nu există link pe suma asta (plata la sediu). */
  full: string | null;
}

/** Formularul public are cel mult două categorii, deci cel mult două planuri. */
const MAX_PLANS = 2;

function localPlan(category: string, price: number): PaymentPlan {
  const installments = categoryAllowsInstallments(category) && PLATA.reserve < price;
  return {
    category,
    price,
    installments,
    reserve: installments ? PLATA.links.reserve : null,
    full: fullPaymentLink(price),
  };
}

/**
 * Planurile calculate LOCAL, din catalogul categoriilor și tabelul de linkuri
 * (aceeași regulă ca `paymentPlans` din aplicație, inclusiv taxa redusă la A2
 * și A împreună cu B, C, D sau CE). Folosite când răspunsul aplicației nu are
 * `payments` (aplicație mai veche) sau când acesta nu trece verificarea.
 */
export function localPaymentPlans(categories: readonly (string | null | undefined)[] = []): PaymentPlan[] {
  const cats = distinctCategories(categories).slice(0, MAX_PLANS);
  if (cats.length === 0) return [localPlan("", PLATA.full)];
  return cats.map((c) => localPlan(c, categoryPriceIn(c, cats)));
}

/** Gazda codurilor QR MIA ale BNM, cu tot cu schemă: singura acceptată în `payments`. */
const MIA_PAY_PREFIX = "https://mia-qr.bnm.md/";

/**
 * Un link de plată venit în `payments`: doar un cod QR MIA de pe gazda BNM
 * (aceeași gazdă ca linkurile locale). Butoanele de pe ecran duc omul la
 * plată, deci nu acceptăm un URL oarecare din răspuns.
 */
function miaPayUrl(v: unknown): string | null {
  const s = httpsUrl(v);
  if (!s || s.length > 300 || !s.startsWith(MIA_PAY_PREFIX)) return null;
  // După gazdă, doar segmente simple de cale: fără interogare, fragment sau alte caractere.
  const segments = s.slice(MIA_PAY_PREFIX.length).split("/");
  return segments.every((seg) => /^[A-Za-z0-9_.~%-]+$/.test(seg)) ? s : null;
}

/** Un plan din răspuns, verificat câmp cu câmp; null la orice abatere. */
function readPlan(raw: unknown): PaymentPlan | null {
  if (typeof raw !== "object" || raw === null) return null;
  const d = raw as {
    category?: unknown;
    price?: unknown;
    installments?: unknown;
    reserve?: unknown;
    full?: unknown;
  };
  if (typeof d.category !== "string" || d.category.trim().length > 40) return null;
  if (typeof d.price !== "number" || !Number.isInteger(d.price) || d.price <= 0 || d.price > 100_000) return null;
  if (typeof d.installments !== "boolean") return null;
  const reserve = d.reserve == null ? null : miaPayUrl(d.reserve);
  const full = d.full == null ? null : miaPayUrl(d.full);
  // Un link prezent, dar care nu trece verificarea, strică tot planul.
  if ((d.reserve != null && !reserve) || (d.full != null && !full)) return null;
  // În două părți doar cu link de 500 lei și cu o taxă de bază mai mare de 500.
  if (d.installments && (!reserve || d.price <= PLATA.reserve)) return null;
  return {
    category: d.category.trim(),
    price: d.price,
    installments: d.installments,
    reserve: d.installments ? reserve : null,
    full,
  };
}

/**
 * Planurile de plată venite de la aplicație (`payments`), verificate. Se
 * acceptă doar o listă de unul sau două planuri, toate bine formate și cu
 * linkuri de pe gazda BNM; altfel planurile se calculează local, din
 * categoriile alese în formular (`fallbackCategories`). Ecranul de după
 * trimitere nu are voie să rămână fără indicații de plată.
 */
export function safePaymentPlans(
  raw: unknown,
  fallbackCategories: readonly (string | null | undefined)[] = [],
): PaymentPlan[] {
  if (Array.isArray(raw) && raw.length >= 1 && raw.length <= MAX_PLANS) {
    const plans = raw.map(readPlan);
    if (plans.every((p): p is PaymentPlan => p !== null)) return plans;
  }
  return localPaymentPlans(fallbackCategories);
}

/**
 * Termenul venit de la aplicație, verificat: dată ISO validă, în viitor și la
 * cel mult 7 zile de acum. Altfel, 24 de ore de acum.
 */
export function safePaymentDueAt(raw: unknown, now: number = Date.now()): string {
  if (typeof raw === "string") {
    const t = Date.parse(raw);
    if (Number.isFinite(t) && t > now && t < now + 7 * 24 * 3_600_000) {
      return new Date(t).toISOString();
    }
  }
  return defaultPaymentDueAt(now);
}

const LOCALE: Record<Lang, string> = { ro: "ro-RO", ru: "ru-RU" };
/** Fusul orar al școlii: termenul se afișează mereu în ora Chișinăului. */
const TZ = "Europe/Chisinau";

/**
 * „marți, 3 noiembrie, ora 14:20” (RO) sau „вторник, 3 ноября, в 14:20” (RU).
 * `timeWord` vine din dicționar („ora” / „в”), ca textul să rămână în content.
 */
export function formatDueAt(iso: string, lang: Lang, timeWord: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const d = new Date(t);
  const day = new Intl.DateTimeFormat(LOCALE[lang], {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TZ,
  }).format(d);
  const hour = new Intl.DateTimeFormat(LOCALE[lang], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TZ,
  }).format(d);
  return `${day}, ${timeWord} ${hour}`;
}

/** Cât a mai rămas până la termen; `null` dacă termenul a trecut. */
export function remainingUntil(iso: string, now: number): { hours: number; minutes: number } | null {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  const minutes = Math.floor((t - now) / 60_000);
  if (minutes <= 0) return null;
  return { hours: Math.floor(minutes / 60), minutes: minutes % 60 };
}
