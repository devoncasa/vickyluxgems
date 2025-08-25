
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Outlet, Routes, Route, HashRouter } from 'react-router-dom';
import Header from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import CollectionPage from './pages/ShopPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';
import BuildYourOwnPage from './pages/BuildYourOwnPage.tsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.tsx';
import AboutUsPoliciesPage from './pages/AboutUsPoliciesPage.tsx';
import FaqPage from './pages/FaqPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import BlogPostPage from './pages/BlogPostPage.tsx';
import PricingGuidePage from './pages/PricingGuidePage.tsx';
import AmberColorsPage from './pages/AmberColorsPage.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import GitInfoPage from './pages/GitInfoPage.tsx';
import Breadcrumbs from './components/Breadcrumbs.tsx';
import GlossaryPage from './pages/GlossaryPage.tsx';
import PrayerBeadBuilderPage from './pages/PrayerBeadBuilderPage.tsx';
import { BACKGROUND_IMAGES } from './constants.ts';
import CookieConsentBanner from './components/CookieConsentBanner.tsx';
import Chatbot from './components/Chatbot.tsx';
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
import CustomTesbihConfiguratorPage from './pages/CustomTesbihConfiguratorPage.tsx';
import GemTechPillarPage from './pages/GemTechPillarPage.tsx';
import PaymentPage from './pages/PaymentPage.tsx';

import { AppProvider, useAppContext } from './context/AppContext.tsx';
import { LanguageProvider } from './i18n/LanguageContext.tsx';

const Layout: React.FC = () => {
    const { pathname } = useLocation();
    
    // The home page is now just '/'
    const isHomePage = pathname === `/`;

    return (
        <div className="flex flex-col min-h-screen" dir="ltr">
            <Header />
            {!isHomePage && <Breadcrumbs />}
            <main className="flex-grow pb-16 md:pb-0">
                <Outlet />
            </main>
            <Footer />
            <CookieConsentBanner />
            <Chatbot />
        </div>
    );
};

// This new component contains all the logic that needs Router context.
const RoutedApp: React.FC = () => {
    const { isAdminPanelOpen, setIsAdminPanelOpen } = useAppContext();
    const location = useLocation();
    const pageBackgroundsRef = useRef<Record<string, string>>({});
    const availableImagesRef = useRef([...BACKGROUND_IMAGES]);
    
    useEffect(() => {
        const { pathname } = location;

        if (pageBackgroundsRef.current[pathname]) {
            document.body.style.setProperty('--vlg-page-bg', `url("${pageBackgroundsRef.current[pathname]}")`);
            return;
        }

        if (availableImagesRef.current.length === 0) {
            // Reset the pool if all images have been used in the session
            availableImagesRef.current = [...BACKGROUND_IMAGES];
        }

        const randomIndex = Math.floor(Math.random() * availableImagesRef.current.length);
        const selectedImage = availableImagesRef.current[randomIndex];

        pageBackgroundsRef.current[pathname] = selectedImage;
        availableImagesRef.current.splice(randomIndex, 1);

        document.body.style.setProperty('--vlg-page-bg', `url("${selectedImage}")`);
    }, [location.pathname]);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Main Pages */}
                    <Route index element={<HomePage />} />
                    <Route path="collection" element={<CollectionPage />} />
                    <Route path="collection/:productId" element={<ProductDetailPage />} />
                    <Route path="build-your-set" element={<BuildYourOwnPage />} />
                    <Route path="order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="blog/:postId" element={<BlogPostPage />} />
                    
                    {/* Customizer Pages */}
                    <Route path="custom-jewelry" element={<CustomJewelryLandingPage />} />
                    <Route path="prayer-bead-builder/:tradition" element={<PrayerBeadBuilderPage />} />
                    <Route path="custom-rosary-configurator" element={<CustomRosaryConfiguratorPage />} />
                    <Route path="custom-tesbih-configurator" element={<CustomTesbihConfiguratorPage />} />

                    {/* Detailed Content Pages */}
                    <Route path="pricing-guide" element={<PricingGuidePage />} />
                    <Route path="amber-colors" element={<AmberColorsPage />} />
                    
                    {/* New Standalone Pages */}
                    <Route path="faqs" element={<FaqPage />} />
                    <Route path="glossary" element={<GlossaryPage />} />
                    <Route path="contact" element={<ContactPage />} />

                    {/* New Consolidated Page */}
                    <Route path="about-us-policies" element={<AboutUsPoliciesPage />} />
                    
                    {/* Pillar Pages */}
                    <Route path="gemtech-pillar" element={<GemTechPillarPage />} />
                    
                    {/* Amber Guide (Pillar & Cluster) Pages */}
                    <Route path="amber-guide" element={<AmberPillarPage />} />
                    <Route path="amber/history" element={<AmberHistoryPage />} />
                    <Route path="amber/location" element={<AmberLocationPage />} />
                    <Route path="amber/uniqueness" element={<AmberUniquenessPage />} />
                    <Route path="amber/formation" element={<AmberFormationPage />} />
                    <Route path="amber/properties" element={<AmberPropertiesPage />} />
                    <Route path="amber/authentication" element={<AmberAuthPage />} />
                    <Route path="amber/industry-use" element={<AmberIndustryUsePage />} />
                    <Route path="amber/comparison-ambers" element={<AmberComparisonAmbersPage />} />
                    <Route path="amber/comparison-minerals" element={<AmberComparisonMineralsPage />} />
                    <Route path="amber/availability" element={<AmberAvailabilityPage />} />
                    <Route path="amber/regulations" element={<AmberRegulationsPage />} />
                    <Route path="amber/future-trends" element={<AmberFutureTrendsPage />} />
                    <Route path="amber/future-tech" element={<AmberFutureTechPage />} />
                    <Route path="amber/markets" element={<AmberMarketsPage />} />
                    <Route path="amber/religion" element={<AmberReligionPage />} />
                    
                    {/* For Dev/Info */}
                    <Route path="git-info" element={<GitInfoPage />} />
                </Route>
            </Routes>
            {isAdminPanelOpen && <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />}
        </>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <HashRouter>
                <AppProvider>
                    <RoutedApp />
                </AppProvider>
            </HashRouter>
        </LanguageProvider>
    );
};

export default App;
