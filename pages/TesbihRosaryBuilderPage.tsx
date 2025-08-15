
import React from 'react';
import { useLocation } from 'react-router-dom';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import SectionDivider from '../components/SectionDivider.tsx';
import TesbihRosaryBuilder from '../components/TesbihRosaryBuilder.tsx';

const TesbihRosaryBuilderPage: React.FC = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const defaultTradition = location.state?.defaultTradition || 'Tesbih';

    return (
        <div 
            className="page-container-with-bg min-h-screen py-16 md:py-20"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[20]}')` }}
        >
            <SEO 
                titleKey="seo_tesbih_rosary_builder_title"
                descriptionKey="seo_tesbih_rosary_builder_desc"
                keywordsKey="seo_tesbih_rosary_builder_keywords"
                imageUrl="https://placehold.co/1200x675/8A5E3C/FFFFFF?text=Custom+Prayer+Beads"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold tracking-tight">{t('tesbih_rosary_builder_page_title')}</h1>
                    <p className="mt-4 text-xl text-[var(--c-text-secondary)] max-w-3xl mx-auto">
                        {t('tesbih_rosary_builder_page_subtitle')}
                    </p>
                    <SectionDivider />
                </div>

                <div className="max-w-7xl mx-auto bg-[var(--c-surface)] p-6 md:p-10 rounded-lg shadow-lg border border-[var(--c-border)]">
                    <TesbihRosaryBuilder defaultTradition={defaultTradition} />
                </div>
            </div>
        </div>
    );
};

export default TesbihRosaryBuilderPage;
