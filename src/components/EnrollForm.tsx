"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import {
  ENROLL_API,
  enrollCategories,
  buildEnrollPayload,
  emptyEnrollValues,
  interpretEnrollResponse,
  validateEnroll,
  type EnrollErrors,
  type EnrollValues,
} from "@/lib/enroll";
import { LOCATION_NAMES, optionsFor, type EnrollOptions } from "@/lib/schedule";
import { EV, track } from "@/lib/analytics";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";

/* ---------- stiluri comune ---------- */

// text-base pe mobil e obligatoriu: sub 16px, iOS face zoom automat la focus.
// min-w-0 + appearance-none: input[type=date] pe iOS are o lățime intrinsecă
// mare și ar ieși din ecran fără ele.
const inputBase =
  "input-3d h-11 w-full min-w-0 max-w-full appearance-none rounded-[10px] border px-3 text-base text-ink placeholder:text-faint outline-none transition-colors duration-200 sm:h-10 sm:text-sm";
const inputOk = "border-line hover:border-faint focus:border-brand";
const inputBad = "border-red-400 focus:border-red-500";

function inputClass(invalid: boolean) {
  return clsx(inputBase, invalid ? inputBad : inputOk);
}

// Select nativ cu săgeata noastră (1px, muted) în loc de cea a browserului.
function selectClass(invalid: boolean) {
  return clsx(inputClass(invalid), "appearance-none bg-no-repeat pr-9");
}
const selectStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a626f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundPosition: "right 0.75rem center",
  backgroundSize: "1rem",
};

/* ---------- primitve de formular (la nivel de modul, ca să nu se remonteze) ---------- */

