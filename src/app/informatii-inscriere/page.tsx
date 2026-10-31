import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MobileActionBar } from "@/components/MobileActionBar";
import { CookieConsent } from "@/components/CookieConsent";
import { BreadcrumbJsonLd, LocalFaqJsonLd } from "@/components/JsonLd";
import { infoInscriere } from "@/lib/info-inscriere";
import { pageMetadata } from "@/lib/seo";
import type { EnrollOptions } from "@/lib/schedule";
import { InfoInscriere } from "../_local/InfoInscriere";

/**
 * „Informație înscriere”: tot ce trebuie să știe un cursant înainte să se
 * înscrie (cerința patronului, 31.10.2026).
 *
 * Grupele DESCHISE se citesc din aplicația internă la FIECARE cerere, exact ca
 * la /inscriere: ce deschide sau arhivează adminul se vede imediat. Dacă
 * aplicația nu răspunde, `options` rămâne null și pagina arată orarul fix al
 * sediilor, fără să crape.
 */
export const dynamic = "force-dynamic";

const PATH = "/informatii-inscriere";

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
  title: "Informații înscriere: grupe, prețuri și acte",
  description:
    "Tot ce trebuie să știi înainte de înscriere la Școala Auto GLG: grupele deschise pe sedii, pachetul Standard de 3500 lei pentru categoria B, plata în rate și actele.",
  path: PATH,
});

export default async function Page() {
  const options = await loadOptions();
  return (
    <LanguageProvider>
      {/* FAQPage din întrebările reale afișate pe pagină (varianta RO, cea prerandată). */}
      <LocalFaqJsonLd path={PATH} items={infoInscriere.ro.faq} />
      <BreadcrumbJsonLd items={[{ name: "Informații înscriere", path: PATH }]} />
      <Navbar />
      <main>
        <InfoInscriere options={options} />
      </main>
      <Footer />
      <FloatingContact />
      <MobileActionBar />
      <CookieConsent aboveBar />
    </LanguageProvider>
  );
}
