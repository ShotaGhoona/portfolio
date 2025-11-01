'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface H3Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function H3({ en, ja, className, style, ...props }: H3Props) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <h3 className={className} style={style} {...props}>
      {text}
    </h3>
  );
}
