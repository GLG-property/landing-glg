import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = pageMetadata({
  title: "Politica de confidențialitate",
  description:
    "Cum prelucrează Școala Auto GLG Property datele tale personale: ce colectăm prin formularul de înscriere, în ce scop, cât timp le păstrăm și drepturile tale.",
  path: "/confidentialitate",
});

export default function ConfidentialitatePage() {
  return (
    <LanguageProvider>
      <BreadcrumbJsonLd items={[{ name: "Politica de confidențialitate", path: "/confidentialitate" }]} />
      <Navbar />
      <main>
        <PrivacyClient />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
