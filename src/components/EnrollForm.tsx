"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Camera, FileText, ImagePlus, Loader2, X } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import {
  ENROLL_API,
  apiFieldToKey,
  pairFromOption,
  pairOptionValue,
  hourNotes,
  needsTheoryGroup,
  needsTransmission,
  NOTES_MAX,
  buildEnrollPayload,
  chosenCategories,
  emptyEnrollValues,
  interpretEnrollResponse,
  validateEnroll,
  type EnrollErrorCode,
  type EnrollErrors,
  type EnrollValues,
  type PaymentInfo,
} from "@/lib/enroll";
import { categoryCombos, categoryGroups, categoryPriceIn } from "@/lib/categories";
import { preparePhoto } from "@/lib/imageCompress";
import { LOCATION_NAMES, fillOf, isSelectable, optionsFor, type EnrollOptions, type GroupFill } from "@/lib/schedule";
import { EV, track } from "@/lib/analytics";
import { phoneDigits, phonePasteRejected, phoneTyped, samePhone } from "@/lib/phoneInput";
import { PhoneHint } from "./PhoneHint";
import { EnrollSuccess } from "./EnrollSuccess";
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

// Câmpul de text liber (mențiuni): aceleași margini și umbră ca la input, fără înălțimea fixă.
const textareaClass =
  "input-3d block min-h-[5.5rem] w-full min-w-0 max-w-full resize-y appearance-none rounded-[10px] border border-line px-3 py-2.5 text-base text-ink placeholder:text-faint outline-none transition-colors duration-200 hover:border-faint focus:border-brand sm:text-sm";

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

/**
 * Semnul „?” de lângă eticheta câmpului: explicația apare la hover (desktop)
 * și la apăsare (telefon); se închide la apăsare oriunde în afara ei.
 */
