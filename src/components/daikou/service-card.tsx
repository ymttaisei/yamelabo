"use client";

import type { TaishokuService } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { sendEvent } from "@/lib/gtag";
import { ExternalLink } from "lucide-react";

type Props = {
  service: TaishokuService;
};

const typeLabels: Record<TaishokuService["type"], string> = {
  lawyer: "弁護士法人",
  union: "労働組合",
  private: "民間業者",
};

const typeColors: Record<TaishokuService["type"], string> = {
  lawyer: "bg-blue-100 text-blue-800",
  union: "bg-emerald-100 text-emerald-800",
  private: "bg-gray-100 text-gray-800",
};

export function ServiceCard({ service }: Props) {
  const linkUrl = service.affiliateUrl || service.officialUrl;
  const linkRel = service.affiliateUrl
    ? "nofollow noopener sponsored"
    : "nofollow noopener";

  return (
    <Card className="relative overflow-hidden">
      {service.recommended && (
        <div className="absolute right-3 top-3">
          <Badge variant="default">おすすめ</Badge>
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <div className="mt-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[service.type]}`}
          >
            {typeLabels[service.type]}
          </span>
        </div>

        <p className="mt-3 text-xl font-bold">
          {formatCurrency(service.price)}
          <span className="text-sm font-normal text-muted-foreground">
            （税込）
          </span>
        </p>

        <ul className="mt-4 space-y-1.5">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-emerald-500">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {service.warning && (
          <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            ⚠ {service.warning}
          </p>
        )}

        <a
          href={linkUrl}
          target="_blank"
          rel={linkRel}
          onClick={() => sendEvent("affiliate_click", { service_name: service.name })}
          className={cn(
            buttonVariants({ variant: "default" }),
            "mt-5 w-full cursor-pointer shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110"
          )}
        >
          公式サイトを見る
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
        {/* Moshimo impression pixel */}
        {service.impressionUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.impressionUrl} width={1} height={1} style={{ border: "none" }} alt="" loading="lazy" />
        )}
      </CardContent>
    </Card>
  );
}
