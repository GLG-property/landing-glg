import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { CookieConsent } from "@/components/CookieConsent";
import { MobileActionBar } from "@/components/MobileActionBar";
import { BreadcrumbJsonLd, LocalFaqJsonLd, SediuJsonLd } from "@/components/JsonLd";
import { requireSediu, sediiLinks } from "@/lib/sedii";
import { pageMetadata } from "@/lib/seo";
import { SediuPage } from "../_local/SediuPage";

/** Pagina sediului Strășeni (SEO local). Datele: src/lib/sedii.ts. */
const SLUG = "scoala-auto-straseni";
const sediu = requireSediu(SLUG);

export const metadata: Metadata = pageMetadata({
  title: sediu.ro.seoTitle,
  description: sediu.ro.description,
  path: sediu.path,
});

export default function Page() {
  return (
    <LanguageProvider>
      <SediuJsonLd sediu={sediu} />
      <LocalFaqJsonLd path={sediu.path} items={sediu.ro.faq} />
      <BreadcrumbJsonLd items={[{ name: sediu.shortName.ro, path: sediu.path }]} />
      <Navbar />
      <main>
        <SediuPage sediu={sediu} others={sediiLinks(SLUG)} />
      </main>
      <Footer />
      <FloatingContact />
      <MobileActionBar />
      <CookieConsent aboveBar />
    </LanguageProvider>
  );
}
