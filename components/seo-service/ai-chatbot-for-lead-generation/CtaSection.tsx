"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CtaSection() {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const startInfiniteChatCycle = () => {
      setChatStep(0);
      timeouts.push(setTimeout(() => setChatStep(1), 400));
      timeouts.push(setTimeout(() => setChatStep(2), 1800));
      timeouts.push(setTimeout(() => setChatStep(3), 3200));
      timeouts.push(setTimeout(() => setChatStep(4), 4400));
      timeouts.push(setTimeout(() => setChatStep(5), 6000));
      timeouts.push(setTimeout(() => setChatStep(6), 7200));
      timeouts.push(setTimeout(() => startInfiniteChatCycle(), 12000));
    };

    startInfiniteChatCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      {/* Background Accents */}
      <div className="pointer-events-none absolute right-0 bottom-0 w-full max-w-2xl h-80 opacity-25 -z-10">
        <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" stroke="#00a8a0" strokeWidth="1.2">
          <path d="M0 220 C 150 260, 350 80, 600 140" />
          <path d="M0 190 C 150 230, 350 50, 600 110" />
          <path d="M0 160 C 150 200, 350 20, 600 80" />
          <path d="M0 130 C 150 170, 350 -10, 600 50" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            <div className="w-14 h-14 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] mb-6 shadow-xs">
              <svg className="w-7 h-7 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                <circle cx="12" cy="10" r="0.75" fill="currentColor" />
                <circle cx="15" cy="10" r="0.75" fill="currentColor" />
              </svg>
            </div>

            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.12]">
              Turn website traffic into qualified leads & booked calls without manual forms.
            </h2>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-lg font-normal leading-relaxed">
              Go Converto starts the conversation, answers questions using your business information, asks qualification questions and collects contact details once the visitor is ready to move forward.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/start-free-trial"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a8a0] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#00968f] hover:shadow-lg"
              >
                <span>Start 14-day free trial</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <p className="mt-8 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-lg border-t border-slate-200/80 pt-4">
              <strong className="font-bold text-slate-700">Go Converto</strong> helps businesses capture, screen and qualify website leads 24/7 with an AI assistant built around your own content and sales process.
            </p>
          </motion.div>

          {/* Right Column Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] rounded-full bg-[#e8f6f5] -z-10" />

            <div className="pointer-events-none absolute -top-10 right-4 -z-10 hidden sm:flex items-start gap-3">
              <svg className="w-16 h-12 text-[#00a8a0]" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 35 C 15 35, 35 25, 45 8" />
                <path d="M36 6 L 46 7 L 44 17" strokeLinejoin="round" />
              </svg>
              <div className="grid grid-cols-5 gap-2 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#00a8a0]" />
                ))}
              </div>
            </div>

            <div className="relative z-10 rounded-3xl bg-white p-6 shadow-2xl border border-slate-100/90 w-full max-w-[390px] h-[380px] sm:h-[400px] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00a8a0] text-white flex items-center justify-center shadow-xs shrink-0 font-bold text-xs">
                    AI
                  </div>
                  <span className="font-bold text-slate-900 text-base">Go Converto</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end space-y-3 py-3 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {chatStep >= 1 && (
                    <motion.div
                      key="cta-msg-1"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#f4f4f5] p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        Hi! How can we help your business today?
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 2 && (
                    <motion.div
                      key="cta-msg-2"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#00a8a0] p-3.5 text-xs sm:text-sm text-white leading-relaxed font-medium shadow-xs">
                        We need help with lead qualification.
                      </div>
                    </motion.div>
                  )}

                  {chatStep === 3 && (
                    <motion.div
                      key="cta-typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-1.5 rounded-2xl bg-[#f4f4f5] px-4 py-3 text-xs">
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce" />
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 4 && (
                    <motion.div
                      key="cta-msg-3"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#f4f4f5] p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        We can automate those rules for you. What is your email?
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 5 && (
                    <motion.div
                      key="cta-msg-4"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-2xl bg-[#00a8a0] p-3 text-xs sm:text-sm text-white font-medium shadow-xs">
                        team@company.com
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 6 && (
                    <motion.div
                      key="cta-captured"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 mt-1"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                        ✓
                      </span>
                      <span>Lead details captured · Consultation scheduled</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="shrink-0 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full text-slate-400 font-mono text-[11px]">
                  <span>...</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">24/7 AI Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
