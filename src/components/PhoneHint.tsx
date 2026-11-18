"use client";

// Indiciul viu de sub câmpurile de telefon din formularele de înscriere (18.11.2026):
// „6 din 9 cifre”, „Numărul începe cu 0”, iar la numărul bun un punct verde de stare.
// Regulile sunt în src/lib/phoneInput.ts (copia identică a modulului din aplicație);
// aici sunt doar textele și culorile.
import clsx from "clsx";
import { phoneHint, phoneHintIsError } from "@/lib/phoneInput";
import { useI18n } from "./LanguageProvider";

const fill = (text: string, have: number, need: number) =>
  text.split("{have}").join(String(have)).split("{need}").join(String(need));

export function PhoneHint({
  value,
  left,
  pasted = 0,
  testId,
}: {
  /** Ce e scris acum în câmp. */
  value: string;
  /** Câmpul a fost părăsit măcar o dată. */
  left: boolean;
  /** Câte cifre avea numărul lipit care n-a încăput (0 = nimic de spus). */
  pasted?: number;
  testId: string;
}) {
  const { t } = useI18n();
  const s = t.enroll.phoneHint;
  // Numărul lipit prea lung nu e tăiat: câmpul a rămas cum era și spunem de ce.
  if (pasted > 0) {
    return (
      <p className="mt-1 text-[13px] font-medium text-red-600" role="alert" data-testid={testId} data-kind="pasted">
        {fill(s.pasted, pasted, 0)}
      </p>
    );
  }
  const hint = phoneHint(value);
  const template =
    hint.kind === "empty"
      ? s.empty
      : hint.kind === "noZero"
        ? s.noZero
        : hint.kind === "extraZero"
          ? s.extraZero
          : hint.kind === "long"
            ? s.long
            : hint.kind === "foreign"
              ? s.foreign
              : hint.kind === "ok" && hint.need === 15
                ? s.foreignOk
                : s.progress;
  const error = phoneHintIsError(hint, left);
  return (
    <p
      className={clsx("mt-1 flex items-center gap-1.5 text-[13px]", error ? "font-medium text-red-600" : "text-muted")}
      data-testid={testId}
      data-kind={hint.kind}
      aria-live="polite"
    >
      {hint.kind === "ok" ? <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" /> : null}
      <span>{fill(template, hint.have, hint.need)}</span>
    </p>
  );
}
