"use client";

import { useI18n } from "@/components/LanguageProvider";
import { Container, SectionHeading } from "@/components/primitives";

export function PrivacyClient() {
  const { t } = useI18n();
  const privacy = t.privacy;
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={privacy.title} />
        <div className="mt-2 max-w-2xl">
          <p className="text-sm text-faint">{privacy.updated}</p>
          {privacy.sections.map((s) => (
            <div key={s.h} className="mt-8">
              <h2 className="text-base font-semibold tracking-tight text-ink">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.p}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
