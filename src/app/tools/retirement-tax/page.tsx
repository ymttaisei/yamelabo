import type { Metadata } from "next";
import Link from "next/link";
import { RetirementTaxForm } from "@/components/tools/retirement-tax-form";
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
import { ChevronRight, Receipt } from "lucide-react";

export const metadata: Metadata = {
  title:
    "退職金の手取り計算シミュレーター【2026年最新】税金・控除額を自動計算",
  description:
    "退職金の手取り額を無料で自動計算。退職所得控除・所得税・復興特別所得税・住民税の内訳が一目でわかります。勤続5年以下の短期退職特例（2022年改正）にも対応。",
};

const faqs = [
  {
    question: "退職金に税金はかかりますか？",
    answer:
      "はい、退職金にも所得税と住民税がかかります。ただし「退職所得控除」という大きな控除があるため、勤続年数が長いほど税金は少なくなります。",
  },
  {
    question: "退職金の税金はいつ払いますか？",
    answer:
      "退職時に会社が源泉徴収するため、原則として確定申告は不要です。「退職所得の受給に関する申告書」を会社に提出してください。",
  },
  {
    question: "勤続年数が短いと不利ですか？",
    answer:
      "2022年の改正で、勤続5年以下の場合は退職所得控除後の300万円超の部分に1/2課税が適用されなくなりました。短期勤続の場合は税負担が増える可能性があります。",
  },
];

export default function RetirementTaxPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationJsonLd(
            "退職金手取り計算シミュレーター",
            "/tools/retirement-tax",
            "退職金の手取り額を自動計算。退職所得控除、所得税、住民税の内訳もわかります。"
          ),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "退職金税金計算", href: "/tools/retirement-tax" },
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
            <span className="text-white">退職金税金計算</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <Receipt className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                退職金の手取り計算シミュレーター
              </h1>
              <p className="text-sm text-white/80">2026年最新版</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-white/90">
            退職金額と勤続年数を入力するだけで、税金の内訳と手取り額を自動計算します。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <RetirementTaxForm />

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
