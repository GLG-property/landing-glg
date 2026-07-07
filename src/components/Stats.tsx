"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

const fmt = new Intl.NumberFormat("ro-RO");

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const duration = 1600;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="tabular-nums">
      {fmt.format(display)}
      {suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <div className="card grid grid-cols-2 gap-y-8 overflow-hidden bg-gradient-to-b from-white to-brand-50/40 px-6 py-10 shadow-soft sm:px-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "flex flex-col items-center text-center lg:items-start lg:text-left " +
                (i !== 0 ? "lg:border-l lg:border-line lg:pl-10" : "")
              }
            >
              <div className="display text-4xl text-brand sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted sm:text-base">
                {s.label}
              </div>
            </div>
          ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
