import { Card, CardContent } from "@/components/ui/card";
import { Scale, Users, Building2 } from "lucide-react";

export function SelectionGuide() {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <h2 className="text-lg font-semibold">退職代行サービスの選び方</h2>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <Scale className="h-4.5 w-4.5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">弁護士法人</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              料金は高め（3〜6万円）だが、残業代請求や損害賠償対応も可能。トラブルが予想される場合におすすめ。
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <Users className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-medium">労働組合</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              料金2〜3万円で、会社との交渉権あり。コスパ重視の方におすすめ。
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
            <Building2 className="h-4.5 w-4.5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium">民間業者</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              最安（2万円〜）だが、交渉権なし。弁護士法違反リスクあり。2026年2月には大手民間業者の代表が逮捕される事件も発生しています。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
