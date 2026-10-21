"use client";

import { useEffect } from "react";
import { EV, track } from "@/lib/analytics";

/**
 * Evenimente globale de analiză (montat o dată, în layout):
 *  - din ce APLICAȚIE vine vizitatorul (TikTok, Instagram, Facebook, Telegram,
 *    Viber…) — browserele lor interne nu trimit „referrer”, deci altfel ar
 *    apărea „Direct”;
 *  - fiecare click pe buton/link: textul, destinația, zona paginii;
 *  - evenimente dedicate: apel telefonic, „Înscrie-te”, întrebare FAQ deschisă,
 *    video pornit, link extern (rețele sociale);
 *  - adâncimea de derulare (25/50/75/100%) și timpul petrecut (la plecare).
 */

function appFromUserAgent(ua: string): string | null {
  if (/musical_ly|TikTok|BytedanceWebview|Bytedance/i.test(ua)) return "TikTok";
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/FBAN|FBAV|FB_IAB|FBIOS|Facebook/i.test(ua)) return "Facebook";
  if (/Telegram/i.test(ua)) return "Telegram";
  if (/Viber/i.test(ua)) return "Viber";
  if (/WhatsApp/i.test(ua)) return "WhatsApp";
  if (/Snapchat/i.test(ua)) return "Snapchat";
  if (/Threads/i.test(ua)) return "Threads";
  return null;
}

function sectionOf(el: Element | null): string {
  const sec = el?.closest("section[id], [data-section], header, footer, nav, main");
  if (!sec) return "";
  return sec.getAttribute("data-section") || sec.id || sec.tagName.toLowerCase();
}

function textOf(el: Element): string {
  const t = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
  return t.slice(0, 60);
}

export function AnalyticsEvents() {
  useEffect(() => {
    const page = () => location.pathname;

    // 1) Aplicația de proveniență — o dată per sesiune.
    try {
      const app = appFromUserAgent(navigator.userAgent);
      const key = "glg_app_src";
      if (app && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, app);
        track(EV.dinAplicatie, { app, pagina: page() });
      }
      const utm = new URLSearchParams(location.search).get("utm_source");
      if (utm && !sessionStorage.getItem("glg_utm")) {
        sessionStorage.setItem("glg_utm", utm);
        track(EV.campanie, { sursa: utm.slice(0, 40), pagina: page() });
      }
    } catch {
      /* fără storage: ignorăm */
    }

    // 2) Click-uri pe butoane și linkuri.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("a, button, summary") as HTMLElement | null;
      if (!el) return;
      const text = textOf(el);
      const href = el.getAttribute("href") ?? "";
      const zona = sectionOf(el);
      if (href.startsWith("tel:")) track(EV.apelTelefon, { unde: page(), zona });
      else if (/^\/(ru\/)?inscriere/.test(href) && page().replace(/^\/ru/, "") !== "/inscriere") track(EV.clickInscrieTe, { unde: page(), zona, text });
      if (el.tagName === "SUMMARY") {
        const details = el.closest("details");
        if (details && !details.open) track(EV.faqDeschisa, { intrebare: text, pagina: page() });
        return;
      }
      // Acordeonul de pe prima pagină (secțiunea „intrebari”) e făcut din butoane cu aria-expanded.
      if (el.tagName === "BUTTON" && el.getAttribute("aria-expanded") === "false" && /intrebari|faq/.test(zona)) {
        track(EV.faqDeschisa, { intrebare: text, pagina: page() });
        return;
      }
      if (/^https?:\/\//.test(href) && !href.includes(location.host)) {
        let dest = href;
        try { dest = new URL(href).hostname.replace(/^www\./, ""); } catch { /* lăsăm href */ }
        track(EV.linkExtern, { destinatie: dest, text, pagina: page() });
      }
      if (text) track(EV.click, { text, zona, pagina: page(), tip: el.tagName === "A" ? "link" : "buton" });
    };
    document.addEventListener("click", onClick, { capture: true });

    // 3) Video pornit.
    const onPlay = (e: Event) => {
      const v = e.target as HTMLVideoElement | null;
      if (v?.tagName === "VIDEO") track(EV.videoStart, { pagina: page(), video: (v.currentSrc || v.src || "").split("/").pop()?.slice(0, 60) ?? "" });
    };
    document.addEventListener("play", onPlay, { capture: true });

    // 4) Adâncimea de derulare.
    const reached = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - innerHeight;
      if (max <= 0) return;
      const pct = Math.round(((scrollY + 1) / max) * 100);
      for (const step of [25, 50, 75, 100]) {
        if (pct >= step && !reached.has(step)) {
          reached.add(step);
          track(EV.scroll, { adancime: String(step), pagina: page() });
        }
      }
    };
    addEventListener("scroll", onScroll, { passive: true });

    // 5) Timpul petrecut pe pagină (la plecare), în trepte.
    const t0 = Date.now();
    const onLeave = () => {
      const s = Math.round((Date.now() - t0) / 1000);
      const treapta = s < 10 ? "sub 10 s" : s < 30 ? "10-30 s" : s < 60 ? "30-60 s" : s < 180 ? "1-3 min" : s < 600 ? "3-10 min" : "peste 10 min";
      track(EV.timpPePagina, { treapta, pagina: page() });
    };
    addEventListener("pagehide", onLeave, { once: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("play", onPlay, { capture: true });
      removeEventListener("scroll", onScroll);
      removeEventListener("pagehide", onLeave);
    };
  }, []);
  return null;
}
