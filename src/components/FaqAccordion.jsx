import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "./Typography.jsx";
import { Plus, Minus } from "lucide-react";
import { cn } from "../utils/cn";

const FaqAccordion = ({ items, variant = "boxed", renderAnswer }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const question = item.question || item.q || "";
        const answer = item.answer || item.a || "";
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className="rounded-2xl bg-dark-100/75 hover:bg-dark-200/90 transition-colors duration-200 overflow-hidden border-0"
          >
            <button
              id={buttonId}
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between text-left cursor-pointer outline-none bg-transparent border-0 p-6 gap-4"
            >
              <span className="font-sans font-semibold text-base md:text-lg text-text hover:text-lime transition-colors duration-200 pr-4">
                {question}
              </span>

              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-dark-200 text-text-muted transition-colors">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
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
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
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
