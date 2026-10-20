"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Info } from "lucide-react";
import { blogDict } from "@/lib/blog/i18n";
import { formatDate, readingTime, type Post, type PostSummary } from "@/lib/blog/posts";
import type { Block, Section } from "@/lib/blog/types";
import { useI18n } from "@/components/LanguageProvider";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { BlogCta } from "./BlogCta";
import { Inline } from "./Inline";
import { PostCard } from "./PostCard";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-muted">
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted marker:text-faint">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted marker:font-medium marker:text-ink">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div className="card mt-5 flex items-start gap-3 px-5 py-4">
          <span className="chip-3d grid size-9 shrink-0 place-items-center rounded-[10px] text-ink">
            <Info className="size-4" strokeWidth={1.5} />
          </span>
          <p className="text-sm leading-relaxed text-muted">
            <Inline text={block.text} />
          </p>
        </div>
      );
  }
}

function SectionView({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-24 mt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.title}</h2>
      {section.blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </section>
  );
}

function Toc({ sections, label }: { sections: Section[]; label: string }) {
  return (
    <nav aria-label={label}>
      <Eyebrow>{label}</Eyebrow>
      <ol className="mt-3 flex flex-col gap-2 border-l border-line">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="-ml-px flex gap-2.5 border-l border-transparent pl-4 text-sm text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              <span className="tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleView({ post, related }: { post: Post; related: PostSummary[] }) {
  const { lang } = useI18n();
  const t = blogDict[lang];
  const c = post[lang];
  const minutes = readingTime(c);
  const mid = Math.max(0, Math.ceil(c.sections.length / 2) - 1);

  return (
    <article className="py-10 sm:py-14">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-ink">
                {t.home}
              </Link>
            </li>
            <li aria-hidden="true" className="text-faint">
              /
            </li>
            <li>
              <Link href="/blog" className="transition-colors duration-200 hover:text-ink">
                {t.blog}
              </Link>
            </li>
            <li aria-hidden="true" className="text-faint">
              /
            </li>
            <li className="truncate text-ink">{t.categories[post.category]}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-8 max-w-3xl">
          <div className="animate-rise flex flex-wrap items-center gap-x-3 gap-y-1">
            <Eyebrow>{t.categories[post.category]}</Eyebrow>
            <time dateTime={post.publishedAt} className="text-xs text-faint">
              {formatDate(post.publishedAt, lang)}
            </time>
            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
              <Clock className="size-4" strokeWidth={1.5} />
              {minutes} {t.minRead}
            </span>
          </div>
          <h1
            className="display animate-rise mt-4 text-balance text-3xl text-ink sm:text-4xl lg:text-5xl"
            style={{ animationDelay: "70ms" }}
          >
            {c.title}
            <span className="dot">.</span>
          </h1>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          {/* Body */}
          <div className="max-w-3xl">
            <div className="animate-rise" style={{ animationDelay: "140ms" }}>
              {c.intro.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-muted first:mt-0 sm:text-lg">
                  <Inline text={p} />
                </p>
              ))}
            </div>

            {/* Cuprins pe mobil */}
            <div className="card mt-8 p-5 lg:hidden">
              <Toc sections={c.sections} label={t.toc} />
            </div>

            <div className="mt-8">
              <BlogCta variant="inline" />
            </div>

            {c.sections.map((s, i) => (
              <div key={s.id}>
                <SectionView section={s} />
                {i === mid && c.sections.length > 2 ? (
                  <div className="mt-10">
                    <BlogCta variant="inline" />
                  </div>
                ) : null}
              </div>
            ))}

            {/* FAQ */}
            {c.faq.length > 0 ? (
              <section id="faq" className="scroll-mt-24 mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">{t.faq}</h2>
                <div className="mt-4 divide-y divide-line border-y border-line">
                  {c.faq.map((f) => (
                    <details key={f.q} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-tight text-ink [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-faint transition-transform duration-150 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">
                        <Inline text={f.a} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Etichete + actualizare */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6 text-xs text-faint">
              <span>
                {t.updated}: {formatDate(post.updatedAt, lang)}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.tags}: {post.tags.join(", ")}
              </span>
            </div>

            <div className="mt-10">
              <BlogCta variant="card" />
            </div>
          </div>

          {/* Aside: cuprins sticky pe desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <Toc sections={c.sections} label={t.toc} />
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-600"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
                {t.backToBlog}
              </Link>
            </div>
          </aside>
        </div>

        {/* Articole înrudite */}
        {related.length > 0 ? (
          <section className="mt-16 border-t border-line pt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              {t.related}
              <span className="dot">.</span>
            </h2>
            <Reveal stagger className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </Reveal>
          </section>
        ) : null}
      </Container>
    </article>
  );
}
