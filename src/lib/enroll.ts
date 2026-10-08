/**
 * Logica pură a formularului de înscriere (fără React), validare,
 * construirea payload-ului pentru API și interpretarea răspunsului.
 * Ținută separat ca să poată fi testată izolat.
 */

import type { Lang } from "./content";
import { slotsFor } from "./schedule";

/**
 * Endpoint-ul de înscriere, SAME-ORIGIN. Formularul postează aici, iar ruta
 * /api/inscriere de pe landing forwardează server-side la aplicația internă.
 * Domeniul aplicației nu mai apare în bundle-ul public.
 */
export const ENROLL_API = "/api/inscriere";

/** Categoriile din formularul oficial „CERERE - CONTRACT". */
export const enrollCategories = [
  "A1",
  "A2",
  "A",
  "B",
  "C",
  "D",
  "CE",
  "B la A/A2",
  "A1 la A2",
  "A2 la A",
  "B1 la B",
  "C1 la C",
  "D1 la D",
] as const;

export type EnrollValues = {
  last_name: string;
  first_name: string;
  citizenship: string;
  idnp: string;
  birth_date: string; // YYYY-MM-DD (input type="date")
  sex: "" | "M" | "F";
  email: string;
  phone: string; // mobil, obligatoriu
  phone_home: string;
  phone_family: string;
  address_raion: string;
  address_locality: string;
  address_street: string;
  address_number: string;
  address_apartment: string;
  id_series: string;
  id_number: string;
  id_issued_by: string;
  id_issued_date: string; // YYYY-MM-DD
  workplace: string;
  referral: "" | "recomandare" | "retele_sociale";
  category: string;
  language: Lang;
  transmission: "" | "manual" | "automatic";
  location: string; // sediul grupei de teorie, unul din LOCATION_SCHEDULES
  slot: string; // cheia orei grupei (Slot.key), validă pentru sediu + limbă
  preferred_schedule: string; // altă preferință de orar, text liber opțional
  practice_location: string;
  license_number: string;
  license_issued: string;
  consent: boolean;
};

export function emptyEnrollValues(lang: Lang): EnrollValues {
  return {
    last_name: "",
    first_name: "",
    citizenship: "",
    idnp: "",
    birth_date: "",
    sex: "",
    email: "",
    phone: "",
    phone_home: "",
    phone_family: "",
    address_raion: "",
    address_locality: "",
    address_street: "",
    address_number: "",
    address_apartment: "",
    id_series: "",
    id_number: "",
    id_issued_by: "",
    id_issued_date: "",
    workplace: "",
    referral: "",
    category: "B",
    language: lang,
    transmission: "",
    location: "",
    slot: "",
    preferred_schedule: "",
    practice_location: "",
    license_number: "",
    license_issued: "",
    consent: false,
  };
}

/** Coduri de eroare, componenta le mapează pe mesajele din dicționar. */
export type EnrollErrorCode =
  | "required"
  | "idnp"
  | "email"
  | "phone"
  | "date"
  | "consent"
  | "checkField"
  | "noRuGroup";

export type EnrollErrors = Partial<Record<keyof EnrollValues, EnrollErrorCode>>;

