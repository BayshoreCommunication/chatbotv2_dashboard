"use client";

import { motion } from "framer-motion";

const caseStudies = [
  {
    category: "E-commerce",
    stat: "-46%",
    description: "Reduction in inquiries reaching human agents within the first two months.",
    author: "Fitly · 60 days post-launch",
  },
  {
    category: "Home Maintenance",
    stat: "92%",
    description: "Routine scheduling and service inquiries resolved without employee intervention.",
    author: "Aire Serv · 90 days post-launch",
  },
  {
    category: "Wellness",
    stat: "4.8/5",
    description: "Average customer satisfaction rating on fully automated interactions.",
    author: "Elite Spa · 45 days post-launch",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Case Studies
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Results Across Different Industries
          </h2>
        </motion.div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={cs.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-[#00a8a0]/40 transition-all"
            >
              <div>
                <span className="block mb-3 text-xs font-bold uppercase tracking-wider text-[#00a8a0]">
                  {cs.category}
                </span>

                <div className="text-4xl font-black text-gray-900 sm:text-5xl mb-3 tracking-tight">
                  {cs.stat}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {cs.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 text-xs font-semibold text-gray-400">
                {cs.author}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
