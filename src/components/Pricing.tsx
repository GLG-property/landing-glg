import { Check, Sparkles, Star, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { pricing, type Plan } from "@/lib/content";
import { Container, SectionHeading, BlockButton } from "./primitives";
import { Reveal } from "./Reveal";

const badgeIcon: Record<string, LucideIcon> = {
  Premium: Star,
  Standard: Sparkles,
  Social: Tag,
};

function PlanCard({ plan }: { plan: Plan }) {
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
          Categoriile {plan.category}
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
          <BlockButton href="#contact">{plan.cta}</BlockButton>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
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
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </Reveal>
        <p className="mt-6 text-center text-sm text-muted">
          Prețurile detaliate ți le comunicăm la telefon sau direct la centru.{" "}
          <a href="#contact" className="font-semibold text-brand hover:underline">
            Contactează-ne
          </a>
        </p>
      </Container>
    </section>
  );
}
