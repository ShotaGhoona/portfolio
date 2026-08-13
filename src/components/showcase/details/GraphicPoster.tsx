'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import type { ShowcaseDetailProps } from '../registry';

// Shared layout for every graphic poster — editorial spread. Oversized type on
// the left, artwork on the right, thin rules and index numbers. Off-white
// magazine feel. Fully driven by the `item` data.
export default function GraphicPoster({ item }: ShowcaseDetailProps) {
  const { language } = useLanguage();
  const title = item.title[language] ?? item.title.en;
  const subtitle = item.subtitle[language] ?? item.subtitle.en;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]">
      <div className="px-6 md:px-10 py-6 flex items-center justify-between font-mono text-sm border-b border-[color:var(--color-border-primary)]">
        <Link href="/showcase" className="hover:opacity-60 transition-opacity">
          ← Showcase
        </Link>
        <span className="tracking-[0.3em] text-[var(--color-text-tertiary)]">GRAPHIC — No.{item.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
        {/* Left — typography */}
        <div className="px-6 md:px-10 py-12 md:py-16 flex flex-col justify-between md:border-r border-[color:var(--color-border-primary)]">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-[var(--color-text-tertiary)] mb-6">
              {subtitle}
            </div>
            <h1 className="font-mono font-black leading-[0.95] tracking-tight text-5xl md:text-7xl">
              {title}
            </h1>
          </div>
          <div className="mt-12 font-mono text-sm text-[var(--color-text-secondary)]">
            <div className="border-t border-[color:var(--color-border-primary)] pt-4 flex justify-between">
              <span>{language === 'ja' ? '制作' : 'Made with'}</span>
              <span>Adobe Illustrator</span>
            </div>
            <div className="border-t border-[color:var(--color-border-primary)] pt-4 mt-4 flex justify-between">
              <span>{language === 'ja' ? '日付' : 'Date'}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>

        {/* Right — artwork */}
        <div className="bg-[var(--color-bg-tertiary)] flex items-center justify-center p-8 md:p-12 min-h-[60vh]">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={title}
              className="max-h-[72vh] w-auto object-contain shadow-[0_40px_90px_-50px_rgba(0,0,0,0.6)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
