import FeatureCard from "./FeatureCard.jsx";
import CardBadge from "./CardBadge.jsx";
import { ArrowUpRight } from "lucide-react";
import MagneticWrapper from "./MagneticWrapper.jsx";

const ProductCard = ({ label, name, text, cta, href, className, index = 0 }) => {
  const badge = (
    <CardBadge groupName="card">
      {label}
    </CardBadge>
  );

  const titleContent = href ? (
    <a 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="hover:text-lime transition-colors inline-flex items-center gap-1.5"
    >
      {name}
    </a>
  ) : name;

  return (
    <FeatureCard
      index={index}
      groupName="card"
      title={titleContent}
      description={text}
      badge={badge}
      className={className}
    >


      {href && (
        <div className="pt-6 border-t border-text/[0.05]">
          <MagneticWrapper strength={0.1}>
            <a 
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-xs font-medium text-lime hover:text-lime-400 transition-colors group/link"
            >
              {cta || "Visit Website"}
              <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </MagneticWrapper>
        </div>
      )}
    </FeatureCard>
  );
};

export default ProductCard;
