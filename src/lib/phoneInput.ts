/**
 * Câmpurile de telefon din cereri și de pe site primesc DOAR cifre
 * (patronul, 14.11.2026: „La câmpurile de telefon să nu se poată de pus litere. Doar cifre”).
 * „+” e păstrat, dar numai ca prim semn, pentru numerele scrise cu prefixul țării.
 *
 * Lungimea: regula din 14.11.2026 (lungime liberă, de la 8 la 15 cifre) a fost ÎNLOCUITĂ pe
 * 17.11.2026, la cererea secretarului de la Botanica trimisă mai departe de patron („Pune
 * obligatoriu aici 9 cifre”, fiindcă cursanții scapă o cifră sau scriu una în plus). Mobilul
 * și telefonul unei rude au acum exact 9 cifre cu 0 în față: vezi isRequestPhone. Telefonul
 * fix rămâne la 5 până la 15 cifre.
 *
 * Limita la scriere (18.11.2026): hotărârea din 17.11 („nimic nu se oprește la scriere, greșeala
 * se arată la trimitere”) a fost SCHIMBATĂ după ce patronul a retrimis poza secretarului cu 19
 * cifre scrise în câmpul „Telefon”. Câmpul de mobil și cel al unei rude nu mai primesc nimic
 * peste lungimea maximă: vezi phoneMaxLength și phoneTyped. Cifra în plus nu intră. Un număr
 * lipit prea lung tot NU se taie în tăcere: câmpul rămâne cum era, iar indiciul de sub el spune
 * de ce (phonePasteRejected). Sub câmp stă un indiciu viu („6 din 9 cifre”): vezi phoneHint.
 * Regula de la trimitere (isRequestPhone) a rămas aceeași; datele vechi nu sunt atinse, iar un
 * număr vechi mai lung decât limita se poate scurta, fiindcă ștergerea e primită mereu.
 *
 * Modul PUR, cu o copie identică în landing (src/lib/phoneInput.ts); testul
 * scripts/chk/telefon-cifre.mts cade dacă cele două copii diferă.
 */

/** Ce rămâne din textul scris sau lipit într-un câmp de telefon: cifrele și „+” de la început. */
export function phoneDigits(raw: string | null | undefined): string {
  const s = String(raw ?? "").trim();
  return (s.startsWith("+") ? "+" : "") + s.replace(/[^0-9]/g, "");
}

/** Textul e un număr curat: doar cifre, cel mult cu „+” în față. */
export function isPhoneDigits(raw: string | null | undefined): boolean {
  return /^[+]?[0-9]+$/.test(String(raw ?? "").trim());
}

/**
 * Regula telefonului din cerere, la sediu și pe site (mobilul și telefonul unei rude), din 17.11.2026:
 *  - fără „+” în față: exact 9 cifre și prima e 0 (069123456). 8 cifre fără 0, 10 cifre sau
 *    „373…” fără plus sunt greșite;
 *  - cu „+373”: exact 8 cifre după prefix (+37369123456). „+3730…” e greșit: după prefixul
 *    țării numărul nu mai începe cu 0;
 *  - cu „+” și alt prefix de țară: liber, de la 8 la 15 cifre.
 * Textul trebuie să fie deja curat (doar cifre, cel mult cu „+” în față); altfel răspunsul e „nu”.
 */
export function isRequestPhone(raw: string | null | undefined): boolean {
  const value = String(raw ?? "").trim();
  if (!isPhoneDigits(value)) return false;
  if (!value.startsWith("+")) return value.length === 9 && value.startsWith("0");
  const digits = value.slice(1);
  if (digits.startsWith("373")) return digits.length === 11 && digits[3] !== "0";
  return digits.length >= 8 && digits.length <= 15;
}

/**
 * Cheia de comparare a două numere: doar cifrele, fără prefixul țării (373 sau 00373) și
 * fără 0 din față, ca „069123456”, „69123456”, „37369123456” și „+37369123456” să fie
 * același număr. Numerele din alte țări rămân cu toate cifrele lor.
 */
export function phoneCompareKey(raw: string | null | undefined): string {
  let d = String(raw ?? "").replace(/[^0-9]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("373") && d.length >= 11) d = d.slice(3);
  if (d.startsWith("0") && d.length === 9) d = d.slice(1);
  return d;
}

/**
 * Cele două câmpuri au același număr (17.11.2026: telefonul unei rude nu poate fi mobilul
 * cursantului, școala sună ruda când cursantul nu răspunde). Un câmp gol nu e „același”.
 */
export function samePhone(a: string | null | undefined, b: string | null | undefined): boolean {
  const key = phoneCompareKey(a);
  return key !== "" && key === phoneCompareKey(b);
}

