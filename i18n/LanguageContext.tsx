import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { translations as enTranslations } from './translations/en';
import { translations as thTranslations } from './translations/th';
import { LanguageCode, languages, DEFAULT_LANG } from './config';

// Define a union type for all possible translation keys
type TranslationKey = keyof typeof enTranslations | keyof typeof thTranslations;

const translations = {
    en: enTranslations,
    th: thTranslations,
};

interface LanguageContextType {
    lang: LanguageCode;
    dir: 'ltr' | 'rtl';
    setLang: (lang: LanguageCode) => void;
    t: (key: TranslationKey, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<LanguageCode>('th'); 

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = languages[lang].direction;
    }, [lang]);

    const t = useCallback((key: TranslationKey, replacements?: { [key: string]: string | number }): string => {
        const langTranslations = translations[lang] as Record<TranslationKey, string>;
        const defaultLangTranslations = translations[DEFAULT_LANG] as Record<TranslationKey, string>;

        let translation = langTranslations[key] || defaultLangTranslations[key];

        if (typeof translation !== 'string') {
            // Fallback for keys that might not exist in the current language, preventing crashes.
            // console.warn(`Translation key '${String(key)}' not found in '${lang}' or default language.`);
            return String(key);
        }

        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                translation = translation.replace(new RegExp(`{{${rKey}}}`, 'g'), String(replacements[rKey]));
            });
        }
        
        return translation;
    }, [lang]);

    const value: LanguageContextType = {
        lang,
        dir: languages[lang].direction,
        setLang,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};