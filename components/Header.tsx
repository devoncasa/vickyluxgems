
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants.ts';
import { MenuIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, GlobeIcon } from './IconComponents.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { languages } from '../i18n/config.ts';
import GlobalCart from './GlobalCart.tsx';

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

export const LanguageSwitcher: React.FC<{ forMobile?: boolean; isScrolled?: boolean; context?: 'dark' | 'light' | 'popup' }> = ({ forMobile = false, isScrolled = false, context = 'light' }) => {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const handleLanguageChange = (newLang: 'en' | 'th') => {
        setLang(newLang);
        setIsOpen(false);
    };

    const buttonClasses = () => {
        const base = "flex items-center gap-2 rounded-full transition-colors";
        if (forMobile) {
            return `flex items-center gap-2 justify-between w-full p-3 rounded-md text-sm font-medium transition-colors !bg-[var(--c-surface-alt)] !text-[var(--c-text-primary)] border border-[var(--c-border)]`;
        }
        if (context === 'dark') {
            return `${base} px-3 py-1.5 text-sm font-medium bg-transparent text-white border border-white/30 hover:border-white/60`;
        }
        if (context === 'popup') {
            return `flex items-center gap-1.5 bg-[var(--c-surface-alt)] text-[var(--c-text-secondary)] border border-[var(--c-border)] py-1 px-3 text-xs font-normal rounded-full hover:border-[var(--c-accent-primary)]/50`;
        }
        // This is for Header on desktop (light context)
        const baseDesktop = `${base} px-3 py-1.5 text-sm font-medium`;
        const scrolledClasses = "text-white border-transparent hover:bg-white/10";
        const notScrolledClasses = "text-[var(--c-text-primary)] border-[var(--c-border)] hover:bg-[var(--c-surface-alt)]";
        return `${baseDesktop} ${isScrolled ? scrolledClasses : notScrolledClasses}`;
    };

    const dropdownClasses = () => {
        const base = "absolute top-full mt-2 w-48 bg-[var(--c-surface)] rounded-lg shadow-xl border border-[var(--c-border)] z-50 overflow-hidden transition-all duration-300 animate-fade-in-up";
        if (forMobile) return `${base} start-0 w-full`;
        return `${base} end-0`;
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                className={buttonClasses()}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="w-5 h-5 opacity-80" />
                <span>{languages[lang].name}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div
                    className={dropdownClasses()}
                    role="menu"
                    aria-orientation="vertical"
                >
                    <style>{`
                        @keyframes fade-in-up {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
                    `}</style>
                    {Object.entries(languages).map(([code, { name }]) => (
                        <button
                            key={code}
                            onClick={() => handleLanguageChange(code as 'en' | 'th')}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                                lang === code
                                    ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold'
                                    : 'text-[var(--c-text-primary)]/90 hover:bg-[var(--c-accent-primary)]/5'
                            }`}
                            role="menuitem"
                        >
                            <span className={`w-5 h-5 flex items-center justify-center font-bold text-sm ${lang === code ? 'text-[var(--c-accent-primary)]' : 'text-transparent'}`}>
                                {lang === code && '✓'}
                            </span>
                            <span>{name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const { t } = useLanguage();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname, location.search]);

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

    // Handle sticky header background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        prefetchScript('/index.tsx');
    };

    const DesktopNav = () => {
        const linkClasses = "py-1 px-1 lg:px-2 uppercase tracking-wider main-nav-link flex items-center gap-1";
        const activeLinkClasses = "active font-semibold";
        const inactiveLinkClasses = "opacity-80";

        const searchParams = new URLSearchParams(location.search);
        const currentCategory = searchParams.get('category');

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
                                if (link.path && !link.submenus) {
                                    return;
                                }
                                e.preventDefault();
                                setOpenDesktopSubmenu(openDesktopSubmenu === link.name ? null : link.name);
                            }}
                            className="w-full"
                        >
                            <NavLink
                                to={link.path || '#'}
                                 onClick={(e) => {
                                    if (!link.path || link.submenus) {
                                        e.preventDefault();
                                        setOpenDesktopSubmenu(openDesktopSubmenu === link.name ? null : link.name);
                                    } else {
                                        setOpenDesktopSubmenu(null);
                                    }
                                }}
                                 className={({ isActive }) => `${linkClasses} ${link.path && isActive && !link.submenus ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                <span>{t(getTranslationKey(link.name) as any)}</span>
                                {link.submenus && <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${openDesktopSubmenu === link.name ? 'rotate-180' : ''}`} />}
                            </NavLink>
                        </button>
                        {link.submenus && (
                            <div className={`absolute top-full start-0 mt-2 min-w-[250px] max-h-[80vh] overflow-y-auto bg-[var(--c-surface)] shadow-xl rounded-md border border-[var(--c-border)] p-2 z-30 transition-all duration-300 ${openDesktopSubmenu === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                                {link.submenus.map(submenu => {
                                    const submenuPath = submenu.path || '#';
                                    const submenuCategory = submenuPath.includes('?category=') ? new URLSearchParams(submenuPath.split('?')[1]).get('category') : null;
                                    const isAllProducts = submenuPath === '/collection' && !submenuPath.includes('?');

                                    const isActive = isAllProducts 
                                        ? location.pathname === '/collection' && !currentCategory
                                        : submenuCategory ? currentCategory === submenuCategory : location.pathname === submenuPath;

                                    return (
                                        <Link
                                            key={submenu.name}
                                            to={submenuPath}
                                            onClick={() => setOpenDesktopSubmenu(null)}
                                            className={`block px-4 py-2 text-sm rounded-md transition-colors ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold' : 'text-[var(--c-text-primary)]/90 hover:bg-[var(--c-accent-primary)]/10 hover:text-[var(--c-accent-primary)]'}`}
                                        >
                                            {t(getTranslationKey(submenu.name) as any)}
                                        </Link>
                                    )
                                })}
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
                                        <NavLink
                                            key={submenu.name}
                                            to={submenu.path || '#'}
                                            className={({ isActive }) => `block px-3 py-2 rounded-md font-medium text-sm ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold' : 'text-[var(--c-text-secondary)] hover:bg-[var(--c-accent-primary)]/10'}`}
                                        >
                                            {t(getTranslationKey(submenu.name) as any)}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink
                            to={link.path || '#'}
                            className={({ isActive }) => `block px-4 py-4 text-start font-medium ${isActive ? 'bg-[var(--c-accent-primary)]/10 text-[var(--c-accent-primary)] font-semibold' : 'text-[var(--c-text-primary)]/90'}`}
                        >
                            {t(getTranslationKey(link.name) as any)}
                        </NavLink>
                    )}
                </div>
            ))}
        </>
    );

    return (
        <>
            <header ref={headerRef} className={`main-header sticky top-0 z-50 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        
                        {/* --- Left Side: Logo --- */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="logo-group flex items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets@main/vkluxgem%20logo%20smll.webp" alt="VickyLuxGems Logo" className="header-logo"/>
                            </Link>
                        </div>

                        {/* --- Center: Desktop Navigation --- */}
                        <div className="hidden lg:flex justify-center flex-grow">
                            <DesktopNav />
                        </div>

                        {/* --- Right Side: Icons --- */}
                        <div className="flex items-center gap-2">
                             <LanguageSwitcher isScrolled={isScrolled} />
                             <GlobalCart />
                            {/* Mobile Menu Button */}
                             <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md lg:hidden mobile-menu-button"
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
                    <div className="p-4 border-b border-[var(--c-border)] lg:hidden">
                        <LanguageSwitcher forMobile={true} />
                    </div>
                    <MobileNav />
                </div>
            </div>
        </>
    );
};

export default Header;
