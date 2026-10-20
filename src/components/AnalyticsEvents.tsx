"use client";

import { useEffect } from "react";
import { EV, track } from "@/lib/analytics";

/**
 * Evenimente globale de analiză: click pe orice număr de telefon (tel:) și
 * pe orice buton/link „Înscrie-te” (către /inscriere). Montat o dată, în layout.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track(EV.apelTelefon, { unde: location.pathname });
      else if (/^\/(ru\/)?inscriere/.test(href) && location.pathname.replace(/^\/ru/, "") !== "/inscriere") track(EV.clickInscrieTe, { unde: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
