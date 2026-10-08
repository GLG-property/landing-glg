"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "./LanguageProvider";

const KEY = "glg-voucher-banner-dismissed";
const DISMISS_EVENT = "glg-banner-dismiss";

/** In-memory fallback so dismissal still works when storage is blocked. */
let memoryDismissed = false;

function subscribe(onChange: () => void) {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
}

function readDismissed(): boolean {
  if (memoryDismissed) return true;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    /* storage blocked, banner just stays visible */
    return false;
  }
}

/** Thin, quiet single-line notice above the navbar. */
export function TopBanner() {
  const { t } = useI18n();
  const open = !useSyncExternalStore(subscribe, readDismissed, () => false);

  const dismiss = () => {
    memoryDismissed = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* privacy mode, dismissal just won't persist */
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div
      className={clsx(
        "grid bg-surface transition-all duration-200",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="overflow-hidden">
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-center gap-2 border-b border-line px-12 py-1.5 text-center">
          <p className="text-[13px] text-muted">
            {t.banner.pre} <span className="font-medium text-ink">{t.banner.amount}</span>{" "}
            {t.banner.post}
            <Link
              href="#contact"
              className="ml-2 hidden font-medium text-brand transition-colors duration-200 hover:text-brand-600 sm:inline"
            >
              {t.banner.cta}
            </Link>
          </p>
          <button
            onClick={dismiss}
            aria-label={t.banner.close}
            className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center text-faint transition-colors duration-200 hover:text-ink sm:right-5"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
