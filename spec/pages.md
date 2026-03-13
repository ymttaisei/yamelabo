# ヤメラボ — ページ・コンポーネント詳細仕様

> 最終更新: 2026-03-12（退職代行口コミ・比較サイトへのリブランド完了後）

## ページ一覧

| パス | タイプ | ファイル | 概要 |
|------|--------|---------|------|
| `/` | SSG | `app/page.tsx` | トップ=退職代行ランキング。ヒーロー + Stats + 警告バナー + ランキング一覧(11社) + 選び方ガイド + FAQ(6問) + 計算ツールCTA + 転職CTA + コラムCTA |
| `/tools/unemployment-insurance` | SSG | `app/tools/unemployment-insurance/page.tsx` | 失業保険計算。フォーム + 結果 + FAQ(5問) + 転職CTA + 他ツール |
| `/tools/retirement-tax` | SSG | `app/tools/retirement-tax/page.tsx` | 退職金税金計算。フォーム + 結果 + FAQ(3問) + 転職CTA + 他ツール |
| `/tools/paid-leave` | SSG | `app/tools/paid-leave/page.tsx` | 有給休暇計算。フォーム + 結果 + FAQ(3問) + 転職CTA + 他ツール |
| `/tenshoku` | SSG | `app/tenshoku/page.tsx` | 転職エージェント比較ランキング。ヒーロー(Stats) + プロモ表記 + フィルターピル + ランキングカード10社 + FAQ(6問) + 逆CTA |
| `/taishoku-daikou` | SSG | `app/taishoku-daikou/page.tsx` | 退職代行比較。警告バナー + タブフィルタ + カード11社 + 選び方ガイド + FAQ(4問) + 逆CTA |
| `/column` | SSG | `app/column/page.tsx` | コラム一覧。記事カードグリッド |
| `/column/[slug]` | SSG | `app/column/[slug]/page.tsx` | コラム記事詳細。目次 + 記事本文 + ツールCTA + FAQ + 関連記事 |
| `/about` | SSG | `app/about/page.tsx` | 免責事項・運営情報・プライバシーポリシー |

---

## 各ページ詳細仕様

### `/` トップページ（退職代行ランキング）

**セクション構成（上から順）:**

1. **ヒーロー** (`section.border-b.bg-gradient-to-b.from-blue-50/80.to-white.py-16.md:py-24`)
   - Scaleアイコン（`h-8 w-8`）
   - h1: 「退職代行おすすめランキング」
   - サブテキスト: 「弁護士法人・労働組合運営の信頼できる退職代行サービスを徹底比較」

2. **Stats** — 3カラムグリッド（掲載サービス数 / 運営種別3種 / 無料相談・比較）

3. **プロモーション表記バナー** — `bg-orange-50/60`

4. **警告バナー** — 民間退職代行大手の逮捕事件に関する注意喚起

5. **ランキング一覧** (`TaishokuRankingList`, `daikou/ranking-list.tsx`)
   - h2: 「退職代行サービス ランキング一覧」
   - フィルタピル（すべて/弁護士法人/労働組合/民間）+ 件数表示
   - `TaishokuRankingCard` のスタック表示（11社）
   - ランキングカード: RankBadge + ロゴ + スペック表(料金/対応速度/相談方法/返金保証) + 特徴タグ + オレンジCTA

6. **選び方ガイド** (`SelectionGuide`, `daikou/selection-guide.tsx` を再利用)

7. **FAQ** — 6問（退職代行とは/料金相場/弁護士vs労組/デメリット/即日退職/訴訟リスク）

8. **計算ツールCTA** — 「退職前にお金の計算はお済みですか？」+ ツールカード3枚

9. **転職エージェントCTA** — オレンジ枠「退職後のキャリアを考えるなら」→ `/tenshoku`

10. **コラムCTA** — outlineボタン「コラムを読む」→ `/column`

### `/tools/*` 計算ツールページ（3ページ共通パターン）

