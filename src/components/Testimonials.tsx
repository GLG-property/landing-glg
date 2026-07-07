import { BadgeCheck } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

const reviews = [
  { src: "/recenzie1.mp4", poster: "/recenzie1.jpg" },
  { src: "/recenzie2.mp4", poster: "/recenzie2.jpg" },
  { src: "/recenzie3.mp4", poster: "/recenzie3.jpg" },
  { src: "/recenzie4.mp4", poster: "/recenzie4.jpg" },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          accent={testimonials.titleAccent}
        />
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.src}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <video
                className="aspect-[20/11] w-full bg-ink"
                controls
                playsInline
                preload="metadata"
                poster={r.poster}
              >
                <source src={r.src} type="video/mp4" />
                Browserul tău nu suportă redarea video.
              </video>
              <figcaption className="flex items-center gap-2 px-4 py-3.5">
                <BadgeCheck className="size-4 text-brand" />
                <span className="text-sm font-medium text-muted">
                  Recenzie absolvent GLG
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
