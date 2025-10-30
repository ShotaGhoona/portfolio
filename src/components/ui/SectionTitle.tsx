'use client';

import { useLanguage } from '@/hooks/useLanguage';

interface SectionTitleProps {
  sectionNumber: string;
  sectionTitle: string | { en: string; ja: string };
  line1: string | { en: string; ja: string };
  line2: string | { en: string; ja: string };
}

export function SectionTitle({ sectionNumber, sectionTitle, line1, line2 }: SectionTitleProps) {
  const { language } = useLanguage();

  const getTranslatedText = (text: string | { en: string; ja: string }) => {
    if (typeof text === 'string') return text;
    return language === 'ja' ? text.ja : text.en;
  };

  return (
    <div
      className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8 md:pb-0 md:border-r"
      style={{ borderColor: 'var(--color-border-secondary)' }}
    >
      <div className="md:sticky md:top-40">
        <div
          className="font-mono font-black text-xl md:text-2xl mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {sectionNumber}
        </div>
        <h2
          className="font-mono font-black text-lg md:text-xl mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {getTranslatedText(sectionTitle)}
        </h2>
        <div
          className="font-mono text-xs mb-6 md:mb-0"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <div>{`// ${getTranslatedText(line1)}`}</div>
          <div>{`// ${getTranslatedText(line2)}`}</div>
        </div>
      </div>
    </div>
  );
}