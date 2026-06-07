import React from 'react';
import { Link } from 'react-router-dom';

const stoneSections = [
  {
    id: 'ruby',
    title: 'Burmese Ruby',
    subtitle: 'Mogok origin, vivid red color, fluorescence and certification-minded sourcing.',
    image: 'https://i.postimg.cc/4NN2kN4w/ruby-gemstone-placeholder.jpg',
  },
  {
    id: 'spinel',
    title: 'Burmese Spinel',
    subtitle: 'Natural neon red, pink and lavender spinel selected for brilliance and collector appeal.',
    image: 'https://i.postimg.cc/MG19t6Px/spinel-placeholder.jpg',
  },
  {
    id: 'jadeite',
    title: 'Myanmar Jadeite',
    subtitle: 'Imperial green, lavender and water-grade jadeite with careful treatment disclosure.',
    image: 'https://i.postimg.cc/t4KfVL3g/jadeite-placeholder.jpg',
  },
  {
    id: 'sapphire',
    title: 'Burmese Sapphire',
    subtitle: 'Royal blue sapphire with velvety depth, refined cutting and origin-led storytelling.',
    image: 'https://i.postimg.cc/gJ33WsTp/sapphire-placeholder.jpg',
  },
];

const PreciousGemstonesPage: React.FC = () => {
  return (
    <div className="page-container-with-bg">
      <section className="relative overflow-hidden py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7]/95 via-[#F7EFE4]/95 to-[#FFFDF7]/95" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="uppercase tracking-[0.28em] text-sm text-[var(--c-accent-secondary-hover)] mb-4">Myanmar Precious & Semi-Precious Gemstones</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-none brand-headline mb-6">Ruby, Spinel, Jadeite & Sapphire</h1>
            <p className="text-lg md:text-xl text-[var(--c-text-secondary)] max-w-3xl leading-relaxed">
              A refined gemstone page dedicated to Burmese ruby, natural spinel, Myanmar jadeite and Burmese sapphire — created for collectors, private sourcing, bespoke jewelry and high-value inquiries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/collection?category=precious-stones" className="btn-primary text-white px-6 py-3 rounded-full uppercase tracking-wider text-sm">View Precious Stones</Link>
              <Link to="/custom-jewelry" className="px-6 py-3 rounded-full border border-[var(--c-border-muted)] text-[var(--c-heading)] uppercase tracking-wider text-sm hover:bg-[var(--c-surface-alt)] transition">Bespoke Inquiry</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-[var(--c-border-muted)] bg-[var(--c-surface)] p-5 shadow-2xl">
              <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-[#EAE0D5] to-[#FFF8E7] flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-4xl text-[var(--c-accent-secondary)] mb-3">◆</div>
                  <p className="font-serif text-2xl text-[var(--c-heading)]">myanmar-ruby-spinel-jadeite-sapphire.jpg</p>
                  <p className="text-sm text-[var(--c-text-secondary)] mt-2">Editorial gemstone flat-lay, 4:3 ratio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {stoneSections.map((stone) => (
            <article key={stone.id} id={stone.id} className="bg-[var(--c-surface)] rounded-3xl border border-[var(--c-border)] p-6 shadow-lg hover:-translate-y-1 transition-transform">
              <div className="aspect-[4/3] rounded-2xl bg-[var(--c-img-placeholder-bg)] border border-dashed border-[var(--c-border-muted)] flex items-center justify-center text-center p-6 mb-6">
                <div>
                  <div className="text-3xl text-[var(--c-accent-secondary)] mb-2">◆</div>
                  <p className="font-serif text-xl text-[var(--c-heading)]">{stone.id}-myanmar-gemstone.jpg</p>
                  <p className="text-xs uppercase tracking-wider text-[var(--c-text-secondary)]">Ratio: 4:3</p>
                </div>
              </div>
              <p className="uppercase tracking-[0.22em] text-xs text-[var(--c-accent-secondary-hover)] mb-3">Myanmar Gemstone</p>
              <h2 className="text-4xl mb-4">{stone.title}</h2>
              <p className="text-[var(--c-text-secondary)] leading-relaxed mb-5">{stone.subtitle}</p>
              <Link to="/contact" className="text-[var(--c-accent-primary)] font-semibold uppercase tracking-wider text-sm">Inquire About This Stone →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--c-surface-alt)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.28em] text-sm text-[var(--c-accent-secondary-hover)] mb-4">Certification & Sourcing</p>
          <h2 className="text-4xl md:text-6xl mb-6">For High-Value Stones, Disclosure Matters.</h2>
          <p className="text-lg text-[var(--c-text-secondary)] leading-relaxed">
            We discuss origin, treatment, certification options and suitability for jewelry before presentation. For ruby, spinel, jadeite and sapphire, certificate support can be arranged through respected gemological laboratories where appropriate.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PreciousGemstonesPage;
