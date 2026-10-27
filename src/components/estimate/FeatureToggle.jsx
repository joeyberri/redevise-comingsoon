import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const FeatureToggle = ({ feature, isActive, onToggle }) => {
  const Icon = feature.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative flex items-center gap-4 w-full rounded-2xl p-4 md:p-5 transition-colors duration-200 text-left cursor-pointer outline-none border-0",
        isActive
          ? "bg-dark-200"
          : "bg-dark-100/75 hover:bg-dark-200/50"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center size-10 rounded-xl transition-colors duration-200 shrink-0 border-0",
          isActive 
            ? "bg-lime/15 text-lime" 
            : "bg-dark-200 text-text-muted"
        )}
      >
        <Icon size={20} />
      </div>

      <span
        className={cn(
          "font-sans text-sm font-medium transition-colors duration-200 flex-1",
          isActive ? "text-text font-semibold" : "text-text-muted"
        )}
      >
        {feature.label}
      </span>

      {/* Toggle pill */}
      <div
        className={cn(
          "relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0",
          isActive ? "bg-lime/30" : "bg-dark-200"
        )}
      >
        <motion.div
          className={cn(
            "absolute top-1 size-5 rounded-full shadow-md transition-colors duration-200",
            isActive ? "bg-lime" : "bg-dark-300"
          )}
          animate={{ left: isActive ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
};

export default FeatureToggle;
