import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Header from "./sections/Header.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { isChurchSubdomain } from "./utils/subdomain.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { lazyWithRetry } from "./utils/lazyWithRetry.js";

// Lazy Loaded Components
const ChurchApp = lazyWithRetry(() => import("./ChurchApp.jsx"));
const InquiryModal = lazyWithRetry(() => import("./components/InquiryModal.jsx"));

// Lazy Loaded Pages
const HomePage = lazyWithRetry(() => import("./pages/HomePage.jsx"));
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage.jsx"));
const TermsPage = lazyWithRetry(() => import("./pages/TermsPage.jsx"));
const PrivacyPage = lazyWithRetry(() => import("./pages/PrivacyPage.jsx"));
const BlogListPage = lazyWithRetry(() => import("./pages/BlogListPage.jsx"));
const BlogPostPage = lazyWithRetry(() => import("./pages/BlogPostPage.jsx"));
const ServicesPage = lazyWithRetry(() => import("./pages/ServicesPage.jsx"));
const KeystaticPage = lazyWithRetry(() => import("./pages/KeystaticPage.jsx"));
const ProcessPage = lazyWithRetry(() => import("./pages/ProcessPage.jsx"));
const EstimatePage = lazyWithRetry(() => import("./pages/EstimatePage.jsx"));
const CareersPage = lazyWithRetry(() => import("./pages/CareersPage.jsx"));

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
  const [modalContext, setModalContext] = useState({ isOpen: false, initialType: "", metadata: null });

  useEffect(() => {
    // Reset chunk load refreshed state on successful boot
    window.sessionStorage.setItem("chunk-load-refreshed", "false");
  }, []);

  const handleOpenInquiry = (type = "", metadata = null) => {
    setModalContext({ isOpen: true, initialType: type, metadata });
  };

  const handleCloseInquiry = () => {
    setModalContext(prev => ({ ...prev, isOpen: false }));
  };

  const location = useLocation();
  const isKeystatic = location.pathname.startsWith('/keystatic');

  // Keystatic Admin — render standalone (no site header/footer)
  if (isKeystatic) {
    return (
      <Suspense fallback={<PageLoader isLoading={true} />}>
        <KeystaticPage />
      </Suspense>
    );
  }

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
            metadata={modalContext.metadata}
          />
        </Suspense>

        <div className="bg-dark min-h-screen">
          <main className="relative z-10 flex flex-col min-h-screen">
            <Header onOpenInquiry={handleOpenInquiry} />
            <div className="flex-1">
              <ErrorBoundary>
                <Suspense fallback={<PageSuspenseFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/blog" element={<BlogListPage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/blog/:slug" element={<BlogPostPage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/process" element={<ProcessPage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/estimate" element={<EstimatePage onOpenInquiry={handleOpenInquiry} />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>
            <Footer onOpenInquiry={handleOpenInquiry} />
          </main>
        </div>
      </PageLoader>
    </SmoothScroll>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;