**共通セクション構成:**

1. **ヘッダーセクション** — グラデーション背景 + パンくず + アイコン + h1 + サブテキスト
2. **フォーム** — Client Component。入力→計算→結果をstate管理
3. **結果カード** — 計算結果を emerald 系の色で金額ハイライト表示
4. **Dual AF CTA** (`tool-result-cta.tsx`, Client Component) — 2カードレイアウト:
   - オレンジ枠（主軸）: 「退職を言い出せないなら」→ `/`（トップ=退職代行ランキング）（TrackedCtaLink, cta_click GA4イベント）
   - 青枠（補助）: 「次のキャリアを考えるなら」→ `/tenshoku`（TrackedCtaLink, cta_click GA4イベント）
5. **FAQ** — Accordion（`multiple` prop）
6. **他のツール** (`other-tools.tsx`) — 現在のツール以外2つを表示

**個別ツール仕様:**

| ツール | フォーム入力項目 | 主な出力 | FAQ数 |
|--------|----------------|---------|-------|
| 失業保険 | 年齢/月給/勤続年数/離職理由/障害者区分 | 基本手当日額/給付日数/給付総額/待機期間/制限期間 | 5問 |
| 退職金税金 | 退職金額/勤続年数/障害者区分/役員区分 | 退職所得控除/課税所得/所得税/住民税/復興特別所得税/手取り額/実効税率 | 3問 |
| 有給休暇 | 入社日/基準日/雇用形態/週勤務日数 | 勤続月数/今期付与日数/前期繰越日数/最大保有日数/次回付与日/次回日数 | 3問 |

### `/tenshoku` 転職エージェント比較ランキングページ（faclog風デザイン）

**Metadata:**
- title: 「転職エージェントおすすめ比較ランキング【2026年最新】退職後のキャリアを無料サポート」
- description: 総合型・IT特化・ハイクラス・20代向けの10社を求人数・対応エリア・サポート力で比較

**JSON-LD:** ItemList（10社） + BreadcrumbList + FAQPage（6問）

**セクション構成:**

1. **ヒーロー** — グラデーション背景 + パンくず + Briefcaseアイコン + h1「転職エージェント おすすめ比較ランキング」+ サブテキスト
   - **Stats**: 3カラムグリッド — 掲載数(Building2) / カテゴリ数(Layers) / 無料(BadgeCheck emerald)

2. **プロモーション表記バナー** — `bg-orange-50/60`、景品表示法対応

3. **ランキングリスト** (`TenshokuServiceList`)
   - **フィルターピル**: rounded-full、5種（all/comprehensive/it-web/highclass/young）+ 件数
   - **結果件数**: 「{n}件のエージェントを表示中」
   - **ランキングカード** (`TenshokuServiceCard`): 1カラムスタック
     - ランクバッジ(Crown金/銀/銅/グレー) + h3 + タイプバッジ(色分け) + おすすめ(Star赤)
     - ロゴ(72x72) + スペック表(求人数/対応エリア/強み) を `sm:flex-row`（モバイル縦スタック）
     - description + 特徴タグ(emerald) + オレンジCTA「公式サイトを見る」
     - Top3は `ring-1 ring-primary/15` で強調
     - AF: `affiliateUrl || officialUrl`、`affiliate_click` GA4イベント

4. **FAQ** — 6問（エージェントとは/料金/サイトとの違い/退職前登録/複数登録/メリット）
5. **相互リンク: 退職代行** — 青枠「退職を言い出せないなら」→ `/`（トップ=退職代行ランキング）
6. **逆CTA** — 「退職前にお金の計算はお済みですか？」→「失業保険を計算する」

### `/taishoku-daikou` 退職代行比較ページ

**ナビゲーションでの位置**: フッターにリンク残存。トップ（ランキング）との差別化: こちらは旧デザインのタブフィルタ + カード形式。SEOアセットとして維持。

