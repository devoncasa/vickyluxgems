import React, { useState, useEffect } from 'react';
import SectionDivider from '../components/SectionDivider';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { BACKGROUND_IMAGES } from '../constants';
import SEO from '../components/SEO';
import { useAppContext } from '../context/AppContext.tsx';

const ImageWithAlt: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = 'aspect-video' }) => (
    <div className={`w-full bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
    </div>
);

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 bg-[var(--c-accent-primary)] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
            aria-label="Go to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};


const AmberHistoryPage: React.FC = () => {
    const { pageContent } = useAppContext();
    const objectId = pageContent?.['data-sb-object-id'];

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[10]}')`}}
            data-sb-object-id={objectId}
        >
            <SEO
                title={pageContent?.title || "History of Burmese Amber"}
                description={pageContent?.heroSubtitle || "Journey back 99 million years to the Cretaceous period and discover the ancient history of Burmite."}
                keywordsKey="seo_amber_history_keywords"
                imageUrl="https://i.postimg.cc/Xq6LWZ0y/Vicky-Amber-Gems-background-001.jpg"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-4xl mx-auto p-6 md:p-12 rounded-lg shadow-xl border border-[var(--c-border-muted)]">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight" data-sb-field-path="heroTitle">{pageContent?.heroTitle || 'History of Burmese Amber'}</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]" data-sb-field-path="heroSubtitle">{pageContent?.heroSubtitle || 'A Journey Through Time'}</p>
                    </div>

                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto" data-sb-field-path="body">
                        <h2>What are the origins of Burmese Amber?</h2>
                        <SectionDivider/>
                        <div className="space-y-4">
                            <p>
                                <strong>Burmese amber</strong>, or Burmite, is a direct portal to the Cretaceous period, over 99 million years ago. While dinosaurs roamed the Earth, ancient conifers in what is now Myanmar exuded resin that trapped a complete ecosystem within its embrace.
                            </p>
                            <p>
                                Unlike younger ambers, Burmite preserves a vanished world, containing the most diverse range of prehistoric life found in fossilized resin.
                            </p>
                        </div>

                        <h3 className="mt-8">How was Burmese Amber used historically?</h3>
                        <div className="space-y-4">
                           <p>
                                For centuries, it was known to local people, who used it in traditional medicine and as protective amulets. It entered the Silk Road trade during the Chinese Han Dynasty (206 BC – 220 AD), where it was highly prized as “hu po” (琥珀, meaning "Tiger's soul"). Due to its rarity and mystical associations, it was often reserved for royalty, symbolizing power, purity, and longevity.
                           </p>
                        </div>
                        <div className="not-prose">
                           <ImageWithAlt src="https://placehold.co/800x450/A56C50/FFFFFF?text=Prehistoric+Amber" alt="An artistic depiction of a prehistoric forest with large conifers exuding resin, with a dinosaur in the background." />
                        </div>
                    </div>
                </div>
            </div>
            <BackToTopButton />
        </div>
    );
};

export default AmberHistoryPage;
