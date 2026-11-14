/**
 * Logica pură a formularului de înscriere (fără React), validare,
 * construirea payload-ului pentru API și interpretarea răspunsului.
 * Ținută separat ca să poată fi testată izolat.
 */

import type { Lang } from "./content";
import {
  safePaymentDueAt,
  safePaymentLinks,
  safePaymentPlans,
  type PaymentLinks,
  type PaymentPlan,
} from "./plata";
import { isSelectable, optionsFor, type EnrollOptions } from "./schedule";
import { CATEGORIES, CATEGORY_COMBOS, categoryHasTheory, categoryHasTransmission } from "./categories";
import { isPhoneDigits, phoneDigits } from "./phoneInput";

/**
 * Endpoint-ul de înscriere, SAME-ORIGIN. Formularul postează aici, iar ruta
 * /api/inscriere de pe landing forwardează server-side la aplicația internă.
 * Domeniul aplicației nu mai apare în bundle-ul public.
 */
export const ENROLL_API = "/api/inscriere";

/** Categoriile din formularul oficial „CERERE - CONTRACT". */
export const enrollCategories: readonly string[] = CATEGORIES.map((c) => c.key);

/**
 * Două categorii împreună (13.11.2026): în lista primei categorii, perechile din
 * Ordinul de taxe apar ca o singură opțiune, cu valoarea „B+A2”. Alegerea ei
 * completează ambele câmpuri; spre aplicație pleacă tot două categorii.
 */
export function pairOptionValue(first: string, second: string): string {
  return first + "+" + second;
}

/** Perechea aleasă din listă; null dacă valoarea e o singură categorie. */
export function pairFromOption(value: string): readonly [string, string] | null {
  return CATEGORY_COMBOS.find(([a, b]) => pairOptionValue(a, b) === value) ?? null;
}

/** Categoriile alese în formular (una sau două), fără goluri. */
export function chosenCategories(v: Pick<EnrollValues, "category" | "category2">): string[] {
  return [v.category, v.category2].map((c) => c.trim()).filter((c) => c !== "");
}

/** Se alege cutia de viteze? Doar dacă măcar o categorie aleasă o are (la C, D, CE și moto nu). */
export function needsTransmission(v: Pick<EnrollValues, "category" | "category2">): boolean {
  return chosenCategories(v).some((c) => categoryHasTransmission(c));
}

/** Se alege grupa de teorie? Doar dacă măcar o categorie aleasă are curs teoretic. */
export function needsTheoryGroup(v: Pick<EnrollValues, "category" | "category2">): boolean {
  return chosenCategories(v).some((c) => categoryHasTheory(c));
}

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
  /** A doua categorie (opțional): aplicația creează două cereri, câte una pe categorie. "" = doar una. */
  category2: string;
  language: Lang;
  transmission: "" | "manual" | "automatic";
  location: string; // sediul (grupa de teorie)
  group_id: string; // grupa deschisă aleasă (opțiune publică), id opac
  slot: string; // cheia orei grupei (Slot.key), validă pentru sediu + limbă
  preferred_schedule: string; // altă preferință de orar, text liber opțional
  /** Sediul unde vrea lecțiile practice; poate fi altul decât cel de teorie. */
  practice_location: string;
  license_number: string;
  license_issued: string;
  /** Pozele buletinului ca data URL (jpeg comprimat sau pdf), vezi imageCompress.ts; "" = lipsă. */
  id_photo_front: string;
  id_photo_back: string;
  /** „Am citit și sunt de acord cu prevederile contractului de studii” (obligatoriu). */
  contract_read: boolean;
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
    category2: "",
    language: lang,
    transmission: "",
    location: "",
    slot: "",
    group_id: "",
    preferred_schedule: "",
    practice_location: "",
    license_number: "",
    license_issued: "",
    id_photo_front: "",
    id_photo_back: "",
    contract_read: false,
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
  | "contract"
  | "photoMissing"
  | "fileTooBig"
  | "fileType"
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
  // strada și numărul: opționale (cerința școlii, 22.10.2026) — la sate nu există mereu
  "id_series",
  "id_number",
  "id_issued_by",
  "id_issued_date",
  "referral",
  "category",
  // cutia de viteze: obligatorie doar la categoriile care o au (vezi validateEnroll)
  "location",
  "practice_location",
  // Telefonul unei rude / prieten / cunoscut: obligatoriu (cerința școlii, 22.10.2026).
  "phone_family",
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

