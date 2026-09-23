"use client";

import { motion } from "framer-motion";
import { BiCalendarCheck, BiChat, BiTargetLock } from "react-icons/bi";
import { BsCheck, BsLightningCharge, BsX } from "react-icons/bs";
import { FiFrown, FiSmile } from "react-icons/fi";

const beforeItems = [
  "A visitor arrives after office hours.",
  "They see a contact form.",
  "They start entering information.",
  "They have a question but cannot get an answer.",
  "They leave the page.",
  "Your team discovers the missed opportunity the next morning.",
];

const afterItems = [
  {
    icon: BsLightningCharge,
    boldText: "A visitor arrives after office hours.",
    lightText: "",
  },
  {
    icon: BiChat,
    boldText: "AI assistant opens a conversation.",
    lightText: "",
  },
  {
    icon: BiChat,
    boldText: "The visitor explains the legal issue.",
    lightText: "",
  },
  {
    icon: BiTargetLock,
    boldText: "AI assistant asks approved screening questions.",
    lightText: "",
  },
  {
    icon: BiTargetLock,
    boldText: "Basic contact and case information are collected.",
    lightText: "",
  },
  {
    icon: BiCalendarCheck,
    boldText: "The visitor can request a consultation or receive the next available instruction.",
    lightText: "",
  },
  {
    icon: BiCalendarCheck,
    boldText: "Your team can review the conversation later.",
    lightText: "",
  },
];

export default function DifferenceSection() {
  return (
    <section className="relative bg-white py-8 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-18 text-center"
        >
          {/* Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
              - Before and after
            </span>
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
          </div>

          {/* Headline */}
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-tight max-w-3xl mx-auto">
            What changes when you add Go Converto?
          </h2>

          {/* Subtitle Description */}
          <div className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg font-normal space-y-1">
            <p>See the difference between a form and an active intake conversation.</p>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* BEFORE & AFTER COMPARISON CARDS WITH VS BADGE */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-5xl">
          
          {/* Center VS Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white font-extrabold text-xs text-gray-500 shadow-md">
            VS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
            
            {/* ===================================================================== */}
            {/* LEFT CARD: BEFORE */}
            {/* ===================================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 sm:p-9 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.04)]"
            >
              {/* Card Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 border border-rose-100">
                  <FiFrown className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    Before
                  </h3>
                </div>
              </div>

              {/* 6 Item Rows */}
              <div className="divide-y divide-gray-100">
                {beforeItems.map((text, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 font-bold text-xs border border-rose-100">
                      <BsX className="h-4 w-4 stroke-[1]" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ===================================================================== */}
            {/* RIGHT CARD: AFTER */}
            {/* ===================================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative flex flex-col justify-between rounded-3xl border border-teal-100/90 bg-[#f4fbfb] p-7 sm:p-9 shadow-[0_10px_35px_-5px_rgba(0,178,173,0.08)]"
            >
              {/* Card Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100/80 text-primary-dark border border-teal-200/60">
                  <FiSmile className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    After
                  </h3>
                </div>
              </div>

              {/* 7 Item Rows */}
              <div className="divide-y divide-teal-100/70">
                {afterItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
                    {/* Checkmark Circle */}
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100/90 text-primary-dark font-bold text-xs border border-teal-200/80">
                      <BsCheck className="h-4 w-4 stroke-[1]" />
                    </div>

                    {/* Text Copy */}
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                      {item.boldText}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
