

import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Header from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import CollectionPage from './pages/ShopPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import BuildYourOwnPage from './pages/BuildYourOwnPage.tsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.tsx';
import OurGuaranteePage from './pages/LearnAndBeliefsPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import FaqPage from './pages/FaqPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import PricingGuidePage from './pages/PricingGuidePage.tsx';
import AmberColorsPage from './pages/AmberColorsPage.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import CareGuidePage from './pages/CareGuidePage.tsx';
import PreOrderPolicyPage from './pages/PreOrderPolicyPage.tsx';
import ShippingPolicyPage from './pages/ShippingPolicyPage.tsx';
import WarrantyPolicyPage from './pages/WarrantyPolicyPage.tsx';
import ReturnPolicyPage from './pages/ReturnPolicyPage.tsx';
import GitInfoPage from './pages/GitInfoPage.tsx';
import Breadcrumbs from './components/Breadcrumbs.tsx';
import GlossaryPage from './pages/GlossaryPage.tsx';
import PrayerBeadBuilderPage from './pages/PrayerBeadBuilderPage.tsx';
import { BACKGROUND_IMAGES } from './constants.ts';
import AmberColorsAndTonesPage from './pages/AmberColorsAndTonesPage.tsx';
import CookieConsentBanner from './components/CookieConsentBanner.tsx';
import Chatbot from './components/Chatbot.tsx';
import ConstructionPopup from './components/ConstructionPopup.tsx';
import CustomJewelryLandingPage from './pages/CustomJewelryLandingPage.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import AmberPillarPage from './pages/AmberPillarPage.tsx';
import AmberHistoryPage from './pages/AmberHistoryPage.tsx';
import AmberLocationPage from './pages/AmberLocationPage.tsx';
import AmberUniquenessPage from './pages/AmberUniquenessPage.tsx';
import AmberFormationPage from './pages/AmberFormationPage.tsx';
import AmberPropertiesPage from './pages/AmberPropertiesPage.tsx';
import AmberAuthPage from './pages/AmberAuthPage.tsx';
import AmberIndustryUsePage from './pages/AmberIndustryUsePage.tsx';
import AmberComparisonAmbersPage from './pages/AmberComparisonAmbersPage.tsx';
import AmberComparisonMineralsPage from './pages/AmberComparisonMineralsPage.tsx';
import AmberAvailabilityPage from './pages/AmberAvailabilityPage.tsx';
import AmberRegulationsPage from './pages/AmberRegulationsPage.tsx';
import AmberFutureTrendsPage from './pages/AmberFutureTrendsPage.tsx';
import AmberFutureTechPage from './pages/AmberFutureTechPage.tsx';
import AmberMarketsPage from './pages/AmberMarketsPage.tsx';
import AmberReligionPage from './pages/AmberReligionPage.tsx';
import CustomRosaryConfiguratorPage from './pages/CustomRosaryConfiguratorPage.tsx';
import GemTechPillarPage from './pages/GemTechPillarPage.tsx';

import { AppProvider, useAppContext } from './context/AppContext.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';

const Layout: React.FC = () => {
    const { pathname } = ReactRouterDOM.useLocation();
    
    // The home page is now just '/'
    const isHomePage = pathname === `/`;

    return (
        <div className="flex flex-col min-h-screen" dir="ltr">
            <ConstructionPopup />
            <Header />
            {!isHomePage && <Breadcrumbs />}
            <main className="flex-grow pb-16 md:pb-0">
                <ReactRouterDOM.Outlet />
            </main>
            <Footer />
            <CookieConsentBanner />
            <Chatbot />
        </div>
    );
};


