"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Icons matching the screenshot
function SpeechBubbleIcon() {
  return (
    <svg className="w-5 h-5 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg className="w-5 h-5 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a2.41 2.41 0 0 0-3.408-3.408l-1.568 1.568c-.23.23-.556.338-.878.289a2.41 2.41 0 0 0-2.735 2.735c.049.322-.059.648-.289.878l-1.568 1.568a2.41 2.41 0 0 0 3.408 3.408l1.568-1.568c.23-.23.556-.338.878-.289a2.41 2.41 0 0 0 2.735-2.735z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg className="w-5 h-5 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function ShieldLockIcon() {
  return (
    <svg className="w-5 h-5 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="11" width="6" height="5" rx="1" />
    </svg>
  );
}

const faqItems = [
  {
    id: "faq-1",
    icon: SpeechBubbleIcon,
    question: "How does the chatbot screen cases without forms?",
    answer:
      "It asks the same intake questions your team would ask — case type, incident details, urgency — and qualifies the visitor in a natural way. It's conversational, intake-focused, and built to surface the right cases.",
  },
  {
    id: "faq-2",
    icon: PuzzleIcon,
    question: "Can it integrate with our case management system?",
    answer:
      "Yes. Go Converto integrates seamlessly with leading legal CRM and case management platforms like Clio, LawPay, Salesforce, and custom webhooks.",
  },
  {
    id: "faq-3",
    icon: ClockIcon,
    question: "Does it work outside business hours?",
    answer:
      "Absolutely. Go Converto operates 24/7/365, engaging after-hours website traffic, capturing case details, and booking consultations on your calendar automatically.",
  },
  {
    id: "faq-4",
    icon: SlidersIcon,
    question: "Can I customize the intake questions it asks?",
    answer:
      "Yes. You can tailor every question, qualifying rule, and practice area workflow to match how your firm qualifies prospective clients.",
  },
  {
    id: "faq-5",
    icon: ShieldLockIcon,
    question: "Is client information handled confidentially?",
    answer:
      "Yes. All client conversation data is encrypted in transit and at rest with enterprise-grade security standards and GDPR alignment.",
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
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12 sm:mb-14"
        >
          {/* Top Line Kicker Badge */}
          <div className="mb-4 flex items-center justify-start gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              FAQ
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] mb-4">
            Frequently asked questions
          </h2>

          {/* Subtitle Description */}
          <p className="max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base font-normal">
            Everything you need to know about Go Converto and <br className="hidden sm:inline" />
            how it helps your firm capture more qualified clients.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* FAQ ACCORDION LIST */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const IconComp = item.icon;
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-white border-2 border-[#00a8a0] border-l-[6px] border-l-[#00a8a0] shadow-md"
                    : "bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:border-slate-300"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="p-5 sm:p-6">
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Icon Circle */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center shrink-0">
                        <IconComp />
                      </div>

                      {/* Question Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    {/* Toggle Icon (+ or -) */}
                    <div className="shrink-0 pl-2">
                      <span className="text-xl font-bold text-[#00a8a0] select-none">
                        {isOpen ? "—" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Answer Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 mt-4 pt-4 pl-[54px] sm:pl-[60px] pr-4">
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
