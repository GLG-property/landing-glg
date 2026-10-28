"use client";

import Link from "next/link";
import { CalendarDays, Check, Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/content";
import type { Sediu } from "@/lib/sedii";
import { useI18n } from "@/components/LanguageProvider";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { LocalMap } from "./LocalMap";

/**
 * Pagina unui sediu (SEO local). Bilingvă prin ACELAȘI mecanism ca restul
 * site-ului: LanguageProvider pe client, o singură adresă URL, varianta RO
 * prerandată. Textele vin din src/lib/sedii.ts, componentele din primitives.
 */

const LANG_LABEL = {
  ro: { ro: "Română", ru: "Rusă" },
  ru: { ro: "Румынский", ru: "Русский" },
} as const;

const UI = {
  ro: {
    langColumn: "Limba grupei",
    daysColumn: "Zile",
    hoursColumn: "Ore",
    otherCenters: "Celelalte sedii",
    pageEyebrow: "Sediile noastre",
    scheduleEyebrow: "Orarul grupelor",
    aboutB: "Detalii despre categoria B",
    mapTitlePrefix: "Harta Google, sediul",
  },
  ru: {
    langColumn: "Язык группы",
    daysColumn: "Дни",
    hoursColumn: "Часы",
    otherCenters: "Другие филиалы",
    pageEyebrow: "Наши филиалы",
    scheduleEyebrow: "Расписание групп",
    aboutB: "Подробнее о категории B",
    mapTitlePrefix: "Карта Google, филиал",
  },
} as const;

export function SediuPage({ sediu, others }: { sediu: Sediu; others: { path: string; ro: string; ru: string }[] }) {
  const { t, lang } = useI18n();
  const c = lang === "ru" ? sediu.ru : sediu.ro;
  const ui = UI[lang];

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

          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card flex items-start gap-4 p-4">
              <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                <MapPin className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-sm text-muted">{c.addressLabel}</span>
                <span className="block text-base font-semibold tracking-tight text-ink">{c.addressValue}</span>
              </span>
            </div>
            <div className="card flex items-start gap-4 p-4">
              <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                <Clock className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-sm text-muted">{t.contact.hoursLabel}</span>
                <span className="block text-base font-semibold tracking-tight text-ink">{t.contact.hours}</span>
              </span>
            </div>
            <a href={site.phoneHref} className="card group flex items-start gap-4 p-4 transition-colors duration-200 hover:border-brand">
              <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                <Phone className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-sm text-muted">{t.contact.callUs}</span>
                <span className="block text-base font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
                  {site.phone}
                </span>
              </span>
            </a>
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

      {/* Orarul fix al cabinetelor de la acest sediu */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={ui.scheduleEyebrow} title={c.scheduleTitle} />
          <Reveal className="mt-8 overflow-hidden rounded-xl border border-line bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {ui.daysColumn}
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {ui.hoursColumn}
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {ui.langColumn}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sediu.schedule.map((row) => (
                  <tr key={`${row.days}-${row.hours}-${row.language}`} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 text-sm font-medium text-ink">
                      {lang === "ru" ? row.daysRu : row.days}
                    </td>
                    <td className="px-4 py-3 text-sm tabular-nums text-muted">{row.hours}</td>
                    <td className="px-4 py-3 text-sm text-muted">{LANG_LABEL[lang][row.language]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 max-w-2xl text-sm text-muted">{c.scheduleNote}</p>
          <div className="mt-6">
            <Button href="/inscriere" variant="secondary" withArrow>
              {t.pricing.enrollCta.label}
            </Button>
          </div>
        </Container>
      </section>

      {/* Categorii și pașii de înscriere */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading title={c.categoriesTitle} />
              <Reveal stagger className="mt-6 flex flex-col gap-3">
                {c.categories.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                    <span className="text-sm leading-relaxed text-muted">{item}</span>
                  </div>
                ))}
              </Reveal>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{c.categoriesNote}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/permis-categoria-b"
                  className="text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                >
                  {ui.aboutB}
                </Link>
              </div>
            </div>
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
          </div>
        </Container>
      </section>

      {/* Harta sediului, cu consimțământ pentru media externe */}
      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow={t.contact.eyebrow}
                title={t.contact.centersTitle}
              />
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-faint" strokeWidth={1.5} />
                  <span className="text-sm text-muted">{c.addressValue}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-faint" strokeWidth={1.5} />
                  <span className="text-sm text-muted">{t.contact.hours}</span>
                </div>
              </div>
              <div className="mt-8">
                <Eyebrow>{ui.otherCenters}</Eyebrow>
                <ul className="mt-3 flex flex-col gap-2">
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
            <Reveal delay={120}>
              <LocalMap
                query={sediu.mapQuery}
                title={`${ui.mapTitlePrefix} ${sediu.location}`}
                note={c.mapNote}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Întrebări frecvente despre sediu (sincronizate cu FAQPage din JsonLd) */}
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
