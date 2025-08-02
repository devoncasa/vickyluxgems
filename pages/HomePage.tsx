

import React, { useMemo, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BLOG_POSTS, HERO_SLIDESHOW_IMAGES } from '../constants.ts';
import ProductCard from '../components/ProductCard.tsx';
import SectionDivider from '../components/SectionDivider.tsx';
import useScrollAnimation from '../hooks/useScrollAnimation.ts';
import CallToActionSection from '../components/CallToActionSection.tsx';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import JsonLd from '../components/JsonLd.tsx';
import AmberSpectrumSection from '../components/AmberSpectrumSection.tsx';
import { useUserPreferences } from '../hooks/useUserPreferences.ts';
import InfographicSection from '../components/InfographicSection.tsx';
import HeroSlideshow from '../components/HeroSlideshow.tsx';
import { useAppContext } from '../context/AppContext.tsx';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <section ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
            {children}
        </section>
    );
};

const HomePage: React.FC = () => {
    const { t } = useLanguage();
    const { preferredEnergy } = useUserPreferences();
    const { products } = useAppContext();
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

    const newArrivals = useMemo(() => {
        const allNewArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
        if (!preferredEnergy) {
            return allNewArrivals;
        }
        return allNewArrivals.sort((a, b) => {
            const aHasPreference = a.energyProperties.includes(preferredEnergy);
            const bHasPreference = b.energyProperties.includes(preferredEnergy);
            if (aHasPreference && !bHasPreference) return -1;
            if (!aHasPreference && bHasPreference) return 1;
            return 0;
        });
    }, [preferredEnergy, products]);

    const blogSnippets = BLOG_POSTS.slice(0, 3);

    const websiteUrl = window.location.origin;
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vicky LuxGems",
        "url": websiteUrl,
        "logo": "https://i.postimg.cc/Qd8yW639/vkambergems-logo-small.png",
        "contactPoint": { "@type": "ContactPoint", "telephone": "+66-63-195-9922", "contactType": "Customer Service" },
        "sameAs": [ "https://facebook.com/vkmmamber", "https://instagram.com/vkmmamber" ]
    };
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": websiteUrl,
        "name": "Vicky LuxGems",
        "description": t('home_meta_description'),
        "potentialAction": { "@type": "SearchAction", "target": `${websiteUrl}/#/collection?q={search_term_string}`, "query-input": "required name=search_term_string" }
    };
     const homePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": `${websiteUrl}/#/`,
        "name": t('home_meta_title'),
        "description": t('home_meta_description'),
        "isPartOf": { "@id": `${websiteUrl}/#website` }
    };
    
    const customCreationOptions = [
        { id: 'juzu', titleKey: "custom_landing_juzu_title", backContentKey: "custom_card_back_juzu_full", link: "/prayer-bead-builder/Juzu", imageUrl: "https://i.postimg.cc/xCz9v67F/Juzu-beads.webp", altText: "A beautifully crafted set of Japanese Juzu prayer beads, ready for customization." },
        { id: 'tesbih', titleKey: "custom_landing_tesbih_title", backContentKey: "custom_card_back_tesbih_full", link: "/prayer-bead-builder/Tesbih", imageUrl: "https://i.postimg.cc/8zZkNJMw/Tesbih.webp", altText: "An elegant Islamic Tesbih with an ornate tassel, available for custom design." },
        { id: 'rosary', titleKey: "custom_landing_rosary_title", backContentKey: "custom_card_back_rosary_full", link: "/custom-rosary-configurator", imageUrl: "https://i.postimg.cc/43nfdf1G/Rosary.webp", altText: "A classic Christian Rosary with a detailed crucifix, ready to be personalized." },
        { id: 'mala', titleKey: "custom_landing_amber_title", backContentKey: "custom_card_back_mala_full", link: "/build-your-set", imageUrl: "https://i.postimg.cc/bvMzS76t/amber-beads.webp", altText: "A luxurious strand of Burmese amber mala beads, showcasing their warm, golden color." }
    ];

    const handleCardInteraction = (id: string, isEntering: boolean) => {
        if (window.innerWidth > 1023) { setFlippedCardId(isEntering ? id : null); }
    };
    const handleCardClick = (id: string) => { setFlippedCardId(prevId => (prevId === id ? null : id)); };

    return (
        <div className="overflow-x-hidden">
            <SEO titleKey="home_meta_title" descriptionKey="home_meta_description" keywordsKey="home_meta_keywords" imageUrl="https://i.postimg.cc/Qd5xfTmD/hero-section-background-vicky-0013.jpg" />
            <JsonLd data={organizationSchema} />
            <JsonLd data={websiteSchema} />
            <JsonLd data={homePageSchema} />

            <section className="hero-section">
                <HeroSlideshow images={HERO_SLIDESHOW_IMAGES} />
                <div className="hero-content-block">
                    <img src="https://i.postimg.cc/BZ7Qgx8s/vkluxgem-logo-smll.webp" alt="Vicky LuxGems Emblem" className="hero-logo" />
                    <h1 className="hero-headline">Vicky LuxGems</h1>
                    <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-[var(--c-text-primary)] font-serif">{t('home_hero_title')}</h2>
                    <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-[var(--c-text-secondary)]">{t('home_hero_subtitle')}</p>
                    <div className="mt-8">
                        <ReactRouterDOM.Link to="/collection" className="btn-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg">
                            {t('home_hero_cta')}
                        </ReactRouterDOM.Link>
                    </div>
                </div>
            </section>
            
            <div className="page-container-with-bg">
                <InfographicSection />

                <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                    <div className="content-page-block rounded-lg p-8 md:p-12">
                        <h2 className="text-4xl font-bold text-center">{t('home_new_arrivals_title')}</h2>
                        <SectionDivider />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                        <div className="text-center mt-12">
                            <ReactRouterDOM.Link to="/collection" className="text-[var(--c-accent-primary)] hover:text-[var(--c-heading)] font-semibold transition-colors group">
                                View All New Arrivals <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                     <div className="content-page-block rounded-lg p-8 md:p-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl font-bold">{t('custom_landing_page_title' as any)}</h2>
                            <p className="mt-4 text-lg text-[var(--c-text-secondary)]">{t('custom_landing_page_subtitle' as any)}</p>
                            <SectionDivider />
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {customCreationOptions.map((option) => (
                                <div key={option.id} className={`flipping-card ${flippedCardId === option.id ? 'is-flipped' : ''}`}
                                    onMouseEnter={() => handleCardInteraction(option.id, true)}
                                    onMouseLeave={() => handleCardInteraction(option.id, false)}
                                    onClick={() => handleCardClick(option.id)} role="button" tabIndex={0}>
                                    <div className="flipping-card-inner relative aspect-[4/3]">
                                        <div className="flipping-card-front w-full h-full"><div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden group"><img src={option.imageUrl} alt={option.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div><div className="absolute bottom-0 left-0 right-0 p-6 dark-context"><h3 className="text-3xl font-bold font-serif">{t(option.titleKey as any)}</h3></div></div></div>
                                        <div className="flipping-card-back w-full h-full shadow-2xl dark-context"><div><p className="text-sm leading-relaxed">{t(option.backContentKey as any)}</p><ReactRouterDOM.Link to={option.link} className="mt-6 inline-block font-semibold border-b-2 border-white/50 hover:border-white transition-colors pb-1" onClick={(e) => e.stopPropagation()}>{t('custom_landing_cta' as any)}</ReactRouterDOM.Link></div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection>
                    <AmberSpectrumSection />
                </AnimatedSection>

                <AnimatedSection className="py-20 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="content-page-block rounded-lg p-8 md:p-12">
                            <h2 className="text-4xl font-bold text-center">{t('home_blog_title')}</h2>
                            <SectionDivider />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {blogSnippets.map((post) => (
                                    <ReactRouterDOM.Link to={`/blog/${post.id}`} key={post.id} className="group block bg-[var(--c-surface)] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--c-border)]">
                                        <div className="aspect-w-16 aspect-h-9 overflow-hidden bg-[var(--c-surface-alt)] flex items-center justify-center"><img src={post.featuredImage} alt={`Featured image for blog post titled '${post.title}'`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                                        <div className="p-6"><span className={`text-sm font-bold uppercase tracking-widest ${post.category === 'Science' ? 'text-[var(--c-accent-primary-hover)]' : 'text-[var(--c-accent-secondary-hover)]'}`}>{post.category}</span><h3 className="text-2xl mt-2 leading-tight group-hover:text-[var(--c-accent-primary)] transition-colors">{post.title}</h3><p className="mt-3 text-[var(--c-text-primary)] opacity-90 text-base line-clamp-3">{post.summary}</p><p className="mt-4 font-semibold text-sm text-[var(--c-accent-primary)] group-hover:text-[var(--c-heading)]">{t('Read More')} &rarr;</p></div>
                                    </ReactRouterDOM.Link>
                                ))}
                            </div>
                            <div className="text-center mt-12">
                                <ReactRouterDOM.Link to="/blog" className="text-[var(--c-accent-primary)] hover:text-[var(--c-heading)] font-semibold transition-colors group">{t('home_blog_cta')} <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span></ReactRouterDOM.Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <CallToActionSection title={t('home_cta_title')} subtitle={t('home_cta_subtitle')} buttonText={t('home_cta_button')} buttonLink="/custom-jewelry" backgroundImageUrl="https://i.postimg.cc/pXtcbS21/Vicky-Amber-Gems-background-0014.jpg" />
                </AnimatedSection>
            </div>
        </div>
    );
};

export default HomePage;