export function validateEnroll(v: EnrollValues, options: EnrollOptions | null = null): EnrollErrors {
  const errors: EnrollErrors = {};

  for (const key of REQUIRED) {
    const value = v[key];
    if (typeof value === "string" && value.trim() === "") errors[key] = "required";
  }

  // Cutia de viteze se cere doar la autoturism; la C, D, CE și moto nu există alegerea.
  if (needsTransmission(v) && v.transmission === "") errors.transmission = "required";

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
  // Persoana de contact: numărul ei de telefon.
  if (!errors.phone_family) {
    const n = digitCount(v.phone_family);
    if (n < 8 || n > 15) errors.phone_family = "phone";
  }
  // Doar cifre, cel mult cu „+” în față (patronul, 14.11.2026). Lungimea rămâne liberă între limitele de mai sus.
  for (const key of ["phone", "phone_home", "phone_family"] as const) {
    if (errors[key]) continue;
    const value = v[key].trim();
    if (value !== "" && !isPhoneDigits(value)) errors[key] = "phone";
  }

  if (!errors.birth_date && !isValidPastDate(v.birth_date)) errors.birth_date = "date";
  if (!errors.id_issued_date && !isValidPastDate(v.id_issued_date)) {
    // data eliberării poate fi chiar azi, acceptăm și ziua curentă
    const today = new Date().toISOString().slice(0, 10);
    if (v.id_issued_date !== today) errors.id_issued_date = "date";
  }

  // Grupa de teorie: sediul trebuie să aibă grupe în limba aleasă, iar ora
  // trebuie să fie una din orarul fix al sediului pentru limba respectivă.
  // Grupa aleasă trebuie să fie una din opțiunile deschise la sediu, în limba
  // aleasă, și să NU fie plină (capacitate 30 RO / 15 RU).
  // Categoriile fără curs teoretic (ex. „B la A1”) nu au grupă de ales.
  if (v.location && options && needsTheoryGroup(v)) {
    const opts = optionsFor(options, v.location, v.language);
    const anyAtLocation = options.locations.find((l) => l.name === v.location)?.options.length ?? 0;
    if (v.language === "ru" && anyAtLocation > 0 && opts.length === 0) errors.location = "noRuGroup";
    if (v.group_id && !opts.some((o) => o.id === v.group_id && isSelectable(o))) errors.group_id = "required";
    if (!v.group_id && opts.length > 0) errors.group_id = "required";
  }

  // Poza buletinului: cel puțin fața (cerința patronului, 22.10.2026).
  if (v.id_photo_front.trim() === "") errors.id_photo_front = "photoMissing";

  if (v.contract_read !== true) errors.contract_read = "contract";
  if (v.consent !== true) errors.consent = "consent";

  return errors;
}

/**
 * Numele câmpurilor respinse de API -> cheia din EnrollValues (unde diferă).
 * Necunoscutele rămân cum sunt; componenta le ignoră dacă nu există în valori.
 */
