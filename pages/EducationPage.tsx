import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';
import ImagePlaceholder from '../components/ImagePlaceholder.tsx';

const educationCards = [
  ['How Gemstones Are Graded', 'Color, clarity, cut, carat weight and origin all influence value. In fine Burmese ruby, spinel, sapphire and jadeite, origin and treatment disclosure can be as important as beauty.'],
  ['Understanding Treatments', 'Heat treatment, filling, coating and dyeing must be disclosed clearly. Some treatments are widely accepted, while others strongly affect value, stability and collector confidence.'],
  ['Natural vs Synthetic', 'Natural stones form in the earth. Synthetic stones are laboratory-created. Both can be beautiful, but they belong to different value categories and should never be confused.'],
  ['Certification Bodies', 'For significant stones, reports from respected laboratories such as GRS, GIA, Gübelin and AIGS can support identity, treatment information and sometimes origin opinion.'],
  ['Caring for Your Gems', 'Amber, jadeite, ruby, spinel and sapphire require different care. Amber is organic and softer; ruby and sapphire are harder but still need thoughtful cleaning and storage.'],
  ['Investment Value of Fine Gems', 'Fine gems are valued through rarity, beauty, provenance, treatment status and market demand. A calm, documented purchase is more important than emotional pressure.'],
];

const EducationPage: React.FC = () => {
  return (
    <div className="page-container-with-bg">
      <SEO title="Gemstone Education | Vicky LuxGems" description="Learn how gemstones are graded, treated, certified and cared for, with guidance for Burmese amber, jadeite, ruby, spinel and sapphire buyers." />
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="section-heading__eyebrow">Gemstone Education</span>
            <h1 className="text-5xl md:text-7xl leading-none mb-6">Understanding Your Gemstone</h1>
            <p className="editorial-prose text-[var(--text-secondary)] max-w-3xl">
              A refined gemstone purchase begins with knowledge. This guide explains the language of grading, treatments, certificates and care so collectors can approach Burmese amber, jadeite, ruby, spinel and sapphire with clarity.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ImagePlaceholder ratio="21:9" label="EDUCATION HERO" size="2100 × 900 px · assorted gemstones on white background" />
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Buyer Knowledge</span>
            <h2 className="section-heading__title">Six Foundations of Confident Gem Buying</h2>
            <p className="section-heading__sub">A concise educational framework for private collectors and custom jewelry clients.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationCards.map(([title, body]) => (
              <article key={title} className="gem-card p-7">
                <div className="text-3xl text-[var(--accent-gold)] mb-4">◆</div>
                <h3 className="gem-card__title">{title}</h3>
                <p className="gem-card__desc">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-dark)] dark-context">
        <div className="max-w-5xl mx-auto text-center">
          <span className="section-heading__eyebrow">Private Guidance</span>
          <h2 className="text-4xl md:text-6xl mb-6 text-[var(--text-on-dark)]">Have questions? Speak to us before you decide.</h2>
          <p className="text-lg opacity-85 mb-8">Send a photo, certificate, size request or design reference. We can help you understand what to ask before choosing a stone.</p>
          <Link to="/contact" className="btn-primary inline-block">Ask a Gemstone Question</Link>
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
