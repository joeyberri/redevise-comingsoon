import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button.jsx";
import { isChurchSubdomain } from "../utils/subdomain.js";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { useNavigateAndScroll } from "../utils/useNavigateAndScroll.js";

const MobileMenu = ({ isOpen, onClose, onOpenInquiry, navLinks }) => {
  const isChurch = isChurchSubdomain();
  const navigate = useNavigateAndScroll();
  const { t } = useLanguage();

  const handleNavClick = (id) => {
    onClose();
    navigate(id);
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
            className="fixed inset-0 z-[60] bg-dark-100/80 backdrop-blur-md lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 400 }}
            className="fixed right-0 top-0 z-[70] h-full w-[85%] sm:w-[380px] sm:max-w-sm bg-dark-100/95 backdrop-blur-2xl p-6 sm:p-8 border-0 lg:hidden shadow-2xl shadow-black/80"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-text/40">{t('common.navigation')}</span>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                  <button 
                    onClick={onClose}
                    className="size-10 flex items-center justify-center rounded-full bg-dark-200 text-text border-0 cursor-pointer"
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
                    transition={{ delay: 0.04 + i * 0.03 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className="text-3xl font-bold text-text-muted transition-colors hover:text-lime text-left w-full cursor-pointer"
                    >
                      {t(`nav.${link.id}`)}
                    </button>
                  </motion.div>
                ))}
                
                {/* Careers Link in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + navLinks.length * 0.03 }}
                >
                  <button
                    onClick={() => handleNavClick("careers")}
                    className="text-3xl font-bold text-text-muted transition-colors hover:text-lime text-left w-full cursor-pointer"
                  >
                    {t("nav.careers")}
                  </button>
                </motion.div>
              </nav>

              <div className="mt-auto pt-8 border-0">
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
