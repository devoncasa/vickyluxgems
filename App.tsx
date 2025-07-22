

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BuildYourOwnPage from './pages/BuildYourOwnPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OurGuaranteePage from './pages/LearnAndBeliefsPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PricingGuidePage from './pages/PricingGuidePage';
import AmberColorsPage from './pages/AmberColorsPage';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CareGuidePage from './pages/CareGuidePage';
import PreOrderPolicyPage from './pages/PreOrderPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import WarrantyPolicyPage from './pages/WarrantyPolicyPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import GitInfoPage from './pages/GitInfoPage';
import Breadcrumbs from './components/Breadcrumbs';
import GlossaryPage from './pages/GlossaryPage';
import PrayerBeadBuilderPage from './pages/PrayerBeadBuilderPage';
import { BACKGROUND_IMAGES } from './constants';

// Import new Amber Guide pages
import AmberHistoryPage from './pages/AmberHistoryPage';
import AmberLocationPage from './pages/AmberLocationPage';
import AmberUniquenessPage from './pages/AmberUniquenessPage';
import AmberFormationPage from './pages/AmberFormationPage';
import AmberPropertiesPage from './pages/AmberPropertiesPage';
import AmberAuthPage from './pages/AmberAuthPage';
import AmberIndustryUsePage from './pages/AmberIndustryUsePage';
import AmberComparisonAmbersPage from './pages/AmberComparisonAmbersPage';
import AmberComparisonMineralsPage from './pages/AmberComparisonMineralsPage';
import AmberAvailabilityPage from './pages/AmberAvailabilityPage';
import AmberRegulationsPage from './pages/AmberRegulationsPage';
import AmberFutureTrendsPage from './pages/AmberFutureTrendsPage';
import AmberFutureTechPage from './pages/AmberFutureTechPage';
import AmberMarketsPage from './pages/AmberMarketsPage';
import AmberReligionPage from './pages/AmberReligionPage';
import AmberColorsAndTonesPage from './pages/AmberColorsAndTonesPage';
import CookieConsentBanner from './components/CookieConsentBanner';
import Chatbot from './components/Chatbot';
import ConstructionPopup from './components/ConstructionPopup';
import CustomJewelryLandingPage from './pages/CustomJewelryLandingPage';
import AdminPanel from './components/AdminPanel';

import { AppProvider, useAppContext } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';

const Layout: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);
    const { pathname } = useLocation();
    
    // The home page is now just '/'
    const isHomePage = pathname === `/`;

    return (
        <div className="flex flex-col min-h-screen" dir="ltr">
            <ConstructionPopup />
            <Header cartCount={cartCount} />
            {!isHomePage && <Breadcrumbs />}
            <main className="flex-grow pb-16 md:pb-0">
                <Outlet context={{ setCartCount }} />
            </main>
            <Footer />
            <CookieConsentBanner />
            <Chatbot />
        </div>
    );
};


const AppContent: React.FC = () => {
    const { isAdminPanelOpen, setIsAdminPanelOpen } = useAppContext();
    
    // Set html lang and dir once on mount for English-only site
    useEffect(() => {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        
        // Set dynamic background
        const randomImage = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
        document.documentElement.style.setProperty('--dynamic-background-image', `url('${randomImage}')`);
    }, []);

    return (
        <LanguageProvider>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* Main Pages */}
                        <Route index element={<HomePage />} />
                        <Route path="collection" element={<CollectionPage />} />
                        <Route path="collection/:productId" element={<ProductDetailPage />} />
                        <Route path="build-your-set" element={<BuildYourOwnPage />} />
                        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="blog/:postId" element={<BlogPostPage />} />
                        
                        {/* Customizer Pages */}
                        <Route path="custom-jewelry" element={<CustomJewelryLandingPage />} />
                        <Route path="prayer-bead-builder/:tradition" element={<PrayerBeadBuilderPage />} />

                        {/* Detailed Content Pages */}
                        <Route path="our-guarantee" element={<OurGuaranteePage />} />
                        <Route path="pricing-guide" element={<PricingGuidePage />} />
                        <Route path="amber-colors" element={<AmberColorsPage />} />
                        <Route path="about" element={<AboutPage />} />
                        
                        {/* New Standalone Pages */}
                        <Route path="faqs" element={<FaqPage />} />
                        <Route path="glossary" element={<GlossaryPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="git-info" element={<GitInfoPage />} />
                        
                        {/* Policy Pages */}
                        <Route path="policies/colors-and-tones" element={<AmberColorsAndTonesPage />} />
                        <Route path="policies/care-guide" element={<CareGuidePage />} />
                        <Route path="policies/pre-order" element={<PreOrderPolicyPage />} />
                        <Route path="policies/shipping" element={<ShippingPolicyPage />} />
                        <Route path="policies/warranty" element={<WarrantyPolicyPage />} />
                        <Route path="policies/returns" element={<ReturnPolicyPage />} />
                        <Route path="policies/privacy" element={<PrivacyPolicyPage />} />

                    </Route>
                    {/* Redirect from any other path to root */}
                    <Route path="*" element={<Navigate to={`/`} replace />} />
                </Routes>
                <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />
            </HashRouter>
        </LanguageProvider>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
