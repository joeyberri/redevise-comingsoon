import { cn } from "../utils/cn";

const Logo = ({ showText = true, className, iconSize = 32 }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Icon Container */}
      <div
        style={{ width: iconSize, height: iconSize }}
        className="relative flex items-center justify-center overflow-hidden"
      >
        <img
          src="/images/redevise.svg"
          alt="Redevise Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="font-serif text-2xl font-normal tracking-[-0.02em] text-text leading-none mt-0.5">
          redevise
        </span>
      )}
    </div>
  );
};

export default Logo;
