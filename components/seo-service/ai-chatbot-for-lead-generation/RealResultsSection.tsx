"use client";

import { motion } from "framer-motion";

const resultCards = [
  {
    stat: "2 sec",
    title: "Average response time",
    description:
      "Visitors can get an answer in seconds instead of waiting hours or days for an email response.",
  },
  {
    stat: "24/7",
    title: "Lead capture coverage",
    description:
      "The chatbot can engage visitors during business hours, evenings, weekends and holidays.",
  },
  {
    stat: "0 missed",
    title: "After hours inquiries address fast",
    description:
      "A visitor can start a conversation and submit their details even when your team is offline.",
  },
  {
    stat: "Hours saved",
    title: "Reduce sort time on unqualified inquiries",
    description:
      "The chatbot can collect basic qualification information before your sales team reviews the lead, giving them more context for follow up.",
  },
];

export default function RealResultsSection() {
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
              - real results
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            What faster lead response can change?
          </h2>

          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            A visitor may reach your website at any hour. A fast response gives them a chance to ask questions, explain what they need and take the next step before they leave.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {resultCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00a8a0] block mb-2 font-serif">
                  {card.stat}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
