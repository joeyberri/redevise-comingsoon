import { cn } from "../utils/cn";
import PlusIcon from "./PlusIcon.jsx";

const CorneredBox = ({ children, className, plusClassName, as: Tag = "div", ...props }) => {
  return (
    <Tag className={cn("relative border border-text/[0.08] bg-dark-100/60 p-8 md:p-12 overflow-visible", className)} {...props}>
      {/* Corner indicators */}
      <div className="absolute -top-[4px] -left-[4px] z-20 pointer-events-none">
        <PlusIcon className={plusClassName} />
      </div>
      <div className="absolute -top-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon className={plusClassName} />
      </div>
      <div className="absolute -bottom-[4px] -left-[4px] z-20 pointer-events-none">
        <PlusIcon className={plusClassName} />
      </div>
      <div className="absolute -bottom-[4px] -right-[4px] z-20 pointer-events-none">
        <PlusIcon className={plusClassName} />
      </div>
      {children}
    </Tag>
  );
};

export default CorneredBox;
