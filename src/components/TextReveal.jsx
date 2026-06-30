import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../utils/cn";

const TextReveal = ({ text, className, delay = 0, once = true, keepTogether = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  if (keepTogether) {
    const singleVariant = {
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          delay,
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      hidden: {
        opacity: 0,
        y: 6,
        filter: "blur(3px)",
      },
    };

    return (
      <motion.span
        ref={ref}
        variants={singleVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn("inline-block whitespace-nowrap max-sm:whitespace-normal", className)}
        style={{ 
          paddingRight: className?.includes("italic") ? "0.15em" : undefined 
        }}
      >
        {text}
      </motion.span>
    );
  }

  // Split text into words (not characters) for a faster, cleaner reveal
  const words = text.split(" ");

  const container = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: delay,
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hidden: {
      opacity: 0,
      y: 6,
      filter: "blur(3px)",
    },
  };


  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline", className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ 
            whiteSpace: "nowrap",
            marginRight: index < words.length - 1 ? "0.3em" : undefined,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
