import { site } from "@/lib/content";

const siteUrl = "https://scoalaautoglg.com";

const drivingSchoolSchema = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": `${siteUrl}/#scoala`,
  name: "Școala Auto GLG Property",
  url: siteUrl,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  image: `${siteUrl}/masina-glg.jpg`,
  logo: `${siteUrl}/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chișinău",
    addressCountry: "MD",
  },
  areaServed: {
    "@type": "City",
    name: "Chișinău",
  },
  openingHours: "Mo-Sa",
  sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok],
};

/** Renders schema.org structured data for the school as JSON-LD. */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(drivingSchoolSchema) }}
    />
  );
}
