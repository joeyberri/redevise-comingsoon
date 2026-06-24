import { cn } from "../utils/cn";

const PlusIcon = ({ className }) => (
  <svg 
    width="8" 
    height="8" 
    viewBox="0 0 8 8" 
    fill="none" 
    className={cn(
      "text-text-subtle/30 transition-colors duration-200 pointer-events-none select-none", 
      className
    )}
  >
    <path d="M4 0V8M0 4H8" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export default PlusIcon;
