
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { CartIcon, MenuIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from './IconComponents';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const { t } = useLanguage();
    const location = useLocation();

    // Scroll listener for dynamic header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check on load
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close desktop dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setOpenDesktopSubmenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getTranslationKey = (name: string) => `nav_${name.replace(/ /g, '_')}`;
    const ChevronIcon = ChevronRightIcon;

    const DesktopNav = () => (
        <nav className="hidden lg:flex items-center space-x-4">
            {NAV_LINKS.map((link) => (
                <div key={link.name} className="relative">
                    <button
                        onClick={(e) => {
                            if (link.path) return;
                            e.preventDefault();
                            setOpenDesktopSubmenu(openDesktopSubmenu === link.name ? null : link.name);
                        }}
                        className="w-full"
                    >
                        <RouterNavLink
                            to={link.path || '#'}
                            onClick={(e) => {
                                if (!link.path) {
                                    e.preventDefault();
                                    setOpenDesktopSubmenu(openDesktopSubmenu === link.name ? null : link.name);
                                } else {
                                    setOpenDesktopSubmenu(null);
                                }
                            }}
                            className={({ isActive }) => `py-1 px-1 lg:px-2 uppercase tracking-wider main-nav-link flex items-center gap-1 ${link.path && isActive ? 'active' : ''}`}
                        >
                            <span>{t(getTranslationKey(link.name) as any)}</span>
                            {link.submenus && <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${openDesktopSubmenu === link.name ? 'rotate-180' : ''}`} />}
                        </RouterNavLink>
                    </button>
                    {link.submenus && (
                        <div className={`absolute top-full start-0 mt-2 min-w-[250px] max-h-[80vh] overflow-y-auto bg-[var(--c-surface)] shadow-xl rounded-md border border-[var(--c-border)] p-2 z-30 transition-all duration-300 ${openDesktopSubmenu === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                            {link.submenus.map(submenu => (
                                <RouterNavLink
                                    key={submenu.name}
                                    to={submenu.path || '#'}
                                    onClick={() => setOpenDesktopSubmenu(null)}
                                    className={({ isActive }) => `block px-4 py-2 text-sm rounded-md transition-colors ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)]' : 'text-[var(--c-text-primary)]/90 hover:bg-[var(--c-accent-primary)]/10 hover:text-[var(--c-accent-primary)]'}`}
                                >
                                    {t(getTranslationKey(submenu.name) as any)}
                                </RouterNavLink>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );

    const MobileNav = () => (
        <>
            {NAV_LINKS.map((link) => (
                <div key={link.name} className="border-b border-[var(--c-border)]">
                    {link.submenus ? (
                        <>
                            <button
                                onClick={() => setOpenMobileSubmenu(openMobileSubmenu === link.name ? null : link.name)}
                                className="w-full flex justify-between items-center px-4 py-4 text-start font-medium text-[var(--c-text-primary)]/90"
                            >
                                <span>{t(getTranslationKey(link.name) as any)}</span>
                                <ChevronIcon className={`w-5 h-5 transition-transform ${openMobileSubmenu === link.name ? 'rotate-90' : ''}`} />
                            </button>
                            {openMobileSubmenu === link.name && (
                                <div className="ps-6 pb-2 space-y-1 mt-1">
                                    {link.submenus.map(submenu => (
                                        <RouterNavLink
                                            key={submenu.name}
                                            to={submenu.path || '#'}
                                            className={({ isActive }) => `block px-3 py-2 rounded-md font-medium text-sm ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold' : 'text-[var(--c-text-secondary)] hover:bg-[var(--c-accent-primary)]/10'}`}
                                        >
                                            {t(getTranslationKey(submenu.name) as any)}
                                        </RouterNavLink>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <RouterNavLink
                            to={link.path || '#'}
                            className={({ isActive }) => `block px-4 py-4 text-start font-medium ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold' : 'text-[var(--c-text-primary)]/90'}`}
                        >
                            {t(getTranslationKey(link.name) as any)}
                        </RouterNavLink>
                    )}
                </div>
            ))}
        </>
    );

    return (
        <>
            <header ref={headerRef} className={isScrolled ? 'header--scrolled' : 'header--top'}>
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between h-24">
                        
                        <div className="flex-shrink-0">
                            <Link to="/" className="logo-group flex items-center">
                                <img src="https://i.postimg.cc/BZ7Qgx8s/vkluxgem-logo-smll.webp" alt="VickyLuxGems Logo" className="header-logo"/>
                            </Link>
                        </div>

                        <div className="hidden lg:flex justify-center flex-grow">
                            <DesktopNav />
                        </div>

                        <div className="flex items-center">
                            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors lg:ms-2" aria-label="View shopping cart">
                                <CartIcon className="h-6 w-6 cart-icon" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -end-1 block h-5 w-5 rounded-full bg-[var(--c-accent-secondary)] text-white text-xs flex items-center justify-center border-2 border-[var(--c-bg)]">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                             <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md hover:bg-white/10 lg:hidden mobile-menu-button"
                                aria-label="Toggle menu"
                                aria-controls="mobile-nav-panel"
                                aria-expanded={isMenuOpen}
                            >
                                <MenuIcon className="h-6 w-6 mobile-menu-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div 
                    className="mobile-nav-overlay lg:hidden" 
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            <div 
                id="mobile-nav-panel"
                className={`mobile-nav-panel lg:hidden ${isMenuOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-heading"
            >
                <div className="flex items-center justify-between p-4 border-b border-[var(--c-border)]">
                    <h2 id="mobile-menu-heading" className="font-serif font-bold text-lg text-[var(--c-heading)]">Menu</h2>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full -m-2">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <MobileNav />
                </div>
            </div>
        </>
    );
};

export default Header;