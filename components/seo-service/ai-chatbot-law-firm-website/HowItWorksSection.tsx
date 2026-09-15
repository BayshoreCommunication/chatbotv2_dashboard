"use client";

import { motion } from "framer-motion";
import { BiCalendarCheck } from "react-icons/bi";
import { BsFileEarmarkPerson, BsTelephoneInbound } from "react-icons/bs";
import { FiGlobe, FiMessageSquare, FiZap } from "react-icons/fi";

const steps = [
  {
    id: "01",
    icon: FiGlobe,
    title: "Scan",
    description:
      "Go Converto crawls your practice area pages, attorney bios, and FAQs to build its own knowledge base.",
  },
  {
    id: "02",
    icon: BsFileEarmarkPerson,
    title: "Train",
    description:
      "It's trained on your practice areas and set up with the intake questions your firm actually asks.",
  },
  {
    id: "03",
    icon: FiMessageSquare,
    title: "Screen",
    description:
      "It engages every new inquiry, screens for fit, and books consultations automatically.",
  },
];

export default function HowItWorksSection() {
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
          className="mb-12 sm:mb-16 text-center"
        >
          {/* Subtitle / Kicker */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              HOW IT WORKS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Live in three steps. <br className="hidden sm:inline" />
            No developer required<span className="text-primary">.</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            Paste your firm&apos;s website URL. Go Converto learns your practice areas <br className="hidden sm:inline" />
            and starts screening intake the same day.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3 TIMELINE STEPS FLOW WITH INFINITE ANIMATED DOTTED CONNECTOR */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-5xl">
          
          {/* Infinite Animated Dotted Connecting Line behind Badges (Desktop) */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-4 z-0 hidden md:block overflow-hidden">
            <svg className="w-full h-2 overflow-visible">
              <defs>
                <style>{`
                  @keyframes infiniteDashFlow {
                    0% {
                      stroke-dashoffset: 28;
                    }
                    100% {
                      stroke-dashoffset: 0;
                    }
                  }
                  .animated-infinite-line {
                    animation: infiniteDashFlow 1.2s linear infinite;
                  }
                `}</style>
              </defs>
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#00e0da"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animated-infinite-line opacity-80"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 items-start relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number Badge */}
                  <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                    {step.id}
                  </div>

                  {/* Circular Icon Container */}
                  <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md sm:h-28 sm:w-28">
                    <Icon className="h-9 w-9 text-primary sm:h-10 sm:w-10" />
                  </div>

                  {/* Step Title */}
                  <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="max-w-xs text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM HIGHLIGHT BANNER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-18 mx-auto max-w-5xl rounded-2xl sm:rounded-3xl border border-teal-100/80 bg-[#f2fbfb] p-6 sm:p-8 shadow-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-teal-100/90">
            
            {/* Banner Item 1 */}
            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-13 sm:w-13">
                <FiZap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 sm:text-base mb-1">
                  Setup in minutes
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Skip the dev queue — go live the same day you sign up.
                </p>
              </div>
            </div>

            {/* Banner Item 2 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-13 sm:w-13">
                <BsTelephoneInbound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 sm:text-base mb-1">
                  Every inquiry engaged
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  No caller waits on hold or lands in a voicemail box.
                </p>
              </div>
            </div>

            {/* Banner Item 3 */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-13 sm:w-13">
                <BiCalendarCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 sm:text-base mb-1">
                  Better-fit consultations
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Intake spends time on cases that actually match your practice.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
