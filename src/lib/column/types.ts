export type ArticleCategory =
  | "retirement-guide"   // 退職ガイド（手続き系）
  | "money"              // お金の知識（税金・保険）
  | "work-rights"        // 労働者の権利（有給・法律）
  | "taishoku-daikou";   // 退職代行

export interface ArticleTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ArticleTimeline {
  items: Array<{ time: string; title: string; description?: string }>;
}

export interface ArticleCallout {
  type: "tip" | "warning" | "info";
  content: string;
}

export interface ArticleChecklist {
  items: string[];
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string;
  list?: string[];
  numberedList?: string[];
  table?: ArticleTable;
  timeline?: ArticleTimeline;
  callout?: ArticleCallout;
  checklist?: ArticleChecklist;
  blockquote?: string;
  subSections?: Array<{ id: string; heading: string; content: string }>;
}

export interface ArticleData {
  meta: {
    slug: string;
    title: string;
    description: string;
    category: ArticleCategory;
    publishedAt: string;
    updatedAt?: string;
    readingTime: number;
  };
  excerpt: string;
  faq: Array<{ question: string; answer: string }>;
  sections: ArticleSection[];
  relatedSlugs?: string[];
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "retirement-guide": "退職ガイド",
  "money": "お金の知識",
  "work-rights": "労働者の権利",
  "taishoku-daikou": "退職代行",
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  "retirement-guide": "bg-blue-100 text-blue-800",
  "money": "bg-emerald-100 text-emerald-800",
  "work-rights": "bg-purple-100 text-purple-800",
  "taishoku-daikou": "bg-orange-100 text-orange-800",
};
