import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ArticleCard } from "@/components/column/article-card";
import { getAllArticles } from "@/data/articles";

export const metadata: Metadata = {
  title: "退職コラム｜退職前に知っておきたい手続き・お金・権利の知識",
  description:
    "退職前にやるべき手続き、失業保険や退職金の仕組み、有給休暇の権利、退職代行の選び方まで。退職を考えたら読んでおきたい実用コラム集。",
  openGraph: {
    title: "退職コラム｜退職前に知っておきたい手続き・お金・権利の知識",
    description:
      "退職前にやるべき手続き、失業保険や退職金の仕組み、有給休暇の権利、退職代行の選び方まで。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function ColumnPage() {
  const articles = getAllArticles();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "ホーム", href: "/" },
            { name: "コラム", href: "/column" },
          ]),
        ]}
      />

      {/* Header */}
      <section className="border-b bg-gradient-to-b from-blue-50/80 to-white py-10 md:py-14">
        <div className="mx-auto max-w-2xl px-4">
          <nav
            aria-label="パンくずリスト"
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground"
          >
            <Link
              href="/"
              className="cursor-pointer transition-colors duration-200 hover:text-foreground"
            >
              ホーム
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-foreground">コラム</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-5.5 w-5.5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                退職コラム
              </h1>
              <p className="text-sm text-muted-foreground">
                退職前に知っておきたい知識
              </p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            退職の手続き・お金・権利について、分かりやすく解説するコラム集です。
          </p>
        </div>
      </section>

      {/* Article list */}
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        {articles.length > 0 ? (
          <section aria-label="記事一覧">
            <h2 className="sr-only">記事一覧</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.meta.slug} article={article} />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-muted-foreground">
            記事は近日公開予定です。
          </p>
        )}
      </div>
    </>
  );
}
