import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "./Typography.jsx";
import { Plus, Minus } from "lucide-react";
import { cn } from "../utils/cn";

const FaqAccordion = ({ items, variant = "bordered", renderAnswer }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-4", variant === "bordered" && "space-y-0")}>
      {items.map((item, index) => {
        const question = item.question || item.q || "";
        const answer = item.answer || item.a || "";
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const contentId = `faq-content-${index}`;

        const isBoxed = variant === "boxed";

        return (
          <div
            key={index}
            className={cn(
              isBoxed
                ? "border border-text/[0.06] bg-dark-100/20 transition-all duration-300 hover:border-text/[0.12] rounded-none overflow-hidden"
                : "border-b border-dark-400/30 last:border-0"
            )}
          >
            <button
              id={buttonId}
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className={cn(
                "w-full flex items-center justify-between text-left cursor-pointer outline-none bg-transparent border-0",
                isBoxed
                  ? "p-6"
                  : "py-6 gap-4 hover:text-lime focus-visible:ring-2 focus-visible:ring-lime/30 rounded"
              )}
            >
              {isBoxed ? (
                <span className="font-sans font-semibold text-sm md:text-base text-text hover:text-lime transition-colors duration-200 pr-4">
                  {question}
                </span>
              ) : (
                <Heading level={4} variant="small-title" className="flex-1 pointer-events-none">
                  {question}
                </Heading>
              )}

              <span className="text-text-subtle shrink-0">
                {isBoxed ? (
                  isOpen ? <Minus size={16} /> : <Plus size={16} />
                ) : (
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dark-400/50 text-text-subtle text-xl leading-none select-none"
                  >
                    +
                  </motion.span>
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={cn(isBoxed ? "px-6 pb-6 pt-0 border-t border-text/[0.04]" : "pb-6 pl-0 md:pl-2 max-w-2xl")}>
                    <div className={cn(
                      "text-text-muted font-sans mt-4",
                      isBoxed ? "text-xs md:text-sm leading-relaxed" : "text-sm md:text-base leading-relaxed"
                    )}>
                      {renderAnswer ? renderAnswer(answer) : answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
