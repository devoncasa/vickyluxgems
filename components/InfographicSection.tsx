

import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon } from './IconComponents.tsx';

const InfographicSection: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
    const lastScrollY = useRef(0);
    const scrollDirectionRef = useRef<'up' | 'down' | null>(null);
    const isFooterVisible = useRef(false);
    const footerObserverRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const footer = document.querySelector('footer.footer-with-bg');
        if (!footer) return;

        const observer = new IntersectionObserver(([entry]) => {
            isFooterVisible.current = entry.isIntersecting;
            if (isFooterVisible.current && scrollDirectionRef.current === 'down') {
                setIsExpanded(true);
            }
        }, { threshold: 0.1 });

        observer.observe(footer);
        footerObserverRef.current = observer;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 10) { 
                scrollDirectionRef.current = 'up';
            } else if (currentScrollY > lastScrollY.current) {
                scrollDirectionRef.current = 'down';
            } else if (currentScrollY < lastScrollY.current) {
                scrollDirectionRef.current = 'up';
            }
            lastScrollY.current = currentScrollY;

            if (scrollDirectionRef.current === 'up') {
                setIsExpanded(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (footerObserverRef.current) {
                footerObserverRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!isExpanded || !contentRef.current) {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            return;
        }

        const animateCounters = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    const target = +el.getAttribute('data-target')!;
                    const decimalPlaces = +el.getAttribute('data-decimal')! || 0;
                    const duration = 2000;
                    let start = 0;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= target) {
                            el.innerText = target.toFixed(decimalPlaces);
                            clearInterval(timer);
                        } else {
                            el.innerText = start.toFixed(decimalPlaces);
                        }
                    }, stepTime);

                    observer.unobserve(el);
                }
            });
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stat-number')) {
                        animateCounters([entry], obs);
                    } else {
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
                }
            });
        }, { root: contentRef.current, threshold: 0.1 });

        observerRef.current = observer;
        const elements = contentRef.current.querySelectorAll('.fade-in-up, .stat-number');
        elements.forEach(el => observer.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isExpanded]);
    
    const handleTeaserClick = () => {
        setIsExpanded(prev => !prev);
    };

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    };
    
    const handleCardMouseEnter = (cardId: string) => {
        if (window.innerWidth > 1023) {
            setFlippedCardId(cardId);
        }
    };

    const handleCardMouseLeave = () => {
        if (window.innerWidth > 1023) {
            setFlippedCardId(null);
        }
    };

    const handleCardClick = (e: React.MouseEvent, cardId: string) => {
        e.stopPropagation();
        if (window.innerWidth <= 1023) {
            setFlippedCardId(prevId => (prevId === cardId ? null : cardId));
        }
    };


    const styles = `
        .expandable-infographic-section {
            background-color: #FDFBF8;
            transition: all 0.5s ease-in-out;
            position: relative;
            border-top: 1px solid var(--c-border);
            border-bottom: 1px solid var(--c-border);
        }
        .infographic-teaser {
            height: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background-size: cover;
            background-position: center;
            position: relative;
            color: white;
            transition: opacity 0.5s ease, height 0.7s ease, padding 0.7s ease, visibility 0.7s;
            cursor: pointer;
        }
        .expandable-infographic-section.expanded .infographic-teaser {
            opacity: 0;
            height: 0;
            padding: 0;
            visibility: hidden;
            pointer-events: none;
        }
        .infographic-teaser::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(61, 53, 46, 0.8) 0%, rgba(61, 53, 46, 0.45) 100%);
            z-index: 1;
        }
        .infographic-teaser > * {
            position: relative;
            z-index: 2;
        }
        .hover-prompt {
            transition: opacity 0.5s ease 0.3s;
            margin-top: 1rem;
            font-family: 'Tenor Sans', sans-serif;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            border: 1px solid rgba(255,255,255,0.7);
            border-radius: 9999px;
            backdrop-filter: blur(2px);
        }
        
        .infographic-content-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            position: relative;
        }
        .expandable-infographic-section.expanded .infographic-content-wrapper {
            grid-template-rows: 1fr;
        }
        .infographic-content-wrapper > div {
            overflow: hidden;
        }

        .infographic-section {
            padding: 4rem 1rem;
            position: relative;
            font-family: 'Tenor Sans', sans-serif;
            color: #3a3a3a;
        }
        .infographic-section h1, .infographic-section h2, .infographic-section h3 {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 700;
        }
        .section-bg-wrapper {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 0;
            overflow: hidden;
        }
        .section-bg {
            width: 100%; height: 100%;
            background-size: cover;
            background-position: center center;
            background-attachment: fixed;
        }
        .section-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(253, 251, 248, 0.5);
        }
        .content-container {
            position: relative;
            z-index: 1;
        }
        .stat-number {
            font-family: 'Cormorant Garamond', serif;
            font-size: 4rem;
            line-height: 1;
            color: #904a21;
            font-weight: 700;
        }
        .stat-label {
            font-family: 'Tenor Sans', sans-serif;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #80513d; /* Darker Clay for WCAG AA contrast */
            margin-top: 0.5rem;
        }
        .gem-card {
            background-color: transparent;
            perspective: 1000px;
            min-height: 280px;
            cursor: pointer;
        }
        .gem-card-inner {
            position: relative; width: 100%; height: 100%;
            text-align: left;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            box-shadow: 0 10px 30px rgba(0,0,0,0.07);
            border-radius: 0.5rem;
        }
        .gem-card-inner.is-flipped {
            transform: rotateY(180deg);
        }
        .gem-card-front, .gem-card-back {
            position: absolute;
            width: 100%; height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            background-color: rgba(255, 255, 255, 0.7);
            border: 1px solid #B49B5E;
            border-radius: 0.5rem;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .gem-card-front img {
            height: 120px;
            width: 100%;
            object-fit: cover;
            border-radius: 0.25rem;
            margin-bottom: 1rem;
        }
        .gem-card-back {
            transform: rotateY(180deg);
            background-color: #A97C50;
            color: #FDFBF8;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
            padding: 1rem;
        }
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item {
            position: relative;
            padding-left: 2.5rem;
            padding-bottom: 2rem;
            border-left: 2px solid #B49B5E;
        }
        .timeline-item:last-child {
            border-left: 2px solid transparent;
        }
        .timeline-dot {
            position: absolute;
            left: -0.6rem;
            top: 0;
            height: 1.2rem;
            width: 1.2rem;
            background-color: #904a21;
            border-radius: 50%;
            border: 3px solid #FDFBF8;
        }
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 2rem;
            background-color: rgba(255,255,255,0.6);
            border-radius: 0.5rem;
            overflow:hidden;
        }
        .comparison-table th, .comparison-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid rgba(180, 155, 94, 0.2);
        }
        .comparison-table th {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.5rem;
            color: #904a21;
        }
        .comparison-table .highlight {
            color: #904a21;
            font-weight: bold;
        }
        .animate-fade-in-slow {
            animation: fadeInSlow 1.5s ease-out forwards;
        }
        @keyframes fadeInSlow {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    return (
        <section 
            className={`expandable-infographic-section ${isExpanded ? 'expanded' : ''}`}
            role="region"
            aria-labelledby="infographic-title"
        >
            <style>{styles}</style>
            
            <div 
                className="infographic-teaser dark-context" 
                onClick={handleTeaserClick}
                role="button"
                aria-expanded={isExpanded}
                tabIndex={0}
                style={{backgroundImage: "url('https://i.postimg.cc/yY0H0PRS/vkgems-info-Stories-in-Stone-Legendary-Gems-background.webp')"}}
            >
                <h2 id="infographic-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-shadow-strong px-4 animate-fade-in-slow">Click here for infographic about Burmese Amber</h2>
                <div className="hover-prompt" style={{opacity: 1}}>Click or Scroll Down to Explore</div>
            </div>

            <div className={`infographic-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
                <div ref={contentRef}>
                     <button 
                        onClick={handleCloseClick} 
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 lg:hidden"
                        aria-label="Close infographic"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                    <header className="text-center py-16 px-4 infographic-section" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#904a21] mb-4">The Treasures of Myanmar</h1>
                        <p className="text-xl max-w-3xl mx-auto text-gray-600">A journey into the ancient origins and geological wonders of Burmese Amber and the world's most coveted gemstones.</p>
                    </header>
                    <main>
                        {/* Part 1: Burmese Amber */}
                        <section id="amber" className="infographic-section">
                            <div className="section-bg-wrapper">
                                <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/Z5jXLD50/vkgems-info-amber-forest-backgroound.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 text-center content-container">
                                <h2 className="text-4xl md:text-5xl mb-4 fade-in-up">Burmese Amber</h2>
                                <h3 className="text-2xl md:text-3xl text-gray-500 mb-12 fade-in-up" style={{transitionDelay: '100ms'}}>A 100-Million-Year-Old Time Capsule</h3>
                                
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center mb-16">
                                    <div className="fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <div className="stat-number" data-target="99">0</div>
                                        <div className="stat-label">Million Years Old</div>
                                        <p className="mt-4 text-gray-600">Formed in the Cretaceous period, offering a direct link to the age of dinosaurs.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '300ms'}}>
                                        <div className="stat-number" data-target="1000">0</div>
                                        <div className="stat-label">Extinct Species</div>
                                        <p className="mt-4 text-gray-600">The most diverse range of prehistoric life found in any amber on Earth.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <div className="stat-number" data-target="2.8" data-decimal="1">0</div>
                                        <div className="stat-label">Mohs Hardness</div>
                                        <p className="mt-4 text-gray-600">Significantly harder and more durable than most other types of amber.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '500ms'}}>
                                        <div className="stat-number" data-target="15">0</div>
                                        <div className="stat-label">China's Amber Market %</div>
                                        <p className="mt-4 text-gray-600">Represents a significant portion of the high-end amber market in Asia.</p>
                                    </div>
                                </div>

                                <div className="max-w-4xl mx-auto fade-in-up" style={{transitionDelay: '600ms'}}>
                                    <h3 className="text-3xl mb-6">Inclusions: A Prehistoric Zoo</h3>
                                     <div className="flex flex-wrap justify-center items-center gap-4 text-lg">
                                        <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">Insects & Arachnids</span>
                                        <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-fire mr-2" viewBox="0 0 16 16">
                                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 8.249 7 7.5 7 7.5c-.101-.998.434-2.008 1.492-2.008.556 0 1.153.448 1.5.998.386.603.448 1.207.125 1.75h-.002c-.078.166-.178.332-.28.5C9.5 9.5 9 10.5 9 11.25c0 1.5-1.343 2.75-3 2.75"/>
                                            </svg>
                                            Dinosaur Feathers
                                        </span>
                                        <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">Snakes & Lizards</span>
                                        <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">Marine Life</span>
                                        <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">Ancient Flowers</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section id="timeline" className="infographic-section">
                            <div className="section-bg-wrapper">
                                <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/26gsZb8w/vkamber-info-The-Journey-of-Burmite-background.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 content-container">
                                <h2 className="text-4xl md:text-5xl mb-12 text-center fade-in-up">The Journey of Burmite</h2>
                                <div className="max-w-2xl mx-auto">
                                    <div className="timeline-item fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <div className="timeline-dot"></div>
                                        <h3 className="text-2xl mb-2">~99 Million Years Ago (Cretaceous)</h3>
                                        <p className="text-gray-600">Coniferous trees in a tropical coastal forest in what is now Myanmar produce vast amounts of resin. This resin traps local flora and fauna, from insects to dinosaur feathers.</p>
                                    </div>
                                    <div className="timeline-item fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <div className="timeline-dot"></div>
                                        <h3 className="text-2xl mb-2">1st Century AD</h3>
                                        <p className="text-gray-600">First documented historical records show that Burmite is known and commercially exploited for trade and jewelry.</p>
                                    </div>
                                    <div className="timeline-item fade-in-up" style={{transitionDelay: '600ms'}}>
                                        <div className="timeline-dot"></div>
                                        <h3 className="text-2xl mb-2">Mid-19th Century</h3>
                                        <p className="text-gray-600">Burmese Amber becomes known to Western science, sparking interest in its unique paleontological value.</p>
                                    </div>
                                    <div className="timeline-item fade-in-up" style={{transitionDelay: '800ms'}}>
                                        <div className="timeline-dot"></div>
                                        <h3 className="text-2xl mb-2">Present Day</h3>
                                        <p className="text-gray-600">Recognized as a treasure for both gemology and science, Burmite is highly prized by collectors, jewelers, and researchers worldwide for its beauty and the secrets it holds.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section id="gemstones" className="infographic-section">
                            <div className="section-bg-wrapper">
                                <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/zGq9K159/vkgems-info-gemstones-mine-background.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 text-center content-container">
                                <h2 className="text-4xl md:text-5xl mb-4 fade-in-up">Myanmar's Gemstone Legacy</h2>
                                <h3 className="text-2xl md:text-3xl text-gray-500 mb-12 fade-in-up" style={{transitionDelay: '100ms'}}>The Cradle of Jewels</h3>

                                <div className="grid md:grid-cols-3 gap-12 text-center mb-16">
                                    <div className="fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <div className="stat-number" data-target="90">0</div>
                                        <div className="stat-label">% Of World's Rubies</div>
                                        <p className="mt-4 text-gray-600">Historically, the legendary Mogok Valley has been the premier source of the finest rubies.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '300ms'}}>
                                        <div className="stat-number" data-target="70">0</div>
                                        <div className="stat-label">% Of Quality Jadeite</div>
                                        <p className="mt-4 text-gray-600">Myanmar is the world's powerhouse for high-quality jadeite, including Imperial Jade.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <div className="stat-number" data-target="30">0</div>
                                        <div className="stat-label">Million USD for a Ruby</div>
                                        <p className="mt-4 text-gray-600">"The Sunrise Ruby," a 25.59-carat Burmese gem, set a world record.</p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '500ms'}} onClick={(e) => handleCardClick(e, 'amber')} onMouseEnter={() => handleCardMouseEnter('amber')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'amber' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/vHrJ4mRr/vkgems-info-amber-flipping-card.webp" alt="A polished piece of Burmese Amber with a prehistoric insect inclusion."/><div><h3 className="text-2xl mb-2">Burmese Amber</h3><p><strong>Hardness:</strong> 2.5 - 3.0 Mohs</p><p><strong>Defining Trait:</strong> A 99-million-year-old time capsule.</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>Burmite: A Prehistoric Time Capsule</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">The world's oldest amber, Burmite is a 99-million-year-old time capsule offering a direct portal to the age of dinosaurs.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Hukawng Valley, Myanmar</li><li><strong>Identifier:</strong> Superior hardness & Cretaceous-era inclusions.</li><li><strong>Belief:</strong> Holds ancient Earth wisdom for grounding and protection.</li><li><strong>Did You Know?:</strong> It's the only amber known to contain non-avian dinosaur feathers.</li></ul></div></div></div></div>
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '600ms'}} onClick={(e) => handleCardClick(e, 'ruby')} onMouseEnter={() => handleCardMouseEnter('ruby')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'ruby' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/QNTGrb0n/vkgems-info-ruby-flipping-card.webp" alt="A vibrant, deep red Mogok Ruby gemstone."/><div><h3 className="text-2xl mb-2">Ruby</h3><p><strong>Hardness:</strong> 9 Mohs</p><p><strong>Defining Trait:</strong> The legendary "Pigeon's Blood" red.</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>The Essence of Ruby: A Stone of Kings</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">Revered as the 'King of Gems,' ruby from Myanmar's Mogok Valley is the ultimate historical talisman of power, passion, and protection.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Mogok Valley, Myanmar</li><li><strong>Identifier:</strong> 'Pigeon's Blood' red color with a strong natural glow.</li><li><strong>Belief:</strong> A talisman for vitality, courage, and passion.</li><li><strong>Did You Know?:</strong> Ancient Burmese warriors embedded rubies in their skin for invincibility.</li></ul></div></div></div></div>
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '700ms'}} onClick={(e) => handleCardClick(e, 'sapphire')} onMouseEnter={() => handleCardMouseEnter('sapphire')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'sapphire' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/TYC1h47Q/vkgems-info-sapphire-flipping-card-1.webp" alt="A velvety, royal blue Burmese Sapphire."/><div><h3 className="text-2xl mb-2">Sapphire</h3><p><strong>Hardness:</strong> 9 Mohs</p><p><strong>Defining Trait:</strong> A rich, intense, and velvety "Burma Blue" color.</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>Burma Blue: A Glimpse of the Celestial</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">The benchmark for celestial gems, the velvety 'Burma Blue' sapphire is a timeless symbol of wisdom, nobility, and divine truth.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Mogok, Myanmar</li><li><strong>Identifier:</strong> Rich, velvety 'Royal Blue' hue that holds its color in any light.</li><li><strong>Belief:</strong> A stone of wisdom, clarity, and spiritual connection.</li><li><strong>Did You Know?:</strong> Fine Burmese sapphires can be more valuable than diamonds.</li></ul></div></div></div></div>
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '800ms'}} onClick={(e) => handleCardClick(e, 'jadeite')} onMouseEnter={() => handleCardMouseEnter('jadeite')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'jadeite' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/1X6Lcm8Z/vkgems-info-jadeite-flipping-card.webp" alt="A piece of translucent, Imperial Green Jadeite."/><div><h3 className="text-2xl mb-2">Jadeite</h3><p><strong>Hardness:</strong> 6.5 - 7 Mohs</p><p><strong>Defining Trait:</strong> The vibrant, translucent green known as "Imperial Jade."</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>Imperial Jadeite: The Stone of Heaven</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">More than a gem, prized 'Imperial Green' jadeite is a spiritual conduit believed to bridge the physical and metaphysical worlds.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Hpakant, Myanmar</li><li><strong>Identifier:</strong> Vibrant, semi-translucent green with a characteristic oily luster.</li><li><strong>Belief:</strong> Embodies wisdom and courage; a protector that brings good fortune.</li><li><strong>Did You Know?:</strong> Jadeite is much rarer than Nephrite, the other jade, and can be one of the most expensive gems per carat.</li></ul></div></div></div></div>
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '900ms'}} onClick={(e) => handleCardClick(e, 'spinel')} onMouseEnter={() => handleCardMouseEnter('spinel')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'spinel' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/R0p5vpk2/vkgems-info-spinel-flipping-card.webp" alt="A collection of fiery red and pink Spinel gemstones."/><div><h3 className="text-2xl mb-2">Spinel</h3><p><strong>Hardness:</strong> 8 Mohs</p><p><strong>Defining Trait:</strong> A fiery array of colors, especially vibrant red and pink.</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>Spinel: The Great Impostor of Royalty</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">Famously mistaken for ruby in crown jewels, spinel is now celebrated for its exceptional brilliance and fiery range of vibrant colors.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Mogok & Pein Pyit, Myanmar</li><li><strong>Identifier:</strong> Brilliant fire, often surpassing ruby, in a vast color range.</li><li><strong>Belief:</strong> A stone of revitalization, hope, and new beginnings.</li><li><strong>Did You Know?:</strong> The UK's 'Black Prince's Ruby' is actually a massive 170-carat red spinel.</li></ul></div></div></div></div>
                                    <div className="gem-card fade-in-up" style={{transitionDelay: '1000ms'}} onClick={(e) => handleCardClick(e, 'peridot')} onMouseEnter={() => handleCardMouseEnter('peridot')} onMouseLeave={handleCardMouseLeave}><div className={`gem-card-inner ${flippedCardId === 'peridot' ? 'is-flipped' : ''}`}><div className="gem-card-front"><img src="https://i.postimg.cc/NMyhF7YF/vkgems-info-peridot-flipping-card.webp" alt="A brilliant, olive-green Peridot gemstone."/><div><h3 className="text-2xl mb-2">Peridot</h3><p><strong>Hardness:</strong> 6.5 - 7 Mohs</p><p><strong>Defining Trait:</strong> A distinctive and brilliant olive or "bottle-green" hue.</p></div></div><div className="gem-card-back"><div className="text-sm w-full"><h4 className="text-lg font-bold mb-2 text-white" style={{fontFamily: "'Cormorant Garamond', serif"}}>Peridot: Gem of the Sun</h4><p className="mb-3 text-white/90 text-xs leading-relaxed">Famed for its unique olive-green glow that never changes, peridot has been treasured for over 3,500 years as a symbol of light and renewal.</p><ul className="space-y-1 text-xs text-white/90 list-disc list-inside"><li><strong>Source:</strong> Pyaung Gaung, Myanmar</li><li><strong>Identifier:</strong> Its signature olive-green color comes from its core chemical structure.</li><li><strong>Belief:</strong> A stone of compassion that balances emotions and protects from negativity.</li><li><strong>Did You Know?:</strong> Historians believe Cleopatra's famed 'emeralds' were actually fine peridots.</li></ul></div></div></div></div>
                                </div>
                            </div>
                        </section>

                        <section id="stories" className="infographic-section">
                            <div className="section-bg-wrapper">
                                <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/yY0H0PRS/vkgems-info-Stories-in-Stone-Legendary-Gems-background.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 content-container">
                                <h2 className="text-4xl md:text-5xl mb-12 text-center fade-in-up">Stories in Stone: Legendary Gems</h2>
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className="text-left fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <h3 className="text-3xl mb-4">The Sunrise Ruby</h3>
                                        <p className="text-lg text-gray-600 mb-4">The Sunrise Ruby is a 25.59-carat Burmese ruby from Mogok, famed for its vivid "pigeon's blood" color. Sold for over $30 million USD, it holds the record as the most expensive ruby ever auctioned, outpricing even many diamonds per carat.</p>
                                        <p className="text-gray-600">Its unmatched purity, size, and saturation—certified as unheated—established Burmese rubies as the world’s most valuable colored gemstones. Named after a poem by Rumi, this gem is more than rare—it’s a modern legend in high jewelry.</p>
                                    </div>
                                    <div className="fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <img src="https://i.postimg.cc/8zHg0ztp/vkgems-info-sunrise-ruby.webp" alt="The Sunrise Ruby, a legendary 25.59-carat Burmese ruby famed for its vivid 'pigeon's blood' color." className="rounded-lg shadow-lg w-full h-auto"/>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
                                     <div className="fade-in-up md:order-2" style={{transitionDelay: '200ms'}}>
                                        <img src="https://i.postimg.cc/05Tv63zs/vkgems-info-Emperial-Jade.webp" alt="Imperial Jade, the finest grade of jadeite from Myanmar, prized for its glowing emerald-green hue." className="rounded-lg shadow-lg w-full h-auto"/>
                                    </div>
                                    <div className="text-left fade-in-up md:order-1" style={{transitionDelay: '400ms'}}>
                                        <h3 className="text-3xl mb-4">Imperial Jade</h3>
                                        <p className="text-lg text-gray-600 mb-4">Imperial Jade from Hpakant, Myanmar, is the finest grade of jadeite, prized for its glowing emerald-green hue and smooth, oily luster. Once reserved for Chinese emperors, it symbolizes protection, harmony, and spiritual connection.</p>
                                        <p className="text-gray-600">Revered for millennia in East Asian cultures, Imperial Jade is not just a gem—it’s a sacred stone believed to bridge the physical and spiritual worlds while attracting luck and longevity to its wearer.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="comparison-table" className="infographic-section">
                            <div className="section-bg-wrapper">
                                <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/yN8C4CbF/vkamber-info-Myanmar-vs-The-World-A-Gemstone-Showdown-background.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 content-container">
                                <h2 className="text-4xl md:text-5xl mb-12 text-center fade-in-up">Myanmar vs. The World: A Gemstone Showdown</h2>
                                <div className="overflow-x-auto fade-in-up" style={{transitionDelay: '200ms'}}>
                                    <table className="comparison-table">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Burmese (Myanmar) Ruby</th>
                                                <th>African (Mozambique) Ruby</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Color</strong></td>
                                                <td className="highlight">"Pigeon's Blood" - a pure, vivid red with strong red fluorescence.</td>
                                                <td>Can be beautiful, but often has a slight orange or purplish secondary tone.</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Clarity</strong></td>
                                                <td>Often contains fine, silk-like rutile inclusions that give it a soft, velvety glow.</td>
                                                <td>Typically has higher clarity with fewer large inclusions than Burmese rubies.</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Fluorescence</strong></td>
                                                <td className="highlight">Strong to intense red fluorescence under UV light, making it glow even in daylight.</td>
                                                <td>Lower to medium fluorescence due to higher iron content.</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Rarity & Value</strong></td>
                                                <td>Extremely rare, especially in larger sizes. The global benchmark for value.</td>
                                                <td>More readily available, making it a more accessible but generally less valuable alternative.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                         <section id="map" className="infographic-section">
                            <div className="section-bg-wrapper">
                                 <div className="section-bg" style={{backgroundImage: "url('https://i.postimg.cc/66fs33xd/vkamber-info-Geographic-Origin-background.webp')"}}></div>
                                <div className="section-overlay"></div>
                            </div>
                            <div className="container mx-auto px-4 content-container">
                                <h2 className="text-4xl md:text-5xl mb-12 text-center fade-in-up">Geographic Origin</h2>
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <img src="https://i.postimg.cc/Gmr1KyPg/vkgems-info-Geographic-Origin-background.webp" alt="Map of Myanmar showing key gemstone mining locations like Mogok, Hpakant, and the Hukawng Valley." className="rounded-lg shadow-lg w-full h-auto max-w-sm mx-auto"/>
                                    </div>
                                    <div className="text-left fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <h3 className="text-3xl mb-4">The Land of Jewels</h3>
                                        <p className="text-lg text-gray-600 mb-4">Myanmar's unique geological history, born from the collision of tectonic plates, created the perfect conditions for these rare treasures to form. The mountainous regions in the north are particularly rich.</p>
                                        <ul className="space-y-2">
                                            <li><strong className="text-[#904a21]">Hukawng Valley:</strong> The world's primary source of Cretaceous-era Burmese Amber.</li>
                                            <li><strong className="text-[#904a21]">Mogok Stone Tract:</strong> A legendary valley so rich in gems it's often called "The Valley of Rubies." It also produces world-class Sapphires and Spinels.</li>
                                            <li><strong className="text-[#904a21]">Hpakant:</strong> The epicenter of high-quality Jadeite mining, producing the coveted Imperial Jade.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="comparison" className="infographic-section">
                            <div className="container mx-auto px-4 text-center content-container">
                                 <h2 className="text-4xl md:text-5xl mb-12 fade-in-up">Organic vs. Mineral: A Tale of Two Treasures</h2>
                                 <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-left">
                                    <div className="bg-amber-50 p-8 rounded-lg border border-amber-200 fade-in-up" style={{transitionDelay: '200ms'}}>
                                        <h3 className="text-3xl mb-4">Burmese Amber</h3>
                                        <ul className="space-y-4 text-lg">
                                            <li className="flex items-start"><span className="text-amber-500 mr-3 mt-1">&#10003;</span> <strong>Origin:</strong> Organic (Fossilized Tree Resin)</li>
                                            <li className="flex items-start"><span className="text-amber-500 mr-3 mt-1">&#10003;</span> <strong>Age:</strong> ~99 Million Years</li>
                                            <li className="flex items-start"><span className="text-amber-500 mr-3 mt-1">&#10003;</span> <strong>Hardness:</strong> Soft (2.5 - 3 Mohs)</li>
                                            <li className="flex items-start"><span className="text-amber-500 mr-3 mt-1">&#10003;</span> <strong>Key Feature:</strong> Contains prehistoric life (inclusions)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 fade-in-up" style={{transitionDelay: '400ms'}}>
                                        <h3 className="text-3xl mb-4">Myanmar Gemstones</h3>
                                         <ul className="space-y-4 text-lg">
                                            <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">&#10003;</span> <strong>Origin:</strong> Inorganic (Crystalline Minerals)</li>
                                            <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">&#10003;</span> <strong>Age:</strong> Formed deep in Earth's history</li>
                                            <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">&#10003;</span> <strong>Hardness:</strong> Very Hard (8 - 9 Mohs)</li>
                                            <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">&#10003;</span> <strong>Key Feature:</strong> Valued for color, clarity, and brilliance</li>
                                        </ul>
                                    </div>
                                 </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </section>
    );
};

export default InfographicSection;