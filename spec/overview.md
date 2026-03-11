# ヤメラボ (YAMELABO) — サービス概要

## コンセプト

「退職のお金、まるわかり。」

退職にまつわる計算ツール群（失業保険・退職金税金・有給休暇）で検索流入を獲得し、退職代行・転職アフィリエイトで収益化するメディア。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) + React 19 |
| 言語 | TypeScript (strict) |
| UI | shadcn/ui (Nova preset, base-ui) + Tailwind CSS v4 |
| フォント | Noto Sans JP + Geist Sans + Geist Mono |
| 日付計算 | date-fns |
| デプロイ | Vercel Pro |
| アナリティクス | Google Analytics 4 |
| DB | 不要（全計算クライアントサイド完結） |

### shadcn/ui Nova preset の注意点
- `@base-ui/react` ベース（Radix UIではない）
- `asChild` プロパティなし → `<Link className={buttonVariants(...)}>` パターン
- `buttonVariants` はサーバーコンポーネント用に `button-variants.ts` に分離
- Accordion: `type="multiple"` ではなく `multiple` ブーリアンプロパティ
- Select: `onValueChange` は `string | null` → `(v) => setState(v ?? "")` でラップ

## ディレクトリ構成

```
yamelabo/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト（GA4, fonts, meta）
│   │   ├── page.tsx                # トップページ
│   │   ├── globals.css             # Tailwind v4テーマ
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── about/page.tsx
│   │   ├── tools/
│   │   │   ├── unemployment-insurance/page.tsx
│   │   │   ├── retirement-tax/page.tsx
│   │   │   └── paid-leave/page.tsx
│   │   └── taishoku-daikou/page.tsx
│   ├── components/
│   │   ├── ui/                     # shadcn/ui
│   │   │   ├── button.tsx          # Button (base-ui)
│   │   │   ├── button-variants.ts  # CVA buttonVariants（サーバーコンポーネント用）
│   │   │   └── ...                 # card, input, select, accordion, tabs, etc.
│   │   ├── layout/                 # header.tsx, footer.tsx
│   │   ├── tools/                  # フォーム + 結果 + CTA + OtherTools
│   │   ├── daikou/                 # 退職代行比較（service-card, service-list, selection-guide）
│   │   └── seo/                    # json-ld.tsx
│   ├── lib/
│   │   ├── constants.ts            # サイト定数 + 計算定数
│   │   ├── types.ts                # 全型定義
│   │   ├── utils.ts                # cn(), formatCurrency()
│   │   ├── gtag.ts                 # GA4カスタムイベントヘルパー
│   │   └── calculators/            # 計算ロジック純関数
│   │       ├── unemployment-insurance.ts
│   │       ├── retirement-tax.ts
│   │       └── paid-leave.ts
│   └── data/
│       └── taishoku-services.ts    # 退職代行サービスデータ（11社）
├── spec/
│   ├── overview.md                 # 本ファイル
│   └── pages.md                    # 全ページ一覧
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

## GA4カスタムイベント

| イベント名 | パラメータ | 発火タイミング |
|---|---|---|
| tool_calculate | tool_name | 計算実行時 |
| daikou_tab_change | tab | タブ切替時 |
| affiliate_click | service_name | 公式サイトリンククリック時 |

## 完全仕様書

`C:\Users\bbtai\projects\solo\candidates\yamelabo-spec.md`（1,704行）
