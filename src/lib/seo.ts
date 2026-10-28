import type { Metadata } from "next";

/**
 * Constante și helper pentru metadatele SEO.
 *
 * hreflang: limba RU este comutată DOAR pe client (LanguageProvider citește
 * preferința din localStorage și schimbă dicționarul), la ACEEAȘI adresă URL.
 * Varianta prerandată, cea pe care o indexează Google, este mereu RO. Fără
 * adrese separate /ru/..., `alternates.languages` ar minți (ar trimite spre
 * aceeași pagină), de aceea NU declarăm hreflang. Semnalăm existența variantei
 * ruse doar prin `og:locale:alternate` (ru_RU) de mai jos și prin
 * `inLanguage: ["ro", "ru"]` în datele structurate.
 */

export const siteUrl = "https://scoalaautoglg.com";
export const siteName = "Școala Auto GLG Property";
export const brandSuffix = "GLG Property";

/**
 * Titlul și descrierea paginii principale (folosite și ca implicite în layout).
 * Titlul începe cu fraza căutată („școală auto Chișinău”), recomandarea
 * auditului RAP-CVFM6G. Cratimă simplă, nu en-dash, conform DESIGN.md.
 */
export const homeTitle = "Școală auto Chișinău - permis categoria B | GLG Property";
export const homeDescription =
  "Școala Auto GLG Property în Chișinău: permis B, 24 lecții practice pe Skoda, instructori atestați, RO/RU, până la 25 de rate. Înscrie-te online azi!";

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
