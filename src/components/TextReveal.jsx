import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../utils/cn";

const TextReveal = ({ text, className, delay = 0, once = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  // Split text into characters including spaces
  const characters = text.split("");

  const container = {
    hidden: { 
      opacity: 0,
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.015, 
        delayChildren: delay,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
    },
  };

  // To make a continuous gradient across separate spans, we "stitch" them 
  // by scaling the background and offsetting it per character.
  const total = characters.length;
  
  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-block", className?.replace("text-gradient", ""))}
    >
      {characters.map((char, index) => {
        const isGradient = className?.includes("text-gradient");
        
        return (
          <motion.span
            key={index}
            variants={child}
            className={cn(
              "inline-block relative align-baseline",
              isGradient && "text-gradient"
            )}
            style={{ 
              whiteSpace: "pre",
              // Generous oversize to prevent ANY clipping of italics or descenders
              padding: "0.2em 0.25em",
              margin: "-0.2em -0.25em",
              // Ensure background/clipping box is not restricted by parent line-height
              overflow: "visible",
              // Stitching logic
              backgroundSize: isGradient ? `${total * 100}% 100%` : undefined,
              backgroundPosition: isGradient ? `${(index / (total - 1)) * 100}% 0%` : undefined,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export default TextReveal;
