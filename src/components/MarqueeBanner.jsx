import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import AnimatedMarquee from "./AnimatedMarquee.jsx";

const MarqueeBanner = ({ 
  items, 
  visible = true, 
  className,
  containerClassName,
  animate = true 
}) => {
  const content = (
    <div className={cn("marquee-container", containerClassName)}>
      <div className="py-2">
        <AnimatedMarquee items={items} />
      </div>
    </div>
  );

  if (!animate) return <div className={className}>{content}</div>;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, y: -20, opacity: 0 }}
          animate={{ height: "auto", y: 0, opacity: 1 }}
          exit={{ height: 0, y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={cn("overflow-hidden", className)}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarqueeBanner;
