import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';
import ImagePlaceholder from '../components/ImagePlaceholder.tsx';

const labs = ['GRS', 'GIA', 'Gübelin', 'AIGS'];

const CertificatesPage: React.FC = () => {
  return (
    <div className="page-container-with-bg">
      <SEO title="Certificates of Authenticity | Vicky LuxGems" description="Learn how Vicky LuxGems supports gemstone authenticity through independent lab reports and certificate review for ruby, spinel, jadeite, sapphire and amber." />
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="section-heading__eyebrow">Trust & Verification</span>
          <h1 className="text-5xl md:text-7xl leading-none mb-6">Certificates of Authenticity</h1>
          <p className="editorial-prose text-[var(--text-secondary)] max-w-3xl mx-auto">
            Significant gemstones may be supported by independent laboratory reports. A certificate does not replace careful selection, but it can help clarify identity, treatment status and, in some cases, origin opinion.
          </p>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="section-heading">
            <span className="section-heading__eyebrow">Independent Laboratories</span>
            <h2 className="section-heading__title">Reports We Can Discuss With Clients</h2>
            <p className="section-heading__sub">Logo placeholders below mark where official lab references or certificate examples can be shown later.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labs.map((lab) => (
              <article key={lab} className="gem-card p-5">
                <ImagePlaceholder ratio="2:1" label={`${lab} CERT LOGO`} size="400 × 200 px" />
                <div className="gem-card__body px-0 pb-0">
                  <h3 className="gem-card__title">{lab}</h3>
                  <p className="gem-card__desc">Certificate logo or report-reference placeholder for client education and trust-building.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-card)] border-y border-[var(--border-light)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="section-heading__eyebrow">How to Read a Report</span>
            <h2 className="text-4xl md:text-6xl mb-6">Identity, Treatment, Weight, Origin.</h2>
          </div>
          <div className="editorial-prose text-[var(--text-secondary)]">
            <p>When reviewing a certificate, pay attention to the gemstone name, weight, measurements, treatment comments and report number. For ruby, sapphire and spinel, origin may be stated as an opinion. For jadeite, treatment disclosure is especially important. For amber, identity and natural characteristics should be discussed carefully.</p>
            <p>We encourage clients to ask questions before making a high-value purchase. Calm verification helps protect both the buyer and the long-term reputation of the stone.</p>
            <Link to="/contact" className="btn-primary inline-block mt-6">Contact for Verification</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificatesPage;