**セクション構成:**
1. ヘッダー + パンくず + Scaleアイコン + h1
2. 警告バナー: 「2026年2月、民間退職代行大手の代表が弁護士法違反で逮捕されました。」
3. サービスリスト（タブ: すべて/弁護士/労組/民間）、11社カード
4. 選び方ガイド（`selection-guide.tsx`）
5. FAQ（4問）
6. **相互リンク: 転職エージェント** — オレンジ枠「退職後のキャリアを考えるなら」→ `/tenshoku`
7. 逆CTA（ツールへの導線）

### `/column` コラム一覧

- 記事カードグリッド表示
- 各カード: カテゴリバッジ + タイトル + excerpt
- **AF CTA** (`ArticleAfCta`): 記事グリッド下に転職+退職代行への導線

### `/column/[slug]` コラム記事詳細

- generateStaticParams で全slug静的生成
- 目次（折りたたみ）+ 記事本文 + ツールCTA + **AF CTA①** + FAQ + 関連記事 + **AF CTA②**
- 記事データは `data/articles/*.ts` で管理（TypeScript、型安全）

---

## コンポーネント詳細仕様

### layout/ — レイアウト

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `header.tsx` | Client | なし | sticky header（`top-0 z-50`）。デスクトップ: 退職代行ランキング(/) + 転職エージェント比較(/tenshoku) + DropdownMenu(計算ツール3つ) + コラム + About。モバイル: Sheet(右スライドイン)で同じリンク群。 |
| `footer.tsx` | Server | なし | 3カラムグリッド。ブランド / 退職代行リンク(ランキング・比較) / サービスリンク(転職エージェント/計算ツール/コラム/About)。免責事項 + AF広告利用表記 + copyright。 |

### tools/ — 計算ツール

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `unemployment-form.tsx` | Client | なし | 年齢/月給/勤続年数/離職理由/障害者のフォーム。計算実行時に `tool_calculate` GA4イベント発火。 |
| `unemployment-result.tsx` | Server | `result: UnemploymentResult` | 結果カード。基本手当日額/給付日数/給付総額等を emerald ハイライトで表示。 |
| `retirement-tax-form.tsx` | Client | なし | 退職金額/勤続年数/障害者/役員のフォーム。 |
| `retirement-tax-result.tsx` | Server | `result: RetirementTaxResult` | 結果カード。手取り額/各税額/実効税率を表示。 |
| `paid-leave-form.tsx` | Client | なし | 入社日/基準日/雇用形態/週勤務日数のフォーム。`todayString()` は `useEffect` で遅延初期化。 |
| `paid-leave-result.tsx` | Server | `result: PaidLeaveResult` | 結果カード。付与日数/繰越日数/次回付与日を表示。 |
| `tool-result-cta.tsx` | Client | なし | Dual AF CTA。オレンジ枠（主軸）「退職を言い出せないなら」→`/`（トップ=退職代行ランキング）+ 青枠（補助）「次のキャリアを考えるなら」→`/tenshoku`。TrackedCtaLinkで`cta_click`GA4イベント。 |
| `other-tools.tsx` | Server | `currentTool: string` | 現在のツール以外の2つを表示するリンクカード。 |

### tenshoku/ — 転職エージェント比較ランキング（faclog風）

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `service-card.tsx` | Client | `service: TenshokuService, rank: number` | ランキングカード。RankBadge(Crown/銀/銅/番号) + ロゴ(logoUrl or グラデーションイニシャル) + スペック表(求人数/エリア/強み) + 特徴タグ + オレンジCTA。Top3に `ring-1 ring-primary/15`。`affiliate_click` GA4イベント。 |
| `service-list.tsx` | Client | `services: TenshokuService[]` | フィルターピル（5種 + 件数表示）+ 結果件数 + ランキングリスト（1カラム）。`tenshoku_tab_change` GA4イベント。 |

