'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface SpanProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function Span({ en, ja, className, style, ...props }: SpanProps) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <span className={className} style={style} {...props}>
      {text}
    </span>
  );
}
