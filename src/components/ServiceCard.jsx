import FeatureCard from "./FeatureCard.jsx";
import FeatureItem from "./FeatureItem.jsx";

const ServiceCard = ({ title, tagline, features, cta, footerNote, className, index = 0 }) => {
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

      <div className="flex flex-col gap-6">
        <a
          href="#cta"
          className="group inline-flex items-center gap-2 border-b border-text-subtle pb-1 font-sans text-xs font-semibold uppercase tracking-wider text-text transition-all duration-300 hover:border-lime hover:text-lime w-fit"
        >
          {cta}
        </a>

        {footerNote && (
          <div className="pt-4 border-t border-dark-400/30">
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">
              Specialized Vertical
            </p>
            <a 
              href={footerNote.href}
              className="text-xs font-medium text-text-subtle hover:text-lime transition-colors duration-300 flex items-center gap-1.5"
            >
              {footerNote.text}
              <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>
        )}
      </div>
    </FeatureCard>
  );
};

export default ServiceCard;
