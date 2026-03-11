import type { ArticleData } from "@/lib/column/types";

// --- Article imports ---
import { RETIREMENT_CHECKLIST } from "./retirement-checklist";

// --- Register all articles ---
const articles: ArticleData[] = [
  RETIREMENT_CHECKLIST,
];

export function getAllArticles(): ArticleData[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.meta.publishedAt).getTime() -
      new Date(a.meta.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return articles.find((a) => a.meta.slug === slug);
}

export function getRelatedArticles(slugs: string[]): ArticleData[] {
  return slugs
    .map((s) => articles.find((a) => a.meta.slug === s))
    .filter((a): a is ArticleData => a != null);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.meta.slug);
}
