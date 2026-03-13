"use client";

import { ArrowRight, Scale, Briefcase } from "lucide-react";
import { TrackedCtaLink } from "@/components/ui/tracked-cta-link";

export function ToolResultCta() {
  return (
    <div className="space-y-4">
      {/* 退職代行CTA（主軸） */}
      <div className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffa215]/10">
          <Scale className="h-5 w-5 text-[#ffa215]" />
        </div>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">
          退職を言い出せないなら
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#555555]">
          弁護士法人・労働組合運営の信頼できる退職代行サービスを比較できます。
        </p>
        <TrackedCtaLink
          href="/"
          ctaType="taishoku"
          ctaLocation="tool_result"
          className="mt-4 inline-flex cursor-pointer items-center justify-center gap-1 rounded-[3px] bg-[#ffa215] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110 active:translate-y-px"
        >
          退職代行サービスを比較する
          <ArrowRight className="h-4 w-4" />
        </TrackedCtaLink>
      </div>

      {/* 転職エージェントCTA（補助） */}
      <div className="rounded-lg bg-white p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#0485c0]/10">
          <Briefcase className="h-5 w-5 text-[#0485c0]" />
        </div>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">
          次のキャリアを考えるなら
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#555555]">
          退職後のキャリアに不安がある方は、転職エージェントに無料相談してみましょう。
        </p>
        <TrackedCtaLink
          href="/tenshoku"
          ctaType="tenshoku"
          ctaLocation="tool_result"
          className="mt-4 inline-flex cursor-pointer items-center justify-center gap-1 rounded-[3px] bg-[#ffa215] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110 active:translate-y-px"
        >
          転職エージェントを比較する
          <ArrowRight className="ml-1 h-4 w-4" />
        </TrackedCtaLink>
      </div>
    </div>
  );
}
