import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ArticleView } from "@/components/blog/ArticleView";
import { BlogJsonLd } from "@/components/blog/BlogJsonLd";
import { blogDict } from "@/lib/blog/i18n";
import {
  getAllPosts,
  getPost,
  getRelated,
  siteUrl,
  toSummary,
  wordCount,
} from "@/lib/blog/posts";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/** Slug necunoscut = 404 (nu generăm pagini la cerere). */
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.ro.seoTitle,
    description: post.ro.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.ro.seoTitle,
      description: post.ro.description,
      publishedTime: `${post.publishedAt}T08:00:00+03:00`,
      modifiedTime: `${post.updatedAt}T08:00:00+03:00`,
      authors: ["Școala Auto GLG Property"],
      section: blogDict.ro.categories[post.category],
      tags: post.tags,
      images: [
        { url: "/masina-glg.jpg", width: 1500, height: 1125, alt: "Mașinile școlii auto GLG Property" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ro.seoTitle,
      description: post.ro.description,
      images: ["/masina-glg.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(post).map(toSummary);
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      headline: post.ro.title,
      description: post.ro.description,
      inLanguage: "ro",
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      wordCount: wordCount(post.ro),
      articleSection: blogDict.ro.categories[post.category],
      keywords: post.tags.join(", "),
      image: [`${siteUrl}/masina-glg.jpg`],
      author: { "@type": "Organization", name: "Școala Auto GLG Property", url: siteUrl },
      publisher: {
        "@type": "Organization",
        "@id": `${siteUrl}/#scoala`,
        name: "Școala Auto GLG Property",
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
      },
      isPartOf: { "@id": `${siteUrl}/blog#blog` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: post.ro.title, item: url },
      ],
    },
    ...(post.ro.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.ro.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <LanguageProvider>
      <BlogJsonLd data={jsonLd} />
      <Navbar />
      <main>
        <ArticleView post={post} related={related} />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
