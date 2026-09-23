"use client";

import { motion } from "framer-motion";

export default function SolutionSection() {
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
              - the solution
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Meet AI Chatbot for Lead Generation
          </h2>

          <p className="mt-4 mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Go Converto turns your website content into a chatbot capable of answering visitor questions and collecting lead information through conversation. The assistant can use your services, FAQs, pricing information and other approved website content as its source for responses. Instead of asking every visitor to fill out a form, it can start with a simple question and continue based on the visitor&apos;s answer.
          </p>
        </motion.div>

        {/* Chat Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a8a0] text-white font-bold text-sm">
                AI
              </div>
              <span className="font-bold text-slate-900 text-base">Go Converto Assistant</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Active Session
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-slate-100 p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                What are you looking for help with?
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[#00a8a0] p-3.5 text-xs sm:text-sm text-white leading-relaxed font-medium">
                We actually need a marketing strategy for our new product.
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-slate-100 p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                What stage is the product at and when are you hoping to start?
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[#00a8a0] p-3.5 text-xs sm:text-sm text-white leading-relaxed font-medium">
                We are launching next month and want to start this week.
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-slate-100 p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                Thanks. I can collect your details and help arrange a consultation. What email should we use? Also let me know your availability time.
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[#00a8a0] p-3.5 text-xs sm:text-sm text-white leading-relaxed font-medium">
                xyz@abc.com. And I&apos;m free next thursday, after 5pm.
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-semibold text-emerald-800 mt-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                ✓
              </span>
              <span>Lead captured · Consultation request ready for follow up</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
