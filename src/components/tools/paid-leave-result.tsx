import type { PaidLeaveResult } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  result: PaidLeaveResult;
};

function formatTenure(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m}ヶ月`;
  if (m === 0) return `${y}年`;
  return `${y}年${m}ヶ月`;
}

function formatDate(d: Date): string {
  return format(d, "yyyy年M月d日");
}

export function PaidLeaveResultCard({ result }: Props) {
  if (result.isBeforeFirstGrant) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-sm text-muted-foreground">あなたの有給休暇</p>
            <div className="mt-2 rounded-lg bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">
                まだ有給休暇は付与されていません
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                入社後6ヶ月
                {result.firstGrantDate && (
                  <>（{formatDate(result.firstGrantDate)}）</>
                )}
                に{result.nextGrantDays}日が付与されます
              </p>
            </div>
          </div>

          <dl className="space-y-2">
            <Row label="勤続年数" value={formatTenure(result.tenureMonths)} />
          </dl>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm text-muted-foreground">あなたの有給休暇</p>
          <div className="mt-2 rounded-lg bg-emerald-50 p-4">
            <p className="text-sm text-muted-foreground">最大保有日数</p>
            <p className="text-3xl font-bold text-emerald-600">
              {result.maxDays}日
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              今年度{result.currentGrant}日 + 前年度繰越
              {result.previousGrant}日
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">詳細</p>
          <dl className="space-y-2">
            <Row label="勤続年数" value={formatTenure(result.tenureMonths)} />
            <Row
              label="今年度の付与日数"
              value={`${result.currentGrant}日`}
            />
            <Row
              label="前年度の繰越日数"
              value={`${result.previousGrant}日（2年時効）`}
            />
            {result.nextGrantDate && (
              <>
                <Row
                  label="次回付与日"
                  value={formatDate(result.nextGrantDate)}
                />
                <Row
                  label="次回付与日数"
                  value={`${result.nextGrantDays}日`}
                />
              </>
            )}
          </dl>
        </div>

        <Separator />

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>・有給休暇の時効は付与日から2年間です</p>
          <p>
            ・退職時に未消化の有給を会社に買い取ってもらえるかは会社の規定によります
          </p>
          <p>・出勤率が8割未満の年度は付与されません</p>
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
