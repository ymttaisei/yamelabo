import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import type { ArticleData } from "@/lib/column/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/column/types";

interface ArticleCardProps {
  article: ArticleData;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { meta, excerpt } = article;

  return (
    <Link href={`/column/${meta.slug}`} className="group cursor-pointer">
      <Card className="h-full border border-[#e0e0e0] bg-white shadow-none transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[meta.category]}`}
            >
              {CATEGORY_LABELS[meta.category]}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#555555]">
              <Clock className="size-3" />
              {meta.readingTime}分
            </span>
          </div>
          <h3 className="mt-3 text-[18px] font-bold leading-snug text-[#252525]">
            {meta.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#555555]">
            {excerpt.length > 100 ? `${excerpt.slice(0, 100)}…` : excerpt}
          </p>
          <p className="mt-4 flex items-center gap-1 text-sm font-medium text-[#0485c0] transition-all duration-200 group-hover:gap-2">
            読む
            <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
