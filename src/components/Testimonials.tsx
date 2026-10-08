"use client";

import { BadgeCheck } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

const reviews = [
  { src: "/recenzie1.mp4", poster: "/recenzie1.jpg" },
  { src: "/recenzie2.mp4", poster: "/recenzie2.jpg" },
  { src: "/recenzie3.mp4", poster: "/recenzie3.jpg" },
  { src: "/recenzie4.mp4", poster: "/recenzie4.jpg" },
];

export function Testimonials() {
  const { t } = useI18n();
  const testimonials = t.testimonials;
  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          accent={testimonials.titleAccent}
        />
        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.src}
              className="card overflow-hidden transition-colors duration-200 hover:border-faint"
            >
              <video
                className="aspect-[20/11] w-full bg-ink"
                controls
                playsInline
                preload="metadata"
                poster={r.poster}
              >
                <source src={r.src} type="video/mp4" />
                {testimonials.videoFallback}
              </video>
              <figcaption className="flex items-center gap-2 px-4 py-3">
                <BadgeCheck className="size-4 text-muted" strokeWidth={1.5} />
                <span className="text-sm text-muted">{testimonials.caption}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
