'use client';

import { useLanguage } from '@/hooks/useLanguage';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const getLanguageText = () => {
    return `LANG_${language.toUpperCase()}()`;
  };

  return (
    <button
      onClick={handleToggle}
      className="font-mono text-xs transition-colors duration-200 hover:opacity-70"
      style={{ 
        color: 'var(--color-text-secondary)',
      }}
      aria-label={`Current language: ${language === 'en' ? 'English' : 'Japanese'}. Click to switch.`}
      title={`Current: ${language === 'en' ? 'English' : 'Japanese'} language`}
    >
      {getLanguageText()}
    </button>
  );
}