import clsx from "clsx";

const ValueCard = ({ title, text, className }) => {
  return (
    <div className={className}>
      <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-text">
        {title}
      </h4>
      <p className="text-xs leading-relaxed text-text-subtle">
        {text}
      </p>
    </div>
  );
};

export default ValueCard;
