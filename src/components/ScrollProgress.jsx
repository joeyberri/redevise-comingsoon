import { motion, useScroll } from "framer-motion";
import { cn } from "../utils/cn";

const ScrollProgress = ({ className }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left",
        className
      )}
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, rgb(var(--color-lime)), rgb(var(--color-green)))",
      }}
    />
  );
};

export default ScrollProgress;
