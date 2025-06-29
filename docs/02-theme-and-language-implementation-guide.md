# 02. テーマ変更・言語変更 実装ガイド

## 2.1 概要

このガイドでは、新しいセクションやコンポーネントにテーマ変更（ダークモード）と言語変更（国際化）機能を実装する方法を説明します。

### 前提条件
- `useTheme` hook が実装済み
- `useLanguage` hook が実装済み
- CSS Variables システムが構築済み
- ThemeProvider が layout.tsx に統合済み

## 2.2 テーマ機能の実装

### 2.2.1 基本的な実装パターン

#### Step 1: useTheme Hook のインポート
```typescript
// コンポーネントの先頭で useTheme をインポート（言語機能不要の場合）
import { useTheme } from '@/hooks/useTheme';

export function YourNewSection() {
  // hook は使用しないが、CSS Variables が自動で適用される
  return (
    <section>
      {/* コンテンツ */}
    </section>
  );
}
```

#### Step 2: CSS Variables の使用
```typescript
// スタイルにCSS Variablesを使用
export function YourNewSection() {
  return (
    <section 
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)' // ✅ CSS Variables使用
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          className="font-mono font-black text-xl mb-4"
          style={{ color: 'var(--color-text-primary)' }} // ✅ 
        >
          セクションタイトル
        </h2>
        
        <p 
          className="font-mono text-sm"
          style={{ color: 'var(--color-text-secondary)' }} // ✅
        >
          説明文
        </p>
      </div>
    </section>
  );
}
```

### 2.2.2 利用可能なCSS Variables一覧

#### 背景色
```css
var(--color-bg-primary)    /* メイン背景 */
var(--color-bg-secondary)  /* セカンダリ背景 */
var(--color-bg-tertiary)   /* ターシャリ背景 */
```

#### テキスト色
```css
var(--color-text-primary)   /* メインテキスト */
var(--color-text-secondary) /* セカンダリテキスト */
var(--color-text-tertiary)  /* ターシャリテキスト */
```

#### ボーダー色
```css
var(--color-border-primary)   /* メインボーダー */
var(--color-border-secondary) /* セカンダリボーダー */
```

#### アクセント色
```css
var(--color-accent-green)       /* アクセントカラー */
var(--color-accent-green-hover) /* ホバー時のアクセント */
```

### 2.2.3 推奨実装パターン

#### ❌ 悪い例（Tailwindクラス直接使用）
```typescript
// ダークモードに対応しない
<div className="bg-white text-gray-900 border-gray-200">
  <p className="text-gray-600">テキスト</p>
</div>
```

#### ✅ 良い例（CSS Variables使用）
```typescript
// 自動でダークモードに対応
<div 
  className="transition-colors duration-200"
  style={{ 
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    border: `1px solid var(--color-border-primary)`
  }}
>
  <p style={{ color: 'var(--color-text-secondary)' }}>
    テキスト
  </p>
</div>
```

## 2.3 言語機能の実装

### 2.3.1 翻訳データファイルの作成

#### Step 1: JSONファイル作成
新しいセクション用の翻訳ファイルを作成します。

```json
// src/data/translations/[section-name].json
{
  "en": {
    "title": "Section Title",
    "subtitle": "Section subtitle or description",
    "items": {
      "item1": "First item",
      "item2": "Second item"
    },
    "buttons": {
      "primary": "PRIMARY_ACTION()",
      "secondary": "SECONDARY_ACTION()"
    }
  },
  "ja": {
    "title": "セクションタイトル",
    "subtitle": "セクションの説明文",
    "items": {
      "item1": "最初の項目",
      "item2": "2番目の項目"
    },
    "buttons": {
      "primary": "主要アクション()",
      "secondary": "セカンダリアクション()"
    }
  }
}
```

### 2.3.2 コンポーネントでの使用

#### Step 1: Hook のインポートと初期化
```typescript
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect } from 'react';

export function YourNewSection() {
  const { t, loadTranslations } = useLanguage();

  // コンポーネントマウント時に翻訳データをロード
  useEffect(() => {
    loadTranslations('your-section-name'); // JSONファイル名（拡張子なし）
  }, [loadTranslations]);

  return (
    <section>
      {/* 翻訳されたコンテンツ */}
    </section>
  );
}
```

