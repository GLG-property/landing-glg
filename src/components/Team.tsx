"use client";

import Image from "next/image";
import clsx from "clsx";
import type { TeamPerson } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

/** Inițialele din nume (max 2 litere), când nu sunt date explicit. */
function initialsOf(p: TeamPerson): string {
  if (p.initials) return p.initials;
  return p.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Avatarul unei persoane: fotografia, dacă există, altfel inițialele.
 * Singurul loc unde `rounded-full` e permis (avatare).
 */
function Avatar({ person, large }: { person: TeamPerson; large?: boolean }) {
  const size = large ? "size-12" : "size-10";
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={person.name}
        width={96}
        height={96}
        sizes="48px"
        className={clsx("shrink-0 rounded-full border border-line object-cover", size)}
      />
    );
  }
  return (
    <span
      className={clsx(
        "chip-3d grid shrink-0 place-items-center rounded-full font-semibold tracking-tight text-ink",
        size,
        large ? "text-sm" : "text-xs"
      )}
      aria-hidden="true"
    >
      {initialsOf(person)}
    </span>
  );
}

/** Linia verticală dintre nivelurile organigramei. */
function Connector() {
  return <span aria-hidden="true" className="mx-auto block h-6 w-px bg-line sm:h-8" />;
}

/**
 * „Echipa noastră”: organigrama școlii pe niveluri (administrație → director →
 * manageri → secretariat → echipele mari). Cine are fotografie o arată; restul,
 * inițialele.
 */
export function Team() {
  const { t } = useI18n();
  const team = t.team;

  return (
    <section id="echipa" className="scroll-mt-24 bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading
          index="06"
          eyebrow={team.eyebrow}
          title={team.title}
          accent={team.titleAccent}
          subtitle={team.subtitle}
          align="center"
        />

        <div className="mt-10">
          {/* Vârful: administrația */}
          <Reveal className="flex justify-center">
            <div className="card flex w-full max-w-sm items-center gap-4 p-4">
              <Avatar person={team.root} large />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{team.root.role}</p>
                <p className="mt-0.5 text-base font-semibold tracking-tight text-ink">{team.root.name}</p>
              </div>
            </div>
          </Reveal>

          {/* Nivelurile cu persoane: manageri, secretariat */}
          {team.levels.map((level) => (
            <div key={level.label}>
              <Connector />
              <Reveal className="text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{level.label}</span>
              </Reveal>
              <Reveal stagger className="mt-3 flex flex-wrap justify-center gap-4">
                {level.people.map((p) => (
                  <div
                    key={p.name + p.role}
                    className="card flex w-full items-center gap-3 p-4 sm:w-[calc(50%-0.5rem)] md:w-56"
                  >
                    <Avatar person={p} />
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold tracking-tight text-ink">{p.name}</p>
                      <p className="text-sm text-muted">{p.role}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          ))}

          {/* Echipele mari: doar numărul */}
          <Connector />
          <Reveal stagger className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {team.groups.map((g) => (
              <article key={g.label} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight text-ink">{g.label}</h3>
                  <span className="rounded-[10px] bg-brand-50 px-2.5 py-1 text-sm font-semibold tabular-nums text-brand">
                    {g.count}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.note}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
