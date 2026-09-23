"use client";

import { motion } from "framer-motion";

const industries = [
  {
    title: "Law Firms",
    description:
      "Chatbot can screen inquiries by case type, incident date, location, jurisdiction and other intake criteria. It can answer basic questions about legal services and collect contact details before a consultation. Qualified inquiries can move toward an initial call with appropriate legal team.",
  },
  {
    title: "Healthcare Practices",
    description:
      "Ai chatbot can answer common questions about services, office details and appointment options. It can collect basic patient inquiry information and support insurance related questions when your workflow permits. Visitors can then move toward an available appointment slot.",
  },
  {
    title: "Real Estate Businesses",
    description:
      "Ai agent can answer questions about property pricing, availability, lease terms and viewing options. It can collect preferences such as property type, budget, location and purchase or rental goals. Suitable prospects can then be directed toward a property tour or agent conversation.",
  },
  {
    title: "Consultancies",
    description:
      "Lead generation ai assistant can ask about company size, business needs, project scope, service requirements and expected timelines. These answers can help consultants understand the opportunity before a discovery call. Qualified prospects can then book time on the relevant consultant's calendar.",
  },
  {
    title: "Agencies",
    description:
      "Chatbot can handle inbound project inquiries and collect details about the requested service. It can ask about target launch dates, project scope, budget, deliverables and business goals. Qualified briefs can then move to appropriate account manager or sales process.",
  },
  {
    title: "Technology Companies",
    description:
      "Ai agent can ask about technical requirements, user numbers, team size, product needs and plan interests. It can also answer common product and pricing questions before collecting contact details. Sales ready accounts can then move to relevant account executive or sales workflow.",
  },
];

export default function IndustriesSection() {
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
              - industries
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            One lead generation chatbot for different business needs.
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            The same ai chatbot for lead generation can support very different sales processes. The questions simply need to match the business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-4 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
