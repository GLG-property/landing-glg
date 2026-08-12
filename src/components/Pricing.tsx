"use client";

import { Check, Phone, Sparkles, Star, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { site, type Plan } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading, BlockButton } from "./primitives";
import { Reveal } from "./Reveal";

const badgeIcon: Record<string, LucideIcon> = {
  Premium: Star,
  Standard: Sparkles,
  Social: Tag,
};

function PlanCard({ plan, categoryLabel }: { plan: Plan; categoryLabel: string }) {
  const Icon = badgeIcon[plan.name] ?? Star;
  return (
    <div
      className={clsx(
        "flex flex-col rounded-[1.65rem] border-2 bg-surface p-2 transition-all duration-300",
        plan.featured
          ? "border-animated shadow-pop"
          : "border-animated-hover border-brand-200 hover:-translate-y-1 hover:shadow-card"
      )}
    >
      {/* header strip */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <h3 className="text-[1.35rem] font-semibold tracking-tight text-ink">{plan.name}</h3>
        {plan.badge ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[0.8rem] font-semibold text-brand">
            <Icon className="size-3.5" />
            {plan.badge}
          </span>
        ) : null}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col rounded-[1.35rem] bg-white p-5 sm:p-6">
        <p className="text-[0.975rem] text-muted">{plan.tagline}</p>
        <span className="mt-4 inline-flex w-fit items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">
          {categoryLabel} {plan.category}
        </span>

        <hr className="my-5 border-line" />

        <ul className="flex flex-1 flex-col gap-3.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className="text-[0.925rem] leading-snug text-ink/90">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <BlockButton href={site.phoneHref}>
            <Phone className="size-4" />
            {site.phone}
          </BlockButton>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const { t } = useI18n();
  const pricing = t.pricing;
  return (
    <section id="preturi" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          accent={pricing.titleAccent}
          subtitle={pricing.subtitle}
        />
        <Reveal stagger className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} categoryLabel={pricing.categoryLabel} />
          ))}
        </Reveal>
        <p className="mt-6 text-center text-sm text-muted">
          {pricing.note}{" "}
          <a href={pricing.noteCta.href} className="font-semibold text-brand hover:underline">
            {pricing.noteCta.label}
          </a>
        </p>
      </Container>
    </section>
  );
}
