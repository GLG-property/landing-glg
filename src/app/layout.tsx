import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { brandSuffix, homeDescription, homeTitle, ogImage, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

/**
 * Metadata implicită (moștenită de paginile fără metadata proprie, ex. 404).
 * Canonical-ul și og:url se setează PER PAGINĂ (src/lib/seo.ts, pageMetadata),
 * ca să nu moștenească toate paginile canonical-ul paginii principale.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: homeTitle,
    template: `%s | ${brandSuffix}`,
  },
  description: homeDescription,
  keywords: [
    "școala auto Chișinău",
    "școală auto Chișinău",
    "școală auto",
    "permis de conducere categoria B",
    "permis categoria B Chișinău",
    "școala auto Buiucani",
    "școala auto Botanica",
    "școala auto Strășeni",
    "școala auto Vorniceni",
    "автошкола Кишинёв",
    "GLG Property",
    "înscriere online școala auto",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: ["ru_RU"],
    siteName,
    title: homeTitle,
    description: homeDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Bara browserului urmează fundalul alb al site-ului (paleta din DESIGN.md).
  themeColor: "#ffffff",
  colorScheme: "light",
};

/** Id-ul site-ului în Umami (din mediul containerului); lipsă = fără urmărire. */
// Paginile statice se randează la build (fără mediul containerului), de aceea id-ul
// e și valoare implicită; nu e secret, apare oricum în HTML-ul public.
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID?.trim() || "6eb596f1-0800-4a5a-b1da-b4cae3655312";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${onest.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-white text-ink" suppressHydrationWarning>
        {/* Enables scroll-reveal styling only when JS runs; if the client bundle
            fails to load within 3s, the gate is removed so content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__glgJs){document.documentElement.classList.remove('js')}},3000);",
          }}
        />
        <JsonLd />
        <AnalyticsEvents />
        {children}
        {/* Analiză vizitatori (Umami, self-hosted, fără cookie-uri): pagini, surse, durată, evenimente. */}
        {UMAMI_WEBSITE_ID && (
          <script defer src="/u/script.js" data-website-id={UMAMI_WEBSITE_ID} data-host-url="/u" data-do-not-track="true" />
        )}
      </body>
    </html>
  );
}
