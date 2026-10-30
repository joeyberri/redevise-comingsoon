import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      tabIndex={0}
      className={cn(
        "group relative rounded-2xl bg-dark-100/75 p-6 sm:p-8 transition-colors duration-200 outline-none",
        hover && "hover:bg-dark-200/90 focus:bg-dark-200/90 active:bg-dark-200",
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
