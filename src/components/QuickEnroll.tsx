"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import { LOCATION_NAMES } from "@/lib/schedule";
import { EV, track } from "@/lib/analytics";
import { phoneDigits } from "@/lib/phoneInput";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Formularul SCURT de pe prima pagină: nume, telefon, sediu + acordul GDPR.
 *
 * De ce nu trimite el cererea: cererea-contract pe care o primește aplicația
 * internă are câmpuri obligatorii (IDNP, actul de identitate, poza buletinului,
 * contractul citit), iar site-ul nu are nicio cale proprie de e-mail
 * (containerul `landing` din docker-compose.app.yml nu are RESEND_API_KEY și
 * nici SMTP). Un POST „rapid" ar trebui deci să arunce datele, ceea ce e mai
 * rău decât nimic. Așa că formularul le DUCE cu el: trimite omul pe /inscriere
 * cu nume, telefon și sediu în adresă, iar formularul mare le preia și le
 * completează (vezi EnrollForm, efectul de precompletare).
 */

const inputBase =
  "input-3d h-11 w-full min-w-0 appearance-none rounded-[10px] border px-3 text-base text-ink placeholder:text-faint outline-none transition-colors duration-200 sm:h-10 sm:text-sm";

function inputClass(invalid: boolean) {
  return clsx(inputBase, invalid ? "border-red-400 focus:border-red-500" : "border-line hover:border-faint focus:border-brand");
}

const selectStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a626f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundPosition: "right 0.75rem center",
  backgroundSize: "1rem",
  backgroundRepeat: "no-repeat",
};

type Errors = { name?: string; phone?: string; sediu?: string; consent?: string };

export function QuickEnroll() {
  const { t } = useI18n();
  const q = t.quick;
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sediu, setSediu] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clear = (key: keyof Errors) =>
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 3) next.name = q.errors.name;
    if (phone.replace(/\D/g, "").length < 8) next.phone = q.errors.phone;
    if (!sediu) next.sediu = q.errors.sediu;
    if (!consent) next.consent = q.errors.consent;

    setErrors(next);
    if (Object.keys(next).length > 0) {
      track(EV.cerereRapidaEroare, { campuri: Object.keys(next).join(",") });
      return;
    }

    track(EV.cerereRapida, { sediu });
    const params = new URLSearchParams({
      nume: name.trim(),
      telefon: phone.trim(),
      sediu,
    });
    router.push(`/inscriere?${params.toString()}`);
  }

  return (
    <section id="cerere" className="scroll-mt-24 bg-surface py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={q.eyebrow}
              title={q.title}
              accent={q.titleAccent}
              subtitle={q.subtitle}
            />
            <a
              href={site.phoneHref}
              className="card mt-8 inline-flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:border-faint"
            >
              <span className="chip-3d grid size-9 place-items-center rounded-[10px] text-ink">
                <Phone className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-left">
                <span className="block text-sm text-muted">{q.callLabel}</span>
                <span className="block font-semibold text-ink">{site.phone}</span>
              </span>
            </a>
          </div>

          <Reveal>
            <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="quick-name" className="mb-1 block text-[13px] font-semibold text-ink">
                    {q.name}
                  </label>
                  <input
                    id="quick-name"
                    className={inputClass(!!errors.name)}
                    value={name}
                    onChange={(ev) => {
                      setName(ev.target.value);
                      clear("name");
                    }}
                    placeholder={q.namePlaceholder}
                    autoComplete="name"
                    maxLength={120}
                  />
                  {errors.name ? (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="quick-phone" className="mb-1 block text-[13px] font-semibold text-ink">
                    {q.phone}
                  </label>
                  <input
                    id="quick-phone"
                    type="tel"
                    inputMode="tel"
                    className={inputClass(!!errors.phone)}
                    value={phone}
                    onChange={(ev) => {
                      setPhone(phoneDigits(ev.target.value));
                      clear("phone");
                    }}
                    placeholder={q.phonePlaceholder}
                    autoComplete="tel"
                    maxLength={24}
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="quick-sediu" className="mb-1 block text-[13px] font-semibold text-ink">
                    {q.sediu}
                  </label>
                  <select
                    id="quick-sediu"
                    className={clsx(inputClass(!!errors.sediu), "pr-9")}
                    style={selectStyle}
                    value={sediu}
                    onChange={(ev) => {
                      setSediu(ev.target.value);
                      clear("sediu");
                    }}
                  >
                    <option value="">{q.sediuPlaceholder}</option>
                    {LOCATION_NAMES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {errors.sediu ? (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.sediu}</p>
                  ) : null}
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(ev) => {
                    setConsent(ev.target.checked);
                    clear("consent");
                  }}
                  className="mt-0.5 size-4 shrink-0 accent-brand"
                />
                <span className="text-[13px] leading-snug text-muted">
                  {q.consent}{" "}
                  <Link
                    href="/confidentialitate"
                    className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                  >
                    {q.consentLinkLabel}
                  </Link>
                  {q.consentSuffix}
                </span>
              </label>
              {errors.consent ? (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.consent}</p>
              ) : null}

              <button
                type="submit"
                className="btn-3d mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[10px] text-base font-medium text-white transition-colors duration-200"
              >
                {q.submit}
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
              <p className="mt-3 text-xs leading-relaxed text-faint">{q.note}</p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
