import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: { absolute: "Politica de confidențialitate | Școala Auto GLG Property" },
  description:
    "Cum prelucrează Școala Auto GLG Property datele tale personale: ce colectăm prin formularul de înscriere, în ce scop și care sunt drepturile tale.",
  alternates: { canonical: "/confidentialitate" },
};

export default function ConfidentialitatePage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <PrivacyClient />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
