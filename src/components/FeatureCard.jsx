import { cn } from "../utils/cn";
import GlassCard from "./GlassCard.jsx";
import { Heading, Text } from "./Typography.jsx";

const FeatureCard = ({ 
  badge, 
  title, 
  description, 
  children, 
  index = 0, 
  className,
  groupName = "card" 
}) => {
  return (
    <GlassCard 
      delay={0.1 * index}
      className={cn("flex flex-col h-full", `group/${groupName}`, className)}
    >
      {/* Header section with Badge and Title */}
      <div className="mb-8">
        {badge && (
          <div className="mb-6 flex items-center justify-between">
            {badge}
          </div>
        )}
        
        <Heading 
          level={3} 
          variant="card-title" 
          className={cn(
            "mb-4 transition-all duration-500",
            `group-hover/${groupName}:text-lime group-focus/${groupName}:text-lime`
          )}
        >
          {title}
        </Heading>
      </div>

      {/* Body Section */}
      <Text variant="small" className="mb-8 flex-1">
        {description}
      </Text>

      {/* Optional Custom Content (Footer, Features, etc.) */}
      {children}
    </GlassCard>
  );
};

export default FeatureCard;
