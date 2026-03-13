import { Scale, Users, Building2 } from "lucide-react";

export function SelectionGuide() {
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="space-y-6">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">退職代行サービスの選び方</h2>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0485c0]/10">
            <Scale className="h-4.5 w-4.5 text-[#0485c0]" />
          </div>
          <div>
            <h3 className="font-medium text-[#252525]">弁護士法人</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#555555]">
              料金は高め（3〜6万円）だが、残業代請求や損害賠償対応も可能。トラブルが予想される場合におすすめ。
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2bbfb1]/10">
            <Users className="h-4.5 w-4.5 text-[#2bbfb1]" />
          </div>
          <div>
            <h3 className="font-medium text-[#252525]">労働組合</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#555555]">
              料金2〜3万円で、会社との交渉権あり。コスパ重視の方におすすめ。
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
            <Building2 className="h-4.5 w-4.5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-[#252525]">民間業者</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#555555]">
              最安（2万円〜）だが、交渉権なし。弁護士法違反リスクあり。2026年2月には大手民間業者の代表が逮捕される事件も発生しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
