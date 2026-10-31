"use client";

import { AlertTriangle, CalendarClock, Check, CreditCard, FileSignature, MapPin, Phone, Wallet } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/components/LanguageProvider";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { infoInscriere } from "@/lib/info-inscriere";
import type { EnrollOptions } from "@/lib/schedule";
import { Galerie } from "./Galerie";
import { GrupeLive } from "./GrupeLive";

/**
 * Pagina „Informație înscriere”: tot ce trebuie să știe un cursant înainte de
 * înscriere, în ordinea cerută de patron (31.10.2026): grupele din sistem,
 * prețul și achitarea, galeria, informația din documentele oficiale ale școlii
 * și chemarea la acțiune.
 *
 * Bilingvă prin ACELAȘI mecanism ca restul site-ului (LanguageProvider pe
 * client, o singură adresă URL, varianta RO prerandată). Textele vin din
 * src/lib/info-inscriere.ts, numărul de telefon DOAR din `site` (content.ts).
 */

const TH = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function InfoInscriere({ options }: { options: EnrollOptions | null }) {
  const { lang } = useI18n();
  const d = infoInscriere[lang];
  const p = d.price;
  const docs = d.docs;

  const summary = [
    { label: p.totalLabel, value: p.totalValue, note: p.totalNote, icon: Wallet },
    { label: p.installmentsLabel, value: p.installmentsValue, note: p.installmentsNote, icon: CreditCard },
    { label: p.reserveLabel, value: p.reserveValue, note: p.steps[1].text, icon: CalendarClock },
  ];

  return (
    <>
      {/* 0. Titlul paginii și cuprinsul scurt */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading as="h1" eyebrow={d.hero.eyebrow} title={d.hero.h1} />
          <Reveal className="mt-6 flex max-w-2xl flex-col gap-4">
            {d.hero.intro.map((para) => (
              <p key={para.slice(0, 40)} className="text-base leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <div className="mt-8">
            <Eyebrow>{d.hero.jumpLabel}</Eyebrow>
            <nav className="mt-3 flex flex-wrap gap-2">
              {[
                { href: "#grupe", label: d.jump.groups },
                { href: "#preturi", label: d.jump.price },
                { href: "#galerie", label: d.jump.gallery },
                { href: "#informatii", label: d.jump.docs },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="btn-3d-light inline-flex items-center justify-center rounded-[10px] px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/inscriere" withArrow>
              {d.cta.enroll}
            </Button>
            <a
              href={site.phoneHref}
              className="btn-3d-light inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {d.cta.call} {site.phone}
            </a>
          </div>
        </Container>
      </section>

      {/* 1. Grupele disponibile, din sistemul școlii */}
      <GrupeLive options={options} />

      {/* 2. Prețul desfășurat și procedura de achitare */}
      <section id="preturi" className="scroll-mt-28 border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />

          <Reveal stagger className="mt-8 grid gap-5 sm:grid-cols-3">
            {summary.map((s) => (
              <div key={s.label} className="card flex flex-col gap-3 p-5">
                <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-muted">
                  <s.icon className="size-4" strokeWidth={1.5} />
                </span>
                <span className="text-sm text-muted">{s.label}</span>
                <span className="text-lg font-semibold tracking-tight text-ink">{s.value}</span>
                <span className="text-[13px] leading-relaxed text-muted">{s.note}</span>
              </div>
            ))}
          </Reveal>

          <h3 className="mt-12 text-lg font-semibold tracking-tight text-ink">{p.stepsTitle}</h3>
          <Reveal stagger className="mt-5 grid gap-4 lg:grid-cols-2">
            {p.steps.map((step, i) => (
              <div key={step.title} className="card flex items-start gap-4 p-4">
                <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-sm font-semibold tabular-nums text-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold tracking-tight text-ink">{step.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted">{step.text}</span>
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal stagger className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="card flex items-start gap-4 p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-line bg-brand-50 text-brand">
                <AlertTriangle className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-base font-semibold tracking-tight text-ink">{p.ruleTitle}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">{p.ruleText}</span>
              </span>
            </div>
            <div className="card flex items-start gap-4 p-5">
              <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                <FileSignature className="size-4" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-base font-semibold tracking-tight text-ink">{p.contractTitle}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">{p.contractText}</span>
              </span>
            </div>
          </Reveal>

          <Reveal className="card mt-5 p-5">
            <h3 className="text-base font-semibold tracking-tight text-ink">{p.otherTitle}</h3>
            <p className="mt-1.5 text-sm font-medium tabular-nums text-ink">{p.otherCategories}</p>
            <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-muted">{p.otherText}</p>
            <div className="mt-4">
              <a
                href={site.phoneHref}
                className="btn-3d-light inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200"
              >
                <Phone className="size-4" strokeWidth={1.5} />
                {d.cta.call} {site.phone}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. Galerie: mașinile, parcul auto filmat, recenzii */}
      <Galerie />

      {/* 4. Informația din documentele oficiale ale școlii */}
      <section id="informatii" className="scroll-mt-28 border-t border-line py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={docs.eyebrow} title={docs.title} subtitle={docs.subtitle} />

          {/* a) Parcul auto */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold tracking-tight text-ink">{docs.fleetTitle}</h3>
            <p className="mt-1.5 text-sm text-muted">{docs.fleetNote}</p>
            <Reveal className="card mt-5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-line">
                      <th className={TH}>{docs.fleetCategoriesColumn}</th>
                      <th className={TH}>{docs.fleetVehiclesColumn}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.fleet.map((row) => (
                      <tr key={row.categories} className="border-b border-line last:border-0">
                        <td className="whitespace-nowrap px-4 py-3 align-top text-sm font-medium text-ink">
                          {row.categories}
                        </td>
                        <td className="px-4 py-3 align-top text-sm text-muted">{row.vehicles}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          {/* b) - e) Vârsta, modulele, examinarea, certificatul */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {docs.sections.map((sec) => (
              <Reveal key={sec.id} className="card flex flex-col p-5">
                <h3 className="text-base font-semibold tracking-tight text-ink">{sec.title}</h3>
                {sec.note ? <p className="mt-1 text-[13px] text-faint">{sec.note}</p> : null}
                <ul className="mt-4 flex flex-col gap-3">
                  {sec.items.map((item) => (
                    <li key={item.slice(0, 48)} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                      <span className="text-sm leading-relaxed text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* f) Sediul din documente */}
          <Reveal className="card mt-5 flex items-start gap-4 p-5">
            <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
              <MapPin className="size-4" strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-sm text-muted">{docs.officeTitle}</span>
              <span className="block text-base font-semibold tracking-tight text-ink">{docs.officeAddress}</span>
              <span className="mt-1.5 block max-w-3xl text-[13px] leading-relaxed text-muted">{docs.officeNote}</span>
            </span>
          </Reveal>
        </Container>
      </section>

      {/* Întrebări frecvente (sincronizate cu FAQPage din datele structurate) */}
      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={d.faqEyebrow} title={d.faqTitle} />
          <Reveal as="ul" stagger className="mt-8 flex max-w-3xl flex-col divide-y divide-line border-y border-line">
            {d.faq.map((item) => (
              <li key={item.q} className="py-5">
                <h3 className="text-base font-semibold tracking-tight text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* 5. Chemare la acțiune */}
      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={d.cta.eyebrow} title={d.cta.title} subtitle={d.cta.text} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/inscriere" withArrow>
              {d.cta.enroll}
            </Button>
            <a
              href={site.phoneHref}
              className="btn-3d-light inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {d.cta.call} {site.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
