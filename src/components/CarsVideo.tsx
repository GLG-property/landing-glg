"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

/** Fleet band — the cars video runs as a dimmed backdrop behind the copy. */
export function CarsVideo() {
  const { t } = useI18n();
  const cars = t.cars;
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-card">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/masini-poster.jpg"
              aria-hidden="true"
            >
              <source src="/masini.mp4" type="video/mp4" />
            </video>
            {/* overlay keeps the low-res footage ambient and the text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />

            <div className="relative max-w-xl px-7 py-14 sm:px-12 sm:py-20">
              <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm">
                {cars.badge}
              </span>
              <h2 className="display mt-5 text-3xl text-white sm:text-4xl">
                {cars.title}<span className="dot">.</span>
              </h2>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-white/75">
                {cars.text}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {cars.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/85"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <Link
                href={cars.cta.href}
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-brand-50"
              >
                {cars.cta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
