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
  // conversii
  inscriereTrimisa: "inscriere-trimisa",
  inscriereEroare: "inscriere-eroare",
  apelTelefon: "apel-telefon",
  clickInscrieTe: "click-inscrie-te",
  // de unde vine
  dinAplicatie: "din-aplicatie",
  campanie: "campanie",
  // comportament
  click: "click",
  faqDeschisa: "faq-deschisa",
  videoStart: "video-start",
  linkExtern: "link-extern",
  scroll: "scroll",
  timpPePagina: "timp-pe-pagina",
  // formular
  formularInceput: "formular-inceput",
  formularSectiune: "formular-sectiune",
  formularEroare: "formular-eroare",
  /** A deschis contractul de studii (PDF) din formular. */
  contractVazut: "contract-vazut",
  /** A adăugat o poză a buletinului în formular (fata / verso). */
  pozaBuletin: "poza-buletin",
} as const;
