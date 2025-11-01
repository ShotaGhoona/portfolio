'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CSSProperties, LabelHTMLAttributes } from 'react';

interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
  htmlFor?: string;
}

export function Label({ en, ja, className, style, htmlFor, ...props }: LabelProps) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <label className={className} style={style} htmlFor={htmlFor} {...props}>
      {text}
    </label>
  );
}
