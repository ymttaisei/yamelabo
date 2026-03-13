import type { Metadata } from "next";
import Link from "next/link";
import { PaidLeaveForm } from "@/components/tools/paid-leave-form";
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
import { ChevronRight, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title:
    "有給休暇の日数計算ツール【2026年最新】入社日から自動計算",
  description:
    "入社日と雇用形態を入力するだけで、労働基準法に基づく有給休暇の付与日数を自動計算。フルタイム・パートタイム（週1〜4日）に対応し、前年度からの繰越日数も表示します。",
};

const faqs = [
  {
    question: "有給休暇は入社何ヶ月後からもらえますか？",
    answer:
      "フルタイム勤務の場合、入社後6ヶ月経過し、その間の出勤率が8割以上であれば10日の有給休暇が付与されます。",
  },
  {
    question: "有給休暇の最大日数は？",
    answer:
      "フルタイムの場合、年間最大20日です。前年度の繰越（時効2年）と合わせると、最大40日保有できます。",
  },
  {
    question: "退職時に有給を買い取ってもらえますか？",
    answer:
      "法律上、会社に有給の買取義務はありません。ただし退職時の未消化分については、会社の規定により買取が認められるケースもあります。",
  },
];

export default function PaidLeavePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd(
            "有給休暇日数計算ツール",
            "/tools/paid-leave",
            "入社日を入力するだけで、法定の有給休暇付与日数を自動計算。フルタイム・パートタイム対応。"
          ),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "有給休暇計算", href: "/tools/paid-leave" },
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
            <span className="text-white">有給休暇計算</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <CalendarDays className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                有給休暇の日数計算ツール
              </h1>
              <p className="text-sm text-white/80">2026年最新版</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-white/90">
            入社日と雇用形態を入力するだけで、法定の有給休暇付与日数を自動計算します。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <PaidLeaveForm />

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
