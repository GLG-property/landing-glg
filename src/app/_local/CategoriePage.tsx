"use client";

import Link from "next/link";
import { BookOpen, Check, Clock, Phone, ShieldCheck } from "lucide-react";
import { site } from "@/lib/content";
import type { Categorie } from "@/lib/categorii";
import { getPost } from "@/lib/blog/posts";
import { useI18n } from "@/components/LanguageProvider";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

/**
 * Pagina unei categorii de permis. Bilingvă prin LanguageProvider (o singură
 * adresă URL, varianta RO prerandată), textele din src/lib/categorii.ts, iar
 * ghidul detaliat este articolul de blog existent (importat, nemodificat).
 */

const UI = {
  ro: { pageEyebrow: "Categorii de permis", centers: "Unde se ține cursul", otherCats: "Celelalte categorii" },
  ru: { pageEyebrow: "Категории прав", centers: "Где проходит курс", otherCats: "Другие категории" },
} as const;

type CrossLink = { path: string; ro: string; ru: string };

export function CategoriePage({
  categorie,
  others,
  sedii: sediiLinks,
}: {
  categorie: Categorie;
  others: CrossLink[];
  sedii: CrossLink[];
}) {
  const { t, lang } = useI18n();
  const c = lang === "ru" ? categorie.ru : categorie.ro;
  const ui = UI[lang];
  const post = getPost(categorie.blogSlug);
  const postTitle = post ? (lang === "ru" ? post.ru.title : post.ro.title) : null;

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading as="h1" eyebrow={ui.pageEyebrow} title={c.h1} />

          <Reveal className="mt-6 flex max-w-2xl flex-col gap-4">
            {c.intro.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/inscriere" withArrow>
              {c.cta}
            </Button>
            <a
              href={site.phoneHref}
              className="btn-3d-light inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {c.callCta}
            </a>
          </div>
        </Container>
      </section>

      {/* Ce include cursul */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading title={c.includesTitle} />
          <Reveal stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.includes.map((item) => (
              <div key={item} className="card flex items-start gap-3 p-4">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                <span className="text-sm leading-relaxed text-muted">{item}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Durata și condițiile legale de vârstă */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                  <Clock className="size-4" strokeWidth={1.5} />
                </span>
                <h2 className="text-lg font-semibold tracking-tight text-ink">{c.durationTitle}</h2>
              </div>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{c.duration}</p>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                  <ShieldCheck className="size-4" strokeWidth={1.5} />
                </span>
                <h2 className="text-lg font-semibold tracking-tight text-ink">{c.agesTitle}</h2>
              </div>
              <Reveal stagger className="mt-4 flex flex-col gap-3">
                {c.ages.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                    <span className="text-sm leading-relaxed text-muted">{item}</span>
                  </div>
                ))}
              </Reveal>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-faint">{c.agesNote}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pașii de înscriere, ghidul din blog și sediile */}
      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading title={c.stepsTitle} />
              <Reveal stagger className="mt-6 flex flex-col gap-4">
                {c.steps.map((step, i) => (
                  <div key={step} className="card flex items-start gap-4 p-4">
                    <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-sm font-semibold tabular-nums text-ink">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{step}</span>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <div className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                    <BookOpen className="size-4" strokeWidth={1.5} />
                  </span>
                  <h2 className="text-base font-semibold tracking-tight text-ink">{c.guideTitle}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.guideText}</p>
                {postTitle ? (
                  <Link
                    href={`/blog/${categorie.blogSlug}`}
                    className="mt-4 inline-flex text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                  >
                    {c.guideCta}
                  </Link>
                ) : null}
              </div>

              <div>
                <Eyebrow>{ui.centers}</Eyebrow>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {sediiLinks.map((s) => (
                    <li key={s.path}>
                      <Link
                        href={s.path}
                        className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                      >
                        {lang === "ru" ? s.ru : s.ro}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>{ui.otherCats}</Eyebrow>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {others.map((o) => (
                    <li key={o.path}>
                      <Link
                        href={o.path}
                        className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                      >
                        {lang === "ru" ? o.ru : o.ro}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Întrebări frecvente (sincronizate cu FAQPage din JsonLd) */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.faq.eyebrow} title={c.faqTitle} />
          <Reveal as="ul" stagger className="mt-8 flex max-w-3xl flex-col divide-y divide-line border-y border-line">
            {c.faq.map((item) => (
              <li key={item.q} className="py-5">
                <h3 className="text-base font-semibold tracking-tight text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </li>
            ))}
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/inscriere" withArrow>
              {c.cta}
            </Button>
            <a
              href={site.phoneHref}
              className="btn-3d-light inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {c.callCta}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
