import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types.ts';
import { useAppContext } from '../context/AppContext.tsx';
import { StarIcon } from './IconComponents.tsx';

const ProductCard: React.FC<{ product: Product, className?: string }> = ({ product, className }) => {
  const { addToCart } = useAppContext();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedPackage, product.specifications.beadSize_mm);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedPackage(1);
    }, 2000);
  };

  const packagePrice = useMemo(() => {
    let discount = 1;
    if (selectedPackage === 3) discount = 0.95;
    if (selectedPackage === 5) discount = 0.90;
    return product.price * selectedPackage * discount;
  }, [product.price, selectedPackage]);

  const unitPrice = useMemo(() => {
    if (selectedPackage === 1) return null;
    return packagePrice / selectedPackage;
  }, [packagePrice, selectedPackage]);

  const inventoryStatus = (() => {
    const { stock, isAvailable } = product.inventory;
    if (!isAvailable) return { text: 'Private order only', className: 'inventory--out' };
    if (stock <= 10 && stock > 0) return { text: `${stock} pieces available`, className: 'inventory--low' };
    return { text: 'Available for inquiry', className: 'inventory--in' };
  })();

  const primarySpecs = [
    product.material,
    product.specifications.origin,
    product.specifications.beadSize_mm ? `${product.specifications.beadSize_mm}mm` : null,
    product.specifications.clarityLevel,
  ].filter(Boolean).slice(0, 4);

  const storyExcerpt = product.story ? product.story.replace(/\s+/g, ' ').slice(0, 145) : 'A refined Burmese amber or gemstone piece selected for color, material character and meaningful wear.';
  const altText = `${product.name} by Vicky LuxGems, showing ${product.material} from ${product.specifications.origin || 'Myanmar'} in luxury product photography.`;

  return (
    <article className={`product-card-sacred catalog-lux-card ${className || ''}`}>
      <Link to={`/collection/${product.id}`} className="catalog-lux-card__image-link" aria-label={`View details for ${product.name}`}>
        <div className="product-card-sacred__image-container catalog-lux-card__image-wrap">
          <img src={product.media.mainImageUrl} alt={altText} loading="lazy" className="product-card-sacred__image catalog-lux-card__image" />
          <div className="catalog-lux-card__watermark">VickyLuxGems</div>
          <div className="catalog-lux-card__badge">Curated Piece</div>
          {product.isNewArrival && <div className="catalog-lux-card__new">New Arrival</div>}
        </div>
      </Link>

      <div className="product-card-sacred__content catalog-lux-card__content">
        <div className="catalog-lux-card__kicker">{product.category?.replace(/-/g, ' ') || 'Collection'}</div>
        <h3 className="product-card-sacred__title catalog-lux-card__title">{product.name}</h3>

        <div className="catalog-lux-card__rating" aria-label="Collector confidence rating">
          <div className="product-card-sacred__stars catalog-lux-card__stars">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5" />)}
          </div>
          <span>Collector selected · 4.9</span>
        </div>

        <p className="catalog-lux-card__story">{storyExcerpt}{storyExcerpt.length >= 145 ? '…' : ''}</p>

        <div className="catalog-lux-card__specs" aria-label="Key specifications">
          {primarySpecs.map((spec) => <span key={String(spec)}>{spec}</span>)}
        </div>

        <div className="catalog-lux-card__notice">
          <strong>Disclosure note</strong>
          <span>Origin, material and treatment questions are welcome before purchase.</span>
        </div>

        <div className="catalog-lux-card__purchase">
          <div>
            <p className="catalog-lux-card__price">฿{packagePrice.toLocaleString('en-US')}</p>
            <p className={`product-card-sacred__inventory ${inventoryStatus.className}`}>{inventoryStatus.text}</p>
          </div>
          <select value={selectedPackage} onChange={(e) => setSelectedPackage(Number(e.target.value))} onClick={(e) => e.stopPropagation()} className="product-card-sacred__package-select catalog-lux-card__select" aria-label="Select package size">
            <option value={1}>1 piece</option>
            <option value={3}>3 pieces · save 5%</option>
            <option value={5}>5 pieces · save 10%</option>
          </select>
        </div>

        {unitPrice && <p className="product-card-sacred__unit-price catalog-lux-card__unit">฿{unitPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })} per piece</p>}

        <div className="product-card-sacred__actions catalog-lux-card__actions">
          <Link to={`/collection/${product.id}`} className="btn-sacred-primary catalog-lux-card__details">View Details</Link>
          <button onClick={handleAddToCartClick} disabled={added || !product.inventory.isAvailable} className="btn-sacred-secondary catalog-lux-card__cart">
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
