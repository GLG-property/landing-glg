import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = pageMetadata({
  title: "Termeni și condiții",
  description:
    "Condițiile de utilizare a site-ului scoalaautoglg.com și a formularului de înscriere al Școlii Auto GLG Property: obiectul site-ului, prețuri, răspundere.",
  path: "/termeni",
});

export default function TermeniPage() {
  return (
    <LanguageProvider>
      <BreadcrumbJsonLd items={[{ name: "Termeni și condiții", path: "/termeni" }]} />
      <Navbar />
      <main>
        <TermsClient />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
