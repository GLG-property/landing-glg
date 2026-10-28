"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { useMessengers } from "./messengers";

/**
 * Bara fixă de acțiune de pe telefon: „Sună”, WhatsApp (și Telegram, dacă
 * școala are cont) și „Înscrie-te”. Rezolvă observația auditului
 * (RAP-CVFM6G): pe telefon nu se vedea niciun buton de înscriere.
 *
 * Detalii care contează:
 *  - doar mobil (`md:hidden`): pe desktop rămâne butonul plutitor;
 *  - respectă `env(safe-area-inset-bottom)` (bara de jos a iPhone-ului);
 *  - randează și un distanțier în flux, ca bara să nu acopere finalul paginii
 *    (subsolul, butonul de trimitere al formularului);
 *  - banda de cookie-uri stă deasupra ei (vezi CookieConsent, `aboveBar`).
 *
 * `showEnroll={false}` pe /inscriere: acolo omul e deja în formular, deci
 * rămân doar „Sună” și mesageria.
 */
export function MobileActionBar({ showEnroll = true }: { showEnroll?: boolean }) {
  const { t } = useI18n();
  const bar = t.messengers.bar;
  const links = useMessengers("bara-mobil");

  return (
    <>
      {/* Distanțier: aceeași înălțime ca bara, doar pe mobil. */}
      <div
        aria-hidden
        className="md:hidden"
        style={{ height: "calc(4.25rem + env(safe-area-inset-bottom))" }}
      />

      {/* `data-section` dă zona evenimentelor globale de analiză (vezi
          AnalyticsEvents): apel telefonic și „Înscrie-te” se numără deja
          acolo, nu le mai trimitem a doua oară din buton. */}
      <div
        data-section="bara-mobil"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch gap-2 px-3 py-2">
          <a
            href={site.phoneHref}
            className="btn-3d-light flex flex-1 flex-col items-center justify-center gap-1 rounded-[10px] py-2 text-[13px] font-medium text-ink transition-colors duration-200"
          >
            <Phone className="size-4 text-muted" strokeWidth={1.5} />
            {bar.call}
          </a>

          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={l.onClick}
              className="btn-3d-light flex flex-1 flex-col items-center justify-center gap-1 rounded-[10px] py-2 text-[13px] font-medium text-ink transition-colors duration-200"
            >
              <l.Icon className="size-4 text-muted" />
              {l.label}
            </a>
          ))}

          {showEnroll ? (
            <Link
              href={t.nav.cta.href}
              className="btn-3d flex flex-1 flex-col items-center justify-center gap-1 rounded-[10px] py-2 text-[13px] font-medium text-white transition-colors duration-200"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
              {bar.enroll}
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
