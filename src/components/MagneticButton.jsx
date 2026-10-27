import { cn } from "../utils/cn";
import Button from "./Button.jsx";

const MagneticButton = ({ 
  children, 
  variant = "primary", 
  strength, 
  withBeam,
  className,
  containerClassName,
  ...props 
}) => {
  return (
    <div className={cn("w-full sm:w-auto", containerClassName)}>
      <Button 
        variant={variant} 
        className={cn(
          "w-full px-8 py-4 text-sm justify-center transition-colors duration-200",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default MagneticButton;
