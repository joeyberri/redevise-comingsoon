import GlassCard from "./GlassCard.jsx";
import { cn } from "../utils/cn";

const ProductCard = ({ label, name, text, className, index = 0 }) => {
  return (
    <GlassCard 
      delay={0.1 * index}
      className={cn("flex flex-col h-full group/card", className)}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex size-2 items-center justify-center">
          <span className="absolute size-full animate-ping rounded-full bg-lime/40 opacity-75" />
          <span className="relative inline-block size-1.5 rounded-full bg-lime shadow-[0_0_12px_rgba(200,255,0,0.8)]" />
        </div>
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-subtle group-hover/card:text-lime transition-colors duration-500">
          {label}
        </span>
      </div>

      <h3 className="mb-4 font-serif text-2xl text-text leading-tight group-hover/card:translate-x-1 transition-transform duration-500">
        {name}
      </h3>

      <p className="text-sm leading-relaxed text-text-muted/80 group-hover/card:text-text transition-colors duration-500">
        {text}
      </p>
    </GlassCard>
  );
};

export default ProductCard;
