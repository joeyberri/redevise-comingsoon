import { useState, useEffect, useCallback } from "react";
import { Link as LinkScroll } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../utils/cn";
import Button from "../components/Button.jsx";
import MobileMenu from "../components/MobileMenu.jsx";
import MarqueeBanner from "../components/MarqueeBanner.jsx";
import Logo from "../components/Logo.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import { navLinks, taglines } from "../constants/index.jsx";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Using Framer Motion's useScroll hook for better performance
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 50);
    setShowMarquee(latest > 800);
  });

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-700 ease-in-out",
          hasScrolled 
            ? "bg-dark/70 backdrop-blur-md border-b border-text/10 translate-y-0" 
            : "bg-transparent py-2"
        )}
      >
        <div className="relative z-10">
          <div className={cn(
            "container flex items-center justify-between transition-all duration-500",
            hasScrolled ? "h-16" : "h-20"
          )}>
            
            {/* Logo with Magnetic-style hover */}
            <LinkScroll
              to="hero"
              offset={-200}
              spy
              smooth
              className="cursor-pointer group relative overflow-hidden"
            >
              <Logo showText={true} iconSize="size-7" />
            </LinkScroll>

            {/* Desktop Nav - Optimized with active indicator */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <LinkScroll
                  key={link.id}
                  to={link.id}
                  offset={-80}
                  spy
                  smooth
                  activeClass="text-text bg-text/5"
                  className={cn(
                    "relative cursor-pointer rounded-full px-5 py-2 font-sans text-[13px] font-medium tracking-wide text-text-muted transition-all duration-300 hover:text-text",
                  )}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  <span className="absolute bottom-1.5 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-lime transition-all duration-300 [.active>&]:w-1" />
                </LinkScroll>
              ))}
              
              <div className="ml-4 pl-4 border-l border-text/10 flex items-center gap-4">
                <ThemeSwitcher className="hidden lg:flex" />
                <Button 
                  to="cta" 
                  className="h-9 px-6 text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-lime/10"
                >
                  Start Project
                </Button>
              </div>
            </nav>

            <div className="flex items-center gap-4 md:hidden">
              <ThemeSwitcher />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex size-10 items-center justify-center rounded-full border border-text/10 bg-text/5 text-text"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        <MarqueeBanner 
          items={taglines} 
          visible={showMarquee} 
          className="border-t border-text/5"
        />
      </header>

      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        navLinks={navLinks} 
      />
    </>
  );
};

export default Header;