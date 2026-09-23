"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Use your own business information",
    description:
      "Ai chatbot can use approved business content from your website and internal source material. This may include service pages, product information, FAQs, pricing guidance, policies and other approved details. Keeping responses tied to your own content can give visitors more relevant answers.",
  },
  {
    title: "Adjust the qualification questions",
    description:
      "Your sales process determines the information worth collecting from a new prospect. Questions can focus on service type, project size, timeline, location, company size, budget, appointment type or other lead criteria. Different flows can also be created for different products or services.",
  },
  {
    title: "Bring in a human when needed",
    description:
      "Some visitors need personal assistance before they can take the next step. Your team can take over when a request requires a detailed explanation, custom advice or direct discussion. Chatbot can pass the conversation context to help employee continue the discussion.",
  },
  {
    title: "Match the website experience",
    description:
      "Ai assistant can be configured to fit existing website experience. Placement, colors, button styles and other display settings can be adjusted to suit the site design. A consistent presentation helps chat feel like part of website instead of a separate tool.",
  },
];

export default function PersonalizationSection() {
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
              - personalization
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Make AI chatbot fit the way your business actually sells.
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            An ai chatbot for lead generation should not sound like a generic script.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
            >
              <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-3 rounded-full" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
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
