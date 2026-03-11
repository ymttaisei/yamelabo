import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllArticles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/tools/unemployment-insurance`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/retirement-tax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/paid-leave`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/column`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/taishoku-daikou`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/column/${article.meta.slug}`,
    lastModified: article.meta.updatedAt ?? article.meta.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
