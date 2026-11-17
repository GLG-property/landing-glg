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
 * Nimic nu se taie la scriere sau la lipire: un număr tăiat în tăcere e un număr greșit fără
 * nicio eroare. Greșeala se arată la trimitere, pe câmp.
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
