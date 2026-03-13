import type { UnemploymentResult } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  result: UnemploymentResult;
};

export function UnemploymentResultCard({ result }: Props) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm text-muted-foreground">あなたの失業保険</p>
          <div className="mt-2 rounded-lg bg-[#2bbfb1]/10 p-4">
            <p className="text-sm text-muted-foreground">総支給額（非課税）</p>
            <p className="text-3xl font-bold text-[#2bbfb1]">
              {formatCurrency(result.totalAmount)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              基本手当日額 {formatCurrency(result.dailyBenefit)} ×{" "}
              {result.totalDays}日
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">詳細</p>
          <dl className="space-y-2">
            <Row label="賃金日額" value={formatCurrency(result.dailyWage)} />
            <Row
              label="基本手当日額"
              value={formatCurrency(result.dailyBenefit)}
            />
            <Row
              label="給付率"
              value={`${(result.benefitRate * 100).toFixed(1)}%`}
            />
            <Row
              label="所定給付日数"
              value={`${result.totalDays}日`}
            />
            <Row
              label="待期期間"
              value={`${result.waitingPeriod}日`}
            />
            <Row
              label="給付制限"
              value={
                result.restrictionMonths > 0
                  ? `${result.restrictionMonths}ヶ月`
                  : "なし"
              }
            />
          </dl>
        </div>

        <Separator />

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>・失業保険は非課税です（確定申告不要）</p>
          <p>・受給にはハローワークでの求職申込が必要です</p>
          <p>・※5年間に3回以上離職の場合、給付制限は3ヶ月です</p>
          <p>
            ・本計算は令和6年8月〜令和7年7月の基準額に基づいています
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
