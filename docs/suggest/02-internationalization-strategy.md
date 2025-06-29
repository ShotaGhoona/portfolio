# 02. 日本語・英語切り替え機能（軽量実装）戦略

## 2.1 現状分析

### 現在の実装状況
- **言語**: 英語ベースのテンプレート使用
- **アーキテクチャ**: 1枚のLP（Single Page Application）
- **テーマ機能**: 既にダークモード実装済み（参考にできる実装パターン）
- **コンテンツ**: 部分的に実際のプロフィール情報（Shota Yamashita）含有
- **多言語対応**: 未実装

### 課題点
- **ハードコードされたテキスト**: 全コンポーネントに英語テキストが直接記述
- **架空データ混在**: 一部サンプルデータが残存
- **言語切り替え機能なし**: UI・ロジック共に未実装
- **複雑な国際化不要**: シンプルな1枚LP用の軽量ソリューションが最適

## 2.2 実装戦略（軽量アプローチ）

### 2.2.1 技術アプローチ - シンプルJSON + カスタムフック

#### A. 翻訳データ管理（推奨）
```json
// src/data/translations.json
{
  "en": {
    "navigation": {
      "about": "about",
      "projects": "projects",
      "skills": "skills", 
      "contact": "contact"
    },
    "hero": {
      "role": "Entrepreneur & Full-Stack AI Engineer",
      "specialization": "Specializing in AI",
      "location": "Kyoto, Japan",
      "biography": "From Kyoto to India to the world of AI...",
      "viewProjects": "VIEW_PROJECTS()",
      "downloadCV": "DOWNLOAD_CV()"
    }
  },
  "ja": {
    "navigation": {
      "about": "概要",
      "projects": "プロジェクト", 
      "skills": "スキル",
      "contact": "連絡先"
    },
    "hero": {
      "role": "起業家・フルスタックAIエンジニア",
      "specialization": "AI専門",
      "location": "京都、日本", 
      "biography": "京都からインド、そしてAIの世界へ...",
      "viewProjects": "プロジェクト表示()",
      "downloadCV": "履歴書ダウンロード()"
    }
  }
}
```

#### B. カスタムフック（テーマ機能と同様のパターン）
```typescript
// hooks/useLanguage.ts
import { useState, useEffect } from 'react';
import translations from '@/data/translations.json';

type Language = 'en' | 'ja';
type TranslationKey = string;

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ja'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: TranslationKey): string => {
    return key.split('.').reduce((obj, k) => obj?.[k], translations[language]) || key;
  };

  return { language, changeLanguage, t };
};
```

#### C. 言語切り替えコンポーネント
```typescript
// components/common/LanguageToggle.tsx
export const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();
  
  return (
    <button 
      onClick={() => changeLanguage(language === 'en' ? 'ja' : 'en')}
      className="font-mono text-xs transition-colors duration-200"
      style={{ color: 'var(--color-text-secondary)' }}
    >
      LANG_{language.toUpperCase()}()
    </button>
  );
};
```

### 2.2.2 ファイル・ディレクトリ構成（軽量アプローチ）

#### シンプル構成（追加ファイル最小限）
```
src/
├── data/
│   └── translations.json          # 全翻訳データ（英語・日本語）
├── hooks/
│   ├── useTheme.ts                # 既存：テーマ管理
│   └── useLanguage.ts             # 新規：言語管理
├── components/
│   ├── common/
│   │   ├── Header.tsx             # 更新：LanguageToggle追加
│   │   ├── ThemeToggle.tsx        # 既存：テーマ切り替え
│   │   └── LanguageToggle.tsx     # 新規：言語切り替え
│   └── feature/lp/
│       ├── HeroSection.tsx        # 更新：翻訳対応
│       ├── ProjectsSection.tsx    # 更新：翻訳対応
│       ├── ExpertiseSection.tsx   # 更新：翻訳対応
│       └── ContactSection.tsx     # 更新：翻訳対応
└── app/
    ├── layout.tsx                 # 更新：メタデータ多言語対応
    └── page.tsx                   # 既存のまま
```

## 2.3 詳細実装計画（軽量版）

### 2.3.1 実装ステップ（3段階のシンプルプロセス）

