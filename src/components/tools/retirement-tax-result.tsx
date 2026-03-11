import type { RetirementTaxResult } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  result: RetirementTaxResult;
  retirementPay: number;
};

export function RetirementTaxResultCard({ result, retirementPay }: Props) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm text-muted-foreground">退職金の手取り額</p>
          <div className="mt-2 rounded-lg bg-emerald-50 p-4">
            <p className="text-sm text-muted-foreground">手取り額</p>
            <p className="text-3xl font-bold text-emerald-600">
              {formatCurrency(result.takeHome)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              退職金 {formatCurrency(retirementPay)} → 税金{" "}
              {formatCurrency(result.totalTax)}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">控除</p>
          <dl className="space-y-2">
            <Row label="退職所得控除額" value={formatCurrency(result.deduction)} />
            <Row
              label="課税退職所得"
              value={formatCurrency(result.taxableIncome)}
            />
          </dl>
        </div>

        <Separator />

        <div>
          <p className="mb-3 text-sm font-semibold">税金内訳</p>
          <dl className="space-y-2">
            <Row label="所得税" value={formatCurrency(result.incomeTax)} />
            <Row
              label="復興特別所得税"
              value={formatCurrency(result.reconstructionTax)}
            />
            <Row label="住民税" value={formatCurrency(result.residentTax)} />
            <Row
              label="税金合計"
              value={formatCurrency(result.totalTax)}
              bold
            />
            <Row
              label="実効税率"
              value={`${(result.effectiveRate * 100).toFixed(1)}%`}
            />
          </dl>
        </div>

        <Separator />

        <div className="space-y-1 text-xs text-muted-foreground">
          <p>・退職金にかかる税金は給与所得より優遇されています</p>
          <p>・退職所得控除は勤続年数が長いほど大きくなります</p>
          <p>
            ・税金は退職時に源泉徴収されます（確定申告は原則不要）
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={bold ? "font-semibold" : ""}>{value}</dd>
    </div>
  );
}
