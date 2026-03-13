"use client";

import { useState } from "react";
import { TenshokuServiceCard } from "./service-card";
import type { TenshokuService, TenshokuServiceType } from "@/lib/types";
import { sendEvent } from "@/lib/gtag";

type Props = {
  services: TenshokuService[];
};

const filters: { value: TenshokuServiceType | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "comprehensive", label: "総合型" },
  { value: "it-web", label: "IT・Web" },
  { value: "highclass", label: "ハイクラス" },
  { value: "young", label: "20代向け" },
];

export function TenshokuServiceList({ services }: Props) {
  const [activeFilter, setActiveFilter] = useState<
    TenshokuServiceType | "all"
  >("all");

  const filtered =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.type === activeFilter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="タイプ別フィルター">
        {filters.map((f) => {
          const count =
            f.value === "all"
              ? services.length
              : services.filter((s) => s.type === f.value).length;
          const isActive = activeFilter === f.value;

          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveFilter(f.value);
                sendEvent("tenshoku_tab_change", { tab: f.value });
              }}
              className={`cursor-pointer border-2 px-5 py-2 text-lg leading-[20.7px] font-medium transition-all ${
                isActive
                  ? "border-[#0485c0] bg-[#0485c0] text-white"
                  : "border-[#d8d7d7] bg-white text-[#252525] hover:border-[#0485c0]"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-80" : "opacity-50"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="mt-4 text-sm text-[#252525]/60">
        {filtered.length}件のエージェントを表示中
      </p>

      {/* Ranking list */}
      <div className="mt-4 space-y-4">
        {filtered.map((service, i) => (
          <TenshokuServiceCard
            key={service.id}
            service={service}
            rank={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
