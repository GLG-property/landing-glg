"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Car } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "./LanguageProvider";
import { iconMap } from "./icons";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

const LOOP_MS = 16000;

/**
 * „Procesul de înscriere”, pașii de la cererea online până la prima lecție
 * (cerința patronului, 31.10.2026). Pasul achitării are chenarul lui de
 * atenționare: fără plată în 24 de ore cererea nu mai ține locul în grupă.
 *
 * Păstrează id-ul „cursuri”: antetul și subsolul duc aici cu „Cum te înscrii”.
 */
export function Steps() {
  const { t } = useI18n();
  const steps = t.steps;
  const count = steps.items.length;

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
      // un segment de traseu pentru fiecare pas, oricâți pași ar fi
      const idx = Math.min(count - 1, Math.floor(p * count));
      if (idx !== current) {
        current = idx;
        setActiveStep(idx);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

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
        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.items.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <article key={step.title} className="card flex flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-ink">
                    {Icon ? <Icon className="size-4" strokeWidth={1.5} /> : null}
                  </span>
                  <span
                    className={clsx(
                      "text-xs font-medium tabular-nums tracking-[0.14em] transition-colors duration-500",
                      activeStep === i ? "text-brand" : "text-faint"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                {step.warn ? (
                  <p className="mt-3 flex items-start gap-2 rounded-[10px] border border-line bg-brand-50 px-3 py-2 text-[13px] font-medium leading-relaxed text-ink">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                    {step.warn}
                  </p>
                ) : null}
                {step.link ? (
                  <Link
                    href={step.link.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                  >
                    {step.link.label}
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </Link>
                ) : null}
              </article>
            );
          })}
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
