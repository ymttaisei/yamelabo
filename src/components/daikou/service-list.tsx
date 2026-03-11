"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "./service-card";
import type { TaishokuService } from "@/lib/types";
import { sendEvent } from "@/lib/gtag";

type Props = {
  services: TaishokuService[];
};

const tabs = [
  { value: "all", label: "すべて" },
  { value: "lawyer", label: "弁護士法人" },
  { value: "union", label: "労働組合" },
  { value: "private", label: "民間" },
] as const;

export function ServiceList({ services }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? services
      : services.filter((s) => s.type === activeTab);

  return (
    <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); sendEvent("daikou_tab_change", { tab: v }); }}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {activeTab === "private" && (
        <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          ⚠
          民間業者は交渉権がなく、弁護士法違反のリスクがあります。弁護士法人または労働組合運営のサービスをおすすめします。
        </p>
      )}

      <TabsContent value={activeTab} className="mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
