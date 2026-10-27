import { cn } from "../utils/cn";

const GridSpotlight = ({
  children,
  className,
  as: Component = "div",
  gridColor = "rgb(var(--color-grid))",
}) => {
  return (
    <Component className={cn("relative w-full overflow-hidden", className)}>
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
