"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BiCalendarEvent,
  BiChat,
  BiFullscreen,
  BiPause,
  BiTargetLock,
  BiVolumeFull,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export default function SeeItInActionSection() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [videoStep, setVideoStep] = useState(0);

  useEffect(() => {
    const durationMs = 12000;
    const updateIntervalMs = 80;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        const next = prev + (100 / (durationMs / updateIntervalMs));
        return next >= 100 ? 0 : next;
      });
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentSec = Math.floor((progressPercent / 100) * 49);
    setSeconds(currentSec);

    if (progressPercent < 15) setVideoStep(0);
    else if (progressPercent < 45) setVideoStep(1);
    else if (progressPercent < 75) setVideoStep(2);
    else setVideoStep(3);
  }, [progressPercent]);

  return (
    <section className="relative py-6 lg:py-8 bg-white">
      <div className="pointer-events-none absolute right-4 top-1/2 -z-10 hidden h-64 w-48 -translate-y-1/2 grid-cols-6 gap-3 text-gray-200 lg:grid">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#00a8a0]/20" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column Video Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#07172b] via-[#0b223d] to-[#040e1b] border border-gray-800/80 shadow-2xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full p-5 sm:p-8 flex items-center justify-between overflow-hidden">
                  <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#00a8a0]/10 blur-3xl" />

                  <div className="absolute left-6 top-6 z-20 flex items-center gap-2.5">
                    <Image
                      src="/assets/logo/go-converto-logo-white.png"
                      alt="Go Converto"
                      width={140}
                      height={32}
                      className="h-6 w-auto"
                    />
                  </div>

                  <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PLAYING DEMO</span>
                  </div>

                  <div className="z-20 max-w-[45%]">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      Watch a live <br />
                      <span className="text-[#00a8a0]">property inquiry</span> <br />
                      get resolved
                    </h3>
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00a8a0]/20 border border-[#00a8a0]/40 backdrop-blur-xs text-white shadow-xl sm:h-20 sm:w-20 pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00a8a0] text-white shadow-lg sm:h-14 sm:w-14">
                      <BiPause className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  <div className="absolute -right-4 top-1/2 z-10 w-[280px] sm:w-[320px] -translate-y-1/2 scale-[0.85] sm:scale-95 origin-right rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl min-h-[300px] flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-1.5 border-b border-gray-100 pb-2 text-[10px] text-gray-500 font-mono">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>live on 128mapleave.com</span>
                      </div>

                      <div className="space-y-2.5 text-[11px]">
                        <AnimatePresence mode="popLayout">
                          {videoStep >= 1 && (
                            <motion.div
                              key="vid-msg-1"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-end"
                            >
                              <div className="max-w-[88%] rounded-xl bg-[#f5f3ee] p-2.5 text-gray-800 shadow-2xs">
                                Hoping to be in a new place within two months, and yes, I&apos;ve got pre-approval.
                              </div>
                            </motion.div>
                          )}

                          {videoStep >= 2 && (
                            <motion.div
                              key="vid-msg-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-start gap-2"
                            >
                              <Image
                                src="/assets/logo/go-converto-logo-short.png"
                                alt="Go Converto"
                                width={24}
                                height={24}
                                className="h-6 w-6 shrink-0 rounded-full object-contain"
                              />
                              <div className="max-w-[88%] rounded-xl bg-[#edf5ff] p-2.5 text-gray-800 shadow-2xs">
                                Perfect! Let&apos;s get a showing scheduled for Saturday afternoon.
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      <span>✓ Showing booked on agent calendar</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-800/60 bg-[#050f1d] px-4 py-3 text-xs text-gray-300 z-20 relative">
                  <div className="flex items-center gap-3">
                    <button className="text-[#00a8a0]">
                      <BiPause className="h-5 w-5" />
                    </button>
                    <span className="font-mono text-[11px] text-gray-300">
                      0:{seconds < 10 ? `0${seconds}` : seconds} / 0:44
                    </span>
                  </div>

                  <div className="relative mx-4 flex-1">
                    <div className="h-1 w-full rounded-full bg-gray-800">
                      <div
                        className="relative h-full rounded-full bg-[#00a8a0] transition-all duration-75"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#00a8a0] shadow-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400">
                    <button className="text-[#00a8a0]">
                      <BiVolumeFull className="h-4 w-4" />
                    </button>
                    <button>
                      <FiSettings className="h-3.5 w-3.5" />
                    </button>
                    <button>
                      <BiFullscreen className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-5 bg-[#00a8a0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
                  - See It in Action
                </span>
              </div>

              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] leading-snug">
                Watch a casual browser turn into a confirmed appointment
              </h2>

              <p className="mb-8 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                This is raw, unedited footage of Go Converto fielding a real buyer&apos;s questions from their very first message straight through to locking in a tour.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiChat className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Delivers accurate answers to home-specific questions.
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiTargetLock className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Checks the buyer&apos;s purchasing timeline and intent.
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0]">
                    <BiCalendarEvent className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Wraps up by putting an appointment on your calendar.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
