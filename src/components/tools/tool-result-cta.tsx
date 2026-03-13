"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, Scale, Briefcase } from "lucide-react";
import { TrackedCtaLink } from "@/components/ui/tracked-cta-link";

export function ToolResultCta() {
  return (
    <div className="space-y-4">
      {/* 退職代行CTA（主軸） */}
      <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-r from-orange-50/80 to-white p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
          <Scale className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="mt-3 text-lg font-semibold">
          退職を言い出せないなら
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          弁護士法人・労働組合運営の信頼できる退職代行サービスを比較できます。
        </p>
        <TrackedCtaLink
          href="/"
          ctaType="taishoku"
          ctaLocation="tool_result"
          className="mt-4 inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg active:translate-y-px"
        >
          退職代行サービスを比較する
          <ArrowRight className="h-4 w-4" />
        </TrackedCtaLink>
      </div>

      {/* 転職エージェントCTA（補助） */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
          <Briefcase className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="mt-3 text-lg font-semibold">
          次のキャリアを考えるなら
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          退職後のキャリアに不安がある方は、転職エージェントに無料相談してみましょう。
        </p>
        <TrackedCtaLink
          href="/tenshoku"
          ctaType="tenshoku"
          ctaLocation="tool_result"
          className={cn(
            buttonVariants({ variant: "default" }),
            "mt-4 cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110"
          )}
        >
          転職エージェントを比較する
          <ArrowRight className="ml-1 h-4 w-4" />
        </TrackedCtaLink>
      </div>
    </div>
  );
}
