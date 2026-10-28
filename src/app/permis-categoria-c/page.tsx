import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { CookieConsent } from "@/components/CookieConsent";
import { MobileActionBar } from "@/components/MobileActionBar";
import { BreadcrumbJsonLd, CategorieJsonLd, LocalFaqJsonLd } from "@/components/JsonLd";
import { categorieLabel, categoriiLinks, requireCategorie } from "@/lib/categorii";
import { sediiLinks } from "@/lib/sedii";
import { pageMetadata } from "@/lib/seo";
import { CategoriePage } from "../_local/CategoriePage";

/** Pagina categoriei de permis. Datele: src/lib/categorii.ts. */
const SLUG = "permis-categoria-c";
const categorie = requireCategorie(SLUG);

export const metadata: Metadata = pageMetadata({
  title: categorie.ro.seoTitle,
  description: categorie.ro.description,
  path: categorie.path,
});

export default function Page() {
  return (
    <LanguageProvider>
      <CategorieJsonLd categorie={categorie} />
      <LocalFaqJsonLd path={categorie.path} items={categorie.ro.faq} />
      <BreadcrumbJsonLd items={[{ name: categorieLabel(SLUG).ro, path: categorie.path }]} />
      <Navbar />
      <main>
        <CategoriePage categorie={categorie} others={categoriiLinks(SLUG)} sedii={sediiLinks()} />
      </main>
      <Footer />
      <FloatingContact />
      <MobileActionBar />
      <CookieConsent aboveBar />
    </LanguageProvider>
  );
}
