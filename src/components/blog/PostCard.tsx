"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import clsx from "clsx";
import { blogDict } from "@/lib/blog/i18n";
import { formatDate, type PostSummary } from "@/lib/blog/posts";
import { useI18n } from "@/components/LanguageProvider";
import { Eyebrow } from "@/components/primitives";

export function PostCard({ post, className }: { post: PostSummary; className?: string }) {
  const { lang } = useI18n();
  const t = blogDict[lang];
  const c = post[lang];
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={clsx(
        "card flex flex-col p-6 transition-colors duration-200 hover:border-faint",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Eyebrow>{t.categories[post.category]}</Eyebrow>
        <time dateTime={post.publishedAt} className="text-xs text-faint">
          {formatDate(post.publishedAt, lang)}
        </time>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
        <Link href={href} className="transition-colors duration-200 hover:text-brand">
          {c.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-faint">
          <Clock className="size-4" strokeWidth={1.5} />
          {post.readingTime[lang]} {t.minRead}
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
          aria-label={`${t.readArticle}: ${c.title}`}
        >
          {t.readArticle}
          <ArrowRight className="size-4" strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
