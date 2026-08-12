"use client";

import { useI18n } from "./LanguageProvider";
import { iconMap } from "./icons";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

export function Benefits() {
  const { t } = useI18n();
  const benefits = t.benefits;
  return (
    <section className="relative pb-6">
      <Container>
        <Reveal stagger className="grid gap-5 md:grid-cols-3">
          {benefits.map((b) => {
            const Icon = iconMap[b.icon];
            return (
              <article
                key={b.title}
                className="group card flex flex-col p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="inline-flex text-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                  {Icon ? <Icon className="size-7" strokeWidth={1.75} /> : null}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.text}</p>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
