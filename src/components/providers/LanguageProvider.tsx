'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ja';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
  loadTranslations: (section: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, unknown> = {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');
  const [isInitialized, setIsInitialized] = useState(false);

  // Get system language preference
  const getSystemLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('ja') ? 'ja' : 'en';
    }
    return 'en';
  };

  // Apply language to DOM
  const applyLanguage = (lang: Language) => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Load translations for a specific section
  const loadTranslations = async (section: string): Promise<void> => {
    const cacheKey = section;
    if (translations[cacheKey]) {
      return;
    }
    
    try {
      const translation = await import(`@/data/translations/${section}.json`);
      translations[cacheKey] = translation.default;
    } catch {
      console.warn(`Translation file not found: ${section}.json`);
      translations[cacheKey] = {};
    }
  };

  // Handle language change
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    applyLanguage(newLanguage);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  // Translation function
  const t = (section: string, key: string): string => {
    const sectionData = translations[section]?.[language];
    
    if (!sectionData) {
      // Return key as fallback if translation not loaded
      return key;
    }
    
    // Navigate nested keys (e.g., "buttons.viewProjects")
    const keys = key.split('.');
    let value = sectionData;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      // Get saved language or default to system language
      const savedLanguage = (typeof window !== 'undefined' ? localStorage.getItem('language') : null) as Language | null;
      const initialLanguage = savedLanguage || getSystemLanguage();
      
      setLanguageState(initialLanguage);
      applyLanguage(initialLanguage);
      
      // Preload hero translations immediately and wait for completion
      await loadTranslations('hero');
      setIsInitialized(true);
    };
    
    initializeLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loadTranslations }}>
      {isInitialized ? children : null}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}