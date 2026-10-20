"use client";

import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container, Eyebrow, Button } from "./primitives";

export function Hero() {
  const { t } = useI18n();
  const hero = t.hero;
  return (
    <section id="acasa" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
      </div>

      <Container className="grid items-center gap-10 pt-14 pb-14 sm:pt-20 sm:pb-20 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="animate-rise">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            className="display animate-rise mt-4 text-balance text-4xl text-ink sm:text-5xl"
            style={{ animationDelay: "70ms" }}
          >
            {hero.titleTop} {hero.titleBottom}
            <span className="dot">.</span>
          </h1>

          <p
            className="animate-rise mt-5 max-w-lg text-base text-muted sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "210ms" }}
          >
            <Button href={hero.primaryCta.href} withArrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              <Phone className="size-4 text-muted" strokeWidth={1.5} />
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* Facts */}
          <ul
            className="animate-rise mt-10 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2"
            style={{ animationDelay: "280ms" }}
          >
            {hero.chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2.5 text-sm text-muted">
                <Check className="size-4 shrink-0 text-brand" strokeWidth={1.5} />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Media */}
        <div className="animate-rise" style={{ animationDelay: "160ms" }}>
          <div className="overflow-hidden rounded-xl border border-line">
            <Image
              src="/masina-glg.jpg"
              alt={hero.imageAlt}
              width={1280}
              height={960}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
