"use client";

import Image from "next/image";
import type { TaishokuService, TaishokuServiceType } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { sendEvent } from "@/lib/gtag";
import { ExternalLink } from "lucide-react";

type Props = {
  service: TaishokuService;
  rank: number;
};

const typeLabels: Record<TaishokuServiceType, string> = {
  lawyer: "弁護士法人",
  union: "労働組合",
  private: "民間業者",
};

const typeColors: Record<TaishokuServiceType, string> = {
  lawyer: "bg-[#0485c0]/10 text-[#0485c0]",
  union: "bg-[#2bbfb1]/10 text-[#0b4d64]",
  private: "bg-gray-100 text-gray-600",
};

function RankBadge({ rank }: { rank: number }) {
  const isTop3 = rank <= 3;
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white",
        isTop3 ? "bg-[#0485c0]" : "bg-gray-400"
      )}
    >
      {rank}
    </span>
  );
}

function LogoPlaceholder({ name, type }: { name: string; type: TaishokuServiceType }) {
  const bgColors: Record<TaishokuServiceType, string> = {
    lawyer: "from-blue-500 to-blue-600",
    union: "from-emerald-500 to-emerald-600",
    private: "from-gray-400 to-gray-500",
  };
  return (
    <div
      className={cn(
        "flex h-[72px] w-[72px] items-center justify-center bg-gradient-to-br text-2xl font-bold text-white shadow-inner",
        bgColors[type]
      )}
    >
      {name.charAt(0)}
    </div>
  );
}

export function TaishokuRankingCard({ service, rank }: Props) {
  const linkUrl = service.affiliateUrl || service.officialUrl;
  const linkRel = service.affiliateUrl
    ? "nofollow noopener sponsored"
    : "nofollow noopener";
  const isTop3 = rank <= 3;

  return (
    <article
      className={cn(
        "overflow-hidden border bg-white",
        isTop3
          ? "border-l-4 border-l-[#0485c0] border-t-[#d8d7d7] border-r-[#d8d7d7] border-b-[#d8d7d7]"
          : "border-l-4 border-l-[#d8d7d7] border-t-[#d8d7d7] border-r-[#d8d7d7] border-b-[#d8d7d7]"
      )}
    >
      <div className="p-5 md:p-6">
        {/* Top row: Rank + Name + Type badge + Recommend */}
        <div className="flex items-center gap-3">
          <RankBadge rank={rank} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold leading-tight">{service.name}</h3>
              <span
                className={cn(
                  "inline-block shrink-0 rounded-sm px-2 py-px text-[11px] font-medium",
                  typeColors[service.type]
                )}
              >
                {typeLabels[service.type]}
              </span>
              {service.recommended && (
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-sm bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  おすすめ
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body: Logo + Specs */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-5">
          {/* Logo */}
          <div className="flex shrink-0 justify-center sm:justify-start">
            {service.logoUrl ? (
              <Image
                src={service.logoUrl}
                alt={`${service.name}のロゴ`}
                width={72}
                height={72}
                className="h-[72px] w-[72px] border border-[#d8d7d7] object-contain p-1.5"
              />
            ) : (
              <LogoPlaceholder name={service.name} type={service.type} />
            )}
          </div>

          {/* Specs table */}
          <div className="flex-1">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#d8d7d7]">
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-gray-600">
                    料金
                  </td>
                  <td className="py-2 pl-3 font-semibold">
                    {formatCurrency(service.price)}
                    <span className="text-xs font-normal text-gray-500">（税込）</span>
                  </td>
                </tr>
                <tr className="border-b border-[#d8d7d7]">
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-gray-600">
                    対応速度
                  </td>
                  <td className="py-2 pl-3">{service.responseTime}</td>
                </tr>
                <tr className="border-b border-[#d8d7d7]">
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-gray-600">
                    相談方法
                  </td>
                  <td className="py-2 pl-3">{service.consultationMethod}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-gray-600">
                    返金保証
                  </td>
                  <td className="py-2 pl-3">
                    {service.refundPolicy ?? "なし"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Strength */}
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {service.strength}
        </p>

        {/* Feature tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {service.features.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-sm border border-[#2bbfb1]/30 bg-[#2bbfb1]/10 px-2 py-0.5 text-xs font-medium text-[#0b4d64]"
            >
              <svg className="h-3 w-3 shrink-0 text-[#2bbfb1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </span>
          ))}
        </div>

        {/* Warning for private operators */}
        {service.warning && (
          <p className="mt-3 border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            ⚠ {service.warning}
          </p>
        )}

        {/* CTA */}
        <a
          href={linkUrl}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            sendEvent("affiliate_click", { service_name: service.name })
          }
          className="mt-5 flex w-full items-center justify-center gap-2 bg-[#ffa215] py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#e8920f]"
          style={{ borderRadius: "3px", boxShadow: "#d8d7d7 3px 3px 0px 0px" }}
        >
          公式サイトを見る
          <ExternalLink className="h-4 w-4" />
        </a>
        {/* Moshimo impression pixel */}
        {service.impressionUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.impressionUrl} width={1} height={1} style={{ border: "none" }} alt="" loading="lazy" />
        )}
      </div>
    </article>
  );
}
