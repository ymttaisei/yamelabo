import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/lib/column/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/column/types";

interface RelatedArticlesProps {
  articles: ArticleData[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <nav aria-label="関連記事" className="mt-12">
      <h2 className="mb-5 text-lg font-semibold">関連記事</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.meta.slug}
            href={`/column/${article.meta.slug}`}
            className="group cursor-pointer rounded-lg border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[article.meta.category]}`}
            >
              {CATEGORY_LABELS[article.meta.category]}
            </span>
            <p className="mt-2 font-semibold leading-snug transition-colors duration-200 group-hover:text-primary">
              {article.meta.title}
            </p>
            <p className="mt-1.5 flex items-center gap-1 text-sm text-primary">
              読む
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
