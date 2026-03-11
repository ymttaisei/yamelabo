# ヤメラボ MVP — タスク管理

**仕様書**: `C:\Users\bbtai\projects\solo\candidates\yamelabo-spec.md` Section 16
**開始**: 2026-03-11
**目標**: MVP完成（全6ページ動作 + 計算ロジック検証済み）

---

## 事前準備（人間の作業 — 後回しでOK）

- [ ] 0-1: ドメイン yamelabo.com の取得
- [ ] 0-2: GA4 Measurement ID 取得
- [ ] 0-3: Google Search Console 登録
- [ ] 0-4: お問い合わせ Google Form 作成

## Step 1: プロジェクト初期化

- [ ] 1-1: create-next-app
- [ ] 1-2: shadcn/ui init
- [ ] 1-3: shadcn components 追加
- [ ] 1-4: date-fns インストール
- [ ] 1-5: 初回コミット

## Step 2: 共通基盤

- [ ] 2-1: globals.css（カラーパレット、Tailwind v4テーマ）
- [ ] 2-2: utils.ts（cn + formatCurrency）
- [ ] 2-3: constants.ts（サイト定数 + 全計算定数テーブル）
- [ ] 2-4: types.ts（全Input/Result型 + TaishokuService型）
- [ ] 2-5: layout.tsx（Geist fonts, GA4, metadata, Header/Footer配置）
- [ ] 2-6: header.tsx（sticky + DropdownMenu + モバイルSheet）
- [ ] 2-7: footer.tsx（リンク + 免責事項）
- [ ] 2-8: json-ld.tsx（構造化データ生成関数）
- [ ] 2-9: robots.ts
- [ ] 2-10: sitemap.ts
- [ ] 検証: npm run dev → ヘッダー・フッター表示

## Step 3: 計算ロジック（並列可能）

- [ ] 3-1: retirement-tax.ts → 付録A.2の5ケース完全一致
- [ ] 3-2: paid-leave.ts → 付録A.3の3ケース完全一致
- [ ] 3-3: unemployment-insurance.ts → 付録A.1の4ケース完全一致
- [ ] 検証: 全12テストケースで期待値と1円の誤差もなく一致

## Step 4: ツールUI

- [ ] 4-1: tool-result-cta.tsx（共通CTA）
- [ ] 4-2: other-tools.tsx（他のツールリンク）
- [ ] 4-3: retirement-tax-form.tsx
- [ ] 4-4: retirement-tax-result.tsx
- [ ] 4-5: paid-leave-form.tsx
- [ ] 4-6: paid-leave-result.tsx
- [ ] 4-7: unemployment-form.tsx
- [ ] 4-8: unemployment-result.tsx

## Step 5: ページ

- [ ] 5-1: tools/retirement-tax/page.tsx（meta + JSON-LD + FAQ）
- [ ] 5-2: tools/paid-leave/page.tsx
- [ ] 5-3: tools/unemployment-insurance/page.tsx
- [ ] 5-4: page.tsx（トップ）

## Step 6: 退職代行比較

- [ ] 6-1: taishoku-services.ts（データ）
- [ ] 6-2: service-card.tsx
- [ ] 6-3: service-list.tsx（Tabs + フィルタ）
- [ ] 6-4: selection-guide.tsx
- [ ] 6-5: taishoku-daikou/page.tsx

## Step 7: 仕上げ

- [ ] 7-1: about/page.tsx
- [ ] 7-2: GA4カスタムイベント実装
- [ ] 7-3: spec/overview.md
- [ ] 7-4: spec/pages.md
- [ ] 7-5: 全ページ動作確認

## Step 8: デプロイ（人間の作業）

- [ ] 8-1: GitHub repo 作成 & push
- [ ] 8-2: Vercel Pro 連携
- [ ] 8-3: 環境変数設定
- [ ] 8-4: カスタムドメイン設定
- [ ] 8-5: 本番URL確認
- [ ] 8-6: Search Console サイトマップ送信

## 完了チェックリスト

- [ ] npm run build エラーなし
- [ ] 全6ページ 200返却
- [ ] 失業保険: 日額¥5,735、総額¥516,150
- [ ] 退職金: 500万/15年 → 手取り¥5,000,000
- [ ] 退職金: 800万/4年 → 手取り¥6,945,898（5年以下特例）
- [ ] 有給: 6ヶ月未満で「まだ付与なし」表示
- [ ] 退職代行: タブフィルタ動作
- [ ] モバイル表示正常
- [ ] CTAリンク正常遷移
- [ ] Lighthouse SEO 90+

---

## 進捗ログ

### 2026-03-11
- 開始
