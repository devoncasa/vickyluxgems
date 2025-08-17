
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import LiveChatButton from './components/LiveChatButton';
import Accordion from './components/Accordion';
import JourneyInfographic from './components/JourneyInfographic';
import ParallaxSection from './components/ParallaxSection';
import FaqTable from './components/FaqTable';
import RecipeGenerator from './components/RecipeGenerator';
import { PRODUCTS_DATA, FAQ_DATA, HERO_BACKGROUND_IMAGES } from './constants';
import { Product, CartItem } from './types';
import { FiChevronDown, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslations } from './hooks/useTranslations';

const ContentFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={`bg-white/[.85] rounded-xl shadow-lg p-8 md:p-12 backdrop-blur-sm ${className || ''}`}>
            {children}
        </div>
    )
}

const FAQItem: React.FC<{ faqData: any; index: number }> = ({ faqData, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div className="border-b border-stone-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-stone-800"
            >
                <span>{faqData.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FiChevronDown />
                </motion.div>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '1rem' : '0rem' }}
                className="overflow-hidden"
            >
                <div className="text-stone-600 leading-relaxed">{faqData.answerIsTable ? <FaqTable /> : faqData.answer}</div>
            </motion.div>
        </div>
    );
};

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [heroBg, setHeroBg] = useState('');
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
    const { t, isLoading } = useTranslations();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * HERO_BACKGROUND_IMAGES.length);
        setHeroBg(HERO_BACKGROUND_IMAGES[randomIndex]);
    }, []);

    const addToCart = useCallback((product: Product) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === product.id);
            if (exist) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setCartOpen(true);
    }, []);
    
    const requestQuote = useCallback((product: Product) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        alert(`Requesting a quote for: ${t(product.title)}`);
    }, [t]);

    const removeFromCart = useCallback((id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);
    
    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prevItems => prevItems.map(item => item.id === id ? {...item, quantity: quantity} : item));
    }, [removeFromCart]);
    
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const getAccordionItems = (baseKey: string, count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            title: t(`${baseKey}.item${i + 1}Title`),
            content: t(`${baseKey}.item${i + 1}Content`),
            image: i < 3 ? palmyraPalmAccordionItems[i]?.image : healthBenefitsAccordionItems[i]?.image, // Keep existing images for now
        }));
    };
    
    const palmyraPalmAccordionItems = [
        { image: "https://i.postimg.cc/kXg20sL0/borassus-flabellifer-illustration.png", ...t('ourStory.palmyraPalm.items.1') },
        { image: "https://i.postimg.cc/8zQJtV5M/terroir-of-ratchaburi.jpg", ...t('ourStory.palmyraPalm.items.2') },
        { image: "https://i.postimg.cc/bNkTg4sV/tree-of-life-historical.jpg", ...t('ourStory.palmyraPalm.items.3') }
    ].map(item => ({...item, title: t(`ourStory.palmyraPalm.item${item.image.includes('borassus') ? 1 : item.image.includes('terroir') ? 2 : 3}Title`), content: t(`ourStory.palmyraPalm.item${item.image.includes('borassus') ? 1 : item.image.includes('terroir') ? 2 : 3}Content`) }));

    const harvestArtAccordionItems = [
        { image: "https://i.postimg.cc/0jWvM7Nn/farmer-climbing-palm-tree.jpg" },
        { image: "https://i.postimg.cc/VLzJ7GzP/science-of-simmering.jpg" },
        { image: "https://i.postimg.cc/prgQdYvV/nectar-to-crystal.jpg" }
    ].map((item, i) => ({ ...item, title: t(`ourStory.harvestArt.item${i+1}Title`), content: t(`ourStory.harvestArt.item${i+1}Content`) }));

    const commitmentAccordionItems = [
        { image: "https://i.postimg.cc/50tZ8Jp2/ecological-sustainability.jpg" },
        { image: "https://i.postimg.cc/Wb7SgDkj/ratchaburi-farming-community.jpg" },
        { image: "https://i.postimg.cc/XvjL1ZHy/purity-quality-assurance.jpg" },
    ].map((item, i) => ({ ...item, title: t(`ourStory.commitment.item${i+1}Title`), content: t(`ourStory.commitment.item${i+1}Content`) }));
    
    const healthBenefitsAccordionItems = [
        { image: "https://i.postimg.cc/J0P5zKcg/low-glycemic-index.jpg" },
        { image: "https://i.postimg.cc/9M3g0x7r/rich-in-minerals.jpg" },
        { image: "https://i.postimg.cc/44rY4M9W/natural-electrolytes.jpg" },
        { image: "https://i.postimg.cc/pT3Y3g4J/clean-label-promise.jpg" }
    ].map((item, i) => ({ ...item, title: t(`benefits.items.${i+1}.title`), content: t(`benefits.items.${i+1}.content`) }));
    
    const recipesData = [
        { image: "https://i.postimg.cc/d16g9N3q/golden-taan-caramel-latte.jpg", key: 'recipes.items.1' },
        { image: "https://i.postimg.cc/t44TqxP4/gluten-free-palmyra-blondies.jpg", key: 'recipes.items.2' },
        { image: "https://i.postimg.cc/XqM3w0g5/pan-seared-salmon-glaze.jpg", key: 'recipes.items.3' },
        { image: "https://i.postimg.cc/Hnpyk8Kx/smoky-old-fashioned-cocktail.jpg", key: 'recipes.items.4' },
    ];


    if (isLoading) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#FDFBF8] text-amber-900">
                 <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-800"></div>
                 <h1 className="text-2xl font-semibold mt-4">{t('loadingMessage')}</h1>
            </div>
        );
    }

    const translatedProducts = PRODUCTS_DATA.map(product => ({
        ...product,
        title: t(`${product.key}.title`),
        description: t(`${product.key}.description`),
        targetUsers: t(`${product.key}.targetUsers`),
        usp: t(`${product.key}.usp`),
        market: t(`${product.key}.market`),
    }));

    const translatedFaqs = FAQ_DATA.map(faq => t(faq.key));

    return (
        <div className="bg-[#FDFBF8] text-stone-800">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setCartOpen={setCartOpen} cartItemCount={cartItemCount} />
            <Cart isOpen={isCartOpen} setIsOpen={setCartOpen} cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>
            <LiveChatButton />
            
            <main>
                {/* Home Section */}
                <section id="home" className="h-screen min-h-[700px] relative flex items-center justify-center overflow-hidden">
                     <div
                        className="parallax-bg absolute inset-0 z-0"
                        style={{ backgroundImage: `url(${heroBg})` }}
                    >
                         {/* Vignette Overlay */}
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(245, 235, 220, 0.0) 0%, rgba(64, 46, 50, 0.6) 85%)' }} />
                    </div>
                    <div className="absolute inset-0 z-0 filter backdrop-blur-[8px]" />

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center z-10 p-4"
                    >
                        <h1 
                            className="text-4xl md:text-5xl font-bold text-white"
                            style={{ textShadow: '2px 2px 4px rgba(60, 40, 30, 0.7)' }}
                        >
                            {t('hero.title')}
                        </h1>
                        <p 
                            className="mt-4 text-xl md:text-2xl text-white font-medium"
                            style={{ textShadow: '2px 2px 4px rgba(60, 40, 30, 0.7)' }}
                        >
                            {t('hero.subtitle')}
                        </p>
                        <ScrollLink to="products" smooth={true} duration={500} offset={-80} className="mt-8 inline-block bg-amber-800 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-900 transition-colors cursor-pointer transform hover:scale-105 shadow-xl">
                            {t('hero.button')}
                        </ScrollLink>
                    </motion.div>
                </section>

                <JourneyInfographic />

                {/* --- OUR STORY START --- */}
                <ParallaxSection id="legacy">
                    <div className="max-w-5xl mx-auto px-4">
                        <ContentFrame>
                             <div className="text-center mb-8">
                                <img src="https://i.postimg.cc/T3YjD6gQ/golden-taan-legacy-intro.jpg" alt={t('ourStory.legacy.title')} className="w-full h-64 object-cover rounded-lg shadow-md" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-800">{t('ourStory.legacy.title')}</h2>
                                <p className="mt-4 text-lg md:text-xl text-stone-600">{t('ourStory.legacy.subtitle')}</p>
                            </div>
                            
                            <div className="mt-12 text-left space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-800 mb-3">{t('ourStory.legacy.rootsTitle')}</h3>
                                    <p className="text-stone-700 leading-relaxed">{t('ourStory.legacy.rootsText')}</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-800 mb-3">{t('ourStory.legacy.harvestTitle')}</h3>
                                    <p className="text-stone-700 leading-relaxed">{t('ourStory.legacy.harvestText')}</p>

                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-800 mb-3">{t('ourStory.legacy.promiseTitle')}</h3>
                                    <p className="text-stone-700 leading-relaxed">{t('ourStory.legacy.promiseText')}</p>
                                </div>
                            </div>

                            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ScrollLink to="palmyra-palm" smooth={true} duration={500} offset={-80} className="group text-center p-4 cursor-pointer">
                                    <h4 className="font-bold text-amber-800 group-hover:underline">{t('ourStory.legacy.link1')}</h4>
                                    <FiArrowRight className="mx-auto mt-2 text-amber-800/70"/>
                                </ScrollLink>
                                 <ScrollLink to="harvest-art" smooth={true} duration={500} offset={-80} className="group text-center p-4 cursor-pointer">
                                    <h4 className="font-bold text-amber-800 group-hover:underline">{t('ourStory.legacy.link2')}</h4>
                                    <FiArrowRight className="mx-auto mt-2 text-amber-800/70"/>
                                </ScrollLink>
                                 <ScrollLink to="commitment" smooth={true} duration={500} offset={-80} className="group text-center p-4 cursor-pointer">
                                    <h4 className="font-bold text-amber-800 group-hover:underline">{t('ourStory.legacy.link3')}</h4>
                                    <FiArrowRight className="mx-auto mt-2 text-amber-800/70"/>
                                </ScrollLink>
                            </div>
                        </ContentFrame>
                    </div>
                </ParallaxSection>

                <ParallaxSection id="palmyra-palm">
                     <div className="max-w-5xl mx-auto px-4">
                        <ContentFrame>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-800">{t('ourStory.palmyraPalm.title')}</h2>
                                <p className="mt-4 text-lg md:text-xl text-stone-600" dangerouslySetInnerHTML={{ __html: t('ourStory.palmyraPalm.subtitle') }}/>
                            </div>
                            <Accordion items={palmyraPalmAccordionItems} defaultOpenIndex={0} />
                        </ContentFrame>
                    </div>
                </ParallaxSection>
                
                <ParallaxSection id="harvest-art">
                     <div className="max-w-5xl mx-auto px-4">
                        <ContentFrame>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-800">{t('ourStory.harvestArt.title')}</h2>
                                <p className="mt-4 text-lg md:text-xl text-stone-600">{t('ourStory.harvestArt.subtitle')}</p>
                            </div>
                            <Accordion items={harvestArtAccordionItems} defaultOpenIndex={0} />
                        </ContentFrame>
                    </div>
                </ParallaxSection>

                <ParallaxSection id="commitment">
                    <div className="max-w-5xl mx-auto px-4">
                        <ContentFrame>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-stone-800">{t('ourStory.commitment.title')}</h2>
                                <p className="mt-4 text-lg md:text-xl text-stone-600">{t('ourStory.commitment.subtitle')}</p>
                            </div>
                            <Accordion items={commitmentAccordionItems} defaultOpenIndex={0} />
                        </ContentFrame>
                    </div>
                </ParallaxSection>
                {/* --- OUR STORY END --- */}

                {/* Products Section */}
                <ParallaxSection id="products">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       <ContentFrame>
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-bold text-amber-900">{t('products.title')}</h2>
                                <p className="mt-4 text-lg text-stone-600">{t('products.subtitle')}</p>
                            </div>
                            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                {translatedProducts.map((product) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onAddToCart={addToCart} 
                                        onQuoteRequest={requestQuote}
                                        flippedCardId={flippedCardId}
                                        setFlippedCardId={setFlippedCardId}
                                    />
                                ))}
                            </div>
                        </ContentFrame>
                    </div>
                </ParallaxSection>
                
                {/* Health Benefits Section */}
                <ParallaxSection id="benefits">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ContentFrame>
                            <div className="text-center mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">{t('benefits.title')}</h2>
                                <p className="mt-4 text-lg text-stone-600">{t('benefits.subtitle')}</p>
                            </div>
                            <Accordion items={healthBenefitsAccordionItems} defaultOpenIndex={0} />
                        </ContentFrame>
                    </div>
                </ParallaxSection>
                
                {/* Recipes & Usage Section */}
                <ParallaxSection id="recipes">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ContentFrame>
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-bold text-amber-900">{t('recipes.title')}</h2>
                                <p className="mt-4 text-lg text-stone-600">{t('recipes.subtitle')}</p>
                            </div>
                            
                            <RecipeGenerator />

                            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {recipesData.map(recipe => (
                                 <div key={recipe.key} className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
                                    <div className="overflow-hidden">
                                      <img src={recipe.image} alt={t(`${recipe.key}.title`)} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"/>
                                    </div>
                                    <div className="p-6 text-left">
                                      <h3 className="text-lg font-bold text-stone-800 h-14">{t(`${recipe.key}.title`)}</h3>
                                      <p className="mt-2 text-sm text-stone-600">{t(`${recipe.key}.description`)}</p>
                                    </div>
                                 </div>
                              ))}
                            </div>
                        </ContentFrame>
                    </div>
                </ParallaxSection>

                {/* FAQ Section */}
                <ParallaxSection id="faq">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ContentFrame>
                             <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900">{t('faq.title')}</h2>
                             <div className="mt-12">
                                {translatedFaqs.map((faq, index) => (
                                    <FAQItem key={index} faqData={faq} index={index} />
                                ))}
                             </div>
                        </ContentFrame>
                    </div>
                </ParallaxSection>
                
                {/* Contact Section */}
                 <ParallaxSection id="contact">
                    <div className="max-w-6xl mx-auto px-4">
                        <ContentFrame>
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-bold text-amber-900">{t('contact.title')}</h2>
                                <p className="mt-6 text-lg text-stone-600">{t('contact.subtitle')}</p>
                            </div>
                            <div className="mt-16 grid md:grid-cols-2 gap-12 items-start">
                                <div className="space-y-6">
                                    <div className="mb-6">
                                        <img src="https://i.postimg.cc/P5gSz5gd/hero-section-background-0052.webp" alt={t('contact.title')} className="rounded-lg shadow-md w-full h-48 object-cover" />
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-amber-100 p-3 rounded-full text-amber-800 mt-1"><FiMapPin className="w-6 h-6"/></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-stone-800">{t('contact.addressTitle')}</h3>
                                            <p className="text-stone-600">{t('contact.addressText')}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start space-x-4">
                                        <div className="bg-amber-100 p-3 rounded-full text-amber-800 mt-1"><FiPhone className="w-6 h-6"/></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-stone-800">{t('contact.phoneTitle')}</h3>
                                            <p className="text-stone-600">
                                                <a href="tel:+66968615795" className="hover:underline">+66 (0)96 861 5795</a>
                                            </p>
                                            <p className="text-sm text-stone-500">{t('contact.phoneHours')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-amber-100 p-3 rounded-full text-amber-800 mt-1"><FiMail className="w-6 h-6"/></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-stone-800">{t('contact.emailTitle')}</h3>
                                            <p className="text-stone-600">
                                                <a href={`mailto:${t('contact.emailLink')}`} className="hover:underline">{t('contact.emailLink')}</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                     <h3 className="text-2xl font-bold text-stone-800 mb-6">{t('contact.formTitle')}</h3>
                                     <form action={`mailto:${t('contact.emailLink')}`} method="post" encType="text/plain" className="space-y-5">
                                        <input type="text" name="name" placeholder={t('contact.form.name')} required className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"/>
                                        <input type="email" name="email" placeholder={t('contact.form.email')} required className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"/>
                                        <input type="text" name="subject" placeholder={t('contact.form.subject')} required className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"/>
                                        <textarea name="message" placeholder={t('contact.form.message')} rows={5} required className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
                                        <button type="submit" className="w-full bg-amber-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-900 transition-colors text-lg">{t('contact.form.button')}</button>
                                     </form>
                                </div>
                            </div>
                             <div className="pt-8 mt-8 border-t border-stone-200">
                                <iframe 
                                  src="https://maps.google.com/maps?q=Golden%20Taan%2C%2096%2F3%20Moo.2%2C%20T.%20Wanyai%2C%20A.%20Bang%20Phae%2C%20Ratchaburi%2070160%2C%20Thailand&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                  width="100%" 
                                  height="350" 
                                  style={{ border: 0 }} 
                                  allowFullScreen={false}
                                  loading="lazy" 
                                  referrerPolicy="no-referrer-when-downgrade"
                                  className="rounded-lg shadow-md"
                                ></iframe>
                            </div>
                        </ContentFrame>
                    </div>
                </ParallaxSection>
            </main>
            <Footer />
        </div>
    );
};

export default App;