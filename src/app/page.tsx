import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/lib/constants";
import { JsonLd, websiteJsonLd, organizationJsonLd, itemListJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ArrowRight, Briefcase } from "lucide-react";
import { TaishokuRankingList } from "@/components/daikou/ranking-list";
import { SelectionGuide } from "@/components/daikou/selection-guide";
import { taishokuServices } from "@/data/taishoku-services";
import { HeroPatternC as HeroSection } from "@/components/home/hero-patterns/pattern-c";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  {
    question: "即日退職は本当にできますか？",
    answer:
      "法律上は退職届提出から2週間で退職が成立しますが、退職代行を利用すれば即日から出社不要になるケースがほとんどです。有給休暇を消化する形で実質即日退職が可能です。",
  },
  {
    question: "退職代行を使って会社から訴えられることはありますか？",
    answer:
      "退職は労働者の権利であり、退職代行の利用自体で訴えられることはまずありません。ただし、会社に損害を与えるような退職（引き継ぎなしで重大な損害が発生する場合等）はリスクがあるため、弁護士法人の利用をおすすめします。",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="relative inline-block text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">
        {children}
        <span className="absolute -bottom-2 left-1/2 h-[3px] w-12 -translate-x-1/2 bg-[#0485c0]" />
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd(),
          organizationJsonLd(),
          itemListJsonLd(
            taishokuServices.map((s) => ({ name: s.name, url: s.officialUrl }))
          ),
          faqJsonLd(faqs),
        ]}
      />

      <HeroSection serviceCount={taishokuServices.length} />

      {/* Promo banner */}
      <div className="border-b bg-orange-50/60 py-2.5 text-center text-xs text-[#999999]">
        ※ 本ページにはプロモーションが含まれています
      </div>

      {/* Warning banner */}
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm leading-relaxed text-amber-800">
            <span className="font-semibold">ご注意：</span>
            2026年2月、民間退職代行大手の代表が弁護士法違反で逮捕されました。当サイトでは弁護士法人・労働組合運営のサービスをおすすめしています。
          </p>
        </div>
      </div>

      {/* Ranking List */}
      <section className="bg-[#edf4f6] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading>退職代行サービス ランキング一覧</SectionHeading>
          <div className="mt-6">
            <TaishokuRankingList services={taishokuServices} />
          </div>
        </div>
      </section>

      {/* Selection Guide */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SelectionGuide />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#edf4f6] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading>よくある質問</SectionHeading>
          <Accordion multiple className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="cursor-pointer text-left text-sm font-semibold text-[#252525]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Tools CTA */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading>退職前にお金の計算はお済みですか？</SectionHeading>
          <p className="mx-auto -mt-4 mb-10 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
            失業保険・退職金・有給休暇を30秒で無料計算
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group cursor-pointer">
                <Card className="h-full border transition-all duration-200 group-hover:-translate-y-1 group-hover:border-[#0485c0] group-hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0485c0]/5 text-2xl transition-colors duration-200 group-hover:bg-[#0485c0]/10">
                      {tool.emoji}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{tool.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1 text-sm font-medium text-[#0485c0] transition-all duration-200 group-hover:gap-2">
                      計算する
                      <ArrowRight className="h-3.5 w-3.5" />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tenshoku Cross-sell CTA */}
      <section className="bg-[#edf4f6] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border-2 border-[#0485c0]/20 bg-gradient-to-br from-[#edf4f6] to-white p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#0485c0]/10">
              <Briefcase className="h-5 w-5 text-[#0485c0]" />
            </div>
            <h2 className="mt-3 text-lg font-semibold">退職後のキャリアを考えるなら</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              転職エージェント10社を求人数・サポート力で比較。すべて無料で利用できます。
            </p>
            <Link
              href="/tenshoku"
              className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded-[3px] bg-[#ffa215] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#d8d7d7] transition-all hover:brightness-110 active:translate-y-px active:shadow-[1px_1px_0_0_#d8d7d7]"
            >
              転職エージェントを比較する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Column CTA */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionHeading>退職コラム</SectionHeading>
          <p className="-mt-4 leading-relaxed text-muted-foreground">
            退職前にやるべき手続き、お金の仕組み、知っておきたい権利について解説しています。
          </p>
          <Link
            href="/column"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-6 cursor-pointer px-6 transition-all duration-200 hover:shadow-md"
            )}
          >
            コラムを読む
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
