import { Element } from "react-scroll";
import clsx from "clsx";
import { motion } from "framer-motion";

const spacingClasses = {
  tight: "py-10 md:py-12",
  default: "py-16 md:py-20",
  generous: "py-20 md:py-28",
};

const Section = ({ 
  name, 
  children, 
  showDivider = false, 
  className,
  containerClassName,
  spacing = "default"
}) => {
  return (
    <section className={clsx("relative", className)}>
      {showDivider && <div className="divider" />}
      <Element name={name}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={clsx("container", spacingClasses[spacing] || spacingClasses.default, containerClassName)}
        >
          {children}
        </motion.div>
      </Element>
    </section>
  );
};

export default Section;
