"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiCalendarCheck, BiChat, BiTargetLock } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { FiSend, FiUser } from "react-icons/fi";

export default function SolutionSection() {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const startAnimationLoop = () => {
      setChatStep(0);
      timeouts.push(setTimeout(() => setChatStep(1), 600));
      timeouts.push(setTimeout(() => setChatStep(2), 1600));
      timeouts.push(setTimeout(() => setChatStep(3), 2800));
      timeouts.push(setTimeout(() => setChatStep(4), 4200));
      timeouts.push(setTimeout(() => setChatStep(5), 5200));
      timeouts.push(setTimeout(() => startAnimationLoop(), 10500));
    };

    startAnimationLoop();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] border border-gray-100 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]">
          
          <div className="pointer-events-none absolute right-[-5%] top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 opacity-30 sm:opacity-50">
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <circle cx="200" cy="200" r="60" stroke="#00a8a0" strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="200" cy="200" r="100" stroke="#00a8a0" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.25" />
              <circle cx="200" cy="200" r="140" stroke="#00a8a0" strokeWidth="1" fill="none" opacity="0.2" />
              <circle cx="200" cy="200" r="180" stroke="#00a8a0" strokeWidth="1" strokeDasharray="6 6" fill="none" opacity="0.15" />
            </svg>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#00a8a0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
                  - The Solution
                </span>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
                Meet your new automated listing assistant
              </h2>

              <div className="mt-3 mb-6 h-1 w-14 rounded-full bg-[#00a8a0]" />

              <div className="mb-8 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-xl">
                <p>
                  Go Converto digests your property listings, specs, and FAQs. Then it chats with buyers just like an experienced agent would, giving immediate answers about pricing, amenities, and when they can visit.
                </p>
                <p>
                  Instead of a voicemail and a delayed text back, prospects get the info they need at the exact moment they care the most. Consider this the ideal initial conversation with every website visitor. For AI chatbot real estate agents, Go Converto answers routine questions, gathers essential intake details, and connects serious prospects directly to your team. Go Converto handles background inquiries so you can remain focused on your clients.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-gray-100 pt-6 sm:pt-8 items-start">
                <div className="flex flex-col items-start gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiChat className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 sm:text-sm leading-tight">
                      Instant property
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      answers
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 border-l border-gray-100 pl-3 sm:pl-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiTargetLock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 sm:text-sm leading-tight">
                      Screens serious
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      prospects
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 border-l border-gray-100 pl-3 sm:pl-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiCalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 sm:text-sm leading-tight">
                      Schedules tours
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      automatically
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column Chat Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 lg:ml-auto lg:w-full lg:max-w-[460px]"
            >
              <div className="relative rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.07)] h-[440px] sm:h-[460px] flex flex-col justify-between overflow-hidden">
                <div className="shrink-0 mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                  <Image
                    src="/assets/logo/go-converto-logo-short.png"
                    alt="Go Converto"
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-contain"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                      Go Converto AI Assistant
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end space-y-3.5 overflow-hidden py-1">
                  <AnimatePresence mode="popLayout">
                    {chatStep >= 1 && (
                      <motion.div
                        key="sol-user-1"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start justify-end gap-2.5"
                      >
                        <div className="max-w-[82%] rounded-2xl rounded-tr-xs bg-[#061328] p-3.5 px-4 text-xs sm:text-sm text-white leading-relaxed shadow-2xs">
                          Hi! Is 128 Maple Ave still open for showings?
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs mt-0.5">
                          <FiUser className="h-3.5 w-3.5" />
                        </div>
                      </motion.div>
                    )}

                    {chatStep === 2 && (
                      <motion.div
                        key="sol-typing"
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
                        <div className="flex items-center gap-1.5 rounded-2xl bg-[#eef7f7] p-3.5 px-4 text-xs">
                          <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce" />
                        </div>
                      </motion.div>
                    )}

                    {chatStep >= 3 && (
                      <motion.div
                        key="sol-ai-1"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-3"
                      >
                        <Image
                          src="/assets/logo/go-converto-logo-short.png"
                          alt="Go Converto"
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded-full object-contain"
                        />
                        <div className="max-w-[86%] rounded-2xl rounded-tl-xs bg-[#eef7f7] p-4 text-xs sm:text-sm text-gray-800 leading-relaxed shadow-2xs">
                          When are you hoping to move, and do you already have your financing pre-approved?
                        </div>
                      </motion.div>
                    )}

                    {chatStep >= 4 && (
                      <motion.div
                        key="sol-user-2"
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start justify-end gap-2.5"
                      >
                        <div className="max-w-[82%] rounded-2xl rounded-tr-xs bg-[#061328] p-3.5 px-4 text-xs sm:text-sm text-white leading-relaxed shadow-2xs">
                          Hoping to be in a new place within two months, and yes, I&apos;ve got the pre-approval letter.
                        </div>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs mt-0.5">
                          <FiUser className="h-3.5 w-3.5" />
                        </div>
                      </motion.div>
                    )}

                    {chatStep >= 5 && (
                      <motion.div
                        key="sol-badge"
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="pt-0.5"
                      >
                        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-2xs">
                          <BsCheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Highly qualified lead | Transferred to agent</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="shrink-0 mt-4 flex items-center justify-between rounded-full border border-gray-200/90 bg-white p-1.5 pl-5 shadow-2xs">
                  <span className="text-xs sm:text-sm text-gray-400 font-normal">
                    Type a message...
                  </span>
                  <button
                    aria-label="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a8a0] text-white shadow-sm transition-transform hover:scale-105"
                  >
                    <FiSend className="h-4 w-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