function Field({
  label,
  htmlFor,
  optionalLabel,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("group", className)} data-invalid={error ? "" : undefined}>
      <label
        htmlFor={htmlFor}
        className={clsx(
          "mb-1 block text-[13px] font-semibold text-ink transition-colors duration-150",
          !error && "group-focus-within:text-brand"
        )}
      >
        {label}
        {optionalLabel ? <span className="ml-1 font-normal text-faint">{optionalLabel}</span> : null}
      </label>
      {children}
      {!error && hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function PillGroup({
  name,
  value,
  options,
  onChange,
  invalid,
}: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  // Peste 3 opțiuni, grupul compact ar ieși din coloană pe telefon: fiecare
  // opțiune devine un chip de sine stătător și rândul se poate rupe.
  const chips = options.length > 3;
  return (
    <div
      className={clsx(
        chips
          ? "flex flex-wrap gap-2"
          : "input-3d flex h-9 w-fit overflow-hidden rounded-[10px] border",
        !chips && (invalid ? "border-red-400" : "border-line")
      )}
    >
      {options.map((o, i) => (
        <label
          key={o.value}
          className={clsx(
            "flex cursor-pointer items-center px-3.5 text-sm font-medium transition-colors duration-200",
            // Chip-ul selectat NU primește input-3d: gradientul lui alb ar acoperi
            // fundalul negru și textul alb ar rămâne pe alb.
            chips
              ? [
                  "h-9 rounded-[10px] border",
                  value === o.value ? "border-ink" : ["input-3d", invalid ? "border-red-400" : "border-line"],
                ]
              : i > 0 && "border-l border-line",
            value === o.value ? "bg-ink text-white" : "text-muted hover:text-ink"
          )}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="sr-only"
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function FormSection({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="group/section card p-4 sm:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-200 group-focus-within/section:text-ink">
        {n}. {title}
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/* ---------- formularul ---------- */

type Status = { phase: "idle" | "submitting" } | { phase: "success"; duplicate: boolean };

export function EnrollForm({ options }: { options: EnrollOptions | null }) {
  const { t, lang } = useI18n();
  const e = t.enroll;

  const [values, setValues] = useState<EnrollValues>(() => emptyEnrollValues(lang));
  const [errors, setErrors] = useState<EnrollErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ phase: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const langTouched = useRef(false);

  // Limba de studii pornește pe limba interfeței, până când omul alege singur.
  useEffect(() => {
    if (!langTouched.current) setValues((v) => ({ ...v, language: lang }));
  }, [lang]);

  // După trimitere, urcă la începutul cererii. Scroll-ul se face AICI, după ce
  // cardul de succes a înlocuit formularul înalt: dacă l-am chema în handler
  // (cu formularul lung încă în DOM), browserul, mai ales pe telefon, ne-ar
  // lăsa jos, la ce a devenit între timp finalul paginii mai scurte.
  useEffect(() => {
    if (status.phase === "success") window.scrollTo({ top: 0 });
  }, [status.phase]);

  const set = <K extends keyof EnrollValues>(key: K, value: EnrollValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const msg = (key: keyof EnrollValues): string | undefined => {
    const code = errors[key];
    return code ? e.errors[code] : undefined;
  };

  const scrollToFirstError = () => {
    setTimeout(() => {
      formRef.current
        ?.querySelector("[data-invalid]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status.phase === "submitting") return;

    const clientErrors = validateEnroll(values, options);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setBanner(e.errors.formInvalid);
      scrollToFirstError();
      return;
    }

    setErrors({});
    setBanner(null);
    setStatus({ phase: "submitting" });

    let outcome;
    try {
      const res = await fetch(ENROLL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildEnrollPayload(values)),
      });
      outcome = interpretEnrollResponse(await res.json().catch(() => null));
    } catch {
      setBanner(e.errors.network);
      setStatus({ phase: "idle" });
      return;
    }

    switch (outcome.kind) {
      case "ok":
      case "duplicate":
        setStatus({ phase: "success", duplicate: outcome.kind === "duplicate" });
        track(EV.inscriereTrimisa, { sediu: values.location, ora: values.slot, categorie: values.category, limba: values.language, duplicat: outcome.kind === "duplicate" });
        return;
      case "invalid": {
        const fieldErrors: EnrollErrors = {};
        for (const f of outcome.fields) {
          const key = f === "consent_gdpr" ? "consent" : f;
          if (key in values) fieldErrors[key as keyof EnrollValues] = "checkField";
        }
        setErrors(fieldErrors);
        setBanner(e.errors.serverInvalid);
        if (Object.keys(fieldErrors).length > 0) scrollToFirstError();
        break;
      }
      case "captcha":
        setBanner(e.errors.captcha);
        break;
      case "rate_limited":
        setBanner(e.errors.rateLimited);
        break;
      default:
        setBanner(e.errors.generic);
    }
    setStatus({ phase: "idle" });
  }

  /* ---------- starea de succes ---------- */

  if (status.phase === "success") {
    const s = e.success;
    return (
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="card mx-auto max-w-xl px-6 py-10 text-center sm:px-12 sm:py-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/10">
              <CheckCircle2 className="size-7 text-brand" strokeWidth={1.75} />
            </div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {status.duplicate ? s.duplicateTitle : s.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
              {status.duplicate ? s.duplicateText : s.text}
            </p>
            {/* Pe telefon butoanele stau unul sub altul, pe toată lățimea; pe desktop, unul lângă altul, fără text rupt pe două rânduri. */}
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <a
                href={site.phoneHref}
                className="btn-3d inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-6 text-sm font-medium text-white transition-colors duration-200"
              >
                <Phone className="size-4" strokeWidth={1.75} />
                {s.call} · {site.phone}
              </a>
              <Link
                href="/"
                className="btn-3d-light inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] px-6 text-sm font-medium text-ink transition-colors duration-200"
              >
                {s.back}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const submitting = status.phase === "submitting";
  const f = e.fields;

  // Grupele DESCHISE la sediul ales, în limba aleasă (din aplicație, prin API).
  const groupOpts = values.location ? optionsFor(options, values.location, values.language) : [];
  const anyAtLocation = values.location ? (options?.locations.find((l) => l.name === values.location)?.options.length ?? 0) : 0;
  const noRuGroup = !!values.location && values.language === "ru" && anyAtLocation > 0 && groupOpts.length === 0;
  const noOpenGroup = !!values.location && anyAtLocation === 0;
  const slotOptions = groupOpts.map((o) => ({ value: o.id, label: lang === "ru" ? o.labelRu : o.label }));

  // Când se schimbă sediul sau limba, grupa aleasă rămâne doar dacă mai e printre opțiuni.
  const keepSlotIfValid = (location: string, language: EnrollValues["language"]) => {
    const valid = optionsFor(options, location, language).some((o) => o.id === values.group_id);
    if (!valid && values.group_id) set("group_id", "");
  };

  return (
    <section className="bg-white py-8 sm:py-10">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            as="h1"
            eyebrow={e.eyebrow}
            title={e.title}
            accent={e.titleAccent}
            subtitle={e.subtitle}
          />

          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="mt-6 flex flex-col gap-4"
          >
            {/* 1. Date personale */}
            <FormSection n={1} title={e.sections.personal}>
              <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                <Field label={f.lastName} htmlFor="last_name" error={msg("last_name")}>
                  <input
                    id="last_name"
                    className={inputClass(!!errors.last_name)}
                    value={values.last_name}
                    onChange={(ev) => set("last_name", ev.target.value)}
                    autoComplete="family-name"
                    maxLength={80}
                  />
                </Field>
                <Field label={f.firstName} htmlFor="first_name" error={msg("first_name")}>
                  <input
                    id="first_name"
                    className={inputClass(!!errors.first_name)}
                    value={values.first_name}
                    onChange={(ev) => set("first_name", ev.target.value)}
                    autoComplete="given-name"
                    maxLength={80}
                  />
                </Field>
                <Field label={f.idnp} htmlFor="idnp" hint={f.idnpHint} error={msg("idnp")}>
                  <input
                    id="idnp"
                    className={inputClass(!!errors.idnp)}
                    value={values.idnp}
                    onChange={(ev) => set("idnp", ev.target.value.replace(/[^\d]/g, ""))}
                    inputMode="numeric"
                    maxLength={13}
                    placeholder="2xxxxxxxxxxxx"
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                <Field label={f.birthDate} htmlFor="birth_date" error={msg("birth_date")}>
                  <input
                    id="birth_date"
                    type="date"
                    className={inputClass(!!errors.birth_date)}
                    value={values.birth_date}
                    onChange={(ev) => set("birth_date", ev.target.value)}
                    autoComplete="bday"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </Field>
                <Field label={f.sex} error={msg("sex")}>
                  <PillGroup
                    name="sex"
                    value={values.sex}
                    invalid={!!errors.sex}
                    options={[
                      { value: "M", label: f.sexM },
                      { value: "F", label: f.sexF },
                    ]}
                    onChange={(v) => set("sex", v as EnrollValues["sex"])}
                  />
                </Field>
                <Field label={f.citizenship} htmlFor="citizenship" error={msg("citizenship")}>
                  <input
                    id="citizenship"
                    className={inputClass(!!errors.citizenship)}
                    value={values.citizenship}
                    onChange={(ev) => set("citizenship", ev.target.value)}
                    placeholder={f.citizenshipPlaceholder}
                    autoComplete="country-name"
                    maxLength={80}
                  />
                </Field>
              </div>
            </FormSection>

            {/* 2. Date de contact */}
            <FormSection n={2} title={e.sections.contact}>
              <Field label={f.phoneMobile} htmlFor="phone" error={msg("phone")}>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass(!!errors.phone)}
                  value={values.phone}
                  onChange={(ev) => set("phone", ev.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="069 xxx xxx"
                  maxLength={40}
                />
              </Field>
              <Field label={f.email} htmlFor="email" error={msg("email")}>
                <input
                  id="email"
                  type="email"
                  className={inputClass(!!errors.email)}
                  value={values.email}
                  onChange={(ev) => set("email", ev.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="nume@exemplu.md"
                  maxLength={160}
                />
              </Field>
              <Field
                label={f.phoneHome}
                htmlFor="phone_home"
                optionalLabel={e.optional}
                error={msg("phone_home")}
              >
                <input
                  id="phone_home"
                  type="tel"
                  className={inputClass(!!errors.phone_home)}
                  value={values.phone_home}
                  onChange={(ev) => set("phone_home", ev.target.value)}
                  inputMode="tel"
                  maxLength={40}
                />
              </Field>
              <Field label={f.phoneFamily} htmlFor="phone_family" optionalLabel={e.optional}>
                <input
                  id="phone_family"
                  className={inputClass(false)}
                  value={values.phone_family}
                  onChange={(ev) => set("phone_family", ev.target.value)}
                  placeholder={f.phoneFamilyPlaceholder}
                  maxLength={160}
                />
              </Field>
            </FormSection>

            {/* 3. Domiciliul */}
            <FormSection n={3} title={e.sections.address}>
              <Field label={f.raion} htmlFor="address_raion" error={msg("address_raion")}>
                <input
                  id="address_raion"
                  className={inputClass(!!errors.address_raion)}
                  value={values.address_raion}
                  onChange={(ev) => set("address_raion", ev.target.value)}
                  autoComplete="address-level1"
                  maxLength={120}
                />
              </Field>
              <Field label={f.locality} htmlFor="address_locality" error={msg("address_locality")}>
                <input
                  id="address_locality"
                  className={inputClass(!!errors.address_locality)}
                  value={values.address_locality}
                  onChange={(ev) => set("address_locality", ev.target.value)}
                  autoComplete="address-level2"
                  maxLength={120}
                />
              </Field>
              <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] gap-3 sm:col-span-2">
                <Field label={f.street} htmlFor="address_street" error={msg("address_street")}>
                  <input
                    id="address_street"
                    className={inputClass(!!errors.address_street)}
                    value={values.address_street}
                    onChange={(ev) => set("address_street", ev.target.value)}
                    maxLength={160}
                  />
                </Field>
                <Field label={f.number} htmlFor="address_number" error={msg("address_number")}>
                  <input
                    id="address_number"
                    className={inputClass(!!errors.address_number)}
                    value={values.address_number}
                    onChange={(ev) => set("address_number", ev.target.value)}
                    maxLength={10}
                  />
                </Field>
                <Field label={f.apartment} htmlFor="address_apartment">
                  <input
                    id="address_apartment"
                    className={inputClass(false)}
                    value={values.address_apartment}
                    onChange={(ev) => set("address_apartment", ev.target.value)}
                    maxLength={10}
                  />
                </Field>
              </div>
            </FormSection>

            {/* 4. Actul de identitate */}
            <FormSection n={4} title={e.sections.documents}>
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 sm:col-span-2 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)]">
                <Field label={f.idSeries} htmlFor="id_series" error={msg("id_series")}>
                  <input
                    id="id_series"
                    className={inputClass(!!errors.id_series)}
                    value={values.id_series}
                    onChange={(ev) => set("id_series", ev.target.value.toUpperCase())}
                    placeholder="A"
                    maxLength={4}
                  />
                </Field>
                <Field label={f.idNumber} htmlFor="id_number" error={msg("id_number")}>
                  <input
                    id="id_number"
                    className={inputClass(!!errors.id_number)}
                    value={values.id_number}
                    onChange={(ev) => set("id_number", ev.target.value)}
                    inputMode="numeric"
                    maxLength={20}
                  />
                </Field>
                <Field
                  label={f.idIssuedDate}
                  htmlFor="id_issued_date"
                  error={msg("id_issued_date")}
                  className="col-span-2 sm:col-span-1"
                >
                  <input
                    id="id_issued_date"
                    type="date"
                    className={inputClass(!!errors.id_issued_date)}
                    value={values.id_issued_date}
                    onChange={(ev) => set("id_issued_date", ev.target.value)}
                    max={new Date().toISOString().slice(0, 10)}
                  />
                </Field>
              </div>
              <Field
                label={f.idIssuedBy}
                htmlFor="id_issued_by"
                error={msg("id_issued_by")}
                className="sm:col-span-2"
              >
                <input
                  id="id_issued_by"
                  className={inputClass(!!errors.id_issued_by)}
                  value={values.id_issued_by}
                  onChange={(ev) => set("id_issued_by", ev.target.value)}
                  placeholder="ASP"
                  maxLength={120}
                />
              </Field>

              <div className="border-t border-line pt-3 sm:col-span-2">
                <p className="text-[13px] font-medium text-muted">
                  {f.license} <span className="font-normal text-faint">{e.optional}</span>
                </p>
              </div>
              <Field label={f.licenseNumber} htmlFor="license_number">
                <input
                  id="license_number"
                  className={inputClass(false)}
                  value={values.license_number}
                  onChange={(ev) => set("license_number", ev.target.value)}
                  maxLength={40}
                />
              </Field>
              <Field label={f.licenseIssued} htmlFor="license_issued">
                <input
                  id="license_issued"
                  className={inputClass(false)}
                  value={values.license_issued}
                  onChange={(ev) => set("license_issued", ev.target.value)}
                  placeholder={f.licenseIssuedPlaceholder}
                  maxLength={120}
                />
              </Field>
            </FormSection>

            {/* 5. Cursul dorit */}
            <FormSection n={5} title={e.sections.course}>
              {/* Grupa de teorie: sediul, apoi ora din orarul fix al sediului (depinde și de limbă) */}
              <Field
                label={f.sediu}
                htmlFor="location"
                error={errors.location === "noRuGroup" ? undefined : msg("location")}
              >
                <select
                  id="location"
                  className={selectClass(!!errors.location)}
                  style={selectStyle}
                  value={values.location}
                  onChange={(ev) => {
                    set("location", ev.target.value);
                    keepSlotIfValid(ev.target.value, values.language);
                  }}
                >
                  <option value="">{f.sediuPlaceholder}</option>
                  {LOCATION_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.studyLanguage} error={msg("language")}>
                <PillGroup
                  name="language"
                  value={values.language}
                  options={[
                    { value: "ro", label: f.langRo },
                    { value: "ru", label: f.langRu },
                  ]}
                  onChange={(v) => {
                    langTouched.current = true;
                    const language = v as EnrollValues["language"];
                    set("language", language);
                    keepSlotIfValid(values.location, language);
                    // eroarea „fără grupe în rusă" ține de perechea sediu + limbă
                    setErrors((prev) => {
                      if (prev.location !== "noRuGroup") return prev;
                      const next = { ...prev };
                      delete next.location;
                      return next;
                    });
                  }}
                />
              </Field>
              <Field
                label={f.slot}
                hint={noOpenGroup ? undefined : f.slotDaysHint}
                error={noRuGroup ? e.errors.noRuGroup : msg("group_id")}
              >
                {!values.location ? (
                  <p className="flex h-9 items-center text-sm text-faint">{f.slotPickSediu}</p>
                ) : noOpenGroup ? (
                  <p className="text-sm text-muted">{f.noOpenGroups}</p>
                ) : noRuGroup ? null : (
                  <PillGroup
                    name="group_id"
                    value={values.group_id}
                    invalid={!!errors.group_id}
                    options={slotOptions}
                    onChange={(v) => set("group_id", v)}
                  />
                )}
              </Field>
              <Field label={f.category} htmlFor="category" error={msg("category")}>
                <select
                  id="category"
                  className={selectClass(!!errors.category)}
                  style={selectStyle}
                  value={values.category}
                  onChange={(ev) => set("category", ev.target.value)}
                >
                  {enrollCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.transmission} error={msg("transmission")}>
                <PillGroup
                  name="transmission"
                  value={values.transmission}
                  invalid={!!errors.transmission}
                  options={[
                    { value: "manual", label: f.transmissionManual },
                    { value: "automatic", label: f.transmissionAuto },
                  ]}
                  onChange={(v) => set("transmission", v as EnrollValues["transmission"])}
                />
              </Field>
              <Field
                label={f.workplace}
                htmlFor="workplace"
                optionalLabel={e.optional}
                className="sm:col-span-2"
              >
                <input
                  id="workplace"
                  className={inputClass(false)}
                  value={values.workplace}
                  onChange={(ev) => set("workplace", ev.target.value)}
                  maxLength={160}
                />
              </Field>
              <Field label={f.referral} error={msg("referral")} className="sm:col-span-2">
                <PillGroup
                  name="referral"
                  value={values.referral}
                  invalid={!!errors.referral}
                  options={[
                    { value: "recomandare", label: f.referralRecommendation },
                    { value: "retele_sociale", label: f.referralSocial },
                  ]}
                  onChange={(v) => set("referral", v as EnrollValues["referral"])}
                />
              </Field>
            </FormSection>

            {/* Consimțământ + trimitere */}
            <div className="card p-4 sm:p-5">
              <div data-invalid={errors.consent ? "" : undefined}>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(ev) => set("consent", ev.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-brand"
                  />
                  <span className="text-[13px] leading-relaxed text-muted">
                    {e.consent}{" "}
                    <Link
                      href="/confidentialitate"
                      target="_blank"
                      className="font-medium text-brand transition-colors duration-200 hover:text-brand-600"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      {e.consentLinkLabel}
                    </Link>
                    {e.consentSuffix}
                  </span>
                </label>
                {errors.consent ? (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{e.errors.consent}</p>
                ) : null}
              </div>

              {banner ? (
                <div
                  role="alert"
                  className="mt-3 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  {banner}
                </div>
              ) : null}

              <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-3d inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
                      {e.submitting}
                    </>
                  ) : (
                    e.submit
                  )}
                </button>
                <p className="text-[13px] text-muted">
                  {e.callOption}{" "}
                  <a href={site.phoneHref} className="font-medium text-brand hover:text-brand-600">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
