"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const concerns = [
  {
    id: "concern-1",
    question: "I already have a contact form.",
    answer:
      "You can keep your contact forms active. The chatbot operates with existing forms to capture traffic because clients would otherwise leave without filling out standard fields.",
  },
  {
    id: "concern-2",
    question: "Answer accuracy and relevancy matters to us.",
    answer:
      "Because the system trains directly on your website text, services and policies, it answers using your actual business logic rather than generic statements.",
  },
  {
    id: "concern-3",
    question: "Our business is too specialized for a chatbot.",
    answer:
      "A specialized business often needs a more specific conversation. The chatbot should rely on approved business content rather than inventing services or answers.",
  },
  {
    id: "concern-4",
    question: "We do not have time for a complicated setup.",
    answer:
      "The current setup flow starts with your website URL and uses existing site content as the information base. Your team can then review the qualification questions and adjust the flow before launch.",
  },
  {
    id: "concern-5",
    question: "Some visitor questions may be irrelevant.",
    answer:
      "When system encounters a prompt it cannot answer with certainty, it collects the visitor's contact information for follow up or alerts a live operator to take over.",
  },
];

export default function CommonQuestionsSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "concern-1": true,
    "concern-2": true,
    "concern-3": true,
    "concern-4": true,
    "concern-5": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              - Common concerns
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Concerns businesses usually have before using lead generation chatbot.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {concerns.map((item, index) => {
            const isOpen = openItems[item.id] ?? true;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-md transition-all cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    {item.question}
                  </h3>
                  <span className="text-[#00a8a0] font-bold text-xl select-none">
                    {isOpen ? "—" : "+"}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-3">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
