import clsx from "clsx";

const FeatureItem = ({ children, className }) => {
  return (
    <li className={clsx("flex items-start gap-3", className)}>
      <span className="mt-1 font-sans text-sm text-lime">→</span>
      <span className="text-sm leading-relaxed text-text-muted">
        {children}
      </span>
    </li>
  );
};

export default FeatureItem;
