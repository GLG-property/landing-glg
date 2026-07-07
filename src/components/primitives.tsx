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
      href="#acasa"
      className={clsx("flex items-center", className)}
      aria-label="GLG Property — acasă"
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
        "inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-ink/75",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "left",
  className,
}: {
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
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display text-balance text-[2.6rem] text-ink sm:text-5xl md:text-6xl">
        {title}
        {accent ? <> {accent}</> : null}
        <span className="dot">.</span>
      </h2>
      {subtitle ? (
        <p
          className={clsx(
            "text-lg text-muted",
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
    "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[0.975rem] font-semibold transition-all duration-200 active:scale-[0.98]";
  const styles = {
    primary: "btn-shine bg-brand text-white shadow-pop hover:bg-brand-600",
    secondary: "bg-white text-ink border border-line hover:border-brand-200 hover:text-brand",
    ghost: "text-brand hover:text-brand-600",
  } as const;

  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      {children}
      {withArrow ? (
        <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}

/** Full-width blue CTA with a trailing arrow badge — used on pricing cards. */
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
        "group/btn btn-shine flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-5 py-4 font-semibold text-white transition-colors hover:bg-brand-600",
        className
      )}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-white/20 transition-transform group-hover/btn:translate-x-0.5">
        <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}
