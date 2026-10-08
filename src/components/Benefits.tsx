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
                className="card flex flex-col p-6 transition-colors duration-200 hover:border-faint"
              >
                <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-ink">
                  {Icon ? <Icon className="size-5" strokeWidth={1.5} /> : null}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
