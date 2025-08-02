

import React from 'react';
import SectionDivider from '../components/SectionDivider.tsx';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import JsonLd from '../components/JsonLd.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';

const OurGuaranteePage: React.FC = () => {
    const { lang } = useLanguage();

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Our Guarantee of Authenticity",
        "url": window.location.href,
        "description": "Learn about our unwavering commitment to authenticity, ethical sourcing, and scientific verification for every piece of Burmese amber and gemstone we sell.",
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
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[26]}')` }}
        >
            <SEO 
                titleKey="seo_guarantee_title"
                descriptionKey="seo_guarantee_desc"
                keywordsKey="seo_guarantee_keywords"
                imageUrl="https://i.postimg.cc/Bn7C6703/Vicky-Amber-Gems-background-002.jpg"
            />
            <JsonLd data={webPageSchema} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-4xl mx-auto p-8 md:p-12 rounded-lg shadow-xl border border-[var(--c-border-muted)]">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight">Our Guarantee</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">Authenticity You Can Trust. Transparency You Deserve.</p>
                    </div>
                    
                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
                        <div className="space-y-4">
                            <p>
                               At <span className="brand-name">Vicky LuxGems</span>, our foundation is built on an unwavering commitment to authenticity. We stake our reputation on the quality and genuineness of every gem we offer.
                            </p>
                            <p>
                                We understand that you are not just purchasing a gemstone, but a piece of natural history and a tangible investment. Our guarantee is our promise that you are receiving genuine, ethically sourced, and scientifically verified Burmite amber and precious gems from Myanmar.
                            </p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center not-prose my-12">
                            <div className="flex-grow">
                                <h2 className="text-4xl mt-0">The Science of Authenticity</h2>
                                <SectionDivider />
                                <p className="text-[var(--c-text-secondary)]">
                                    We bridge the gap between ancient wisdom and modern science. To ensure every piece meets the highest standards of the gemological world, we employ a multi-step verification process based on established scientific principles.
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center text-center overflow-hidden">
                                <img src="https://placehold.co/400x300/F0EBE6/534B42?text=UV+Fluorescence+Test" alt="A demonstration of the UV fluorescence test on a piece of Burmese Amber, a key scientific authentication method." loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <ul>
                            <li><strong>Expert Gemological Analysis:</strong> Each piece is meticulously inspected by our in-house certified gemologists who specialize in amber and colored stones from Myanmar. They analyze color, clarity, cut, and the unique identifying characteristics of each gem type.</li>
                            <li><strong>UV Fluorescence Testing:</strong> Genuine Burmese amber exhibits a distinct strong, milky-blue fluorescence under long-wave ultraviolet light—a key, non-destructive indicator that easily separates it from common imitations like copal or plastic.</li>
                            <li><strong>Microscopic Inclusion Study:</strong> We examine the prehistoric inclusions—the tiny flora and fauna trapped within the amber—which are characteristic of the Cretaceous period from which Burmite originates. These natural time capsules are impossible to fake and are a definitive proof of age and origin.</li>
                            <li><strong>Refractive Index & Specific Gravity Testing:</strong> We utilize standard gemological tools to measure the refractive index and specific gravity of our gems, ensuring they match the known scientific values for their type.</li>
                        </ul>

                        <div className="mt-16 not-prose grid md:grid-cols-2 gap-8 items-center bg-[var(--c-surface-alt)] p-8 rounded-lg">
                             <div className="space-y-4">
                                <h3 className="text-3xl">Ethical & Transparent Sourcing</h3>
                                <p className="text-[var(--c-text-secondary)]">
                                    We are deeply committed to a supply chain that honors both the land and its people. All our ethically sourced Myanmar gems, including our world-renowned Burmite, come with a story of respect. We achieve this through:
                                </p>
                                <ul className="space-y-2 text-[var(--c-text-secondary)] list-disc list-inside">
                                    <li><strong>Direct Partnerships:</strong> We bypass intermediaries and work directly with small-scale, trusted miners and local artisans in the Hukawng Valley and Mogok regions.</li>
                                    <li><strong>Ethical Extraction:</strong> Our long-standing relationships ensure that our amber and gems are sourced with the utmost respect for the local environment.</li>
                                    <li><strong>Fair Compensation:</strong> We guarantee that the local communities who are the custodians of this resource are treated with respect and compensated fairly, ensuring the trade is a positive force.</li>
                                    <li><strong>Full Transparency:</strong> We believe in a clear, traceable path for every gemstone, from the mine to your hands. We are proud of our sourcing and are happy to discuss it with our clients.</li>
                                </ul>
                            </div>
                            <div className="aspect-w-4 aspect-h-3 rounded-lg shadow-md overflow-hidden bg-white flex items-center justify-center text-center">
                                <img src="https://placehold.co/400x300/F0EBE6/534B42?text=Ethical+Sourcing" alt="Hands holding raw gemstones, symbolizing our direct and ethical sourcing from mining communities." loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center not-prose my-12">
                            <div className="flex-grow">
                                <h2 className="text-4xl mt-0">Certificate of Authenticity</h2>
                                <SectionDivider />
                                <p className="text-[var(--c-text-secondary)]">
                                   Every item from <span className="brand-name">Vicky LuxGems</span> is accompanied by our official, detailed Certificate of Authenticity. This document is our written promise to you, confirming:
                                </p>
                                <ul className="mt-4 space-y-2 text-[var(--c-text-secondary)] list-disc list-inside">
                                    <li>The item's <strong>genuine nature</strong> as authentic Burmese Amber or other specified gemstone.</li>
                                    <li>The unique <strong>specifications</strong> of your piece, including weight, dimensions, and grade.</li>
                                    <li>Its <strong>verified origin</strong> from Myanmar.</li>
                                    <li>Our commitment to your <strong>peace of mind</strong> and confidence in your investment. For high-value items, we can also facilitate third-party certification from labs like GIA or GIT upon request.</li>
                                </ul>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center text-center overflow-hidden">
                                 <img src="https://placehold.co/400x300/F0EBE6/534B42?text=Certificate" alt="A close-up of the official Vicky LuxGems Certificate of Authenticity, a mark of our guarantee." loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurGuaranteePage;