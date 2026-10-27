import { cn } from "../utils/cn";

export const Heading = ({
  level = 2,
  variant = "section-title",
  className,
  children,
  serif = false,
  ...props
}) => {
  const Tag = `h${level}`;

  const variants = {
    "hero-title": "font-heading font-normal tracking-tightest leading-[0.92] text-[3.25rem] sm:text-7xl md:text-[5.25rem] lg:text-[6rem] xl:text-[7rem] text-text",
    "section-title": "font-heading text-3xl font-normal leading-[1.15] text-text md:text-4xl lg:text-5xl tracking-normal",
    "card-title": "font-heading text-xl font-normal text-text leading-[1.3] md:text-2xl tracking-normal",
    "small-title": "font-heading text-lg font-normal text-text leading-[1.3] tracking-normal",
  };

  const fontClass = serif ? "font-serif font-normal normal-case tracking-normal" : "";

  return (
    <Tag
      className={cn(
        variants[variant] || variants["section-title"],
        fontClass,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export const Text = ({
  variant = "body",
  className,
  children,
  ...props
}) => {
  const variants = {
    "hero-sub": "max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-text-muted font-normal",
    "section-sub": "max-w-2xl text-base leading-relaxed text-text-muted md:text-lg",
    "body": "text-base leading-relaxed text-text-muted md:text-lg",
    "small": "text-sm leading-relaxed text-text-muted",
    "tiny": "font-sans text-xs font-semibold tracking-wider text-text-muted uppercase",
  };

  return (
    <p
      className={cn(variants[variant] || variants["body"], className)}
      {...props}
    >
      {children}
    </p>
  );
};
