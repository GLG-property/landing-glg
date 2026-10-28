import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { categorii } from "@/lib/categorii";
import { sedii } from "@/lib/sedii";
import { absoluteUrl } from "@/lib/seo";

/**
 * Data ultimei modificări a paginilor statice. Se actualizează manual la
 * schimbări de conținut (nu `new Date()`, care ar minți motoarele de căutare
 * la fiecare build).
 */
const PAGES_UPDATED = new Date("2026-10-20");
const LEGAL_UPDATED = new Date("2026-08-31");
/** Paginile locale (sedii) și cele de categorie, publicate la această dată. */
const LOCAL_PAGES_UPDATED = new Date("2026-10-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts.reduce<Date>((latest, post) => {
    const d = new Date(post.updatedAt);
    return Number.isNaN(d.getTime()) || d <= latest ? latest : d;
  }, PAGES_UPDATED);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: PAGES_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/inscriere"),
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Categoria B este pagina de serviciu principală, celelalte categorii sunt
    // informative, de aceea au prioritate mai mică.
    {
      url: absoluteUrl("/permis-categoria-b"),
      lastModified: LOCAL_PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Paginile de sediu: intenție locală („școală auto Buiucani”), prioritate mare.
    ...sedii.map((s) => ({
      url: absoluteUrl(s.path),
      lastModified: LOCAL_PAGES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categorii
      .filter((c) => c.slug !== "permis-categoria-b")
      .map((c) => ({
        url: absoluteUrl(c.path),
        lastModified: LOCAL_PAGES_UPDATED,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: absoluteUrl("/confidentialitate"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/termeni"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
