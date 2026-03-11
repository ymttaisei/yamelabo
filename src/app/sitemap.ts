import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/tools/unemployment-insurance`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/retirement-tax`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tools/paid-leave`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/taishoku-daikou`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
