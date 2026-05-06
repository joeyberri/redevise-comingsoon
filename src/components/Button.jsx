import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
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
  const baseStyles = "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-sans text-sm tracking-wide transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-lime font-semibold text-dark hover:shadow-lg hover:shadow-lime/20",
    secondary: "border border-dark-400 bg-transparent font-medium text-text hover:border-lime/40 hover:text-lime",
    ghost: "text-text-muted hover:text-text bg-transparent p-0",
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  const MotionContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.span 
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-lime/20 to-transparent"
        />
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (to) {
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
