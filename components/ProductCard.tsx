

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { FiPlus, FiSend } from 'react-icons/fi';
import { useTranslations } from '../hooks/useTranslations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuoteRequest: (product: Product) => void;
  flippedCardId: number | null;
  setFlippedCardId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuoteRequest, flippedCardId, setFlippedCardId }) => {
  const { t } = useTranslations();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFlipped = flippedCardId === product.id;

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    try {
      e.stopPropagation();
      action();
    } catch (error) {
      console.error("Error in handleActionClick:", error);
    }
  };

  const handleMouseEnter = () => {
    try {
      if (isDesktop) {
          setFlippedCardId(product.id);
      }
    } catch (error) {
      console.error("Error in handleMouseEnter:", error);
    }
  };

  const handleMouseLeave = () => {
    try {
      if (isDesktop) {
          setFlippedCardId(null);
      }
    } catch (error) {
      console.error("Error in handleMouseLeave:", error);
    }
  };

  const handleClick = () => {
    try {
      if (!isDesktop) {
          setFlippedCardId(isFlipped ? null : product.id);
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  const moreInfoTextKey = isDesktop ? 'products.card.moreInfoHover' : 'products.card.moreInfoClick';

  return (
    <div 
        className="w-full h-[450px] [perspective:1000px] group" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label={`${t(moreInfoTextKey)} for ${product.title}`}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-lg shadow-xl flex flex-col items-center justify-between p-4 text-center cursor-pointer">
            <div className="w-full">
                <img src={product.image} alt={product.title} className="w-full h-56 object-cover rounded-md" />
                <h3 className="text-base font-bold text-stone-800 mt-4 h-12 flex items-center justify-center">{product.title}</h3>
            </div>
            <div className="text-xs text-stone-500 mt-2">
                {t(moreInfoTextKey)}
            </div>
        </div>
        
        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-amber-50 rounded-lg shadow-xl flex flex-col p-4 text-left overflow-y-auto cursor-default">
            <div className="flex-grow">
                 <h3 className="text-base font-bold text-amber-900 mb-2">{product.title}</h3>
                 <p className="text-sm text-stone-600 mb-2">{product.description}</p>
                
                <div className="space-y-1 text-xs text-stone-700">
                    <div>
                        <strong className="font-semibold text-amber-800 block">{t('products.card.targetUsers')}</strong>
                        <p>{product.targetUsers}</p>
                    </div>
                     <div>
                        <strong className="font-semibold text-amber-800 block">{t('products.card.usp')}</strong>
                         <p>{product.usp}</p>
                    </div>
                     <div>
                        <strong className="font-semibold text-amber-800 block">{t('products.card.market')}</strong>
                         <p>{product.market}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-shrink-0">
                {product.isQuote ? (
                  <button 
                    onClick={(e) => handleActionClick(e, () => onQuoteRequest(product))}
                    className="w-full bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-800 transition-colors text-sm"
                    aria-label={`${t('products.card.requestQuote')} for ${product.title}`}
                  >
                    <FiSend />
                    <span>{t('products.card.requestQuote')}</span>
                  </button>
                ) : (
                  <button 
                    onClick={(e) => handleActionClick(e, () => onAddToCart(product))}
                    className="w-full bg-amber-800 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-amber-900 transition-colors text-sm"
                     aria-label={`${t('products.card.addToCart', { price: product.price })}`}
                  >
                    <FiPlus />
                    <span>{t('products.card.addToCart', { price: product.price })}</span>
                  </button>
                )}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;