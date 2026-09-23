"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function CtaSection() {
  return (
    <section className="relative bg-[#061328] py-16 lg:py-24 text-white overflow-hidden">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a8a0]/20 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00a8a0]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00a8a0]">
            Get Started Today
          </div>

          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[50px] leading-tight">
            Stop losing great buyers to the next listing
          </h2>

          <p className="mb-8 text-base text-gray-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Start your 14-day free trial today and watch Go Converto put your first showing on the calendar.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start-free-trial"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a8a0] px-8 py-4 text-base font-bold text-white shadow-lg shadow-teal-900/30 transition-all hover:bg-[#00968f] hover:scale-105"
            >
              Start free trial
              <BsArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/80 px-8 py-4 text-base font-semibold text-white shadow-sm backdrop-blur-xs transition-all hover:bg-gray-800 hover:border-gray-600"
            >
              Talk to sales
            </Link>
          </div>

          <div className="border-t border-gray-800/80 pt-8 max-w-xl mx-auto text-xs text-gray-400 leading-relaxed font-mono">
            <span className="font-bold text-white">Go Converto</span> - The platform that learns your properties instantly and turns casual browsers into real clients, around the clock.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
