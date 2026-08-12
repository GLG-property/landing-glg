"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, Logo, Button } from "./primitives";
import { TikTok, Facebook, Instagram } from "./icons";
import { Reveal } from "./Reveal";

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TikTok, href: site.social.tiktok, label: "TikTok" },
];

export function Footer() {
  const { t } = useI18n();
  const footer = t.footer;
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white pt-16">
      <Container>
        <Reveal stagger className="grid gap-12 pb-14 lg:grid-cols-2 lg:gap-20">
          {/* CTA card */}
          <div className="card flex flex-col items-start p-7 shadow-soft sm:p-8">
            <Logo />
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
              {footer.heading}<span className="dot">?</span>
            </h2>
            <p className="mt-3 max-w-md text-muted">{footer.text}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phoneHref}>
                <Phone className="size-4" />
                {site.phone}
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] font-medium text-muted transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* bottom bar */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-line py-7 sm:flex-row">
          <p className="text-sm text-muted">
            © 2026 {site.name}. {footer.rights} ·{" "}
            <a
              href="https://landings.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-brand"
            >
              {footer.credit}
            </a>
          </p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <s.icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none pb-2 text-center">
        <span className="display block bg-gradient-to-b from-surface to-white bg-clip-text text-[24vw] leading-[0.8] text-transparent">
          GLG
        </span>
      </div>
    </footer>
  );
}
