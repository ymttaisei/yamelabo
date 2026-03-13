# ヤメラボ (YAMELABO) — サービス概要

> 最終更新: 2026-03-13（FACLOG デザイン完全再現完了後）

## コンセプト

「退職代行の口コミ・ランキング・比較」

退職代行サービスの口コミ・ランキング・比較サイト。ファクログ（faclog.jp）と同じ攻め方で、退職代行のニッチ市場で口コミ×比較コンテンツによる信頼性構築 → AF送客で収益化。計算ツール群（失業保険・退職金・有給休暇）はSEO集客手段として維持。

### 収益モデル

| 収益源 | 優先度 | 想定単価 | 配置場所 |
|--------|--------|----------|----------|
| 退職代行AF | **主軸** | 3,000〜10,000円/件 | トップ（ランキング）、ツール結果CTA、コラム内CTA |
| 転職エージェントAF | 補助 | 5,000〜15,000円/件 | `/tenshoku`、ツール結果CTA、コラム内CTA |
| AdSense | 補助 | PV依存 | コラム記事、計算結果ページ |

### ビジネスモデル（faclog型 口コミ×比較サイト）

```
退職代行の口コミ・ランキング・比較コンテンツ + 計算ツールでSEO集客
→ トップ（退職代行ランキング）で比較 → AFリンクで送客
→ 退職後のクロスセルとして転職エージェント → AFリンクで送客
```

参考: ファクログ (faclog.jp) の構造を分析済み。分析レポートは `research/faclog/analysis.md` に保存。口コミ機能は将来スクレイピングで実装予定。

## 現在の状態

| 項目 | 状態 |
|------|------|
| 実装 | 全ページ実装済み、本番デプロイ済み |
| リブランド | 2026-03-12完了（計算ツール集 → 退職代行口コミ・比較サイト） |
| ASP | **未登録**（次のアクション） |
| AF案件 | **未申込**（ASP登録後に申込） |
| SEO | Search Console登録済み、GA4設定済み、インデックス状況は未確認 |

### 次のアクション（優先順）

1. **ASP登録**: A8.net、もしもアフィリエイト、バリューコマース、アクセストレード
2. **転職エージェントAF案件申込**: 各ASPで転職エージェント系案件を検索し申込
3. **affiliateUrl設定**: `src/data/tenshoku-services.ts` の各社 `affiliateUrl` を ASP発行URLに差し替え
4. **Search Consoleでインデックス確認**: 全ページがインデックスされているか確認
5. **SEOモニタリング開始**: 主要KWの順位追跡（失業保険 計算、退職金 手取り、有給休暇 日数 等）
6. **将来施策**: faclog型のプログラマティックSEO横展開（`spec/future-seo-plan.md` 参照）

## URL・インフラ

| 項目 | 値 |
|------|---|
| 本番URL | https://yamelabo.goodlabs.jp |
| GitHub | https://github.com/ymttaisei/yamelabo |
| Vercel | ymttaiseis-projects/yamelabo |
| ドメイン管理 | ムームードメイン (goodlabs.jp) |
| DNS | CNAME yamelabo → cname.vercel-dns.com |
| GA4 | G-PW6WWCE24Y（設定済み） |
| Search Console | 登録済み（verification meta tag設定済み） |
| ASP | **未登録** |
| デプロイ方法 | `cd yamelabo && npx vercel --prod`（CLI手動） |

## 技術スタック

| レイヤー | 技術 | バージョン |
|----------|------|-----------|
| フレームワーク | Next.js (App Router, Turbopack) | 16.1.6 |
| UI ライブラリ | React | 19.2.3 |
| 言語 | TypeScript (strict) | — |
| コンポーネント | shadcn/ui (Nova preset, @base-ui/react) | v4 (shadcn 4.0.5) |
| CSS | Tailwind CSS | v4 |
| フォント | Noto Sans JP (400/500/700) + Geist Sans + Geist Mono | — |
| 日付計算 | date-fns | 4.1.0 |
| アイコン | lucide-react | — |
| デプロイ | Vercel Pro | — |
| アナリティクス | Google Analytics 4 | G-PW6WWCE24Y |
| DB | **不要**（全計算クライアントサイド完結） | — |

