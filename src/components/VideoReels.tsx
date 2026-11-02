"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Clipurile școlii (filmate vertical, pentru telefon), aduse de patron din
 * Drive pe 2.11.2026: prezentarea instituției în prim-plan, apoi sediul,
 * poligonul, parcul auto, interviurile și părerile cursanților.
 *
 * Fișierele stau în public/video/ (comprimate la 720p, cu poster JPG), toate
 * cu `preload="none"`: pagina nu descarcă niciun film până nu apasă omul
 * Play. Când pornește un clip, celelalte se opresc, ca să nu se audă două
 * voci deodată.
 */
const FEATURED = { id: "despre-scoala", src: "/video/despre-scoala.mp4", poster: "/video/despre-scoala.jpg" };

const CLIPS = [
  { id: "sediu", src: "/video/sediu.mp4", poster: "/video/sediu.jpg" },
  { id: "poligon", src: "/video/poligon.mp4", poster: "/video/poligon.jpg" },
  { id: "parc-auto", src: "/video/parc-auto.mp4", poster: "/video/parc-auto.jpg" },
  { id: "pe-scurt", src: "/video/pe-scurt.mp4", poster: "/video/pe-scurt.jpg" },
  { id: "informatii", src: "/video/informatii.mp4", poster: "/video/informatii.jpg" },
  { id: "interviu-cursanta", src: "/video/interviu-cursanta.mp4", poster: "/video/interviu-cursanta.jpg" },
  { id: "interviu", src: "/video/interviu.mp4", poster: "/video/interviu.jpg" },
  { id: "lectie", src: "/video/lectie.mp4", poster: "/video/lectie.jpg" },
  { id: "parerea-cursantei", src: "/video/parerea-cursantei.mp4", poster: "/video/parerea-cursantei.jpg" },
];

export function VideoReels() {
  const { t } = useI18n();
  const v = t.videos;
  const sectionRef = useRef<HTMLElement>(null);

  // Un singur clip rulează odată: la Play pe unul, celelalte se pun pe pauză.
  function onPlay(e: React.SyntheticEvent<HTMLVideoElement>) {
    const current = e.currentTarget;
    sectionRef.current?.querySelectorAll("video").forEach((el) => {
      if (el !== current && !el.paused) el.pause();
    });
  }

  const label = (id: string) => v.items.find((i) => i.id === id)?.label ?? "";

  return (
    <section id="video" ref={sectionRef} className="scroll-mt-24 border-t border-line bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={v.eyebrow} title={v.title} accent={v.accent} subtitle={v.subtitle} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-8">
          {/* Prezentarea instituției, în prim-plan */}
          <Reveal>
            <figure className="card overflow-hidden">
              <video
                className="aspect-[9/16] w-full bg-ink object-cover"
                controls
                playsInline
                preload="none"
                poster={FEATURED.poster}
                onPlay={onPlay}
              >
                <source src={FEATURED.src} type="video/mp4" />
                {v.fallback}
              </video>
              <figcaption className="flex items-center gap-2 px-4 py-3">
                <Play className="size-4 text-muted" strokeWidth={1.5} />
                <span className="text-sm font-medium text-ink">{label(FEATURED.id)}</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Restul clipurilor: pe telefon se derulează lateral, pe desktop sunt în grilă */}
          <Reveal stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {CLIPS.map((c) => (
              <figure key={c.id} className="card w-[62vw] shrink-0 snap-start overflow-hidden sm:w-auto">
                <video
                  className="aspect-[9/16] w-full bg-ink object-cover"
                  controls
                  playsInline
                  preload="none"
                  poster={c.poster}
                  onPlay={onPlay}
                >
                  <source src={c.src} type="video/mp4" />
                  {v.fallback}
                </video>
                <figcaption className="px-3 py-2.5 text-[13px] leading-snug text-muted">{label(c.id)}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
