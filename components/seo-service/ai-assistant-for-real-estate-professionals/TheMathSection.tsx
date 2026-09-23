"use client";

import { motion } from "framer-motion";

const mathStats = [
  {
    value: "2 seconds",
    label: "Average response time",
    description: "Instead of waiting hours for a callback.",
  },
  {
    value: "24/7",
    label: "Total coverage",
    description: "Including late nights and Sunday afternoons.",
  },
  {
    value: "0 missed",
    label: "No lost opportunities",
    description: "No more missed leads while you're driving or in meetings.",
  },
  {
    value: "Hours saved",
    label: "Time reclaimed",
    description: "Weekly time you get back by avoiding unready buyers.",
  },
];

export default function TheMathSection() {
  return (
    <section className="relative bg-[#061328] py-12 lg:py-16 text-white overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a8a0]/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - The Math
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            What instant responses actually do for your business
          </h2>
        </motion.div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mathStats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 text-center backdrop-blur-sm hover:border-[#00a8a0]/40 transition-all"
            >
              <div className="text-3xl font-black text-[#00a8a0] sm:text-4xl lg:text-5xl mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mb-1 sm:text-base">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400 leading-relaxed sm:text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
