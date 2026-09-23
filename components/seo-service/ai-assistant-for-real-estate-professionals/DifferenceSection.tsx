"use client";

import { motion } from "framer-motion";

const comparisonRows = [
  {
    before: "A prospect texts during your showing and you can't reply.",
    after: "Buyers get an accurate response in under two seconds, anytime.",
  },
  {
    before: "Web contact forms get half-filled and abandoned.",
    after: "The assistant verifies financing and timelines through a simple chat.",
  },
  {
    before: "You call back the next morning, but they already booked a tour with someone else.",
    after: "The showing is locked in instantly, exactly when they are most interested.",
  },
  {
    before: "You waste the scheduled day showing houses to people who can't get a mortgage.",
    after: "You only follow up with leads who are flagged as genuinely ready to move.",
  },
];

export default function DifferenceSection() {
  return (
    <section className="relative bg-gray-50/70 py-8 lg:py-12 overflow-hidden border-y border-gray-100">
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
              - The Difference
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            How your day changes when you add Go Converto
          </h2>
        </motion.div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Before Go Converto Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-rose-100 bg-rose-50/40 p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-rose-200/60 pb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                ✕
              </span>
              <h3 className="text-lg font-bold text-rose-950 sm:text-xl">
                Before Go Converto
              </h3>
            </div>

            <ul className="space-y-4">
              {comparisonRows.map((row, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-rose-900/80 leading-relaxed">
                  <span className="text-rose-500 mt-0.5 shrink-0">✕</span>
                  <span>{row.before}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After Go Converto Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-emerald-200/60 pb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold">
                ✓
              </span>
              <h3 className="text-lg font-bold text-emerald-950 sm:text-xl">
                After Go Converto
              </h3>
            </div>

            <ul className="space-y-4">
              {comparisonRows.map((row, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">✓</span>
                  <span>{row.after}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
