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
