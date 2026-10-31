"use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, CalendarClock } from "lucide-react";
import { useI18n } from "@/components/LanguageProvider";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import {
  FIXED_SCHEDULE,
  INFO_LOCATIONS,
  formatStart,
  infoInscriere,
  seatsLeft,
  splitGroupLabel,
} from "@/lib/info-inscriere";
import { fillOf, isSelectable, optionsFor, type EnrollOptions, type GroupFill } from "@/lib/schedule";

/**
 * Grupele DESCHISE, citite din aplicația internă (GET /api/inscriere/optiuni,
 * prin proxy), grupate pe sedii. Aceleași reguli ca în formularul de înscriere:
 * `optionsFor` filtrează pe sediu și limbă, `fillOf` dă punctul colorat,
 * `isSelectable` spune dacă grupa se mai poate alege.
 *
 * `options === null` înseamnă că aplicația nu a răspuns: pagina NU crapă, arată
 * orarul FIX al sediilor (zilele și orele standard) cu mențiunea că grupele
 * chiar deschise se văd la înscriere.
 */

/** Punctul de umplere, aceleași culori ca în formularul de înscriere. */
const FILL_DOT: Record<GroupFill, string> = {
  verde: "bg-emerald-500",
  galben: "bg-amber-500",
  rosu: "bg-red-500",
};

const TH = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";
const TD = "px-4 py-3 align-top text-sm";

export function GrupeLive({ options }: { options: EnrollOptions | null }) {
  const { t, lang } = useI18n();
  const d = infoInscriere[lang];
  const g = d.groups;
  const f = t.enroll.fields;
  const fillText: Record<GroupFill, string> = {
    verde: f.fillSpots,
    galben: f.fillAlmost,
    rosu: f.fillFull,
  };
  const langLabel = { ro: g.langRo, ru: g.langRu } as const;
  const offline = options === null;

  return (
    <section id="grupe" className="scroll-mt-28 border-t border-line py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={g.eyebrow} title={offline ? g.fixedTitle : g.title} subtitle={offline ? g.offlineText : g.subtitle} />

        {offline ? (
          <Reveal className="card mt-6 flex max-w-2xl items-start gap-3 p-4">
            <CalendarClock className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.5} />
            <span className="text-[13px] leading-relaxed text-ink">{g.offlineTitle}</span>
          </Reveal>
        ) : null}

        <Reveal stagger className="mt-8 grid gap-5 lg:grid-cols-2">
          {INFO_LOCATIONS.map((loc) => {
            // Grupele sediului, în ambele limbe (română întâi, apoi rusă).
            const groups = offline
              ? []
              : [...optionsFor(options, loc.name, "ro"), ...optionsFor(options, loc.name, "ru")];
            const fixed = FIXED_SCHEDULE[loc.name] ?? [];

            return (
              <div key={loc.name} className="card flex flex-col overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5">
                  <h3 className="text-base font-semibold tracking-tight text-ink">{loc.label[lang]}</h3>
                  <Link
                    href={loc.path}
                    className="text-[13px] font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                  >
                    {g.seeSediu}
                  </Link>
                </div>

                {offline ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-line">
                          <th className={TH}>{g.daysColumn}</th>
                          <th className={TH}>{g.hoursColumn}</th>
                          <th className={TH}>{g.langColumn}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixed.map((row) => (
                          <tr key={`${row.days.ro}-${row.hours}-${row.language}`} className="border-b border-line last:border-0">
                            <td className={clsx(TD, "font-medium text-ink")}>{row.days[lang]}</td>
                            <td className={clsx(TD, "tabular-nums text-muted")}>{row.hours}</td>
                            <td className={clsx(TD, "text-muted")}>{langLabel[row.language]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : groups.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-line">
                          <th className={TH}>{g.daysColumn}</th>
                          <th className={TH}>{g.hoursColumn}</th>
                          <th className={TH}>{g.langColumn}</th>
                          <th className={TH}>{g.seatsColumn}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groups.map((o) => {
                          const fill = fillOf(o);
                          const { days, hours } = splitGroupLabel(o, lang);
                          const left = seatsLeft(o);
                          const start = formatStart(o.startDate);
                          return (
                            <tr key={o.id} className="border-b border-line last:border-0">
                              <td className={clsx(TD, "font-medium text-ink")}>
                                {days}
                                {start ? (
                                  <span className="mt-0.5 block text-[13px] font-normal text-faint">
                                    {g.startLabel} {start}
                                  </span>
                                ) : null}
                              </td>
                              <td className={clsx(TD, "tabular-nums text-muted")}>{hours}</td>
                              <td className={clsx(TD, "text-muted")}>{langLabel[o.language]}</td>
                              <td className={TD}>
                                <span className="flex items-center gap-2">
                                  <span className={clsx("size-2.5 shrink-0 rounded-full", FILL_DOT[fill])} aria-hidden="true" />
                                  <span className={isSelectable(o) ? "text-muted" : "text-faint"}>{fillText[fill]}</span>
                                </span>
                                {left !== null ? (
                                  <span className="mt-0.5 block text-[13px] tabular-nums text-faint">
                                    {left} {g.seatsLeftLabel}
                                  </span>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-4 py-5">
                    <p className="text-sm font-semibold tracking-tight text-ink">{g.emptyTitle}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{g.emptyText}</p>
                  </div>
                )}

                <div className="mt-auto border-t border-line px-4 py-3.5">
                  <Link
                    href={`/inscriere?sediu=${encodeURIComponent(loc.name)}`}
                    className="btn-3d inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200"
                  >
                    {g.enrollCta}
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
