"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqItems = [
  {
    id: "faq-1",
    question: "How does AI chatbot qualify leads without a contact form?",
    answer:
      "The chatbot asks qualification questions during the conversation. Questions can cover service interest, project needs, timing, budget signals, company size or other criteria relevant to your sales process. The responses can then be stored with the lead information for follow up.",
  },
  {
    id: "faq-2",
    question: "Can the chatbot connect with my CRM?",
    answer:
      "Go Converto's current page lists HubSpot, Salesforce and Zapier among its integrations. The exact fields, workflow and automation available depend on your selected integration and account setup.",
  },
  {
    id: "faq-3",
    question: "Does the chatbot work outside business hours?",
    answer:
      "Yes. The chatbot can engage visitors outside normal business hours, including evenings, weekends and holidays. Your team can review the captured inquiry during its normal working hours.",
  },
  {
    id: "faq-4",
    question: "Can I change the questions the chatbot asks?",
    answer:
      "Yes. The qualification flow can be adjusted to match your sales process. A real estate company may ask about buying or renting. A consultancy may ask about the business problem and timeline. A software company may ask about company size and product needs.",
  },
  {
    id: "faq-5",
    question: "Will the chatbot replace my contact form?",
    answer:
      "It does not have to. You can keep the existing form and use the chatbot as another lead capture option. This lets visitors choose between a traditional form and a conversational route.",
  },
  {
    id: "faq-6",
    question: "Can a human take over the conversation?",
    answer:
      "Yes. The current page supports human takeover for conversations requiring personal attention.",
  },
  {
    id: "faq-7",
    question: "Can the chatbot book appointments?",
    answer:
      "Yes. Calendar booking is supported, with Calendly listed among the current integrations.",
  },
  {
    id: "faq-8",
    question: "What type of businesses can use an AI lead generation chatbot?",
    answer:
      "The service can support businesses with website traffic and an inbound sales or inquiry process, including law firms, healthcare practices, real estate businesses, consultancies, agencies, technology companies and other service based businesses.",
  },
  {
    id: "faq-9",
    question: "Does every visitor need to become a lead?",
    answer:
      "No. Some visitors are only researching. Others may ask a question and leave. The goal is to give relevant visitors a clear path toward contacting the business, requesting a consultation, booking a demo or providing information for follow up.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              - FAQs
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-white border-2 border-[#00a8a0] border-l-[6px] border-l-[#00a8a0] shadow-md"
                    : "bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:border-slate-300"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>
                    <span className="text-xl font-bold text-[#00a8a0] select-none shrink-0">
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
                        <div className="border-t border-slate-100 mt-4 pt-4">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
