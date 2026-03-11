import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { TOOLS } from "@/lib/constants";

export function ArticleToolCta() {
  return (
    <aside
      aria-label="関連ツール"
      className="my-10 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-blue-50/80 to-white p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Calculator className="h-5.5 w-5.5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold">
          退職のお金を計算してみましょう
        </h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        失業保険・退職金の手取り・有給休暇の日数を、30秒で無料シミュレーションできます。
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-lg">{tool.emoji}</span>
            <span className="flex-1">{tool.name}</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </aside>
  );
}
