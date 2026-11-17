/**
 * Câmpurile de telefon din cereri și de pe site primesc DOAR cifre
 * (patronul, 14.11.2026: „La câmpurile de telefon să nu se poată de pus litere. Doar cifre”).
 * Lungimea nu e fixă: regula de 8–15 cifre (5–15 la telefonul fix) rămâne la validare,
 * ca să încapă și numerele scrise cu prefixul țării. De aceea „+” e păstrat, dar numai
 * ca prim semn.
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
