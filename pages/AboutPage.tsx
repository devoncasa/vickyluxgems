

import React from 'react';
import { Link } from 'react-router-dom';
import SectionDivider from '../components/SectionDivider';
import { BACKGROUND_IMAGES } from '../constants';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { useLanguage } from '../i18n/LanguageContext';

const ImageWithAlt: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = 'aspect-video' }) => (
    <div className={`w-full bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
    </div>
);

const AboutPage: React.FC = () => {
    const { lang } = useLanguage();
    
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
                           <ImageWithAlt src="https://placehold.co/1200x675/A56C50/F8F5F2?text=Vicky+LuxGems" alt="An array of beautiful precious and ethically sourced Myanmar gems, showcasing their natural beauty." />
                        </div>
                        
                        <h2>Our Story</h2>
                        <SectionDivider />
                        <div className="not-prose grid md:grid-cols-2 gap-8 items-center text-lg text-[var(--c-text-primary)]/90">
                            <div className="space-y-6 text-left">
                                <p>
                                    Founded on a passion for the world's finest gemstones, <span className="brand-name">Vicky LuxGems</span> began as a personal journey. Vicky Sinchoury, our founder, embarked on a mission to bring these rare treasures from historic mines around the globe to the international stage.
                                </p>
                                <p>
                                    What started as a simple appreciation for their beauty grew into a commitment to authenticity, ethical sourcing, and scientific verification. Today, <span className="brand-name">Vicky LuxGems</span> stands as a trusted bridge between the ancient world of gemstones and discerning collectors worldwide.
                                </p>
                            </div>
                            <ImageWithAlt src="https://placehold.co/600x600/7E746A/FFFFFF?text=Vicky+Sinchoury" alt="Portrait of Vicky Sinchoury, Founder of Vicky LuxGems and expert in heirloom quality jewelry." className="aspect-square" />
                        </div>

                        <h2>Our Mission</h2>
                        <SectionDivider />
                        <p>
                            Our mission is to be the most trusted global source for authentic precious gems. We are committed to:
                        </p>
                        <ul>
                            <li><strong>Authenticity:</strong> Guaranteeing every piece is 100% genuine and scientifically verified.</li>
                            <li><strong>Transparency:</strong> Providing clear, honest information about our products, pricing, and processes.</li>
                            <li><strong>Education:</strong> Empowering our clients with the knowledge to appreciate the unique history and qualities of their purchase.</li>
                            <li><strong>Ethical Sourcing:</strong> Working directly with local miners to ensure fair practices and respect for the communities and the land.</li>
                             <li><strong>Artisanal Craftsmanship:</strong> Ensuring every piece is crafted with the skill and dedication befitting heirloom quality jewelry.</li>
                        </ul>
                        <div className="not-prose">
                            <ImageWithAlt src="https://placehold.co/1200x675/C8A97E/3D352E?text=High-Quality+Gemstones" alt="Close-up of a high-quality gemstone piece, an artisanal amber necklace showing its clarity and inclusions." />
                        </div>

                        <h2>Our Vision</h2>
                        <SectionDivider />
                        <p>
                            We envision a world where the timeless beauty and spiritual significance of precious gems is accessible to all who seek it. We aim to cultivate a global community of collectors and enthusiasts who value authenticity, history, and the profound connection between humanity and the natural world.
                        </p>
                        <div className="not-prose">
                            <ImageWithAlt src="https://placehold.co/1200x675/B27732/FFFFFF?text=Gemstone+Mala" alt="Hands holding a string of meditation beads, symbolizing a spiritual connection through crystal healing jewelry." />
                        </div>
                        
                        <h2>Why Choose Us?</h2>
                        <SectionDivider />
                        <p>
                            Choosing <span className="brand-name">Vicky LuxGems</span> means choosing unparalleled quality and integrity. We offer:
                        </p>
                         <ul>
                            <li><strong>Unwavering Authenticity:</strong> Our guarantee is backed by gemological expertise and scientific testing.</li>
                            <li><strong>Scientific Verification:</strong> We use modern tools to ensure you are getting real, high-quality gems.</li>
                             <li><strong>Ethical and Direct Sourcing:</strong> A clear, fair supply chain for all our ethically sourced Myanmar gems.</li>
                             <li><strong>Expert Craftsmanship:</strong> Decades of experience ensuring every piece, from a simple string of beads to an artisanal amber necklace, is of heirloom quality.</li>
                        </ul>
                        <div className="not-prose">
                            <ImageWithAlt src="https://placehold.co/1200x675/9FB8AD/3D352E?text=Gemology" alt="A gemologist carefully inspecting a gemstone with professional tools, an expert in identifying real amber." />
                        </div>

                        {/* Call to Action */}
                        <div className="not-prose text-center mt-16">
                             <h2 className="text-3xl md:text-4xl font-bold text-[var(--c-heading)]">Join Us on This Journey</h2>
                              <div className="w-48 h-1 bg-[var(--c-accent-primary)]/30 mx-auto my-6 rounded-full"></div>
                             <p className="text-lg text-[var(--c-text-secondary)] max-w-2xl mx-auto">
                                We invite you to explore our collections and discover a piece of ancient history that resonates with your spirit. Experience the warmth, beauty, and timeless energy of the world's finest gemstones.
                             </p>
                             <Link to="/collection" className="mt-8 inline-block btn-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg">
                                Explore the Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;