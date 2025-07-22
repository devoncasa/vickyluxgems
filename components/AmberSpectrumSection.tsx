import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionDivider from './SectionDivider';

// Data for the spectrum section
const amberSpectrumContent = [
    {
        id: 'golden_yellow',
        image: 'https://i.postimg.cc/t44s81j2/golden-yellow.webp',
    },
    {
        id: 'honey',
        image: 'https://i.postimg.cc/MZ1fB25b/light_cognac_amber.webp',
    },
    {
        id: 'root',
        image: 'https://i.postimg.cc/hvRJYpDd/root_amber.webp',
    },
    {
        id: 'mila',
        image: 'https://i.postimg.cc/QMG39vnT/mila.webp',
    },
    {
        id: 'red_cherry',
        image: 'https://i.postimg.cc/tC51r3Ls/cherry-red_amber.webp',
    },
    {
        id: 'pigeon_blood_red',
        image: 'https://i.postimg.cc/4NZ7bLFC/pigeon-blood-red.webp'
    },
    {
        id: 'orange',
        image: 'https://i.postimg.cc/W1YdV2pj/orange-amber.webp',
    },
    {
        id: 'black',
        image: 'https://placehold.co/400x400/2A2A2A/FFFFFF?text=Black+Amber',
    }
];


const AmberSpectrumSection: React.FC = () => {
    const { t } = useLanguage();
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedCard(prevId => (prevId === id ? null : id));
    };

    const styles = `
        .amber-spectrum-details {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .amber-spectrum-details.expanded {
            max-height: 500px;
            opacity: 1;
            padding-top: 1rem;
            padding-bottom: 1.5rem;
        }
    `;

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <style>{styles}</style>
            <div className="text-center max-w-3xl mx-auto dark-context">
                <h2 className="text-4xl font-bold">{t('spectrum_section_title')}</h2>
                <p className="mt-4 text-lg">{t('spectrum_section_subtitle')}</p>
                <SectionDivider />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {amberSpectrumContent.map((amber) => {
                    const isExpanded = expandedCard === amber.id;
                    return (
                        <div key={amber.id} className="amber-spectrum-card flex flex-col">
                            <div className="p-6">
                                <img
                                    src={amber.image}
                                    alt={t(`spectrum_${amber.id}_title` as any)}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                    loading="lazy"
                                />
                                <h3 className="text-2xl font-semibold text-[var(--c-heading)]">{t(`spectrum_${amber.id}_title` as any)}</h3>
                                <p className="text-lg font-serif italic text-[var(--c-accent-primary-hover)] mt-1">{t(`spectrum_${amber.id}_core_meaning` as any)}</p>
                                <p className="text-[var(--c-text-secondary)] mt-3 h-24 overflow-hidden text-ellipsis">
                                    {t(`spectrum_${amber.id}_teaser` as any)}
                                </p>
                            </div>

                            <div className={`amber-spectrum-details ${isExpanded ? 'expanded' : ''}`}>
                                <ul className="space-y-4 text-[var(--c-text-primary)]">
                                    <li>
                                        <strong className="block text-[var(--c-heading)]">{t('spectrum_aspect_love')}</strong>
                                        {t(`spectrum_${amber.id}_aspect_love` as any)}
                                    </li>
                                    <li>
                                        <strong className="block text-[var(--c-heading)]">{t('spectrum_aspect_work')}</strong>
                                        {t(`spectrum_${amber.id}_aspect_work` as any)}
                                    </li>
                                    <li>
                                        <strong className="block text-[var(--c-heading)]">{t('spectrum_aspect_wellbeing')}</strong>
                                        {t(`spectrum_${amber.id}_aspect_wellbeing` as any)}
                                    </li>
                                </ul>
                                <div className="mt-6 pt-4 border-t border-[var(--c-border)] grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong className="block text-[var(--c-heading)]">{t('spectrum_associated_day')}</strong>
                                        <span>{t(`spectrum_${amber.id}_day` as any)}</span>
                                    </div>
                                    <div>
                                        <strong className="block text-[var(--c-heading)]">{t('spectrum_associated_zodiac')}</strong>
                                        <span>{t(`spectrum_${amber.id}_zodiac` as any)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto p-6 pt-0">
                                <button
                                    onClick={() => handleToggle(amber.id)}
                                    className="w-full text-center py-2 px-4 rounded-md font-semibold text-[var(--c-accent-primary)] bg-[var(--c-accent-primary)]/10 hover:bg-[var(--c-accent-primary)]/20 transition-colors"
                                    aria-expanded={isExpanded}
                                >
                                    {isExpanded ? t('spectrum_read_less') : t('spectrum_read_more')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AmberSpectrumSection;