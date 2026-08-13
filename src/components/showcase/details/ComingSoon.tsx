'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import type { ShowcaseDetailProps } from '../registry';

export default function ShowcaseComingSoon({ item }: ShowcaseDetailProps) {
  const { language } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 font-mono px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="text-xs tracking-[0.3em]" style={{ color: 'var(--color-text-tertiary)' }}>
        {item.category.toUpperCase()} / {item.id}
      </div>
      <h1
        className="text-3xl md:text-5xl font-black"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {language === 'ja' ? '準備中' : 'Coming soon'}
      </h1>
      <p className="text-sm max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
        {language === 'ja'
          ? 'このショーケースは現在制作中です。近日公開予定。'
          : 'This showcase is still in the works. Check back soon.'}
      </p>
      <Link
        href="/showcase"
        className="text-sm hover:opacity-70 transition-opacity"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        ← {language === 'ja' ? 'ショーケース一覧へ' : 'Back to Showcase'}
      </Link>
    </div>
  );
}
