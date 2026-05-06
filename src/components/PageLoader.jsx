import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * PageLoader — Cinematic intro curtain that reveals the site on first load.
 * Fades out after a brief delay to let fonts/assets settle.
 */
const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Allow a brief moment for fonts & critical CSS to load
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-dark"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Pulsing brand dot */}
            <motion.div
              className="size-3 rounded-full bg-lime"
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [1, 0.4, 1],
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
