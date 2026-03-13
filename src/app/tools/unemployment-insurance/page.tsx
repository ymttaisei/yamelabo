import type { Metadata } from "next";
import Link from "next/link";
import { UnemploymentForm } from "@/components/tools/unemployment-form";
import {
  JsonLd,
  webApplicationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title:
    "失業保険計算シミュレーター【2026年最新】基本手当日額・給付日数を自動計算",
  description:
    "年齢・月給・勤続年数・離職理由を入力するだけで、失業保険（雇用保険基本手当）の日額・給付日数・総額を自動計算。令和7年4月改正対応。",
};

const faqs = [
  {
    question: "失業保険はいくらもらえますか？",
    answer:
      "基本手当日額は離職前6ヶ月の給与をもとに計算され、おおよそ月給の50〜80%です。年齢や給与額によって給付率が変わります。",
  },
  {
    question: "失業保険をもらえる期間は？",
    answer:
      "自己都合退職の場合90〜150日、会社都合退職の場合90〜330日です。年齢と勤続年数によって異なります。",
  },
  {
    question: "自己都合退職でもすぐもらえますか？",
    answer:
      "2025年4月の法改正により、給付制限が2ヶ月から1ヶ月に短縮されました。待期7日間＋給付制限1ヶ月後に受給開始できます。",
  },
  {
    question: "失業保険に税金はかかりますか？",
    answer:
      "いいえ、失業保険（雇用保険基本手当）は非課税です。確定申告も不要です。",
  },
  {
    question: "パート・アルバイトでも失業保険はもらえますか？",
    answer:
      "週20時間以上勤務し、31日以上の雇用見込みがあれば雇用保険に加入でき、失業保険の対象になります。",
  },
];

export default function UnemploymentInsurancePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd(
            "失業保険計算シミュレーター",
            "/tools/unemployment-insurance",
            "年齢・月給・勤続年数・離職理由を入力するだけで、失業保険の日額・給付日数・総額を自動計算。"
          ),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "失業保険計算", href: "/tools/unemployment-insurance" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#0485c0] to-[#2bbfb1] py-10 md:py-14">
        <div className="mx-auto max-w-2xl px-4">
          <nav aria-label="パンくずリスト" className="mb-4 flex items-center gap-1 text-sm text-white/80">
            <Link href="/" className="cursor-pointer transition-colors duration-200 hover:text-white">
              ホーム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">失業保険計算</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <ShieldCheck className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                失業保険計算シミュレーター
              </h1>
              <p className="text-sm text-white/80">2026年最新版</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-white/90">
            年齢・月給・勤続年数を入力するだけで、基本手当日額と給付総額を自動計算します。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <UnemploymentForm />

        <section className="mt-14">
          <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">よくある質問</h2>
          <Accordion multiple className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="cursor-pointer text-left text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
