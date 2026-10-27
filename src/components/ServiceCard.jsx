import FeatureCard from "./FeatureCard.jsx";
import FeatureItem from "./FeatureItem.jsx";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({ title, tagline, features, cta, footerNote, className, index = 0, onOpenInquiry = () => {} }) => {
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
        <button
          onClick={(e) => {
            e.preventDefault();
            onOpenInquiry(
              title === "Redevise Labs"
                ? "Build a new product or platform"
                : "Automate repetitive workflows"
            );
          }}
          className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-lime hover:text-lime-400 transition-colors w-fit text-left bg-transparent border-0 cursor-pointer outline-none"
        >
          <span>{cta}</span>
          <ArrowUpRight size={14} />
        </button>

      </div>
    </FeatureCard>
  );
};

export default ServiceCard;
