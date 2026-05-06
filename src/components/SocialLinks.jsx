import { socials } from "../constants/index.jsx";
import { cn } from "../utils/cn";

const SocialLinks = ({ className, itemClassName }) => {
  return (
    <ul className={cn("flex gap-3", className)}>
      {socials.map(({ id, url, icon, title }) => (
        <li key={id}>
          <a
            href={url}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border border-dark-400/40 bg-dark-50/40 transition-all duration-300 hover:border-lime/30 hover:bg-dark-50",
              itemClassName
            )}
            aria-label={title}
          >
            <img
              src={icon}
              alt={title}
              className="size-4 object-contain opacity-60 transition-opacity hover:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
