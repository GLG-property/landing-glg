"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import { blogDict } from "@/lib/blog/i18n";
import { useI18n } from "@/components/LanguageProvider";
import { Button, Eyebrow } from "@/components/primitives";

type Props = {
  /**
   * card: bloc complet (listă de articole, final de articol)
   * inline: bloc compact în corpul articolului
   * compact: un singur rând, lângă știri
   */
  variant?: "card" | "inline" | "compact";
  className?: string;
};

/** CTA reutilizabil „Înscrie-te la școala auto”, în stilul site-ului. */
export function BlogCta({ variant = "card", className }: Props) {
  const { lang } = useI18n();
  const t = blogDict[lang].cta;

  if (variant === "compact") {
    return (
      <div
        className={clsx(
          "card flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        <p className="text-sm font-medium text-ink">{t.short}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/inscriere"
            className="btn-3d inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
          >
            {t.shortButton}
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
          <a
            href={site.phoneHref}
            className="btn-3d-light inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium text-ink transition-colors duration-200"
          >
            <Phone className="size-4 text-muted" strokeWidth={1.5} />
            {site.phone}
          </a>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <aside
        aria-label={t.eyebrow}
        className={clsx("card flex flex-col gap-4 p-5 sm:p-6", className)}
      >
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{t.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button href="/inscriere" withArrow className="sm:w-auto">
            {t.button}
          </Button>
          <Button href={site.phoneHref} variant="secondary">
            <Phone className="size-4 text-muted" strokeWidth={1.5} />
            {site.phone}
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label={t.eyebrow}
      className={clsx(
        "card flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="max-w-xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
          {t.title}
          <span className="dot">.</span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.text}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
        <Button href="/inscriere" withArrow>
          {t.button}
        </Button>
        <Button href={site.phoneHref} variant="secondary">
          <Phone className="size-4 text-muted" strokeWidth={1.5} />
          {site.phone}
        </Button>
      </div>
    </aside>
  );
}
