import FeatureCard from "./FeatureCard.jsx";
import FeatureItem from "./FeatureItem.jsx";

const ServiceCard = ({ title, tagline, features, cta, className, index = 0 }) => {
  return (
    <FeatureCard
      index={index}
      groupName="service"
      title={title}
      description={tagline}
      className={className}
    >
      <div className="mb-8 space-y-3 flex-1">
        <ul className="space-y-3">
          {features.map((feat, i) => (
            <FeatureItem key={i}>
              {feat}
            </FeatureItem>
          ))}
        </ul>
      </div>

      <a
        href="#cta"
        className="group inline-flex items-center gap-2 border-b border-text-subtle pb-1 font-sans text-xs font-semibold uppercase tracking-wider text-text transition-all duration-300 hover:border-lime hover:text-lime w-fit"
      >
        {cta}
      </a>
    </FeatureCard>
  );
};

export default ServiceCard;
