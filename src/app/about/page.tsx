import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_FORM_URL } from "@/lib/constants";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ChevronRight, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "免責事項・運営情報・プライバシーポリシー",
  description:
    "ヤメラボの運営情報、免責事項、アフィリエイト広告についての開示、プライバシーポリシーをまとめています。退職計算ツールの利用にあたってご確認ください。",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "ヤメラボについて", href: "/about" },
          ]),
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
            <span className="text-white">ヤメラボについて</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <Info className="h-5.5 w-5.5 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              ヤメラボについて
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-[#edf4f6]">
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-10 md:py-14">
          <div className="rounded-lg bg-white p-6">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">ヤメラボとは</h2>
            <p className="mt-3 leading-relaxed text-[#555555]">
              ヤメラボは、退職にまつわるお金の不安を解消するための無料計算ツール集です。失業保険（雇用保険基本手当）の給付額、退職金の手取り額、有給休暇の付与日数を、かんたんな入力だけで自動計算できます。すべての計算は厚生労働省・国税庁の公式情報に基づいています。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">免責事項</h2>
            <p className="mt-3 leading-relaxed text-[#555555]">
              本サイトで提供する計算結果は、法令に基づく一般的な計算式による概算値であり、実際の支給額・課税額を保証するものではありません。正確な金額については、最寄りのハローワーク、税務署、または社会保険労務士にご相談ください。
            </p>
            <p className="mt-3 leading-relaxed text-[#555555]">
              本サイトの情報は定期的に更新していますが、法改正や制度変更により最新の情報と異なる場合があります。本サイトの利用により生じた損害について、運営者は一切の責任を負いません。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">アフィリエイト広告について</h2>
            <p className="mt-3 leading-relaxed text-[#555555]">
              当サイトは、退職代行サービス・転職サービスのアフィリエイトプログラムに参加しています。当サイト経由でサービスにお申し込みいただいた場合、運営者に紹介報酬が支払われることがあります。ただし、掲載するサービスの選定や評価はアフィリエイト報酬の有無に関わらず、客観的な基準に基づいて行っています。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">運営者情報</h2>
            <div className="mt-3 space-y-1 leading-relaxed text-[#555555]">
              <p>運営: 個人運営</p>
              {CONTACT_FORM_URL ? (
                <p>
                  お問い合わせ:{" "}
                  <a
                    href={CONTACT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-[#0485c0] underline transition-colors duration-200 hover:text-[#0485c0]/80"
                  >
                    お問い合わせフォーム
                  </a>
                </p>
              ) : (
                <p>お問い合わせ: 準備中</p>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-[2.4px] text-[#0485c0]">プライバシーポリシー</h2>
            <p className="mt-3 leading-relaxed text-[#555555]">
              当サイトでは、Googleアナリティクス（GA4）を利用してアクセス情報を収集しています。Googleアナリティクスはcookieを使用して利用者の情報を収集しますが、個人を特定する情報は含まれません。詳細はGoogleのプライバシーポリシーをご確認ください。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
