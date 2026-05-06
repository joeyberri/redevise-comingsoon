import { cn } from "../utils/cn";

const Grid = ({ 
  children, 
  cols = 3, 
  gap = 6, 
  className,
  variant = "default" 
}) => {
  const gapClasses = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    12: "gap-12",
    16: "gap-16",
  };

  const variants = {
    default: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    },
    about: "md:grid-cols-about",
  };

  const colClass = variant === "about" 
    ? variants.about 
    : (variants.default[cols] || variants.default[3]);

  return (
    <div className={cn(
      "grid", 
      colClass, 
      gapClasses[gap] || "gap-6", 
      className
    )}>
      {children}
    </div>
  );
};

export default Grid;
