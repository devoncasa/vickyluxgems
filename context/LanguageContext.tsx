import React, { createContext, useState, useMemo, useEffect } from 'react';

interface Translations {
  [key: string]: any;
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: { en: Translations; th: Translations } | null;
  isLoading: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'th',
  setLanguage: () => {},
  translations: null,
  isLoading: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('th');
  const [translations, setTranslations] = useState<{ en: Translations; th: Translations } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const [enResponse, thResponse] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/th.json')
        ]);
        if (!enResponse.ok || !thResponse.ok) {
            throw new Error('Failed to fetch translation files');
        }
        const en = await enResponse.json();
        const th = await thResponse.json();
        setTranslations({ en, th });
      } catch (error) {
        console.error("Failed to fetch translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  const value = useMemo(() => ({ language, setLanguage, translations, isLoading }), [language, translations, isLoading]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};