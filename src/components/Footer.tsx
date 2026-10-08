"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, Logo, Button } from "./primitives";
import { TikTok, Facebook, Instagram } from "./icons";
import { openCookiePrefs } from "./CookieConsent";

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TikTok, href: site.social.tiktok, label: "TikTok" },
];

export function Footer() {
  const { t } = useI18n();
  const footer = t.footer;
  return (
    <footer className="border-t border-line bg-white">
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-2 lg:gap-20">
          {/* Brand + CTA */}
          <div className="flex max-w-md flex-col items-start">
            <Logo />
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
              {footer.heading}<span className="dot">?</span>
            </h2>
            <p className="mt-3 text-sm text-muted">{footer.text}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={t.hero.primaryCta.href} withArrow>
                {t.hero.primaryCta.label}
              </Button>
              <Button href={site.phoneHref} variant="secondary">
                <Phone className="size-4 text-muted" strokeWidth={1.5} />
                {site.phone}
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <p className="text-[13px] text-faint">
              © 2026 {site.name}. {footer.rights} ·{" "}
              <a
                href="https://landings.md"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-ink"
              >
                {footer.credit}
              </a>
            </p>
            <p className="text-[13px] text-faint">
              <Link
                href="/confidentialitate"
                className="transition-colors duration-200 hover:text-ink"
              >
                {footer.privacy}
              </Link>{" "}
              ·{" "}
              <Link
                href="/termeni"
                className="transition-colors duration-200 hover:text-ink"
              >
                {footer.terms}
              </Link>{" "}
              ·{" "}
              <button
                onClick={openCookiePrefs}
                className="transition-colors duration-200 hover:text-ink"
              >
                {footer.cookieSettings}
              </button>
            </p>
          </div>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="btn-3d-light grid size-10 place-items-center rounded-[10px] text-muted transition-colors duration-200 hover:text-ink"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
