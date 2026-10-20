import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { NewsSection } from "@/components/blog/NewsSection";
import { BlogJsonLd } from "@/components/blog/BlogJsonLd";
import { getAllSummaries, posts, siteUrl } from "@/lib/blog/posts";
import { getNews } from "@/lib/blog/news";

/** Știrile se reîmprospătează cel mult o dată pe oră (ISR). */
export const revalidate = 3600;

const title = "Blog: ghiduri despre permis și condus în Moldova";
const description =
  "Articole scrise de instructorii Școlii Auto GLG Property: cum obții permisul categoria B, examenele ASP, costuri, amenzi, sfaturi de condus. Plus noutăți din trafic.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Școala Auto GLG Property` },
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: `${title} | Școala Auto GLG Property`,
    description,
    images: [{ url: "/masina-glg.jpg", width: 1500, height: 1125, alt: "Mașinile școlii auto GLG Property" }],
  },
};

export default async function BlogPage() {
  const news = await getNews(8);
  const summaries = getAllSummaries();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${siteUrl}/blog#blog`,
      url: `${siteUrl}/blog`,
      name: "Blog Școala Auto GLG Property",
      description,
      inLanguage: "ro",
      publisher: { "@id": `${siteUrl}/#scoala` },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.ro.title,
        url: `${siteUrl}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        dateModified: p.updatedAt,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      ],
    },
  ];

  return (
    <LanguageProvider>
      <BlogJsonLd data={jsonLd} />
      <Navbar />
      <main>
        <BlogIndex posts={summaries} />
        <NewsSection items={news} showAllLink />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
