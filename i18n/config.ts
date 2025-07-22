
export const languages = {
    en: { name: 'English', direction: 'ltr' },
} as const;

export const DEFAULT_LANG = 'en';

export type LanguageCode = keyof typeof languages;
