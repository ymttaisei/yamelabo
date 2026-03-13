import type { ArticleData } from "@/lib/column/types";

// --- Article imports ---
import { RETIREMENT_CHECKLIST } from "./retirement-checklist";
import { UNEMPLOYMENT_INSURANCE_GUIDE } from "./unemployment-insurance-guide";
import { RETIREMENT_TAX_GUIDE } from "./retirement-tax-guide";
import { PAID_LEAVE_GUIDE } from "./paid-leave-guide";
import { TAISHOKU_DAIKOU_GUIDE } from "./taishoku-daikou-guide";
import { RESIGNATION_LETTER_GUIDE } from "./resignation-letter-guide";
import { HEALTH_INSURANCE_AFTER_RETIREMENT } from "./health-insurance-after-retirement";
import { BENGOSHI_OSUSUME } from "./bengoshi-osusume";

// --- Register all articles ---
const articles: ArticleData[] = [
  RETIREMENT_CHECKLIST,
  UNEMPLOYMENT_INSURANCE_GUIDE,
  RETIREMENT_TAX_GUIDE,
  PAID_LEAVE_GUIDE,
  TAISHOKU_DAIKOU_GUIDE,
  RESIGNATION_LETTER_GUIDE,
  HEALTH_INSURANCE_AFTER_RETIREMENT,
  BENGOSHI_OSUSUME,
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
