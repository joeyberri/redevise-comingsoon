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

  return (
    <FeatureCard
      index={index}
      groupName="card"
      title={name}
      description={text}
      badge={badge}
      className={className}
    >


      {cta && href && (
        <div className="pt-6 border-t border-text/[0.05]">
          <MagneticWrapper strength={0.1}>
            <a 
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-xs font-medium text-lime hover:text-lime-400 transition-colors group/link"
            >
              {cta}
              <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </MagneticWrapper>
        </div>
      )}
    </FeatureCard>
  );
};

export default ProductCard;
