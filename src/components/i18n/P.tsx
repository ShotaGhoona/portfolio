'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface PProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function P({ en, ja, className, style, ...props }: PProps) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <p className={className} style={style} {...props}>
      {text}
    </p>
  );
}
