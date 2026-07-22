"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQAccordionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06 }}
    className="border-b border-gray-200"
  >
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-6 py-5 text-left"
      aria-expanded={isOpen}
    >
      <span className="text-base font-bold text-thunder-black sm:text-lg">
        {question}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Plus className="h-4 w-4" />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p className="max-w-2xl pb-5 pr-10 text-sm leading-relaxed text-gray-600 sm:text-base">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default FAQAccordionItem;
