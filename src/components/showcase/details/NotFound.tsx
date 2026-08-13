'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

export default function ShowcaseNotFound() {
  const { language } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 font-mono px-6 text-center"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <h1 className="text-6xl font-black" style={{ color: 'var(--color-text-primary)' }}>
        404
      </h1>
      <p className="text-sm max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
        {language === 'ja'
          ? 'お探しのショーケースは見つかりませんでした。'
          : "That showcase doesn't exist."}
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
