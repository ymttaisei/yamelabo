"use client";

import { ArrowRight, Scale, Briefcase } from "lucide-react";
import { TrackedCtaLink } from "@/components/ui/tracked-cta-link";

export function ArticleAfCta() {
  return (
    <aside
      aria-label="関連サービス"
      className="my-10 rounded-lg bg-white p-6"
    >
      <h2 className="text-[18px] font-bold text-[#252525]">
        退職後のサポートを探す
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#555555]">
        退職を考えている方に、信頼できるサービスを厳選しました。すべて無料で相談できます。
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <TrackedCtaLink
          href="/"
          ctaType="taishoku"
          ctaLocation="article"
          className="flex cursor-pointer items-center gap-3 rounded-[3px] bg-[#ffa215] px-4 py-3.5 shadow-[3px_3px_0_0_#d8d7d7] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#c0bfbf]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/30">
            <Scale className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">退職代行サービス比較</p>
            <p className="text-xs text-white/80">弁護士・労組運営の11社を比較</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-white" />
        </TrackedCtaLink>

        <TrackedCtaLink
          href="/tenshoku"
          ctaType="tenshoku"
          ctaLocation="article"
          className="flex cursor-pointer items-center gap-3 rounded-[3px] border border-[#0485c0]/30 bg-white px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0485c0]/10">
            <Briefcase className="h-4.5 w-4.5 text-[#0485c0]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#252525]">転職エージェント比較</p>
            <p className="text-xs text-[#555555]">10社をランキング形式で比較</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[#0485c0]" />
        </TrackedCtaLink>
      </div>
      <p className="mt-3 text-[11px] text-[#555555]">
        ※ 本セクションにはプロモーションが含まれています
      </p>
    </aside>
  );
}