const REQUIRED: (keyof EnrollValues)[] = [
  "last_name",
  "first_name",
  "citizenship",
  "idnp",
  "birth_date",
  "sex",
  "email",
  "phone",
  "address_raion",
  "address_locality",
  "address_street",
  "address_number",
  "id_series",
  "id_number",
  "id_issued_by",
  "id_issued_date",
  "referral",
  "category",
  "transmission",
  "location",
  "slot",
  "practice_location",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitCount(v: string): number {
  return v.replace(/\D/g, "").length;
}

/** Aceeași regulă ca pe server: dată ISO validă, în trecut, după 1900. */
function isValidPastDate(v: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const t = new Date(v + "T00:00:00Z").getTime();
  return Number.isFinite(t) && t < Date.now() && v >= "1900-01-01";
}

export function validateEnroll(v: EnrollValues): EnrollErrors {
  const errors: EnrollErrors = {};

  for (const key of REQUIRED) {
    const value = v[key];
    if (typeof value === "string" && value.trim() === "") errors[key] = "required";
  }

  if (!errors.idnp && !/^\d{13}$/.test(v.idnp.trim())) errors.idnp = "idnp";
  if (!errors.email && !EMAIL_RE.test(v.email.trim())) errors.email = "email";

  // Mobil: 8-15 cifre după eliminarea separatoarelor (regula serverului).
  if (!errors.phone) {
    const n = digitCount(v.phone);
    if (n < 8 || n > 15) errors.phone = "phone";
  }
  // Telefonul de domiciliu e opțional, dar dacă e completat trebuie să arate a telefon.
  if (v.phone_home.trim() !== "") {
    const n = digitCount(v.phone_home);
    if (n < 5 || n > 15) errors.phone_home = "phone";
  }

  if (!errors.birth_date && !isValidPastDate(v.birth_date)) errors.birth_date = "date";
  if (!errors.id_issued_date && !isValidPastDate(v.id_issued_date)) {
    // data eliberării poate fi chiar azi, acceptăm și ziua curentă
    const today = new Date().toISOString().slice(0, 10);
    if (v.id_issued_date !== today) errors.id_issued_date = "date";
  }

  // Grupa de teorie: sediul trebuie să aibă grupe în limba aleasă, iar ora
  // trebuie să fie una din orarul fix al sediului pentru limba respectivă.
  if (v.location) {
    const slots = slotsFor(v.location, v.language);
    if (v.language === "ru" && slots.length === 0) errors.location = "noRuGroup";
    if (v.slot && !slots.some((s) => s.key === v.slot)) errors.slot = "required";
  }

  if (v.consent !== true) errors.consent = "consent";

  return errors;
}

/** Șir opțional: gol => omis din payload (JSON.stringify sare peste undefined). */
function opt(s: string): string | undefined {
  const t = s.trim();
  return t === "" ? undefined : t;
}

/**
 * Payload-ul JSON pentru POST /api/inscriere. Trimite atât câmpurile granulare
 * din „CERERE - CONTRACT", cât și `address`/`id_document` agregate (compatibile
 * cu varianta mai veche a endpoint-ului; `id_document` are limită de 40 de
 * caractere acolo, deci rămâne doar seria + numărul).
 */
export function buildEnrollPayload(v: EnrollValues): Record<string, unknown> {
  const apartment = v.address_apartment.trim();
  const address = [
    v.address_raion.trim(),
    v.address_locality.trim(),
    `str. ${v.address_street.trim()} ${v.address_number.trim()}`.trim(),
    apartment ? `ap. ${apartment}` : "",
  ]
    .filter(Boolean)
    .join(", ")
    .slice(0, 300);

  return {
    first_name: v.first_name.trim(),
    last_name: v.last_name.trim(),
    phone: v.phone.trim(),
    email: opt(v.email),
    idnp: v.idnp.trim(),
    birth_date: v.birth_date,
    address,
    id_document: `${v.id_series.trim()} ${v.id_number.trim()}`.trim().slice(0, 40),
    package: "Standard",
    transmission: v.transmission || undefined,
    location: opt(v.location),
    slot: opt(v.slot),
    preferred_schedule: opt(v.preferred_schedule),
    practice_location: opt(v.practice_location),
    language: v.language,
    consent_gdpr: v.consent,

    category: opt(v.category),
    citizenship: opt(v.citizenship),
    sex: v.sex || undefined,
    address_raion: opt(v.address_raion),
    address_locality: opt(v.address_locality),
    address_street: opt(v.address_street),
    address_number: opt(v.address_number),
    address_apartment: opt(v.address_apartment),
    id_series: opt(v.id_series),
    id_number: opt(v.id_number),
    id_issued_by: opt(v.id_issued_by),
    id_issued_date: opt(v.id_issued_date),
    workplace: opt(v.workplace),
    referral: v.referral || undefined,
    phone_home: opt(v.phone_home),
    phone_family: opt(v.phone_family),
    license_number: opt(v.license_number),
    license_issued: opt(v.license_issued),
  };
}

export type EnrollOutcome =
  | { kind: "ok" }
  | { kind: "duplicate" }
  | { kind: "invalid"; fields: string[] }
  | { kind: "captcha" }
  | { kind: "rate_limited" }
  | { kind: "error" };

/** Interpretează corpul JSON al răspunsului (sau null la corp ilizibil). */
export function interpretEnrollResponse(data: unknown): EnrollOutcome {
  if (typeof data === "object" && data !== null) {
    const d = data as { ok?: unknown; duplicate?: unknown; error?: unknown; fields?: unknown };
    if (d.ok === true) return d.duplicate === true ? { kind: "duplicate" } : { kind: "ok" };
    if (d.error === "invalid") {
      const fields = Array.isArray(d.fields)
        ? d.fields.filter((f): f is string => typeof f === "string")
        : [];
      return { kind: "invalid", fields };
    }
    if (d.error === "captcha") return { kind: "captcha" };
    if (d.error === "rate_limited") return { kind: "rate_limited" };
  }
  return { kind: "error" };
}