const AppContent: React.FC = () => {
    const { isAdminPanelOpen, setIsAdminPanelOpen } = useAppContext();
    
    useEffect(() => {
        // Set dynamic background on initial load
        const randomImage = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
        document.documentElement.style.setProperty('--dynamic-background-image', `url('${randomImage}')`);
    }, []);

    return (
        <LanguageProvider>
            <ReactRouterDOM.HashRouter>
                <ScrollToTop />
                <ReactRouterDOM.Routes>
                    <ReactRouterDOM.Route path="/" element={<Layout />}>
                        {/* Main Pages */}
                        <ReactRouterDOM.Route index element={<HomePage />} />
                        <ReactRouterDOM.Route path="collection" element={<CollectionPage />} />
                        <ReactRouterDOM.Route path="collection/:productId" element={<ProductDetailPage />} />
                        <ReactRouterDOM.Route path="build-your-set" element={<BuildYourOwnPage />} />
                        <ReactRouterDOM.Route path="order-confirmation" element={<OrderConfirmationPage />} />
                        <ReactRouterDOM.Route path="blog" element={<BlogPage />} />
                        <ReactRouterDOM.Route path="blog/:postId" element={<BlogPostPage />} />
                        
                        {/* Customizer Pages */}
                        <ReactRouterDOM.Route path="custom-jewelry" element={<CustomJewelryLandingPage />} />
                        <ReactRouterDOM.Route path="prayer-bead-builder/:tradition" element={<PrayerBeadBuilderPage />} />
                        <ReactRouterDOM.Route path="custom-rosary-configurator" element={<CustomRosaryConfiguratorPage />} />

                        {/* Detailed Content Pages */}
                        <ReactRouterDOM.Route path="our-guarantee" element={<OurGuaranteePage />} />
                        <ReactRouterDOM.Route path="pricing-guide" element={<PricingGuidePage />} />
                        <ReactRouterDOM.Route path="amber-colors" element={<AmberColorsPage />} />
                        <ReactRouterDOM.Route path="about" element={<AboutPage />} />
                        
                        {/* New Standalone Pages */}
                        <ReactRouterDOM.Route path="faqs" element={<FaqPage />} />
                        <ReactRouterDOM.Route path="glossary" element={<GlossaryPage />} />
                        <ReactRouterDOM.Route path="contact" element={<ContactPage />} />
                        
                        {/* Pillar Pages */}
                        <ReactRouterDOM.Route path="gemtech-pillar" element={<GemTechPillarPage />} />
                        
                        {/* Amber Guide (Pillar & Cluster) Pages */}
                        <ReactRouterDOM.Route path="amber-guide" element={<AmberPillarPage />} />
                        <ReactRouterDOM.Route path="amber/history" element={<AmberHistoryPage />} />
                        <ReactRouterDOM.Route path="amber/location" element={<AmberLocationPage />} />
                        <ReactRouterDOM.Route path="amber/uniqueness" element={<AmberUniquenessPage />} />
                        <ReactRouterDOM.Route path="amber/formation" element={<AmberFormationPage />} />
                        <ReactRouterDOM.Route path="amber/properties" element={<AmberPropertiesPage />} />
                        <ReactRouterDOM.Route path="amber/authentication" element={<AmberAuthPage />} />
                        <ReactRouterDOM.Route path="amber/industry-use" element={<AmberIndustryUsePage />} />
                        <ReactRouterDOM.Route path="amber/comparison-ambers" element={<AmberComparisonAmbersPage />} />
                        <ReactRouterDOM.Route path="amber/comparison-minerals" element={<AmberComparisonMineralsPage />} />
                        <ReactRouterDOM.Route path="amber/availability" element={<AmberAvailabilityPage />} />
                        <ReactRouterDOM.Route path="amber/regulations" element={<AmberRegulationsPage />} />
                        <ReactRouterDOM.Route path="amber/future-trends" element={<AmberFutureTrendsPage />} />
                        <ReactRouterDOM.Route path="amber/future-tech" element={<AmberFutureTechPage />} />
                        <ReactRouterDOM.Route path="amber/markets" element={<AmberMarketsPage />} />
                        <ReactRouterDOM.Route path="amber/religion" element={<AmberReligionPage />} />

                        {/* Policy Pages */}
                        <ReactRouterDOM.Route path="policies/colors-and-tones" element={<AmberColorsAndTonesPage />} />
                        <ReactRouterDOM.Route path="policies/care-guide" element={<CareGuidePage />} />
                        <ReactRouterDOM.Route path="policies/pre-order" element={<PreOrderPolicyPage />} />
                        <ReactRouterDOM.Route path="policies/shipping" element={<ShippingPolicyPage />} />
                        <ReactRouterDOM.Route path="policies/warranty" element={<WarrantyPolicyPage />} />
                        <ReactRouterDOM.Route path="policies/returns" element={<ReturnPolicyPage />} />
                        <ReactRouterDOM.Route path="policies/privacy" element={<PrivacyPolicyPage />} />

                    </ReactRouterDOM.Route>
                    {/* Redirect from any other path to root */}
                    <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to={`/`} replace />} />
                </ReactRouterDOM.Routes>
                <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />
            </ReactRouterDOM.HashRouter>
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