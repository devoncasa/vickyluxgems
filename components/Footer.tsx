
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { EmailIcon } from './IconComponents.tsx';
import { useAppContext } from '../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setIsAdminPanelOpen } = useAppContext();
  const copyrightText = t('footer_copyright', { year: new Date().getFullYear() });
  const parts = copyrightText.split('<brand>');

  return (
    <>
      {/* Full site footer, now visible on all screen sizes */}
      <footer className="footer-with-bg dark-context">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif">{t('footer_address_title')}</h3>
              <address className="mt-2 text-sm not-italic">
                {t('footer_address_detail')}
              </address>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t('footer_explore_title')}</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li><Link to="/collection" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_Shop')}</Link></li>
                 <li><Link to="/blog" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_Blogs')}</Link></li>
                 <li><Link to="/pricing-guide" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_The_Different_Types_of_Amber')}</Link></li>
                 <li><Link to="/amber-colors" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_The_Variety_of_Colors_&_Tones')}</Link></li>
                 <li><Link to="/glossary" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_Glossary_of_Terms')}</Link></li>
                <li><Link to="/about-us-policies" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_About_Us_&_Policies')}</Link></li>
                <li><Link to="/faqs" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_FAQs')}</Link></li>
                <li><Link to="/contact" className="hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">{t('nav_Contact_Us')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t('footer_contact_title')}</h3>
              <div className="mt-4 space-y-6 text-sm">
                {/* Vicky S. (Direct Contact) */}
                <div>
                  <p className="font-semibold mb-2">{t('footer_vicky_direct_contact')}</p>
                  <div className="space-y-3">
                    <a href="tel:+66631959922" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/13NPXHVW/tel-icon-small.webp" alt="Phone" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_vicky_phone')}</span>
                    </a>
                    <a href="https://wa.me/66631959922" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/gj3p4y3z/whatsapp.webp" alt="WhatsApp" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_whatsapp')}</span>
                    </a>
                    <a href="https://line.me/ti/p/~vickyamber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/TPMxDDrT/Line-icon-small.webp" alt="LINE" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_line')}</span>
                    </a>
                    <a href="https://i.postimg.cc/NfK6M959/wechat-qr-code-placeholder.png" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/BQz4JybL/wechat-icon-small.webp" alt="WeChat" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_wechat')}</span>
                    </a>
                    <a href="https://m.me/vkmmamber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/gJCdvtXt/messenger.webp" alt="Messenger" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_messenger')}</span>
                    </a>
                  </div>
                </div>
                
                {/* General Inquiries */}
                <div>
                  <p className="font-semibold mb-2">{t('footer_general_inquiries')}</p>
                  <div className="space-y-3">
                    <a href="tel:+66818519922" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <img src="https://i.postimg.cc/13NPXHVW/tel-icon-small.webp" alt="Phone" className="w-5 h-5 flex-shrink-0" />
                      <span>{t('footer_office_phone')}</span>
                    </a>
                    <a href="mailto:info.vkamber@gmail.com?cc=vkamber91@gmail.com" className="flex items-center gap-3 hover:text-[var(--c-accent-primary)] transition-colors group">
                      <EmailIcon className="w-5 h-5 text-[var(--c-accent-primary)] flex-shrink-0" />
                      <span>{t('footer_contact_email_1')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold">{t('footer_follow_us_title')}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-4 social-links">
                    <a href="https://facebook.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/YCMfNbVb/facebook.webp" alt="Facebook" className="w-8 h-8" />
                    </a>
                    <a href="https://instagram.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/P5ybS1nh/instagram.webp" alt="Instagram" className="w-8 h-8" />
                    </a>
                    <a href="https://twitter.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/632d6S25/twitter.webp" alt="Twitter" className="w-8 h-8" />
                    </a>
                    <a href="https://pinterest.com/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/JnfjsqZ3/pinterest.webp" alt="Pinterest" className="w-8 h-8" />
                    </a>
                    <a href="https://youtube.com/@vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/hG3LBgG5/youtube.webp" alt="YouTube" className="w-8 h-8" />
                    </a>
                    <a href="https://linkedin.com/company/vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/bNXRrzRX/linkedin.webp" alt="LinkedIn" className="w-8 h-8" />
                    </a>
                    <a href="https://tiktok.com/@vkmmamber" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" className="transition-transform duration-200 hover:scale-110">
                        <img src="https://i.postimg.cc/cJJR26d3/tiktok.webp" alt="Tiktok" className="w-8 h-8" />
                    </a>
                </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
             <button onClick={() => setIsAdminPanelOpen(true)} aria-label="Admin Section" className="cursor-pointer">
              <img 
                  src="https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets@main/vkluxgem%20logo%20smll.webp" 
                  alt="VickyLuxGems Logo" 
                  className="h-10 w-auto block mx-auto mb-4"
              />
            </button>
            <p className="text-sm">
                {parts.length > 1 ? (
                    <>
                        {parts[0]}
                        <span className="brand-name">Vicky LuxGems</span>
                        {parts[1]}
                    </>
                ) : (
                    copyrightText
                )}
            </p>
            <a href="https://www.vickyluxgems.com" target="_blank" rel="noopener noreferrer" className="text-sm mt-2 inline-block hover:text-[var(--c-accent-primary)] transition-colors opacity-80 hover:opacity-100">
                www.vickyluxgems.com
            </a>
          </div>
        </div>
      </footer>
      
      {/* Sticky Mobile Footer Menu */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--c-surface)] border-t border-[var(--c-border)] shadow-t-lg z-50">
          <div className="flex justify-around items-center h-16">
              <Link to="/collection" className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-primary)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  <span className="text-xs">{t('footer_mobile_shop')}</span>
              </Link>
              <Link to="/build-your-set" className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-primary)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4" /></svg>
                  <span className="text-xs">{t('footer_mobile_preorder')}</span>
              </Link>
              <Link to="/blog" className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-primary)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <span className="text-xs">{t('footer_mobile_blog')}</span>
              </Link>
              <Link to="/contact" className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-primary)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-xs">{t('footer_mobile_contact')}</span>
              </Link>
          </div>
      </footer>
    </>
  );
};
