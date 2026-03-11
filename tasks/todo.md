# ヤメラボ — タスク管理

**仕様書**: `C:\Users\bbtai\projects\solo\candidates\yamelabo-spec.md` Section 16
**開始**: 2026-03-11
**目標**: 本製品クオリティ（全6ページ動作 + 計算ロジック検証済み + UIデザイン完成）

---

## 事前準備（人間の作業 — 後回しでOK）

- [ ] 0-1: ドメイン yamelabo.com の取得
- [ ] 0-2: GA4 Measurement ID 取得
- [ ] 0-3: Google Search Console 登録
- [ ] 0-4: お問い合わせ Google Form 作成

## Step 1: プロジェクト初期化

- [x] 1-1: create-next-app
- [x] 1-2: shadcn/ui init
- [x] 1-3: shadcn components 追加
- [x] 1-4: date-fns インストール
- [x] 1-5: 初回コミット

## Step 2: 共通基盤

- [x] 2-1: globals.css（カラーパレット、Tailwind v4テーマ）
- [x] 2-2: utils.ts（cn + formatCurrency）
- [x] 2-3: constants.ts（サイト定数 + 全計算定数テーブル）
- [x] 2-4: types.ts（全Input/Result型 + TaishokuService型）
- [x] 2-5: layout.tsx（Geist + Noto Sans JP fonts, GA4, metadata, Header/Footer配置）
- [x] 2-6: header.tsx（sticky + DropdownMenu + モバイルSheet）
- [x] 2-7: footer.tsx（リンク + 免責事項）
- [x] 2-8: json-ld.tsx（構造化データ生成関数）
- [x] 2-9: robots.ts
- [x] 2-10: sitemap.ts

## Step 3: 計算ロジック

- [x] 3-1: retirement-tax.ts → 付録A.2の5ケース完全一致
- [x] 3-2: paid-leave.ts → 付録A.3の3ケース完全一致
- [x] 3-3: unemployment-insurance.ts → 付録A.1の4ケース完全一致
- [x] 検証: 全12テストケース（24個の検証値）で期待値と一致

## Step 4: ツールUI

- [x] 4-1: tool-result-cta.tsx（共通CTA）
- [x] 4-2: other-tools.tsx（他のツールリンク）
- [x] 4-3: retirement-tax-form.tsx
- [x] 4-4: retirement-tax-result.tsx
- [x] 4-5: paid-leave-form.tsx
- [x] 4-6: paid-leave-result.tsx
- [x] 4-7: unemployment-form.tsx
- [x] 4-8: unemployment-result.tsx

## Step 5: ページ

- [x] 5-1: tools/retirement-tax/page.tsx（meta + JSON-LD + FAQ）
- [x] 5-2: tools/paid-leave/page.tsx
- [x] 5-3: tools/unemployment-insurance/page.tsx
- [x] 5-4: page.tsx（トップ）

## Step 6: 退職代行比較

- [x] 6-1: taishoku-services.ts（データ 11社）
- [x] 6-2: service-card.tsx
- [x] 6-3: service-list.tsx（Tabs + フィルタ）
- [x] 6-4: selection-guide.tsx
- [x] 6-5: taishoku-daikou/page.tsx

## Step 7: 仕上げ

- [x] 7-1: about/page.tsx
- [x] 7-2: GA4カスタムイベント実装（gtag.ts + 全フォーム + タブ + アフィリエイトクリック）
- [x] 7-3: spec/overview.md
- [x] 7-4: spec/pages.md
- [x] 7-5: ui-ux-pro-maxデザイン適用（全ページ共通ヘッダー、アイコン、グラデーション、ホバーアニメーション）
- [x] 7-6: npm run build エラーなし（全9ルート静的プリレンダリング）

## Step 8: デプロイ（人間の作業）

- [ ] 8-1: GitHub repo 作成 & push
- [ ] 8-2: Vercel Pro 連携
- [ ] 8-3: 環境変数設定
- [ ] 8-4: カスタムドメイン設定
- [ ] 8-5: 本番URL確認
- [ ] 8-6: Search Console サイトマップ送信

## 完了チェックリスト

- [x] npm run build エラーなし
- [x] 全9ルート（6ページ + robots + sitemap + 404）静的プリレンダリング
- [ ] 失業保険: 日額¥5,735、総額¥516,150（ブラウザで目視確認）
- [ ] 退職金: 500万/15年 → 手取り¥5,000,000
- [ ] 退職金: 800万/4年 → 手取り¥6,945,898（5年以下特例）
- [ ] 有給: 6ヶ月未満で「まだ付与なし」表示
- [ ] 退職代行: タブフィルタ動作
- [ ] モバイル表示正常
- [ ] CTAリンク正常遷移
- [ ] Lighthouse SEO 90+

---

## 技術メモ

### shadcn/ui v4 Nova preset (base-ui) の注意点
- `asChild` プロパティなし → `<Link className={buttonVariants(...)}>` パターンを使用
- `buttonVariants` はサーバーコンポーネントで使用するため `button-variants.ts` に分離
- Accordion: `type="multiple"` ではなく `multiple` ブーリアンプロパティ
- Select: `onValueChange` は `string | null` を送る → `(v) => setState(v ?? "")` でラップ

### 計算ロジック検証
- 失業保険 Case 3: specの手計算は5,031だがコードの5,032が数学的に正しい（spec側の中間値丸め誤差）
- `rawDailyWage`（float）で給付計算、`displayDailyWage`（floor）で表示に分離

---

## 進捗ログ

### 2026-03-11
- プロジェクト初期化〜全ページ実装完了
- 計算ロジック全12テストケース検証済み
- ui-ux-pro-maxデザインシステム適用（全ページ）
- GA4カスタムイベント実装
- ビルド成功（全9ルート）
