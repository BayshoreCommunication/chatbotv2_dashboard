"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BiCalendarEvent,
  BiChat,
  BiFullscreen,
  BiPause,
  BiPlay,
  BiTargetLock,
  BiVolumeFull,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export default function SeeItInActionSection() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [videoStep, setVideoStep] = useState(0);

  // Infinite Video Playback & Progress Loop Animation
  useEffect(() => {
    const durationMs = 12000; // 12 seconds per full video loop
    const updateIntervalMs = 80;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        const next = prev + (100 / (durationMs / updateIntervalMs));
        return next >= 100 ? 0 : next;
      });
    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, []);

  // Synchronize timecode seconds & message sequence with progress bar
  useEffect(() => {
    const currentSec = Math.floor((progressPercent / 100) * 49);
    setSeconds(currentSec);

    if (progressPercent < 6) {
      setVideoStep(0);
    } else if (progressPercent < 20) {
      setVideoStep(1);
    } else if (progressPercent < 32) {
      setVideoStep(2);
    } else if (progressPercent < 48) {
      setVideoStep(3);
    } else if (progressPercent < 62) {
      setVideoStep(4);
    } else if (progressPercent < 75) {
      setVideoStep(5);
    } else if (progressPercent < 88) {
      setVideoStep(6);
    } else {
      setVideoStep(7);
    }
  }, [progressPercent]);

  return (
    <section className="relative py-6 lg:py-8 bg-white">
      {/* Background Soft Dot Grid Decoration */}
      <div className="pointer-events-none absolute right-4 top-1/2 -z-10 hidden h-64 w-48 -translate-y-1/2 grid-cols-6 gap-3 text-gray-200 lg:grid">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Floating Outer Card with Perfect Shadow */}
        <div className="relative rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: Animated Video Player Mockup */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#07172b] via-[#0b223d] to-[#040e1b] border border-gray-800/80 shadow-2xl">
                
                {/* Main Player Display Area */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full p-5 sm:p-8 flex items-center justify-between overflow-hidden">
                  
                  {/* Background Soft Gradient Glow inside Video */}
                  <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                  {/* Top Left Branding */}
                  <div className="absolute left-6 top-6 z-20 flex items-center gap-2.5">
                    <Image
                      src="/assets/logo/go-converto-logo-white.png"
                      alt="Go Converto"
                      width={140}
                      height={32}
                      className="h-6 w-auto"
                    />
                  </div>

                  {/* Top Right Live Recording Indicator Badge */}
                  <div className="absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PLAYING DEMO</span>
                  </div>

                  {/* Left Overlay Text */}
                  <div className="z-20 max-w-[45%]">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      Real intake <br />
                      <span className="text-primary">conversation,</span> <br />
                      start to finish
                    </h3>
                  </div>

                  {/* Center Animated Play Ring Overlay */}
                  <div className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/20 border border-primary/40 backdrop-blur-xs text-white shadow-xl sm:h-20 sm:w-20 pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg sm:h-14 sm:w-14">
                      <BiPause className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  {/* Right Side Synchronized Chat Mockup Overlay inside Video */}
                  <div className="absolute -right-4 top-1/2 z-10 w-[280px] sm:w-[320px] -translate-y-1/2 scale-[0.85] sm:scale-95 origin-right rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl min-h-[300px] flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center gap-1.5 border-b border-gray-100 pb-2 text-[10px] text-gray-500 font-mono">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>live on cartermclaw.com</span>
                      </div>

                      <div className="space-y-2.5 text-[11px]">
                        <AnimatePresence mode="popLayout">
                          
                          {/* User Message 1 */}
                          {videoStep >= 1 && (
                            <motion.div
                              key="vid-msg-1"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex justify-end"
                            >
                              <div className="max-w-[88%] rounded-xl bg-[#f5f3ee] p-2.5 text-gray-800 shadow-2xs">
                                I was in a car accident last week and the other driver&apos;s insurance is denying the claim. Can you help?
                              </div>
                            </motion.div>
                          )}

                          {/* AI Typing Indicator */}
                          {videoStep === 2 && (
                            <motion.div
                              key="vid-typing"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2"
                            >
                              <Image
                                src="/assets/logo/go-converto-logo-short.png"
                                alt="Go Converto"
                                width={24}
                                height={24}
                                className="h-6 w-6 shrink-0 rounded-full object-contain"
                              />
                              <div className="flex items-center gap-1 rounded-xl bg-[#edf5ff] p-2 px-3 text-[10px]">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                              </div>
                            </motion.div>
                          )}

                          {/* AI Message 1 */}
                          {videoStep >= 3 && (
                            <motion.div
                              key="vid-msg-2"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3 }}
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
                                I&apos;m sorry to hear that — this is exactly what our personal injury team handles. Can I get a few quick details?
                              </div>
                            </motion.div>
                          )}

                          {/* User Message 2 */}
                          {videoStep >= 4 && (
                            <motion.div
                              key="vid-msg-3"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className="flex justify-end"
                            >
                              <div className="max-w-[80%] rounded-xl bg-[#f5f3ee] p-2 text-gray-800 shadow-2xs">
                                Yes, minor whiplash. It happened last Tuesday.
                              </div>
                            </motion.div>
                          )}

                          {/* AI Message 2 */}
                          {videoStep >= 6 && (
                            <motion.div
                              key="vid-msg-4"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3 }}
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
                                Got it. I can get you a free consultation with an attorney this week.
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Bottom Tag: Case Intake Captured */}
                    <div className="mt-3 flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      <span>✓ Case intake captured · routed to PI team</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Animated Video Controls Bar */}
                <div className="flex items-center justify-between border-t border-gray-800/60 bg-[#050f1d] px-4 py-3 text-xs text-gray-300 z-20 relative">
                  <div className="flex items-center gap-3">
                    <button className="text-primary hover:text-white transition-colors">
                      <BiPause className="h-5 w-5" />
                    </button>
                    <span className="font-mono text-[11px] text-gray-300">
                      0:{seconds < 10 ? `0${seconds}` : seconds} / 0:49
                    </span>
                  </div>

                  {/* Dynamic Animated Progress Bar */}
                  <div className="relative mx-4 flex-1">
                    <div className="h-1 w-full rounded-full bg-gray-800">
                      <div
                        className="relative h-full rounded-full bg-primary transition-all duration-75"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-sm shadow-primary/80" />
                      </div>
                    </div>
                  </div>

                  {/* Controls Right */}
                  <div className="flex items-center gap-3 text-gray-400">
                    <button className="hover:text-white transition-colors text-primary">
                      <BiVolumeFull className="h-4 w-4" />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <FiSettings className="h-3.5 w-3.5" />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <BiFullscreen className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: Feature Text & List */}
            {/* ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              {/* Kicker Badge */}
              <div className="mb-4 flex items-center gap-2">
                <span className="h-0.5 w-5 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                  SEE IT IN ACTION
                </span>
              </div>

              {/* Headline */}
              <h2 className="mb-5 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] leading-snug sm:leading-tight lg:leading-[1.18]">
                Watch a visitor become <br />
                a screened, booked <br />
                consultation
              </h2>

              {/* Subtext */}
              <p className="mb-8 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                An unedited recording of Go Converto handling a real personal
                injury inquiry — from first message to a booked consultation.
              </p>

              {/* Feature Points List */}
              <div className="space-y-4">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BiChat className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Asks the actual intake questions your team uses
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BiTargetLock className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Screens by practice area automatically
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BiCalendarEvent className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 sm:text-base">
                    Ends with a consultation on the calendar
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
