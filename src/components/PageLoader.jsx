import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * PageLoader — Fast cinematic intro curtain.
 * Keeps wait time minimal so the site feels instant.
 */
const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter wait — just enough for fonts to settle
    const timer = setTimeout(() => setIsLoading(false), 400);
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
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Pulsing brand dot */}
            <motion.div
              className="size-3 rounded-full bg-lime"
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [1, 0.4, 1],
              }}
              transition={{ 
                duration: 0.8, 
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
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
