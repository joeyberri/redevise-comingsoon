import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import CorneredBox from "./CorneredBox.jsx";

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  return (
    <CorneredBox
      as={motion.div}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      tabIndex={0}
      className={cn(
        "group transition-all duration-200 outline-none rounded-none p-8",
        hover && "hover:border-text/20 focus:border-text/20 active:bg-text/5",
        className
      )}
      plusClassName="group-hover:text-lime group-focus:text-lime"
      style={{
        borderColor: "rgb(var(--color-surface-border))",
        backgroundColor: "rgb(var(--color-surface-bg))",
      }}
    >
      {/* Children content area */}
      <div className="relative z-10 h-full">{children}</div>
    </CorneredBox>
  );
};

export default GlassCard;
