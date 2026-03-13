"use client";

/**
 * Pattern C — FACLOG-inspired Hero
 * Teal-blue gradient background + illustration right + left-aligned heading.
 */

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function HeroPatternC({
  serviceCount,
}: {
  serviceCount: number;
  imageId?: string;
  onImageChange?: (id: string) => void;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0485c0 0%, #2bbfb1 100%)",
        paddingTop: 80,
        minHeight: 735,
      }}
    >
      {/* Illustration — right half (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-1/2 md:flex md:items-center md:justify-center">
        <Image
          src="/images/hero/hero-illustration.png"
          alt=""
          width={500}
          height={375}
          className="h-auto max-h-[90%] w-auto max-w-[95%] object-contain"
          sizes="40vw"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl items-center px-4 py-16 md:py-24">
        <div className="max-w-xl">
          {/* Service count badges — teal pill style */}
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold tracking-[0.04em] text-white backdrop-blur-sm">
              掲載サービス
              <span className="text-[15px] font-extrabold text-[#ffa215]">
                {serviceCount}
              </span>
              社
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold tracking-[0.04em] text-white backdrop-blur-sm">
              弁護士法人・労働組合を厳選
            </span>
          </div>

          {/* heroSubtitle — FACLOG token: 30px, fontWeight 500, lineHeight 34.5px */}
          <p
            className="mt-5 text-white/80"
            style={{
              fontSize: 30,
              fontWeight: 500,
              lineHeight: "34.5px",
              letterSpacing: "2.4px",
            }}
          >
            退職代行 口コミ・評判
          </p>

          {/* Main heading — large white text */}
          <h1
            className="mt-3 font-black text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.2,
              letterSpacing: "2.4px",
            }}
          >
            退職代行おすすめ<br />
            ランキング
          </h1>

          {/* Subtitle description */}
          <p
            className="mt-6 max-w-lg text-[15px] leading-[1.9] text-white/90"
            style={{ letterSpacing: "0.02em" }}
          >
            弁護士法人・労働組合運営のサービスを料金・実績・サポート力で
            徹底比較。すべて無料で相談できます。
          </p>

          {/* Trust checklist */}
          <div className="mt-6 flex flex-col gap-2.5">
            {[
              "弁護士が直接対応するサービスを掲載",
              "料金・成功率・返金保証で比較",
              "LINEで無料相談OK",
            ].map((text) => (
              <span
                key={text}
                className="flex items-center gap-2 text-[13px] text-white/85"
                style={{ letterSpacing: "0.01em" }}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                {text}
              </span>
            ))}
          </div>

          {/* Illustration — mobile only, below text */}
          <div className="mt-8 flex justify-center md:hidden">
            <Image
              src="/images/hero/hero-illustration.png"
              alt=""
              width={400}
              height={300}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
