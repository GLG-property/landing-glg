"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { blogDict } from "@/lib/blog/i18n";
import { categories, type Category, type PostSummary } from "@/lib/blog/posts";
import { useI18n } from "@/components/LanguageProvider";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { BlogCta } from "./BlogCta";
import { PostCard } from "./PostCard";

/** Lista de articole cu filtru pe categorii și CTA la fiecare 3 articole. */
export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const { lang } = useI18n();
  const t = blogDict[lang];
  const [active, setActive] = useState<Category | null>(null);

  const visible = active ? posts.filter((p) => p.category === active) : posts;
  const available = categories.filter((c) => posts.some((p) => p.category === c));

  const items: ReactNode[] = [];
  visible.forEach((p, i) => {
    items.push(<PostCard key={p.slug} post={p} />);
    if ((i + 1) % 3 === 0 && i + 1 < visible.length) {
      items.push(
        <BlogCta key={`cta-${i}`} variant="card" className="md:col-span-2 lg:col-span-3" />
      );
    }
  });

  return (
    <section id="articole" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-ink">
                {t.home}
              </Link>
            </li>
            <li aria-hidden="true" className="text-faint">
              /
            </li>
            <li className="text-ink">{t.blog}</li>
          </ol>
        </nav>

        {/* Titlul paginii (H1), în stilul hero-ului */}
        <div className="max-w-2xl">
          <div className="animate-rise">
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </div>
          <h1
            className="display animate-rise mt-4 text-balance text-4xl text-ink sm:text-5xl"
            style={{ animationDelay: "70ms" }}
          >
            {t.title} {t.titleAccent}
            <span className="dot">.</span>
          </h1>
          <p
            className="animate-rise mt-5 text-base text-muted sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {t.subtitle}
          </p>
        </div>

        <div
          className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label={t.filterLabel}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={clsx(
              "btn-3d-light shrink-0 rounded-[10px] px-3.5 py-2 text-sm font-medium transition-colors duration-200",
              active === null ? "border-brand text-brand" : "text-muted hover:text-ink"
            )}
          >
            {t.all}
          </button>
          {available.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={clsx(
                "btn-3d-light shrink-0 rounded-[10px] px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                active === c ? "border-brand text-brand" : "text-muted hover:text-ink"
              )}
            >
              {t.categories[c]}
            </button>
          ))}
        </div>

        <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items}
        </Reveal>

        <div className="mt-10">
          <BlogCta variant="card" />
        </div>
      </Container>
    </section>
  );
}
