# 01. ダークモード・ライトモード切り替え実装戦略

## 1.1 現状分析

### 現在の実装状況
- **Tailwind CSS v4**: 最新バージョンを使用
- **CSS Variables**: 既にCSS変数ベースのテーマシステムが部分的に実装されている
- **メディアクエリ対応**: `prefers-color-scheme: dark` による自動ダークモード対応済み
- **フォント設定**: Geist Sans, Geist Mono フォントが設定済み

### 課題点
- **手動切り替え不可**: ユーザーが任意にテーマを切り替えできない
- **状態管理なし**: テーマ状態の永続化が未実装
- **コンポーネント対応不足**: 現在のコンポーネントがダークモードに対応していない
- **UI切り替えボタンなし**: テーマ切り替えUIが存在しない

## 1.2 実装戦略

### 1.2.1 技術アプローチ

#### A. CSS Variables + Tailwind Dark Variant（推奨）
```css
/* Light Mode */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-primary: #e5e7eb;
  --accent-green: #10b981;
}

/* Dark Mode */
:root[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border-primary: #374151;
  --accent-green: #34d399;
}
```

#### B. React Context + Local Storage
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}
```

### 1.2.2 実装フェーズ

#### Phase 1: 基盤構築
1. **ThemeProvider作成**: React Contextベースのテーマ管理
2. **CSS Variables拡張**: 現在の変数を全コンポーネント対応に拡張
3. **Hook作成**: `useTheme` カスタムフック実装
4. **永続化**: localStorage による設定保存

#### Phase 2: UI実装
1. **テーマ切り替えボタン**: Header内にトグルボタン配置
2. **アニメーション**: スムーズなテーマ遷移効果
3. **システム設定対応**: OS設定との連携オプション

#### Phase 3: コンポーネント対応
1. **全コンポーネント更新**: ダークモード対応のスタイル適用
2. **動的要素対応**: ホバー、フォーカス状態のテーマ対応
3. **画像・アイコン**: テーマに応じた画像切り替え

## 1.3 詳細実装計画

### 1.3.1 ファイル構成
```
src/
├── contexts/
│   └── ThemeContext.tsx          # テーマ管理Context
├── hooks/
│   └── useTheme.ts              # テーマ操作Hook
├── components/
│   ├── common/
│   │   ├── Header.tsx           # テーマ切り替えボタン追加
│   │   └── ThemeToggle.tsx      # 切り替えボタンコンポーネント
│   └── providers/
│       └── ThemeProvider.tsx    # テーマProvider
├── styles/
│   └── themes.css              # テーマ定義CSS
└── app/
    ├── globals.css             # 既存CSS更新
    └── layout.tsx              # Provider統合
```

### 1.3.2 カラーパレット設計

#### Light Mode（現在の設計を踏襲）
```css
--color-bg-primary: #ffffff;        /* メイン背景 */
--color-bg-secondary: #f9fafb;      /* セカンダリ背景 */
--color-bg-tertiary: #f3f4f6;       /* ターシャリ背景 */
--color-text-primary: #111827;      /* メインテキスト */
--color-text-secondary: #6b7280;    /* セカンダリテキスト */
--color-text-tertiary: #9ca3af;     /* ターシャリテキスト */
--color-border-primary: #e5e7eb;    /* メインボーダー */
--color-border-secondary: #d1d5db;  /* セカンダリボーダー */
--color-accent-green: #10b981;      /* アクセントカラー */
--color-accent-green-hover: #059669; /* ホバー状態 */
```

#### Dark Mode（開発者向け最適化）
```css
--color-bg-primary: #0f172a;        /* ダークメイン背景 */
--color-bg-secondary: #1e293b;      /* ダークセカンダリ背景 */
--color-bg-tertiary: #334155;       /* ダークターシャリ背景 */  
--color-text-primary: #f1f5f9;      /* ダークメインテキスト */
--color-text-secondary: #cbd5e1;    /* ダークセカンダリテキスト */
--color-text-tertiary: #94a3b8;     /* ダークターシャリテキスト */
--color-border-primary: #475569;    /* ダークメインボーダー */
--color-border-secondary: #64748b;  /* ダークセカンダリボーダー */
--color-accent-green: #22d3ee;      /* ダークアクセントカラー */
--color-accent-green-hover: #06b6d4; /* ダークホバー状態 */
```

### 1.3.3 ThemeToggle UI デザイン

#### デザインコンセプト
- **ミニマル**: 現在のデザイン哲学に合致
- **直感的**: 太陽/月アイコンによる視覚的表現
- **開発者フレンドリー**: ターミナル風の表現も検討

#### 実装案
```typescript
// Option A: アイコンベース
<button className="theme-toggle">
  {theme === 'dark' ? '☀️' : '🌙'}
