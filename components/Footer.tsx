
import React from 'react';
import { Link } from 'react-scroll';
import { SOCIAL_LINKS, CERTIFICATION_ICONS } from '../constants';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
  const { t } = useTranslations();

  return (
    <footer className="bg-stone-200 text-stone-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold text-amber-800">{t('footer.brandName')}</h3>
            <p className="mt-4 text-stone-600 max-w-md">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold tracking-wider uppercase text-amber-800">{t('footer.quickLinksTitle')}</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="home" smooth={true} duration={500} className="text-stone-600 hover:text-amber-800 cursor-pointer">{t('footer.linkHome')}</Link></li>
              <li><Link to="legacy" smooth={true} duration={500} offset={-80} className="text-stone-600 hover:text-amber-800 cursor-pointer">{t('footer.linkStory')}</Link></li>
              <li><Link to="products" smooth={true} duration={500} offset={-80} className="text-stone-600 hover:text-amber-800 cursor-pointer">{t('footer.linkProducts')}</Link></li>
              <li><Link to="faq" smooth={true} duration={500} offset={-80} className="text-stone-600 hover:text-amber-800 cursor-pointer">{t('footer.linkFaq')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold tracking-wider uppercase text-amber-800">{t('footer.connectTitle')}</h4>
            <div className="mt-4 flex space-x-6">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-amber-800 text-2xl">
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
                <h4 className="text-lg font-semibold tracking-wider uppercase text-amber-800">{t('footer.certifiedTitle')}</h4>
                <div className="flex space-x-4 mt-4">
                    {CERTIFICATION_ICONS.map(icon => (
                        <img key={icon.alt} src={icon.src} alt={icon.alt} className="h-12 w-12 rounded-full object-cover" />
                    ))}
                </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-stone-300 pt-8 text-center text-stone-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
