import React from 'react';
import { Product } from '../types.ts';

const getMaterialGuide = (product: Product) => {
  const material = String(product.material).toLowerCase();
  if (material.includes('amber')) return {
    title: 'Burmese Amber / Burmite Notes',
    points: ['Organic gemstone material from Myanmar', 'Best kept away from harsh heat, chemicals and ultrasonic cleaning', 'Value is influenced by color, clarity, bead matching, weight and finish']
  };
  if (material.includes('ruby')) return {
    title: 'Ruby Buying Notes',
    points: ['Color saturation and glow are central value factors', 'Treatment disclosure is important for high-value ruby', 'Origin references should be supported by reliable documentation when available']
  };
  if (material.includes('spinel')) return {
    title: 'Spinel Buying Notes',
    points: ['Natural brilliance and vivid red-pink color are highly desirable', 'Fine Burmese spinel is increasingly collected internationally', 'Ask about treatment status, origin and cutting quality']
  };
  if (material.includes('jadeite') || material.includes('jade')) return {
    title: 'Jadeite Buying Notes',
    points: ['Texture, translucency and color evenness influence value', 'Type A wording should be used only with support', 'Avoid impact and request treatment disclosure for valuable pieces']
  };
  if (material.includes('sapphire')) return {
    title: 'Sapphire Buying Notes',
    points: ['Royal blue tone, cutting and clarity shape presentation', 'Heat treatment status should be discussed clearly', 'A certificate may support high-value purchases']
  };
  return {
    title: 'Collector Notes',
    points: ['Review material, origin, dimensions and certification before purchase', 'Ask for extra photos under natural and studio light', 'For bespoke work, confirm size, setting and delivery timeframe']
  };
};

const ProductDetailInsights: React.FC<{ product: Product; displayWeight: string }> = ({ product, displayWeight }) => {
  const guide = getMaterialGuide(product);
  const specs = [
    ['Material', product.material],
    ['Origin', product.specifications.origin],
    ['Form', product.specifications.productForm?.join(', ') || product.category.replace(/-/g, ' ')],
    ['Weight', displayWeight],
    ['Finish', product.specifications.finish || 'Hand-finished / inspected'],
    ['Certification', product.certification.isCertified ? `${product.certification.authority || 'Certificate'} ${product.certification.certificateNumber || ''}` : 'Certificate available on request for selected pieces'],
  ];

  return (
    <section className="product-detail-insights" aria-label="Expanded product information">
      <div className="product-detail-insights__header">
        <p className="product-detail-insights__eyebrow">Collector Information</p>
        <h2>Material, Origin & Care</h2>
        <p>Useful details for evaluating this piece before inquiry, purchase or custom adaptation.</p>
      </div>
      <div className="product-detail-insights__grid">
        <article className="product-detail-insights__panel product-detail-insights__panel--wide">
          <h3>{guide.title}</h3>
          <ul>
            {guide.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>
        <article className="product-detail-insights__panel">
          <h3>Key Specifications</h3>
          <dl>
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="product-detail-insights__panel notice-frame">
          <h3>Important Disclosure</h3>
          <p>Natural gemstones and amber can vary in tone, internal features and appearance under different light. Please request additional photos or certification discussion for important purchases.</p>
        </article>
        <article className="product-detail-insights__panel">
          <h3>Suggested Photo Angles</h3>
          <p><strong>Filename:</strong> {product.id}-editorial-detail.jpg</p>
          <p><strong>Ratio:</strong> 4:3 / 1:1 close-up</p>
          <p><strong>Shot:</strong> front view, side profile, wrist/scale reference, macro texture and natural-light color check.</p>
        </article>
      </div>
    </section>
  );
};

export default ProductDetailInsights;
