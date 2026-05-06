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
    "hero-title": "font-serif text-5xl leading-[1.2] text-text md:text-7xl lg:text-8xl",
    "section-title": "font-sans text-3xl font-bold leading-tight text-text md:text-4xl lg:text-5xl tracking-tight",
    "card-title": "font-sans text-2xl font-bold text-text leading-tight md:text-3xl tracking-tight",
    "small-title": "font-sans text-xl font-semibold text-text leading-tight",
  };

  return (
    <Tag 
      className={cn(
        variants[variant] || variants["section-title"], 
        serif && "font-serif font-normal",
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
    "hero-sub": "max-w-xl text-lg leading-relaxed text-text/60 md:text-xl",
    "section-sub": "max-w-xl text-base leading-relaxed text-text-muted md:text-lg",
    "body": "text-base leading-relaxed text-text-muted md:text-lg",
    "small": "text-sm leading-relaxed text-text-muted/80",
    "tiny": "font-sans text-[10px] font-bold tracking-[0.2em] text-text-subtle uppercase",
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
