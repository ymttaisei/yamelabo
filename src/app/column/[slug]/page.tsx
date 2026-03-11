import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/seo/json-ld";
import { ArticleBody } from "@/components/column/article-body";
import { ArticleToolCta } from "@/components/column/article-tool-cta";
import { RelatedArticles } from "@/components/column/related-articles";
import { TableOfContents } from "@/components/column/table-of-contents";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/column/types";
import {
  getAllSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: "article",
      locale: "ja_JP",
      siteName: "ヤメラボ",
      publishedTime: article.meta.publishedAt,
      ...(article.meta.updatedAt
        ? { modifiedTime: article.meta.updatedAt }
        : {}),
    },
    twitter: {
      card: "summary",
      title: article.meta.title,
      description: article.meta.description,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function ColumnArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    ? getRelatedArticles(article.relatedSlugs)
    : [];

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: article.meta.title,
            description: article.meta.description,
            slug: article.meta.slug,
            publishedAt: article.meta.publishedAt,
            updatedAt: article.meta.updatedAt,
          }),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "コラム", href: "/column" },
            { name: article.meta.title, href: `/column/${article.meta.slug}` },
          ]),
          ...(article.faq.length > 0 ? [faqJsonLd(article.faq)] : []),
        ]}
      />

      {/* Header */}
      <section className="border-b bg-gradient-to-b from-blue-50/80 to-white py-10 md:py-14">
        <div className="mx-auto max-w-2xl px-4">
          <nav
            aria-label="パンくずリスト"
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground"
          >
            <Link
              href="/"
              className="cursor-pointer transition-colors duration-200 hover:text-foreground"
            >
              ホーム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link
              href="/column"
              className="cursor-pointer transition-colors duration-200 hover:text-foreground"
            >
              コラム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-foreground line-clamp-1">
              {article.meta.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.meta.category]}`}
            >
              {CATEGORY_LABELS[article.meta.category]}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            {article.meta.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" aria-hidden="true" />
              {formatDate(article.meta.publishedAt)}
            </span>
            {article.meta.updatedAt && (
              <span className="flex items-center gap-1">
                更新: {formatDate(article.meta.updatedAt)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {article.meta.readingTime}分で読めます
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        {/* TOC */}
        <TableOfContents sections={article.sections} />

        {/* Article content */}
        <ArticleBody sections={article.sections} />

        {/* Tool CTA */}
        <ArticleToolCta />

        {/* FAQ */}
        {article.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-lg font-semibold">よくある質問</h2>
            <Accordion multiple className="w-full">
              {article.faq.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="cursor-pointer text-left text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related articles */}
        <RelatedArticles articles={related} />
      </div>
    </>
  );
}
