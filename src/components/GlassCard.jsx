import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const GlassCard = ({ children, className, hover = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500",
        hover && "hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-lime/5",
        className
      )}
    >
      {/* Dynamic Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--color-lime), 0.06), transparent 80%)`,
        }}
      />

      {/* Static corner glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-lime/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
