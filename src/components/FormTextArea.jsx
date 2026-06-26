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
      {label && isBoxed && (
        <label className="block text-xs uppercase tracking-widest font-mono text-text-subtle">
          {label} {required && <span className="text-lime">*</span>}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={cn(
          isBoxed
            ? "w-full bg-text/[0.02] border border-text/10 focus:border-lime py-4 px-5 text-base rounded-none outline-none transition-colors placeholder:text-text/10 text-text min-h-[140px] resize-y"
            : "w-full bg-transparent border-b-2 py-4 text-lg outline-none focus:border-lime transition-colors resize-none placeholder:text-text/10 text-text min-h-[140px]",
          error
            ? "border-red-500/50 focus:border-red-500"
            : isBoxed
            ? "focus:border-lime"
            : "border-text/10 focus:border-lime",
          className
        )}
        {...props}
      />

      {error && (
        isBoxed ? (
          <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1">
            <AlertCircle size={12} /> {error}
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 dark:text-red-400 text-xs mt-2 flex items-center gap-1.5"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )
      )}
    </div>
  );
};

export default FormTextArea;