### shadcn/ui Nova preset の注意点

| 項目 | 詳細 |
|------|------|
| ベース | `@base-ui/react`（**Radix UIではない**） |
| asChild | **なし** → `<Link className={buttonVariants(...)}>` パターンで対応 |
| buttonVariants | `button-variants.ts` に分離（サーバーコンポーネントでも使用可能にするため） |
| Accordion | `type="multiple"` ではなく `multiple` ブーリアンプロパティ |
| Select | `onValueChange` は `string \| null` → `(v) => setState(v ?? "")` でラップ必須 |

### Hydration 対策

| 対策 | 対象ファイル | 理由 |
|------|-------------|------|
| 明示的 `<head>` タグ禁止 | layout.tsx | Next.js App Router が自動管理 |
| GA4 Script は `<body>` 内 | layout.tsx | `<head>` 内だと Hydration mismatch |
| `suppressHydrationWarning` | `<html>` タグ | ブラウザ拡張等の差分を吸収 |
| `todayString()` を `useEffect` で遅延初期化 | paid-leave-form.tsx | SSGビルド日 ≠ クライアント日付 |

## ディレクトリ構成

```
yamelabo/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト（GA4, fonts, meta）
│   │   ├── page.tsx                # トップページ
│   │   ├── globals.css             # Tailwind v4テーマ（FACLOGデザイントークン: hex値）
│   │   ├── robots.ts              # robots.txt生成
│   │   ├── sitemap.ts             # sitemap.xml生成（静的ページ + コラム記事）
│   │   ├── about/page.tsx         # 免責事項・運営情報・プライバシーポリシー
│   │   ├── column/
│   │   │   ├── page.tsx            # コラム一覧（SSG）
│   │   │   └── [slug]/page.tsx     # コラム記事詳細（SSG, generateStaticParams）
│   │   ├── tools/
│   │   │   ├── unemployment-insurance/page.tsx  # 失業保険計算
│   │   │   ├── retirement-tax/page.tsx          # 退職金税金計算
│   │   │   └── paid-leave/page.tsx              # 有給休暇計算
│   │   ├── tenshoku/page.tsx       # 転職エージェント比較（2026-03-12追加）
│   │   └── taishoku-daikou/page.tsx # 退職代行比較（ナビから降格、SEOアセット維持）
│   ├── components/
│   │   ├── ui/                     # shadcn/ui（Nova preset）
│   │   │   ├── button.tsx          # Button (@base-ui/react)
│   │   │   ├── button-variants.ts  # CVA buttonVariants（サーバーコンポーネント用）
│   │   │   ├── card.tsx            # Card / CardContent
│   │   │   ├── input.tsx           # Input
│   │   │   ├── select.tsx          # Select
│   │   │   ├── accordion.tsx       # Accordion (multiple prop)
│   │   │   ├── tabs.tsx            # Tabs / TabsList / TabsTrigger / TabsContent
│   │   │   ├── badge.tsx           # Badge
│   │   │   ├── dropdown-menu.tsx   # DropdownMenu
│   │   │   └── sheet.tsx           # Sheet (モバイルナビ用)
│   │   ├── layout/
│   │   │   ├── header.tsx          # Client: sticky header + DropdownMenu(ツール) + Sheet(モバイル)
│   │   │   └── footer.tsx          # Server: フッター + 免責事項 + copyright
│   │   ├── tools/
│   │   │   ├── unemployment-form.tsx     # Client: 失業保険フォーム
│   │   │   ├── unemployment-result.tsx   # Server: 失業保険結果カード
│   │   │   ├── retirement-tax-form.tsx   # Client: 退職金税金フォーム
│   │   │   ├── retirement-tax-result.tsx # Server: 退職金税金結果カード
│   │   │   ├── paid-leave-form.tsx       # Client: 有給休暇フォーム
│   │   │   ├── paid-leave-result.tsx     # Server: 有給休暇結果カード
│   │   │   ├── tool-result-cta.tsx       # Server: 共通CTA（→転職エージェント比較）
│   │   │   └── other-tools.tsx           # Server: 他のツールへのリンク
│   │   ├── tenshoku/
│   │   │   ├── service-card.tsx    # Client: 転職エージェントカード
│   │   │   └── service-list.tsx    # Client: タブフィルタ + カードグリッド
│   │   ├── daikou/
│   │   │   ├── ranking-card.tsx    # Client: faclog風ランキングカード（トップ用）
│   │   │   ├── ranking-list.tsx    # Client: フィルタ付きランキング一覧（トップ用）
│   │   │   ├── service-card.tsx    # Client: 退職代行カード（/taishoku-daikou用）
│   │   │   ├── service-list.tsx    # Client: タブフィルタ（/taishoku-daikou用）
│   │   │   └── selection-guide.tsx # Server: 退職代行の選び方ガイド
│   │   ├── column/
│   │   │   ├── article-body.tsx    # Server: 記事本文レンダラー
│   │   │   ├── article-card.tsx    # Server: 記事一覧カード
│   │   │   ├── article-tool-cta.tsx # Server: 記事内ツールCTA
│   │   │   ├── related-articles.tsx # Server: 関連記事リンク
│   │   │   └── table-of-contents.tsx # Client: 折りたたみ目次
│   │   └── seo/
│   │       └── json-ld.tsx         # Server: 全JSON-LD生成関数
│   ├── lib/
│   │   ├── constants.ts            # サイト定数 + 計算定数（毎年8/1改定マーク付き）
│   │   ├── types.ts                # 全型定義（5つの型: Unemployment/RetirementTax/PaidLeave/Tenshoku/Taishoku）
│   │   ├── utils.ts                # cn(), formatCurrency()
│   │   ├── gtag.ts                 # GA4カスタムイベント送信（型安全、4イベント定義）
│   │   ├── column/
│   │   │   └── types.ts            # 記事データ型（ArticleData, ArticleSection等）
│   │   └── calculators/            # 計算ロジック純関数（全てクライアントサイド実行）
│   │       ├── unemployment-insurance.ts  # 失業保険計算（4テストケース検証済み）
│   │       ├── retirement-tax.ts          # 退職金税金計算（5テストケース検証済み）
│   │       └── paid-leave.ts              # 有給休暇計算（3テストケース検証済み）
│   └── data/
│       ├── tenshoku-services.ts    # 転職エージェント10社（affiliateUrl全てnull → ASP登録後に設定）
│       ├── taishoku-services.ts    # 退職代行サービス11社（affiliateUrl全てnull）
│       └── articles/               # コラム記事データ（TypeScript、7記事）
│           ├── index.ts            # バレルファイル（getAllArticles, getArticleBySlug等）
│           ├── retirement-checklist.ts
│           ├── unemployment-insurance-guide.ts
│           ├── retirement-tax-guide.ts
│           ├── paid-leave-guide.ts
│           ├── taishoku-daikou-guide.ts
│           ├── resignation-letter-guide.ts
│           └── health-insurance-after-retirement.ts
├── research/
│   └── faclog/                     # ファクログ構造分析（参考資料）
│       ├── analysis.md             # 構造分析レポート + ヤメラボへの反映方針
│       ├── design-tokens.md        # Playwright抽出デザイントークン（全CSS値の真実源）
│       ├── computed_styles.json    # 抽出生データ
│       ├── capture.js              # Playwrightキャプチャスクリプト
│       ├── scripts/extract_computed.js  # computed style抽出スクリプト
│       ├── screenshots/            # 全7ページ × デスクトップ + モバイル = 14枚
│       └── html/                   # 全7ページのレンダリング後HTML
├── spec/
│   ├── overview.md                 # 本ファイル
│   ├── pages.md                    # 全ページ・コンポーネント詳細仕様
│   └── future-seo-plan.md         # プログラマティックSEO横展開計画（TODO: 作成予定）
└── tasks/
    └── todo.md                     # タスク管理
```

