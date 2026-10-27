import FeatureCard from "./FeatureCard.jsx";
import CardBadge from "./CardBadge.jsx";
import { ArrowUpRight } from "lucide-react";

const ProductCard = ({ label, name, text, cta, href, domain, featured, className, index = 0 }) => {
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
      className="hover:text-lime transition-colors inline-flex flex-wrap items-baseline gap-2 group/title"
    >
      <span>{name}</span>
      {domain && (
        <span className="text-xs font-normal text-text-muted/70 group-hover/title:text-lime/90 font-mono">
          ({domain})
        </span>
      )}
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
        <div className="pt-4 mt-auto border-0">
          <a 
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-xs font-bold text-lime hover:text-lime-400 transition-colors group/link"
          >
            <span>{cta || (domain ? `Visit ${domain}` : "Visit Website")}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </FeatureCard>
  );
};

export default ProductCard;
