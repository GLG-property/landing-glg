"use client";

import { Check, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading, Button } from "./primitives";
import { Reveal } from "./Reveal";

export function Pricing() {
  const { t } = useI18n();
  const pricing = t.pricing;
  const plan = pricing.plan;

  return (
    <section id="preturi" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              index="02"
              eyebrow={pricing.eyebrow}
              title={pricing.title}
              accent={pricing.titleAccent}
              subtitle={pricing.subtitle}
            />
            <Reveal className="mt-6 flex flex-col items-start gap-6">
              <p className="max-w-xl text-sm text-muted">
                {pricing.note}{" "}
                <a
                  href={pricing.noteCta.href}
                  className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                >
                  {pricing.noteCta.label}
                </a>
              </p>
              <Button href={pricing.enrollCta.href} withArrow>
                {pricing.enrollCta.label}
              </Button>
            </Reveal>

            {/* Celelalte categorii: ce predăm, fără cifre pe care nu le avem
                (cerința patronului, 22.10.2026: site-ul anunță A1-D). */}
            <Reveal delay={120}>
              <div className="card mt-6 p-5">
                <h3 className="text-base font-semibold tracking-tight text-ink">
                  {pricing.other.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {pricing.other.categories.map((c) => (
                    <li
                      key={c}
                      className="chip-3d rounded-[10px] px-2 py-1 text-[13px] font-semibold leading-none text-ink"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pricing.other.text}</p>
                <a
                  href={pricing.other.cta.href}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand"
                >
                  <Phone className="size-4" strokeWidth={1.5} />
                  {pricing.other.cta.label}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{plan.name}</h3>
                <span className="text-sm text-muted">
                  {pricing.categoryLabel} {plan.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{plan.tagline}</p>

              <ul className="mt-6 border-t border-line">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 border-b border-line py-3"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                    <span className="text-sm leading-snug text-ink">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={site.phoneHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-brand"
              >
                <Phone className="size-4" strokeWidth={1.5} />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