### daikou/ — 退職代行比較

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `ranking-card.tsx` | Client | `service: TaishokuService, rank: number` | faclog風ランキングカード（トップ用）。RankBadge(Crown/銀/銅/番号) + ロゴ(logoUrl or グラデーションイニシャル) + スペック表(料金/対応速度/相談方法/返金保証) + 特徴タグ + オレンジCTA。Top3に `ring-1 ring-primary/15`。`affiliate_click` GA4イベント。 |
| `ranking-list.tsx` | Client | `services: TaishokuService[]` | フィルタピル（4種 + 件数表示）+ 結果件数 + ランキングカードスタック。`daikou_tab_change` GA4イベント。 |
| `service-card.tsx` | Client | `service: TaishokuService` | 旧カード（/taishoku-daikou用）。種別バッジ + 料金 + features + 公式サイトリンク。 |
| `service-list.tsx` | Client | `services: TaishokuService[]` | 旧タブフィルタ（/taishoku-daikou用）。 |
| `selection-guide.tsx` | Server | なし | 退職代行の選び方ガイド（弁護士/労組/民間の比較表）。トップページでも再利用。 |

### column/ — コラム記事

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `article-body.tsx` | Server | `sections: ArticleSection[]` | 記事本文レンダラー。対応: 段落/テーブル/タイムライン/コールアウト/チェックリスト/引用/番号リスト/サブセクション。 |
| `article-card.tsx` | Server | `article: ArticleData` | 一覧カード。カテゴリバッジ + タイトル + excerpt。 |
| `article-tool-cta.tsx` | Server | なし | 記事内ツールCTA。3ツールへの導線（`<aside>`）。 |
| `article-af-cta.tsx` | Client | なし | 記事内AF CTA。2カラムグリッド: 退職代行比較(オレンジ枠、主軸→`/`) + 転職エージェント比較(青枠、補助→`/tenshoku`)。TrackedCtaLinkで`cta_click`GA4イベント。プロモ表記付き。 |
| `related-articles.tsx` | Server | `slugs: string[]` | 関連記事リンク（`<nav>`）。 |
| `table-of-contents.tsx` | Client | `sections: ArticleSection[]` | 折りたたみ目次（aria-expanded対応）。 |

### home/ — ホームページ

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `service-showcase.tsx` | Server | なし | おすすめサービスセクション。転職エージェントTOP3ミニカード + 退職代行TOP3ミニカード。`recommended: true` でフィルタ。プロモ表記・「もっと見る」リンク付き。 |

### ui/ — 共通UI

| ファイル | 種別 | Props | 内容 |
|---------|------|-------|------|
| `tracked-cta-link.tsx` | Client | `href, ctaType, ctaLocation, className, children` | GA4 `cta_click` イベント付きリンク。全AF CTAで使用。 |

### seo/ — SEO

| ファイル | 種別 | 内容 |
|---------|------|------|
| `json-ld.tsx` | Server | JSON-LD生成関数群: `websiteJsonLd()`, `organizationJsonLd()`, `webApplicationJsonLd()`, `articleJsonLd()`, `breadcrumbJsonLd()`, `faqJsonLd()`, `itemListJsonLd()` |

---

## コラム記事一覧 (data/articles/)

| slug | タイトル | カテゴリ | QA検証 |
|------|---------|---------|--------|
| retirement-checklist | 退職前にやることリスト完全ガイド | retirement-guide | PASS |
| unemployment-insurance-guide | 失業保険のもらい方と手続きの流れ | money | PASS |
| retirement-tax-guide | 退職金の手取りはいくら？税金の計算方法を解説 | money | PASS |
| paid-leave-guide | 有給休暇は退職前に全部使える？消化のコツと注意点 | work-rights | PASS |
| taishoku-daikou-guide | 退職代行サービスの選び方｜弁護士・労組・民間の違い | taishoku-daikou | PASS |
| resignation-letter-guide | 退職届・退職願の書き方ガイド | retirement-guide | PASS |
| health-insurance-after-retirement | 退職後の健康保険はどうする？任意継続・国保・扶養の比較 | money | PASS |

