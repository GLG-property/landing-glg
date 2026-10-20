import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { EnrollForm } from "@/components/EnrollForm";
import { Footer } from "@/components/Footer";
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

export default async function InscrierePage() {
  const options = await loadOptions();
  return (
    <LanguageProvider>
      <BreadcrumbJsonLd items={[{ name: "Înscriere online", path: "/inscriere" }]} />
      <Navbar />
      <main>
        <EnrollForm options={options} />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