function HelpTip({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (ev: PointerEvent) => {
      if (!ref.current?.contains(ev.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    // Fără „relative” aici: explicația se așază față de câmp (Field e relative),
    // sub input, pe toată lățimea lui — altfel ar ieși din ecran pe telefon.
    <span ref={ref} className="group/help inline-flex">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "flex size-[18px] items-center justify-center rounded-full border text-[11px] font-bold leading-none transition-colors duration-150",
          open ? "border-ink bg-ink text-white" : "border-line text-muted hover:border-ink hover:text-ink"
        )}
      >
        ?
      </button>
      <span
        role="tooltip"
        className={clsx(
          "card absolute left-0 right-0 top-full z-20 mt-1 p-2.5 text-xs font-normal leading-relaxed text-ink shadow-lg",
          open ? "block" : "hidden group-hover/help:block"
        )}
      >
        {text}
      </span>
    </span>
  );
}

function Field({
  label,
  htmlFor,
  optionalLabel,
  hint,
  help,
  helpLabel,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  optionalLabel?: string;
  hint?: string;
  /** Explicația de la semnul „?” (ce scrii aici). */
  help?: string;
  helpLabel?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("group relative", className)} data-invalid={error ? "" : undefined}>
      <div className="mb-1 flex items-center gap-1.5">
        <label
          htmlFor={htmlFor}
          className={clsx(
            "block text-[13px] font-semibold text-ink transition-colors duration-150",
            !error && "group-focus-within:text-brand"
          )}
        >
          {label}
          {optionalLabel ? <span className="ml-1 font-normal text-faint">{optionalLabel}</span> : null}
        </label>
        {help ? <HelpTip text={help} label={`${helpLabel ?? "?"}: ${label}`} /> : null}
      </div>
      {children}
      {!error && hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

/** Punctul colorat al umplerii grupei (verde / galben / roșu). */
const FILL_DOT: Record<GroupFill, string> = {
  verde: "bg-emerald-500",
  galben: "bg-amber-500",
  rosu: "bg-red-500",
};

type PillOption = {
  value: string;
  label: string;
  /** Text secundar (ex. „mai sunt locuri”), afișat mai mic lângă etichetă. */
  sub?: string;
  /** Punct colorat înaintea etichetei. */
  dot?: GroupFill;
  /** Opțiune care nu se poate alege (ex. grupă plină). */
  disabled?: boolean;
};

function PillGroup({
  name,
  value,
  options,
  onChange,
  invalid,
  chips: forceChips,
}: {
  name: string;
  value: string;
  options: PillOption[];
  onChange: (v: string) => void;
  invalid?: boolean;
  /** Forțează chip-uri separate (și sub 4 opțiuni) — util când au text secundar. */
  chips?: boolean;
}) {
  // Peste 3 opțiuni, grupul compact ar ieși din coloană pe telefon: fiecare
  // opțiune devine un chip de sine stătător și rândul se poate rupe.
  const chips = forceChips || options.length > 3;
  return (
    <div
      className={clsx(
        chips
          ? "flex flex-wrap gap-2"
          : "input-3d flex h-9 w-fit overflow-hidden rounded-[10px] border",
        !chips && (invalid ? "border-red-400" : "border-line")
      )}
    >
      {options.map((o, i) => {
        const selected = value === o.value;
        return (
          <label
            key={o.value}
            aria-disabled={o.disabled || undefined}
            className={clsx(
              "flex items-center gap-2 px-3.5 text-sm font-medium transition-colors duration-200",
              o.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
              // Chip-ul selectat NU primește input-3d: gradientul lui alb ar acoperi
              // fundalul negru și textul alb ar rămâne pe alb.
              chips
                ? [
                    "h-9 rounded-[10px] border",
                    selected ? "border-ink" : ["input-3d", invalid ? "border-red-400" : "border-line"],
                  ]
                : i > 0 && "border-l border-line",
              selected ? "bg-ink text-white" : ["text-muted", !o.disabled && "hover:text-ink"]
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={selected}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.dot ? <span className={clsx("size-2.5 shrink-0 rounded-full", FILL_DOT[o.dot])} aria-hidden="true" /> : null}
            <span>
              {o.label}
              {o.sub ? <span className={clsx("ml-1.5 text-xs font-normal", selected ? "text-white/80" : "text-faint")}>· {o.sub}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/**
 * Poza buletinului (față / verso): „Fotografiază" (camera telefonului, doar
 * pe ecrane mici) sau „Alege o poză sau un PDF" (galerie / fișiere). Imaginea
 * se micșorează pe loc (lib/imageCompress.ts) și rămâne ca data URL în
 * valori, deci previzualizarea e chiar ce se trimite.
 */
function PhotoField({
  id,
  value,
  onChange,
  onError,
  labels,
}: {
  id: string;
  /** data URL (imagine jpeg sau pdf) sau "" */
  value: string;
  onChange: (dataUrl: string) => void;
  onError: (code: EnrollErrorCode) => void;
  labels: { take: string; choose: string; processing: string; change: string; remove: string; pdf: string };
}) {
  const [busy, setBusy] = useState(false);
  const chooseRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const onFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    // același fișier ales a doua oară trebuie să declanșeze iar onChange
    ev.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const res = await preparePhoto(file);
      if ("error" in res) {
        onError(res.error);
        return;
      }
      onChange(res.dataUrl);
      track(EV.pozaBuletin, { camp: id, tip: res.kind });
    } catch {
      onError("fileType");
    } finally {
      setBusy(false);
    }
  };

  const isPdf = value.startsWith("data:application/pdf");
  const btn =
    "btn-3d-light inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-3.5 text-sm font-medium text-ink transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div>
      {/* Inputurile reale, ascunse: unul cu camera (telefon), unul cu galeria / fișierele */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        onChange={onFile}
      />
      <input
        ref={chooseRef}
        id={id}
        type="file"
        accept="image/*,.pdf,application/pdf"
        className="sr-only"
        tabIndex={-1}
        onChange={onFile}
      />

      {value ? (
        <div className="flex items-center gap-3">
          {isPdf ? (
            <span className="chip-3d grid h-20 w-24 shrink-0 place-items-center rounded-[10px] text-muted">
              <span className="flex flex-col items-center gap-1 text-[11px] font-medium">
                <FileText className="size-5" strokeWidth={1.5} />
                {labels.pdf}
              </span>
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- data URL local, nu trece prin optimizatorul Next
            <img
              src={value}
              alt=""
              className="h-20 w-24 shrink-0 rounded-[10px] border border-line bg-surface object-cover"
            />
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btn} disabled={busy} onClick={() => chooseRef.current?.click()}>
              {busy ? <Loader2 className="size-4 animate-spin" strokeWidth={1.5} /> : <ImagePlus className="size-4" strokeWidth={1.5} />}
              {labels.change}
            </button>
            <button type="button" className={btn} disabled={busy} onClick={() => onChange("")}>
              <X className="size-4" strokeWidth={1.5} />
              {labels.remove}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button type="button" className={clsx(btn, "sm:hidden")} disabled={busy} onClick={() => cameraRef.current?.click()}>
            <Camera className="size-4" strokeWidth={1.5} />
            {labels.take}
          </button>
          <button type="button" className={btn} disabled={busy} onClick={() => chooseRef.current?.click()}>
            {busy ? <Loader2 className="size-4 animate-spin" strokeWidth={1.5} /> : <ImagePlus className="size-4" strokeWidth={1.5} />}
            {busy ? labels.processing : labels.choose}
          </button>
        </div>
      )}
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

type Status =
  | { phase: "idle" | "submitting" }
  /**
   * `payment` vine din răspunsul aplicației (termen + linkuri), completat local
   * dacă lipsește; `email` e adresa chiar completată, ca ecranul de succes să o
   * poată arăta (valorile formularului rămân, dar le citim o singură dată).
   */
  | { phase: "success"; duplicate: boolean; payment: PaymentInfo; email: string; twoCategories: boolean };

/**
 * Datele venite din formularul scurt al primei pagini (QuickEnroll), citite pe
 * server din adresa /inscriere?nume=…&telefon=…&sediu=… și pasate ca prop, ca
 * să fie deja în câmpuri la prima randare (fără efect, fără nepotrivire la
 * hidratare).
 */
export type EnrollPrefill = { name?: string; phone?: string; location?: string };

function withPrefill(base: EnrollValues, p?: EnrollPrefill): EnrollValues {
  const nume = (p?.name ?? "").trim().slice(0, 120);
  const telefon = phoneDigits(p?.phone).slice(0, 24);
  const sediu = (p?.location ?? "").trim();
  if (!nume && !telefon && !sediu) return base;
  // „Nume și prenume”: primul cuvânt e numele de familie, restul prenumele.
  const parts = nume.split(/\s+/).filter(Boolean);
  return {
    ...base,
    last_name: parts[0] ?? "",
    first_name: parts.slice(1).join(" "),
    phone: telefon,
    location: (LOCATION_NAMES as readonly string[]).includes(sediu) ? sediu : "",
    // Lecțiile practice: implicit la același sediu, se poate schimba în formular.
    practice_location: (LOCATION_NAMES as readonly string[]).includes(sediu) ? sediu : "",
  };
}

export function EnrollForm({
  options,
  prefill,
}: {
  options: EnrollOptions | null;
  prefill?: EnrollPrefill;
}) {
  const { t, lang } = useI18n();
  const e = t.enroll;

  const [values, setValues] = useState<EnrollValues>(() =>
    withPrefill(emptyEnrollValues(lang), prefill)
  );
  const [errors, setErrors] = useState<EnrollErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ phase: "idle" });
  const prefilled = !!(prefill?.name || prefill?.phone || prefill?.location);
  const formRef = useRef<HTMLFormElement>(null);
  const langTouched = useRef(false);
  // Analiză: „formular început” la primul câmp atins și „secțiune” la prima atingere a fiecărei secțiuni.
  const started = useRef(false);
  const sectionsSeen = useRef(new Set<string>());
  const onFieldFocus = (ev: React.FocusEvent<HTMLFormElement>) => {
    const t = ev.target as HTMLElement | null;
    if (!t || !/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) return;
    if (!started.current) {
      started.current = true;
      track(EV.formularInceput, {});
    }
    const h = t.closest("section")?.querySelector("h2")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 40) ?? "";
    if (h && !sectionsSeen.current.has(h)) {
      sectionsSeen.current.add(h);
      track(EV.formularSectiune, { sectiune: h });
    }
  };

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

  // Mobilul și telefonul unei rude nu primesc nimic peste lungimea maximă (18.11.2026): cifra în
  // plus nu intră, iar numărul lipit prea lung lasă câmpul cum era și indiciul de sub el spune de
  // ce. Regulile sunt în src/lib/phoneInput.ts. Telefonul fix rămâne la regula lui (5 până la 15 cifre).
  const [phoneLeft, setPhoneLeft] = useState<Record<string, boolean>>({});
  const [phonePasted, setPhonePasted] = useState<Record<string, number>>({});
  const leavePhone = (key: "phone" | "phone_family") => setPhoneLeft((s) => (s[key] ? s : { ...s, [key]: true }));
  const typePhone = (key: "phone" | "phone_family", raw: string) => {
    setPhonePasted((p) => ({ ...p, [key]: phonePasteRejected(values[key], raw) }));
    set(key, phoneTyped(values[key], raw));
  };

  const msg = (key: keyof EnrollValues): string | undefined => {
    const code = errors[key];
    return code ? e.errors[code] : undefined;
  };

  // Telefonul unei rude scris la fel ca mobilul: eroarea apare de cum coincid cele două numere,
  // nu abia la trimitere, și dispare când unul dintre ele e schimbat (17.11.2026). Regula e în lib/enroll.ts.
  const familySame = samePhone(values.phone, values.phone_family);
  const familyError = familySame
    ? e.errors.samePhone
    : errors.phone_family === "samePhone"
      ? undefined
      : msg("phone_family");

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
      track(EV.formularEroare, { campuri: Object.keys(clientErrors).slice(0, 8).join(","), numar: Object.keys(clientErrors).length });
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
      outcome = interpretEnrollResponse(await res.json().catch(() => null), chosenCategories(values));
    } catch {
      setBanner(e.errors.network);
      setStatus({ phase: "idle" });
      return;
    }

    switch (outcome.kind) {
      case "ok":
      case "duplicate":
        setStatus({
          phase: "success",
          duplicate: outcome.kind === "duplicate",
          payment: outcome.payment,
          email: values.email.trim(),
          // Două categorii = două cereri: ecranul de succes vorbește la plural.
          twoCategories: !!values.category2.trim() && values.category2.trim() !== values.category.trim(),
        });
        track(EV.inscriereTrimisa, { sediu: values.location, ora: values.slot, categorie: values.category, categorie2: values.category2, limba: values.language, duplicat: outcome.kind === "duplicate" });
        return;
      case "invalid": {
        const fieldErrors: EnrollErrors = {};
        for (const f of outcome.fields) {
          const key = apiFieldToKey(f);
          if (!(key in values)) continue;
          const k = key as keyof EnrollValues;
          // Codul potrivit pentru câmpurile speciale; restul: „verifică acest câmp”
          fieldErrors[k] =
            k === "contract_read" ? "contract"
            : k === "id_photo_front" || k === "id_photo_back" ? (values[k] ? "fileType" : "photoMissing")
            : k === "consent" ? "consent"
            : "checkField";
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

  /* ---------- starea de succes: verifică emailul și achită în 24 de ore ---------- */

  if (status.phase === "success") {
    return (
      <EnrollSuccess
        email={status.email}
        payment={status.payment}
        duplicate={status.duplicate}
        twoCategories={status.twoCategories}
      />
    );
  }

  const submitting = status.phase === "submitting";
  const f = e.fields;
  // Lista de categorii (13.11.2026): grupată, cu taxa de bază în fiecare etichetă. Taxa
  // ține cont de cealaltă categorie aleasă: motocicleta costă mai puțin împreună cu B, C, CE sau D.
  const catGroups = categoryGroups();
  const catPairs = categoryCombos();
  const catLabel = (key: string, other: string) => `${key} · ${categoryPriceIn(key, [key, other])} ${f.catLei}`;
  const photoLabels = {
    take: f.idPhotoTake,
    choose: f.idPhotoChoose,
    processing: f.idPhotoProcessing,
    change: f.idPhotoChange,
    remove: f.idPhotoRemove,
    pdf: f.idPhotoPdf,
  };
  // Eroare la alegerea fișierului (tip / mărime): pe câmp, fără să atingem restul.
  const photoError = (key: "id_photo_front" | "id_photo_back") => (code: EnrollErrorCode) =>
    setErrors((prev) => ({ ...prev, [key]: code }));

  // Parametrii categoriilor alese (src/lib/categories.ts): cutia de viteze
  // doar la autoturism, grupa de teorie doar la categoriile cu curs teoretic.
  const needsBox = needsTransmission(values);
  const needsTheory = needsTheoryGroup(values);
  // Categoriile care nu sunt B (19.11.2026): fără grupă de ales, doar un rând cu ora lor.
  const notes = hourNotes(values);
  const twoCats = chosenCategories(values).length > 1;
  const hourNoteList = notes.length > 0 && (
    <ul className={clsx("space-y-1 text-sm text-muted", needsTheory && "mt-3")}>
      {notes.map((n) => (
        <li key={n.category}>
          {twoCats && <span className="font-medium text-ink">{n.category}: </span>}
          {n.kind === "vineri" ? f.hourFriday : f.hourNone}
        </li>
      ))}
    </ul>
  );

  // Grupele DESCHISE la sediul ales, în limba aleasă (din aplicație, prin API).
  const groupOpts = values.location ? optionsFor(options, values.location, values.language) : [];
  const anyAtLocation = values.location ? (options?.locations.find((l) => l.name === values.location)?.options.length ?? 0) : 0;
  const noRuGroup = !!values.location && values.language === "ru" && anyAtLocation > 0 && groupOpts.length === 0;
  const noOpenGroup = !!values.location && anyAtLocation === 0;
  // Fiecare grupă vine doar cu umplerea ei, fără cifre (cerința patronului,
  // 31.10.2026): punct verde „sunt locuri”, galben „aproape finisată”, roșu
  // „ultimele locuri disponibile”. Grupele pline nu mai sunt trimise de API.
  const fillText: Record<GroupFill, string> = { verde: f.fillSpots, galben: f.fillAlmost, rosu: f.fillFull };
  const slotOptions = groupOpts.map((o) => {
    const fill = fillOf(o);
    return { value: o.id, label: lang === "ru" ? o.labelRu : o.label, dot: fill, sub: fillText[fill], disabled: !isSelectable(o) };
  });

  // Când se schimbă sediul sau limba, grupa aleasă rămâne doar dacă mai e printre opțiuni (și nu e plină).
  const keepSlotIfValid = (location: string, language: EnrollValues["language"]) => {
    const valid = optionsFor(options, location, language).some((o) => o.id === values.group_id && isSelectable(o));
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

          {prefilled ? (
            <p className="card mt-5 px-4 py-3 text-[13px] leading-relaxed text-ink">
              {e.prefillNotice}
            </p>
          ) : null}

          <form
            ref={formRef}
            onSubmit={onSubmit}
            onFocusCapture={onFieldFocus}
            noValidate
            className="mt-6 flex flex-col gap-4"
          >
            {/* 1. Date personale */}
            <FormSection n={1} title={e.sections.personal}>
              <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
                <Field label={f.lastName} help={e.help.lastName} helpLabel={e.helpLabel} htmlFor="last_name" error={msg("last_name")}>
                  <input
                    id="last_name"
                    className={inputClass(!!errors.last_name)}
                    value={values.last_name}
                    onChange={(ev) => set("last_name", ev.target.value)}
                    autoComplete="family-name"
                    maxLength={80}
                  />
                </Field>
                <Field label={f.firstName} help={e.help.firstName} helpLabel={e.helpLabel} htmlFor="first_name" error={msg("first_name")}>
                  <input
                    id="first_name"
                    className={inputClass(!!errors.first_name)}
                    value={values.first_name}
                    onChange={(ev) => set("first_name", ev.target.value)}
                    autoComplete="given-name"
                    maxLength={80}
                  />
                </Field>
                <Field label={f.idnp} help={e.help.idnp} helpLabel={e.helpLabel} htmlFor="idnp" hint={f.idnpHint} error={msg("idnp")}>
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
                <Field label={f.birthDate} help={e.help.birthDate} helpLabel={e.helpLabel} htmlFor="birth_date" error={msg("birth_date")}>
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
                <Field label={f.sex} help={e.help.sex} helpLabel={e.helpLabel} error={msg("sex")}>
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
                <Field label={f.citizenship} help={e.help.citizenship} helpLabel={e.helpLabel} htmlFor="citizenship" error={msg("citizenship")}>
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
              <Field label={f.phoneMobile} help={e.help.phoneMobile} helpLabel={e.helpLabel} htmlFor="phone" error={msg("phone")}>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass(!!errors.phone)}
                  value={values.phone}
                  onChange={(ev) => typePhone("phone", ev.target.value)}
                  onBlur={() => leavePhone("phone")}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="069000000"
                  maxLength={40}
                />
                {!msg("phone") ? (
                  <PhoneHint value={values.phone} left={!!phoneLeft.phone} pasted={phonePasted.phone} testId="phone-hint" />
                ) : null}
              </Field>
              <Field label={f.email} help={e.help.email} helpLabel={e.helpLabel} htmlFor="email" error={msg("email")}>
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
                label={f.phoneHome} help={e.help.phoneHome} helpLabel={e.helpLabel}
                htmlFor="phone_home"
                optionalLabel={e.optional}
                error={msg("phone_home")}
              >
                <input
                  id="phone_home"
                  type="tel"
                  className={inputClass(!!errors.phone_home)}
                  value={values.phone_home}
                  onChange={(ev) => set("phone_home", phoneDigits(ev.target.value))}
                  inputMode="tel"
                  maxLength={40}
                />
              </Field>
              <Field label={f.phoneFamily} help={e.help.phoneFamily} helpLabel={e.helpLabel} htmlFor="phone_family" error={familyError}>
                <input
                  id="phone_family"
                  type="tel"
                  className={inputClass(!!familyError)}
                  value={values.phone_family}
                  onChange={(ev) => typePhone("phone_family", ev.target.value)}
                  onBlur={() => leavePhone("phone_family")}
                  inputMode="tel"
                  placeholder={f.phoneFamilyPlaceholder}
                  maxLength={40}
                />
                {!familyError || (phonePasted.phone_family ?? 0) > 0 ? (
                  <PhoneHint value={values.phone_family} left={!!phoneLeft.phone_family} pasted={phonePasted.phone_family} testId="phone-family-hint" />
                ) : null}
              </Field>
            </FormSection>

            {/* 3. Domiciliul */}
            <FormSection n={3} title={e.sections.address}>
              <Field label={f.raion} help={e.help.raion} helpLabel={e.helpLabel} htmlFor="address_raion" error={msg("address_raion")}>
                <input
                  id="address_raion"
                  className={inputClass(!!errors.address_raion)}
                  value={values.address_raion}
                  onChange={(ev) => set("address_raion", ev.target.value)}
                  autoComplete="address-level1"
                  maxLength={120}
                />
              </Field>
              <Field label={f.locality} help={e.help.locality} helpLabel={e.helpLabel} htmlFor="address_locality" error={msg("address_locality")}>
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
                <Field label={f.street} help={e.help.street} helpLabel={e.helpLabel} htmlFor="address_street" optionalLabel={e.optional} error={msg("address_street")}>
                  <input
                    id="address_street"
                    className={inputClass(!!errors.address_street)}
                    value={values.address_street}
                    onChange={(ev) => set("address_street", ev.target.value)}
                    maxLength={160}
                  />
                </Field>
                <Field label={f.number} help={e.help.number} helpLabel={e.helpLabel} htmlFor="address_number" optionalLabel={e.optional} error={msg("address_number")}>
                  <input
                    id="address_number"
                    className={inputClass(!!errors.address_number)}
                    value={values.address_number}
                    onChange={(ev) => set("address_number", ev.target.value)}
                    maxLength={10}
                  />
                </Field>
                <Field label={f.apartment} help={e.help.apartment} helpLabel={e.helpLabel} htmlFor="address_apartment">
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
                <Field label={f.idSeries} help={e.help.idSeries} helpLabel={e.helpLabel} htmlFor="id_series" error={msg("id_series")}>
                  <input
                    id="id_series"
                    className={inputClass(!!errors.id_series)}
                    value={values.id_series}
                    onChange={(ev) => set("id_series", ev.target.value.toUpperCase())}
                    placeholder="A"
                    maxLength={4}
                  />
                </Field>
                <Field label={f.idNumber} help={e.help.idNumber} helpLabel={e.helpLabel} htmlFor="id_number" error={msg("id_number")}>
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
                  label={f.idIssuedDate} help={e.help.idIssuedDate} helpLabel={e.helpLabel}
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
                label={f.idIssuedBy} help={e.help.idIssuedBy} helpLabel={e.helpLabel}
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

              {/* Pozele buletinului: fața și verso-ul, amândouă obligatorii (verso-ul din 23.11.2026) */}
              <div className="border-t border-line pt-3 sm:col-span-2">
                <p className="text-[13px] font-medium text-ink">{f.idPhoto}</p>
                <p className="mt-1 text-xs text-faint">{f.idPhotoHint}</p>
              </div>
              <Field label={f.idPhotoFront} htmlFor="id_photo_front" error={msg("id_photo_front")}>
                <PhotoField
                  id="id_photo_front"
                  value={values.id_photo_front}
                  onChange={(v) => set("id_photo_front", v)}
                  onError={photoError("id_photo_front")}
                  labels={photoLabels}
                />
              </Field>
              <Field label={f.idPhotoBack} htmlFor="id_photo_back" error={msg("id_photo_back")}>
                <PhotoField
                  id="id_photo_back"
                  value={values.id_photo_back}
                  onChange={(v) => set("id_photo_back", v)}
                  onError={photoError("id_photo_back")}
                  labels={photoLabels}
                />
              </Field>

              <div className="border-t border-line pt-3 sm:col-span-2">
                <p className="text-[13px] font-medium text-muted">
                  {f.license} <span className="font-normal text-faint">{e.optional}</span>
                </p>
              </div>
              <Field label={f.licenseNumber} help={e.help.licenseNumber} helpLabel={e.helpLabel} htmlFor="license_number">
                <input
                  id="license_number"
                  className={inputClass(false)}
                  value={values.license_number}
                  onChange={(ev) => set("license_number", ev.target.value)}
                  maxLength={40}
                />
              </Field>
              <Field label={f.licenseIssued} help={e.help.licenseIssued} helpLabel={e.helpLabel} htmlFor="license_issued">
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
                label={f.sediu} help={e.help.sediu} helpLabel={e.helpLabel}
                htmlFor="location"
                error={errors.location === "noRuGroup" ? undefined : msg("location")}
              >
                <select
                  id="location"
                  className={selectClass(!!errors.location)}
                  style={selectStyle}
                  value={values.location}
                  onChange={(ev) => {
                    // Locația practicii urmează sediul de teorie cât timp nu a fost aleasă alta.
                    if (values.practice_location === "" || values.practice_location === values.location) {
                      set("practice_location", ev.target.value);
                    }
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
              <Field label={f.studyLanguage} help={e.help.studyLanguage} helpLabel={e.helpLabel} error={msg("language")}>
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
                label={f.slot} help={e.help.slot} helpLabel={e.helpLabel}
                hint={noOpenGroup || !needsTheory ? undefined : f.slotDaysHint}
                error={!needsTheory ? undefined : noRuGroup ? e.errors.noRuGroup : msg("group_id")}
              >
                {!needsTheory ? (
                  hourNoteList || <p className="text-sm text-muted">{f.noTheoryGroup}</p>
                ) : !values.location ? (
                  <p className="flex h-9 items-center text-sm text-faint">{f.slotPickSediu}</p>
                ) : noOpenGroup ? (
                  <p className="text-sm text-muted">{f.noOpenGroups}</p>
                ) : noRuGroup ? null : (
                  <>
                    <PillGroup
                      name="group_id"
                      value={values.group_id}
                      invalid={!!errors.group_id}
                      options={slotOptions}
                      chips
                      onChange={(v) => set("group_id", v)}
                    />
                    {/* Ce înseamnă culorile; numărul de locuri rămase nu se arată public. */}
                    <p className="mt-2 text-xs leading-relaxed text-faint">{f.fillLegend}</p>
                  </>
                )}
                {needsTheory && hourNoteList}
              </Field>
              <Field
                label={f.practiceLocation} help={e.help.practiceLocation} helpLabel={e.helpLabel}
                htmlFor="practice_location"
                error={msg("practice_location")}
              >
                <select
                  id="practice_location"
                  className={selectClass(!!errors.practice_location)}
                  style={selectStyle}
                  value={values.practice_location}
                  onChange={(ev) => set("practice_location", ev.target.value)}
                >
                  <option value="">{f.practiceLocationPlaceholder}</option>
                  {LOCATION_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={f.category} help={e.help.category} helpLabel={e.helpLabel} htmlFor="category" error={msg("category")}>
                <select
                  id="category"
                  className={selectClass(!!errors.category)}
                  style={selectStyle}
                  value={values.category}
                  onChange={(ev) => {
                    // O pereche din listă completează ambele câmpuri.
                    const pair = pairFromOption(ev.target.value);
                    if (pair) {
                      set("category", pair[0]);
                      set("category2", pair[1]);
                      return;
                    }
                    set("category", ev.target.value);
                    // A doua categorie nu poate fi aceeași cu prima.
                    if (values.category2 === ev.target.value) set("category2", "");
                  }}
                >
                  <optgroup label={f.catGroupCourse}>
                    {catGroups.curs.map((c) => (
                      <option key={c.key} value={c.key}>
                        {catLabel(c.key, values.category2)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={f.catGroupPair}>
                    {catPairs.map((p) => (
                      <option key={pairOptionValue(p.first.key, p.second.key)} value={pairOptionValue(p.first.key, p.second.key)}>
                        {`${p.first.key} + ${p.second.key} · ${p.firstLei} + ${p.secondLei} ${f.catLei}`}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={f.catGroupTransition}>
                    {catGroups.trecere.map((c) => (
                      <option key={c.key} value={c.key}>
                        {catLabel(c.key, values.category2)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </Field>
              {/* Două categorii deodată = două cereri (6.11.2026): aceleași opțiuni, fără cea deja aleasă. */}
              <Field label={f.category2} help={e.help.category2} helpLabel={e.helpLabel} htmlFor="category2">
                <select
                  id="category2"
                  className={selectClass(false)}
                  style={selectStyle}
                  value={values.category2}
                  onChange={(ev) => set("category2", ev.target.value)}
                >
                  <option value="">{f.category2None}</option>
                  <optgroup label={f.catGroupCourse}>
                    {catGroups.curs.filter((c) => c.key !== values.category).map((c) => (
                      <option key={c.key} value={c.key}>
                        {catLabel(c.key, values.category)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={f.catGroupTransition}>
                    {catGroups.trecere.filter((c) => c.key !== values.category).map((c) => (
                      <option key={c.key} value={c.key}>
                        {catLabel(c.key, values.category)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </Field>
              {/* Cutia de viteze: doar la autoturism; la C, D, CE și moto nu se alege (10.11.2026). */}
              {needsBox && (
                <Field label={f.transmission} help={e.help.transmission} helpLabel={e.helpLabel} error={msg("transmission")}>
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
              )}
              <Field
                label={f.workplace} help={e.help.workplace} helpLabel={e.helpLabel}
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
              <Field label={f.referral} help={e.help.referral} helpLabel={e.helpLabel} error={msg("referral")} className="sm:col-span-2">
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
              {/* Mențiuni libere (23.11.2026): de exemplu instructorul dorit. Ajung în „Mențiuni” pe cerere. */}
              <Field
                label={f.notes} help={e.help.notes} helpLabel={e.helpLabel}
                htmlFor="notes"
                optionalLabel={e.optional}
                className="sm:col-span-2"
              >
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className={textareaClass}
                  value={values.notes}
                  onChange={(ev) => set("notes", ev.target.value)}
                  placeholder={f.notesPlaceholder}
                  maxLength={NOTES_MAX}
                />
              </Field>
            </FormSection>

            {/* Contractul de studii (de citit, PDF gol) + bifa obligatorie */}
            <div className="group/section card p-4 sm:p-5" data-invalid={errors.contract_read ? "" : undefined}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-200 group-focus-within/section:text-ink">
                {e.contract.title}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{e.contract.text}</p>
              <a
                href="/api/inscriere/contract"
                target="_blank"
                rel="noopener"
                onClick={() => track(EV.contractVazut, { limba: lang })}
                className="btn-3d-light mt-3 inline-flex h-10 items-center gap-2 rounded-[10px] px-4 text-sm font-medium text-ink transition-colors duration-200"
              >
                <FileText className="size-4 text-muted" strokeWidth={1.5} />
                {e.contract.view}
              </a>
              <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={values.contract_read}
                  onChange={(ev) => set("contract_read", ev.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-brand"
                />
                <span className="text-[13px] font-medium leading-relaxed text-ink">{e.contract.agree}</span>
              </label>
              {errors.contract_read ? (
                <p className="mt-1.5 text-xs font-medium text-red-600">{e.errors.contract}</p>
              ) : null}
            </div>

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

              {/* Regula de rezervare, chiar înaintea butonului: cererea nu ține
                  locul fără achitare în 24 de ore (cerința patronului, 31.10.2026). */}
              <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-line bg-brand-50 px-3.5 py-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.5} />
                <div>
                  <p className="text-[13px] font-semibold text-ink">{e.reserveNotice.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{e.reserveNotice.text}</p>
                </div>
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
