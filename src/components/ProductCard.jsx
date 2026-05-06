import FeatureCard from "./FeatureCard.jsx";
import CardBadge from "./CardBadge.jsx";

const ProductCard = ({ label, name, text, className, index = 0 }) => {
  const badge = (
    <CardBadge groupName="card">
      {label}
    </CardBadge>
  );

  return (
    <FeatureCard
      index={index}
      groupName="card"
      title={name}
      description={text}
      badge={badge}
      className={className}
    />
  );
};

export default ProductCard;
