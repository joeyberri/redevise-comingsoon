import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const CoreOrb = ({ className }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0",
        className
      )}
    >
      {/* Structural Core */}
      <div className="relative size-64 md:size-96 rounded-full border-0 bg-dark-100/10 backdrop-blur-[2px] overflow-hidden">
        {/* Rotating Subtle Ambient Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,rgba(var(--color-lime),0.08),transparent,rgba(var(--color-primary),0.08),transparent)]"
        />

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-16 rounded-full bg-primary/5" />
          <div className="size-2 rounded-full bg-primary/40" />
        </div>
      </div>
    </div>
  );
};

CoreOrb.displayName = "CoreOrb";

export default CoreOrb;