### 記事データ型 (lib/column/types.ts)

```typescript
type ArticleData = {
  meta: { slug: string; title: string; description: string; category: string; publishedAt: string; updatedAt?: string; readingTime: number; };
  excerpt: string;
  faq: { question: string; answer: string; }[];
  sections: ArticleSection[];
  relatedSlugs: string[];
};

type ArticleSection = {
  id: string;
  heading: string;
  content: string;
  list?: string[];
  numberedList?: string[];
  table?: { headers: string[]; rows: string[][]; };
  timeline?: { label: string; content: string; }[];
  callout?: { type: "info" | "warning" | "tip"; content: string; };
  checklist?: string[];
  blockquote?: { content: string; cite?: string; };
  subSections?: ArticleSection[];
};
```

### カテゴリ一覧

| カテゴリID | 表示名 | 対象記事 |
|-----------|--------|---------|
| retirement-guide | 退職ガイド | retirement-checklist, resignation-letter-guide |
| money | お金 | unemployment-insurance-guide, retirement-tax-guide, health-insurance-after-retirement |
| work-rights | 労働者の権利 | paid-leave-guide |
| taishoku-daikou | 退職代行 | taishoku-daikou-guide |

### 記事品質基準
- 全記事に専任QAエージェントによるレビュー済み（数値・法的引用・型・ビジュアル・文体）
- calculator定数・サービスデータとの整合性検証必須
- ビジュアル要素: テキストのみ3セクション連続禁止（テーブル/タイムライン/コールアウト/チェックリスト等を混在させる）
- FAQ: 4問以上、具体的な回答

---

## 計算ロジック (lib/calculators/)

| ファイル | テストケース数 | 検証結果 | 参照定数 |
|---------|-------------|---------|---------|
| `unemployment-insurance.ts` | 4 | 全一致（Case3は仕様書の手計算に丸め誤差あり、コードが正） | `constants.ts` の UI_* 定数群 |
| `retirement-tax.ts` | 5 | 全一致 | `constants.ts` の TAX_BRACKETS, RECONSTRUCTION_TAX_RATE, RESIDENT_TAX_RATE |
| `paid-leave.ts` | 3 | 全一致 | `constants.ts` の PL_FULLTIME_TABLE, PL_PARTTIME_TABLE |

### 年度更新が必要な定数（constants.ts）

| 定数群 | 更新タイミング | 情報源 |
|--------|-------------|--------|
| `UI_WAGE_UPPER_LIMITS`, `UI_BENEFIT_UPPER_LIMITS`, `UI_FORMULA_*` | 毎年8月1日 | 厚生労働省告示 |
| `UI_VOLUNTARY_RESTRICTION_MONTHS` | 法改正時（現在: 1ヶ月 ← 令和7年4月改正で2→1ヶ月に短縮） | 厚生労働省 |
| `TAX_BRACKETS` | 税制改正時 | 国税庁 |
| `RECONSTRUCTION_TAX_RATE` | 2038年以降0%に変更（2037年まで2.1%） | 国税庁 |
| `PL_FULLTIME_TABLE`, `PL_PARTTIME_TABLE` | 法改正時（現行は安定） | 労働基準法 |

---

## 退職代行サービスデータ (data/taishoku-services.ts)

11社掲載。`affiliateUrl` は全てnull。

| type | 社数 | 内容 |
|------|------|------|
| lawyer | 弁護士法人 | 弁護士が法的交渉まで対応 |
| union | 労働組合 | 団体交渉権あり、コスパ良 |
| private | 民間 | 意思伝達のみ（交渉権なし） |

**退職代行ページの警告バナー**: 「2026年2月、民間退職代行大手の代表が弁護士法違反で逮捕されました。当サイトでは弁護士法人・労働組合運営のサービスをおすすめしています。」
