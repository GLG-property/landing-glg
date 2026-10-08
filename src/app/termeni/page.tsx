import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: { absolute: "Termeni și condiții | Școala Auto GLG Property" },
  description:
    "Condițiile de utilizare a site-ului scoalaautoglg.com și a formularului de înscriere online al Școlii Auto GLG Property.",
  alternates: { canonical: "/termeni" },
};

export default function TermeniPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <TermsClient />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
