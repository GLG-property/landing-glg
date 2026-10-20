"use client";

import Link from "next/link";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

/** Linkuri inline în text, notația [text](href) din content.ts. */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push(
      <Link
        key={`${match[2]}-${index}`}
        href={match[2]}
        className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
      >
        {match[1]}
      </Link>
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Secțiune locală SEO: „Școală auto în Chișinău", cum obții permisul categoria B. */
export function CityGuide() {
  const { t } = useI18n();
  const guide = t.guide;
  return (
    <section id="permis" className="scroll-mt-24 border-t border-line py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            index="07"
            eyebrow={guide.eyebrow}
            title={guide.title}
            accent={guide.titleAccent}
          />
          <Reveal className="flex max-w-2xl flex-col gap-5">
            {guide.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
                {renderInline(p)}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
