# ヤメラボ — ページ・コンポーネント一覧

## ページ一覧

| パス | タイプ | 概要 |
|---|---|---|
| `/` | SSG | トップ。ヒーロー + ツールカード3枚 + SEOテキスト + 退職代行CTA |
| `/tools/unemployment-insurance` | SSG | 失業保険計算。フォーム + 結果 + FAQ(5問) |
| `/tools/retirement-tax` | SSG | 退職金税金計算。フォーム + 結果 + FAQ(3問) |
| `/tools/paid-leave` | SSG | 有給休暇計算。フォーム + 結果 + FAQ(3問) |
| `/taishoku-daikou` | SSG | 退職代行比較。警告バナー + タブフィルタ + サービスカード11社 + 選び方ガイド + FAQ(4問) |
| `/column` | SSG | コラム一覧。記事カードグリッド |
| `/column/[slug]` | SSG (generateStaticParams) | コラム記事詳細。目次 + 記事本文 + ツールCTA + FAQ + 関連記事 |
| `/about` | SSG | 免責事項・運営情報・プライバシーポリシー |

## コンポーネント一覧

### layout/
| ファイル | 種別 | 概要 |
|---|---|---|
| header.tsx | Client | sticky header + DropdownMenu(ツール) + Sheet(モバイル) |
| footer.tsx | Server | フッター + 免責事項 + copyright |

### tools/
| ファイル | 種別 | 概要 |
|---|---|---|
| unemployment-form.tsx | Client | 失業保険フォーム（年齢/月給/勤続/離職理由/障害者） |
| unemployment-result.tsx | Server | 失業保険結果カード |
| retirement-tax-form.tsx | Client | 退職金税金フォーム（退職金額/勤続/障害者/役員） |
| retirement-tax-result.tsx | Server | 退職金税金結果カード |
| paid-leave-form.tsx | Client | 有給休暇フォーム（入社日/基準日/雇用形態/週日数） |
| paid-leave-result.tsx | Server | 有給休暇結果カード |
| tool-result-cta.tsx | Server | 共通CTA（→退職代行比較ページ） |
| other-tools.tsx | Server | 他のツールへのリンク（現在のツール以外2つ表示） |

### daikou/
| ファイル | 種別 | 概要 |
|---|---|---|
| service-card.tsx | Client | サービスカード（名前/種別/料金/特徴/AFリンク/GA4イベント） |
| service-list.tsx | Client | タブフィルタ（すべて/弁護士/労組/民間） |
| selection-guide.tsx | Server | 退職代行の選び方ガイド |

### column/
| ファイル | 種別 | 概要 |
|---|---|---|
| article-body.tsx | Server | 記事本文レンダラー（段落/テーブル/タイムライン/コールアウト/チェックリスト/引用/番号リスト） |
| article-card.tsx | Server | 記事一覧カード（カテゴリバッジ + タイトル + excerpt） |
| article-tool-cta.tsx | Server | 記事内ツールCTA（3ツールへの導線、`<aside>`） |
| related-articles.tsx | Server | 関連記事リンク（`<nav>`） |
| table-of-contents.tsx | Client | 折りたたみ目次（aria-expanded対応） |

### seo/
| ファイル | 種別 | 概要 |
|---|---|---|
| json-ld.tsx | Server | WebSite/Organization/WebApplication/Article/Breadcrumb/FAQ/ItemList |

## 計算ロジック (lib/calculators/)

| ファイル | テストケース | 検証結果 |
|---|---|---|
| retirement-tax.ts | 5ケース | 全一致 |
| paid-leave.ts | 3ケース | 全一致 |
| unemployment-insurance.ts | 4ケース | 全一致（Case3は仕様書の手計算に丸め誤差あり、コードが正） |