## 型定義 (src/lib/types.ts)

```typescript
// --- 失業保険 ---
type ResignationType = "voluntary" | "company" | "specified-reason";
type UnemploymentInput = { age: number; monthlySalary: number; tenureYears: number; resignationType: ResignationType; isDisabled: boolean; };
type UnemploymentResult = { dailyWage: number; dailyBenefit: number; benefitRate: number; totalDays: number; totalAmount: number; waitingPeriod: number; restrictionMonths: number; };

// --- 退職金税金 ---
type RetirementTaxInput = { retirementPay: number; tenureYears: number; isDisability: boolean; isExecutive: boolean; };
type RetirementTaxResult = { deduction: number; taxableIncome: number; incomeTax: number; reconstructionTax: number; residentTax: number; totalTax: number; takeHome: number; effectiveRate: number; };

// --- 有給休暇 ---
type EmploymentType = "fulltime" | "parttime";
type PaidLeaveInput = { startDate: Date; baseDate: Date; employmentType: EmploymentType; weeklyWorkDays?: number; };
type PaidLeaveResult = { tenureMonths: number; currentGrant: number; previousGrant: number; maxDays: number; nextGrantDate: Date | null; nextGrantDays: number; isBeforeFirstGrant: boolean; firstGrantDate?: Date; };

// --- 転職エージェント ---
type TenshokuServiceType = "comprehensive" | "it-web" | "highclass" | "young";
type TenshokuService = { id: string; name: string; type: TenshokuServiceType; description: string; features: string[]; affiliateUrl: string | null; officialUrl: string; recommended: boolean; logoUrl: string | null; jobCount: string; area: string; strength: string; };

// --- 退職代行 ---
type TaishokuServiceType = "lawyer" | "union" | "private";
type TaishokuService = { id: string; name: string; type: TaishokuServiceType; price: number; features: string[]; affiliateUrl: string | null; officialUrl: string; recommended: boolean; warning?: string; logoUrl: string | null; strength: string; responseTime: string; consultationMethod: string; successRate: string | null; refundPolicy: string | null; };
```

