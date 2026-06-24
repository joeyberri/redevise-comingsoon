import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Header from "./sections/Header.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { lazyWithRetry } from "./utils/lazyWithRetry.js";

// Lazy Loaded Components
const InquiryModal = lazyWithRetry(() => import("./components/InquiryModal.jsx"));

// Lazy Loaded Pages
const ChurchHomePage = lazyWithRetry(() => import("./pages/church/ChurchHomePage.jsx"));
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage.jsx"));
const TermsPage = lazyWithRetry(() => import("./pages/TermsPage.jsx"));
const PrivacyPage = lazyWithRetry(() => import("./pages/PrivacyPage.jsx"));

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageSuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-dark">
    <div className="size-2 rounded-full bg-lime animate-ping" />
  </div>
);

const ChurchApp = () => {
  const [modalContext, setModalContext] = useState({ isOpen: false, initialType: "" });

  const handleOpenInquiry = (type = "") => {
    setModalContext({ isOpen: true, initialType: type });
  };

  const handleCloseInquiry = () => {
    setModalContext(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ErrorBoundary>
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
              <ErrorBoundary>
                <Suspense fallback={<PageSuspenseFallback />}>
                  <Routes>
                    <Route path="/" element={<ChurchHomePage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>
            <Footer />
          </main>
        </div>
      </PageLoader>
    </SmoothScroll>
    </ErrorBoundary>
  );
};

export default ChurchApp;
