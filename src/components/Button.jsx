import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";
import { cn } from "../utils/cn";

const Button = ({
  children,
  href,
  to,
  onClick,
  className,
  variant = "primary",
  offset = -100,
  spy = true,
  smooth = true,
}) => {
  const baseStyles = "relative overflow-hidden";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "inline-flex items-center gap-2 text-text-muted hover:text-text bg-transparent p-0 font-sans text-sm tracking-wide transition-colors",
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  const MotionContent = () => (
    <span className="relative z-10">{children}</span>
  );

  const motionProps = {
    whileTap: { scale: 0.98 },
  };

  if (to) {
    if (typeof to === "string" && to.startsWith("/")) {
      return (
        <LinkRouter to={to} onClick={onClick}>
          <motion.div {...motionProps} className={cn(combinedClasses, "cursor-pointer")}>
            <MotionContent />
          </motion.div>
        </LinkRouter>
      );
    }
    return (
      <LinkScroll
        to={to}
        offset={offset}
        spy={spy}
        smooth={smooth}
        onClick={onClick}
      >
        <motion.div {...motionProps} className={cn(combinedClasses, "cursor-pointer")}>
          <MotionContent />
        </motion.div>
      </LinkScroll>
    );
  }

  if (href) {
    return (
      <motion.a 
        {...motionProps}
        href={href} 
        className={combinedClasses}
      >
        <MotionContent />
      </motion.a>
    );
  }

  return (
    <motion.button 
      {...motionProps}
      onClick={onClick} 
      className={combinedClasses}
    >
      <MotionContent />
    </motion.button>
  );
};

export default Button;
