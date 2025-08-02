

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PRAYER_BEAD_DATA } from '../constants';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES } from '../constants';
import SectionDivider from '../components/SectionDivider';

type SelectionType = 'rosary' | 'tasbih' | null;
type Selections = { [key: string]: string };

const PrayerBeadCustomizerPage: React.FC = () => {
    const { t } = useLanguage();
    const [selection, setSelection] = useState<SelectionType>(null);
    const [customSelections, setCustomSelections] = useState<Selections>({});

    const selectedBeadData = useMemo(() => {
        if (!selection) return null;
        return PRAYER_BEAD_DATA[selection];
    }, [selection]);

    const initializeSelections = (type: 'rosary' | 'tasbih') => {
        const initialData = PRAYER_BEAD_DATA[type];
        const initialSelections = initialData.components.reduce((acc, component) => {
            acc[component.name] = component.options[0];
            return acc;
        }, {} as Selections);
        setCustomSelections(initialSelections);
        setSelection(type);
    };

    const handleSelectionChange = (componentName: string, value: string) => {
        setCustomSelections(prev => ({ ...prev, [componentName]: value }));
    };

    const handleReset = () => {
        if (selection) {
            initializeSelections(selection);
        }
    };
    
    const handleSubmit = () => {
        const summary = Object.entries(customSelections)
            .map(([component, material]) => `- ${t(`pbc_component_${component.replace(/[\s/()"]/g, '_')}` as any)}: ${material}`)
            .join('\n');

        const message = `Hello! I've designed a custom ${selectedBeadData?.name} with the following components:\n\n${summary}\n\nPlease provide me with a quote.\n\nThank you!`;

        alert('Your design summary has been prepared. You would typically be redirected to a contact form or messaging app with this pre-filled message:\n\n' + message);
    };

    const getComponentTranslationKey = (name: string) => {
        return `pbc_component_${name.replace(/[\s/()"]/g, '_')}` as any;
    };


    // Initial Selection Screen
    if (!selection) {
        return (
            <div 
                className="page-container-with-bg py-16 md:py-24"
                style={{ backgroundImage: `url('${BACKGROUND_IMAGES[10]}')` }}
            >
                <SEO 
                    titleKey="seo_prayer_bead_customizer_title"
                    descriptionKey="seo_prayer_bead_customizer_desc"
                    keywordsKey="seo_prayer_bead_customizer_keywords"
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold tracking-tight">{t('pbc_page_title')}</h1>
                    <p className="mt-4 text-xl text-[var(--c-text-secondary)] max-w-2xl mx-auto">{t('pbc_page_subtitle')}</p>
                    <SectionDivider />
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Rosary Card */}
                        <button onClick={() => initializeSelections('rosary')} className="group block text-left bg-[var(--c-surface)] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--c-border)] hover:border-[var(--c-accent-primary)]">
                             <img src={PRAYER_BEAD_DATA.rosary.imageUrl} alt="Catholic Rosary Diagram" className="w-full h-48 object-contain rounded-md mb-4 bg-gray-100 p-2" />
                             <h2 className="text-3xl font-bold font-serif text-[var(--c-heading)]">{t('pbc_choose_rosary')}</h2>
                             <p className="mt-2 text-[var(--c-text-primary)]/80">Design a personal and meaningful Catholic Rosary. Choose materials for the Crucifix, beads, and centerpiece.</p>
                             <span className="mt-4 inline-block font-semibold text-[var(--c-accent-primary)] group-hover:text-[var(--c-accent-primary-hover)]">Start Customizing &rarr;</span>
                        </button>
                        {/* Tasbih Card */}
                        <button onClick={() => initializeSelections('tasbih')} className="group block text-left bg-[var(--c-surface)] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-[var(--c-border)] hover:border-[var(--c-accent-primary)]">
                             <img src={PRAYER_BEAD_DATA.tasbih.imageUrl} alt="Islamic Tasbih Diagram" className="w-full h-48 object-contain rounded-md mb-4 bg-gray-100 p-2" />
                             <h2 className="text-3xl font-bold font-serif text-[var(--c-heading)]">{t('pbc_choose_tasbih')}</h2>
                             <p className="mt-2 text-[var(--c-text-primary)]/80">Craft a unique Tasbih for dhikr. Select materials for the main beads, imame, and tassel.</p>
                             <span className="mt-4 inline-block font-semibold text-[var(--c-accent-primary)] group-hover:text-[var(--c-accent-primary-hover)]">Start Customizing &rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Builder Screen
    return (
        <div
            className="page-container-with-bg py-16"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[12]}')` }}
        >
             <SEO 
                title={`Customize your ${selectedBeadData?.name}`}
                descriptionKey="seo_prayer_bead_customizer_desc"
                keywordsKey="seo_prayer_bead_customizer_keywords"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Visual Side */}
                    <div className="sticky top-28 self-start text-center">
                        <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-lg border border-[var(--c-border)]">
                            <img src={selectedBeadData?.imageUrl} alt={`${selectedBeadData?.name} Diagram`} className="w-full h-auto object-contain max-h-[60vh]"/>
                            <h2 className="text-2xl font-bold mt-4">{selectedBeadData?.name}</h2>
                        </div>
                        <button onClick={() => setSelection(null)} className="mt-4 text-sm font-semibold text-[var(--c-accent-primary)] hover:underline">
                           &larr; {t('pbc_change_type')}
                        </button>
                    </div>

                    {/* Controls & Summary Side */}
                    <div>
                        <div className="bg-[var(--c-surface)] p-8 rounded-lg shadow-lg border border-[var(--c-border)]">
                            <h2 className="text-3xl font-bold mb-6">Customize your {selectedBeadData?.name}</h2>
                            <div className="space-y-6">
                                {selectedBeadData?.components.map(component => (
                                    <div key={component.name}>
                                        <label htmlFor={component.name} className="block text-sm font-bold text-[var(--c-text-primary)] mb-2">
                                            {t(getComponentTranslationKey(component.name))}
                                        </label>
                                        <select
                                            id={component.name}
                                            value={customSelections[component.name] || ''}
                                            onChange={(e) => handleSelectionChange(component.name, e.target.value)}
                                            className="w-full p-3 border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-primary)] bg-[var(--c-surface)] appearance-none"
                                        >
                                            {component.options.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <SectionDivider />

                            <h3 className="text-2xl font-bold mb-4">{t('pbc_your_build')}</h3>
                            <ul className="space-y-2 text-[var(--c-text-secondary)] list-disc list-inside bg-[var(--c-surface-alt)] p-4 rounded-md border border-[var(--c-border)]">
                                {Object.entries(customSelections).map(([component, material]) => (
                               