## 転職エージェントデータ (src/data/tenshoku-services.ts)

| id | name | type | recommended | jobCount | area | affiliateUrl |
|----|------|------|-------------|----------|------|-------------|
| recruit-agent | リクルートエージェント | comprehensive | **true** | 60万件以上 | 全国 | null |
| doda | doda | comprehensive | **true** | 24万件以上 | 全国 | null |
| mynavi-agent | マイナビエージェント | comprehensive | **true** | 7万件以上 | 全国 | null |
| bizreach | ビズリーチ | highclass | false | 12万件以上 | 全国 | null |
| pasona-career | パソナキャリア | comprehensive | false | 5万件以上 | 全国 | null |
| type-agent | type転職エージェント | comprehensive | false | 3万件以上 | 一都三県 | null |
| levtech-career | レバテックキャリア | it-web | false | 2.5万件以上 | 関東・関西・東海・九州 | null |
| workport | ワークポート | it-web | false | 10万件以上 | 全国 | null |
| jac-recruitment | JACリクルートメント | highclass | false | 2万件以上 | 全国 | null |
| hataractive | ハタラクティブ | young | false | 4,000件以上 | 全国 | null |

**ロゴ**: 各社の `logoUrl` は null（イニシャルバッジで代替）。ロゴ追加時は `public/logos/[id].png` に配置し、`logoUrl: "/logos/[id].png"` に設定。

**ASP登録後の作業**: 各社の `affiliateUrl` をASP発行のトラッキングURLに差し替える。`affiliateUrl` が設定されている場合、`service-card.tsx` が自動的に `rel="nofollow noopener sponsored"` を付与する。

## カラーパレット（FACLOG デザイントークン準拠）

> 2026-03-13 FACLOG完全再現。全値は `research/faclog/design-tokens.md` が真実源。

