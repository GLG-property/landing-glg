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
    <section id="despre" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + feature list */}
          <div>
            <SectionHeading
              eyebrow={why.eyebrow}
              title={why.title}
              accent={why.titleAccent}
              subtitle={why.subtitle}
            />
            <Reveal as="ul" stagger className="mt-10 flex flex-col gap-7">
              {why.items.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.title} className="flex gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-soft ring-1 ring-line">
                      {Icon ? <Icon className="size-6" strokeWidth={1.75} /> : null}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-[0.975rem] leading-relaxed text-muted">
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
            <div className="relative aspect-[4/3.3] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-line">
              <Image
                src="/masina-glg.jpg"
                alt={why.imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
