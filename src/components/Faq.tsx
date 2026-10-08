"use client";

import { useState } from "react";
import { Plus, Phone } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

export function Faq() {
  const { t } = useI18n();
  const faq = t.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="intrebari" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="05"
              eyebrow={faq.eyebrow}
              title={faq.title}
              accent={faq.titleAccent}
              subtitle={faq.subtitle}
            />
            <a
              href={site.phoneHref}
              className="card mt-8 inline-flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:border-faint"
            >
              <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-ink">
                <Phone className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-left">
                <span className="block text-sm text-muted">{faq.cardQuestion}</span>
                <span className="block font-semibold text-ink">{site.phone}</span>
              </span>
            </a>
          </div>

          {/* Right, accordion */}
          <Reveal as="ul" stagger className="flex flex-col divide-y divide-line border-y border-line">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold tracking-tight text-ink">
                      {item.q}
                    </span>
                    <Plus
                      className={clsx(
                        "size-4 shrink-0 text-muted transition-transform duration-150",
                        isOpen && "rotate-45"
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className={clsx(
                      "grid transition-[grid-template-rows] duration-200 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div
                      className={clsx(
                        "overflow-hidden transition-opacity duration-200",
                        isOpen ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
