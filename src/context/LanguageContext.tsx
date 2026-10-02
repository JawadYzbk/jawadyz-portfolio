'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import en from '@/translations/en.json';
import ar from '@/translations/ar.json';
import { LANGUAGE_COOKIE, savePreference, type Language } from '@/lib/preferences';

type Translations = typeof en;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  isRTL: boolean;
};

const dictionaries: Record<Language, Translations> = { en, ar };

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language;
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    savePreference(LANGUAGE_COOKIE, next);
    const root = document.documentElement;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, t: dictionaries[language], isRTL: language === 'ar' }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {/* Only the animation features the page uses are bundled. */}
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

/** Replace `{name}` placeholders in a dictionary string. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