| 役割 | CSS変数/クラス | 値 | 用途 |
|------|---------|---|------|
| Primary | --primary | #0485c0 | 見出し、フィルターactive、リンク |
| CTA Orange | --cta-orange / bg-[#ffa215] | #ffa215 | CTAボタン「公式サイトを見る」 |
| CTA Teal | --cta-teal / bg-[#2bbfb1] | #2bbfb1 | カード内CTA、チェックマーク、ハイライト |
| Background | --background | #edf4f6 | ページ背景 |
| Card | --card | #ffffff | カード背景 |
| Foreground | --foreground | #252525 | 本文テキスト |
| Muted | --muted-foreground | #555555 | サブテキスト |
| Border | --border | #d8d7d7 | ボーダー、CTAシャドウ |
| Footer BG | --footer-bg | #0b4d64 | フッター背景 |
| Destructive | --destructive | #ff5252 | エラー、おすすめバッジ |
| h1 | text-[#0072a7] | #0072a7 | ランキングh1 |
| h2 | text-[#0485c0] | #0485c0 | セクション見出し |
| Article link | text-[#4f96f6] | #4f96f6 | 記事内リンク |

## UIデザインパターン（FACLOG準拠）

### 全ページ共通
- **ヘッダー**: 白bg、height 80px、fixed、z-80、shadow `0 4px 4px -2px #808080`
- **フッター**: bg #0b4d64、text白、padding 50px TB / 100px LR
- **ページ背景**: #edf4f6（ライトブルーティール）
- **ヒーロー**: teal gradient（#0485c0→#2bbfb1）+ 白テキスト + イラスト
- パンくずナビ: `<Link>` + `ChevronRight`
- コンテナ幅: max-w-3xl (ランキング/転職) / max-w-5xl (トップ/ツール)

### セクション見出し (h2)
```
text-[#0485c0] text-2xl font-bold leading-9 tracking-[2.4px] text-center
+ 下部にセンター装飾ライン
```

### ランキングカード
- 白bg、角丸なし、左ボーダー4px #0485c0（top3）/ #d8d7d7（その他）
- ランクバッジ: 番号入り丸 bg-[#0485c0]（top3）/ bg-gray-400
- スペック表: ヘッダーセル bg-[#edf4f6]
- 特徴タグ: border-[#2bbfb1]/30 bg-[#2bbfb1]/10 text-[#0b4d64]

### CTAボタン
```
bg-[#ffa215] rounded-[3px] shadow-[3px_3px_0_0_#d8d7d7] font-bold text-white
hover:bg-[#e8920d]
```

### フィルターピル
```
text-lg border-2 px-5 py-2 rounded-full
Active: border-[#0485c0] bg-[#0485c0] text-white
Inactive: border-[#d8d7d7] bg-white text-[#252525] hover:border-[#0485c0]
```

### インタラクティブ要素
- 全clickable要素: `cursor-pointer` **必須**
- ホバー: `transition-colors duration-200`
- テキストリンク: `hover:text-[#0485c0]`

### 警告バナー
統一パターン: `rounded-lg border border-amber-300 bg-amber-50 text-amber-800`

### CTAパターン

| CTA | 配置 | リンク先 | テキスト |
|-----|------|---------|---------|
| ツール結果CTA（主軸） | 各ツール結果下 | `/`（トップ） | 「退職を言い出せないなら」→「退職代行サービスを比較する」 |
| ツール結果CTA（補助） | 各ツール結果下 | `/tenshoku` | 「次のキャリアを考えるなら」→「転職エージェントを比較する」 |
| トップ転職CTA | トップページ下部 | `/tenshoku` | 「退職後のキャリアを考えるなら」→「転職エージェントを比較する」 |
| 逆CTA（転職→退職代行） | `/tenshoku` 下部 | `/`（トップ） | 「退職を言い出せないなら」→「退職代行サービスを比較する」 |
| 逆CTA（退職代行→ツール） | `/taishoku-daikou` 下部 | `/tools/unemployment-insurance` | 「退職前にお金の計算はお済みですか？」→「失業保険を計算する」 |
| AF公式サイトリンク | ランキングカード / 転職エージェントカード | 各社公式/AF URL | 「公式サイトを見る」 |

## GA4カスタムイベント (src/lib/gtag.ts)

| イベント名 | パラメータ | 型 | 発火タイミング |
|-----------|-----------|---|---------------|
| `tool_calculate` | `tool_name: string` | `"unemployment-insurance" \| "retirement-tax" \| "paid-leave"` | 計算実行ボタンクリック時 |
| `daikou_tab_change` | `tab: string` | `"all" \| "lawyer" \| "union" \| "private"` | 退職代行タブ切替時 |
| `tenshoku_tab_change` | `tab: string` | `"all" \| "comprehensive" \| "it-web" \| "highclass" \| "young"` | 転職エージェントタブ切替時 |
| `affiliate_click` | `service_name: string` | 各社名 | AF/公式サイトリンククリック時 |

## SEO構造化データ (src/components/seo/json-ld.tsx)

| ページ | JSON-LDタイプ | 内容 |
|--------|-------------|------|
| `/` | WebSite + Organization | サイト名、URL、運営者情報 |
| `/tools/*` | WebApplication + BreadcrumbList + FAQPage | ツール名、FAQ |
| `/column` | BreadcrumbList | パンくずのみ |
| `/column/[slug]` | Article + BreadcrumbList + FAQPage | 記事メタ、FAQ |
| `/tenshoku` | ItemList + BreadcrumbList + FAQPage | 10社リスト、FAQ4問 |
| `/taishoku-daikou` | ItemList + BreadcrumbList + FAQPage | 11社リスト、FAQ4問 |
| `/about` | BreadcrumbList | パンくずのみ |

## ナビゲーション構造

### ヘッダー（header.tsx）
- ロゴ「ヤメラボ」→ `/`
- 「退職代行ランキング」→ `/`（トップ=退職代行ランキング）
- 「転職エージェント比較」→ `/tenshoku`
- ドロップダウン「計算ツール」→ 3つの計算ツール（constants.ts の TOOLS 配列から生成）
- 「コラム」→ `/column`
- 「About」→ `/about`
- モバイル: Sheet（右スライドイン）で同じリンク群

### フッター（footer.tsx）
- ブランド + キャッチコピー
- 退職代行リンク:
  - おすすめランキング → `/`
  - 退職代行比較 → `/taishoku-daikou`
- サービスリンク:
  - 転職エージェント比較 → `/tenshoku`
  - 計算ツール3つ
  - コラム → `/column`
  - About → `/about`
- 免責事項 + アフィリエイト広告利用表記 + copyright

### sitemap.ts の登録ページ

| URL | changeFrequency | priority |
|-----|----------------|---------|
| `/` | monthly | 1.0 |
| `/tools/unemployment-insurance` | monthly | 0.9 |
| `/tools/retirement-tax` | monthly | 0.9 |
| `/tools/paid-leave` | monthly | 0.9 |
| `/column` | weekly | 0.8 |
| `/tenshoku` | weekly | 0.8 |
| `/taishoku-daikou` | weekly | 0.8 |
| `/about` | yearly | 0.3 |
| `/column/[各slug]` | monthly | 0.7 |

## ピボット履歴

### 2026-03-13: FACLOG デザイン完全再現

**背景**: 独自デザインでは比較サイトとしてのプロフェッショナル感が不足。FACLOG（faclog.jp）はファクタリング比較サイトのベストプラクティスであり、同じ比較サイト構造のデザインをヤメラボに適用。

**手法**: Playwrightでcomputed styleを機械的に抽出 → 推測ゼロで再現。全ページのスクリーンショットQAで検証。

**変更内容**:
| 変更箇所 | Before | After |
|---------|--------|-------|
| globals.css | oklch カラー（ブルー系） | hex値（FACLOG抽出: #0485c0, #edf4f6, #252525） |
| ヘッダー | sticky白 h-14 shadow-sm | fixed白 h-20 shadow #808080 |
| フッター | 白bg | #0b4d64 ダークティール + 白テキスト |
| ページ背景 | oklch slate-50系 | #edf4f6 ライトブルーティール |
| ヒーロー | orange-50 + 複雑アニメーション | teal gradient + シンプル |
| ランキングカード | rounded-xl shadow-sm Crown/メダル | flat左アクセント + 番号バッジ |
| CTAボタン | rounded-lg bg-orange-500 | rounded-[3px] bg-[#ffa215] shadow-[3px_3px_0_0_#d8d7d7] |
| フィルターピル | text-sm border | text-lg border-2 #0485c0 |
| セクション見出し | text-xl font-semibold | text-2xl font-bold #0485c0 tracking-[2.4px] + 装飾ライン |
| ツールヒーロー | from-blue-50/80 | teal gradient |

**デザイントークン**: `research/faclog/design-tokens.md`（全CSS値の真実源）

### 2026-03-12: リブランド — 退職代行 口コミ・比較サイト化

**背景**: 転職エージェント市場は大手（リクナビ・doda等）が支配しており個人メディアで勝てない。退職代行は比較的ニッチで競合が弱く、faclog型の口コミ×比較で差別化可能。

**変更内容**:
| 変更箇所 | Before | After |
|---------|--------|-------|
| サイトコンセプト | 「退職のお金、まるわかり。」計算ツール集 | 「退職代行の口コミ・ランキング・比較」比較サイト |
| トップページ | 計算ツール3枚 + サービスショーケース | 退職代行ランキング（faclog風） |
| 収益主軸 | 転職エージェントAF | 退職代行AF |
| header.tsx | 転職エージェント比較がメイン | 退職代行ランキング + 転職エージェント比較 + 計算ツール |
| tool-result-cta.tsx | 転職=主軸、退職代行=補助 | 退職代行=主軸、転職=補助 |
| TaishokuService型 | 基本フィールドのみ | logoUrl/strength/responseTime/consultationMethod/successRate/refundPolicy 追加 |
| 新規ファイル | — | daikou/ranking-card.tsx, daikou/ranking-list.tsx |

**保持したもの**: `/taishoku-daikou` ページ（SEOアセット維持）、`/tenshoku` ページ、全ツールページ、コラム記事。

### 2026-03-12（初回）: 退職代行AF → 転職エージェントAF

**背景**: 退職代行AF市場の構造的崩壊（モームリ代表逮捕、トリケシ受付停止）。単一AF市場への依存リスクが顕在化。転職エージェントAF追加。

## faclog.jp 分析結果（プログラマティックSEO横展開の参考）

詳細は `research/faclog/analysis.md` を参照。

**ヤメラボに適用可能な施策（優先順）**:

| # | 施策 | 概要 | 工数 | SEO効果 |
|---|------|------|------|---------|
| 1 | 退職代行個別ページ | `/taishoku-daikou/[id]` で11社分の詳細ページ。特徴・メリデメ・口コミ・FAQ | 中 | 高 |
| 2 | 口コミ機能（スクレイピング） | 各社の口コミを収集・表示。faclog の核心機能 | 高 | 高 |
| 3 | 条件別ページ | 即日退職/弁護士対応/返金保証/女性向け 等 | 低 | 中 |
| 4 | おすすめ診断フォーム | 3-5問の質問→おすすめ3社表示→AFリンク（CVR向上） | 中 | CVR↑ |
| 5 | 転職エージェント個別ページ | `/tenshoku/[id]` で10社分の詳細ページ | 中 | 中 |
| 6 | 職種別・年代別おすすめページ | プログラマティック生成 | 中 | 中 |

**faclogとの構造比較**:
- faclog: 229社 + 47都道府県ページ + 11条件別 + 6商品別 = **350+ページ**
- 現在のヤメラボ: 11社（退職代行）+ 10社（転職）+ 0個別ページ + 0条件別 = **20ページ**
- プログラマティックSEOでページ数を増やすことが次のフェーズの鍵

## 完全仕様書（初版）

`C:\Users\bbtai\projects\solo\candidates\yamelabo-spec.md`（1,704行）
※初版仕様書。ピボット後の変更は本ファイル（spec/overview.md）と spec/pages.md が最新。
