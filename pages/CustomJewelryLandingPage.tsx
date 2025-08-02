
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

const CustomJewelryLandingPage: React.FC = () => {
    const { t } = useLanguage();
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

    const options = [
        {
            id: 'juzu',
            titleKey: "custom_landing_juzu_title",
            descriptionKey: "custom_landing_juzu_desc",
            backContentKey: "custom_card_back_juzu_full",
            link: "/prayer-bead-builder/Juzu",
            imageUrl: "https://i.postimg.cc/xCz9v67F/Juzu-beads.webp"
        },
        {
            id: 'tesbih',
            titleKey: "custom_landing_tesbih_title",
            descriptionKey: "custom_landing_tesbih_desc",
            backContentKey: "custom_card_back_tesbih_full",
            link: "/prayer-bead-builder/Tesbih",
            imageUrl: "https://i.postimg.cc/8zZkNJMw/Tesbih.webp"
        },
        {
            id: 'rosary',
            titleKey: "custom_landing_rosary_title",
            descriptionKey: "custom_landing_rosary_desc",
            backContentKey: "custom_card_back_rosary_full",
            link: "/custom-rosary-configurator",
            imageUrl: "https://i.postimg.cc/43nfdf1G/Rosary.webp"
        },
        {
            id: 'mala',
            titleKey: "custom_landing_amber_title",
            descriptionKey: "custom_landing_amber_desc",
            backContentKey: "custom_card_back_mala_full",
            link: "/build-your-set",
            imageUrl: "https://i.postimg.cc/bvMzS76t/amber-beads.webp"
        }
    ];

    const handleCardInteraction = (id: string, isEntering: boolean) => {
        if (window.innerWidth > 1023) { // Desktop hover
            setFlippedCardId(isEntering ? id : null);
        }
    };
    
    const handleCardClick = (id: string) => {
        setFlippedCardId(prevId => (prevId === id ? null : id));
    };

    return (
        <div
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[9]}')` }}
        >
            <SEO
                title={t('custom_landing_page_title' as any)}
                description={t('custom_landing_page_subtitle' as any)}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 dark-context">
                    <h1 className="text-5xl font-bold tracking-tight">{t('custom_landing_page_title' as any)}</h1>
                    <p className="mt-4 text-xl max-w-3xl mx-auto">
                        {t('custom_landing_page_subtitle' as any)}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flipping-card ${flippedCardId === option.id ? 'is-flipped' : ''}`}
                            onMouseEnter={() => handleCardInteraction(option.id, true)}
                            onMouseLeave={() => handleCardInteraction(option.id, false)}
                            onClick={() => handleCardClick(option.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Learn more about ${t(option.titleKey as any)}`}
                        >
                            <div className="flipping-card-inner relative aspect-[4/3]">
                                {/* Front of Card */}
                                <div className="flipping-card-front w-full h-full">
                                    <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden group">
                                        <img src={option.imageUrl} alt={`An image representing ${t(option.titleKey as any)}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 dark-context">
                                            <h3 className="text-3xl font-bold font-serif">{t(option.titleKey as any)}</h3>
                                            <p className="mt-2 text-sm">{t(option.descriptionKey as any)}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Back of Card */}
                                <div className="flipping-card-back w-full h-full shadow-2xl dark-context">
                                    <div>
                                        <p className="text-sm leading-relaxed">{t(option.backContentKey as any)}</p>
                                        <ReactRouterDOM.Link
                                            to={option.link}
                                            className="mt-6 inline-block font-semibold border-b-2 border-white/50 hover:border-white transition-colors pb-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {t('custom_landing_cta' as any)}
                                        </ReactRouterDOM.Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomJewelryLandingPage;
