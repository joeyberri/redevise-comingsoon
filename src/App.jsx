import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./sections/Header.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { isChurchSubdomain } from "./utils/subdomain.js";

// Lazy Loaded Components
const ChurchApp = lazy(() => import("./ChurchApp.jsx"));
const InquiryModal = lazy(() => import("./components/InquiryModal.jsx"));

// Lazy Loaded Pages
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
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

const PageSuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-dark">
    <div className="size-2 rounded-full bg-lime animate-ping" />
  </div>
);

const AppContent = () => {
  const [modalContext, setModalContext] = useState({ isOpen: false, initialType: "" });

  const handleOpenInquiry = (type = "") => {
    setModalContext({ isOpen: true, initialType: type });
  };

  const handleCloseInquiry = () => {
    setModalContext(prev => ({ ...prev, isOpen: false }));
  };

  // Check if we are on the church subdomain
  if (isChurchSubdomain()) {
    return (
      <Suspense fallback={<PageLoader isLoading={true} />}>
        <ChurchApp />
      </Suspense>
    );
  }

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
              <Suspense fallback={<PageSuspenseFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
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

const App = () => {
  return <AppContent />;
};

export default App;
