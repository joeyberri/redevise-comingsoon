import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  fullWidth = false,
  className 
}) => {
  const directions = {
    up: { y: 10, x: 0 },
    down: { y: -10, x: 0 },
    left: { y: 0, x: 10 },
    right: { y: 0, x: -10 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: directions[direction].y, 
        x: directions[direction].x 
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.3,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(fullWidth ? "w-full" : "w-auto", className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
