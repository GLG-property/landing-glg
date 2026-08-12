"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

export function Steps() {
  const { t } = useI18n();
  const steps = t.steps;
  return (
    <section id="cursuri" className="relative scroll-mt-24 overflow-hidden bg-surface py-20 sm:py-28">
      {/* faint watermark pattern, reference-style */}
      <div aria-hidden="true" className="pattern-wheel pointer-events-none absolute inset-0 opacity-[0.045]" />
      <Container className="relative">
        <SectionHeading
          eyebrow={steps.eyebrow}
          title={steps.title}
          accent={steps.titleAccent}
          subtitle={steps.subtitle}
        />
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.items.map((step, i) => (
            <article
              key={step.title}
              className="rounded-[1.75rem] border-2 border-dashed border-brand-300 bg-white/50 p-6 transition-colors hover:border-brand hover:bg-white sm:p-8"
            >
              <div className="display text-5xl text-brand sm:text-6xl">{i + 1}</div>
              <h3 className="mt-5 text-xl font-semibold text-ink sm:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-md text-[0.975rem] leading-relaxed text-muted">
                {step.text}
              </p>
              {step.link ? (
                <Link
                  href={step.link.href}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-600"
                >
                  {step.link.label}
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
