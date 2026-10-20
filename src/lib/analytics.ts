/**
 * Evenimente de analiză (Umami). Scriptul de urmărire e încărcat în layout
 * (prin /u/script.js, proxy intern către Umami); aici doar trimitem
 * evenimente cu nume stabile, ca să apară clar în Admin → Site.
 */
declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number | boolean>) => void };
  }
}

export function track(event: string, data?: Record<string, string | number | boolean>): void {
  try {
    window.umami?.track(event, data);
  } catch {
    /* analiza nu are voie să strice site-ul */
  }
}

/** Numele evenimentelor (aceleași etichete apar în panoul de admin). */
export const EV = {
  inscriereTrimisa: "inscriere-trimisa",
  inscriereEroare: "inscriere-eroare",
  apelTelefon: "apel-telefon",
  clickInscrieTe: "click-inscrie-te",
} as const;
