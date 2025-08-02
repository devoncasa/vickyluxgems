

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import SectionDivider from '../components/SectionDivider.tsx';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import JsonLd from '../components/JsonLd.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';

const ImageWithAlt: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = 'aspect-video' }) => (
    <div className={`w-full bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
    </div>
);

const AboutPage: React.FC = () => {
    const { lang, t } = useLanguage();
    
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "About Vicky LuxGems",
        "url": window.location.href,
        "description": "Discover the story behind Vicky LuxGems, our mission to provide authentic precious gems, and our commitment to transparency and ethical sourcing from around the world.",
        "inLanguage": lang,
        "isPartOf": {
            "@type": "WebSite",
            "url": window.location.origin,
            "name": "Vicky LuxGems"
        }
    };

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[0]}')`}}
        >
            <SEO 
                titleKey="seo_about_title"
                descriptionKey="seo_about_desc"
                keywordsKey="seo_about_keywords"
                imageUrl="https://i.postimg.cc/L89yhZgt/Vicky-Amber-Gems-background-0012.jpg"
            />
            <JsonLd data={webPageSchema} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-4xl mx-auto p-8 md:p-12 rounded-lg shadow-xl border border-[var(--c-border-muted)]">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight">About <span className="brand-name">Vicky LuxGems</span></h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">Connecting Discerning Individuals to the Spirit of Myanmar</p>
                    </div>

                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
                        <div className="not-prose">
                           <ImageWithAlt src="https://placehold.co/1200x675/A56C50/F8F5F2?text=Vicky+LuxGems+Showcase" alt={t('alt_about_showcase' as any)} />
                        </div>
                        
                        <h2>Our Story: A Passion for Purity</h2>
                        <SectionDivider />
                        <div className="not-prose grid md:grid-cols-2 gap-8 items-center text-lg text-[var(--c-text-primary)]/90">
                            <div className="space-y-6 text-left">
                                <p>
                                    Founded on a multi-generational legacy, <span className="brand-name">Vicky LuxGems</span> is the modern expression of over 40 years of family expertise in the Burmese amber trade. The personal mission of our founder, Vicky Sinchoury, is to carry this heritage forward.
                                </p>
                                <p>
                                    Though not a certified gemologist himself, he has spent years immersed in the world of rare natural gemstones, guided by his family's deep knowledge, with a special focus on authentic Burmese amber. Vicky is dedicated to bridging the legacy of traditional gemstone craftsmanship with modern standards of authenticity and ethical sourcing, bringing rare treasures from Myanmar to the international stage.
                                </p>
                            </div>
                            <ImageWithAlt src="https://placehold.co/600x600/7E746A/FFFFFF?text=Vicky+Sinchoury" alt={t('alt_about_founder_portrait' as any)} className="aspect-square" />
                        </div>

                        <h2>Our Mission: The Pillars of Our Promise</h2>
                        <SectionDivider />
                        <p>
                            Our mission is to be the most trusted global source for authentic Burmese amber and precious gems from Myanmar. We are committed to:
                        </p>
                        <ul>
                            <li><strong>Unwavering Authenticity:</strong> Guaranteeing every piece is 100% genuine and scientifically verified. We combine traditional gemological expertise with modern technology to ensure absolute confidence.</li>
                            <li><strong>Ethical Sourcing:</strong> Working directly with local, small-scale mining communities in Myanmar to ensure fair practices, respect for the land, and that the economic benefits support the people who are the custodians of these natural treasures.</li>
                            <li><strong>Expert Craftsmanship:</strong> Ensuring every piece, from a single bead to an intricate carving, is crafted with the skill and dedication befitting heirloom quality jewelry.</li>
                            <li><strong>Client Education:</strong> Empowering our clients with the knowledge to appreciate the unique history, scientific properties, and spiritual significance of their purchase.</li>
                        </ul>
                        <div className="not-prose">
                            <ImageWithAlt src="https://placehold.co/1200x675/C8A97E/3D352E?text=Gemological+Tools" alt={t('alt_about_gem_tools' as any)} />
                        </div>

                        <h2>Why Choose Us? The Vicky LuxGems Difference</h2>
                        <SectionDivider />
                        <p>
                           Choosing <span className="brand-name">Vicky LuxGems</span> means choosing unparalleled quality and integrity. We offer:
                        </p>
                         <ul>
                            <li><strong>Verifiable Expertise:</strong> Our assessments are based on rigorous standards from world-renowned institutions like the GIA and GIT, backed by 40 years of family experience. This expertise underpins every item we offer.</li>
                            <li><strong>Scientific Verification:</strong> We don't just rely on a trained eye. We use modern tools like UV fluorescence testing and microscopic analysis to ensure you are getting real, high-quality gems. You can read more on our <ReactRouterDOM.Link to="/our-guarantee">guarantee page</ReactRouterDOM.Link>.</li>
                             <li><strong>A Transparent Supply Chain:</strong> Our direct relationships with miners in regions like the Hukawng Valley and Mogok mean we can trace our gems from the mine to your hands, ensuring both authenticity and ethical practices. This is not just a promise; it's the foundation of our business.</li>
                        </ul>
                        <div className="not-prose">
                            <ImageWithAlt src="https://placehold.co/1200x675/9FB8AD/3D352E?text=Ethical+Sourcing" alt={t('alt_about_ethical_sourcing' as any)} />
                        </div>

                        {/* Call to Action */}
                        <div className="not-prose text-center mt-16">
                             <h2 className="text-3xl md:text-4xl font-bold text-[var(--c-heading)]">Join Us on This Journey</h2>
                              <div className="w-48 h-1 bg-[var(--c-accent-primary)]/30 mx-auto my-6 rounded-full"></div>
                             <p className="text-lg text-[var(--c-text-secondary)] max-w-2xl mx-auto">
                                We invite you to explore our collections and discover a piece of ancient history that resonates with your spirit. Experience the warmth, beauty, and timeless energy of the world's finest gemstones.
                             </p>
                             <ReactRouterDOM.Link to="/collection" className="mt-8 inline-block btn-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg">
                                Explore the Collection
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;