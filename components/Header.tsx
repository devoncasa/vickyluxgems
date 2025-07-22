
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { CartIcon, MenuIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from './IconComponents';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
    cartCount: number;
}

const prefetchScript = (href: string) => {
    // Check if a prefetch link for this href already exists
    if (document.querySelector(`link[rel="modulepreload"][href="${href}"]`)) {
        return;
    }
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = href;
    document.head.appendChild(link);
};

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
    const headerRef = useRef<HTMLElement>(null);
    const { t } = useLanguage();
    const location = useLocation();

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setOpenDesktopSubmenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getTranslationKey = (name: string) => `nav_${name.replace(/ /g, '_')}`;
    const ChevronIcon = ChevronRightIcon; // Site is now LTR only

    const handlePrefetch = (path?: string) => {
        if (!path) return;
        // This is a conceptual demonstration. In a real build system (like Vite),
        // you would prefetch the specific JS chunk for that route.
        // Here, we preload the main script as a placeholder.
        prefetchScript('/index.tsx');
    };

    const DesktopNav = () => {
        const linkClasses = "py-1 px-1 lg:px-2 uppercase tracking-wider main-nav-link flex items-center gap-1";
        const activeLinkClasses = "active font-semibold";
        const inactiveLinkClasses = "opacity-80";

        return (
            <nav className="hidden lg:flex items-center space-x-4">
                {NAV_LINKS.map((link) => (
                    <div 
                        key={link.name} 
                        className="relative"
                    >
                        <button
                            onMouseEnter={() => handlePrefetch(link.path)}
                            onClick={(e) => {
                                if (link.path) {
                                    // If it has a path, let the NavLink handle it
                                    return;
                                }
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
                                 className={({ isActive }) => `${linkClasses} ${link.path && isActive ? activeLinkClasses : inactiveLinkClasses}`}
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
    };

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
            <header ref={headerRef} className="bg-[var(--c-bg)]/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-[var(--c-border)]">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between h-28">
                        
                        {/* --- Left Side: Logo --- */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="logo-group flex items-center">
                                <img src="https://i.postimg.cc/BZ7Qgx8s/vkluxgem-logo-smll.webp" alt="VickyLuxGems Logo" className="header-logo"/>
                            </Link>
                        </div>

                        {/* --- Center: Desktop Navigation --- */}
                        <div className="hidden lg:flex justify-center flex-grow">
                            <DesktopNav />
                        </div>

                        {/* --- Right Side: Icons --- */}
                        <div className="flex items-center">
                             {/* Cart Icon (All Sizes) */}
                            <button className="relative p-2 rounded-full hover:bg-[var(--c-accent-primary)]/10 transition-colors lg:ms-2" aria-label="View shopping cart">
                                <CartIcon className="h-6 w-6 text-[var(--c-text-primary)] opacity-80" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -end-1 block h-5 w-5 rounded-full bg-[var(--c-accent-secondary)] text-white text-xs flex items-center justify-center border-2 border-[var(--c-bg)]">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            {/* Mobile Menu Button */}
                             <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-[var(--c-text-primary)] opacity-80 hover:bg-[var(--c-accent-primary)]/10 lg:hidden mobile-menu-button"
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

            {/* Mobile Menu Overlay & Panel */}
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
