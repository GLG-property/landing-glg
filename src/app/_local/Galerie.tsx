"use client";

import Image from "next/image";
import { BadgeCheck, Camera, Car, Play } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { infoInscriere } from "@/lib/info-inscriere";

/**
 * Galeria paginii de informații: mașina de instruire, parcul auto filmat și
 * recenziile video ale absolvenților, adică DOAR materialele care există în
 * public/. Toate videoclipurile au `preload="none"` cu poster (regula din
 * auditul RAP-CVFM6G: patru filme nu se descarcă la încărcarea paginii).
 *
 * Pozele cu sala de curs și cu sediul LIPSESC din public/, de aceea în locul
 * lor rămân trei chenare „în curând”, nu imagini de umplutură.
 */

/** Recenziile filmate la sediu (fișiere existente în public/). */
const REVIEWS = [
  { src: "/recenzie1.mp4", poster: "/recenzie1.jpg" },
  { src: "/recenzie2.mp4", poster: "/recenzie2.jpg" },
  { src: "/recenzie3.mp4", poster: "/recenzie3.jpg" },
  { src: "/recenzie4.mp4", poster: "/recenzie4.jpg" },
];

export function Galerie() {
  const { lang } = useI18n();
  const gal = infoInscriere[lang].gallery;

  return (
    <section id="galerie" className="scroll-mt-28 border-t border-line bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={gal.eyebrow} title={gal.title} subtitle={gal.subtitle} />

        <Reveal stagger className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Mașina de instruire, singura fotografie proprie pe care o avem */}
          <figure className="card overflow-hidden">
            <Image
              src="/masina-glg.jpg"
              alt={gal.carPhoto}
              width={1500}
              height={1125}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="flex items-center gap-2 px-4 py-3">
              <Car className="size-4 text-muted" strokeWidth={1.5} />
              <span className="text-sm text-muted">{gal.carPhoto}</span>
            </figcaption>
          </figure>

          {/* Parcul auto, video cu poster: filmul pornește la click */}
          <figure className="card overflow-hidden">
            <video
              className="aspect-[4/3] w-full bg-ink object-cover"
              controls
              playsInline
              preload="none"
              poster="/masini-poster.jpg"
            >
              <source src="/masini.mp4" type="video/mp4" />
              {gal.videoFallback}
            </video>
            <figcaption className="flex items-center gap-2 px-4 py-3">
              <Play className="size-4 text-muted" strokeWidth={1.5} />
              <span className="text-sm text-muted">{gal.fleetVideo}</span>
              <span className="ml-auto hidden text-[13px] text-faint sm:block">{gal.fleetVideoNote}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/*
          Fotografiile care LIPSESC din public/. Când patronul le trimite, se
          pune fișierul în public/ și se înlocuiește chenarul cu un <Image>.
          TODO: poză sala de curs, de cerut patronului
          TODO: poză intrarea în sediu, de cerut patronului
          TODO: poză oficiul unde se depun actele, de cerut patronului
        */}
        <Reveal stagger className="mt-5 grid gap-5 sm:grid-cols-3">
          {gal.missing.map((m) => (
            <div
              key={m.id}
              className="flex min-h-[132px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-white px-4 py-6 text-center"
            >
              <Camera className="size-5 text-faint" strokeWidth={1.5} />
              <span className="text-[13px] leading-relaxed text-muted">
                {m.label}: {gal.soonPrefix}
              </span>
            </div>
          ))}
        </Reveal>

        <div className="mt-12">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{gal.reviewsTitle}</h3>
          <p className="mt-1.5 text-sm text-muted">{gal.reviewsNote}</p>
          <Reveal stagger className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <figure key={r.src} className="card overflow-hidden">
                <video
                  className="aspect-[20/11] w-full bg-ink"
                  controls
                  playsInline
                  preload="none"
                  poster={r.poster}
                >
                  <source src={r.src} type="video/mp4" />
                  {gal.videoFallback}
                </video>
                <figcaption className="flex items-center gap-2 px-4 py-3">
                  <BadgeCheck className="size-4 text-muted" strokeWidth={1.5} />
                  <span className="text-sm text-muted">{gal.reviewsTitle}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