export function apiFieldToKey(field: string): string {
  switch (field) {
    case "consent_gdpr":
      return "consent";
    case "id_photo_front_b64":
      return "id_photo_front";
    case "id_photo_back_b64":
      return "id_photo_back";
    default:
      return field;
  }
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
    v.address_street.trim() ? `str. ${v.address_street.trim()} ${v.address_number.trim()}`.trim() : v.address_number.trim() ? `nr. ${v.address_number.trim()}` : "",
    apartment ? `ap. ${apartment}` : "",
  ]
    .filter(Boolean)
    .join(", ")
    .slice(0, 300);

  return {
    first_name: v.first_name.trim(),
    last_name: v.last_name.trim(),
    phone: phoneDigits(v.phone),
    email: opt(v.email),
    idnp: v.idnp.trim(),
    birth_date: v.birth_date,
    address,
    id_document: `${v.id_series.trim()} ${v.id_number.trim()}`.trim().slice(0, 40),
    // fără pachete (22.10.2026): nu mai trimitem „package”
    package: undefined,
    transmission: needsTransmission(v) ? v.transmission || undefined : undefined,
    location: opt(v.location),
    slot: needsTheoryGroup(v) ? opt(v.slot) : undefined,
    group_id: needsTheoryGroup(v) ? opt(v.group_id) : undefined,
    // Orarul se alege doar din orarul fix (sediu + oră).
    preferred_schedule: undefined,
    // Locația lecțiilor practice se alege separat (teorie la Buiucani, practică
    // la Botanica sau invers); nealeasă, rămâne sediul de teorie.
    practice_location: opt(v.practice_location) ?? opt(v.location),
    language: v.language,
    consent_gdpr: v.consent,
    contract_read: v.contract_read,
    // Pozele buletinului (data URL base64; aplicația taie prefixul și verifică tipul/mărimea).
    id_photo_front_b64: opt(v.id_photo_front),
    id_photo_back_b64: opt(v.id_photo_back),

    category: opt(v.category),
    // A doua categorie, doar dacă e aleasă și diferită de prima (6.11.2026).
    category2: v.category2.trim() && v.category2.trim() !== v.category.trim() ? v.category2.trim() : undefined,
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
    phone_home: opt(phoneDigits(v.phone_home)),
    phone_family: opt(phoneDigits(v.phone_family)),
    license_number: opt(v.license_number),
    license_issued: opt(v.license_issued),
  };
}

/**
 * Ce trebuie achitat ca să se rezerve locul: termenul (ISO) și planul de plată
 * al fiecărei categorii alese (`plans`: taxa de bază, în câte părți se achită
 * și linkurile ei). Vine de la aplicație, dar e mereu completat local dacă
 * lipsește (vezi lib/plata.ts): ecranul de după trimitere nu are voie să
 * rămână fără indicații de plată. `links` (500 / 3500 lei) rămâne pentru
 * compatibilitate; ecranul citește `plans`.
 */
export type PaymentInfo = { dueAt: string; links: PaymentLinks; plans: PaymentPlan[] };

export type EnrollOutcome =
  | { kind: "ok"; payment: PaymentInfo }
  | { kind: "duplicate"; payment: PaymentInfo }
  | { kind: "invalid"; fields: string[] }
  | { kind: "captcha" }
  | { kind: "rate_limited" }
  | { kind: "error" };

/**
 * Interpretează corpul JSON al răspunsului (sau null la corp ilizibil).
 * `categories` = categoriile alese în formular: din ele se calculează local
 * planurile de plată când răspunsul nu are `payments` (aplicație mai veche).
 */
export function interpretEnrollResponse(
  data: unknown,
  categories: readonly string[] = [],
): EnrollOutcome {
  if (typeof data === "object" && data !== null) {
    const d = data as {
      ok?: unknown;
      duplicate?: unknown;
      error?: unknown;
      fields?: unknown;
      paymentDueAt?: unknown;
      links?: unknown;
      payments?: unknown;
    };
    if (d.ok === true) {
      // Numele câmpurilor sunt cele convenite cu aplicația (`paymentDueAt`,
      // `links.reserve`, `links.full`, `payments`); dacă lipsesc (aplicație
      // mai veche), folosim linkurile locale, planurile calculate din
      // categoriile alese și termenul de 24 de ore de acum.
      const payment: PaymentInfo = {
        dueAt: safePaymentDueAt(d.paymentDueAt),
        links: safePaymentLinks(d.links),
        plans: safePaymentPlans(d.payments, categories),
      };
      return d.duplicate === true ? { kind: "duplicate", payment } : { kind: "ok", payment };
    }
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
