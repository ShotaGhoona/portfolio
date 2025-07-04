# 01. LP目的とスタイルガイド

## 1.1 LP（ランディングページ）の目的

このポートフォリオサイトは、Shota Yamashita（山下翔太）の個人ブランディングと事業展開を目的とした開発者向けランディングページです。

### 主要目的：
- **個人ブランディング**: Full-Stack AI Engineerとしての専門性とスキルセットの訴求
- **事業紹介**: Ghoona Inc.の創業者としての実績と事業展開のアピール
- **採用・協業**: 新しい機会や協業パートナーとの接点創出
- **技術力の証明**: 実装スキルと問題解決能力の実証

## 1.2 ターゲット

### プライマリーターゲット：
- **投資家・事業パートナー**: AI事業への投資や協業を検討する企業・個人
- **採用担当者**: フルスタック開発者やAIエンジニアを求める企業
- **技術者コミュニティ**: 同業の開発者やスタートアップ関係者

### セカンダリーターゲット：
- **クライアント**: 技術コンサルティングや開発支援を求める企業
- **メンター・アドバイザー**: 事業成長をサポートしてくれる経験豊富な人材

## 1.3 スタイルガイド

### 1.3.1 デザイン哲学
- **ミニマリスト**: 必要最小限の要素で最大の効果を追求
- **開発者フレンドリー**: コードライクな表現とターミナル風UI
- **プロフェッショナル**: 信頼性と専門性を重視した視覚的表現
- **テクニカル**: 技術的な詳細と実績の明確な表示

### 1.3.2 視覚的要素

#### カラーパレット（テーマ対応）：

