import { cn } from "../utils/cn";
import FadeIn from "./FadeIn.jsx";

const Pill = ({ children, className, animated = false, delay = 0 }) => {
  const content = (
    <div className={cn(
      "pill", 
      className
    )}>
      {children}
    </div>
  );

  if (animated) {
    return (
      <FadeIn direction="down" delay={delay}>
        {content}
      </FadeIn>
    );
  }

  return content;
};

export default Pill;
