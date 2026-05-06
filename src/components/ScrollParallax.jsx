import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "../utils/cn";

/**
 * ScrollParallax - Wraps children with a scroll-linked parallax offset.
 * Use on decorative elements (orbs, grids, images) to create depth.
 * 
 * @param {number} speed - Parallax intensity. 0 = no effect, 0.5 = half scroll speed, -0.3 = reverse.
 * @param {string} axis - "y" (default) or "x".
 */
const ScrollParallax = ({ 
  children, 
  speed = 0.3, 
  axis = "y", 
  className 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = [-100 * speed, 100 * speed];
  const transform = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ [axis]: transform }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollParallax;
