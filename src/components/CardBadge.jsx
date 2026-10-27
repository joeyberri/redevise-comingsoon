import { cn } from "../utils/cn";
import { Text } from "./Typography.jsx";

const CardBadge = ({ 
  children, 
  dot = false, 
  dotPosition = "left", 
  className,
  groupName = "card" 
}) => {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-block px-2.5 py-1 rounded-full bg-dark-200 text-text-muted text-[11px] font-semibold tracking-wide uppercase">
        {children}
      </span>
    </div>
  );
};

export default CardBadge;
