"use client";

import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

export function Voucher() {
  const { t } = useI18n();
  const voucher = t.voucher;
  return (
    <section className="pb-4">
      <Container>
        <Reveal>
        <div className="voucher-band relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-600 via-brand to-brand-500 px-6 py-7 shadow-pop sm:px-10 sm:py-9">
          {/* decorative glows */}
          <div className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <span className="gift-wiggle grid size-16 shrink-0 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <Gift className="size-8" />
              </span>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {voucher.badge}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {voucher.title}
                </h2>
                <p className="mt-2 max-w-xl text-[0.975rem] leading-relaxed text-white/85">
                  {voucher.text}
                </p>
              </div>
            </div>

            <Link
              href={voucher.cta.href}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 font-semibold text-brand transition-transform hover:scale-[1.03]"
            >
              {voucher.cta.label}
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
