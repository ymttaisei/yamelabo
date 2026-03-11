# ヤメラボ (YAMELABO) — サービス概要

## コンセプト

「退職のお金、まるわかり。」

退職にまつわる計算ツール群（失業保険・退職金税金・有給休暇）で検索流入を獲得し、退職代行・転職アフィリエイトで収益化するメディア。

## URL・インフラ

| 項目 | 値 |
|---|---|
| 本番URL | https://yamelabo.goodlabs.jp |
| GitHub | https://github.com/ymttaisei/yamelabo |
| Vercel | ymttaiseis-projects/yamelabo |
| ドメイン管理 | ムームードメイン (goodlabs.jp) |
| DNS | CNAME yamelabo → cname.vercel-dns.com |
| GA4 | G-PW6WWCE24Y（設定済み） |
| Search Console | 登録済み（verification meta tag設定済み） |
| ASP | 未登録 |

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16.1.6 (App Router, Turbopack) + React 19.2.3 |
| 言語 | TypeScript (strict) |
| UI | shadcn/ui v4 (Nova preset, @base-ui/react) + Tailwind CSS v4 |
| フォント | Noto Sans JP (400/500/700) + Geist Sans + Geist Mono |
| 日付計算 | date-fns 4.1.0 |
| アイコン | lucide-react |
| デプロイ | Vercel Pro（GitHub push → 自動デプロイは未設定、CLI手動デプロイ） |
| アナリティクス | Google Analytics 4（G-PW6WWCE24Y） |
| DB | 不要（全計算クライアントサイド完結） |

### shadcn/ui Nova preset の注意点
- `@base-ui/react` ベース（Radix UIではない）
- `asChild` プロパティなし → `<Link className={buttonVariants(...)}>` パターン
- `buttonVariants` はサーバーコンポーネント用に `button-variants.ts` に分離
- Accordion: `type="multiple"` ではなく `multiple` ブーリアンプロパティ
- Select: `onValueChange` は `string | null` → `(v) => setState(v ?? "")` でラップ

### Hydration対策
- layout.tsx: 明示的 `<head>` タグ禁止（Next.js App Routerが自動管理）
- GA4 Scriptタグは `<body>` 内に配置
- `<html>` に `suppressHydrationWarning` 付与
- paid-leave-form: `todayString()` は `useEffect` で遅延初期化（SSGビルド日 ≠ クライアント日付）

## ディレクトリ構成

```
yamelabo/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト（GA4, fonts, meta）
│   │   ├── page.tsx                # トップページ
│   │   ├── globals.css             # Tailwind v4テーマ（OKLchカラー）
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── about/page.tsx
│   │   ├── column/
│   │   │   ├── page.tsx            # コラム一覧（SSG）
│   │   │   └── [slug]/page.tsx     # コラム記事詳細（SSG, generateStaticParams）
│   │   ├── tools/
│   │   │   ├── unemployment-insurance/page.tsx
│   │   │   ├── retirement-tax/page.tsx
│   │   │   └── paid-leave/page.tsx
│   │   └── taishoku-daikou/page.tsx
│   ├── components/
│   │   ├── ui/                     # shadcn/ui
│   │   │   ├── button.tsx          # Button (@base-ui/react)
│   │   │   ├── button-variants.ts  # CVA buttonVariants（サーバーコンポーネント用）
│   │   │   └── ...                 # card, input, select, accordion, tabs, badge, etc.
│   │   ├── layout/                 # header.tsx, footer.tsx
│   │   ├── tools/                  # フォーム + 結果 + CTA + OtherTools
│   │   ├── column/                 # 記事レンダラー + カード + CTA + TOC + 関連記事
│   │   ├── daikou/                 # service-card, service-list, selection-guide
│   │   └── seo/                    # json-ld.tsx
│   ├── lib/
│   │   ├── constants.ts            # サイト定数 + 計算定数（毎年8/1改定マーク付き）
│   │   ├── types.ts                # 全型定義
│   │   ├── utils.ts                # cn(), formatCurrency()
│   │   ├── gtag.ts                 # GA4カスタムイベントヘルパー
│   │   ├── column/
│   │   │   └── types.ts            # 記事データ型（ArticleData, ArticleSection等）
│   │   └── calculators/            # 計算ロジック純関数
│   │       ├── unemployment-insurance.ts
│   │       ├── retirement-tax.ts
│   │       └── paid-leave.ts
│   └── data/
│       ├── taishoku-services.ts    # 退職代行サービスデータ（11社、affiliateUrl全てnull）
│       └── articles/               # コラム記事データ（TypeScript）
│           └── index.ts            # バレルファイル（getAllArticles, getArticleBySlug等）
├── spec/
│   ├── overview.md                 # 本ファイル
│   └── pages.md                    # 全ページ・コンポーネント一覧
└── tasks/
    └── todo.md                     # タスク管理
```

## カラーパレット

| 役割 | CSS変数 | 値 | 用途 |
|---|---|---|---|
| Primary | --primary | oklch(0.546 0.245 262.88) Blue-600 | ヘッダー、CTA、リンク |
| Secondary | --secondary | oklch(0.97 0.003 247.86) Slate-100系 | セカンダリボタン背景 |
| Accent | --accent | oklch(0.97 0.003 247.86) Slate-100系 | アクセント背景 |
| Background | --background | oklch(0.984 0.003 247.86) Slate-50 | ページ背景 |
| Emerald | (Tailwindクラス直接) | emerald-50/500/600 | 金額ハイライト、チェックマーク |
| Amber | (Tailwindクラス直接) | amber-50/300/800 | 警告バナー |

## UIデザインパターン

### 全ページ共通
- グラデーションヘッダーセクション: `from-blue-50/80 to-white`, `py-10 md:py-14`
- パンくずナビ: `<Link>` + `ChevronRight` + `aria-label="パンくずリスト"`
- アイコン: `h-11 w-11 rounded-xl bg-primary/10` コンテナ内にLucideアイコン
- コンテナ: `mx-auto max-w-2xl px-4`（退職代行は`max-w-3xl`、トップは`max-w-5xl`）

### インタラクティブ要素
- 全clickable要素: `cursor-pointer` 必須
- ホバー: `transition-colors duration-200` または `transition-all duration-200`
- CTAボタン: `shadow-md hover:shadow-lg hover:brightness-110`
- カードホバー: `group-hover:-translate-y-1 group-hover:shadow-lg`
- テキストリンク: `transition-colors duration-200 hover:text-foreground`

### 警告バナー
統一パターン: `rounded-lg border border-amber-300 bg-amber-50 text-amber-800`

## GA4カスタムイベント

| イベント名 | パラメータ | 発火タイミング |
|---|---|---|
| tool_calculate | tool_name | 計算実行時 |
| daikou_tab_change | tab | タブ切替時 |
| affiliate_click | service_name | 公式サイトリンククリック時 |

## SEO構造化データ

| ページ | JSON-LDタイプ |
|---|---|
| `/` | WebSite + Organization |
| `/tools/*` | WebApplication + BreadcrumbList + FAQPage |
| `/column` | BreadcrumbList |
| `/column/[slug]` | Article + BreadcrumbList + FAQPage |
| `/taishoku-daikou` | ItemList + BreadcrumbList + FAQPage |
| `/about` | BreadcrumbList |

## 完全仕様書

`C:\Users\bbtai\projects\solo\candidates\yamelabo-spec.md`（1,704行）
