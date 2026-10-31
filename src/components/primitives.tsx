import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { Reveal } from "./Reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={clsx("flex items-center", className)}
      aria-label="GLG Property, acasă"
    >
      <Image
        src="/logo.png"
        alt="Logo Școala Auto GLG Property"
        width={150}
        height={150}
        priority
        className="h-11 w-auto"
      />
      <span className="ml-2.5 text-[1.3rem] font-bold tracking-tight text-ink">
        GLG <span className="font-bold text-ink">PROPERTY</span>
      </span>
    </Link>
  );
}

type EyebrowProps = { children: React.ReactNode; className?: string };
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={clsx(
        "inline-block w-fit text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  subtitle,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** "h1" doar pentru titlul principal al unei subpagini (un singur h1 pe pagină). */
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={clsx(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow>
          {index ? <span className="tabular-nums text-faint">{index} / </span> : null}
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
        {accent ? <> {accent}</> : null}
        <span className="dot">.</span>
      </Heading>
      {subtitle ? (
        <p
          className={clsx(
            "text-base text-muted",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  /** "lg" doar pentru CTA-ul principal din hero: mai înalt, text mai mare, lățime completă pe mobil. */
  size?: "md" | "lg";
  className?: string;
  withArrow?: boolean;
};

/**
 * `tel:`, `mailto:` și adresele externe se randează cu <a> simplu: Link-ul lui
 * Next e pentru rute interne, iar un href cu alt protocol nu are ce căuta prin
 * router (auditul RAP-CVFM6G semnala linkul de e-mail care ducea la o eroare).
 */
function isPlainHref(href: string): boolean {
  return /^(mailto:|tel:|https?:)/.test(href);
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
}: ButtonProps) {
  const base = clsx(
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-colors duration-200",
    size === "lg" ? "h-14 w-full px-8 text-lg sm:w-auto" : "px-5 py-3 text-[0.95rem]"
  );
  const styles = {
    primary: "btn-3d text-white",
    secondary: "btn-3d-light text-ink",
    ghost: "text-brand hover:text-brand-700",
  } as const;
  const cls = clsx(base, styles[variant], className);
  const content = (
    <>
      {children}
      {withArrow ? <ArrowRight className="size-4" strokeWidth={1.5} /> : null}
    </>
  );

  if (isPlainHref(href)) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Full-width CTA used on pricing cards. Solid brand, no effects. */
export function BlockButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = clsx(
    "btn-3d flex w-full items-center justify-center gap-2 rounded-[10px] px-5 py-3.5 font-medium text-white transition-colors duration-200",
    className
  );
  const content = (
    <>
      {children}
      <ArrowRight className="size-4" strokeWidth={1.5} />
    </>
  );

  if (isPlainHref(href)) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
