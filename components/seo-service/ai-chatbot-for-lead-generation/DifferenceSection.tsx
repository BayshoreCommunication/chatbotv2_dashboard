"use client";

import { motion } from "framer-motion";

const withoutPoints = [
  "A visitor has a question and cannot find an answer.",
  "They leave without contacting you.",
  "Another visitor opens your contact form but decides not to complete it.",
  "A third person sends an inquiry after office hours.",
  "Potential client needs to wait until next business day.",
  "Your sales team then has to sort through short messages.",
  "Ask basic qualification questions which is time consuming process.",
  "It led to missed opportunities for engagement and lost leads.",
];

const withPoints = [
  "A visitor can ask a question directly on the website.",
  "The chatbot responds using your business information.",
  "The conversation moves into qualification based on the visitor's needs.",
  "Contact details are collected during the conversation.",
  "A qualified visitor can move toward a consultation or demo without waiting for a manual response.",
  "Your team receives the lead with more context for the next conversation.",
];

export default function DifferenceSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              - the difference
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            See the difference between a Visitor Who Leaves and One Who Converts.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Without Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-rose-100 bg-white p-7 sm:p-9 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-sm">
                ✕
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Without conversational lead capture
              </h3>
            </div>
            <ul className="space-y-3.5">
              {withoutPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border-2 border-[#00a8a0] bg-gradient-to-b from-[#f4faf9] to-white p-7 sm:p-9 shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a8a0] text-white font-bold text-sm">
                ✓
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                With conversational lead capture
              </h3>
            </div>
            <ul className="space-y-3.5">
              {withPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <span className="text-[#00a8a0] font-bold shrink-0 mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
