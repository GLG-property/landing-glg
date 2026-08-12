"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/lib/content";
import { Logo, Container } from "./primitives";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          {nav.map((item) => (
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
            aria-label="Meniu"
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
            {nav.map((item, i) => (
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
              style={{ transitionDelay: open ? `${60 + nav.length * 45}ms` : "0ms" }}
            >
              <a
                href={site.phoneHref}
                onClick={() => setOpen(false)}
                className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-pop transition-colors hover:bg-brand-600"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
