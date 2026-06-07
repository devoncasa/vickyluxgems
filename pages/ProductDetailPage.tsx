import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import ProductDetailInsights from '../components/ProductDetailInsights.tsx';

interface OutletContextType {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProductFaq: React.FC<{product: Product}> = ({ product }) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState<number | null>(null);

    const faqData = [
        { q: t('faq_q1_q'), a: t('faq_q1_a') },
        { q: t('faq_q3_q'), a: t('faq_q3_a') },
        { q: t('faq_q9_q'), a: t('faq_q9_a') }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a.replace(/<[^>]*>?/gm, '') }
        }))
    };

    return (
        <div className="product-detail-faq">
            <JsonLd data={faqSchema} />
            <h3>Frequently Asked Questions</h3>
            <div className="divide-y divide-[var(--c-border)]">
                {faqData.map((item, index) => (
                    <div key={index} className="py-3">
                        <button onClick={() => setOpen(open === index ? null : index)} className="w-full flex justify-between items-center text-left product-detail-faq__button">
                            <span>{item.q}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${open === index ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`mt-2 text-sm text-[var(--c-text-secondary)] ps-2 overflow-hidden transition-all duration-300 ease-in-out ${open === index ? 'max-h-40' : 'max-h-0'}`}>
                            <p dangerouslySetInnerHTML={{ __html: item.a }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ReviewsSection: React.FC = () => (
    <div className="product-detail-reviews">
        <h3>Client Confidence</h3>
        <div className="flex items-center gap-2">
            <div className="flex text-[var(--c-accent-secondary-hover)]">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}
            </div>
            <span className="text-sm text-[var(--c-text-secondary)]">Private collector inquiries and repeat clients</span>
        </div>
        <p className="mt-2 text-sm text-[var(--c-text-secondary)]">For high-value pieces, we recommend confirming size, tone, origin, treatment disclosure and certificate availability before purchase.</p>
    </div>
);

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
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
        if (!product || !selectedBeadSize) return product?.price || 0;
        if(product.specifications.beadSize_mm) return calculateFinalPrice(product, selectedBeadSize);
        return product.price;
    }, [product, selectedBeadSize]);
    
    const selectedBeadSpec = useMemo(() => {
        if (!selectedBeadSize) return null;
        return BEAD_SPECS.find(spec => spec.size === selectedBeadSize);
    }, [selectedBeadSize]);

    const totalWeightInGrams = useMemo(() => {
        if (!product || !selectedBeadSpec || !product.specifications.beadCount) return product?.specifications.totalWeight_grams || 0;
        return selectedBeadSpec.weight * product.specifications.beadCount;
    }, [product, selectedBeadSpec]);

    const displayWeight = useMemo(() => weightUnit === 'ct' ? `${(totalWeightInGrams * 5).toFixed(2)} ct` : `${totalWeightInGrams.toFixed(2)} g`, [totalWeightInGrams, weightUnit]);

    if (!product) {
        return (
            <div className="text-center py-20">
                <SEO titleKey="seo_product_not_found_title" descriptionKey="seo_product_not_found_desc" keywordsKey="seo_product_not_found_keywords" />
                <h2 className="text-3xl font-semibold">{t('product_not_found_title')}</h2>
                <Link to="/collection" className="mt-4 inline-block text-[var(--c-accent-primary)] hover:text-[var(--c-heading)]">{t('product_not_found_cta')}</Link>
            </div>
        );
    }
    
    const seoTitle = `${product.name} (${selectedBeadSize || product.specifications.beadSize_mm || 'Selected'}mm) - Vicky LuxGems`;
    const seoDesc = t('seo_product_detail_desc', { productName: product.name, beadSize: `${selectedBeadSize || ''}mm`, material: product.material, story: product.story.substring(0, 80) + '...' });
    const seoKeywords = t('seo_product_detail_keywords', { productName: product.name, material: product.material, beadSize: `${selectedBeadSize || ''}mm`, category: productCategory });

    const productSchema = {
        "@context": "https://schema.org/", "@type": "Product", "name": seoTitle, "image": mainImage, "description": product.story,
        "sku": `${product.sku}-${selectedBeadSize || 'SELECTED'}MM`, "brand": { "@type": "Brand", "name": "Vicky LuxGems" }, "inLanguage": 'en',
        "offers": { "@type": "Offer", "url": window.location.href, "priceCurrency": "THB", "price": finalPrice.toFixed(0), "availability": product.inventory.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", "itemCondition": "https://schema.org/NewCondition" },
        "additionalProperty": [
            { "@type": "PropertyValue", "name": "Material", "value": product.material },
            { "@type": "PropertyValue", "name": "Origin", "value": product.specifications.origin },
            { "@type": "PropertyValue", "name": "Bead Size", "value": `${selectedBeadSize || product.specifications.beadSize_mm || 'N/A'}mm` }
        ]
    };

    const handleAddToCart = () => {
        addToCart(product, 1, selectedBeadSize || undefined);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };
    
    const galleryImages = [product.media.mainImageUrl, ...product.media.gallery].filter(Boolean).slice(0, 5);
    while (galleryImages.length < 5) galleryImages.push(`https://placehold.co/100x100/F0EBE6/7E746A?text=View`);

    return (
        <div className="page-container-with-bg product-detail-luxury" style={{ backgroundImage: `url('${BACKGROUND_IMAGES[30]}')` }}>
            <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} imageUrl={mainImage} type="product" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <JsonLd data={productSchema} />
                <div className="product-detail-luxury__hero">
                    <div className="product-detail-luxury__gallery">
                        <div className="product-detail-luxury__main-image">
                            <img src={mainImage} alt={`Detailed view of ${product.name}, ${product.material} from ${product.specifications.origin}.`} className="w-full h-full object-cover" />
                            <div className="product-detail-luxury__watermark">VickyLuxGems</div>
                        </div>
                        <div className="product-detail-luxury__thumbs">
                            {galleryImages.map((img, idx) => (
                                <button key={idx} className={`product-detail-luxury__thumb ${mainImage === img ? 'is-active' : ''}`} onClick={() => setMainImage(img)}>
                                    <img src={img} alt={`Alternate view ${idx + 1} of ${product.name}`} loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-detail-luxury__info">
                        <p className="product-detail-luxury__kicker">{productCategory}</p>
                        <h1>{product.name}</h1>
                        <p className="product-detail-luxury__story">{product.story}</p>
                        {product.specifications.beadSize_mm && (
                            <div className="product-detail-luxury__control">
                                <label htmlFor="bead-size-select">{t('product_select_bead_size')}</label>
                                <select id="bead-size-select" value={selectedBeadSize || ''} onChange={(e) => setSelectedBeadSize(Number(e.target.value))}>
                                    {BEAD_SPECS.map(opt => <option key={opt.size} value={opt.size}>{opt.size.toFixed(2)}mm</option>)}
                                </select>
                            </div>
                        )}
                        <div className="product-detail-luxury__specbox">
                            <h3>{t('product_specifications')}</h3>
                            <dl>
                                <div><dt>{t('product_material')}</dt><dd>{product.material}</dd></div>
                                <div><dt>{t('product_origin')}</dt><dd>{product.specifications.origin}</dd></div>
                                {selectedBeadSize && <div><dt>{t('product_bead_size')}</dt><dd>{selectedBeadSize.toFixed(2)}mm</dd></div>}
                                {product.specifications.beadCount && <div><dt>{t('product_bead_count')}</dt><dd>{product.specifications.beadCount}</dd></div>}
                                {product.specifications.clarityLevel && <div><dt>{t('product_clarity')}</dt><dd>{product.specifications.clarityLevel}</dd></div>}
                                {product.specifications.finish && <div><dt>{t('product_finish')}</dt><dd>{product.specifications.finish}</dd></div>}
                                <div><dt>{t('product_est_weight')}</dt><dd>{displayWeight}</dd></div>
                            </dl>
                            <button onClick={() => setWeightUnit(prev => prev === 'g' ? 'ct' : 'g')} className="product-detail-luxury__switch">{t(weightUnit === 'g' ? 'product_switch_to_carats' : 'product_switch_to_grams')}</button>
                        </div>
                        {product.amberDetails && <div className="product-detail-luxury__amber notice-frame"><h3>{t('product_details_title', {colorTier: product.amberDetails.colorTier})}</h3><p>{product.amberDetails.description}</p><p><strong>{t('product_rarity')}</strong> {product.amberDetails.rarity}</p><p><strong>{t('product_note')}</strong> {product.amberDetails.specialNote}</p></div>}
                        <ProductFaq product={product} />
                        <ReviewsSection />
                        <div className="product-detail-luxury__pricebox">
                            <span>{t('product_total_price')}</span>
                            <strong>฿{finalPrice.toLocaleString('en-US')}</strong>
                            <button onClick={handleAddToCart} disabled={!product.inventory.isAvailable || addedToCart} className="btn-primary w-full py-4 px-6 disabled:bg-stone-400 disabled:cursor-not-allowed">{product.inventory.isAvailable ? (addedToCart ? t('Added to Cart') : t('Add to Cart')) : t('product_out_of_stock')}</button>
                        </div>
                    </div>
                </div>
                <ProductDetailInsights product={product} displayWeight={displayWeight} />
                <div className="product-detail-luxury__energy">
                    <h3>{t('product_energy_properties')}</h3>
                    <div>{product.energyProperties.map(prop => <span key={prop}>{prop}</span>)}</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