</button>

// Option B: テキストベース（推奨）
<button className="font-mono text-xs">
  THEME_{theme.toUpperCase()}()
</button>

// Option C: スライダー式
<div className="theme-slider">
  <span>LIGHT</span>
  <div className="slider" />
  <span>DARK</span>
</div>
```

### 1.3.4 テーマ切り替えロジック

#### 状態管理
```typescript
type Theme = 'light' | 'dark' | 'system';

const themeLogic = {
  // システム設定検出
  getSystemTheme: () => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  
  // 実際に適用されるテーマ解決
  resolveTheme: (theme: Theme) => 
    theme === 'system' ? getSystemTheme() : theme,
    
  // DOM更新
  applyTheme: (resolvedTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }
};
```

### 1.3.5 パフォーマンス最適化

#### フラッシュ防止
```typescript
// layout.tsx内で初期テーマを即座に適用
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    const resolved = theme === 'system' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      theme;
    document.documentElement.setAttribute('data-theme', resolved);
  })();
`;
```

#### CSS最適化
- CSS変数のみ使用により、JavaScript依存を最小化
- Tailwind の `dark:` プレフィックス活用
- Critical CSS にテーマ関連スタイルを含める

## 1.4 実装優先度

### High Priority（即時実装）
1. **ThemeProvider実装**: 基本的なテーマ管理機能
2. **CSS Variables拡張**: 全色彩のテーマ対応
3. **Header内トグルボタン**: 基本的な切り替えUI
4. **localStorage連携**: 設定永続化

### Medium Priority（第2段階）
1. **全コンポーネント対応**: Hero, Projects, Expertise, Contact各セクション
2. **アニメーション実装**: スムーズなテーマ遷移
3. **System theme連携**: OS設定との同期

### Low Priority（将来実装）
1. **高度なUI**: 複数テーマオプション
2. **カスタムテーマ**: ユーザー定義テーマ
3. **テーマプレビュー**: リアルタイムプレビュー機能

## 1.5 技術的考慮事項

### 1.5.1 SSR対応
- **Next.js App Router**: サーバーサイドでのテーマ検出
- **Hydration対策**: クライアントとサーバーの状態同期
- **初期レンダリング**: フラッシュ現象の回避

### 1.5.2 アクセシビリティ
- **キーボード操作**: Tab, Enter, Space での操作
- **スクリーンリーダー**: 適切なARIAラベル
- **コントラスト比**: WCAG 2.1 AA基準準拠
- **動画縮小**: `prefers-reduced-motion` 対応

### 1.5.3 ブラウザ対応
- **CSS Variables**: IE11以降サポート
- **Local Storage**: 全モダンブラウザ対応
- **Media Queries**: レスポンシブ対応維持

## 1.6 実装後の効果

### 1.6.1 ユーザー体験向上
- **カスタマイゼーション**: 個人の好みに応じた表示
- **開発者フレンドリー**: ダークモードによる目の負担軽減
- **プロフェッショナル感**: 現代的なWebアプリケーション体験

### 1.6.2 技術的価値
- **実装スキル証明**: フロントエンド開発能力のアピール  
- **モダン技術**: 最新のWeb技術スタック活用
- **保守性向上**: 構造化されたテーマ管理システム

### 1.6.3 ブランディング効果
- **差別化**: 他のポートフォリオサイトとの差別化
- **注目度向上**: 技術者コミュニティでの話題性
- **信頼性**: 細部への配慮による信頼感向上

## 1.7 実装スケジュール

### Week 1: 基盤実装
- [ ] ThemeContext, ThemeProvider作成
- [ ] useTheme Hook実装
- [ ] CSS Variables拡張
- [ ] localStorage連携

### Week 2: UI実装
- [ ] ThemeToggleコンポーネント作成
- [ ] Header統合
- [ ] 基本アニメーション実装

### Week 3: コンポーネント対応
- [ ] 全セクションのダークモード対応
- [ ] ホバー・フォーカス状態の調整
- [ ] レスポンシブ対応確認

### Week 4: 最適化・テスト
- [ ] パフォーマンス最適化
- [ ] アクセシビリティテスト
- [ ] クロスブラウザテスト
- [ ] ドキュメント作成

---

*この戦略に基づいて実装することで、技術的に洗練されたテーマ切り替え機能を提供し、ポートフォリオサイトの価値を大幅に向上させることができます。*