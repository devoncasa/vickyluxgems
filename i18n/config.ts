export const languages = {
    en: { name: 'English', direction: 'ltr' },
    th: { name: 'ภาษาไทย', direction: 'ltr' },
} as const;

export const DEFAULT_LANG = 'th';

export type LanguageCode = keyof typeof languages;