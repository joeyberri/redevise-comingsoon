import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "../utils/cn";

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      className={cn(
        "group relative overflow-hidden rounded-3xl border transition-all duration-500 p-8 backdrop-blur-md outline-none",
        hover && "hover:border-text/20 focus:border-text/20 active:bg-text/5",
        className
      )}
      style={{
        borderColor: "rgb(var(--color-surface-border))",
        backgroundColor: "rgb(var(--color-surface-bg))",
      }}
    >
      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(var(--color-lime), 0.06), transparent 80%)`,
        }}
      />

      {/* Static corner glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-lime/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
      
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
