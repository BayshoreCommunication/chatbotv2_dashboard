"use client";

import { motion } from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";

// Personal Injury Shield Icon
function PersonalInjuryIcon() {
  return (
    <div className="relative flex items-center justify-center text-primary-dark">
      <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4L32 9V18C32 26 26 33 20 36C14 33 8 26 8 18V9L20 4Z" fill="#eef9f9" />
        <circle cx="20" cy="18" r="4" />
        <path d="M14 26C14 23 17 22 20 22C23 22 26 23 26 26" />
      </svg>
    </div>
  );
}

// Family Law Icon (Heart + People)
function FamilyLawIcon() {
  return (
    <div className="relative flex items-center justify-center text-primary-dark">
      <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10C17 6 13 8 13 12C13 16 20 21 20 21C20 21 27 16 27 12C27 8 23 6 20 10Z" fill="#eef9f9" />
        <circle cx="20" cy="18" r="3" />
        <path d="M15 25C15 22.5 17 21.5 20 21.5C23 21.5 25 22.5 25 25" />
        <circle cx="12" cy="22" r="2.5" />
        <path d="M8 28C8 26 9.5 25 12 25C13.5 25 14.5 25.5 15 26" />
        <circle cx="28" cy="22" r="2.5" />
        <path d="M32 28C32 26 30.5 25 28 25C26.5 25 25.5 25.5 25 26" />
      </svg>
    </div>
  );
}

// Immigration Icon (Globe + Passport)
function ImmigrationIcon() {
  return (
    <div className="relative flex items-center justify-center text-primary-dark">
      <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="17" cy="17" r="10" fill="#eef9f9" />
        <path d="M7 17H27M17 7C19.5 9.5 21 13 21 17C21 21 19.5 24.5 17 27C14.5 24.5 13 21 13 17C13 13 14.5 9.5 17 7Z" />
        <rect x="23" y="19" width="10" height="13" rx="2" fill="white" />
        <circle cx="28" cy="24" r="2" />
        <line x1="25" y1="28" x2="31" y2="28" />
      </svg>
    </div>
  );
}

// Estate Planning Icon (Document + Signature Pen)
function EstatePlanningIcon() {
  return (
    <div className="relative flex items-center justify-center text-primary-dark">
      <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="6" width="18" height="26" rx="2" fill="#eef9f9" />
        <line x1="14" y1="12" x2="24" y2="12" />
        <line x1="14" y1="17" x2="22" y2="17" />
        <path d="M14 24C16 22 17 25 19 23C20 22 22 24 24 23" />
        <path d="M26 28L31 21L33 23L28 30H26V28Z" fill="currentColor" />
      </svg>
    </div>
  );
}

const practiceCards = [
  {
    id: "01",
    icon: PersonalInjuryIcon,
    title: "Personal injury",
    description:
      "Captures accident details and timelines, flags urgent statute-of-limitations matters, and books consultations.",
  },
  {
    id: "02",
    icon: FamilyLawIcon,
    title: "Family law",
    description:
      "Screens sensitive intake conversations with care, collects case context, and routes to the right attorney.",
  },
  {
    id: "03",
    icon: ImmigrationIcon,
    title: "Immigration",
    description:
      "Answers common process questions and screens visa or case type before booking a consultation.",
  },
  {
    id: "04",
    icon: EstatePlanningIcon,
    title: "Estate planning",
    description:
      "Handles routine questions about wills and trusts, and books consultations without a callback delay.",
  },
];

export default function PracticeAreasSection() {
  return (
    <section className="relative bg-white py-8 lg:py-10 overflow-hidden">
      {/* Background Soft Wave Accent Lines (Left & Right) */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -z-10 opacity-30">
        <svg className="w-48 h-96" viewBox="0 0 200 400" fill="none">
          <path d="M-50 50 Q 50 150 0 250 T 50 350" stroke="#00b2ad" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M-50 100 Q 80 200 -20 300 T 80 400" stroke="#00b2ad" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 -z-10 opacity-30 rotate-180">
        <svg className="w-48 h-96" viewBox="0 0 200 400" fill="none">
          <path d="M-50 50 Q 50 150 0 250 T 50 350" stroke="#00b2ad" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M-50 100 Q 80 200 -20 300 T 80 400" stroke="#00b2ad" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

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
          {/* Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
              PRACTICE AREAS
            </span>
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
          </div>

          {/* Main Headline */}
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-tight max-w-3xl mx-auto">
            Built for how your firm <br className="hidden sm:inline" />
            actually screens cases
          </h2>

          {/* Decorative 3 Dots */}
          <div className="flex items-center justify-center gap-1.5 my-4">
            <span className="h-2 w-2 rounded-full bg-primary-dark/50" />
            <span className="h-2 w-2 rounded-full bg-primary-dark" />
            <span className="h-2 w-2 rounded-full bg-primary-dark/50" />
          </div>

          {/* Subtitle Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg font-normal">
            Go Converto picks up your practice areas and intake language on day one — <br className="hidden sm:inline" />
            no scripts to write.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 PRACTICE AREA CARDS ROW WITH CURVED DOTTED CONNECTORS */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-6xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch relative z-10">
            {practiceCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center justify-between text-center rounded-2xl sm:rounded-3xl border border-gray-100/90 bg-white p-7 sm:p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                >
                  {/* Curved Dotted Node Connector to Next Card (Desktop) */}
                  {index < 3 && (
                    <div className="hidden lg:block pointer-events-none absolute -right-[24px] xl:-right-[32px] top-19 sm:top-20 -translate-y-1/2 w-[48px] xl:w-[64px] z-30 overflow-visible">
                      <svg className="w-full h-8 overflow-visible" viewBox="0 0 64 32">
                        <defs>
                          <style>{`
                            @keyframes flowPracticeDash {
                              0% { stroke-dashoffset: 24; }
                              100% { stroke-dashoffset: 0; }
                            }
                            .animated-practice-line {
                              animation: flowPracticeDash 1.6s linear infinite;
                            }
                          `}</style>
                        </defs>
                        {/* Curved Dotted Wave Path */}
                        <path
                          d="M 6 16 Q 32 4 58 16"
                          stroke="#00b2ad"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          fill="none"
                          className="animated-practice-line opacity-90"
                        />
                        {/* Left Node Ring Dot */}
                        <circle cx="6" cy="16" r="3.5" fill="white" stroke="#00b2ad" strokeWidth="2" />
                        {/* Right Node Arrow Head Circle */}
                        <circle cx="58" cy="16" r="4.5" fill="#00b2ad" />
                        <path d="M56 16L59 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}

                  {/* Top Icon Circle */}
                  <div className="relative mb-5 flex flex-col items-center">
                    <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#edf8f8] border border-teal-100/60 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <Icon />
                    </div>

                    {/* Small Teal Dot below Icon */}
                    <span className="mt-3 h-2 w-2 rounded-full bg-primary-dark" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 flex flex-col justify-start mb-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl leading-snug group-hover:text-primary-dark transition-colors duration-300">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom "Learn more ->" Pill Button */}
                  <div className="w-full flex justify-center pt-2">
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-primary-dark/40 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-primary-dark shadow-2xs transition-all duration-300 group-hover:bg-primary-dark group-hover:text-white group-hover:shadow-md">
                      <span>Learn more</span>
                      <BiRightArrowAlt className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
