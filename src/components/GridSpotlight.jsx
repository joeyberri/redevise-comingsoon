import { useRef, useState, useEffect } from "react";
import { cn } from "../utils/cn";

const GridSpotlight = ({
  children,
  className,
  as: Component = "div",
  gridColor = "rgb(var(--color-lime) / 0.04)",
  spotlightColor = "rgb(var(--color-lime) / 0.15)",
  spotlightSize = 500,
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mask-image-fade"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      
      <div className="relative z-10 h-full w-full">{children}</div>
    </Component>
  );
};

export default GridSpotlight;
