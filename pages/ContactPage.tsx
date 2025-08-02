

import React from 'react';
import { BACKGROUND_IMAGES } from '../constants';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { useLanguage } from '../i18n/LanguageContext';
import { EmailIcon, WhatsAppIcon } from '../components/IconComponents';

const ContactPage: React.FC = () => {
    const { lang, t } = useLanguage();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you shortly.");
        (e.target as HTMLFormElement).reset();
    };

    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "JewelryStore",
        "name": "Vicky LuxGems",
        "image": "https://i.postimg.cc/Qd8yW639/vkambergems-logo-small.png",
        "url": window.location.origin,
        "telephone": "+66631959922",
        "priceRange": "THB",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "919/1 Jewelry Trade Center Bldg, BB038, Silom Rd., Silom",
            "addressLocality": "Bangrak",
            "addressRegion": "Bangkok",
            "postalCode": "10500",
            "addressCountry": "TH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "13.725925",
            "longitude": "100.528416"
        },
        "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "10:00",
              "closes": "18:00"
            }
        ]
    };

    return (
        <div 
            className="page-container-with-bg"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[22]}')` }}
        >
            <SEO 
                titleKey="seo_contact_title"
                descriptionKey="seo_contact_desc"
                keywordsKey="seo_contact_keywords"
                imageUrl="https://i.postimg.cc/bwx6w9vN/Vicky-Amber-Gems-background-0040.jpg"
            />
            <JsonLd data={{...businessSchema, "@language": lang }} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-5xl font-bold text-[var(--c-heading)]">{t('nav_Contact_Us')}</h1>
                    <p className="mt-4 text-xl text-[var(--c-text-secondary)]">We would love to hear from you. Please reach out with any questions or inquiries.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Contact Info Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-[var(--c-surface)] p-8 rounded-lg shadow-lg h-full border border-[var(--c-border)]">
                            <h2 className="text-2xl font-bold text-[var(--c-heading)] mb-6">Our Information</h2>
                            <div className="space-y-6 text-[var(--c-text-primary)]/90">
                                <div>
                                    <h3 className="font-semibold text-[var(--c-heading)] text-lg">Our Showroom</h3>
                                    <address className="not-italic text-sm mt-1">
                                        <span className="brand-name">Vicky LuxGems</span> Co., Ltd.<br/>
                                        919/1 Jewelry Trade Center Building<br/>
                                        BB038, Silom Rd., Silom, Bangrak<br/>
                                        Bangkok 10500 THAILAND
                                    </address>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--c-heading)] text-lg">Contact Channels</h3>
                                    <div className="mt-2 space-y-4">
                                        {/* Vicky's Contact */}
                                        <div>
                                            <p className="font-medium">Vicky S.</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <img src="https://i.postimg.cc/13NPXHVW/tel-icon-small.webp" alt="Phone" className="w-5 h-5 text-[var(--c-accent-primary)] flex-shrink-0" />
                                                <a href="tel:+66631959922" className="text-sm hover:text-[var(--c-accent-primary)] transition-colors">+66 (0)63 195 9922</a>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 pl-1">
                                                <a href="https://wa.me/66631959922" target="_blank" rel="noopener noreferrer" aria-label="Chat with Vicky on WhatsApp" className="flex items-center gap-1.5 text-sm hover:text-green-600 transition-colors">
                                                    <WhatsAppIcon className="w-5 h-5 text-green-600" />
                                                    <span>WhatsApp</span>
                                                </a>
                                                <a href="https://line.me/ti/p/~vickyamber" target="_blank" rel="noopener noreferrer" aria-label="Contact Vicky on LINE" className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity">
                                                    <img src="https://i.postimg.cc/TPMxDDrT/Line-icon-small.webp" alt="LINE icon" className="w-5 h-5" />
                                                    <span>LINE</span>
                                                </a>
                                                <a href="https://i.postimg.cc/NfK6M959/wechat-qr-code-placeholder.png" target="_blank" rel="noopener noreferrer" aria-label="Scan WeChat QR Code for Vicky" className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity">
                                                    <img src="https://i.postimg.cc/BQz4JybL/wechat-icon-small.webp" alt="WeChat icon" className="w-5 h-5" />
                                                    <span>WeChat</span>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Office Contact */}
                                        <div>
                                            <p className="font-medium">Office</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                 <img src="https://i.postimg.cc/13NPXHVW/tel-icon-small.webp" alt="Phone" className="w-5 h-5 text-[var(--c-accent-primary)] flex-shrink-0" />
                                                <a href="tel:+66818519922" className="text-sm hover:text-[var(--c-accent-primary)] transition-colors">+66 (0)81 851 9922</a>
                                            </div>
                                        </div>

                                        {/* Email Contact */}
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <EmailIcon className="w-5 h-5 text-[var(--c-accent-primary)] flex-shrink-0" />
                                                <a href="mailto:info.vkamber@gmail.com?cc=vkamber91@gmail.com" className="text-sm hover:text-[var(--c-accent-primary)] transition-colors break-all">info.vkamber@gmail.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--c-heading)] text-lg">Follow Us</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <a href="https://facebook.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/YCMfNbVb/facebook.webp" alt="Facebook" className="w-8 h-8" />
                                        </a>
                                        <a href="https://instagram.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/P5ybS1nh/instagram.webp" alt="Instagram" className="w-8 h-8" />
                                        </a>
                                        <a href="https://twitter.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/632d6S25/twitter.webp" alt="Twitter" className="w-8 h-8" />
                                        </a>
                                        <a href="https://pinterest.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/JnfjsqZ3/pinterest.webp" alt="Pinterest" className="w-8 h-8" />
                                        </a>
                                        <a href="https://youtube.com/@vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/hG3LBgG5/youtube.webp" alt="YouTube" className="w-8 h-8" />
                                        </a>
                                        <a href="https://linkedin.com/company/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/bNXRrzRX/linkedin.webp" alt="LinkedIn" className="w-8 h-8" />
                                        </a>
                                        <a href="https://tiktok.com/@vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" className="opacity-80 hover:opacity-100 transition-opacity">
                                            <img src="https://i.postimg.cc/cJJR26d3/tiktok.webp" alt="Tiktok" className="w-8 h-8" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-[var(--c-surface)] p-8 rounded-lg shadow-lg border border-[var(--c-border)]">
                            <h2 className="text-2xl font-bold text-[var(--c-heading)] mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[var(--c-text-primary)]/90">Name</label>
                                    <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--c-accent-primary)] focus:border-[var(--c-accent-primary)]" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[var(--c-text-primary)]/90">Email</label>
                                    <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--c-accent-primary)] focus:border-[var(--c-accent-primary)]" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--c-text-primary)]/90">Subject</label>
                                    <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-3 py-2 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--c-accent-primary)] focus:border-[var(--c-accent-primary)]" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[var(--c-text-primary)]/90">Message</label>
                                    <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-3 py-2 bg-[var(--c-surface)] border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--c-accent-primary)] focus:border-[var(--c-accent-primary)]"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full btn-primary text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;