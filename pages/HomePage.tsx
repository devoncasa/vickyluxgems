

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, HERO_SLIDESHOW_IMAGES } from '../constants.ts';
import ProductCard from '../components/ProductCard.tsx';
import SectionDivider from '../components/SectionDivider.tsx';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import HeroSlideshow from '../components/HeroSlideshow.tsx';
import { useAppContext } from '../context/AppContext.tsx';
import useScrollAnimation from '../hooks/useScrollAnimation.ts';
import InfographicSection from '../components/InfographicSection.tsx';

// --- Reusable & Local Components ---

const LazyImage: React.FC<{src: string, alt: string, className?: string}> = ({ src, alt, className }) => {
    const { ref, isVisible } = useScrollAnimation<HTMLImageElement>({ threshold: 0.2 });
    return <img ref={ref} src={src} alt={alt} className={`lazy-image ${isVisible ? 'visible' : ''} ${className}`} loading="lazy" />;
};

const ShieldIcon: React.FC<{className?: string}> = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>);
const GlobeIcon: React.FC<{className?: string}> = ({ className }) => (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.95 9.176a9.003 9.003 0 00-2.95-3.854M4.05 9.176a9.003 9.003 0 012.95-3.854M2.25 12h19.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.963 8.963 0 01-4.47-1.503m8.94 0A8.963 8.963 0 0012 21z" /></svg>);
const StarIcon: React.FC<{className?: string}> = ({ className }) => (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);

// --- Main Page Component ---

const HomePage: React.FC = () => {
    const { t } = useLanguage();
    const { products, pageContent } = useAppContext();
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
    const heroBgRef = useRef<HTMLDivElement>(null);
    const objectId = pageContent?.['data-sb-object-id'];

    // Parallax effect for hero background
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) { // Disable on mobile
                if (heroBgRef.current) heroBgRef.current.style.transform = '';
                return;
            }
            const scrollY = window.scrollY;
            if (heroBgRef.current) {
                const translateY = Math.min(10, scrollY * 0.1);
                heroBgRef.current.style.transform = `translateY(${translateY}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // --- Data Memos ---
    const featuredProducts = useMemo(() => products.filter(p => p.bestseller || p.isNewArrival).slice(0, 4), [products]);
    const latestBlogs = useMemo(() => [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3), []);
    
    const customBuilders = [
        { id: 'juzu', label: "Juzu", href: "/prayer-bead-builder/Juzu", imageUrl: "https://i.postimg.cc/xCz9v67F/Juzu-beads.webp", altText: "Japanese Juzu prayer beads" },
        { id: 'tesbih', label: "Tesbih", href: "/prayer-bead-builder/Tesbih", imageUrl: "https://i.postimg.cc/8zZkNJMw/Tesbih.webp", altText: "Islamic Tesbih" },
        { id: 'rosary', label: "Rosary", href: "/custom-rosary-configurator", imageUrl: "https://i.postimg.cc/43nfdf1G/Rosary.webp", altText: "Christian Rosary" }
    ];
    const amberGuideLinks = [
        { label: "History", href: "/amber/history", imageUrl: "https://placehold.co/600x600/8A5E3C/FFFFFF?text=History" },
        { label: "Colors & Tones", href: "/policies/colors-and-tones", imageUrl: "https://placehold.co/600x600/C8A97E/2a2a2a?text=Colors" },
        { label: "Authentication", href: "/amber/authentication", imageUrl: "https://placehold.co/600x600/88929B/FFFFFF?text=Science" }
    ];
    const policyLinks = [
        { label: "Our Guarantee", href: "/our-guarantee" },
        { label: "Shipping & Delivery", href: "/policies/shipping" },
        { label: "Warranty", href: "/policies/warranty" },
        { label: "Returns", href: "/policies/returns" },
        { label: "Care Guide", href: "/policies/care-guide" }
    ];

    // Flip card interaction handlers
    const handleCardInteraction = (id: string, isEntering: boolean) => { if (window.innerWidth >= 1024) setFlippedCardId(isEntering ? id : null); };
    const handleCardClick = (id: string) => { setFlippedCardId(prevId => (prevId === id ? null : id)); };

    return (
        <div className="overflow-x-hidden" data-sb-object-id={objectId}>
            <SEO title={pageContent?.title || "Vicky LuxGems — Burmese Amber & Fine Gemstones"} description={pageContent?.heroSubtitle || "Curated overview of Burmese amber, custom jewelry, collections, and learning hub."} />
            
            <section data-hero className="lp-hero h-screen min-h-[600px] flex items-center justify-center text-center">
                <div className="hero-parallax-wrapper"><div ref={heroBgRef} className="hero-parallax-bg"><HeroSlideshow images={HERO_SLIDESHOW_IMAGES} /></div></div>
                <div className="relative z-10 glass max-w-2xl mx-4">
                    <img src="https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets@main/vkluxgem%20logo%20smll.webp" alt="Vicky LuxGems Logo" className="hero-logo" />
                    <h1 className="hero-headline" data-sb-field-path="heroTitle">{pageContent?.heroTitle || 'Vicky LuxGems'}</h1>
                    <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-[var(--c-text-primary)] font-serif" data-sb-field-path="heroSubtitle">{pageContent?.heroSubtitle || "The Heart of Myanmar's Treasures"}</h2>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/collection" className="lp-cta text-lg gold-frame-button">Shop Burmese Amber</Link>
                        <Link to="/custom-jewelry" className="font-semibold text-[var(--c-text-primary)] hover:text-[var(--c-heading)] transition-colors group">
                            Custom Jewelry <span className="transition-transform group-hover:translate-x-1 inline-block">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                <section className="lp-section lp-section-dark">
                    <div className="container trust-strip"><div className="trust-badge"><ShieldIcon /><span>Authenticity Guarantee</span></div><div className="trust-badge"><GlobeIcon /><span>Worldwide Shipping</span></div><div className="trust-badge"><StarIcon /><span>Master Craftsman Quality</span></div></div>
                </section>
                <section className="lp-section lp-section-light">
                    <div className="container"><h2 className="text-4xl font-bold text-center">New & Notable</h2><SectionDivider /><div className="grid-2-3-4">{featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}</div><div className="text-center mt-12"><Link to="/collection" className="lp-cta gold-frame-button">View All Products</Link></div></div>
                </section>
                <section className="lp-section lp-section-dark">
                    <div className="container"><h2 className="text-4xl font-bold text-center">Custom Creations</h2><SectionDivider /><div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">{customBuilders.map((builder) => (<div key={builder.id} className={`flipping-card ${flippedCardId === builder.id ? 'is-flipped' : ''}`} onMouseEnter={() => handleCardInteraction(builder.id, true)} onMouseLeave={() => handleCardInteraction(builder.id, false)} onClick={() => handleCardClick(builder.id)} role="button" tabIndex={0}><div className="flipping-card-inner relative aspect-[4/3]"><div className="flipping-card-front w-full h-full"><div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden group"><LazyImage src={builder.imageUrl} alt={builder.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 gold-frame" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div><div className="absolute bottom-0 left-0 right-0 p-6 dark-context"><h3 className="text-3xl font-bold font-serif">{builder.label}</h3></div></div></div><div className="flipping-card-back w-full h-full shadow-2xl dark-context"><div><p className="text-sm leading-relaxed">Design a personal piece for devotion and meditation.</p><Link to={builder.href} className="mt-6 inline-block font-semibold border-b-2 border-white/50 hover:border-white transition-colors pb-1" onClick={(e) => e.stopPropagation()}>Start Building</Link></div></div></div></div>))}</div></div>
                </section>

                <InfographicSection />

                <section className="lp-section lp-section-light">
                    <div className="container"><h2 className="text-4xl font-bold text-center">Amber Knowledge</h2><SectionDivider /><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{amberGuideLinks.map(link => (<Link to={link.href} key={link.href} className="lp-card group block p-6 text-center"><LazyImage src={link.imageUrl} alt={link.label} className="w-full h-40 object-cover rounded-md mb-4 gold-frame" /><h3 className="text-2xl font-semibold group-hover:text-[var(--c-accent-primary)] transition-colors">{link.label}</h3></Link>))}</div><div className="text-center mt-12"><Link to="/amber-guide" className="lp-cta gold-frame-button">See the Full Guide</Link></div></div>
                </section>
                <section className="lp-section lp-section-dark">
                    <div className="container max-w-4xl mx-auto text-center"><h2 className="text-4xl font-bold text-center">Our Promise</h2><SectionDivider /><div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">{policyLinks.map(link => (<Link to={link.href} key={link.href} className="font-semibold text-lg hover:text-white transition-colors">{link.label}</Link>))}</div></div>
                </section>
                <section className="lp-section lp-section-light">
                    <div className="container"><h2 className="text-4xl font-bold text-center">From the Journal</h2><SectionDivider /><div className="grid-2-3-4">{latestBlogs.map((post) => (<Link to={`/blog/${post.id}`} key={post.id} className="lp-card group block overflow-hidden"><div className="aspect-w-16 aspect-h-9 overflow-hidden"><LazyImage src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 gold-frame" /></div><div className="p-6"><h3 className="text-2xl mt-2 leading-tight group-hover:text-[var(--c-accent-primary)] transition-colors">{post.title}</h3><p className="mt-3 opacity-90 text-base line-clamp-2">{post.summary}</p></div></Link>))}</div><div className="text-center mt-12"><Link to="/blog" className="lp-cta gold-frame-button">All Posts</Link></div></div>
                </section>
                <section className="lp-section lp-section-dark">
                    <div className="container max-w-4xl mx-auto text-center"><h2 className="text-4xl font-bold text-center">We’re Here to Help</h2><SectionDivider /><div className="flex justify-center items-center gap-8"><Link to="/contact" className="font-semibold text-xl hover:text-white transition-colors">Contact Us</Link><Link to="/faqs" className="font-semibold text-xl hover:text-white transition-colors">FAQs</Link></div></div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
