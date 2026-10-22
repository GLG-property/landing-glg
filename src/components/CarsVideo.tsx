"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Banda cu parcul auto, imediat sub hero: videoclipul cu mașinile în prim-plan
 * (înalt, cu un voal întunecat doar în spatele textului, ca mașinile să se
 * vadă), cu „Înscrie-te online" ca buton principal (cerința patronului,
 * 22.10.2026).
 */
export function CarsVideo() {
  const { t } = useI18n();
  const cars = t.cars;
  // Analiza (video-start, click-inscrie-te) e urmărită global în AnalyticsEvents.tsx.

  return (
    <section className="py-6 sm:py-8">
      <Container>
        <Reveal>
          <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-line bg-ink sm:min-h-[520px] lg:min-h-[560px]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/masini-poster.jpg"
              aria-hidden="true"
            >
              <source src="/masini.mp4" type="video/mp4" />
            </video>
            {/* voal doar în spatele textului: mașinile rămân vizibile în dreapta */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent sm:via-ink/25" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent sm:h-1/3" />

            <div className="relative flex min-h-[420px] max-w-xl flex-col justify-end px-6 py-8 sm:min-h-[520px] sm:px-12 sm:py-12 lg:min-h-[560px]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {cars.badge}
              </span>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {cars.title}<span className="dot">.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                {cars.text}
              </p>
              <p className="mt-4 text-sm text-white/70">
                {cars.chips.join(" · ")}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={cars.enrollCta.href}
                  className="btn-3d inline-flex h-14 items-center justify-center gap-2 rounded-[10px] px-8 text-lg font-medium text-white transition-colors duration-200 sm:w-auto"
                >
                  {cars.enrollCta.label}
                  <ArrowRight className="size-5" strokeWidth={1.5} />
                </Link>
                <Link
                  href={cars.cta.href}
                  className="btn-3d-light inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.95rem] font-medium text-ink transition-colors duration-200 sm:h-14"
                >
                  {cars.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
