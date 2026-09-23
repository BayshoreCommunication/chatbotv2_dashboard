"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const faqs = [
  {
    question: "1) Will Go Converto be able to schedule property visits for me?",
    answer:
      "Yes. If a buyer is ready to view a property, Go Converto can verify your connected calendar and help set up a time in the conversation itself. This helps to get interested buyers in the door for a scheduled showing.",
  },
  {
    question: "2) Will Go Converto reply to buyers when I am not available?",
    answer:
      "Yes. Property enquiries are answered 24/7 nights, weekends and holidays. It can answer questions about your listings, gather key information your buyers are looking for, and assist in scheduling tours when you're too busy or away from your phone. You can join in any time when a buyer requires individual assistance.",
  },
  {
    question: "3) Can Go Converto answer questions about my actual listings?",
    answer:
      "Yes. Go Converto uses your property information to answer questions about your listings, including pricing, availability, features, amenities, appliances, and showing times. You can review the information before the assistant starts interacting with buyers.",
  },
  {
    question: "4) Do I need any technical skills to set up Go Converto?",
    answer:
      "No. setup shall be easily done. Simply enter your website or listing URL, sign off on what Go Converto gathers, pick out your screening questions and include the chat widget on your website. Coding skills or an IT team is not required.",
  },
  {
    question: "5) What do I do if a buyer wants to talk to me?",
    answer:
      "The conversation may be resumed at any time. Go Converto will remember all the conversation history and the information already provided by the buyer, thus giving you more context to step in and save them from repeating themselves.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#f8fafc] py-12 lg:py-16 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Frequently Asked Questions
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-base sm:text-lg font-bold text-gray-900 hover:text-[#00a8a0] transition-colors"
                >
                  <span>{faq.question}</span>
                  <BiChevronDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-[#00a8a0]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
