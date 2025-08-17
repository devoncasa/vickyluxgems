
import React, { useState, useContext } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../constants';
import { FiMenu, FiX, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { LanguageContext } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setCartOpen: (isOpen: boolean) => void;
  cartItemCount: number;
}

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <div className="flex items-center bg-stone-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
          language === 'en' ? 'bg-amber-800 text-white' : 'text-stone-600 hover:bg-stone-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('th')}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
          language === 'th' ? 'bg-amber-800 text-white' : 'text-stone-600 hover:bg-stone-200'
        }`}
      >
        TH
      </button>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, setCartOpen, cartItemCount }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { t } = useTranslations();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="home" smooth={true} duration={500} className="cursor-pointer">
              <img 
                className="h-14 w-auto"
                src="https://i.postimg.cc/mrQKP5dZ/taan-logo-small.webp" 
                alt={t('header.brandName')} 
              />
            </Link>
          </div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {MENU_ITEMS.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                  onMouseLeave={() => item.subItems && setOpenDropdown(null)}
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-stone-600 hover:text-amber-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center"
                  >
                    {t(item.name)}
                    {item.subItems && <FiChevronDown className="ml-1 h-4 w-4" />}
                  </Link>
                  <AnimatePresence>
                    {item.subItems && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1"
                      >
                        {item.subItems.map(subItem => (
                           <Link
                            key={subItem.name}
                            to={subItem.to}
                            smooth={true}
                            duration={500}
                            offset={-80}
                            onClick={() => setOpenDropdown(null)}
                            className="text-stone-600 hover:text-amber-900 hover:bg-amber-50 block px-4 py-2 text-sm cursor-pointer whitespace-nowrap"
                          >
                            {t(subItem.name)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full text-stone-600 hover:text-amber-900 hover:bg-amber-100 transition-colors">
              <FiShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{cartItemCount}</span>
              )}
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setCartOpen(true)} className="relative mr-2 p-2 rounded-full text-stone-600 hover:text-amber-900 hover:bg-amber-100 transition-colors">
              <FiShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{cartItemCount}</span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-amber-900 hover:bg-amber-100 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {MENU_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => !item.subItems && setIsMenuOpen(false)}
                    className="text-stone-600 hover:text-amber-900 hover:bg-amber-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  >
                    {t(item.name)}
                  </Link>
                  {item.subItems && (
                     <div className="pl-4">
                        {item.subItems.map(subItem => (
                            <Link
                                key={subItem.name}
                                to={subItem.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-stone-500 hover:text-amber-900 hover:bg-amber-50 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                            >
                                {t(subItem.name)}
                            </Link>
                        ))}
                     </div>
                  )}
                </div>
              ))}
              <div className="flex justify-center pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
