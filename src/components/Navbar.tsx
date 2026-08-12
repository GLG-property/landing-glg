"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react";
import clsx from "clsx";
import { site, langs, langNames } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Logo, Container } from "./primitives";

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close the mobile menu (and release the scroll lock) when crossing to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {t.nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Language selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 120)}
              className="flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-200"
              aria-label={t.nav.langAria}
            >
              <Globe className="size-4 text-faint" />
              {lang.toUpperCase()}
              <ChevronDown className={clsx("size-3.5 text-faint transition-transform", langOpen && "rotate-180")} />
            </button>
            {langOpen ? (
              <div className="animate-pop absolute right-0 mt-2 flex w-32 flex-col gap-1 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-card">
                {langs.map((l) => (
                  <button
                    key={l}
                    onMouseDown={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={clsx(
                      "block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors",
                      l === lang ? "bg-brand-50 text-brand" : "text-muted hover:bg-surface"
                    )}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <a
            href={site.phoneHref}
            className="btn-shine hidden items-center gap-2 rounded-xl border border-transparent bg-brand px-4 py-2 text-sm font-semibold text-white shadow-pop transition-colors hover:bg-brand-600 sm:inline-flex"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-line text-ink lg:hidden"
            aria-label={t.nav.menuAria}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={clsx(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "fixed inset-x-0 top-[72px] z-40 origin-top border-b border-line bg-white transition-all duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <Container className="flex flex-col gap-1 py-5">
            {t.nav.items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-2xl px-4 py-3 text-lg font-semibold text-ink transition-all duration-300 hover:bg-surface",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
                style={{ transitionDelay: open ? `${60 + i * 45}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className={clsx(
                "mt-3 flex flex-col gap-2.5 transition-all duration-300",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
              style={{ transitionDelay: open ? `${60 + t.nav.items.length * 45}ms` : "0ms" }}
            >
              <a
                href={site.phoneHref}
                onClick={() => setOpen(false)}
                className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-pop transition-colors hover:bg-brand-600"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
              <div className="flex gap-2.5" role="group" aria-label={t.nav.langAria}>
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={clsx(
                      "flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                      l === lang
                        ? "border-brand bg-brand-50 text-brand"
                        : "border-line text-muted hover:border-brand-200 hover:text-ink"
                    )}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
