'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { ButtonHTMLAttributes, CSSProperties } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  en: string;
  ja: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({ en, ja, className, style, onClick, type = 'button', disabled, ...props }: ButtonProps) {
  const { language } = useLanguage();
  const text = language === 'ja' ? ja : en;

  return (
    <button
      className={className}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
}
