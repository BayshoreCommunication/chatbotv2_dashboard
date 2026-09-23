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

      // Step 1: AI Greeting Message appears (0.4s)
      timeouts.push(setTimeout(() => setChatStep(1), 400));

      // Step 2: User Message pops up (1.8s)
      timeouts.push(setTimeout(() => setChatStep(2), 1800));

      // Step 3: AI Typing Indicator appears (3.2s)
      timeouts.push(setTimeout(() => setChatStep(3), 3200));

      // Step 4: AI Response pops up (4.4s)
      timeouts.push(setTimeout(() => setChatStep(4), 4400));

      // Step 5: User Phone pops up (6.0s)
      timeouts.push(setTimeout(() => setChatStep(5), 6000));

      // Step 6: Intake Success Badge appears (7.2s)
      timeouts.push(setTimeout(() => setChatStep(6), 7200));

      // Step 7: Hold for 4.5s then RESTART LOOP INFINITELY (12.0s)
      timeouts.push(setTimeout(() => startInfiniteChatCycle(), 12000));
    };

    startInfiniteChatCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* BACKGROUND ACCENTS (Wavy contour lines bottom right & soft glow) */}
      {/* ========================================================================= */}
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
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Main Headline & CTA Buttons */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            {/* Top Speech Bubble Circle Icon */}
            <div className="w-14 h-14 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] mb-6 shadow-xs">
              <svg className="w-7 h-7 text-[#00a8a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                <circle cx="12" cy="10" r="0.75" fill="currentColor" />
                <circle cx="15" cy="10" r="0.75" fill="currentColor" />
              </svg>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.12]">
              What happens when your next potential client visits after hours?
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-lg font-normal leading-relaxed">
              Give them a place to start. Go Converto can answer initial questions, collect basic intake information, screen for practice area fit and guide qualified visitors toward the next step.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/start-free-trial"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a8a0] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#00968f] hover:shadow-lg"
              >
                <span>Start free trial today.</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-lg border-t border-slate-200/80 pt-4">
              <strong className="font-bold text-slate-700">Go Converto</strong> helps law firms handle the first stage of website intake with an AI assistant built around the firm&apos;s own content and screening process. 24/7 assistance.
            </p>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Chat Mockup Card with Infinite Animation & Background Shapes */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            {/* Background Soft Circle Backdrop */}
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] rounded-full bg-[#e8f6f5] -z-10" />

            {/* Top Right Decorative Arrow & Dot Grid */}
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

            {/* Chat Mockup Container (Fixed Dimensions) */}
            <div className="relative z-10 rounded-3xl bg-white p-6 shadow-2xl border border-slate-100/90 w-full max-w-[390px] h-[380px] sm:h-[400px] flex flex-col justify-between overflow-hidden">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00a8a0] text-white flex items-center justify-center shadow-xs shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <circle cx="9" cy="10" r="0.75" fill="currentColor" />
                      <circle cx="12" cy="10" r="0.75" fill="currentColor" />
                      <circle cx="15" cy="10" r="0.75" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-900 text-base">Go Converto</span>
                </div>
                {/* 3 Dots Options */}
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* Infinite Animated Messages Stream */}
              <div className="flex-1 flex flex-col justify-end space-y-3 py-3 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  
                  {/* Step 1: AI Greeting Message */}
                  {chatStep >= 1 && (
                    <motion.div
                      key="cta-msg-1"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#f4f4f5] p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        Hi! I&apos;m Go Converto. <br />
                        How can we help you today?
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: User Message */}
                  {chatStep >= 2 && (
                    <motion.div
                      key="cta-msg-2"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#00a8a0] p-3.5 text-xs sm:text-sm text-white leading-relaxed font-medium shadow-xs">
                        I was in a car accident last week.
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: AI Typing Dots */}
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

                  {/* Step 4: AI Follow-up Message */}
                  {chatStep >= 4 && (
                    <motion.div
                      key="cta-msg-3"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#f4f4f5] p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        I can connect you with an attorney right away. What&apos;s your phone number?
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: User Phone Response */}
                  {chatStep >= 5 && (
                    <motion.div
                      key="cta-msg-4"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-2xl bg-[#00a8a0] p-3 text-xs sm:text-sm text-white font-medium shadow-xs">
                        555-0199
                      </div>
                    </motion.div>
                  )}

                  {/* Step 6: Case Captured Tag */}
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
                      <span>Case details captured · Consultation scheduled</span>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Card Footer Input Dots */}
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
