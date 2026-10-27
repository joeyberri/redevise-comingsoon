import { useLanguage } from "../utils/LanguageContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

const LanguageSwitcher = ({ className }) => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-dark-100 hover:bg-dark-200 text-text-muted hover:text-text transition-colors duration-200 font-sans text-xs font-bold tracking-wider select-none cursor-pointer border-0",
        className
      )}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="uppercase"
        >
          {locale === "en" ? "es" : "en"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default LanguageSwitcher;
