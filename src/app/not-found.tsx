import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { NotFoundContent } from "@/components/NotFoundContent";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Pagina nu există",
  description:
    "Pagina căutată nu există pe site-ul Școlii Auto GLG Property din Chișinău. Întoarce-te pe pagina principală sau trimite cererea de înscriere online.",
  robots: { index: false, follow: false },
};

/**
 * Pagina 404 (bilingvă, în stilul site-ului). Next o randează cu status 404
 * și adaugă singur `noindex` pentru orice URL care nu se potrivește cu o rută.
 */
export default function NotFound() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
