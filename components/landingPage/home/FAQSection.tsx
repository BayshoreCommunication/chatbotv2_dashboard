"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

// ============================================================================
// DATA
// ============================================================================
const FAQS = [
  {
    question: "How does BayAI learn about my business?",
    answer:
      "Just enter your company name and website URL. BayAI crawls your pages, services, pricing, and FAQs, then trains itself automatically — no manual content uploads or coding required.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are live in under 10 minutes. Once BayAI finishes scanning your site, your chatbot is trained and ready to start answering visitors immediately.",
  },
  {
    question: "Can it book appointments and capture leads?",
    answer:
      "Yes. BayAI can qualify visitors, collect contact details, and schedule appointments directly in the conversation, routing hot leads straight to your team.",
  },
  {
    question: "Do I need any technical or coding skills?",
    answer:
      "None at all. There's nothing to install or configure — just add your website URL and a short embed snippet, and BayAI handles the rest.",
  },
  {
    question: "What happens after my free trial ends?",
    answer:
      "You'll get a reminder before your trial ends. If you don't upgrade, your chatbot simply pauses — no surprise charges, and your data stays safe.",
  },
  {
    question: "Can I cancel or change my plan later?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel anytime from your dashboard — no contracts, no cancellation fees.",
  },
];

// ============================================================================
// FAQ ITEM
// ============================================================================
const FAQItem = ({
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

// ============================================================================
// FAQ SECTION
// ============================================================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-50 py-10 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            FAQ
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-3 text-center text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl"
        >
          Frequently asked questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mb-12 text-center text-base text-gray-600 sm:text-lg"
        >
          Everything you need to know before getting started with BayAI.
        </motion.p>

        <div>
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