#### Step 2: 翻訳テキストの使用
```typescript
export function YourNewSection() {
  const { t, loadTranslations } = useLanguage();

  useEffect(() => {
    loadTranslations('your-section-name');
  }, [loadTranslations]);

  return (
    <section>
      {/* 基本的な翻訳 */}
      <h2>{t('your-section-name', 'title')}</h2>
      <p>{t('your-section-name', 'subtitle')}</p>
      
      {/* ネストされたキーの翻訳 */}
      <ul>
        <li>{t('your-section-name', 'items.item1')}</li>
        <li>{t('your-section-name', 'items.item2')}</li>
      </ul>
      
      {/* ボタンでの使用 */}
      <button>
        {t('your-section-name', 'buttons.primary')}
      </button>
    </section>
  );
}
```

### 2.3.3 翻訳関数の使用パターン

#### 基本使用法
```typescript
// t(セクション名, キー)
t('hero', 'title')              // 'Hero Title' または 'ヒーロータイトル'
t('projects', 'buttons.view')   // 'VIEW_PROJECTS()' または 'プロジェクト表示()'
```

#### 配列データの処理
```typescript
// JSONファイル内で配列的なデータを扱う場合
const items = [
  { key: 'skill1', label: t('expertise', 'skills.backend') },
  { key: 'skill2', label: t('expertise', 'skills.frontend') },
  { key: 'skill3', label: t('expertise', 'skills.database') }
];

return (
  <div>
    {items.map(item => (
      <div key={item.key}>{item.label}</div>
    ))}
  </div>
);
```

## 2.4 完全実装例

### 2.4.1 新しいセクションの完全実装

####翻訳ファイル: `src/data/translations/about.json`
```json
{
  "en": {
    "title": "ABOUT_ME",
    "subtitle": "Professional background and journey",
    "content": {
      "intro": "I am a passionate Full-Stack AI Engineer...",
      "experience": "With over 2 years of experience...",
      "mission": "My mission is to bridge the gap between..."
    },
    "stats": {
      "projects": "Projects Completed",
      "clients": "Clients Served",
      "technologies": "Technologies Mastered"
    },
    "cta": "LEARN_MORE()"
  },
  "ja": {
    "title": "私について",
    "subtitle": "プロフェッショナルな経歴と歩み",
    "content": {
      "intro": "私は情熱的なフルスタックAIエンジニアです...",
      "experience": "2年以上の経験を持ち...",
      "mission": "私の使命は..."
    },
    "stats": {
      "projects": "完了プロジェクト",
      "clients": "顧客対応",
      "technologies": "習得技術"
    },
    "cta": "詳細を見る()"
  }
}
```

#### コンポーネント: `src/components/feature/lp/AboutSection.tsx`
```typescript
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect } from 'react';

export function AboutSection() {
  const { t, loadTranslations } = useLanguage();

  useEffect(() => {
    loadTranslations('about');
  }, [loadTranslations]);

  return (
    <section 
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-0">
          {/* Section header */}
          <div 
            className="col-span-3 px-8"
            style={{ borderRight: `1px solid var(--color-border-secondary)` }}
          >
            <div className="sticky top-8">
              <div 
                className="font-mono font-black text-2xl mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                01.
              </div>
              <h2 
                className="font-mono font-black text-xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {t('about', 'title')}
              </h2>
              <div 
                className="font-mono text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>// {t('about', 'subtitle')}</div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="col-span-9 px-8">
            <div className="space-y-6">
              {/* Text content */}
              <div className="space-y-4">
                <p 
                  className="font-mono text-lg leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t('about', 'content.intro')}
                </p>
                <p 
                  className="font-mono text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {t('about', 'content.experience')}
                </p>
              </div>
              
              {/* Stats */}
              <div 
                className="border transition-colors duration-200 mt-8"
                style={{ borderColor: 'var(--color-border-primary)' }}
              >
                <div 
                  className="px-4 py-2 border-b transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-primary)'
                  }}
                >
                  <div 
                    className="font-mono text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    stats.overview
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4">
                  {[
                    { label: t('about', 'stats.projects'), value: '15+' },
                    { label: t('about', 'stats.clients'), value: '8' },
                    { label: t('about', 'stats.technologies'), value: '20+' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="font-mono text-2xl font-bold"
                        style={{ color: 'var(--color-accent-green)' }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="font-mono text-xs mt-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="pt-6">
                <button 
                  className="font-mono font-bold text-sm px-8 py-3 transition-all duration-200"
                  style={{ 
                    border: `1px solid var(--color-text-primary)`,
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
                    e.currentTarget.style.color = 'var(--color-bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  {t('about', 'cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-0">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index} 
                className="h-full"
                style={{ 
                  borderRight: index < 11 ? `1px solid var(--color-border-primary)` : 'none',
                  opacity: 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## 2.5 チェックリスト

### 新しいセクション実装時のチェックリスト

#### ✅ テーマ機能
- [ ] CSS Variables を使用している（`var(--color-*)`）
- [ ] `transition-colors duration-200` クラスを追加している
- [ ] 背景、テキスト、ボーダーすべてにCSS Variablesを適用している
- [ ] ホバー効果も CSS Variables を使用している

#### ✅ 言語機能
- [ ] 翻訳JSONファイルを作成している
- [ ] `useLanguage` hook をインポートしている  
- [ ] `useEffect` で `loadTranslations()` を呼んでいる
- [ ] すべてのテキストで `t()` 関数を使用している
- [ ] ネストされたキーの記法（`key.subkey`）を正しく使用している

#### ✅ コード品質
- [ ] TypeScript の型エラーがない
- [ ] セクション名が一意である
- [ ] 翻訳キーが一貫している
- [ ] アクセシビリティを考慮している

## 2.6 トラブルシューティング

### よくある問題と解決方法

#### 問題1: テーマが適用されない
**症状**: ダークモードに切り替えても色が変わらない

**解決方法**:
```typescript
// ❌ 悪い例
<div className="bg-white text-black">

