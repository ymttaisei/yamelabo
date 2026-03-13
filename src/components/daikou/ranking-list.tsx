"use client";

import { useState } from "react";
import { TaishokuRankingCard } from "./ranking-card";
import type { TaishokuService, TaishokuServiceType } from "@/lib/types";
import { sendEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

type Props = {
  services: TaishokuService[];
};

const filters: { value: TaishokuServiceType | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "lawyer", label: "弁護士法人" },
  { value: "union", label: "労働組合" },
  { value: "private", label: "民間" },
];

export function TaishokuRankingList({ services }: Props) {
  const [activeFilter, setActiveFilter] = useState<TaishokuServiceType | "all">("all");

  const filtered =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.type === activeFilter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count =
            f.value === "all"
              ? services.length
              : services.filter((s) => s.type === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter(f.value);
                sendEvent("daikou_tab_change", { tab: f.value });
              }}
              className={cn(
                "cursor-pointer rounded-full border-2 px-5 py-2 text-lg font-medium leading-[20.7px] transition-colors duration-200",
                activeFilter === f.value
                  ? "border-[#0485c0] bg-[#0485c0] text-white"
                  : "border-[#d8d7d7] bg-white text-[#252525] hover:border-[#0485c0]"
              )}
            >
              {f.label}
              <span className="ml-1 text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Private warning */}
      {activeFilter === "private" && (
        <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          ⚠ 民間業者は交渉権がなく、弁護士法違反のリスクがあります。弁護士法人または労働組合運営のサービスをおすすめします。
        </p>
      )}

      {/* Results count */}
      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length}件のサービスを表示中
      </p>

      {/* Ranking cards */}
      <div className="mt-4 space-y-4">
        {filtered.map((service, i) => (
          <TaishokuRankingCard
            key={service.id}
            service={service}
            rank={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
