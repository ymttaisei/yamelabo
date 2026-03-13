"use client";

import Image from "next/image";
import type { TenshokuService, TenshokuServiceType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { sendEvent } from "@/lib/gtag";
import { ExternalLink, Star } from "lucide-react";

type Props = {
  service: TenshokuService;
  rank: number;
};

const typeLabels: Record<TenshokuServiceType, string> = {
  comprehensive: "総合型",
  "it-web": "IT・Web特化",
  highclass: "ハイクラス",
  young: "20代向け",
};

const typeColors: Record<TenshokuServiceType, string> = {
  comprehensive: "bg-[#0485c0]/10 text-[#0485c0] border-[#0485c0]/30",
  "it-web": "bg-[#2bbfb1]/10 text-[#0b4d64] border-[#2bbfb1]/30",
  highclass: "bg-[#ffa215]/10 text-[#0b4d64] border-[#ffa215]/30",
  young: "bg-[#0485c0]/10 text-[#0485c0] border-[#0485c0]/30",
};

function RankBadge({ rank }: { rank: number }) {
  const isTop3 = rank <= 3;
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
        isTop3 ? "bg-[#0485c0] text-white" : "bg-gray-400 text-white"
      )}
    >
      {rank}
    </span>
  );
}

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-[72px] w-[72px] items-center justify-center bg-[#edf4f6] text-2xl font-bold text-[#0485c0]">
      {name.charAt(0)}
    </div>
  );
}

export function TenshokuServiceCard({ service, rank }: Props) {
  const linkUrl = service.affiliateUrl || service.officialUrl;
  const linkRel = service.affiliateUrl
    ? "nofollow noopener sponsored"
    : "nofollow noopener";
  const isTop3 = rank <= 3;

  return (
    <article
      className={cn(
        "overflow-hidden border-l-4 bg-white",
        isTop3 ? "border-l-[#0485c0]" : "border-l-[#d8d7d7]"
      )}
    >
      <div className="p-5 md:p-6">
        {/* Top row: Rank + Name + Type badge + Recommend */}
        <div className="flex items-center gap-3">
          <RankBadge rank={rank} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold leading-tight text-[#252525]">{service.name}</h3>
              <span
                className={cn(
                  "inline-block shrink-0 rounded-full border px-2 py-px text-[11px] font-medium",
                  typeColors[service.type]
                )}
              >
                {typeLabels[service.type]}
              </span>
              {service.recommended && (
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#ffa215] px-2 py-0.5 text-[10px] font-bold text-white">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  おすすめ
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body: Logo + Specs (horizontal on md+, stacked on mobile) */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-5">
          {/* Logo */}
          <div className="flex shrink-0 justify-center sm:justify-start">
            {service.logoUrl ? (
              <Image
                src={service.logoUrl}
                alt={`${service.name}のロゴ`}
                width={72}
                height={72}
                className="h-[72px] w-[72px] border object-contain p-1.5"
              />
            ) : (
              <LogoPlaceholder name={service.name} />
            )}
          </div>

          {/* Specs table */}
          <div className="flex-1">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-[#252525]/70">
                    求人数
                  </td>
                  <td className="py-2 pl-3 font-semibold text-[#252525]">{service.jobCount}</td>
                </tr>
                <tr className="border-b">
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-[#252525]/70">
                    対応エリア
                  </td>
                  <td className="py-2 pl-3 text-[#252525]">{service.area}</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap bg-[#edf4f6] py-2 pl-3 pr-4 font-medium text-[#252525]/70">
                    強み
                  </td>
                  <td className="py-2 pl-3 text-[#252525]">{service.strength}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-[#252525]/70">
          {service.description}
        </p>

        {/* Feature tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {service.features.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-md border border-[#2bbfb1]/30 bg-[#2bbfb1]/10 px-2 py-0.5 text-xs font-medium text-[#0b4d64]"
            >
              <svg className="h-3 w-3 shrink-0 text-[#2bbfb1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={linkUrl}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            sendEvent("affiliate_click", { service_name: service.name })
          }
          className="mt-5 flex w-full items-center justify-center gap-2 bg-[#ffa215] rounded-[3px] shadow-[3px_3px_0_0_#d8d7d7] py-3.5 text-[15px] font-bold text-white transition-all hover:brightness-110 active:translate-y-px"
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
