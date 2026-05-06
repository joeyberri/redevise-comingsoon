import { useState, useEffect, useCallback } from "react";
import { Link as LinkScroll } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../utils/cn";
import Button from "../components/Button.jsx";
import MobileMenu from "../components/MobileMenu.jsx";
import AnimatedMarquee from "../components/AnimatedMarquee.jsx";
import Logo from "../components/Logo.jsx";
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
            ? "bg-dark/70 backdrop-blur-md border-b border-white/[0.08] translate-y-0" 
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
              <Logo showText={true} iconSize={28} />
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
                  activeClass="text-white bg-white/5"
                  className={cn(
                    "relative cursor-pointer rounded-full px-5 py-2 font-sans text-[13px] font-medium tracking-wide text-text-muted transition-all duration-300 hover:text-text",
                  )}
                >
                  {link.label}
                  {/* Active dot indicator */}
                  <span className="absolute bottom-1.5 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-lime transition-all duration-300 [.active>&]:w-1" />
                </LinkScroll>
              ))}
              
              <div className="ml-4 pl-4 border-l border-white/10">
                <Button 
                  to="cta" 
                  className="h-9 px-6 text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-lime/10"
                >
                  Start Project
                </Button>
              </div>
            </nav>

            {/* Mobile Toggle with Animation */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>

        {/* Marquee Bar with improved easing */}
        <AnimatePresence>
          {showMarquee && (
            <motion.div
              initial={{ height: 0, y: -20, opacity: 0 }}
              animate={{ height: "auto", y: 0, opacity: 1 }}
              exit={{ height: 0, y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-white/[0.05] bg-dark/40 backdrop-blur-sm"
            >
              <div className="py-2">
                <AnimatedMarquee items={taglines} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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