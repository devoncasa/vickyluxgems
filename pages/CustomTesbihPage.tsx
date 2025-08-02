

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import SectionDivider from '../components/SectionDivider';
import { BACKGROUND_IMAGES, TESBIH_ROSARY_MATERIALS } from '../constants';
import SEO from '../components/SEO';
import { useLanguage } from '../i18n/LanguageContext';

const CustomTesbihPage: React.FC = () => {
    const { t } = useLanguage();
    
    const exampleMaterials = TESBIH_ROSARY_MATERIALS.filter(m => ['agarwood', 'jade', 'lapis_lazuli', 'burmese_amber'].includes(m.id));

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[6]}')`}}
        >
            <SEO 
                titleKey="home_custom_tesbih_title"
                descriptionKey="home_custom_tesbih_desc"
                keywordsKey="seo_custom_tesbih_keywords"
                imageUrl="https://placehold.co/1200x675/5C3A21/FFFFFF?text=Custom+Tesbih"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight">{t('custom_tesbih_title')}</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">{t('custom_tesbih_subtitle')}</p>
                    </div>

                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
                        <p className="lead">{t('custom_tesbih_intro')}</p>
                        
                        <h2>{t('custom_tesbih_history_title')}</h2>
                        <SectionDivider />
                        <p>{t('custom_tesbih_history_p1')}</p>
                        <p>{t('custom_tesbih_history_p2')}</p>

                        <h2>{t('custom_tesbih_materials_title')}</h2>
                        <SectionDivider />
                        <p>{t('custom_tesbih_materials_p1')}</p>
                        
                        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                            {exampleMaterials.map(material => (
                                <div key={material.id} className="text-center">
                                    <img src={material.imageUrl} alt={t(material.name as any)} className="w-24 h-24 rounded-full mx-auto object-cover shadow-md border-2 border-white" />
                                    <h3 className="mt-2 font-semibold text-base">{t(material.name as any)}</h3>
                                </div>
                            ))}
                        </div>
                        <p>{t('custom_tesbih_materials_p2')}</p>

                        <div className="not-prose text-center mt-16 bg-[var(--c-surface)] p-8 rounded-lg shadow-lg border border-[var(--c-border)]">
                             <h2 className="text-3xl md:text-4xl font-bold text-[var(--c-heading)]">{t('custom_tesbih_cta_title')}</h2>
                             <p className="text-lg text-[var(--c-text-secondary)] max-w-2xl mx-auto mt-4">
                               {t('custom_tesbih_cta_subtitle')}
                             </p>
                             <ReactRouterDOM.Link to="/tesbih-rosary-builder" state={{ defaultTradition: 'Tesbih' }} className="mt-8 inline-block btn-primary btn--intelligent text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg">
                                {t('custom_tesbih_cta_button')}
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTesbihPage;