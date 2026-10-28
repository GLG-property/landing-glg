"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import clsx from "clsx";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { TikTok, Facebook, Instagram } from "./icons";
import { useMessengers } from "./messengers";

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TikTok, href: site.social.tiktok, label: "TikTok" },
];

/**
 * Buton plutitor de contact: telefon, WhatsApp (și Telegram, dacă există cont)
 * și retelele sociale, vizibil dupa primul ecran.
 *
 * DOAR pe desktop (`hidden md:flex`): pe telefon acelasi colt e ocupat de bara
 * fixa de actiune (MobileActionBar), iar doua lucruri suprapuse acolo erau
 * exact ce semnala auditul.
 */
export function FloatingContact() {
  const { t } = useI18n();
  const messengerLinks = useMessengers("buton-plutitor");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (ev: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(ev.target as Node)) {
        setExpanded(false);
      }
    };
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setExpanded(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  return (
    <div
      ref={rootRef}
      className={clsx(
        "fixed right-4 z-30 hidden flex-col items-end gap-2 md:flex sm:right-6",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))]",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {expanded ? (
        <div className="card anim-rise-sm flex flex-col gap-0.5 rounded-[10px] p-1">
          <a
            href={site.phoneHref}
            aria-label={t.floating.call}
            className="grid size-10 place-items-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
          >
            <Phone className="size-4" strokeWidth={1.5} />
          </a>
          {messengerLinks.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={l.onClick}
              aria-label={l.label}
              className="grid size-10 place-items-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
            >
              <l.Icon className="size-4" />
            </a>
          ))}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-[8px] text-muted transition-colors duration-200 hover:bg-surface hover:text-ink"
            >
              <s.icon className="size-4" />
            </a>
          ))}
        </div>
      ) : null}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={t.floating.label}
        className="btn-3d-light grid size-12 place-items-center rounded-[10px] text-ink transition-colors duration-200"
      >
        {expanded ? (
          <X className="size-5" strokeWidth={1.5} />
        ) : (
          <Phone className="size-5" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
