# ヤメラボ — タスク管理

**本番URL**: https://yamelabo.goodlabs.jp
**GitHub**: https://github.com/ymttaisei/yamelabo
**開始**: 2026-03-11

---

## 完了済み

<details>
<summary>Step 1-7: 実装 + デプロイ（全完了）</summary>

- [x] プロジェクト初期化（Next.js 16 + shadcn/ui v4 + date-fns）
- [x] 共通基盤（globals.css, constants, types, utils, layout, header, footer, json-ld, robots, sitemap）
- [x] 計算ロジック3本（全12テストケース検証済み）
- [x] ツールUI（フォーム3本 + 結果3本 + CTA + OtherTools）
- [x] 全6ページ実装（トップ, ツール×3, 退職代行比較, about）
- [x] GA4カスタムイベント実装
- [x] ui-ux-pro-maxデザイン適用
- [x] 品質チェック2ラウンド（6チーム×2回、全修正済み）
- [x] GitHub push (ymttaisei/yamelabo)
- [x] Vercel Pro デプロイ
- [x] カスタムドメイン yamelabo.goodlabs.jp 設定
- [x] CSS Hydration問題修正（<head>タグ削除 + todayString遅延初期化）

</details>

---

## Phase 2: 収益化基盤（最優先）

### 2-1: アナリティクス・SEO計測
- [ ] GA4プロパティ作成 → Measurement ID取得 **[人間]**
- [ ] constants.ts に GA4_MEASUREMENT_ID 設定 → デプロイ
- [ ] Google Search Console 登録 **[人間]**
- [ ] Search Console でサイトマップ送信（https://yamelabo.goodlabs.jp/sitemap.xml）**[人間]**
- [ ] 全6ページのインデックス登録リクエスト **[人間]**

### 2-2: アフィリエイト紐づけ
- [ ] ASP登録（A8.net / もしもアフィリエイト / アクセストレード）**[人間]**
- [ ] 退職代行サービスの提携申請 **[人間]**
- [ ] taishoku-services.ts の affiliateUrl を実AFリンクに差し替え
- [ ] アフィリエイトリンクの動作確認

### 2-3: お問い合わせ
- [ ] Google Form 作成 **[人間]**
- [ ] constants.ts に CONTACT_FORM_URL 設定 → デプロイ

---

## Phase 3: デザイン磨き

### 3-1: コンバージョン直結箇所（優先）
- [ ] 計算結果カードのデザイン強化（金額の視認性、CTAへの導線）
- [ ] 退職代行サービスカードのデザイン改善（クリック率向上）
- [ ] スマホ操作感の改善（フォーム入力、結果表示）

### 3-2: 全体ビジュアル
- [ ] トップページのヒーロー改善（ビジュアルインパクト）
- [ ] OGP画像作成（X Build in Public用）
- [ ] faviconデザイン改善

---

## Phase 4: コンテンツ拡充（SEOロングテール）

- [ ] 各ツールページのFAQ倍増（5→10問程度）
- [ ] 退職代行比較ページの選び方ガイド拡充
- [ ] 退職代行サービスデータの更新・追加

---

## Phase 5: 当たり判定後

- [ ] 独自ドメイン yamelabo.com 取得・移行
- [ ] 転職エージェントアフィリエイト追加（doda, リクルートエージェント等）
- [ ] GitHub連携自動デプロイ設定

---

## 当たり判定基準

以下のいずれかを満たしたらPhase 5に進む：
- 月間1,000PV超
- アフィリエイト初成約
- Search Console インプレッション安定

---

## 技術メモ

### shadcn/ui v4 Nova preset (base-ui) の注意点
- `asChild` プロパティなし → `<Link className={buttonVariants(...)}>` パターン
- `buttonVariants` はサーバーコンポーネントで使用するため `button-variants.ts` に分離
- Accordion: `type="multiple"` ではなく `multiple` ブーリアンプロパティ
- Select: `onValueChange` は `string | null` → `(v) => setState(v ?? "")` でラップ

### Hydration対策
- layout.tsxに明示的 `<head>` タグを書くとCSS剥がれる → GA4 Scriptは `<body>` 内に配置
- `todayString()` は `useEffect` で遅延初期化（SSGビルド日 ≠ クライアント日付）

### 計算ロジック検証
- 失業保険 Case 3: specの手計算は5,031だがコードの5,032が数学的に正しい（spec側の中間値丸め誤差）
- `rawDailyWage`（float）で給付計算、`displayDailyWage`（floor）で表示に分離

### デプロイ
- GitHub: ymttaiseiアカウント（`gh auth switch --user ymttaisei` 必要）
- Vercel: CLIデプロイ `vercel --prod --yes`（GitHub連携自動デプロイは未設定）

---

## 進捗ログ

### 2026-03-11
- プロジェクト初期化〜全ページ実装完了
- 計算ロジック全12テストケース検証済み
- ui-ux-pro-maxデザインシステム適用（全ページ）
- GA4カスタムイベント実装
- 品質チェック2ラウンド実施（6チーム並列×2回）
- GitHub push + Vercel デプロイ + ドメイン設定
- CSS Hydration問題修正
- 本番公開: https://yamelabo.goodlabs.jp
