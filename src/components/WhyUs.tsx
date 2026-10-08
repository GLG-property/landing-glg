"use client";

import Image from "next/image";
import { useI18n } from "./LanguageProvider";
import { iconMap } from "./icons";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

export function WhyUs() {
  const { t } = useI18n();
  const why = t.why;
  return (
    <section id="despre" className="py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + feature list */}
          <div>
            <SectionHeading
              index="01"
              eyebrow={why.eyebrow}
              title={why.title}
              accent={why.titleAccent}
              subtitle={why.subtitle}
            />
            <Reveal as="ul" stagger className="mt-10 flex flex-col gap-6">
              {why.items.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-ink">
                      {Icon ? <Icon className="size-5" strokeWidth={1.5} /> : null}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </Reveal>
          </div>

          {/* Right: real photo */}
          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/3.3] overflow-hidden rounded-xl border border-line">
              <Image
                src="/masina-glg.jpg"
                alt={why.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
