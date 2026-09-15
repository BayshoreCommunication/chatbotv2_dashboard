"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowRight, BsPlayCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function LawFirmHero() {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const startAnimationCycle = () => {
      setChatStep(0);

      // Step 1: User Message 1 pops up
      timeouts.push(setTimeout(() => setChatStep(1), 600));

      // Step 2: AI Typing indicator 1 appears
      timeouts.push(setTimeout(() => setChatStep(2), 1600));

      // Step 3: AI Message 1 pops up
      timeouts.push(setTimeout(() => setChatStep(3), 2800));

      // Step 4: User Message 2 pops up
      timeouts.push(setTimeout(() => setChatStep(4), 4400));

      // Step 5: AI Typing indicator 2 appears
      timeouts.push(setTimeout(() => setChatStep(5), 5400));

      // Step 6: AI Message 2 pops up
      timeouts.push(setTimeout(() => setChatStep(6), 6600));

      // Step 7: Intake Captured Success Tag pops up
      timeouts.push(setTimeout(() => setChatStep(7), 7600));

      // Step 8: Hold full conversation for 5.5s then restart loop
      timeouts.push(setTimeout(() => startAnimationCycle(), 13000));
    };

    startAnimationCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-14">
      {/* Background Soft Primary Glow */}
      <div className="pointer-events-none absolute right-[-5%] top-1/2 -z-10 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Main Message & CTA */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            {/* Top Subtitle / Kicker */}
            <div className="mb-6 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                AI Chatbot for Law Firm Websites
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] leading-snug sm:leading-tight lg:leading-[1.12]">
              Every new inquiry, <br />
              answered and <br />
              screened{" "}
              <span className="text-primary">
                before intake <br />
                ever picks up the <br />
                phone.
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
              Go Converto engages new legal inquiries the moment they land on
              your site, collects the case details your intake team needs,
              screens by practice area, and books consultations — 24/7, without
              a missed call.
            </p>

            {/* Action Buttons */}
            <div className="mb-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/start-free-trial"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
              >
                Start free trial
                <BsArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#demo"
                className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-400"
              >
                <BsPlayCircle className="h-4 w-4 text-gray-800" />
                Watch demo
              </Link>
            </div>

            {/* Rating / Social Proof */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <span className="font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-300">·</span>
              <span>trusted by law firms nationwide</span>
              <span className="text-gray-300">·</span>
              <span>14-day free trial</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Live Chat Card Mockup with Animated Infinite Chat */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-6 lg:ml-auto lg:w-full lg:max-w-[430px]"
          >
            {/* Background Soft Pale Cyan Shape / Shadow Container */}
            <div className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-10 rounded-[40px] bg-primary/10 transition-all sm:rotate-1" />

            {/* Background Decorative Dot Grid */}
            <div className="pointer-events-none absolute -right-6 top-8 -z-10 hidden grid-cols-6 gap-2.5 sm:grid">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/40" />
              ))}
            </div>

            {/* Main Mockup Card Container (Fixed Height) */}
            <div className="relative z-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-teal-900/10 sm:p-6 h-[470px] sm:h-[490px] flex flex-col justify-between overflow-hidden">
              
              {/* Header Status Bar */}
              <div className="shrink-0 mb-3 flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>live on cartermclaw.com</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                  AI Assistant Active
                </span>
              </div>

              {/* Animated Chat Messages Sequence (Flex-1 & Bottom Aligned) */}
              <div className="flex-1 flex flex-col justify-end space-y-3.5 overflow-hidden py-1">
                <AnimatePresence mode="popLayout">
                    
                    {/* Message 1: User */}
                    {chatStep >= 1 && (
                      <motion.div
                        key="msg-1"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[85%] rounded-2xl bg-[#f5f3ee] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                          I was in a car accident last week and the other driver&apos;s
                          insurance is denying the claim. Can you help?
                        </div>
                      </motion.div>
                    )}

                    {/* AI Typing Indicator 1 */}
                    {chatStep === 2 && (
                      <motion.div
                        key="typing-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src="/assets/logo/go-converto-logo-short.png"
                          alt="Go Converto"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full object-contain"
                        />
                        <div className="flex items-center gap-1.5 rounded-2xl bg-[#edf5ff] p-3.5 px-4 text-xs">
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                        </div>
                      </motion.div>
                    )}

                    {/* Message 2: AI Assistant */}
                    {chatStep >= 3 && (
                      <motion.div
                        key="msg-2"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <Image
                          src="/assets/logo/go-converto-logo-short.png"
                          alt="Go Converto"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full object-contain"
                        />
                        <div className="max-w-[85%] rounded-2xl bg-[#edf5ff] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                          I&apos;m sorry to hear that — this is exactly what our
                          personal injury team handles. Can I get a few quick
                          details: when did the accident happen, and were you injured?
                        </div>
                      </motion.div>
                    )}

                    {/* Message 3: User */}
                    {chatStep >= 4 && (
                      <motion.div
                        key="msg-3"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[80%] rounded-2xl bg-[#f5f3ee] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                          Yes, minor whiplash. It happened last Tuesday.
                        </div>
                      </motion.div>
                    )}

                    {/* AI Typing Indicator 2 */}
                    {chatStep === 5 && (
                      <motion.div
                        key="typing-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src="/assets/logo/go-converto-logo-short.png"
                          alt="Go Converto"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full object-contain"
                        />
                        <div className="flex items-center gap-1.5 rounded-2xl bg-[#edf5ff] p-3.5 px-4 text-xs">
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                        </div>
                      </motion.div>
                    )}

                    {/* Message 4: AI Assistant */}
                    {chatStep >= 6 && (
                      <motion.div
                        key="msg-4"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <Image
                          src="/assets/logo/go-converto-logo-short.png"
                          alt="Go Converto"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full object-contain"
                        />
                        <div className="max-w-[85%] rounded-2xl bg-[#edf5ff] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                          Got it. I can get you a free consultation with an attorney
                          this week — what&apos;s the best number to reach you?
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              {/* Bottom Tag: Intake Captured (Fixed) */}
              <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  ✓
                </span>
                <span>Case intake captured · routed to PI team</span>
              </div>

            </div>

            {/* Handwritten Annotation below Card */}
            <div className="mt-4 flex items-center justify-start gap-2 pl-4">
              <svg
                className="h-7 w-10 text-primary shrink-0"
                viewBox="0 0 50 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 25 C 15 5, 35 5, 45 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M40 10 L46 16 L40 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className={`${caveat.className} text-xl font-semibold leading-tight text-primary`}>
                Real intake conversation, <br />
                start to finish
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
