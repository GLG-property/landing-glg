import { dictionaries, site } from "@/lib/content";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

/**
 * Date structurate schema.org (JSON-LD). Toate valorile vin din content.ts /
 * seo.ts; câmpurile pe care nu le cunoaștem (adrese exacte, ore, prețuri)
 * sunt lăsate afară, nu inventate.
 */

const ORG_ID = `${siteUrl}/#organization`;
const SCHOOL_ID = `${siteUrl}/#scoala`;
const WEBSITE_ID = `${siteUrl}/#website`;

const telephone = site.phoneHref.replace("tel:", "");
const logoUrl = `${siteUrl}/logo.png`;
const photoUrl = `${siteUrl}/masina-glg.jpg`;
const sameAs = [site.social.facebook, site.social.instagram, site.social.tiktok];

/** Localitățile cu grupe (sediile din formularul de înscriere, src/lib/schedule.ts). */
const areaServed = ["Chișinău", "Strășeni", "Vorniceni"].map((name) => ({
  "@type": "City",
  name,
}));

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
  knowsLanguage: ["ro", "ru"],
  sameAs,
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

/** Graful global (Organization + DrivingSchool + WebSite), montat o dată în layout. */
export function JsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, drivingSchool, website],
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
