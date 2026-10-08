"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/content";

const STORAGE_KEY = "glg-lang";
const LANG_EVENT = "glg-lang-change";

/** In-memory fallback so the switch still works when storage is blocked. */
let memoryLang: Lang | null = null;

function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ro" || saved === "ru") return saved;
  } catch {
    /* privacy mode, fall through to the in-memory value */
  }
  return memoryLang ?? "ro";
}

function setLang(l: Lang) {
  memoryLang = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* preference just won't persist */
  }
  window.dispatchEvent(new Event(LANG_EVENT));
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "ro", setLang: () => {}, t: dictionaries.ro });

/**
 * Client-side language switch. Romanian is always what gets prerendered;
 * the saved preference is read through useSyncExternalStore, so hydration
 * starts from the server snapshot ("ro") and updates cleanly right after.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "ro" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  return useContext(LangContext);
}
