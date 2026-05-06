import { cn } from "../utils/cn";
import Button from "./Button.jsx";
import MagneticWrapper from "./MagneticWrapper.jsx";
import BorderBeam from "./BorderBeam.jsx";

const MagneticButton = ({ 
  children, 
  variant = "primary", 
  strength = 0.2, 
  withBeam = false,
  className,
  containerClassName,
  ...props 
}) => {
  return (
    <MagneticWrapper 
      strength={strength} 
      className={cn("w-full sm:w-auto", containerClassName)}
    >
      <div className="relative group w-full sm:w-auto">
        <Button 
          variant={variant} 
          className={cn(
            "w-full px-10 py-5 text-base justify-center transition-all duration-300",
            variant === "secondary" && "hover:bg-text/5",
            className
          )}
          {...props}
        >
          {children}
        </Button>
        {withBeam && (
          <BorderBeam 
            size={120} 
            duration={6} 
            className="opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        )}
      </div>
    </MagneticWrapper>
  );
};

export default MagneticButton;
