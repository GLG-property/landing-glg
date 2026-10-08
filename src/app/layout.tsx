import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-onest",
  display: "swap",
});

const siteUrl = "https://scoalaautoglg.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Școala Auto GLG Property | Permis categoria B în Chișinău",
    template: "%s | GLG Property",
  },
  description:
    "Școală auto în Chișinău pentru categoria B. Instructori cu experiență, mașini moderne, plata în rate și înscriere online. Patru centre în oraș.",
  keywords: [
    "scoala auto Chisinau",
    "permis de conducere",
    "categoria B",
    "GLG Property",
    "inscriere online scoala auto",
  ],
  alternates: {
    canonical: "/",
  },
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
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteUrl,
    siteName: "Școala Auto GLG Property",
    title: "Școala Auto GLG Property | Permis categoria B în Chișinău",
    description:
      "Școală auto în Chișinău pentru categoria B. Instructori cu experiență, mașini moderne, plata în rate și înscriere online.",
    images: [
      {
        url: "/masina-glg.jpg",
        width: 1500,
        height: 1125,
        alt: "Mașinile școlii auto GLG Property",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Școala Auto GLG Property | Permis categoria B în Chișinău",
    description:
      "Școală auto în Chișinău pentru categoria B. Instructori cu experiență, mașini moderne, plata în rate și înscriere online.",
    images: ["/masina-glg.jpg"],
  },
};

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
        {children}
      </body>
    </html>
  );
}
