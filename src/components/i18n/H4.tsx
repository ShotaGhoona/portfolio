'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface H4Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function H4({ en, ja, className, style, ...props }: H4Props) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <h4 className={className} style={style} {...props}>
      {text}
    </h4>
  );
}
