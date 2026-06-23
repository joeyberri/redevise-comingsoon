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
    "hero-title": "font-space uppercase tracking-[-0.03em] text-[2.75rem] leading-[1.05] text-text sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
    "section-title": "font-space uppercase text-3xl font-extrabold leading-[1.1] text-text md:text-4xl lg:text-5xl tracking-[-0.02em]",
    "card-title": "font-space uppercase text-xl font-bold text-text leading-[1.2] md:text-2xl tracking-[-0.01em]",
    "small-title": "font-space uppercase text-lg font-bold text-text leading-[1.2] tracking-[-0.01em]",
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
    "hero-sub": "max-w-xl text-lg leading-relaxed text-text/60 md:text-xl",
    "section-sub": "max-w-xl text-base leading-relaxed text-text-muted md:text-lg",
    "body": "text-base leading-relaxed text-text-muted md:text-lg",
    "small": "text-sm leading-relaxed text-text-muted/80",
    "tiny": "font-space text-[10px] font-bold tracking-[0.2em] text-text-subtle uppercase",
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
