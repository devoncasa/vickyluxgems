import React from 'react';
import { Link } from 'react-router-dom';

const gemstoneCards = [
  {
    name: 'Burmese Ruby',
    note: 'Mogok vivid red, fluorescence and certification-minded sourcing.',
    file: 'mogok-ruby-pigeon-blood-editorial.jpg',
    ratio: '4:3',
    link: '/gemstones#ruby',
  },
  {
    name: 'Burmese Spinel',
    note: 'Natural neon red, pink and lavender spinel for collectors.',
    file: 'burmese-spinel-neon-pink-unheated.jpg',
    ratio: '4:3',
    link: '/gemstones#spinel',
  },
  {
    name: 'Myanmar Jadeite',
    note: 'Imperial green, lavender and water-grade jadeite with careful disclosure.',
    file: 'jadeite-imperial-green-bangle-light.jpg',
    ratio: '4:3',
    link: '/gemstones#jadeite',
  },
  {
    name: 'Burmese Sapphire',
    note: 'Royal blue sapphire selected for velvet depth and refined cutting.',
    file: 'burmese-blue-sapphire-royal-velvet.jpg',
    ratio: '4:3',
    link: '/gemstones#sapphire',
  },
];

const LuxuryPlaceholder: React.FC<{ file: string; ratio: string; desc: string }> = ({ file, ratio, desc }) => (
  <div className="relative aspect-[4/3] rounded-[1.75rem] border border-dashed border-[var(--c-border-muted)] bg-[var(--c-img-placeholder-bg)] overflow-hidden flex items-center justify-center text-center p-6">
    <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 35% 30%, rgba(180,155,94,.32), transparent 45%), radial-gradient(circle at 80% 80%, rgba(144,74,33,.18), transparent 35%)' }} />
    <div className="relative">
      <div className="text-4xl text-[var(--c-accent-secondary)] mb-3">◆</div>
      <p className="font-serif text-2xl text-[var(--c-heading)]">{file}</p>
      <p className="text-sm text-[var(--c-text-secondary)] mt-2">{desc}</p>
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--c-text-secondary)] mt-3">Ratio: {ratio}</p>
    </div>
  </div>
);

const LuxuryGemstoneEditorial: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--c-surface-alt)]">
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(180,155,94,.10) 1px, transparent 1px), linear-gradient(45deg, rgba(180,155,94,.07) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7">
            <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-[var(--c-accent-secondary-hover)] mb-4">Precious & Semi-Precious Myanmar Gemstones</p>
            <h2 className="text-5xl md:text-7xl leading-none mb-6">Ruby, Spinel, Jadeite & Sapphire — Curated With Restraint.</h2>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--c-text-secondary)] max-w-3xl">
              Beyond Burmese amber, Vicky LuxGems presents selected Myanmar gemstones for private collectors, bespoke jewelry and sourcing inquiries: Mogok ruby, Burmese spinel, Myanmar jadeite and royal blue sapphire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/gemstones" className="btn-primary text-white px-6 py-3 rounded-full uppercase tracking-wider text-sm">Explore Gemstone Page</Link>
              <Link to="/custom-bracelet" className="px-6 py-3 rounded-full border border-[var(--c-border-muted)] text-[var(--c-heading)] uppercase tracking-wider text-sm hover:bg-[var(--c-surface)] transition">Customize Bracelet</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <LuxuryPlaceholder file="myanmar-ruby-spinel-jadeite-sapphire-editorial.jpg" ratio="4:3" desc="Suggested photo: editorial flat-lay of ruby, spinel, jadeite and sapphire on ivory silk with soft daylight." />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gemstoneCards.map((card) => (
            <Link key={card.name} to={card.link} className="group bg-[var(--c-surface)] rounded-[1.75rem] p-4 border border-[var(--c-border)] shadow-lg hover:-translate-y-1 transition-transform">
              <LuxuryPlaceholder file={card.file} ratio={card.ratio} desc={`Suggested photo: ${card.name} in refined light-tone luxury styling.`} />
              <div className="p-4">
                <h3 className="text-3xl mb-2 group-hover:text-[var(--c-accent-primary)] transition-colors">{card.name}</h3>
                <p className="text-sm text-[var(--c-text-secondary)] leading-relaxed">{card.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryGemstoneEditorial;
