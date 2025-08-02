
import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BEAD_SPECS, SHOP_CATEGORIES, BACKGROUND_IMAGES } from '../constants.ts';
import JsonLd from '../components/JsonLd.tsx';
import SectionDivider from '../components/SectionDivider.tsx';
import { calculateFinalPrice } from '../utils/priceLogic.ts';
import { BeadSize, Product } from '../types.ts';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { useUserPreferences } from '../hooks/useUserPreferences.ts';
import { ChevronDownIcon, StarIcon } from '../components/IconComponents.tsx';
import { useAppContext } from '../context/AppContext.tsx';

interface OutletContextType {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProductFaq: React.FC<{product: Product}> = ({ product }) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState<number | null>(null);

    const faqData = [
        {
            q: t('faq_q1_q'),
            a: t('faq_q1_a')
        },
        {
            q: t('faq_q3_q'),
            a: t('faq_q3_a')
        },
        {
            q: t('faq_q9_q'),
            a: t('faq_q9_a')
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a.replace(/<[^>]*>?/gm, '')
            }
        }))
    };

    const toggle = (index: number) => {
        setOpen(open === index ? null : index);
    }
    
    return (
        <div className="pt-4 border-t border-[var(--c-border)]">
            <JsonLd data={faqSchema} />
            <h3 className="text-xl font-semibold text-[var(--c-heading)] mb-2">Frequently Asked Questions</h3>
            <div className="divide-y divide-[var(--c-border)]">
                {faqData.map((item, index) => (
                    <div key={index} className="py-2">
                        <h4>
                            <button onClick={() => toggle(index)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-[var(--c-text-primary)]">
                                <span>{item.q}</span>
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${open === index ? 'rotate-180' : ''}`} />
                            </button>
                        </h4>
                        <div className={`mt-2 text-sm text-[var(--c-text-secondary)] ps-2 overflow-hidden transition-all duration-300 ease-in-out ${open === index ? 'max-h-40' : 'max-h-0'}`}>
                            <p dangerouslySetInnerHTML={{ __html: item.a }}></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ReviewsSection: React.FC = () => (
    <div className="pt-4 border-t border-[var(--c-border)]">
        <h3 className="text-xl font-semibold text-[var(--c-heading)] mb-2">Customer Reviews</h3>
        <div className="flex items-center gap-2">
            <div className="flex text-[var(--c-accent-secondary-hover)]">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}
            </div>
            <span className="text-sm text-[var(--c-text-secondary)]">Based on 89 reviews</span>
        </div>
        <p className="mt-2 text-sm text-[var(--c-text-secondary)]">
            Displaying customer testimonials here builds trust and provides social proof.
            <em> (Placeholder content)</em>
        </p>
    </div>
);


const ProductDetailPage: React.FC = () => {
    const { productId } = ReactRouterDOM.useParams<{ productId: string }>();
    const { products, addToCart } = useAppContext();
    const { t } = useLanguage();
    const { trackProductView } = useUserPreferences();
    const product = products.find(p => p.id === productId);

    const [selectedBeadSize, setSelectedBeadSize] = useState<BeadSize | null>(product?.specifications.beadSize_mm || null);
    const [mainImage, setMainImage] = useState(product?.media.mainImageUrl);
    const [weightUnit, setWeightUnit] = useState<'g' | 'ct'>('g');
    const [addedToCart, setAddedToCart] = useState(false);
    
    useEffect(() => {
        if (product) {
            setSelectedBeadSize(product.specifications.beadSize_mm || null);
            setMainImage(product.media.mainImageUrl);
            trackProductView(product);
        }
    }, [product, trackProductView]);

    const productCategory = useMemo(() => {
        if (!product) return '';
        
        for (const cat of SHOP_CATEGORIES) {
            if (cat.slug === product.category) return t(cat.name as any);
            if (cat.subCategories) {
                const subCat = cat.subCategories.find(sub => sub.slug === product.category);
                if (subCat) return t(cat.name as any); 
            }
        }
        return product.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }, [product, t]);

    const finalPrice = useMemo(() => {
        if (!product || !selectedBeadSize) return 0;
        
        const sizePrice = product.price; // Start with base price for the default size
        
        if(product.specifications.beadSize_mm) {
             const dynamicPrice = calculateFinalPrice(product, selectedBeadSize);
             return dynamicPrice;
        }

        return sizePrice;
    }, [product, selectedBeadSize]);
    
    const selectedBeadSpec = useMemo(() => {
        if (!selectedBeadSize) return null;
        return BEAD_SPECS.find(spec => spec.size === selectedBeadSize);
    }, [selectedBeadSize]);

    const totalWeightInGrams = useMemo(() => {
        if (!product || !selectedBeadSpec || !product.specifications.beadCount) {
            return product?.specifications.totalWeight_grams || 0;
        }
        return selectedBeadSpec.weight * product.specifications.beadCount;
    }, [product, selectedBeadSpec]);

    const displayWeight = useMemo(() => {
        if (weightUnit === 'ct') {
            return `${(totalWeightInGrams * 5).toFixed(2)} ct`;
        }
        return `${totalWeightInGrams.toFixed(2)} g`;
    }, [totalWeightInGrams, weightUnit]);


    if (!product) {
        return (
            <div className="text-center py-20">
                <SEO 
                    titleKey="seo_product_not_found_title" 
                    descriptionKey="seo_product_not_found_desc"
                    keywordsKey="seo_product_not_found_keywords"
                />
                <h2 className="text-3xl font-semibold">{t('product_not_found_title')}</h2>
                <ReactRouterDOM.Link to="/collection" className="mt-4 inline-block text-[var(--c-accent-primary)] hover:text-[var(--c-heading)]">{t('product_not_found_cta')}</ReactRouterDOM.Link>
            </div>
        );
    }
    
    const seoTitle = `${product.name} (${selectedBeadSize}mm) - Vicky LuxGems`;
    const seoDesc = t('seo_product_detail_desc', { 
        productName: product.name, 
        beadSize: `${selectedBeadSize}mm`,
        material: product.material,
        story: product.story.substring(0, 80) + '...'
    });
    const seoKeywords = t('seo_product_detail_keywords', {
        productName: product.name,
        material: product.material,
        beadSize: `${selectedBeadSize}mm`,
        category: productCategory
    });

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": seoTitle,
        "image": mainImage,
        "description": product.story,
        "sku": `${product.sku}-${selectedBeadSize}MM`,
        "mpn": `${product.sku}-${selectedBeadSize}MM`,
        "brand": {
            "@type": "Brand",
            "name": "Vicky LuxGems"
        },
        "inLanguage": 'en',
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "Vicky S."
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "89"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "THB",
            "price": finalPrice.toFixed(0),
            "availability": product.inventory.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        },
        "additionalProperty": [
            { "@type": "PropertyValue", "name": "Material", "value": product.material },
            { "@type": "PropertyValue", "name": "Origin", "value": product.specifications.origin },
            { "@type": "PropertyValue", "name": "Bead Size", "value": `${selectedBeadSize}mm` }
        ]
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1, selectedBeadSize || undefined);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };
    
    const galleryImages = [
        product.media.mainImageUrl,
        ...product.media.gallery,
    ].filter(Boolean).slice(0, 5);
    
    while (galleryImages.length < 5) {
        galleryImages.push(`https://placehold.co/100x100/F0EBE6/7E746A?text=View`);
    }

    return (
        <div 
            className="page-container-with-bg"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[30]}')` }}
        >
            <SEO
                title={seoTitle}
                description={seoDesc}
                keywords={seoKeywords}
                imageUrl={mainImage}
                type="product"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <JsonLd data={productSchema} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery */}
                    <div>
                        <div className="aspect-square bg-[var(--c-surface-alt)] rounded-lg shadow-lg overflow-hidden mb-4 border border-[var(--c-border)] flex items-center justify-center">
                            <img src={mainImage} alt={`Detailed view of the ${product.name}, showcasing its ${product.material} beads. An ideal piece of crystal healing jewelry.`} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {galleryImages.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className={`aspect-square bg-[var(--c-surface-alt)] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img ? 'border-[var(--c-accent-primary)] scale-105' : 'border-transparent hover:border-[var(--c-accent-primary-hover)]/50'}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt={`Alternate view ${idx + 1} of the ${product.name}, an example of earth-tone spiritual jewelry.`} loading="lazy" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info & Controls */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--c-accent-primary-hover)]">{productCategory}</p>
                            <h1 className="text-4xl lg:text-5xl font-bold">{product.name}</h1>
                        </div>
                        
                        <p className="text-lg text-[var(--c-text-primary)] opacity-90 whitespace-pre-line">{product.story}</p>
                        
                        {product.specifications.beadSize_mm && (
                            <div className="pt-4 border-t border-[var(--c-border)]">
                                <label htmlFor="bead-size-select" className="font-semibold block mb-3 text-[var(--c-heading)]">{t('product_select_bead_size')}</label>
                                <select
                                    id="bead-size-select"
                                    value={selectedBeadSize || ''}
                                    onChange={(e) => setSelectedBeadSize(Number(e.target.value))}
                                    className="w-full p-3 border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-primary)] focus:border-[var(--c-accent-primary)] bg-[var(--c-surface)] appearance-none"
                                >
                                    {BEAD_SPECS.map(opt => (
                                        <option key={opt.size} value={opt.size}>
                                            {opt.size.toFixed(2)}mm
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex gap-4 items-start bg-[var(--c-surface-alt)] p-4 rounded-lg border border-[var(--c-border)]">
                            <div className="flex-grow space-y-2">
                                <h3 className="text-xl font-semibold text-[var(--c-heading)] mb-2">{t('product_specifications')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                    <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_material')}</span> {product.material}</p>
                                    <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_origin')}</span> {product.specifications.origin}</p>
                                    {selectedBeadSize && <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_bead_size')}</span> {selectedBeadSize.toFixed(2)}mm</p>}
                                    {product.specifications.beadCount && <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_bead_count')}</span> {product.specifications.beadCount}</p>}
                                    {product.specifications.clarityLevel && <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_clarity')}</span> {product.specifications.clarityLevel}</p>}
                                    {product.specifications.finish && <p><span className="font-semibold text-[var(--c-text-primary)]">{t('product_finish')}</span> {product.specifications.finish}</p>}
                                    <p className="sm:col-span-2"><span className="font-semibold text-[var(--c-text-primary)]">{t('product_est_weight')}</span> {displayWeight}</p>
                                </div>
                                <div className="text-start mt-1">
                                    <button
                                        onClick={() => setWeightUnit(prev => prev === 'g' ? 'ct' : 'g')}
                                        className="text-xs text-[var(--c-accent-primary)] hover:underline"
                                    >
                                        {t(weightUnit === 'g' ? 'product_switch_to_carats' : 'product_switch_to_grams')}
                                    </button>
                                </div>
                                {product.certification.isCertified && (
                                    <p className="text-sm pt-2 border-t mt-2 border-[var(--c-border)]"><span className="font-semibold text-[var(--c-text-primary)]">{t('product_certification')}</span> {product.certification.authority} {t('product_certified')}</p>
                                )}
                            </div>
                        </div>
                        
                        {product.amberDetails && (
                            <div>
                                <SectionDivider/>
                                <h3 className="text-xl font-semibold text-[var(--c-heading)] mb-2">{t('product_details_title', {colorTier: product.amberDetails.colorTier})}</h3>
                                <p className="text-[var(--c-text-primary)] opacity-90">{product.amberDetails.description}</p>
                                <p className="text-[var(--c-text-primary)] opacity-90 mt-2"><span className="font-semibold">{t('product_rarity')}</span> {product.amberDetails.rarity}</p>
                                <p className="text-[var(--c-text-primary)] opacity-90 mt-1"><span className="font-semibold">{t('product_note')}</span> {product.amberDetails.specialNote}</p>
                            </div>
                        )}

                        <ProductFaq product={product} />
                        
                        <ReviewsSection />

                        <div className="pt-6 border-t border-[var(--c-border)] space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-[var(--c-text-primary)] opacity-90">{t('product_total_price')}</span>
                                <span className="text-4xl font-bold text-[var(--c-heading)]">฿{finalPrice.toLocaleString('en-US')}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <button 
                                    onClick={handleAddToCart} 
                                    disabled={!product.inventory.isAvailable || addedToCart} 
                                    className={`w-full text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed ${addedToCart ? 'bg-[var(--c-accent-secondary-hover)]' : 'btn-primary'}`}
                                >
                                    {product.inventory.isAvailable 
                                        ? (addedToCart ? t('Added to Cart') : t('Add to Cart')) 
                                        : t('product_out_of_stock')}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-24 h-24 bg-[var(--c-surface-alt)] rounded flex items-center justify-center text-xs text-stone-400 p-1 text-center">
                                <img src="https://placehold.co/100/C38D6F/3D352E?text=Energy" alt="Symbol representing the energy properties of the gemstone." className="w-full h-full object-cover rounded"/>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{t('product_energy_properties')}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.energyProperties.map(prop => (
                                        <span key={prop} className="bg-[var(--c-accent-secondary)]/30 text-[var(--c-accent-secondary-hover)] text-sm font-medium px-3 py-1 rounded-full">{prop}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;