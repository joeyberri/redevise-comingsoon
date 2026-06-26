import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import PlusIcon from "../PlusIcon.jsx";

const FeatureToggle = ({ feature, isActive, onToggle }) => {
  const Icon = feature.icon;
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex items-center gap-4 w-full rounded-none border p-4 md:p-5 transition-all duration-300 text-left cursor-pointer outline-none overflow-visible",
        isActive
          ? "border-lime/40 bg-lime/[0.06]"
          : "border-text/[0.08] bg-text/[0.02] hover:border-text/[0.15] hover:bg-text/[0.04]"
      )}
    >
      {/* Corner indicators */}
      <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none"><PlusIcon /></div>
      <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none"><PlusIcon /></div>

      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-none border transition-all duration-300 shrink-0",
          isActive 
            ? "bg-lime/15 border-lime/30 text-lime" 
            : "bg-text/5 border-text/10 text-text-subtle"
        )}
      >
        <Icon size={20} />
      </div>

      <span
        className={cn(
          "font-sans text-sm font-medium transition-colors duration-300 flex-1",
          isActive ? "text-text" : "text-text-muted"
        )}
      >
        {feature.label}
      </span>

      {/* Toggle pill */}
      <div
        className={cn(
          "relative w-12 h-7 rounded-full transition-all duration-300 shrink-0",
          isActive ? "bg-lime/30" : "bg-text/10"
        )}
      >
        <motion.div
          className={cn(
            "absolute top-1 w-5 h-5 rounded-full shadow-md transition-colors duration-300",
            isActive ? "bg-lime" : "bg-text-subtle"
          )}
          animate={{ left: isActive ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </motion.button>
  );
};

export default FeatureToggle;
