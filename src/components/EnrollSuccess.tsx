"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ExternalLink,
  MailCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { site } from "@/lib/content";
import type { PaymentInfo } from "@/lib/enroll";
import { formatDueAt, remainingUntil } from "@/lib/plata";
import { EV, track } from "@/lib/analytics";
import { useI18n } from "./LanguageProvider";
import { Container } from "./primitives";

/**
 * Ecranul de după trimiterea cererii (cerința patronului, 31.10.2026).
 *
 * Omul trebuie să plece de aici cu un singur lucru în cap: are 24 de ore ca să
 * achite, altfel cererea nu îi mai ține locul în grupă. Ordinea e fixă:
 * verifică emailul, termenul exact cu contor, cele două butoane de plată,
 * varianta „vin la sediu”, verificarea plății de către un angajat și ce se
 * întâmplă dacă nu achită.
 *
 * ATENȚIE: emailul poate întârzia sau poate să nu plece deloc (cheia
 * serviciului de email). De aceea linkurile de plată stau AICI, pe ecran, nu
 * doar în email.
 *
 * Componentă separată de formular ca să-și țină singură contorul (hook-ul de
 * tic nu are ce căuta în formularul lung, care se demontează la succes).
 */
export function EnrollSuccess({
  email,
  payment,
  duplicate,
}: {
  /** Adresa la care au fost trimise linkurile (din valorile formularului). */
  email: string;
  payment: PaymentInfo;
  duplicate: boolean;
}) {
  const { t, lang } = useI18n();
  const s = t.enroll.success;

  // Contorul discret: se recalculează din dată, nu din scăderi succesive, deci
  // rămâne corect și dacă fila a stat în fundal.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const dueLabel = formatDueAt(payment.dueAt, lang, s.deadlineTimeWord);
  const left = remainingUntil(payment.dueAt, now);
  const countdown = left
    ? `${s.countdownPrefix} ${left.hours} ${s.hoursShort} ${left.minutes} ${s.minutesShort}`
    : s.countdownExpired;

  const payBtn =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] px-5 text-[0.95rem] font-medium transition-colors duration-200";

  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* 1. Verifică emailul (sau, la cerere dublă, de ce nu trebuie retrimisă) */}
          <div className="text-center">
            <span className="chip-3d mx-auto grid size-12 place-items-center rounded-[10px] text-brand">
              <MailCheck className="size-6" strokeWidth={1.5} />
            </span>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {duplicate ? s.duplicateTitle : s.title}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
              {duplicate ? s.duplicateText : s.text}
            </p>
            {!duplicate && email ? (
              <p className="mt-4 text-sm text-muted">
                {s.sentTo}{" "}
                <span className="font-semibold text-ink">{email}</span>
              </p>
            ) : null}
            {!duplicate ? (
              <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-faint">
                {s.noEmail}
              </p>
            ) : null}
          </div>

          {/* 2. Termenul: locul se rezervă doar după achitare */}
          <div className="card mt-8 flex items-start gap-4 p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-line bg-brand-50 text-brand">
              <AlertTriangle className="size-4" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-ink">{s.deadlineTitle}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.deadlineText}</p>
              <p className="mt-3 text-sm font-semibold text-ink">
                {s.deadlinePrefix} {dueLabel}
              </p>
              <p className="mt-1 text-xs tabular-nums text-faint">{countdown}</p>
            </div>
          </div>

          {/* 3. Cele două butoane de plată, filă nouă */}
          <div className="card mt-4 p-5">
            <h2 className="text-base font-semibold tracking-tight text-ink">{s.payTitle}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <a
                  href={payment.links.reserve}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track(EV.plata500, { duplicat: duplicate })}
                  className={`btn-3d text-white ${payBtn}`}
                >
                  {s.payReserve}
                  <ExternalLink className="size-4" strokeWidth={1.5} />
                </a>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.payReserveNote}</p>
              </div>
              <div className="flex flex-col">
                <a
                  href={payment.links.full}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track(EV.plata3500, { duplicat: duplicate })}
                  className={`btn-3d-light text-ink ${payBtn}`}
                >
                  {s.payFull}
                  <ExternalLink className="size-4" strokeWidth={1.5} />
                </a>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.payFullNote}</p>
              </div>
            </div>
          </div>

          {/* 4. Sau vino la sediu, în același termen */}
          <div className="card mt-4 flex items-start gap-4 p-5">
            <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
              <Building2 className="size-4" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-ink">{s.officeTitle}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.officeText}</p>
              <Link
                href="/#contact"
                onClick={() => track(EV.plataSediu, {})}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
              >
                {s.officeCta}
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* 5. Plata o verifică un angajat. 6. Ce se întâmplă dacă nu achiți. */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="card flex flex-col p-5">
              <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-muted">
                <ShieldCheck className="size-4" strokeWidth={1.5} />
              </span>
              <h2 className="mt-4 text-base font-semibold tracking-tight text-ink">
                {s.verifyTitle}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.verifyText}</p>
            </div>
            <div className="card flex flex-col p-5">
              <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-muted">
                <AlertTriangle className="size-4" strokeWidth={1.5} />
              </span>
              <h2 className="mt-4 text-base font-semibold tracking-tight text-ink">
                {s.missedTitle}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.missedText}</p>
            </div>
          </div>

          {/* Întrebări: telefonul școlii, apoi întoarcerea pe prima pagină */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href={site.phoneHref}
              className="btn-3d-light inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-6 text-sm font-medium text-ink transition-colors duration-200"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              {s.call} · {site.phone}
            </a>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] px-6 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {s.back}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
