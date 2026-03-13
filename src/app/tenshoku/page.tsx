import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TenshokuServiceList } from "@/components/tenshoku/service-list";
import { tenshokuServices } from "@/data/tenshoku-services";
import {
  JsonLd,
  itemListJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, Briefcase, ArrowRight, Building2, Layers, BadgeCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title:
    "転職エージェントおすすめ比較ランキング【2026年最新】退職後のキャリアを無料サポート",
  description:
    "総合型・IT特化・ハイクラス・20代向けの転職エージェント10社を特徴・求人数・対応エリアで徹底比較。2026年最新のおすすめランキング。すべて無料で利用でき、退職前の相談もOK。",
};

const faqs = [
  {
    question: "転職エージェントとは何ですか？",
    answer:
      "転職エージェントは、求職者と企業の間に立って転職活動をサポートするサービスです。キャリアアドバイザーが求人紹介・書類添削・面接対策・年収交渉まで一貫して支援してくれます。",
  },
  {
    question: "転職エージェントの利用料金は？",
    answer:
      "転職エージェントは求職者側は完全無料で利用できます。エージェントの報酬は、採用が決まった企業側が支払う成功報酬型のため、求職者に費用が発生することはありません。",
  },
  {
    question: "転職エージェントと転職サイトの違いは？",
    answer:
      "転職サイトは自分で求人を検索して応募するセルフサービス型です。転職エージェントは専任のアドバイザーが付き、非公開求人の紹介や面接対策など手厚いサポートを受けられます。併用がおすすめです。",
  },
  {
    question: "退職前に転職エージェントに登録できますか？",
    answer:
      "はい、退職前の登録・相談が可能です。むしろ在職中に転職活動を始める方が大半です。退職時期の相談や、現職と並行した転職スケジュールの調整もアドバイザーがサポートしてくれます。",
  },
  {
    question: "転職エージェントは複数登録してもいいですか？",
    answer:
      "はい、複数のエージェントに登録するのがおすすめです。エージェントごとに保有する非公開求人が異なるため、2〜3社に登録することで選択肢が広がります。",
  },
  {
    question: "転職エージェントを使うメリットは？",
    answer:
      "非公開求人の紹介、書類添削・面接対策、年収交渉の代行、業界のリアルな情報提供など多くのメリットがあります。特に初めての転職では、プロのサポートを受けることで成功率が大きく上がります。",
  },
];

export default function TenshokuPage() {
  const serviceCount = tenshokuServices.length;
  const typeCount = new Set(tenshokuServices.map((s) => s.type)).size;

  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd(
            tenshokuServices.map((s) => ({ name: s.name, url: s.officialUrl }))
          ),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "転職エージェント比較", href: "/tenshoku" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* Hero */}
      <section className="border-b bg-[#edf4f6] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <nav aria-label="パンくずリスト" className="mb-4 flex items-center gap-1 text-sm text-[#252525]/60">
            <Link href="/" className="cursor-pointer transition-colors duration-200 hover:text-[#0485c0]">
              ホーム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#252525]">転職エージェント比較</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0485c0]/10">
              <Briefcase className="h-5.5 w-5.5 text-[#0485c0]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#252525] md:text-3xl">
                転職エージェント おすすめ比較ランキング
              </h1>
              <p className="text-sm text-[#252525]/60">2026年最新版</p>
            </div>
          </div>

          <p className="mt-4 leading-relaxed text-[#252525]/70">
            退職・転職を考えるすべての方へ。総合型・IT特化・ハイクラス・20代向けの転職エージェントを求人数・対応エリア・サポート力で徹底比較しました。
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 border bg-white px-3 py-3">
              <Building2 className="h-5 w-5 shrink-0 text-[#0485c0]" />
              <div>
                <p className="text-lg font-bold text-[#252525]">{serviceCount}<span className="text-sm font-medium">社</span></p>
                <p className="text-[11px] text-[#252525]/60">掲載数</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 border bg-white px-3 py-3">
              <Layers className="h-5 w-5 shrink-0 text-[#0485c0]" />
              <div>
                <p className="text-lg font-bold text-[#252525]">{typeCount}<span className="text-sm font-medium">タイプ</span></p>
                <p className="text-[11px] text-[#252525]/60">カテゴリ</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 border bg-white px-3 py-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-[#2bbfb1]" />
              <div>
                <p className="text-lg font-bold text-[#252525]">無料</p>
                <p className="text-[11px] text-[#252525]/60">利用料金</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <div className="border-b bg-[#ffa215]/10 py-2.5">
        <p className="mx-auto max-w-3xl px-4 text-center text-xs text-[#252525]/70">
          本ページにはプロモーションが含まれています
        </p>
      </div>

      {/* Ranking section */}
      <section className="bg-[#edf4f6] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[#0485c0] text-2xl font-bold leading-9 tracking-[2.4px] text-center mb-10">
            転職エージェント ランキング
          </h2>
          <TenshokuServiceList services={tenshokuServices} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-[#0485c0] text-2xl font-bold leading-9 tracking-[2.4px] text-center mb-10">
            転職エージェントに関するよくある質問
          </h2>
          <Accordion multiple className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="cursor-pointer text-left text-sm text-[#252525]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#252525]/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-link sections */}
      <section className="bg-[#edf4f6] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 space-y-5">
          {/* Cross-link: 退職代行 */}
          <div className="border bg-white p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center bg-[#0485c0]/10">
              <Scale className="h-5 w-5 text-[#0485c0]" />
            </div>
            <h2 className="mt-3 text-lg font-semibold text-[#252525]">退職を言い出せないなら</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#252525]/70">
              弁護士法人・労働組合運営の信頼できる退職代行サービスを比較できます。
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#ffa215] rounded-[3px] shadow-[3px_3px_0_0_#d8d7d7] px-6 py-3 text-[15px] font-bold text-white transition-all hover:brightness-110 active:translate-y-px"
            >
              退職代行サービスを比較する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Reverse CTA: tools */}
          <div className="border bg-white p-6 text-center">
            <h2 className="text-lg font-semibold text-[#252525]">
              退職前にお金の計算はお済みですか？
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#252525]/70">
              失業保険・退職金・有給休暇を無料で計算できます。
            </p>
            <Link
              href="/tools/unemployment-insurance"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#ffa215] rounded-[3px] shadow-[3px_3px_0_0_#d8d7d7] px-6 py-3 text-[15px] font-bold text-white transition-all hover:brightness-110 active:translate-y-px"
            >
              失業保険を計算する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
