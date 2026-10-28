import { dictionaries, site } from "@/lib/content";
import type { Categorie } from "@/lib/categorii";
import { sedii, type Sediu } from "@/lib/sedii";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

/**
 * Date structurate schema.org (JSON-LD). Toate valorile vin din content.ts /
 * sedii.ts / categorii.ts; câmpurile pe care nu le cunoaștem (adrese exacte,
 * orele de deschidere la minut, prețuri) sunt lăsate afară, nu inventate.
 */

const ORG_ID = `${siteUrl}/#organization`;
const SCHOOL_ID = `${siteUrl}/#scoala`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** @id-ul nodului LocalBusiness al unui sediu. */
const sediuId = (slug: string) => `${siteUrl}/${slug}#sediu`;

const telephone = site.phoneHref.replace("tel:", "");
const logoUrl = `${siteUrl}/logo.png`;
const photoUrl = `${siteUrl}/masina-glg.jpg`;
const sameAs = [site.social.facebook, site.social.instagram, site.social.tiktok];

/** Localitățile cu grupe (sediile din formularul de înscriere, src/lib/schedule.ts). */
const areaServed = ["Chișinău", "Strășeni", "Vorniceni"].map((name) => ({
  "@type": "City",
  name,
}));

/**
 * Zilele de lucru, singura informație despre program pe care o avem publicată
 * (content.ts: „Luni - Sâmbătă”). Orele exacte de deschidere NU sunt
 * confirmate, de aceea `opens`/`closes` lipsesc în loc să fie inventate.
 */
const OPENING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const openingHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: OPENING_DAYS.map((d) => `https://schema.org/${d}`),
};

/** Cursurile reale din content (pachetul Standard acoperă categoriile B1 și B). */
const courses = [
  {
    code: "B",
    name: "Curs de conducere categoria B",
    description:
      "Curs complet pentru permisul de conducere categoria B: teorie 3 luni și 24 de lecții practice pe Skoda Fabia și Skoda Scala, în română sau rusă, cu plata în până la 25 de rate.",
  },
  {
    code: "B1",
    name: "Curs de conducere categoria B1",
    description:
      "Pregătire pentru categoria B1, inclusă în pachetul Standard: teorie 3 luni și lecții practice cu instructori atestați, în Chișinău.",
  },
];

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: siteName,
  alternateName: site.name,
  legalName: "GLG Property SRL",
  url: siteUrl,
  logo: { "@type": "ImageObject", url: logoUrl, width: 150, height: 150 },
  image: photoUrl,
  email: site.email,
  telephone,
  sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone,
      email: site.email,
      contactType: "customer service",
      availableLanguage: ["Romanian", "Russian"],
      areaServed: "MD",
    },
  ],
};

const drivingSchool = {
  "@type": "DrivingSchool",
  "@id": SCHOOL_ID,
  name: siteName,
  alternateName: site.name,
  url: siteUrl,
  telephone,
  email: site.email,
  image: [photoUrl],
  logo: logoUrl,
  parentOrganization: { "@id": ORG_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chișinău",
    addressCountry: "MD",
  },
  areaServed,
  openingHours: "Mo-Sa",
  openingHoursSpecification,
  knowsLanguage: ["ro", "ru"],
  sameAs,
  /** Cele patru sedii, ca noduri proprii (vezi `sediiNodes` mai jos). */
  department: sedii.map((s) => ({ "@id": sediuId(s.slug) })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cursuri școală auto",
    itemListElement: courses.map((course) => ({
      "@type": "Offer",
      url: absoluteUrl("/inscriere"),
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        courseCode: course.code,
        provider: { "@id": SCHOOL_ID },
        inLanguage: ["ro", "ru"],
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: { "@type": "City", name: "Chișinău" },
          courseSchedule: { "@type": "Schedule", duration: "P3M" },
        },
      },
    })),
  },
};

