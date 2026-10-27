import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const FormTextArea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  variant = "boxed",
  required = false,
  autoFocus = false,
  className,
  wrapperClassName,
  ...props
}) => {
  const isBoxed = variant === "boxed";

  return (
    <div className={cn(isBoxed ? "space-y-2" : "", wrapperClassName)}>
      {label && (
        <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-text-muted">
          {label} {required && <span className="text-lime">*</span>}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={cn(
          "w-full bg-dark-50/80 hover:bg-dark-200/50 focus:bg-dark-200 border-0 py-4 px-5 text-base rounded-xl outline-none transition-colors placeholder:text-text-muted/40 text-text min-h-[140px] resize-y focus:ring-2 focus:ring-lime/30",
          error && "ring-2 ring-red-500/50",
          className
        )}
        {...props}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormTextArea;
