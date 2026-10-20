"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, Eyebrow, Button } from "./primitives";

/** Conținutul paginii 404: titlu, CTA de înscriere și linkuri către secțiunile principale. */
export function NotFoundContent() {
  const { t } = useI18n();
  const nf = t.notFound;
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
      </div>

      <Container className="py-14 sm:py-20">
        <div className="max-w-xl">
          <div className="animate-rise">
            <Eyebrow>{nf.eyebrow}</Eyebrow>
          </div>
          <h1
            className="display animate-rise mt-4 text-balance text-4xl text-ink sm:text-5xl"
            style={{ animationDelay: "70ms" }}
          >
            {nf.title}
            <span className="dot">.</span>
          </h1>
          <p className="animate-rise mt-5 max-w-lg text-base text-muted" style={{ animationDelay: "140ms" }}>
            {nf.text}
          </p>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "210ms" }}
          >
            <Button href={nf.cta.href} withArrow>
              {nf.cta.label}
            </Button>
            <Button href={nf.home.href} variant="secondary">
              {nf.home.label}
            </Button>
          </div>

          <div className="animate-rise mt-10 border-t border-line pt-6" style={{ animationDelay: "280ms" }}>
            <Eyebrow>{nf.linksTitle}</Eyebrow>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {nf.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <ArrowRight className="size-4 shrink-0 text-faint" strokeWidth={1.5} />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-ink"
                >
                  <Phone className="size-4 shrink-0 text-faint" strokeWidth={1.5} />
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
