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
    "hero-title": "font-sans font-extrabold tracking-tight text-[2.5rem] leading-[1.1] text-text sm:text-5xl md:text-6xl lg:text-7xl",
    "section-title": "font-sans text-3xl font-bold leading-[1.2] text-text md:text-4xl lg:text-5xl tracking-tight",
    "card-title": "font-sans text-xl font-bold text-text leading-[1.3] md:text-2xl tracking-tight",
    "small-title": "font-sans text-lg font-semibold text-text leading-[1.3] tracking-tight",
  };

  const fontClass = variant === "hero-title"
    ? (serif ? "font-serif font-normal" : "font-extrabold")
    : (serif ? "font-serif font-normal" : "");

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
    "hero-sub": "max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl font-normal",
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
