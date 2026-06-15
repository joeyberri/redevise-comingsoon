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
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-text/10 bg-text/5 text-text-muted transition-all duration-500 hover:text-text hover:bg-text/10 font-sans text-xs font-bold tracking-wider select-none cursor-pointer",
        className
      )}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="uppercase"
        >
          {locale === "en" ? "es" : "en"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default LanguageSwitcher;
