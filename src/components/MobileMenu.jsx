import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkScroll, scroller } from "react-scroll";
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Button from "./Button.jsx";
import { isChurchSubdomain } from "../utils/subdomain.js";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";

const MobileMenu = ({ isOpen, onClose, onOpenInquiry, navLinks }) => {
  const isChurch = isChurchSubdomain();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const isHomePage = location.pathname === "/";

  const handleNavClick = (id) => {
    onClose();
    if (id === "about") {
      navigate("/about");
      return;
    }

    if (!isHomePage) {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scroller.scrollTo(id, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -80,
      });
    }
  };

  const handleCtaClick = () => {
    onClose();
    onOpenInquiry(isChurch ? "Church Infrastructure" : "Custom Engineering");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-dark-100/80 backdrop-blur-md md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-[80%] bg-dark-50/90 backdrop-blur-2xl p-8 border-l border-text/[0.08] md:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-text/40">{t('common.navigation')}</span>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                  <button 
                    onClick={onClose}
                    className="size-10 flex items-center justify-center rounded-full border border-text/[0.1] text-text cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className="text-3xl font-bold text-text-muted transition-colors hover:text-lime text-left w-full cursor-pointer"
                    >
                      {t(`nav.${link.id}`)}
                    </button>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-text/[0.08]">
                <Button 
                  onClick={handleCtaClick} 
                  fullWidth 
                  className="w-full justify-center text-sm uppercase tracking-widest font-bold py-5"
                >
                  {isChurch ? t('nav.optimize') : t('nav.startProject')} →
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
