
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types.ts';
import { useAppContext } from '../context/AppContext.tsx';
import { StarIcon, NaturalIcon, HandcraftedIcon, AncientEnergyIcon } from './IconComponents.tsx';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useAppContext();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // The price on the product object is for a single item.
    // We pass the base product price, and the cart will calculate the total.
    addToCart(product, selectedPackage, product.specifications.beadSize_mm);
    setAdded(true);
    setTimeout(() => {
        setAdded(false);
        setSelectedPackage(1); // Reset package selection after adding
    }, 2000);
  };
  
  const packagePrice = useMemo(() => {
    let discount = 1;
    if (selectedPackage === 3) discount = 0.95; // 5% off
    if (selectedPackage === 5) discount = 0.90; // 10% off
    return product.price * selectedPackage * discount;
  }, [product.price, selectedPackage]);

  const unitPrice = useMemo(() => {
    if (selectedPackage === 1) return null;
    return packagePrice / selectedPackage;
  }, [packagePrice, selectedPackage]);
  
  const shippingDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }, []);

  const getInventoryStatus = () => {
    const { stock, isAvailable } = product.inventory;
    if (!isAvailable) {
        return { text: 'Back soon', className: 'inventory--out' };
    }
    if (stock <= 10 && stock > 0) {
        return { text: `Only ${stock} left!`, className: 'inventory--low' };
    }
    if (stock > 10) {
        return { text: 'In stock', className: 'inventory--in' };
    }
    return { text: '', className: '' };
  };

  const inventoryStatus = getInventoryStatus();
  const altText = `A luxurious ${product.name}, a piece of handmade spiritual jewelry with ${product.material} beads, perfect as a meaningful gift.`;

  return (
    <div className="product-card-sacred">
        <div className="product-card-sacred__image-container">
            <Link to={`/collection/${product.id}`} className="block w-full h-full">
                <img src={product.media.mainImageUrl} alt={altText} loading="lazy" className="product-card-sacred__image"/>
            </Link>
            <div className="product-card-sacred__badge">Sacred Gift Inside</div>
            {product.isNewArrival && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
                    NEW
                </div>
            )}
        </div>
      <div className="product-card-sacred__content">
        <h3 className="product-card-sacred__title">{product.name}</h3>
        <div className="product-card-sacred__meta">
            <div className="flex items-center justify-center gap-2">
                <div className="product-card-sacred__stars">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" />)}
                </div>
                <span>4.9 (2,500+ reviews)</span>
            </div>
        </div>
        <p className="product-card-sacred__meta italic">“Trusted by monks & mindful collectors”</p>
        
        <div className="product-card-sacred__benefits">
            <div className="benefit-icon">
                <NaturalIcon className="w-6 h-6 text-green-700" />
                <span className="tooltip">100% Natural & Untreated</span>
            </div>
            <div className="benefit-icon">
                <HandcraftedIcon className="w-6 h-6 text-amber-700" />
                <span className="tooltip">Handcrafted in Myanmar</span>
            </div>
            <div className="benefit-icon">
                <AncientEnergyIcon className="w-6 h-6 text-purple-700" />
                <span className="tooltip">Ancient Energy & Tradition</span>
            </div>
        </div>
        
        <div className="mt-auto pt-4">
            <p className="text-2xl font-semibold mb-2 product-card-sacred__price text-[var(--c-sacred-text-primary)]">
                {`฿${packagePrice.toLocaleString('en-US')}`}
            </p>

            <select 
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(Number(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="product-card-sacred__package-select"
                aria-label="Select package size"
            >
                <option value={1}>Select Package - 1 pc</option>
                <option value={3}>3 pcs (Save 5%)</option>
                <option value={5}>5 pcs (Save 10%)</option>
            </select>
            <p className="product-card-sacred__unit-price">
                {unitPrice ? `(฿${unitPrice.toLocaleString('en-US', {maximumFractionDigits: 0})} per unit)` : ''}&nbsp;
            </p>

            <div className={`product-card-sacred__inventory ${inventoryStatus.className}`}>
                {inventoryStatus.text}
            </div>
            
            <p className="product-card-sacred__shipping-note">
                Order by {shippingDate} for free shipping & a spiritual gift!
            </p>
            
            <div className="product-card-sacred__actions">
                <Link to={`/collection/${product.id}`} className="btn-sacred-primary">View Product</Link>
                <button 
                    onClick={handleAddToCartClick} 
                    disabled={added || !product.inventory.isAvailable}
                    className="btn-sacred-secondary"
                >
                    {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
