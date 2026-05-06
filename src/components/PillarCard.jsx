import FeatureCard from "./FeatureCard.jsx";
import { Text } from "./Typography.jsx";
import CardBadge from "./CardBadge.jsx";

const PillarCard = ({ num, title, text, tag, className, index = 0 }) => {
  const badge = (
    <CardBadge groupName="pillar" dotPosition="right">
      {num}
    </CardBadge>
  );

  return (
    <FeatureCard
      index={index}
      groupName="pillar"
      title={title}
      description={text}
      badge={badge}
      className={className}
    >
      <div className="pt-6 border-t border-text/10">
        <Text variant="tiny" className="group-hover/pillar:text-text group-focus/pillar:text-text transition-colors duration-500">
          {tag}
        </Text>
      </div>
    </FeatureCard>
  );
};

export default PillarCard;
