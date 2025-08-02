import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES, GLOSSARY_TERMS } from '../constants';
import JsonLd from '../components/JsonLd';

const AccordionItem: React.FC<{ 
    letter: string; 
    terms: { term: string; definition: string }[];
    isOpen: boolean;
    onClick: () => void;
}> = ({ letter, terms, isOpen, onClick }) => {
    return (
        <div className="border-b border-[var(--c-border)]" id={`letter-${letter}`}>
            <h2 className="text-lg font-semibold w-full">
                <button
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`content-${letter}`}
                    className={`w-full flex justify-between items-center py-4 text-start text-[var(--c-heading)] hover:bg-[var(--c-accent-primary)]/10 px-4 transition-colors font-serif text-4xl`}
                >
                    <span>{letter}</span>
                    <span className={`text-4xl text-[var(--c-accent-primary)] font-normal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
            </h2>
            <div 
                id={`content-${letter}`} 
                className={`overflow-hidden transition-all duration-500 ease-in-out bg-white/30`}
                style={{ maxHeight: isOpen ? '2000px' : '0' }}
                aria-hidden={!isOpen}
            >
                <dl className="space-y-6 p-6">
                    {terms.map((item, index) => (
                        <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                            <dt className="text-xl font-semibold text-[var(--c-heading)] font-serif">{item.term}</dt>
                            <dd className="mt-1 text-base text-[var(--c-text-primary)]/90" dangerouslySetInnerHTML={{ __html: item.definition }}></dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

const GlossaryPage: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [openLetter, setOpenLetter] = useState<string | null>(null);

    const toggleLetter = (letter: string) => {
        setOpenLetter(prev => prev === letter ? null : letter);
    };

    const translatedTerms = useMemo(() => {
        return GLOSSARY_TERMS.map(({ termKey, defKey }) => ({
            term: t(`glossary_${termKey}` as any),
            definition: t(`glossary_${defKey}` as any),
        }))
        .filter(item => item.term && typeof item.term === 'string' && !item.term.startsWith('glossary_')) // Filter out untranslated/missing items
        .sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
    }, [t]);

    const filteredTerms = useMemo(() => {
        if (!searchTerm) return translatedTerms;
        const lowercasedFilter = searchTerm.toLowerCase();
        return translatedTerms.filter(item =>
            item.term.toLowerCase().includes(lowercasedFilter) ||
            item.definition.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, translatedTerms]);
    
    const groupedTerms = useMemo(() => {
        return filteredTerms.reduce((acc, item) => {
            if (!item.term || item.term.startsWith('glossary_')) return acc;
            const firstLetter = item.term.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {} as Record<string, typeof filteredTerms>);
    }, [filteredTerms]);
    
    const faqSchema = useMemo(() => {
        if (filteredTerms.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": filteredTerms.map(item => ({
                "@type": "Question",
                "name": item.term,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.definition.replace(/<[^>]*>?/gm, '') // Strip HTML for schema
                }
            }))
        }
    }, [filteredTerms]);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    const handleLetterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, letter: string) => {
        e.preventDefault();
        setOpenLetter(letter);
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            setTimeout(() => {
                const headerOffset = 150; // Height of sticky header/search bar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    };

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[8]}')` }}
        >
            <SEO 
                titleKey="seo_glossary_title"
                descriptionKey="seo_glossary_desc"
                keywordsKey="seo_glossary_keywords"
                imageUrl="https://i.postimg.cc/Twz7P7n1/Vicky-Amber-Gems-background-0017.jpg"
            />
            {faqSchema && <JsonLd data={faqSchema} />}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold tracking-tight">{t('glossary_title' as any)}</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">{t('glossary_subtitle' as any)}</p>
                    </div>

                    <div className="sticky top-[100px] z-20 bg-[var(--c-bg)]/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-[var(--c-border)] mb-8">
                        <input
                            type="search"
                            placeholder={t('glossary_search_placeholder' as any)}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-primary)] bg-[var(--c-surface)]"
                            aria-label="Search glossary terms"
                        />
                         <nav className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-4">
                            {alphabet.map(letter => (
                                <a 
                                    key={letter}
                                    href={`#letter-${letter}`}
                                    className={`text-sm sm:text-base w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-colors font-semibold ${groupedTerms[letter] ? 'text-[var(--c-text-secondary)] hover:bg-[var(--c-accent-primary)] hover:text-white' : 'text-gray-300 cursor-not-allowed'}`}
                                    onClick={(e) => groupedTerms[letter] && handleLetterNavClick(e, letter)}
                                >
                                    {letter}
                                </a>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="space-y-1 bg-white/50 rounded-lg shadow-sm border border-[var(--c-border)] overflow-hidden">
                        {Object.keys(groupedTerms).sort().map(letter => (
                            <AccordionItem
                                key={letter}
                                letter={letter}
                                terms={groupedTerms[letter]}
                                isOpen={openLetter === letter}
                                onClick={() => toggleLetter(letter)}
                            />
                        ))}
                        {filteredTerms.length === 0 && searchTerm && (
                            <div className="text-center p-16 text-[var(--c-text-secondary)]">
                                <p className="text-xl">No terms found for "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlossaryPage;