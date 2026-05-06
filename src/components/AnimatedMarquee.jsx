import { motion } from "framer-motion";

const AnimatedMarquee = ({ items }) => {
  return (
    <div className="marquee-container">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 40, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-16 px-8 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-sans text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-lime"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedMarquee;
