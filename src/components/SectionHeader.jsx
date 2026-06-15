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
  subtitleClassName,
  centered = false
}) => {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {pill && (
        <Pill animated className="mb-6">
          {pill}
        </Pill>
      )}
      
      <Heading 
        level={2} 
        variant="section-title" 
        className={cn("mb-6", centered && "mx-auto", titleClassName)}
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
            className={cn(centered && "mx-auto", subtitleClassName)}
          >
            {subtitle}
          </Text>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeader;
