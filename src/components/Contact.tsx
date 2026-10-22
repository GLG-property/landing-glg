"use client";

import { useEffect, useState } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading } from "./primitives";
import { TikTok, Facebook, Instagram } from "./icons";
import { Reveal } from "./Reveal";
import {
  CONSENT_CHANGE_EVENT,
  readCookieConsent,
  writeCookieConsent,
} from "./CookieConsent";

// hl forces the embed UI language to match the page language instead of the browser locale
const mapEmbedUrl = (lang: string) =>
  `https://www.google.com/maps?q=Scoala%20Auto%20GLG%20Property%20Chisinau&output=embed&hl=${lang}`;

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TikTok, href: site.social.tiktok, label: "TikTok" },
];

export function Contact() {
  const { t, lang } = useI18n();
  const contact = t.contact;
  const [mapAllowed, setMapAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setMapAllowed(readCookieConsent()?.media === true);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);
  return (
    <section id="contact" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Details */}
          <div>
            <SectionHeading
              index="07"
              eyebrow={contact.eyebrow}
              title={contact.title}
              accent={contact.titleAccent}
              subtitle={contact.subtitle}
            />

            <Reveal stagger className="mt-8 flex flex-col gap-4">
              <a
                href={site.phoneHref}
                className="card group flex items-center gap-4 p-4 transition-colors duration-200 hover:border-brand"
              >
                <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                  <Phone className="size-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm text-muted">{contact.callUs}</span>
                  <span className="block text-base font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-brand">
                    {site.phone}
                  </span>
                </span>
              </a>

              <div className="card flex items-center gap-4 p-4">
                <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-muted">
                  <Clock className="size-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm text-muted">{contact.hoursLabel}</span>
                  <span className="block text-base font-semibold tracking-tight text-ink">
                    {contact.hours}
                  </span>
                </span>
              </div>
            </Reveal>

            <div className="mt-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {contact.followUs}
              </span>
              <div className="mt-3 flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="btn-3d-light grid size-10 place-items-center rounded-[10px] text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map and centers */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              {mapAllowed ? (
                <iframe
                  src={mapEmbedUrl(lang)}
                  title={contact.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block h-[300px] w-full border-0 sm:h-[400px]"
                />
              ) : (
                <div className="flex h-[300px] w-full flex-col items-center justify-center gap-4 px-8 text-center sm:h-[400px]">
                  <MapPin className="size-5 text-faint" strokeWidth={1.5} />
                  <p className="max-w-sm text-sm text-muted">{contact.mapConsentText}</p>
                  <button
                    onClick={() => writeCookieConsent({ media: true })}
                    className="btn-3d-light inline-flex h-10 items-center justify-center rounded-[10px] px-5 text-sm font-medium text-ink transition-colors duration-200"
                  >
                    {contact.mapConsentCta}
                  </button>
                </div>
              )}
            </div>
            <div className="mt-5">
              <h3 className="text-base font-semibold tracking-tight text-ink">
                {contact.centersTitle}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {contact.sectors.map((sector) => (
                  <li key={sector} className="flex items-center gap-2 text-sm text-muted">
                    <MapPin className="size-4 text-faint" strokeWidth={1.5} />
                    <span>{sector}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
