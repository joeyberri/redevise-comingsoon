import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import { X } from "lucide-react";
import Button from "./Button.jsx";

const MobileMenu = ({ isOpen, onClose, navLinks }) => {
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
            className="fixed inset-0 z-[60] bg-dark/80 backdrop-blur-sm md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-[80%] bg-dark-50 p-8 border-l border-text/[0.08] md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-xl text-gradient">Menu</span>
                <button 
                  onClick={onClose}
                  className="size-10 flex items-center justify-center rounded-full border border-text/[0.1] text-text"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <LinkScroll
                      to={link.id}
                      offset={-80}
                      spy
                      smooth
                      onClick={onClose}
                      className="text-2xl font-medium text-text-muted transition-colors hover:text-lime"
                    >
                      {link.label}
                    </LinkScroll>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-text/[0.08]">
                <Button 
                  to="cta" 
                  onClick={onClose} 
                  fullWidth 
                  className="w-full justify-center text-lg"
                >
                  Start a project →
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
