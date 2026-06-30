import { useState } from "react";
import { scroller } from "react-scroll";
import { Link as LinkRouter, useLocation } from "react-router-dom";
import { Menu, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../utils/cn";
import Button from "../components/Button.jsx";
import MobileMenu from "../components/MobileMenu.jsx";
import MarqueeBanner from "../components/MarqueeBanner.jsx";
import Logo from "../components/Logo.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import { useLanguage } from "../utils/LanguageContext.jsx";
import { navLinks } from "../constants/index.jsx";
import { useNavigateAndScroll } from "../utils/useNavigateAndScroll.js";
import { isChurchSubdomain } from "../utils/subdomain.js";

const Header = ({ onOpenInquiry }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
  const isChurch = isChurchSubdomain();
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigateAndScroll();
  const { t } = useLanguage();

  const isHomePage = location.pathname === "/";

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    navigate(id);
    setIsMegaMenuOpen(false);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 50);
    setShowMarquee(latest > 800);
  });

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-200 ease-in-out",
          hasScrolled 
            ? "bg-dark-100/95 border-b border-text/10 translate-y-0 shadow-lg" 
            : "bg-transparent py-2"
        )}
      >
        <div className="relative z-10">
          <div className={cn(
            "container flex items-center justify-between transition-all duration-200",
            hasScrolled ? "h-16" : "h-20"
          )}>
            
            <LinkRouter
              to="/"
              className="cursor-pointer group relative overflow-hidden"
              onClick={() => isHomePage && scroller.scrollTo("hero", { smooth: true, offset: -200 })}
            >
              <Logo showText={true} iconSize="size-7" />
            </LinkRouter>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <div 
                  key={link.id}
                  className="relative group/nav"
                  onMouseEnter={() => link.id === "products" && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.id === "products" && setIsMegaMenuOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={cn(
                      "relative cursor-pointer rounded-full px-5 py-2 font-sans text-[13px] font-medium tracking-wide text-text-muted transition-all duration-300 hover:text-text flex items-center gap-1.5",
                      !isHomePage && link.id !== "about" ? "" : (isHomePage && link.id !== "about" ? "active-scroll" : "")
                    )}
                  >
                    {t(`nav.${link.id}`)}
                    {link.id === "products" && (
                      <ChevronDown size={14} className={cn("transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
                    )}

                  </button>

                  {/* Mega Menu Dropdown */}
                  {link.id === "products" && (
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px]"
                        >
                          <div className="bg-dark-100/90 backdrop-blur-lg border border-text/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                              {t('products.list').map((product) => (
                                <button
                                  key={product.id}
                                  onClick={() => handleNavClick("products")}
                                  className="p-4 rounded-xl hover:bg-text/5 transition-all group/prod border border-transparent hover:border-text/10 text-left"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold tracking-widest text-lime uppercase">{product.label.split(' · ')[1]}</span>
                                    <ArrowUpRight size={14} className="opacity-0 group-hover/prod:opacity-100 transition-opacity text-lime" />
                                  </div>
                                  <div className="font-bold text-text mb-1">{product.name}</div>
                                  <div className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{product.text}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              
              <div className="ml-4 pl-4 border-l border-text/10 flex items-center gap-4">
                <LanguageSwitcher className="hidden lg:flex" />
                <ThemeSwitcher className="hidden lg:flex" />
                <Button 
                  onClick={() => onOpenInquiry(isChurch ? "Church Infrastructure" : t('modal.interests')[1])}
                  className="h-10 px-8 text-[11px] uppercase tracking-widest font-bold shadow-xl shadow-lime/5 border border-lime/20 hover:border-lime/50 transition-all justify-center"
                >
                  {isChurch ? t('nav.optimize') : t('nav.start')}
                </Button>
              </div>
            </nav>

            <div className="flex items-center gap-3 md:hidden">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex size-10 items-center justify-center rounded-full border border-text/10 bg-text/5 text-text"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        <MarqueeBanner 
          items={t('aboutSection.taglines')} 
          visible={showMarquee} 
          className="border-t border-text/5"
        />
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onOpenInquiry={onOpenInquiry}
        navLinks={navLinks} 
      />
    </>
  );
};

export default Header;