import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../utils/cn";

const CoreOrb = ({ className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 80, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate position relative to center with dampening
      mouseX.set((clientX - innerWidth / 2) * 0.15);
      mouseY.set((clientY - innerHeight / 2) * 0.15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0",
        className
      )}
    >
      {/* Heavy Ambient Glow */}
      <div className="absolute inset-[-100px] bg-primary/10 blur-[120px] rounded-full scale-150" />
      
      {/* Structural Core */}
      <div className="relative size-64 md:size-96 rounded-full border border-white/[0.03] bg-dark-100/5 backdrop-blur-[2px] overflow-hidden">
        {/* Rotating Intelligence Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,rgba(var(--color-lime),0.15),transparent,rgba(var(--color-primary),0.15),transparent)]"
        />

        {/* Pulse Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="size-16 rounded-full bg-primary/20 blur-xl" 
          />
          <div className="size-2 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--color-primary),0.8)]" />
        </div>

        {/* Scanning Line Effect */}
        <motion.div
          animate={{
            top: ["-10%", "110%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_10px_rgba(var(--color-primary),0.2)]"
        />
      </div>
    </motion.div>
  );
};

CoreOrb.displayName = "CoreOrb";

export default CoreOrb;
