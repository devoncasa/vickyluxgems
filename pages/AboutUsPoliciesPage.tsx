import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionDivider from '../components/SectionDivider.tsx';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { useAppContext } from '../context/AppContext.tsx';

// Reusable component for consistent image presentation
const ImageWithAlt: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = 'aspect-video' }) => (
    <div className={`w-full bg-[var(--c-surface-alt)] rounded-lg flex items-center justify-center my-6 overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover"/>
    </div>
);

// --- Content Components (Updated and Expanded) ---

const OurStoryContent: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
            <p>
                <strong>Vicky Burmese Amber & Gems Co., Ltd.</strong> specializes in Burmese amber and fine gemstones, operating under the brand <span className="brand-name">Vicky LuxGems</span>, which offers an interactive, dynamic, and responsive online platform for customers to design their own jewelry. This venture is the modern expression of a multi-generational legacy, built on over 40 years of family expertise in the Burmese amber trade.
            </p>
            <ImageWithAlt src="https://placehold.co/1200x675/A56C50/F8F5F2?text=Vicky+LuxGems+Showcase" alt="A showcase of exquisite Burmese amber and gemstone jewelry from Vicky LuxGems." />
            
            <h2>Our Story: A Legacy Carved in Gemstones</h2>
            <SectionDivider />
            <div className="not-prose grid md:grid-cols-2 gap-8 items-center text-lg text-[var(--c-text-primary)]/90">
                <div className="space-y-6 text-left">
                    <p>
                        For over four decades, our family has been deeply connected to the legendary gem tracts of Myanmar. This is not just a business; it is a multi-generational legacy founded on a profound respect for the earth's treasures and the cultures that protect them. <span className="brand-name">Vicky LuxGems</span> is the modern evolution of this heritage, a bridge between the ancient traditions of the Hukawng Valley and Mogok and the discerning global collector.
                    </p>
                    <p>
                        Our founder, Vicky Sinchoury, grew up immersed in the world of rare gemstones, guided by his family's deep, intuitive knowledge passed down through generations. His mission is to bring these extraordinary gifts from Myanmar—from the 99-million-year-old Burmite amber to the world's finest "pigeon's blood" rubies and royal blue sapphires—to the international stage with unparalleled integrity.
                    </p>
                </div>
                <ImageWithAlt src="https://placehold.co/600x600/7E746A/FFFFFF?text=Vicky+Sinchoury" alt="A professional portrait of Vicky Sinchoury, founder of Vicky LuxGems." className="aspect-square" />
            </div>
            
            <h2 className="mt-12">Our Mission: The Pillars of Our Promise</h2>
            <SectionDivider />
            <p>
                Our mission is to be the most trusted global source for authentic Burmese amber and precious gems from Myanmar. We are steadfastly committed to:
            </p>
            <ul>
                <li><strong>Unwavering Authenticity:</strong> Guaranteeing that every single piece is 100% natural, untreated, and scientifically verified. We combine traditional gemological expertise with modern technology to ensure absolute confidence.</li>
                <li><strong>Ethical Sourcing:</strong> Working directly with local, small-scale mining communities in Myanmar to ensure fair practices, respect for the land, and that the economic benefits support the people who are the custodians of these natural treasures.</li>
                <li><strong>Master Craftsmanship:</strong> Collaborating with skilled artisans who understand the unique properties of each stone, ensuring every piece—from a single bead to an intricate carving—is crafted with the precision and dedication befitting heirloom quality jewelry.</li>
                <li><strong>Client Education:</strong> Empowering our clients with the knowledge to appreciate the unique history, scientific properties, and spiritual significance of their purchase, transforming a transaction into a journey of discovery.</li>
            </ul>
             <ImageWithAlt src="https://placehold.co/1200x675/C8A97E/3D352E?text=Gemological+Tools" alt="A collection of gemological tools, symbolizing the brand's commitment to scientific authenticity." />
        </div>
    );
};


const PrivacyPolicyContent: React.FC = () => (
    <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <p><strong>Last Updated: October 12, 2023</strong></p>
        <h2>1. Introduction</h2><SectionDivider />
        <p>This Privacy Policy describes how <strong>Vicky Burmese Amber & Gems Co., Ltd.</strong> (the "Company," "we," "us," or "our"), operating under the brand <span className="brand-name">Vicky LuxGems</span>, collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from our website (the "Site"). We are committed to protecting your privacy and handling your data in an open and transparent manner in accordance with global data protection standards.</p>
        
        <h2>2. Information We Collect</h2><SectionDivider />
        <p>We collect information to provide and improve our services to you:</p>
        <ul>
            <li><strong>Personal Information You Provide:</strong> This includes your name, shipping and billing address, email address, phone number, and payment information when you place an order or create an account.</li>
            <li><strong>Usage Data:</strong> We automatically collect information when you access the Site, such as your IP address, browser type, device information, and pages visited. This helps us understand how our customers use the Site.</li>
        </ul>
        <ImageWithAlt src="https://placehold.co/800x450/88929B/FFFFFF?text=Data+Security+Icon" alt="An icon representing data security, such as a lock or shield." />

        <h2>3. How We Use Your Information</h2><SectionDivider />
        <p>Your information is used for the following purposes:</p>
        <ul>
            <li>To process and fulfill your orders, including managing payments and shipping.</li>
            <li>To communicate with you about your order and provide customer support.</li>
            <li>To improve and personalize your experience on our Site.</li>
            <li>For security purposes, such as preventing fraud.</li>
            <li>To send you marketing communications, but only with your explicit consent.</li>
        </ul>

        <h2>4. Your Data Rights</h2><SectionDivider />
        <p>In line with global data protection standards like GDPR, you have the right to:</p>
        <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate personal data.</li>
            <li><strong>Erasure:</strong> Request the deletion of your personal data ('right to be forgotten').</li>
            <li><strong>Opt-Out:</strong> Withdraw consent for marketing communications at any time.</li>
        </ul>
        <p>To exercise these rights, please contact us at our official email address. We are the data controller for your information.</p>
        <ImageWithAlt src="https://placehold.co/800x450/9FB8AD/3D352E?text=User+Rights+Icon" alt="An icon representing user rights, such as a person with a checklist." />

        <h2>5. Data Security & Retention</h2><SectionDivider />
        <p>We implement robust security measures, including encryption and secure server hosting, to protect your data. We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for legal or accounting requirements.</p>
        
        <h2>6. Contact Us</h2><SectionDivider />
        <p>For any questions regarding this policy, please contact our Data Protection Officer at <strong>info.vkamber@gmail.com</strong>.</p>
        <ImageWithAlt src="https://placehold.co/800x450/A56C50/F8F5F2?text=Contact+Us+Icon" alt="An icon representing communication, such as an envelope or phone." />
    </div>
);


const WarrantyPolicyContent: React.FC = () => (
     <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <h2>1. Our Commitment to Quality Craftsmanship</h2><SectionDivider />
        <p>At <span className="brand-name">Vicky LuxGems</span>, we stand behind the superior quality of our materials and the skill of our artisans. Our warranty reflects our confidence in every piece we create.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Quality+Inspection" alt="A gemologist's hands using tweezers to inspect a finished gemstone." />

        <h2>2. One-Year Limited Warranty</h2><SectionDivider />
        <p>Your <span className="brand-name">Vicky LuxGems</span> piece is warranted against manufacturing defects for a period of <strong>one (1) year</strong> from the date of purchase. A manufacturing defect is a flaw resulting from the crafting process, not from wear or accidental damage.</p>
        <ul>
            <li><strong>What is Covered:</strong> Structural defects (e.g., faulty clasps, weak links), issues with stone settings not caused by impact, and unusual discoloration of metal not due to natural tarnishing.</li>
            <li><strong>What is Not Covered:</strong> Normal wear and tear (including scratches, dents, or dulling of surfaces), accidental damage, misuse or improper care, loss or theft, and any repairs or alterations performed by a third party.</li>
        </ul>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Covered+vs+Not+Covered" alt="A split image showing a covered faulty clasp next to a not-covered scratched ring." />

        <h2>3. How to Make a Warranty Claim</h2><SectionDivider />
        <p>If you believe your item has a manufacturing defect, please follow these steps:</p>
        <ol>
            <li>Contact us at <strong>info.vkamber@gmail.com</strong> with your original order number or proof of purchase.</li>
            <li>Provide a clear, detailed description of the issue.</li>
            <li>Include high-quality photographs showing the defect from multiple angles.</li>
        </ol>
        <p>Our team will review your claim within 5-7 business days. If the claim is approved, we will provide instructions for returning the item for assessment. We will then repair or replace the item at our discretion. The customer is responsible for shipping the item to us; we will cover the return shipping for valid claims.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Contact+Support" alt="An icon representing customer support and the claims process." />
    </div>
);


const OurGuaranteeContent: React.FC = () => (
    <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <p>At <span className="brand-name">Vicky LuxGems</span>, our guarantee is the bedrock of our reputation. It is our promise that you are receiving a genuine, ethically sourced, and scientifically verified piece of natural history from the heart of Myanmar.</p>
        
        <div className="flex flex-col md:flex-row gap-8 items-center not-prose my-12">
            <div className="flex-grow">
                <h2 className="text-4xl mt-0">The Science of Authenticity</h2>
                <SectionDivider />
                <p className="text-[var(--c-text-secondary)]">We employ a multi-step verification process based on established scientific principles to ensure every piece meets the highest gemological standards.</p>
            </div>
            <ImageWithAlt src="https://placehold.co/400x300/F0EBE6/534B42?text=UV+Fluorescence+Test" alt="A demonstration of the UV fluorescence test on a piece of Burmese Amber." />
        </div>
        <ul>
            <li><strong>Authenticity Guarantee for Burmite Amber:</strong> We confirm authenticity through a battery of tests including UV Fluorescence (genuine Burmite emits a distinct milky-blue glow), Specific Gravity (it floats in saturated saltwater), and Microscopic Analysis to identify characteristic Cretaceous-period inclusions that are impossible to forge.</li>
            <li><strong>Authenticity for Precious Gemstones:</strong> Our rubies, sapphires, and spinels are sourced directly from renowned regions like Mogok. We guarantee they are natural and provide full transparency regarding any standard treatments (like heat), though we specialize in untreated stones.</li>
        </ul>

        <div className="mt-16 not-prose grid md:grid-cols-2 gap-8 items-center bg-[var(--c-surface-alt)] p-8 rounded-lg">
             <div className="space-y-4">
                <h3 className="text-3xl">Ethical & Transparent Sourcing</h3>
                <p className="text-[var(--c-text-secondary)]">We are deeply committed to a supply chain that honors both the land and its people. All our gems come with a story of respect.</p>
                <ul className="space-y-2 text-[var(--c-text-secondary)] list-disc list-inside">
                    <li><strong>Direct Partnerships:</strong> We work directly with small-scale, trusted miners in the Hukawng Valley and Mogok, eliminating middlemen to ensure fair value.</li>
                    <li><strong>Environmental Respect:</strong> Our relationships ensure our gems are sourced with respect for the local environment and a commitment to minimizing impact.</li>
                    <li><strong>Fair Compensation:</strong> We guarantee that the local communities who are the custodians of these resources are treated with respect and compensated fairly.</li>
                </ul>
            </div>
            <ImageWithAlt src="https://placehold.co/400x300/F0EBE6/534B42?text=Ethical+Sourcing" alt="Hands holding raw gemstones, symbolizing ethical sourcing." className="!my-0"/>
        </div>
        
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center not-prose my-12">
            <div className="flex-grow">
                <h2 className="text-4xl mt-0">Certificate of Authenticity</h2>
                <SectionDivider />
                <p className="text-[var(--c-text-secondary)]">
                   Every item from <span className="brand-name">Vicky LuxGems</span> is accompanied by our official, detailed Certificate of Authenticity. This document is our written promise to you, confirming the item's genuine nature, unique specifications, and verified origin from Myanmar. For high-value items, we can also facilitate third-party certification from labs like GIA or GIT upon request.
                </p>
            </div>
            <ImageWithAlt src="https://placehold.co/400x300/F0EBE6/534B42?text=Certificate" alt="Vicky LuxGems Certificate of Authenticity" />
        </div>
    </div>
);

const CareGuideContent: React.FC = () => (
    <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <p>Your gemstone and amber jewelry are treasures of the earth that require thoughtful care. Following these guidelines will ensure their beauty and integrity for generations.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Jewelry+Care+Kit" alt="A jewelry care kit with a soft cloth, brush, and gentle cleaning solution." />
        
        <h2>Specific Care for Burmese Amber</h2><SectionDivider />
        <p>Burmite is an organic gem, softer than mineral stones. It requires special attention.</p>
        <ul>
            <li><strong>Cleaning:</strong> Use only a soft, lint-free cloth (like microfiber) dampened with lukewarm water. For stubborn grime, a drop of mild, non-detergent soap can be used. Rinse with clean water and dry immediately and thoroughly.</li>
            <li><strong>Avoid Chemicals:</strong> Amber is sensitive to chemicals. Always remove your amber jewelry before applying perfume, hairspray, lotions, or sunscreen. This is the "last on, first off" rule.</li>
            <li><strong>Storage:</strong> Store amber separately in a soft pouch or a fabric-lined box away from harder gemstones to prevent scratches.</li>
        </ul>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Safe+Jewelry+Storage" alt="Amber jewelry stored safely in a fabric-lined jewelry box." />

        <h2>General Care for Precious Gemstones (Ruby, Sapphire, Spinel)</h2><SectionDivider />
        <p>While harder than amber, these gems still require proper care to maintain their brilliance.</p>
        <ul>
            <li><strong>Cleaning:</strong> A solution of warm water and mild dish soap is the safest cleaning method. Use a soft brush to gently clean behind the stone where dust can collect. Rinse thoroughly and dry with a soft cloth.</li>
            <li><strong>Avoid Ultrasonic Cleaners:</strong> While robust, we do not recommend ultrasonic cleaners for home use as they can potentially loosen settings or damage stones with certain inclusions.</li>
            <li><strong>Thermal Shock:</strong> Avoid exposing your gemstones to sudden and extreme temperature changes, which can cause fracturing.</li>
        </ul>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Professional+Check-up" alt="A jeweler inspecting a gemstone setting with a loupe." />
    </div>
);


const PreOrderPolicyContent: React.FC = () => (
     <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <p>Our Bespoke Commission Service allows you to create a piece of jewelry that is uniquely yours, crafted to your precise specifications using the finest materials from Myanmar. This policy outlines the dedicated process for these special orders.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Design+Sketch" alt="An elegant sketch of a custom jewelry design on drafting paper." />
        
        <h2>Step 1: The Consultation</h2><SectionDivider />
        <p>Your journey begins with a personal consultation. Whether you use our online design tools or contact us directly, we will discuss your vision, material preferences (amber color, gemstone type), quality grade, and design intricacies to create a detailed plan for your piece.</p>
        
        <h2>Step 2: Quotation & Sourcing Deposit</h2><SectionDivider />
        <p>Based on our consultation, we will provide a transparent quotation. To proceed, a <strong>non-refundable 50% deposit</strong> is required. This deposit is not just a down payment; it allows us to secure and allocate the specific, often rare, raw materials exclusively for your commission.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Raw+Gemstones" alt="A collection of raw, uncut gemstones ready for crafting." />
        
        <h2>Step 3: The Art of Creation</h2><SectionDivider />
        <p>Our master artisans will begin their work. The creation of a bespoke piece is a meticulous process that typically takes <strong>4 to 8 weeks</strong>, depending on complexity. We will provide you with progress updates along the way.</p>
        
        <h2>Step 4: Final Approval & Delivery</h2><SectionDivider />
        <p>Upon completion, we will send you high-resolution photographs and videos of your finished piece for your final approval. Once you are completely satisfied, the remaining 50% balance is due. After final payment, your custom treasure will be securely packaged, fully insured, and shipped to you.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Artisan+at+Work" alt="An artisan carefully setting a gemstone into a piece of jewelry." />
    </div>
);

const ShippingPolicyContent: React.FC = () => (
    <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <h2>1. Order Processing Time</h2><SectionDivider />
        <p>Ready-to-wear items are typically processed and dispatched within 1–3 business days. Bespoke and custom commissions follow the production timeline outlined in our Pre-Order Policy.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Secure+Packaging" alt="A luxury jewelry box being securely packed for shipping." />
        
        <h2>2. Domestic Shipping (Thailand)</h2><SectionDivider />
        <p>We offer complimentary, fully insured shipping via Kerry Express for all domestic orders. Delivery is typically within 1–3 business days after dispatch.</p>
        
        <h2>3. International Shipping</h2><SectionDivider />
        <p>We proudly ship worldwide using trusted couriers like <strong>DHL Express or FedEx</strong>. All international shipments are <strong>fully insured for their declared value</strong>, ensuring your investment is protected from our door to yours. Shipping rates are calculated at checkout and typically arrive within 5-14 business days, pending customs clearance.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=International+Shipping+Map" alt="A world map with shipping routes, indicating global delivery." />
        
        <h2>4. Customs, Duties, and Taxes (International)</h2><SectionDivider />
        <p>The recipient is responsible for all customs duties, taxes, and import fees levied by the destination country. These charges are not included in the item price or shipping cost. We ship under DAP (Delivered at Place) terms. Please consult your local customs office for information on potential charges.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Customs+Icon" alt="An icon representing customs and import duties." />
    </div>
);


const ReturnPolicyContent: React.FC = () => (
    <div className="prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
        <h2>1. Custom and Bespoke Items</h2><SectionDivider />
        <p>Due to the highly personalized nature of our work, all <strong>custom-commissioned and pre-ordered items are considered final sale</strong> and are not eligible for return or exchange. This is because materials are sourced and crafted specifically for you.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Final+Sale+Stamp" alt="A stamp graphic indicating 'Final Sale' on a document." />
        
        <h2>2. The Nature of Amber</h2><SectionDivider />
        <p>Burmese amber is an organic gem that attunes to its owner by absorbing natural oils over time. This creates a personal connection that makes it unsuitable for resale. We encourage thoughtful selection, understanding that you are choosing a piece that will become uniquely yours.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Personal+Connection" alt="A close-up of a person wearing an amber bracelet, showing the personal nature of the gem." />
        
        <h2>3. Conditions for an Accepted Return</h2><SectionDivider />
        <p>In the rare event of an issue, we will accept a return only under the following strict conditions:</p>
        <ul>
            <li><strong>Incorrect Item:</strong> You received an item that is demonstrably different from what was agreed upon in your final order confirmation.</li>
            <li><strong>Authenticity:</strong> An item's authenticity is disputed and subsequently proven incorrect by a certificate from a world-renowned, independent gemological laboratory (e.g., GIA, GIT, AIGS).</li>
        </ul>
        <p>To initiate a qualified return, please contact us within 7 days of receipt at <strong>info.vkamber@gmail.com</strong>.</p>
        <ImageWithAlt src="https://placehold.co/800x450/F0EBE6/534B42?text=Quality+Check+Icon" alt="An icon of a magnifying glass over a gemstone, representing a quality and authenticity check." />
    </div>
);


const AboutUsPoliciesPage: React.FC = () => {
    const { t } = useLanguage();
    const { pageContent } = useAppContext();
    const objectId = pageContent?.['data-sb-object-id'];

    const tabs = [
        { id: 'story', name: t('nav_Our_Story'), component: <OurStoryContent />, seoTitle: t('seo_about_title'), seoDesc: t('seo_about_desc') },
        { id: 'privacy', name: t('nav_Privacy_Policy'), component: <PrivacyPolicyContent />, seoTitle: t('seo_privacy_policy_title'), seoDesc: t('seo_privacy_policy_desc') },
        { id: 'warranty', name: t('nav_Warranty_Policy'), component: <WarrantyPolicyContent />, seoTitle: t('seo_warranty_policy_title'), seoDesc: t('seo_warranty_policy_desc') },
        { id: 'guarantee', name: t('nav_Our_Guarantee'), component: <OurGuaranteeContent />, seoTitle: t('seo_guarantee_title'), seoDesc: t('seo_guarantee_desc') },
        { id: 'care', name: t('nav_How_to_Take_Care'), component: <CareGuideContent />, seoTitle: t('seo_care_guide_title'), seoDesc: t('seo_care_guide_desc') },
        { id: 'preorder', name: t('nav_Pre-Order_Policy'), component: <PreOrderPolicyContent />, seoTitle: t('seo_preorder_policy_title'), seoDesc: t('seo_preorder_policy_desc') },
        { id: 'shipping', name: t('nav_Shipping_&_Delivery_Policy'), component: <ShippingPolicyContent />, seoTitle: t('seo_shipping_policy_title'), seoDesc: t('seo_shipping_policy_desc') },
        { id: 'return', name: t('nav_Return_Policy'), component: <ReturnPolicyContent />, seoTitle: t('seo_return_policy_title'), seoDesc: t('seo_return_policy_desc') },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];
    
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        const element = document.getElementById('tab-content-area');
        if (element) {
            const headerOffset = 150; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }


    return (
        <div className="page-container-with-bg py-16 md:py-24" data-sb-object-id={objectId}>
            <SEO 
                title={pageContent?.title || (activeTabData.seoTitle as any)}
                description={pageContent?.heroSubtitle || (activeTabData.seoDesc as any)}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-5xl mx-auto rounded-lg shadow-xl border border-[var(--c-border-muted)]">
                    <div className="p-8 md:p-12 text-center">
                         <h1 className="text-5xl font-bold tracking-tight" data-sb-field-path="heroTitle">{pageContent?.heroTitle || 'About Us & Our Policies'}</h1>
                         <p className="mt-4 text-xl text-[var(--c-text-secondary)]" data-sb-field-path="heroSubtitle">{pageContent?.heroSubtitle || 'Our Commitment to Quality, Transparency, and You'}</p>
                    </div>
                    
                    <div className="tab-container sticky top-[80px] md:top-[96px] z-20 bg-[var(--c-surface)]/80 backdrop-blur-md">
                        <div className="tab-list">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    aria-controls="tab-content-area"
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <div id="tab-content-area" className="tab-content" role="tabpanel" data-sb-field-path="body">
                            {activeTabData.component}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsPoliciesPage;
