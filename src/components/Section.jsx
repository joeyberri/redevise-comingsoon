import { Element } from "react-scroll";
import clsx from "clsx";

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
        <div className={clsx("container py-24 md:py-32", containerClassName)}>
          {children}
        </div>
      </Element>
    </section>
  );
};

export default Section;
