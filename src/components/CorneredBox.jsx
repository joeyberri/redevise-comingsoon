import { cn } from "../utils/cn";

const CorneredBox = ({ children, className, plusClassName, as: Tag = "div", ...props }) => {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl bg-dark-100/75 p-8 md:p-12 transition-colors duration-200 border-0",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default CorneredBox;
