"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

/** Fleet band, the cars video runs as a dimmed backdrop behind the copy. */
export function CarsVideo() {
  const { t } = useI18n();
  const cars = t.cars;
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-line">
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

            <div className="relative max-w-xl px-7 py-12 sm:px-12 sm:py-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {cars.badge}
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {cars.title}<span className="dot">.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {cars.text}
              </p>
              <p className="mt-5 text-sm text-white/70">
                {cars.chips.join(" · ")}
              </p>
              <Link
                href={cars.cta.href}
                className="btn-3d-light mt-7 inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200"
              >
                {cars.cta.label}
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
