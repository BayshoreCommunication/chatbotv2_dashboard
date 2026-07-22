"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ALL_FAQS } from "@/lib/faqData";
import FAQAccordionItem from "@/components/landingPage/faq/FAQAccordionItem";

// Homepage teaser shows the first 6 questions across all categories — the
// dedicated /faq page has the full categorized list.
const FAQS = ALL_FAQS.slice(0, 6);

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
          Everything you need to know before getting started with Go Converto.
        </motion.p>

        <div>
          {FAQS.map((faq, index) => (
            <FAQAccordionItem
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
