"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Icons matching the screenshot
function SpeechBubbleIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <circle cx="9" cy="12" r="0.75" fill="currentColor" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
      <circle cx="15" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" strokeWidth="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" strokeWidth="2" />
    </svg>
  );
}

function ChevronDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#00a8a0] shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const faqItems = [
  {
    id: "question-1",
    icon: SpeechBubbleIcon,
    question: '"I already have a contact form."',
    answer:
      "Forms still leave a gap after hours and lose most visitors before they submit. Go Converto works alongside your form, capturing the inquiries that would otherwise leave without acting.",
  },
  {
    id: "question-2",
    icon: ShieldCheckIcon,
    question: '"Legal intake is too sensitive for a chatbot."',
    answer:
      "Go Converto is trained on your own practice area content, not a generic script, and can be configured to hand off sensitive matters to a human immediately if you prefer.",
  },
  {
    id: "question-3",
    icon: ClockIcon,
    question: '"I don’t have time to set this up."',
    answer:
      "Setup is one URL and a few minutes. No developer, no code, no intake script to write manually.",
  },
];

export default function CommonQuestionsSection() {
  // Store open state for each item (all open by default as in screenshot)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "question-1": true,
    "question-2": true,
    "question-3": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Top Line Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              NOT SURE YET?
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Common questions before switching
          </h2>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base font-normal">
            Straight answers to the questions we hear most from law firms <br className="hidden sm:inline" />
            considering Go Converto.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* ACCORDION CARDS LIST */}
        {/* ========================================================================= */}
        <div className="space-y-5 sm:space-y-6">
          {faqItems.map((item, index) => {
            const IconComponent = item.icon;
            const isOpen = openItems[item.id] ?? true;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer"
                  onClick={() => toggleItem(item.id)}
                >
                  {/* Left Column: Icon Circle + Question Text (Bold Serif Italic) */}
                  <div className="flex items-center gap-4 md:w-5/12 shrink-0 md:pr-6 md:border-r md:border-slate-200/70">
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e6f7f5] border border-[#c6ece9] group-hover:scale-105 transition-transform duration-300">
                      <IconComponent />
                    </div>
                    
                    {/* Left Question Text with Serif Italic Bold Font Style */}
                    <h3 className="font-serif italic font-bold text-slate-900 text-lg sm:text-xl md:text-[21px] leading-snug tracking-tight">
                      {item.question}
                    </h3>
                  </div>

                  {/* Right Column: Answer Text + Chevron Icon */}
                  <div className="flex-1 flex items-center justify-between gap-4 md:pl-2">
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal"
                        >
                          {item.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="shrink-0 self-center pl-2">
                      <ChevronDownIcon isOpen={isOpen} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
