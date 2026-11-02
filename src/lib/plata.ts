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
 *  Modul pur, fără React: poate fi folosit și pe server.
 * ==================================================================
 */

import type { Lang } from "./content";

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
