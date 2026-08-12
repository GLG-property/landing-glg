"use client";

import { CheckCircle2, Phone } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container, Eyebrow, Button } from "./primitives";

export function Hero() {
  const { t } = useI18n();
  const hero = t.hero;
  return (
    <section id="acasa" className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[30%] h-[360px] w-[360px] rounded-full bg-brand-100/50 blur-3xl" />
      </div>

      <Container className="flex flex-col items-center pt-16 pb-20 text-center sm:pt-24 md:pb-28">
        <div className="animate-rise">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>

        <h1
          className="display animate-rise mt-7 max-w-4xl text-balance text-[3.25rem] text-ink sm:text-6xl md:text-7xl lg:text-[5.6rem]"
          style={{ animationDelay: "70ms" }}
        >
          <span className="block">{hero.titleTop}</span>
          <span className="block">
            {hero.titleBottom}
            <span className="dot">.</span>
          </span>
        </h1>

        <p
          className="animate-rise mt-7 max-w-2xl text-lg text-muted sm:text-xl"
          style={{ animationDelay: "150ms" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="animate-rise mt-9 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "230ms" }}
        >
          <Button href={hero.primaryCta.href} className="px-7 py-4 text-base">
            <Phone className="size-5" />
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" className="px-7 py-4 text-base">
            {hero.secondaryCta.label}
          </Button>
        </div>

        {/* Trust chips */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {hero.chips.map((chip, i) => (
            <li
              key={chip}
              className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-soft transition-colors hover:border-brand-200"
              style={{ animationDelay: `${370 + i * 70}ms` }}
            >
              <CheckCircle2 className="size-5 text-brand" />
              {chip}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
