import { cn } from "../utils/cn";
import FadeIn from "./FadeIn.jsx";
import { Heading, Text } from "./Typography.jsx";
import Pill from "./Pill.jsx";

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
        <Pill animated className="mb-6">
          {pill}
        </Pill>
      )}
      
      <FadeIn delay={0.2}>
        <Heading 
          level={2} 
          variant="section-title" 
          className={cn("mb-6", titleClassName)}
        >
          {title}
        </Heading>
      </FadeIn>
      
      {subtitle && (
        <FadeIn delay={0.3}>
          <Text 
            variant="section-sub" 
            className={subtitleClassName}
          >
            {subtitle}
          </Text>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeader;
