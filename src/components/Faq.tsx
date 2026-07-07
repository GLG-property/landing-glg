"use client";

import { useState } from "react";
import { Plus, Phone } from "lucide-react";
import clsx from "clsx";
import { faq, site } from "@/lib/content";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="intrebari" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={faq.eyebrow}
              title={faq.title}
              accent={faq.titleAccent}
              subtitle={faq.subtitle}
            />
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition-colors hover:border-brand-200"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                <Phone className="size-5" />
              </span>
              <span className="text-left">
                <span className="block text-sm text-muted">Nu găsești răspunsul?</span>
                <span className="block font-semibold text-ink">{site.phone}</span>
              </span>
            </a>
          </div>

          {/* Right — accordion */}
          <Reveal as="ul" stagger className="flex flex-col gap-3">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  className={clsx(
                    "rounded-2xl border transition-colors",
                    isOpen ? "border-brand-200 bg-brand-50/40" : "border-line bg-white"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.05rem] font-semibold text-ink">{item.q}</span>
                    <span
                      className={clsx(
                        "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                        isOpen ? "rotate-45 bg-brand text-white" : "bg-surface text-brand"
                      )}
                    >
                      <Plus className="size-4" strokeWidth={2.5} />
                    </span>
                  </button>
                  <div
                    className={clsx(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div
                      className={clsx(
                        "overflow-hidden transition-opacity duration-500",
                        isOpen ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <p className="px-6 pb-6 text-[0.975rem] leading-relaxed text-muted">
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
