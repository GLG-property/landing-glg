"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/content";

const STORAGE_KEY = "glg-lang";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "ro", setLang: () => {}, t: dictionaries.ro });

/**
 * Client-side language switch. Romanian is always what gets prerendered;
 * the saved preference is applied after mount so hydration stays clean.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ro" || saved === "ru") setLangState(saved);
    } catch {
      /* privacy mode — stay on Romanian */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* preference just won't persist */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useI18n() {
  return useContext(LangContext);
}
