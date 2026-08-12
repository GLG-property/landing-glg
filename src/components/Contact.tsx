"use client";

import { Phone, Clock, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "./LanguageProvider";
import { Container, SectionHeading, BlockButton } from "./primitives";
import { TikTok, Facebook, Instagram } from "./icons";
import { Reveal } from "./Reveal";

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TikTok, href: site.social.tiktok, label: "TikTok" },
];

export function Contact() {
  const { t } = useI18n();
  const contact = t.contact;
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — details */}
          <div>
            <SectionHeading
              eyebrow={contact.eyebrow}
              title={contact.title}
              accent={contact.titleAccent}
              subtitle={contact.subtitle}
            />

            <Reveal stagger className="mt-9 flex flex-col gap-4">
              <a
                href={site.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand-200"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand text-white">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{contact.callUs}</span>
                  <span className="block text-lg font-semibold text-ink group-hover:text-brand">
                    {site.phone}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand">
                  <Clock className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">{contact.hoursLabel}</span>
                  <span className="block text-lg font-semibold text-ink">{contact.hours}</span>
                </span>
              </div>
            </Reveal>

            <div className="mt-6">
              <span className="text-sm font-semibold text-muted">{contact.followUs}</span>
              <div className="mt-3 flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <s.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — stylized locations card */}
          <Reveal delay={120} className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
            {/* map-like header */}
            <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-600 via-brand to-brand-500">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
              <span className="animate-float absolute left-[22%] top-[38%] grid size-9 place-items-center rounded-full bg-white text-brand shadow-lg">
                <MapPin className="size-5" />
              </span>
              <span
                className="animate-float absolute left-[58%] top-[30%] grid size-9 place-items-center rounded-full bg-white text-brand shadow-lg"
                style={{ animationDelay: "1.4s" }}
              >
                <MapPin className="size-5" />
              </span>
              <span
                className="animate-float absolute left-[74%] top-[62%] grid size-9 place-items-center rounded-full bg-white text-brand shadow-lg"
                style={{ animationDelay: "2.8s" }}
              >
                <MapPin className="size-5" />
              </span>
              <span className="absolute bottom-4 left-6 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
                {contact.mapBadge}
              </span>
            </div>

            {/* list */}
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ink">{contact.centersTitle}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {contact.sectors.map((sector) => (
                  <li key={sector} className="flex items-center gap-3 text-ink">
                    <span className="grid size-8 place-items-center rounded-lg bg-brand-50 text-brand">
                      <MapPin className="size-4" />
                    </span>
                    <span className="font-medium">{sector}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <BlockButton href={site.phoneHref}>{contact.callNow} · {site.phone}</BlockButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
