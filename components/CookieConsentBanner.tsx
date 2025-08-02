import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// Define gtag on the window object for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const CookieConsentBanner: React.FC = () => {
    const { t, lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show banner if no choice has been made.
        if (localStorage.getItem('cookie_consent') === null) {
            setIsVisible(true);
        }
    }, []);

    const handleConsent = (consent: 'accepted' | 'declined') => {
        localStorage.setItem('cookie_consent', consent);
        setIsVisible(false);
        
        if (consent === 'accepted') {
            if (typeof window.gtag === 'function') {
                window.gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted',
                    'functionality_storage': 'granted',
                    'personalization_storage': 'granted'
                });
            }
        }
    };

    if (!isVisible) {
        return null;
    }
    
    const privacyPolicyPath = `/#/${lang}/policies/privacy`;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--c-surface)]/95 backdrop-blur-sm border-t border-[var(--c-border)] p-4 shadow-lg z-50 transition-opacity duration-300" role="dialog" aria-labelledby="cookie-consent-title">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-[var(--c-text-primary)] text-center sm:text-left">
                    <h2 id="cookie-consent-title" className="font-semibold text-base">{t('cookie_title' as any)}</h2>
                    <p className="mt-1">{t('cookie_description' as any)} <a href={privacyPolicyPath} className="text-[var(--c-accent-primary)] hover:underline font-semibold">{t('cookie_learn_more' as any)}</a></p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                    <button onClick={() => handleConsent('declined')} className="text-sm font-semibold text-[var(--c-text-secondary)] hover:text-[var(--c-heading)] px-4 py-2 rounded-md">
                        {t('cookie_decline' as any)}
                    </button>
                    <button onClick={() => handleConsent('accepted')} className="btn-primary btn--compact">
                        {t('cookie_accept' as any)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;