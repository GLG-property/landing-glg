import type { Metadata } from "next";

/**
 * Constante și helper pentru metadatele SEO. Limba RU este comutată doar pe
 * client (LanguageProvider), fără URL-uri separate, deci fiecare pagină are
 * un singur canonical și NU declară hreflang.
 */

export const siteUrl = "https://scoalaautoglg.com";
export const siteName = "Școala Auto GLG Property";
export const brandSuffix = "GLG Property";

/** Titlul și descrierea paginii principale (folosite și ca implicite în layout). */
export const homeTitle = "Școală auto în Chișinău, permis categoria B | GLG Property";
export const homeDescription =
  "Școala Auto GLG Property: școală auto în Chișinău (Buiucani, Botanica), grupe la Strășeni și Vorniceni. Permis categoria B, instructori atestați, RO/RU, rate.";

export const ogImage = {
  url: "/masina-glg.jpg",
  width: 1500,
  height: 1125,
  alt: "Mașinile de instruire Skoda ale Școlii Auto GLG Property din Chișinău",
};

/** URL absolut pentru o cale din site (fără slash dublu). */
export function absoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMeta = {
  /** Titlul paginii; implicit primește sufixul „| GLG Property" din layout. */
  title: string;
  /** true = titlul se folosește exact așa, fără sufix. */
  absoluteTitle?: boolean;
  /** 140-160 de caractere. */
  description: string;
  /** Calea canonică, ex. "/inscriere". */
  path: string;
  type?: "website" | "article";
};

/**
 * Metadata completă pentru o pagină: canonical absolut, Open Graph și Twitter
 * (Next NU moștenește câmpurile imbricate din layout, de aceea le setăm integral).
 */
export function pageMetadata({ title, absoluteTitle = false, description, path, type = "website" }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${brandSuffix}`;
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "ro_RO",
      alternateLocale: ["ru_RU"],
      url,
      siteName,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