#### Step 1: 翻訳データ作成（1日）
1. **translations.json作成**: 全コンテンツの英語・日本語版を1ファイルに集約
2. **実データ更新**: 架空データを実際のShota Yamashitaの情報に置き換え
3. **コンテンツ分類**: UI、プロフィール、プロジェクト、スキル、連絡先の5カテゴリ

#### Step 2: 言語システム実装（1-2日）
1. **useLanguage Hook**: テーマ機能と同様のパターンで実装
2. **LanguageToggle Component**: Header右端に追加
3. **localStorage連携**: 言語設定の永続化
4. **型定義**: TypeScript対応

#### Step 3: コンポーネント更新（2-3日）
1. **Header更新**: ナビゲーションとステータス表示
2. **各セクション更新**: useLanguageとt()関数でテキスト置き換え
3. **メタデータ対応**: layout.tsxのtitle/description
4. **日本語フォント**: 必要に応じてNoto Sans JP追加

### 2.3.2 translations.json構造設計

#### 完全なデータ構造例
```json
{
  "en": {
    "meta": {
      "title": "Shota Yamashita - Full-Stack AI Engineer",
      "description": "Portfolio site of Shota Yamashita, Full-Stack AI Engineer and founder of Ghoona Inc."
    },
    "navigation": {
      "about": "about",
      "projects": "projects",
      "skills": "skills",
      "contact": "contact"
    },
    "status": {
      "available": "AVAILABLE"
    },
    "hero": {
      "role": "Entrepreneur & Full-Stack AI Engineer",
      "specialization": "Specializing in AI",
      "location": "Kyoto, Japan",
      "biography": "From Kyoto to India to the world of AI, my journey has been shaped by curiosity and conviction. I founded Ghoona Inc. to push the limits of what AI and entrepreneurship can achieve together. Full-stack, full-speed — I believe execution is the best form of expression.",
      "focusAreas": {
        "startupCreation": "AI-driven Startup Creation",
        "agentArchitectures": "Agent-based Architectures", 
        "fullstackPrototyping": "Full-stack Prototyping with Next.js & Python"
      },
      "buttons": {
        "viewProjects": "VIEW_PROJECTS()",
        "downloadCV": "DOWNLOAD_CV()"
      }
    },
    "projects": {
      "sectionTitle": "SELECTED_PROJECTS",
      "subtitle": "Showcasing technical depth and problem-solving approach",
      "buttons": {
        "viewCode": "VIEW_CODE()",
        "technicalDetails": "TECHNICAL_DETAILS()",
        "viewAll": "VIEW_ALL_PROJECTS()"
      }
    }
  },
  "ja": {
    "meta": {
      "title": "山下翔太 - フルスタックAIエンジニア",
      "description": "Ghoona Inc.創業者、フルスタックAIエンジニア山下翔太のポートフォリオサイト"
    },
    "navigation": {
      "about": "概要",
      "projects": "プロジェクト",
      "skills": "スキル",
      "contact": "連絡先"
    },
    "status": {
      "available": "対応可能"
    },
    "hero": {
      "role": "起業家・フルスタックAIエンジニア",
      "specialization": "AI専門",
      "location": "京都、日本",
      "biography": "京都からインド、そしてAIの世界へ。好奇心と信念に導かれた私の歩み。Ghoona Inc.を設立し、AIと起業の可能性を追求しています。フルスタック、フルスピード — 実行こそが最高の表現だと信じています。",
      "focusAreas": {
        "startupCreation": "AI駆動のスタートアップ創造",
        "agentArchitectures": "エージェントベースアーキテクチャ",
        "fullstackPrototyping": "Next.js & Pythonによるフルスタックプロトタイピング"
      },
      "buttons": {
        "viewProjects": "プロジェクト表示()",
        "downloadCV": "履歴書ダウンロード()"
      }
    },
    "projects": {
      "sectionTitle": "選抜プロジェクト",
      "subtitle": "技術的深度と問題解決アプローチを紹介",
      "buttons": {
        "viewCode": "コード表示()",
        "technicalDetails": "技術詳細()",
        "viewAll": "全プロジェクト表示()"
      }
    }
  }
}
```

### 2.3.3 Header統合（ThemeToggleと並列配置）

