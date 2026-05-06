import { cn } from "../utils/cn";
import { Text } from "./Typography.jsx";

const CardBadge = ({ 
  children, 
  dot = true, 
  dotPosition = "left", 
  className,
  groupName = "card" 
}) => {
  const dotEl = dot && (
    <div className="relative flex size-2 items-center justify-center">
      <span className={cn(
        "absolute size-full animate-ping rounded-full bg-lime/40 opacity-75",
        `group-hover/${groupName}:bg-lime/60`
      )} />
      <span className={cn(
        "relative inline-block size-1.5 rounded-full bg-lime transition-all duration-500",
        `shadow-[0_0_12px_rgba(var(--color-lime),0.8)] group-hover/${groupName}:scale-110`
      )} />
    </div>
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {dot && dotPosition === "left" && dotEl}
      <Text 
        variant="tiny" 
        className={cn(
          "transition-colors duration-500",
          `text-text-subtle/60 group-hover/${groupName}:text-lime group-focus/${groupName}:text-lime`
        )}
      >
        {children}
      </Text>
      {dot && dotPosition === "right" && dotEl}
    </div>
  );
};

export default CardBadge;
