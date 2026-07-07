import type { Metadata } from "next";
import { Onest } from "next/font/google";
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
    default: "Școala Auto GLG Property — Obținem împreună permisul tău",
    template: "%s · GLG Property",
  },
  description:
    "Școală auto nr. 1 în Republica Moldova după rata de promovare. Categoriile B1 și B, instructori cu experiență, mașini moderne Skoda și pachete flexibile cu plata în rate.",
  keywords: [
    "scoala auto",
    "GLG Property",
    "permis de conducere",
    "categoria B",
    "Chișinău",
    "scoala auto Chisinau",
  ],
  openGraph: {
    title: "Școala Auto GLG Property",
    description:
      "Obținem împreună permisul tău de conducere. Nr. 1 în Moldova după rata de promovare.",
    url: siteUrl,
    siteName: "GLG Property",
    locale: "ro_MD",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
        {children}
      </body>
    </html>
  );
}