// ✅ 良い例  
<div style={{ 
  backgroundColor: 'var(--color-bg-primary)',
  color: 'var(--color-text-primary)'
}}>
```

#### 問題2: 翻訳が表示されない
**症状**: `t()` 関数がキー名をそのまま返す

**原因と解決方法**:
1. **JSONファイル名の確認**
   ```typescript
   // ファイル: about.json
   loadTranslations('about'); // ✅ 正しい
   loadTranslations('about.json'); // ❌ 拡張子不要
   ```

2. **翻訳キーの確認**
   ```typescript
   // JSON: { "en": { "title": "Title" } }
   t('about', 'title'); // ✅ 正しい
   t('about', 'Title'); // ❌ 大文字小文字が違う
   ```

3. **useEffect の依存関係**
   ```typescript
   useEffect(() => {
     loadTranslations('about');
   }, [loadTranslations]); // ✅ 依存関係を含める
   ```

#### 問題3: 初期読み込みで翻訳が遅れる
**症状**: コンポーネント初期表示時に翻訳キーが一瞬表示される

**解決方法**: 条件分岐を使用
```typescript
const { t, loadTranslations, language } = useLanguage();
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  loadTranslations('about').then(() => {
    setIsLoaded(true);
  });
}, [loadTranslations]);

if (!isLoaded) {
  return <div>Loading...</div>; // または skeleton UI
}

return (
  <section>
    <h2>{t('about', 'title')}</h2>
  </section>
);
```

## 2.7 応用例

### 2.7.1 動的コンテンツの翻訳

プロジェクトリストなど、動的なデータの翻訳：

```typescript
// translations/projects.json
{
  "en": {
    "projects": {
      "project1": {
        "title": "AI Chatbot Platform",
        "description": "Advanced AI chatbot with ML capabilities"
      },
      "project2": {
        "title": "E-commerce Dashboard", 
        "description": "Real-time analytics dashboard"
      }
    }
  },
  "ja": {
    "projects": {
      "project1": {
        "title": "AIチャットボットプラットフォーム",
        "description": "ML機能を持つ高度なAIチャットボット"
      },
      "project2": {
        "title": "Eコマースダッシュボード",
        "description": "リアルタイム分析ダッシュボード"
      }
    }
  }
}

// コンポーネント内
const projectIds = ['project1', 'project2'];

return (
  <div>
    {projectIds.map(id => (
      <div key={id}>
        <h3>{t('projects', `projects.${id}.title`)}</h3>
        <p>{t('projects', `projects.${id}.description`)}</p>
      </div>
    ))}
  </div>
);
```

### 2.7.2 条件付き翻訳

状態に応じた翻訳の切り替え：

```typescript
// translations/contact.json
{
  "en": {
    "status": {
      "available": "AVAILABLE",
      "busy": "BUSY", 
      "offline": "OFFLINE"
    }
  },
  "ja": {
    "status": {
      "available": "対応可能",
      "busy": "多忙",
      "offline": "オフライン"
    }
  }
}

// コンポーネント内
const [currentStatus, setCurrentStatus] = useState<'available' | 'busy' | 'offline'>('available');

return (
  <div>
    <span>{t('contact', `status.${currentStatus}`)}</span>
  </div>
);
```

---

*このガイドを参考に、一貫したテーマ対応と多言語対応を持つ高品質なコンポーネントを効率的に開発できます。*