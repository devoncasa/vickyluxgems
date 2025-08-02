import React, { useState, useMemo } from 'react';
import { Product, ShopCategory } from '../types.ts';
import { SHOP_CATEGORIES } from '../constants.ts';
import ProductCard from '../components/ProductCard.tsx';
import { ChevronDownIcon } from '../components/IconComponents.tsx';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { useAppContext } from '../context/AppContext.tsx';

// --- Category Sidebar Component ---
const CategorySidebar: React.FC<{
  selectedCategory: string | null;
  setSelectedCategory: (slug: string | null) => void;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { t } = useLanguage();

  const toggleCategory = (slug: string) => {
    setOpenCategories(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  const linkClasses = "block w-full text-left p-2 rounded-md transition-colors text-sm";
  const activeLinkClasses = "bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold";
  const inactiveLinkClasses = "text-[var(--c-text-secondary)] hover:bg-[var(--c-surface-alt)]";

  return (
    <div className="p-6 bg-[var(--c-sacred-bg)] rounded-lg shadow-sm border border-[var(--c-sacred-border)]">
      <h3 className="text-xl font-semibold mb-4">{t('shop_categories_title')}</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`${linkClasses} ${selectedCategory === null ? activeLinkClasses : inactiveLinkClasses}`}
          >
            {t('shop_all_products')}
          </button>
        </li>
        {SHOP_CATEGORIES.map(cat => (
          <li key={cat.slug}>
            {cat.subCategories ? (
              <>
                <button
                  onClick={() => toggleCategory(cat.slug)}
                  className={`${linkClasses} flex justify-between items-center w-full font-semibold ${inactiveLinkClasses}`}
                >
                  <span>{t(cat.name as any)}</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${openCategories.includes(cat.slug) ? 'rotate-180' : ''}`} />
                </button>
                {openCategories.includes(cat.slug) && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {cat.subCategories.map(subCat => (
                      <li key={subCat.slug}>
                        <button
                          onClick={() => setSelectedCategory(subCat.slug)}
                          className={`${linkClasses} ${selectedCategory === subCat.slug ? activeLinkClasses : inactiveLinkClasses}`}
                        >
                          {t(subCat.name as any)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <button
                onClick={() => setSelectedCategory(cat.slug)}
                className={`${linkClasses} ${selectedCategory === cat.slug ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {t(cat.name as any)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Main Shop Page Component ---
const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products } = useAppContext();
  const { t } = useLanguage();
  
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    const topLevelCat = SHOP_CATEGORIES.find(c => c.slug === selectedCategory);
    if (topLevelCat && topLevelCat.subCategories) {
        // If a main category with subcategories is selected, show all products from its subcategories
        const subCategorySlugs = topLevelCat.subCategories.map(sc => sc.slug);
        return products.filter(p => subCategorySlugs.includes(p.category));
    }
    
    return products.filter(p => p.category === selectedCategory);

  }, [selectedCategory, products]);
  
  const currentCategoryName = useMemo(() => {
    if (!selectedCategory) return t('shop_all_products');
    for (const cat of SHOP_CATEGORIES) {
        if (cat.slug === selectedCategory) return t(cat.name as any);
        if (cat.subCategories) {
            const sub = cat.subCategories.find(s => s.slug === selectedCategory);
            if(sub) return t(sub.name as any);
        }
    }
    return t('shop_all_products');
  }, [selectedCategory, t]);

  return (
    <div 
        style={{ backgroundColor: 'var(--c-sacred-page-bg)' }}
        className="py-16"
    >
      <SEO 
        titleKey="shop_meta_title"
        descriptionKey="shop_meta_description"
        keywordsKey="shop_meta_keywords"
      />
      <div className="shop-top-banner">
        <p>Sacred Stones for Sacred Lives – Receive a handcrafted blessing pouch this week only!</p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight" style={{color: 'var(--c-sacred-text-primary)'}}>{t('shop_header_title')}</h1>
          <p className="mt-4 text-xl" style={{color: 'var(--c-sacred-text-secondary)'}}>{t('shop_header_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <CategorySidebar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{currentCategoryName}</h2>
              <span className="text-sm" style={{color: 'var(--c-sacred-text-secondary)'}}>{t('shop_showing_items', { count: filteredProducts.length })}</span>
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-[var(--c-sacred-bg)] rounded-lg shadow-sm border border-[var(--c-sacred-border)]">
                    <h3 className="text-2xl font-semibold" style={{color: 'var(--c-sacred-text-primary)'}}>{t('shop_no_products_title')}</h3>
                    <p className="mt-2" style={{color: 'var(--c-sacred-text-secondary)'}}>{t('shop_no_products_subtitle')}</p>
                     <button onClick={() => setSelectedCategory(null)} className="mt-6 text-sm font-semibold text-[var(--c-accent-primary)] hover:text-[var(--c-heading)]">
                        {t('shop_view_all_products')}
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;