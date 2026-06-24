import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const PlusIcon = () => (
  <svg 
    width="8" 
    height="8" 
    viewBox="0 0 8 8" 
    fill="none" 
    className="text-text-subtle/30 group-hover:text-lime group-focus:text-lime transition-colors duration-200 pointer-events-none select-none"
  >
    <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      tabIndex={0}
      className={cn(
        "group relative border transition-all duration-200 p-8 outline-none rounded-none",
        hover && "hover:border-text/20 focus:border-text/20 active:bg-text/5",
        className
      )}
      style={{
        borderColor: "rgb(var(--color-surface-border))",
        backgroundColor: "rgb(var(--color-surface-bg))",
      }}
    >
      {/* Blueprint Corner Plus Indicators */}
      <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none">
        <PlusIcon />
      </div>
      <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon />
      </div>
      <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none">
        <PlusIcon />
      </div>
      <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon />
      </div>

      {/* Children content area */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
