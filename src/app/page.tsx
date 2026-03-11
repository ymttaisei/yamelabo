import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOOLS, SITE_CATCHCOPY } from "@/lib/constants";
import { JsonLd, websiteJsonLd, organizationJsonLd } from "@/components/seo/json-ld";
import { Calculator, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-blue-50/80 to-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {SITE_CATCHCOPY}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            失業保険・退職金・有給休暇を
            <br className="sm:hidden" />
            30秒で計算できる無料ツール
          </p>
          <Link
            href="/tools/unemployment-insurance"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 cursor-pointer px-6 text-base shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110"
            )}
          >
            失業保険を計算する
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Tools */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            無料で使える退職計算ツール
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group cursor-pointer">
                <Card className="h-full border transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-2xl transition-colors duration-200 group-hover:bg-primary/10">
                      {tool.emoji}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{tool.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 group-hover:gap-2">
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

      {/* SEO Text */}
      <section className="border-t bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-xl font-semibold">
            退職を考えたら、お金の不安をまず解消しましょう
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            退職を決意したとき、多くの方が不安に感じるのが「退職後のお金」のこと。失業保険はいくらもらえる？退職金の手取りは？有給は何日残っている？ヤメラボなら、これらの疑問を30秒で解決できます。すべての計算は厚生労働省・国税庁の公式情報に基づいており、令和7年4月の法改正にも対応しています。
          </p>
        </div>
      </section>

      {/* Column CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-semibold">退職コラム</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
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

      {/* Daikou CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-semibold">退職でお悩みなら</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            退職の意思を会社に伝えるのが難しい方は、退職代行サービスの利用も選択肢の一つです。
          </p>
          <Link
            href="/taishoku-daikou"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-6 cursor-pointer px-6 transition-all duration-200 hover:shadow-md"
            )}
          >
            退職代行サービスを比較する
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
