'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, HTMLAttributes } from 'react';

interface DivProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
}

export function Div({ en, ja, className, style, ...props }: DivProps) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <div className={className} style={style} {...props}>
      {text}
    </div>
  );
}