/**
 * Lungimea maximă a textului dintr-un câmp de mobil sau de telefon al unei rude, cu „+” cu tot
 * (18.11.2026):
 *  - fără „+”: 9 cifre;
 *  - cu „+373”: prefixul și 8 cifre, adică 12 semne;
 *  - cu „+” și alt prefix de țară: 15 cifre, adică 16 semne. „+3” și „+37” pot deveni „+373”,
 *    deci până se lămurește prefixul rămâne limita largă.
 */
export function phoneMaxLength(raw: string | null | undefined): number {
  const value = phoneDigits(raw);
  if (!value.startsWith("+")) return 9;
  return value.startsWith("+373") ? 12 : 16;
}

/**
 * Textul scris sau lipit trece de lungimea maximă și nu e primit. Ștergerea e primită mereu:
 * un număr vechi, mai lung decât limita, trebuie să poată fi scurtat cifră cu cifră.
 */
export function phoneTooLong(prev: string | null | undefined, raw: string | null | undefined): boolean {
  const next = phoneDigits(raw);
  return next.length > phoneMaxLength(next) && next.length >= phoneDigits(prev).length;
}

/**
 * Ce ajunge în câmp la fiecare schimbare (scriere, lipire, ștergere): textul curățat, dacă
 * încape; altfel câmpul rămâne cum era. Cifra în plus pur și simplu nu intră, iar un număr
 * lipit prea lung NU e tăiat: un număr tăiat în tăcere e un număr greșit fără nicio eroare.
 */
export function phoneTyped(prev: string | null | undefined, raw: string | null | undefined): string {
  return phoneTooLong(prev, raw) ? String(prev ?? "") : phoneDigits(raw);
}

/**
 * Câte cifre avea numărul LIPIT care n-a fost primit (0 = nimic de spus). O singură cifră în
 * plus, scrisă de la tastatură, nu cere explicație; un număr întreg lipit, da: indiciul de sub
 * câmp spune de ce a rămas câmpul neschimbat.
 */
export function phonePasteRejected(prev: string | null | undefined, raw: string | null | undefined): number {
  if (!phoneTooLong(prev, raw)) return 0;
  const next = phoneDigits(raw);
  if (next.length - phoneDigits(prev).length < 2) return 0;
  return next.startsWith("+") ? next.length - 1 : next.length;
}

/**
 * Indiciul de sub câmp, viu, la fiecare cifră:
 *  - empty: câmp gol;
 *  - progress: „6 din 9 cifre” (sau din 8, după „+373”);
 *  - noZero: numărul fără „+” nu începe cu 0;
 *  - extraZero: după „+373” numărul e scris cu 0;
 *  - foreign: alt prefix de țară, încă sub 8 cifre;
 *  - ok: numărul trece regula de la trimitere (isRequestPhone);
 *  - long: prea multe cifre (doar la datele vechi, scrise înainte de limită).
 */
export type PhoneHintKind = "empty" | "progress" | "noZero" | "extraZero" | "foreign" | "ok" | "long";

export interface PhoneHint {
  kind: PhoneHintKind;
  /** Cifrele scrise; la „+373” fără prefixul țării. */
  have: number;
  /** Cifrele cerute: 9, sau 8 după „+373”; la alt prefix de țară cel mult 15. */
  need: number;
  /** Numărul trece regula de la trimitere. */
  valid: boolean;
  /** Câmpul e plin: nu mai intră nicio cifră. */
  full: boolean;
}

export function phoneHint(raw: string | null | undefined): PhoneHint {
  const value = phoneDigits(raw);
  const valid = isRequestPhone(value);
  const full = value.length >= phoneMaxLength(value);
  const make = (kind: PhoneHintKind, have: number, need: number): PhoneHint => ({ kind, have, need, valid, full });
  if (value === "") return make("empty", 0, 9);
  if (!value.startsWith("+")) {
    if (!value.startsWith("0")) return make("noZero", value.length, 9);
    if (value.length > 9) return make("long", value.length, 9);
    return make(value.length === 9 ? "ok" : "progress", value.length, 9);
  }
  const digits = value.slice(1);
  if (digits.startsWith("373")) {
    const have = digits.length - 3;
    if (digits[3] === "0") return make("extraZero", have, 8);
    if (have > 8) return make("long", have, 8);
    return make(have === 8 ? "ok" : "progress", have, 8);
  }
  if (digits.length > 15) return make("long", digits.length, 15);
  return make(digits.length >= 8 ? "ok" : "foreign", digits.length, 15);
}

/**
 * Indiciul se face roșu doar când numărul e greșit ȘI câmpul a fost părăsit sau e deja plin.
 * Cât omul încă scrie, indiciul rămâne liniștit.
 */
export function phoneHintIsError(hint: PhoneHint, left: boolean): boolean {
  return hint.kind !== "empty" && !hint.valid && (left || hint.full);
}
