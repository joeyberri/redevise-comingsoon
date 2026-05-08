import { cn } from "../utils/cn";
import FadeIn from "./FadeIn.jsx";
import { Heading, Text } from "./Typography.jsx";
import Pill from "./Pill.jsx";
import TextReveal from "./TextReveal.jsx";

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
      
      <Heading 
        level={2} 
        variant="section-title" 
        className={cn("mb-6", titleClassName)}
      >
        {typeof title === "string" ? (
          <TextReveal text={title} />
        ) : (
          title
        )}
      </Heading>
      
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