#### 既存のHeader更新
```typescript
// src/components/common/Header.tsx （更新版）
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

export function Header() {
  const { t } = useLanguage();
  
  return (
    <header>
      {/* ... existing structure ... */}
      
      {/* ナビゲーション更新 */}
      <nav className="flex items-center space-x-8">
        {[
          { label: '[01]', name: t('navigation.about'), active: false },
          { label: '[02]', name: t('navigation.projects'), active: true },
          { label: '[03]', name: t('navigation.skills'), active: false },
          { label: '[04]', name: t('navigation.contact'), active: false }
        ].map((item, index) => (
          // ... existing mapping
        ))}
      </nav>
      
      {/* 右セクション - ステータス & トグルボタン */}
      <div className="col-span-3 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm">
            <span>{t('status.available')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
```

### 2.3.4 コンポーネント使用例

#### HeroSection更新例
```typescript
// src/components/feature/lp/HeroSection.tsx
import { useLanguage } from '@/hooks/useLanguage';

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section>
      {/* 職業説明 */}
      <div>{t('hero.role')}</div>
      
      {/* 専門分野 */}
      <div>{t('hero.specialization')}</div>
      
      {/* 自己紹介文 */}
      <p>{t('hero.biography')}</p>
      
      {/* ボタン */}
      <button>{t('hero.buttons.viewProjects')}</button>
      <button>{t('hero.buttons.downloadCV')}</button>
    </section>
  );
}
```

## 2.4 実装の利点（軽量アプローチ）

### 2.4.1 シンプルさの利点
- **最小限のファイル**: translations.json + useLanguage.ts + LanguageToggle.tsx のみ追加
- **既存構造維持**: 現在のコンポーネント構造をほぼそのまま維持
- **高速実装**: 1週間以内で完了可能
- **保守性**: テーマ機能と同様のパターンで直感的

### 2.4.2 テーマ機能との統合
- **一貫したUI**: ThemeToggleとLanguageToggleが並列配置
- **同様のパターン**: useTheme と useLanguage の統一された設計
- **localStorage活用**: 設定永続化の一貫性

### 2.4.3 TypeScript型安全性
```typescript
// 型定義例
type Language = 'en' | 'ja';
type TranslationKey = keyof typeof translations.en;

interface UseLanguageReturn {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
```

## 2.5 実装スケジュール（軽量版）

### Day 1: データ準備
- [ ] translations.json作成（全コンテンツ）
- [ ] 架空データの実際情報への置き換え

### Day 2-3: システム実装  
- [ ] useLanguage Hook実装
- [ ] LanguageToggle Component作成
- [ ] Header統合（ThemeToggleと並列配置）

### Day 4-5: コンポーネント更新
- [ ] 全セクションでt()関数によるテキスト置き換え
- [ ] layout.tsx メタデータ多言語対応
- [ ] 型定義とTypeScript対応

### Day 6-7: 最終調整
- [ ] 日本語フォント調整（必要に応じて）
- [ ] UI/UX最終確認
- [ ] 全機能テスト

## 2.6 実装後の効果

### 2.6.1 技術的メリット
- **軽量**: 複雑なルーティング不要で高速
- **保守性**: シンプルなJSON管理で運用が容易
- **拡張性**: 将来的に他言語追加も簡単
- **一貫性**: テーマ機能と同様のパターン

### 2.6.2 ユーザー体験
- **アクセシビリティ**: 日本語・英語両方の訪問者に対応
- **専門性**: 国際的な開発者としてのブランディング
- **利便性**: ワンクリックでの言語切り替え

### 2.6.3 ビジネス価値  
- **市場拡大**: 日英両市場へのアプローチ
- **信頼性**: 多言語対応による信頼感向上
- **差別化**: 他のポートフォリオとの差別化

## 2.7 重要な注意点

### 2.7.1 コンテンツ品質
- **翻訳精度**: 機械翻訳ではなく自然な表現を重視
- **文化的配慮**: 各言語圏に適した表現の使用
- **ブランド一貫性**: 両言語でのブランドメッセージ統一

### 2.7.2 技術的注意点
- **localStorage対応**: ブラウザ対応と例外処理
- **初期表示**: ブラウザ言語設定に基づく初期言語設定
- **SEO影響**: 現在のSEO評価への影響最小化

---

*この軽量実装により、最小限の工数で最大限の効果を得られる多言語対応を実現できます。*