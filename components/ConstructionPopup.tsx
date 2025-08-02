import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { LanguageSwitcher } from './Header.tsx';

const ConstructionPopup: React.FC = () => {
    const { t, dir, lang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sessionStorage.getItem('popupDismissed-v2') !== 'true') {
                setIsVisible(true);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('popupDismissed-v2', 'true');
        }, 300);
    };

    const formattedDate = useMemo(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const locale = lang === 'th' ? 'th-TH-u-ca-buddhist' : 'en-US';
        return new Intl.DateTimeFormat(locale, options).format(today);
    }, [lang]);

    if (!isVisible) return null;

    return (
        <div className={`popup-overlay ${isFadingOut ? 'fade-out' : 'fade-in'}`} role="dialog" aria-modal="true" aria-labelledby="popup-title">
            <div className={`popup-modal ${isFadingOut ? 'fade-out' : 'fade-in'}`} dir={dir}>
                 {/* Language Switcher */}
                <div className="absolute top-4 right-4 z-10">
                    <LanguageSwitcher context="popup" />
                </div>

                <div className="text-center pt-10">
                    <h2 id="popup-title" className="popup-title">{t('popup_construction_title')}</h2>
                    <p className="popup-body">{t('popup_construction_body')}</p>
                </div>

                <div className="popup-buttons">
                    <button onClick={handleClose} className="popup-btn popup-btn-primary">{t('popup_construction_btn3')}</button>
                    <a href="https://www.vickyamber.com" target="_blank" rel="noopener noreferrer" className="popup-btn popup-btn-secondary">{t('popup_construction_btn1')}</a>
                    <a href="https://www.facebook.com/vkmmamber" target="_blank" rel="noopener noreferrer" className="popup-btn popup-btn-facebook">{t('popup_construction_btn2')}</a>
                </div>
                <p className="popup-date mt-4">
                    {t('popup_construction_date_label')} {formattedDate}
                </p>
            </div>
        </div>
    );
};

export default ConstructionPopup;