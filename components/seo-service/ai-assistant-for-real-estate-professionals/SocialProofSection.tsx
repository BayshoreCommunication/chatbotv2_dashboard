"use client";

import { motion } from "framer-motion";

export default function SocialProofSection() {
  return (
    <section className="relative bg-slate-900 py-16 sm:py-20 text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00a8a0]/10 rounded-full blur-3xl pointer-events-none" />

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
              - Social Proof
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            The professionals using Go Converto to drive volume
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Testimonial Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-800/50 p-8 sm:p-10 backdrop-blur-sm relative"
          >
            <div className="text-[#00a8a0] text-5xl font-serif mb-4">“</div>
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic mb-6">
              "I used to lose people all the time because I couldn't text back while I was touring homes. Now, every single question gets handled instantly, and my phone only rings when a buyer is actually pre-approved and ready to go."
            </p>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">
                Rachel Tanaka
              </div>
              <div className="text-sm text-[#00a8a0]">
                Realtor, Prestige Realty Group
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-800/40 p-8 hover:border-[#00a8a0]/40 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-black text-[#00a8a0] mb-2 tracking-tight">
                3.2×
              </div>
              <div className="text-base text-slate-300 font-medium">
                more tour requests over 60 days
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-800/40 p-8 hover:border-[#00a8a0]/40 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-black text-[#00a8a0] mb-2 tracking-tight">
                10 hours
              </div>
              <div className="text-base text-slate-300 font-medium">
                saved every week avoiding dead-end leads
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
