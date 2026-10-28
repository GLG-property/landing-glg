import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { EnrollForm } from "@/components/EnrollForm";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { CookieConsent } from "@/components/CookieConsent";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import type { EnrollOptions } from "@/lib/schedule";

/** Grupele deschise (sediu → zile/oră/limbă) din aplicația internă, citite la fiecare cerere (fără cache: ce deschide/arhivează adminul se vede imediat); lipsă = formular fără ore. */
export const dynamic = "force-dynamic";
async function loadOptions(): Promise<EnrollOptions | null> {
  const upstream = (process.env.ENROLL_UPSTREAM ?? "http://app:3000/api/inscriere").replace(/\/$/, "") + "/optiuni";
  try {
    const r = await fetch(upstream, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as EnrollOptions;
  } catch {
    return null;
  }
}

export const metadata: Metadata = pageMetadata({
  title: "Înscriere online la școala auto din Chișinău",
  description:
    "Înscriere online la Școala Auto GLG Property: alegi sediul (Buiucani, Botanica, Strășeni, Vorniceni), limba și ora grupei, iar noi te sunăm să confirmăm.",
  path: "/inscriere",
});

/** Un parametru de adresă, doar dacă e text simplu. */
function one(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

export default async function InscrierePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [options, sp] = await Promise.all([loadOptions(), searchParams]);
  // Datele din formularul scurt al primei pagini (QuickEnroll).
  const prefill = {
    name: one(sp.nume),
    phone: one(sp.telefon),
    location: one(sp.sediu),
  };
  return (
    <LanguageProvider>
      <BreadcrumbJsonLd items={[{ name: "Înscriere online", path: "/inscriere" }]} />
      <Navbar />
      <main>
        <EnrollForm options={options} prefill={prefill} />
      </main>
      <Footer />
      {/* Aici omul e deja în formular: bara de jos păstrează doar „Sună” și
          mesageria, fără butonul „Înscrie-te” (ar duce în aceeași pagină). */}
      <MobileActionBar showEnroll={false} />
      <CookieConsent aboveBar />
    </LanguageProvider>
  );
}
