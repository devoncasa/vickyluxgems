
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const get = (obj: object, path: string, defaultValue: any): any => {
    if (!obj) return defaultValue;
    const keys = path.split('.');
    let result: any = obj;
    for (const key of keys) {
        if (result === undefined || result === null || typeof result !== 'object') {
            return defaultValue;
        }
        result = result[key];
    }
    return result === undefined ? defaultValue : result;
};

export const useTranslations = () => {
  const { language, translations, isLoading } = useContext(LanguageContext);

  const t = (key: string, replacements?: { [key: string]: string | number }): any => {
    if (isLoading || !translations) {
      return ''; 
    }

    const langTranslations = translations[language] || translations.en;
    let translation = get(langTranslations, key, undefined);

    if (translation === undefined) {
        translation = get(translations.en, key, key);
    }

    if (typeof translation === 'object' && translation !== null) {
        return translation;
    }

    let text = String(translation);

    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        const regex = new RegExp(`\\$\\{${rKey}\\}`, 'g');
        text = text.replace(regex, String(replacements[rKey]));
      });
    }

    return text;
  };

  return { t, isLoading };
};
