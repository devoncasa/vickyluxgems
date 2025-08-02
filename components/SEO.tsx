
import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { translations as enTranslations } from '../i18n/translations/en';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  titleKey?: keyof typeof enTranslations;
  descriptionKey?: keyof typeof enTranslations;
  keywordsKey?: keyof typeof enTranslations;
  imageUrl?: string;
  type?: 'website' | 'article' | 'product';
}

const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
    let element = document.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement;
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', value);
};

const removeMetaTag = (attr: 'name' | 'property', key: string) => {
    const element = document.querySelector(`meta[${attr}='${key}']`);
    if (element) {
        element.remove();
    }
};

const setOrRemoveLinkTag = (rel: string, href: string | null) => {
    const selector = `link[rel="${rel}"]`;
    let element = document.querySelector(selector) as HTMLLinkElement;

    if (href) {
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            document.head.appendChild(element);
        }
        element.setAttribute('href', href);
    } else if (element) {
        element.remove();
    }
};


const SEO: React.FC<SEOProps> = ({ 
    title: rawTitle, 
    description: rawDescription, 
    keywords: rawKeywords,
    titleKey, 
    descriptionKey,
    keywordsKey,
    imageUrl, 
    type = 'website' 
}) => {
  const { t, lang } = useLanguage();
  const location = ReactRouterDOM.useLocation();

  const title = rawTitle || (titleKey ? t(titleKey) as string : 'Vicky LuxGems');
  const description = rawDescription || (descriptionKey ? t(descriptionKey) as string : 'Authentic Burmese amber and precious gems.');
  const keywords = rawKeywords || (keywordsKey ? t(keywordsKey) as string : '');

  useEffect(() => {
    // 1. Basic Meta
    document.title = title;
    setMetaTag('name', 'description', description);
    
    // Keywords & Robots meta tag
    if (keywords) {
        if (keywords.includes('noindex')) {
            setMetaTag('name', 'robots', 'noindex, nofollow');
            removeMetaTag('name', 'keywords');
        } else {
            setMetaTag('name', 'keywords', keywords);
            removeMetaTag('name', 'robots');
        }
    } else {
        removeMetaTag('name', 'keywords');
        removeMetaTag('name', 'robots');
    }

    // Note: HTML lang/dir attributes are handled by the LanguageContext provider.

    // 3. Canonical URL
    const canonicalUrl = `${window.location.origin}${window.location.pathname}#${location.pathname}`;
    setOrRemoveLinkTag('canonical', canonicalUrl);
    
    // 4. Hreflang links removed (correct for this app's architecture)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    
    // 5. Open Graph & Twitter Cards
    const ogImage = imageUrl || 'https://i.postimg.cc/Qd8yW639/vkambergems-logo-small.png';
    const ogLocales = {
        en: 'en_US',
        th: 'th_TH'
    };
    
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Vicky LuxGems');
    setMetaTag('property', 'og:locale', ogLocales[lang]);

    // 6. alternate locales for OG tags removed
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(tag => tag.remove());
    
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

  }, [title, description, keywords, location.pathname, imageUrl, type, t, lang]);

  return null;
};

export default SEO;