import { Element } from "react-scroll";
import clsx from "clsx";
import { motion } from "framer-motion";

const Section = ({ 
  name, 
  children, 
  showDivider = false, 
  className,
  containerClassName 
}) => {
  return (
    <section className={clsx("relative", className)}>
      {showDivider && <div className="divider" />}
      <Element name={name}>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className={clsx("container py-24 md:py-32", containerClassName)}
        >
          {children}
        </motion.div>
      </Element>
    </section>
  );
};

export default Section;
