'use client';

import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeText = () => {
    switch (theme) {
      case 'light':
        return 'THEME_LIGHT()';
      case 'dark':
        return 'THEME_DARK()';
      case 'system':
        return 'THEME_SYSTEM()';
      default:
        return 'THEME_LIGHT()';
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="font-mono text-xs transition-colors duration-200 hover:opacity-70"
      style={{ 
        color: 'var(--color-text-secondary)',
      }}
      aria-label={`Current theme: ${theme}. Click to cycle through themes.`}
      title={`Current: ${theme.toUpperCase()} theme`}
    >
      {getThemeText()}
    </button>
  );
}