import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { EnrollForm } from "@/components/EnrollForm";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: { absolute: "Înscriere online | Școala Auto GLG Property" },
  description:
    "Completează cererea de înscriere la Școala Auto GLG Property direct online, în câteva minute. Te sunăm noi ca să confirmăm înscrierea.",
  alternates: { canonical: "/inscriere" },
};

export default function InscrierePage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <EnrollForm />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
