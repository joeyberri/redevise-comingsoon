import { cn } from "../utils/cn";

const Logo = ({ className, iconSize = "size-8", textSize = "text-lg", showText = true }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/images/redevise.svg" 
        alt="Redevise" 
        className={cn("transition-transform duration-500 hover:rotate-12", iconSize)} 
      />
      {showText && (
        <span className="font-serif text-2xl font-normal tracking-[-0.02em] text-text leading-none mt-0.5">
          redevise
        </span>
      )}
    </div>
  );
};

export default Logo;
