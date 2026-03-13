import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/daikou/service-list";
import { SelectionGuide } from "@/components/daikou/selection-guide";
import { taishokuServices } from "@/data/taishoku-services";
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
import { ChevronRight, Scale, ArrowRight, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title:
    "退職代行サービスおすすめ比較【2026年最新】弁護士・労組運営の信頼できるサービス厳選",
  description:
    "弁護士法人・労働組合運営の退職代行サービス11社を料金・特徴・交渉権の有無で徹底比較。2026年最新の信頼できるサービスのみ厳選。民間業者のリスクや選び方ガイドも掲載。",
};

const faqs = [
  {
    question: "退職代行とは何ですか？",
    answer:
      "退職の意思を本人に代わって会社に伝えるサービスです。弁護士法人・労働組合・民間業者の3種類があります。",
  },
  {
    question: "退職代行の料金相場は？",
    answer:
      "弁護士法人は3〜6万円、労働組合は2〜3万円、民間業者は2万円前後です。",
  },
  {
    question: "弁護士と労働組合、どちらがいい？",
    answer:
      "残業代請求やハラスメントの損害賠償なども依頼したい場合は弁護士法人、退職だけならコスパの良い労働組合がおすすめです。",
  },
  {
    question: "退職代行を使うとデメリットはありますか？",
    answer:
      "会社との関係が完全に切れるため、円満退職にはなりません。ただし法的には問題なく、転職先に知られることもありません。",
  },
];

export default function TaishokuDaikouPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd(
            taishokuServices.map((s) => ({ name: s.name, url: s.officialUrl }))
          ),
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "退職代行サービス比較", href: "/taishoku-daikou" },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#0485c0] to-[#2bbfb1] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <nav aria-label="パンくずリスト" className="mb-4 flex items-center gap-1 text-sm text-white/80">
            <Link href="/" className="cursor-pointer transition-colors duration-200 hover:text-white">
              ホーム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">退職代行サービス比較</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <Scale className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                退職代行サービス おすすめ比較
              </h1>
              <p className="text-sm text-white/80">2026年最新版</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-white/90">
            弁護士法人・労働組合運営の信頼できる退職代行サービスを比較
          </p>
        </div>
      </section>

      <div className="bg-[#edf4f6]">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          {/* Warning banner */}
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm leading-relaxed text-amber-800">
              <span className="font-semibold">ご注意：</span>
              2026年2月、民間退職代行大手の代表が弁護士法違反で逮捕されました。当サイトでは弁護士法人・労働組合運営のサービスをおすすめしています。
            </p>
          </div>

          <div className="mt-8">
            <ServiceList services={taishokuServices} />
          </div>

          <div className="mt-12">
            <SelectionGuide />
          </div>

          <section className="mt-12 rounded-lg bg-white p-6">
            <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">よくある質問</h2>
            <Accordion multiple className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="cursor-pointer text-left text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#555555]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Cross-link: 転職エージェント */}
          <div className="mt-12 rounded-lg bg-white p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffa215]/10">
              <Briefcase className="h-5 w-5 text-[#ffa215]" />
            </div>
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">退職後のキャリアを考えるなら</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#555555]">
              転職エージェント10社を求人数・サポート力で比較。すべて無料で利用できます。
            </p>
            <Link
              href="/tenshoku"
              className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded-[3px] bg-[#ffa215] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110 active:translate-y-px"
            >
              転職エージェントを比較する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Reverse CTA: tools */}
          <div className="mt-5 rounded-lg bg-white p-6 text-center">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">
              退職前にお金の計算はお済みですか？
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#555555]">
              失業保険・退職金・有給休暇を無料で計算できます。
            </p>
            <Link
              href="/tools/unemployment-insurance"
              className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded-[3px] bg-[#ffa215] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110 active:translate-y-px"
            >
              失業保険を計算する
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
