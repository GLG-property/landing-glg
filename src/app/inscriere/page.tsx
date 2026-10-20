import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { EnrollForm } from "@/components/EnrollForm";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Înscriere online la școala auto din Chișinău",
  description:
    "Înscriere online la Școala Auto GLG Property: alegi sediul (Buiucani, Botanica, Strășeni, Vorniceni), limba și ora grupei, iar noi te sunăm să confirmăm.",
  path: "/inscriere",
});

export default function InscrierePage() {
  return (
    <LanguageProvider>
      <BreadcrumbJsonLd items={[{ name: "Înscriere online", path: "/inscriere" }]} />
      <Navbar />
      <main>
        <EnrollForm />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
