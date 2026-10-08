"use client";

import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
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
          <div className="card flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-4">
              <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-ink">
                <Ticket className="size-4" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{voucher.title}</p>
                <p className="mt-0.5 text-sm text-muted">{voucher.text}</p>
              </div>
            </div>
            <Link
              href={voucher.cta.href}
              className="inline-flex shrink-0 items-center gap-1.5 pl-[3.25rem] text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600 sm:border-l sm:border-dashed sm:border-line sm:pl-6"
            >
              {voucher.cta.label}
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
