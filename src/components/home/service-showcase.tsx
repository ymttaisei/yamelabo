import Link from "next/link";
import { ArrowRight, Briefcase, Scale, ExternalLink } from "lucide-react";
import { tenshokuServices } from "@/data/tenshoku-services";
import { taishokuServices } from "@/data/taishoku-services";
import type { TenshokuServiceType } from "@/lib/types";

const typeLabels: Record<TenshokuServiceType, string> = {
  comprehensive: "総合型",
  "it-web": "IT・Web",
  highclass: "ハイクラス",
  young: "20代向け",
};

const typeColors: Record<TenshokuServiceType, string> = {
  comprehensive: "bg-blue-50 text-blue-700",
  "it-web": "bg-purple-50 text-purple-700",
  highclass: "bg-amber-50 text-amber-700",
  young: "bg-emerald-50 text-emerald-700",
};

const daikouTypeLabels: Record<string, string> = {
  lawyer: "弁護士法人",
  union: "労働組合",
  private: "民間",
};

const daikouTypeColors: Record<string, string> = {
  lawyer: "bg-red-50 text-red-700",
  union: "bg-blue-50 text-blue-700",
  private: "bg-gray-100 text-gray-700",
};

export function ServiceShowcase() {
  const topTenshoku = tenshokuServices.filter((s) => s.recommended).slice(0, 3);
  const topTaishoku = taishokuServices.filter((s) => s.recommended).slice(0, 3);

  return (
    <section className="border-t bg-white py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <p className="mb-8 text-center text-xs text-muted-foreground">
          ※ 本セクションにはプロモーションが含まれています
        </p>

        {/* 転職エージェント TOP3 */}
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
              <Briefcase className="h-4.5 w-4.5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold">おすすめ転職エージェント TOP3</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            退職後のキャリアに不安がある方は、転職エージェントに無料相談してみましょう。
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {topTenshoku.map((service, i) => (
              <div
                key={service.id}
                className="flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                    {i + 1}
                  </span>
                  <h3 className="font-bold leading-tight">{service.name}</h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className={`rounded-full px-2 py-px text-[11px] font-medium ${typeColors[service.type]}`}>
                    {typeLabels[service.type]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    求人{service.jobCount}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {service.strength}
                </p>
                <a
                  href={service.affiliateUrl || service.officialUrl}
                  target="_blank"
                  rel={service.affiliateUrl ? "nofollow noopener sponsored" : "nofollow noopener"}
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600"
                >
                  公式サイトを見る
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/tenshoku"
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
            >
              全10社のランキングを見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 退職代行 TOP3 */}
        <div className="mt-14">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
              <Scale className="h-4.5 w-4.5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold">おすすめ退職代行サービス</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            退職を言い出せない方は、弁護士・労組運営の退職代行に相談してみましょう。
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {topTaishoku.map((service, i) => (
              <div
                key={service.id}
                className="flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <h3 className="font-bold leading-tight">{service.name}</h3>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className={`rounded-full px-2 py-px text-[11px] font-medium ${daikouTypeColors[service.type]}`}>
                    {daikouTypeLabels[service.type]}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {service.price.toLocaleString()}円
                  </span>
                </div>
                <ul className="mt-2 flex-1 space-y-0.5">
                  {service.features.slice(0, 2).map((f, j) => (
                    <li key={j} className="flex items-start gap-1 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-emerald-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={service.affiliateUrl || service.officialUrl}
                  target="_blank"
                  rel={service.affiliateUrl ? "nofollow noopener sponsored" : "nofollow noopener"}
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  公式サイトを見る
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/taishoku-daikou"
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              全11社の比較を見る
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
