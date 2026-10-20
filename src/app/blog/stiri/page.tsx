import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Container } from "@/components/primitives";
import { NewsSection } from "@/components/blog/NewsSection";
import { BlogCta } from "@/components/blog/BlogCta";
import { BlogJsonLd } from "@/components/blog/BlogJsonLd";
import { getNews } from "@/lib/blog/news";
import { siteUrl } from "@/lib/blog/posts";

/** Știrile se reîmprospătează cel mult o dată pe oră (ISR). */
export const revalidate = 3600;

const title = "Noutăți din trafic: știri despre condus și permise în Moldova";
const description =
  "Cele mai noi știri din presa din Republica Moldova despre trafic, permise de conducere, amenzi, ASP și siguranță rutieră, selectate automat, cu link către sursă.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Școala Auto GLG Property` },
  description,
  alternates: { canonical: "/blog/stiri" },
  openGraph: { type: "website", url: `${siteUrl}/blog/stiri`, title, description },
};

export default async function StiriPage() {
  const news = await getNews(30);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: "Noutăți din trafic", item: `${siteUrl}/blog/stiri` },
    ],
  };

  return (
    <LanguageProvider>
      <BlogJsonLd data={jsonLd} />
      <Navbar />
      <main>
        <Container className="pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
            Blog
          </Link>
        </Container>
        <NewsSection items={news} asPageTitle />
        {news.length === 0 ? (
          <section className="py-14 sm:py-20">
            <Container>
              <h1 className="display text-4xl text-ink sm:text-5xl">
                Noutăți din trafic<span className="dot">.</span>
              </h1>
              <p className="mt-5 text-base text-muted">
                Momentan nu avem noutăți de afișat. Revino mai târziu.
              </p>
              <div className="mt-8">
                <BlogCta variant="card" />
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
