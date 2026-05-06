import clsx from "clsx";
import FeatureItem from "./FeatureItem.jsx";

const ServiceCard = ({ title, tagline, features, cta, className }) => {
  return (
    <div className={clsx("card p-8 md:p-10 flex flex-col", className)}>
      <h3 className="mb-3 font-serif text-2xl text-text md:text-3xl">
        {title}
      </h3>
      <p className="mb-8 text-sm leading-relaxed text-text-muted">
        {tagline}
      </p>

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
    </div>
  );
};

export default ServiceCard;
