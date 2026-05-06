import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const TextReveal = ({
  text,
  className,
  as: Component = "h1",
  delay = 0,
  stagger = 0.05,
  once = true,
}) => {
  // Split text into words, preserving spaces
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
  };

  const MotionComponent = motion[Component] || motion(Component);

  return (
    <MotionComponent
      className={cn("flex flex-wrap overflow-hidden", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="mr-[0.25em] inline-block whitespace-nowrap"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default TextReveal;
