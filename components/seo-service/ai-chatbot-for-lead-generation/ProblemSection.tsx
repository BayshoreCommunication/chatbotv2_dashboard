"use client";

import { motion } from "framer-motion";

const problemCards = [
  {
    id: "01",
    title: "Visitors cannot find answer",
    description:
      "A real estate visitor may want to know whether a property is still available. A software buyer may need confirmation about pricing, integrations or team size. If the site does not answer the question, the conversation may end there.",
  },
  {
    id: "02",
    title: "Contact forms create another step",
    description:
      "A traditional form often asks for a name, email address, phone number and message. Some people will complete it. Others will leave halfway through. Ai agent can ask for the same information naturally during the conversation.",
  },
  {
    id: "03",
    title: "After hours inquiries can wait",
    description:
      "Someone may visit your website after official hours searching for a service they need. Your team may not see the inquiry until the next morning. By then, the person may have contacted another company.",
  },
  {
    id: "04",
    title: "Sales teams spend time on weak inquiries",
    description:
      "Without upfront qualification, staff spend hours reviewing inquiries with lacking budget, falling outside your geographic area or needing services you do not offer.",
  },
];

export default function ProblemSection() {
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
              - The problem
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Losing leads before they ever contact you?
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            A website can answer a lot of questions. The problem starts when a prospect still has one question and can not get answer quickly. A form also asks the visitor to stop, fill in several fields and wait for a response. Some visitors simply leave.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {problemCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
            >
              <div className="h-[2.5px] w-8 bg-[#00a8a0] mb-4 rounded-full" />
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
