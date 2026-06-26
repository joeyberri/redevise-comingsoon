import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../utils/LanguageContext.jsx";

const AnimatedPrice = ({ value }) => {
  const { formatPrice } = useLanguage();
  const formatted = formatPrice(value);
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={formatted}
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -4, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        {formatted}
      </motion.span>
    </AnimatePresence>
  );
};

export default AnimatedPrice;