**Light Mode（ライトモード）:**
- **プライマリ**: 白 (#FFFFFF) - メイン背景
- **セカンダリ**: ライトグレー (#F9FAFB, #F3F4F6) - セカンダリ背景とセクション分け
- **テキスト**: ダークグレー系 (#111827, #6B7280, #9CA3AF) - 階層化されたテキスト
- **ボーダー**: ライトグレー (#E5E7EB, #D1D5DB) - 境界線
- **アクセント**: グリーン (#10B981) - ステータス表示とアクション要素

**Dark Mode（ダークモード）:**
- **プライマリ**: ダークネイビー (#0F172A) - メイン背景
- **セカンダリ**: ダークグレー系 (#1E293B, #334155) - セカンダリ背景
- **テキスト**: ライト系 (#F1F5F9, #CBD5E1, #94A3B8) - 階層化されたテキスト
- **ボーダー**: ミディアムグレー (#475569, #64748B) - 境界線
- **アクセント**: シアン (#22D3EE) - ダークモード専用アクセントカラー

#### タイポグラフィ：
- **フォント**: Geist Sans & Geist Mono（等幅フォント）- モダンで読みやすい開発者向けフォント
- **階層**: 明確な文字サイズの階層化（4xl → xl → sm → xs）
- **ウェイト**: font-black（見出し）、font-bold（強調）、通常（本文）
- **多言語対応**: 日本語・英語での適切な表示とフォントレンダリング

#### レイアウト：
- **グリッドシステム**: 12カラムグリッドによる整然としたレイアウト
- **セクション分割**: 明確な境界線とpadding
- **レスポンシブ**: モバイルファーストのアプローチ

### 1.3.3 UI/UXパターン

#### インタラクション：
- **ホバーエフェクト**: 200ms duration のスムーズなトランジション
- **ボタンスタイル**: 境界線付きボタンとソリッドボタンの使い分け
- **フォーカス**: アクセシビリティを考慮したフォーカス表示
- **テーマ切り替え**: スムーズなダークモード・ライトモード切り替え（200ms遷移）
- **言語切り替え**: 瞬時の日本語・英語切り替えとコンテンツ更新

#### 情報アーキテクチャ：
1. **Header**: ナビゲーション、ブランディング、テーマ・言語切り替えコントロール
2. **Hero Section**: 自己紹介と価値提案（多言語対応済み）
3. **Projects Section**: 実績とポートフォリオ
4. **Expertise Section**: スキルセットと専門性
5. **Contact Section**: 連絡先と可用性
6. **Footer**: 補足情報とリンク

#### 機能コンポーネント：
- **ThemeToggle**: `THEME_LIGHT()` / `THEME_DARK()` / `THEME_SYSTEM()` 3段階切り替え
- **LanguageToggle**: `LANG_EN()` / `LANG_JA()` 日本語・英語切り替え

### 1.3.4 コンテンツトーン

#### 文体：
- **技術的かつ親しみやすい**: 専門用語を使いながらも理解しやすい表現
- **簡潔で具体的**: 冗長な説明を避け、数値や具体例を重視
- **自信に満ちた**: 実績と能力を明確に表現
- **多言語一貫性**: 英語・日本語で一貫したブランドメッセージとトーン維持

#### コメント形式：
- **JSコメント風**: `//` を使用した説明文（多言語で翻訳）
- **関数名風**: `VIEW_PROJECTS()`, `DOWNLOAD_CV()` など動作を示す表現
- **オブジェクト記法**: `const engineer = { name: 'Shota Yamashita' }` など
- **システム風表現**: `THEME_LIGHT()`, `LANG_EN()` など設定系の関数風表現

## 1.4 技術的実装

### 1.4.1 フレームワーク・ライブラリ
- **Next.js 15**: React ベースの Web フレームワーク（App Router使用）
- **TypeScript**: 型安全性を確保した開発
- **Tailwind CSS v4**: ユーティリティファーストのCSSフレームワーク
- **Geist Fonts**: Next.js公式の最適化されたフォント

### 1.4.2 コンポーネント構成
- **共通コンポーネント**: Header, Footer, ThemeToggle, LanguageToggle
- **セクションコンポーネント**: Hero (多言語対応済み), Projects, Expertise, Contact
- **プロバイダー**: ThemeProvider（テーマ管理）
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ

### 1.4.3 パフォーマンス最適化
- **静的生成**: Next.js の静的サイト生成機能を活用
- **コンポーネント分割**: 再利用可能な小さなコンポーネント
- **SEO最適化**: 適切なメタタグとセマンティックHTML
- **CSS Variables**: 効率的なテーマ切り替えとランタイムパフォーマンス
- **動的インポート**: 翻訳データのセクション別遅延読み込み
- **フラッシュ防止**: テーマ・言語の初期設定による描画ちらつき回避

## 1.5 成功指標

### 1.5.1 定量的指標
- **ページビュー**: 月間ユニークビジター数
- **滞在時間**: 平均セッション時間
- **コンバージョン**: 問い合わせフォーム送信数
- **エンゲージメント**: ダウンロード数（CV、ポートフォリオ）

### 1.5.2 定性的指標
- **ブランド認知**: 技術コミュニティでの評価
- **機会創出**: 新しいビジネス機会や協業の提案
- **フィードバック**: 訪問者からの直接的なフィードバック

## 1.6 今後の展開

### 1.6.1 コンテンツ拡充
- **プロジェクト詳細**: 各プロジェクトの技術的詳細ページ
- **ブログ機能**: 技術記事や事業に関する記事
- **ケーススタディ**: 具体的な問題解決事例

### 1.6.2 機能拡張（実装済み・今後の計画）

#### 実装済み機能（v2.1.0）：
- **✅ ダークモード**: 開発者向けのダークテーマ（Light/Dark/System 3段階切り替え）
- **✅ 多言語対応**: 日本語・英語の切り替え機能（Heroセクション対応済み）
- **✅ テーマ永続化**: localStorage によるユーザー設定保存
- **✅ システム連携**: OS設定に基づく自動テーマ・言語検出

#### 今後の計画：
- **🔄 多言語拡張**: 残りセクション（Projects, Expertise, Contact, Footer）の翻訳対応
- **🔄 インタラクティブ要素**: 動的なスキルチャートやプロジェクト詳細
- **📋 メタデータ対応**: ページタイトル・description の多言語化
- **🎨 UIアニメーション**: より洗練されたトランジション効果

## 1.7 技術仕様詳細

### 1.7.1 実装済みシステム

#### テーマシステム：
- **CSS Variables アプローチ**: `--color-*` 変数による効率的なテーマ管理
- **3段階切り替え**: Light → Dark → System → Light... のサイクル
- **フラッシュ防止**: `<head>` 内スクリプトによる初期設定
- **永続化**: localStorage `theme` キー

#### 国際化システム：
- **軽量アプローチ**: セクション別JSONファイル + カスタムフック
- **動的ロード**: `useLanguage` hook による翻訳データの遅延読み込み
- **型安全性**: TypeScript による翻訳キーの型チェック
- **永続化**: localStorage `language` キー

### 1.7.2 ファイル構成
```
src/
├── hooks/
│   ├── useTheme.ts              # テーマ管理
│   └── useLanguage.ts           # 言語管理
├── components/
│   ├── common/
│   │   ├── ThemeToggle.tsx      # テーマ切り替えUI
│   │   └── LanguageToggle.tsx   # 言語切り替えUI
│   └── providers/
│       └── ThemeProvider.tsx    # テーマContext Provider
├── data/translations/
│   └── hero.json               # Heroセクション翻訳データ
└── app/
    ├── globals.css             # CSS Variables定義
    └── layout.tsx              # フラッシュ防止スクリプト
```

---

*このドキュメントは、ポートフォリオサイトの目的と方向性を明確にし、一貫したブランディングとユーザー体験を提供するためのガイドラインです。最新の実装状況と技術仕様を反映し、継続的にアップデートされます。*