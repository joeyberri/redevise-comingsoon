import GlassCard from "./GlassCard.jsx";
import { cn } from "../utils/cn";

const PillarCard = ({ num, title, text, tag, className, index = 0 }) => {
  return (
    <GlassCard 
      delay={0.1 * index}
      className={cn("flex flex-col h-full group/pillar", className)}
    >
      <div className="mb-8 flex items-baseline justify-between">
        <span className="text-white/10 group-hover/pillar:text-lime/20 transition-colors duration-500">
          {num}
        </span>
        <div className="size-1 rounded-full bg-lime/30" />
      </div>

      <h3 className="mb-4 font-serif text-3xl text-text leading-tight group-hover/pillar:text-lime transition-colors duration-500">
        {title}
      </h3>

      <p className="mb-8 text-sm leading-relaxed text-text-muted/80 flex-1">
        {text}
      </p>

      <div className="pt-6 border-t border-white/5">
        <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-text-subtle uppercase group-hover/pillar:text-text transition-colors duration-500">
          {tag}
        </p>
      </div>
    </GlassCard>
  );
};

export default PillarCard;
