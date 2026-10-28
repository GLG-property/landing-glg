"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react";
import clsx from "clsx";
import { site, langs, langNames } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Logo, Container } from "./primitives";
import { useMessengers } from "./messengers";

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const messengerLinks = useMessengers("antet");

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

  // scroll-spy: marks the nav link of the section currently in view
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200",
        scrolled ? "border-line shadow-soft" : "border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {t.nav.items.map((item) => {
            // Ancorele urmăresc scroll-spy-ul pe pagina principală; paginile
            // proprii (ex. /blog) sunt active după calea curentă.
            const isAnchor = item.href.includes("#");
            const anchor = item.href.replace(/^\/?#/, "");
            const isActive = isAnchor
              ? pathname === "/" && anchor === active
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:opacity-0 after:transition-opacity after:duration-200",
                  isActive
                    ? "text-ink after:bg-brand after:opacity-100"
                    : "text-muted hover:text-ink after:bg-ink hover:after:opacity-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLangOpen(false), 120)}
              className="btn-3d-light flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-sm font-medium text-ink transition-colors duration-200"
              aria-label={t.nav.langAria}
            >
              <Globe className="size-4 text-faint" strokeWidth={1.5} />
              {lang.toUpperCase()}
              <ChevronDown
                className={clsx("size-3.5 text-faint transition-transform", langOpen && "rotate-180")}
                strokeWidth={1.5}
              />
            </button>
            {langOpen ? (
              <div className="card anim-drop absolute right-0 mt-2 flex w-32 flex-col gap-0.5 rounded-[10px] p-1">
                {langs.map((l) => (
                  <button
                    key={l}
                    onMouseDown={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={clsx(
                      "block w-full rounded-[8px] px-3 py-2 text-left text-sm font-medium transition-colors duration-200",
                      l === lang ? "bg-brand-50 text-brand" : "text-muted hover:bg-surface"
                    )}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Phone, secondary */}
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 px-2 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand md:inline-flex"
          >
            <Phone className="size-4 text-muted" strokeWidth={1.5} />
            {site.phone}
          </a>

          {/* Mesagerie, lângă telefon (doar desktop; pe mobil e în bara de jos) */}
          {messengerLinks.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={l.onClick}
              aria-label={l.label}
              title={l.label}
              className="btn-3d-light hidden size-10 place-items-center rounded-[10px] text-muted transition-colors duration-200 hover:text-ink md:grid"
            >
              <l.Icon className="size-4" />
            </a>
          ))}

          {/* Primary CTA */}
          <Link
            href={t.nav.cta.href}
            className="btn-3d hidden items-center rounded-[10px] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 sm:inline-flex"
          >
            {t.nav.cta.label}
          </Link>

          <a
            href={site.phoneHref}
            aria-label={site.phone}
            className="btn-3d-light grid size-10 place-items-center rounded-[10px] text-ink transition-colors duration-200 md:hidden"
          >
            <Phone className="size-4" strokeWidth={1.5} />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="btn-3d-light grid size-10 place-items-center rounded-[10px] text-ink lg:hidden"
            aria-label={t.nav.menuAria}
            aria-expanded={open}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu, full-height sheet under the header */}
      <div className={clsx("lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          className={clsx(
            "menu-sheet fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] bg-white",
            open ? "is-open opacity-100" : "opacity-0"
          )}
        >
          <Container className="flex h-full flex-col overflow-y-auto">
            <nav className="nav-list pt-2">
              {t.nav.items.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-4 transition-colors duration-200 hover:text-brand"
                >
                  <span className="text-xl font-semibold tracking-tight text-ink">
                    {item.label}
                  </span>
                  <span className="text-xs tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="menu-actions mt-auto flex flex-col gap-2.5 pb-8 pt-6">
              <div className="flex gap-2" role="group" aria-label={t.nav.langAria}>
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={clsx(
                      "btn-3d-light flex-1 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                      l === lang ? "border-brand text-brand" : "text-muted hover:text-ink"
                    )}
                  >
                    {langNames[l]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <a
                  href={site.phoneHref}
                  onClick={() => setOpen(false)}
                  className="btn-3d-light inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] px-4 py-3.5 text-sm font-medium text-ink transition-colors duration-200"
                >
                  <Phone className="size-4 text-muted" strokeWidth={1.5} />
                  {site.phone}
                </a>
                {messengerLinks.map((l) => (
                  <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      l.onClick();
                      setOpen(false);
                    }}
                    aria-label={l.label}
                    className="btn-3d-light grid size-12 shrink-0 place-items-center rounded-[10px] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <l.Icon className="size-4" />
                  </a>
                ))}
              </div>
              <Link
                href={t.nav.cta.href}
                onClick={() => setOpen(false)}
                className="btn-3d inline-flex w-full items-center justify-center rounded-[10px] px-5 py-3.5 text-sm font-medium text-white transition-colors duration-200"
              >
                {t.nav.cta.label}
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
