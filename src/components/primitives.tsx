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
        alt=""
        width={150}
        height={150}
        priority
        className="h-11 w-auto"
      />
      <span className="ml-2.5 text-[1.15rem] font-semibold tracking-tight text-ink">
        GLG <span className="font-normal text-muted">Property</span>
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
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
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
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
        {accent ? <> {accent}</> : null}
        <span className="dot">.</span>
      </h2>
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
  className?: string;
  withArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  withArrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200";
  const styles = {
    primary: "btn-3d text-white",
    secondary: "btn-3d-light text-ink",
    ghost: "text-brand hover:text-brand-700",
  } as const;

  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      {children}
      {withArrow ? <ArrowRight className="size-4" strokeWidth={1.5} /> : null}
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
  return (
    <Link
      href={href}
      className={clsx(
        "btn-3d flex w-full items-center justify-center gap-2 rounded-[10px] px-5 py-3.5 font-medium text-white transition-colors duration-200",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4" strokeWidth={1.5} />
    </Link>
  );
}
