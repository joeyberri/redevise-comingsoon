import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import PlusIcon from "./PlusIcon.jsx";

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
        <PlusIcon className="group-hover:text-lime group-focus:text-lime" />
      </div>
      <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon className="group-hover:text-lime group-focus:text-lime" />
      </div>
      <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none">
        <PlusIcon className="group-hover:text-lime group-focus:text-lime" />
      </div>
      <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon className="group-hover:text-lime group-focus:text-lime" />
      </div>

      {/* Children content area */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
