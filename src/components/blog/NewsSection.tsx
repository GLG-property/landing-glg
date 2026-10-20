"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { blogDict } from "@/lib/blog/i18n";
import type { NewsItem } from "@/lib/blog/news";
import { useI18n } from "@/components/LanguageProvider";
import { Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { BlogCta } from "./BlogCta";

function formatNewsDate(iso: string, lang: "ro" | "ru"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "ro-RO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Chisinau",
  }).format(d);
}

type Props = {
  items: NewsItem[];
  /** Câte știri se afișează (implicit toate cele primite). */
  limit?: number;
  /** Afișează linkul către /blog/stiri. */
  showAllLink?: boolean;
  /** Pe pagina /blog/stiri titlul secțiunii este H1-ul paginii. */
  asPageTitle?: boolean;
  className?: string;
};

/**
 * „Noutăți din trafic”: titlu, rezumat scurt, sursă, dată, link la sursă.
 * Se ascunde complet dacă nu există nimic de afișat.
 */
export function NewsSection({
  items,
  limit,
  showAllLink = false,
  asPageTitle = false,
  className,
}: Props) {
  const { lang } = useI18n();
  const t = blogDict[lang];

  let list = items.filter((i) => i.lang === lang);
  if (list.length === 0) list = items.filter((i) => i.lang === "ro");
  if (typeof limit === "number") list = list.slice(0, limit);
  if (list.length === 0) return null;

  return (
    <section id="stiri" className={clsx("scroll-mt-24 bg-surface py-14 sm:py-20", className)}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {asPageTitle ? (
              <div className="max-w-2xl">
                <div className="animate-rise">
                  <Eyebrow>{t.news.eyebrow}</Eyebrow>
                </div>
                <h1
                  className="display animate-rise mt-4 text-balance text-4xl text-ink sm:text-5xl"
                  style={{ animationDelay: "70ms" }}
                >
                  {t.news.title} {t.news.titleAccent}
                  <span className="dot">.</span>
                </h1>
                <p
                  className="animate-rise mt-5 text-base text-muted sm:text-lg"
                  style={{ animationDelay: "140ms" }}
                >
                  {t.news.subtitle}
                </p>
              </div>
            ) : (
              <SectionHeading
                eyebrow={t.news.eyebrow}
                title={t.news.title}
                accent={t.news.titleAccent}
                subtitle={t.news.subtitle}
              />
            )}
            <Reveal as="ul" stagger className="mt-8 divide-y divide-line border-y border-line">
              {list.map((n) => (
                <li key={n.id} className="py-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-faint">
                    <span className="font-medium text-muted">{n.source}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={n.publishedAt}>{formatNewsDate(n.publishedAt, lang)}</time>
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold tracking-tight text-ink">
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="transition-colors duration-200 hover:text-brand"
                    >
                      {n.title}
                    </a>
                  </h3>
                  {n.summary ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{n.summary}</p>
                  ) : null}
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                    aria-label={`${t.news.readSource}: ${n.title}`}
                  >
                    {t.news.readSource}
                    <ExternalLink className="size-4" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </Reveal>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-faint">{t.news.disclaimer}</p>
              {showAllLink ? (
                <Link
                  href="/blog/stiri"
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                >
                  {t.news.all}
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <BlogCta variant="inline" />
          </div>
        </div>
      </Container>
    </section>
  );
}