/** Nodul LocalBusiness/DrivingSchool al unui sediu. Adresa apare doar dacă o știm. */
function sediuNode(s: Sediu) {
  const url = absoluteUrl(s.path);
  return {
    "@type": "DrivingSchool",
    "@id": sediuId(s.slug),
    name: `${siteName}, ${s.location}`,
    url,
    telephone,
    email: site.email,
    image: [photoUrl],
    logo: logoUrl,
    parentOrganization: { "@id": ORG_ID },
    // Adresa: PostalAddress complet doar la sediile cu adresă confirmată
    // (Buiucani, Strășeni). La celelalte rămâne doar localitatea.
    address: s.address
      ? {
          "@type": "PostalAddress",
          streetAddress: s.address.street,
          addressLocality: s.address.locality,
          addressRegion: s.address.region,
          addressCountry: "MD",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: s.areaServed[0],
          addressCountry: "MD",
        },
    areaServed: s.areaServed.map((name) => ({ "@type": "City", name })),
    openingHours: "Mo-Sa",
    openingHoursSpecification,
    knowsLanguage: s.schedule.some((row) => row.language === "ru") ? ["ro", "ru"] : ["ro"],
    sameAs,
  };
}

const sediiNodes = sedii.map(sediuNode);

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: siteName,
  inLanguage: ["ro", "ru"],
  publisher: { "@id": ORG_ID },
};

/** Scapă `<` ca textul să nu poată închide tag-ul script. */
function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function Script({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />;
}

/**
 * Graful global, montat o dată în layout: Organization + DrivingSchool (școala,
 * cu `department` spre sedii) + câte un DrivingSchool/LocalBusiness pentru
 * FIECARE sediu (adresă, telefon, zile de lucru, areaServed, sameAs) + WebSite.
 */
export function JsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, drivingSchool, ...sediiNodes, website],
      }}
    />
  );
}

/** FAQPage din întrebările frecvente (varianta RO, cea prerandată). Doar pe pagina care conține FAQ-ul. */
export function FaqJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: dictionaries.ro.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

/**
 * FAQPage pentru o pagină nouă (sediu sau categorie), din întrebările reale
 * afișate pe pagina respectivă. Varianta RO, cea prerandată.
 */
export function LocalFaqJsonLd({
  path,
  items,
}: {
  path: string;
  items: { q: string; a: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#faq`,
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

/**
 * WebPage + LocalBusiness pentru pagina unui sediu: leagă pagina de nodul
 * sediului din graful global, ca Google să știe despre ce punct vorbește.
 */
export function SediuJsonLd({ sediu }: { sediu: Sediu }) {
  const url = absoluteUrl(sediu.path);
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#pagina`,
        url,
        name: sediu.ro.h1,
        description: sediu.ro.description,
        inLanguage: "ro",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": sediuId(sediu.slug) },
        primaryImageOfPage: photoUrl,
      }}
    />
  );
}

/**
 * Course + Offer pentru pagina unei categorii. Durata (`courseSchedule`) apare
 * DOAR la pachetul standard (B1/B), singurul la care o cunoaștem; la celelalte
 * categorii nu scriem durate sau prețuri, pentru că depind de grupa deschisă.
 */
export function CategorieJsonLd({ categorie }: { categorie: Categorie }) {
  const url = absoluteUrl(categorie.path);
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        "@id": `${url}#curs`,
        name: categorie.ro.h1,
        description: categorie.ro.description,
        url,
        courseCode: categorie.codes.join(", "),
        provider: { "@id": SCHOOL_ID },
        inLanguage: ["ro", "ru"],
        educationalCredentialAwarded:
          "Certificat de absolvire a școlii auto (fișa de școlarizare), necesar pentru examenul ASP",
        availableLanguage: ["Romanian", "Russian"],
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: { "@type": "City", name: "Chișinău" },
          inLanguage: ["ro", "ru"],
          ...(categorie.standardPackage
            ? { courseSchedule: { "@type": "Schedule", duration: "P3M" } }
            : {}),
        },
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/inscriere"),
          availability: "https://schema.org/InStock",
          category: "Curs de pregătire a conducătorilor auto",
          seller: { "@id": SCHOOL_ID },
        },
      }}
    />
  );
}

/** BreadcrumbList pentru subpagini; „Acasă" este adăugat automat ca prim element. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: "Acasă", path: "/" }, ...items];
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
