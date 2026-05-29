import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { ArrowUp } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper.jsx";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  // Show button after scrolling down 400px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 400);
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <MagneticWrapper strength={0.2}>
            <button
              onClick={scrollToTop}
              className="flex size-12 items-center justify-center rounded-full border border-text/[0.08] bg-dark-50/80 text-text-subtle backdrop-blur-md transition-all duration-300 hover:border-lime/40 hover:text-lime hover:shadow-[0_0_20px_rgba(var(--color-lime),0.15)] group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </MagneticWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
