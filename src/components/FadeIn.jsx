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
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
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
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(fullWidth ? "w-full" : "w-auto", className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
