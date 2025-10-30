'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface H2Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function H2({ en, ja, className, style, ...props }: H2Props) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <h2 className={className} style={style} {...props}>
      {text}
    </h2>
  );
}
