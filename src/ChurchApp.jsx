import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./sections/Header.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Lazy Loaded Components
const InquiryModal = lazy(() => import("./components/InquiryModal.jsx"));

// Lazy Loaded Pages
const ChurchHomePage = lazy(() => import("./pages/church/ChurchHomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.jsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.jsx"));

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ChurchApp = () => {
  const [modalContext, setModalContext] = useState({ isOpen: false, initialType: "" });

  const handleOpenInquiry = (type = "") => {
    setModalContext({ isOpen: true, initialType: type });
  };

  const handleCloseInquiry = () => {
    setModalContext(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <SmoothScroll>
      <PageLoader>
        <ScrollProgress />
        <ScrollToTop />
        <ScrollToTopOnNavigate />
        <Suspense fallback={null}>
          <InquiryModal 
            isOpen={modalContext.isOpen} 
            onClose={handleCloseInquiry} 
            initialType={modalContext.initialType}
          />
        </Suspense>
        <div className="bg-dark min-h-screen">
          <main className="relative z-10 flex flex-col min-h-screen">
            <Header onOpenInquiry={handleOpenInquiry} />
            <div className="flex-1">
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<ChurchHomePage onOpenInquiry={handleOpenInquiry} />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </main>
        </div>
      </PageLoader>
    </SmoothScroll>
  );
};

export default ChurchApp;
