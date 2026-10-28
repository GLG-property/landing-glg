"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";
import {
  CONSENT_CHANGE_EVENT,
  readCookieConsent,
  writeCookieConsent,
} from "@/components/CookieConsent";

/**
 * Harta Google a unui sediu, cu ACELAȘI mecanism de consimțământ ca secțiunea
 * de contact a paginii principale (src/components/Contact.tsx): se încarcă doar
 * după acordul pentru media externe, iar textele vin din content.ts.
 */

// hl aliniază limba interfeței hărții cu limba paginii.
const mapEmbedUrl = (query: string, lang: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=${lang}`;

export function LocalMap({ query, title, note }: { query: string; title: string; note: string }) {
  const { t, lang } = useI18n();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readCookieConsent()?.media === true);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        {allowed ? (
          <iframe
            src={mapEmbedUrl(query, lang)}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[300px] w-full border-0 sm:h-[380px]"
          />
        ) : (
          <div className="flex h-[300px] w-full flex-col items-center justify-center gap-4 px-8 text-center sm:h-[380px]">
            <MapPin className="size-5 text-faint" strokeWidth={1.5} />
            <p className="max-w-sm text-sm text-muted">{t.contact.mapConsentText}</p>
            <button
              onClick={() => writeCookieConsent({ media: true })}
              className="btn-3d-light inline-flex h-10 items-center justify-center rounded-[10px] px-5 text-sm font-medium text-ink transition-colors duration-200"
            >
              {t.contact.mapConsentCta}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-faint">{note}</p>
    </div>
  );
}
