'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface H1Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function H1({ en, ja, className, style, ...props }: H1Props) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <h1 className={className} style={style} {...props}>
      {text}
    </h1>
  );
}
