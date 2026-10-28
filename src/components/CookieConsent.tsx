"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";

/* ---------- starea consimtamantului, partajata prin localStorage + eveniment ---------- */

const CONSENT_KEY = "glg-cookie-consent";
export const CONSENT_CHANGE_EVENT = "glg-consent-change";
export const OPEN_PREFS_EVENT = "glg-open-cookie-prefs";

export type CookieConsentValue = { media: boolean };

let memoryConsent: CookieConsentValue | null = null;

export function readCookieConsent(): CookieConsentValue | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { media?: unknown };
      return { media: parsed.media === true };
    }
  } catch {
    /* storage indisponibil, ramane valoarea din memorie */
  }
  return memoryConsent;
}

export function writeCookieConsent(value: CookieConsentValue) {
  memoryConsent = value;
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* privacy mode, alegerea nu va persista */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));
}

export function openCookiePrefs() {
  window.dispatchEvent(new CustomEvent(OPEN_PREFS_EVENT));
}

/* ---------- bannerul ---------- */

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}
const readUndecided = () => readCookieConsent() === null;
// Pe server (și la hidratare) bannerul e ascuns; apare imediat după, dacă nu există o alegere.
const serverUndecided = () => false;

/**
 * Banda de consimțământ: UN rând pe desktop, maximum două pe mobil (auditul
 * RAP-CVFM6G: fereastra veche ocupa jumătate din ecranul telefonului).
 *
 * `aboveBar` o ridică deasupra barei fixe de acțiune de pe telefon (vezi
 * MobileActionBar); se pasează din paginile care montează bara.
 */
export function CookieConsent({ aboveBar = false }: { aboveBar?: boolean }) {
  const { t } = useI18n();
  const c = t.cookies;
  // „nedecis" vine din stocare, prin useSyncExternalStore (fără setState în efect)
  const undecided = useSyncExternalStore(subscribeConsent, readUndecided, serverUndecided);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [media, setMedia] = useState(false);
  const visible = undecided || forcedOpen;

  useEffect(() => {
    const onOpen = () => {
      setMedia(readCookieConsent()?.media === true);
      setShowPrefs(true);
      setForcedOpen(true);
    };
    window.addEventListener(OPEN_PREFS_EVENT, onOpen);
    // alegerea facuta din alta parte (ex. butonul de harta) inchide bannerul
    const onChange = () => {
      setForcedOpen(false);
      setShowPrefs(false);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener(OPEN_PREFS_EVENT, onOpen);
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    };
  }, []);

  if (!visible) return null;

  const decide = (value: CookieConsentValue) => {
    writeCookieConsent(value);
    setForcedOpen(false);
    setShowPrefs(false);
  };

  return (
    <div
      role="dialog"
      aria-label={c.title}
      className={clsx(
        "animate-rise fixed inset-x-0 z-50 border-t border-line bg-white/95 backdrop-blur",
        // Pe mobil stă deasupra barei fixe de acțiune; pe desktop, lipită jos.
        aboveBar ? "bottom-[calc(4.25rem+env(safe-area-inset-bottom))] md:bottom-0" : "bottom-0"
      )}
    >
      <Container className="flex flex-col gap-2 py-2.5 md:flex-row md:items-center md:justify-between md:gap-5 md:py-3">
        <p className="text-[13px] leading-snug text-muted">
          {c.short}{" "}
          <Link
            href="/confidentialitate"
            aria-label={c.policyLabel}
            className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
          >
            {c.more}
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          {showPrefs ? (
            <button
              onClick={() => decide({ media })}
              className="btn-3d inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-[13px] font-medium text-white transition-colors duration-200 md:flex-none"
            >
              {c.save}
            </button>
          ) : (
            <button
              onClick={() => decide({ media: true })}
              className="btn-3d inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-[13px] font-medium text-white transition-colors duration-200 md:flex-none"
            >
              {c.accept}
            </button>
          )}
          <button
            onClick={() => decide({ media: false })}
            className="btn-3d-light inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-[13px] font-medium text-ink transition-colors duration-200 md:flex-none"
          >
            {c.necessaryOnly}
          </button>
          {!showPrefs ? (
            <button
              onClick={() => setShowPrefs(true)}
              className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap px-1 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {c.prefs}
            </button>
          ) : null}
        </div>
      </Container>

      {/* Preferințele apar doar la cerere, tot în bandă (nu peste tot ecranul). */}
      {showPrefs ? (
        <Container className="flex flex-col gap-2 border-t border-line py-3">
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              checked
              disabled
              className="mt-0.5 size-4 shrink-0 accent-brand opacity-60"
            />
            <span className="text-[13px] leading-snug text-muted">
              <span className="font-medium text-ink">{c.categories.necessary.label}</span>
              {" "}{c.categories.necessary.desc}
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={media}
              onChange={(ev) => setMedia(ev.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-brand"
            />
            <span className="text-[13px] leading-snug text-muted">
              <span className="font-medium text-ink">{c.categories.media.label}</span>
              {" "}{c.categories.media.desc}
            </span>
          </label>
        </Container>
      ) : null}
    </div>
  );
}
