"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Car } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

const LOOP_MS = 16000;

export function Steps() {
  const { t } = useI18n();
  const steps = t.steps;

  const roadRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // masina parcurge traseul in bucla; pasul din dreptul ei se aprinde subtil
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let current = -1;
    const start = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const road = roadRef.current;
      const path = pathRef.current;
      const car = carRef.current;
      if (!road || !path || !car) return;
      const rect = road.getBoundingClientRect();
      if (rect.width === 0) return;
      const p = ((now - start) % LOOP_MS) / LOOP_MS;
      const len = path.getTotalLength();
      const pt = path.getPointAtLength(p * len);
      const ahead = path.getPointAtLength(Math.min(len, p * len + 8));
      const sx = rect.width / 1440;
      const sy = rect.height / 120;
      const angle = Math.atan2((ahead.y - pt.y) * sy, (ahead.x - pt.x) * sx) * (180 / Math.PI);
      const fade = Math.min(1, p / 0.05, (1 - p) / 0.05);
      car.style.transform = `translate(${pt.x * sx - 10}px, ${pt.y * sy - 14}px) rotate(${angle}deg)`;
      car.style.opacity = String(fade);
      const idx = Math.min(3, Math.floor(p * 4));
      if (idx !== current) {
        current = idx;
        setActiveStep(idx);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="cursuri" className="scroll-mt-24 bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading
          index="03"
          eyebrow={steps.eyebrow}
          title={steps.title}
          accent={steps.titleAccent}
          subtitle={steps.subtitle}
        />
        <Reveal stagger className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, i) => (
            <article key={step.title} className="border-t border-line pt-5">
              <span
                className={clsx(
                  "text-xs font-medium tabular-nums tracking-[0.14em] transition-colors duration-500",
                  activeStep === i ? "text-brand" : "text-faint"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[17px] font-medium tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              {step.link ? (
                <Link
                  href={step.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                >
                  {step.link.label}
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              ) : null}
            </article>
          ))}
        </Reveal>

        {/* traseu line-art sub pasi, cu masina care il parcurge */}
        <div ref={roadRef} aria-hidden="true" className="relative mt-14 hidden h-[120px] lg:block">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M0,44 C240,44 300,12 480,12 S720,76 960,76 S1200,44 1440,44"
              stroke="#0a0e17"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
            <path
              ref={pathRef}
              d="M0,60 C240,60 300,28 480,28 S720,92 960,92 S1200,60 1440,60"
              stroke="#0a0e17"
              strokeOpacity="0.10"
              strokeWidth="1"
              strokeDasharray="12 16"
            />
            <path
              d="M0,76 C240,76 300,44 480,44 S720,108 960,108 S1200,76 1440,76"
              stroke="#0a0e17"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          </svg>
          <div ref={carRef} className="absolute left-0 top-0 opacity-0 will-change-transform">
            <Car className="size-5 text-ink" strokeWidth={1.5} />
          </div>
        </div>
      </Container>
    </section>
  );
}
