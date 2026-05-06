import { cn } from "../utils/cn";
import FadeIn from "./FadeIn.jsx";

const SectionHeader = ({ 
  pill, 
  title, 
  subtitle, 
  className,
  titleClassName,
  subtitleClassName 
}) => {
  return (
    <div className={cn("mb-16", className)}>
      {pill && (
        <FadeIn direction="down">
          <div className="pill mb-6 inline-block">{pill}</div>
        </FadeIn>
      )}
      
      <FadeIn delay={0.2}>
        <h2 className={cn("section-title mb-6", titleClassName)}>
          {title}
        </h2>
      </FadeIn>
      
      {subtitle && (
        <FadeIn delay={0.3}>
          <p className={cn("section-sub", subtitleClassName)}>
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeader;
