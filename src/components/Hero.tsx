"use client";

import Link from "next/link";
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

      {/* Pe telefon, primul ecran trebuie să cuprindă titlul, subtitlul scurt și
          butoanele (testat la 390x844 și 360x640): de aceea titlul e mai mic,
          spațierea mai strânsă, iar dovezile („20.000+ absolvenți”…) coboară
          sub butoane. */}
      <Container className="grid items-center gap-8 pt-7 pb-12 sm:gap-10 sm:pt-20 sm:pb-20 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="animate-rise">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          {/* Titlu scurt pe primul rând (SEO local), fără lista de categorii în
              interior: altfel se rupea urât pe telefon („· B · C”). */}
          <h1
            className="display animate-rise mt-3 text-pretty text-[1.75rem] text-ink sm:mt-4 sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "70ms" }}
          >
            {hero.titleTop}{" "}
            <span className="block">
              {hero.titleBottom}
              <span className="dot">.</span>
            </span>
          </h1>

          {/* Categoriile predate, ca etichete mici (cerința patronului, 22.10.2026) */}
          <ul
            className="animate-rise mt-3 flex flex-wrap items-center gap-1.5"
            style={{ animationDelay: "105ms" }}
            aria-label={hero.categoriesLabel}
          >
            {hero.categories.map((c) => (
              <li
                key={c}
                className="chip-3d rounded-[10px] px-2 py-1 text-[13px] font-semibold leading-none text-ink"
              >
                {c}
              </li>
            ))}
          </ul>

          {/* Filialele, ca bule albastre (cerința patronului, 18.11.2026): fiecare duce la
              pagina sediului. Rotunde de tot doar aici, vezi DESIGN.md. */}
          <ul
            className="animate-rise mt-2.5 flex flex-wrap items-center gap-1 sm:gap-1.5"
            style={{ animationDelay: "120ms" }}
            aria-label={hero.branchesLabel}
            data-testid="hero-branches"
          >
            {hero.branches.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  className="btn-3d inline-flex items-center rounded-full px-2 py-1.5 text-[13px] sm:px-2.5 font-semibold leading-none text-white"
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="animate-rise mt-4 max-w-lg text-[0.9375rem] text-muted sm:mt-5 sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {hero.subtitle}
          </p>

          <p
            className="animate-rise mt-3 text-sm text-muted"
            style={{ animationDelay: "175ms" }}
          >
            {hero.priceLine}{" "}
            <Link
              href={hero.priceCta.href}
              className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
            >
              {hero.priceCta.label}
            </Link>
          </p>

          <div
            className="animate-rise mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3"
            style={{ animationDelay: "210ms" }}
          >
            {/* CTA-ul principal, mai mare și mai clar (cerința patronului, 22.10.2026) */}
            {/* Fără size="lg" aici: înălțimea lui (h-14) ar bate clasa noastră
                de mobil; o scriem direct, cu varianta sm pentru desktop. */}
            <Button
              href={hero.primaryCta.href}
              withArrow
              className="h-12 w-full text-base sm:h-14 sm:w-auto sm:min-w-56 sm:text-lg"
            >
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" className="h-12 sm:h-14">
              <Phone className="size-4 text-muted" strokeWidth={1.5} />
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* Facts */}
          <ul
            className="animate-rise mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-line pt-5 sm:mt-10 sm:grid-cols-2 sm:pt-6"
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

        {/* Media: clipul cu sediul, primul lucru de pe hero (cerința patronului,
            2.11.2026): fără sunet, în buclă continuă ca un GIF, fără controale.
            Fișierul e tăiat din clipul original (public/video/sediu.mp4): fără
            introducerea cu banda roșie și fără secvențele cu omul care vorbește,
            doar sediul, sala, posterele, motoarele, mașinile și motocicletele,
            cu treceri line și cu finalul legat de început (buclă fără tăietură).
            Originalul e vertical; aici e TĂIAT PE CENTRU la 4:3 (patronul:
            „arată urât vertical”), ca să umple locul exact ca vechea poză. */}
        <div className="animate-rise" style={{ animationDelay: "160ms" }}>
          <div className="overflow-hidden rounded-xl border border-line bg-ink">
            <video
              className="aspect-[4/3] h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="auto"
              poster="/video/hero-sediu-wide.jpg"
              aria-label={hero.imageAlt}
            >
              <source src="/video/hero-sediu-wide.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Container>
    </section>
  );
}
