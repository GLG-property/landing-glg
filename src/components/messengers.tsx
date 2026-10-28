"use client";

import type { ComponentType } from "react";
import { messengers, whatsappHref } from "@/lib/content";
import { EV, track } from "@/lib/analytics";
import { useI18n } from "./LanguageProvider";
import { Telegram, WhatsApp } from "./icons";

export type MessengerLink = {
  key: "whatsapp" | "telegram";
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  onClick: () => void;
};

/**
 * Linkurile de mesagerie, cu mesajul deja scris în limba paginii și cu
 * urmărire în Umami. Telegram apare doar dacă există un cont public
 * configurat în `messengers.telegram` (vezi src/lib/content.ts). Altfel
 * butonul lipsește, ca să nu ducem omul la un link mort.
 *
 * `zona` ajunge în evenimentul de analiză: antet, bara de mobil, contact,
 * butonul plutitor.
 */
export function useMessengers(zona: string): MessengerLink[] {
  const { t } = useI18n();
  const m = t.messengers;
  const links: MessengerLink[] = [
    {
      key: "whatsapp",
      label: m.whatsapp,
      href: whatsappHref(m.whatsappText),
      Icon: WhatsApp,
      onClick: () => track(EV.whatsapp, { zona }),
    },
  ];
  if (messengers.telegram) {
    links.push({
      key: "telegram",
      label: m.telegram,
      href: messengers.telegram,
      Icon: Telegram,
      onClick: () => track(EV.telegram, { zona }),
    });
  }
  return links;
}
