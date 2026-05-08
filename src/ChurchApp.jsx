import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./sections/Header.jsx";
import Footer from "./sections/Footer.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import PageLoader from "./components/PageLoader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import GridSpotlight from "./components/GridSpotlight.jsx";
import InquiryModal from "./components/InquiryModal.jsx";

// Pages
import ChurchHomePage from "./pages/church/ChurchHomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";

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
        <InquiryModal 
          isOpen={modalContext.isOpen} 
          onClose={handleCloseInquiry} 
          initialType={modalContext.initialType}
        />
        <GridSpotlight 
          spotlightSize={700} 
          spotlightColor="rgba(255, 190, 80, 0.04)" 
          className="bg-dark min-h-screen"
        >
          <main className="relative z-10 flex flex-col min-h-screen">
            <Header onOpenInquiry={handleOpenInquiry} />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<ChurchHomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </GridSpotlight>
      </PageLoader>
    </SmoothScroll>
  );
};

export default ChurchApp;
