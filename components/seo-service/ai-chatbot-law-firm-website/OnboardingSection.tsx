"use client";

import { motion } from "framer-motion";
import { BiCalendarCheck } from "react-icons/bi";
import { FiBookOpen, FiCode, FiGlobe, FiMessageSquare } from "react-icons/fi";

const onboardingSteps = [
  {
    id: "01",
    time: "FIRST FEW MINUTES",
    icon: FiGlobe,
    title: "Connect your website",
    description:
      "Enter your firm's website address and start connection process. The system reviews public practice area pages, service descriptions, attorney information and other available content. Your team can use this information as the starting point for chatbot responses and intake conversations.",
    align: "left",
    hasDot: true,
  },
  {
    id: "02",
    time: "NEXT",
    icon: FiBookOpen,
    title: "Review the information",
    description:
      "Review AI assistant's available knowledge before using it with real visitors. Check practice area descriptions, attorney information, service details and common questions. Correct outdated information and remove content outside your firm's preferred intake scope.",
    align: "right",
    hasDot: false,
  },
  {
    id: "03",
    time: "THEN",
    icon: FiMessageSquare,
    title: "Configure intake questions",
    description:
      "Add questions your team already uses during a first call. Questions can cover the legal matter, incident date, location, opposing party, prior insurance contact, court dates, filing deadlines or preferred contact method. Different practice areas can use different questions based on information required for an initial review.",
    align: "left",
    hasDot: true,
  },
  {
    id: "04",
    time: "AFTER SETUP",
    icon: FiCode,
    title: "Add the widget",
    description:
      "Place the provided website snippet on your site to make AI assistant available to visitors. Your team does not need to build the chat interface from scratch. Widget can appear on selected pages after installation based on your website setup.",
    align: "right",
    hasDot: false,
  },
  {
    id: "05",
    time: "BEFORE GOING LIVE",
    icon: BiCalendarCheck,
    title: "Test the conversation",
    description:
      "Run sample conversations before sending real visitors into the intake flow. Test a strong fit case, a poor fit case, an urgent inquiry and a visitor asking a general legal question. Check responses, intake fields, routing rules and human takeover process before launch.",
    align: "left",
    hasDot: true,
  },
];

export default function OnboardingSection() {
  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">
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
          {/* Subtitle / Kicker */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              - Onboarding
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            What happens after you sign up?
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            The setup process is quite simple enough for a law firm administrator or marketing manager to handle without waiting for a developer.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* STAGGERED TIMELINE WATERFALL LAYOUT WITH INFINITE ANIMATED DOTTED LINES */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-4xl space-y-6 sm:space-y-8 md:space-y-0">
          
          {/* Step 01 (Left) */}
          <div className="relative flex justify-start z-10">
            {/* Infinite Animated Stepped Connector 1 -> 2 */}
            <div className="hidden md:block pointer-events-none absolute right-[calc(50%-20px)] top-[40%] z-0 overflow-visible">
              <svg className="w-[50px] h-[130px] overflow-visible">
                <defs>
                  <style>{`
                    @keyframes stepDashFlow1 {
                      0% { stroke-dashoffset: 28; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .step-line-flow-1 {
                      animation: stepDashFlow1 1.2s linear infinite;
                    }
                  `}</style>
                </defs>
                <path
                  d="M 0 0 H 12 Q 20 0 20 8 V 105 Q 20 115 28 115 H 40"
                  stroke="#00e0da"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="step-line-flow-1 opacity-80"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative z-10 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-5 pl-7 sm:p-6 sm:pl-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-gray-200 transition-all duration-300 w-full max-w-[420px]"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md z-20">
                01
              </div>
              <div className="hidden md:block absolute -right-1.5 top-[40%] -translate-y-1/2 h-3 w-3 rounded-full bg-[#00e0da] shadow-xs z-20 border-2 border-white" />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs sm:h-16 sm:w-16">
                <FiGlobe className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {onboardingSteps[0].time}
                </span>
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {onboardingSteps[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {onboardingSteps[0].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 02 (Right) */}
          <div className="relative flex justify-end z-10 md:-mt-12 lg:-mt-14">
            {/* Infinite Animated Stepped Connector 2 -> 3 */}
            <div className="hidden md:block pointer-events-none absolute left-[calc(50%-20px)] top-[35%] z-0 overflow-visible">
              <svg className="w-[50px] h-[130px] overflow-visible">
                <defs>
                  <style>{`
                    @keyframes stepDashFlow2 {
                      0% { stroke-dashoffset: 28; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .step-line-flow-2 {
                      animation: stepDashFlow2 1.2s linear infinite;
                    }
                  `}</style>
                </defs>
                <path
                  d="M 40 0 H 28 Q 20 0 20 8 V 105 Q 20 115 12 115 H 0"
                  stroke="#00e0da"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="step-line-flow-2 opacity-80"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative z-10 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-5 pl-7 sm:p-6 sm:pl-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-gray-200 transition-all duration-300 w-full max-w-[420px]"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md z-20">
                02
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs sm:h-16 sm:w-16">
                <FiBookOpen className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {onboardingSteps[1].time}
                </span>
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {onboardingSteps[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {onboardingSteps[1].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 03 (Left) */}
          <div className="relative flex justify-start z-10 md:-mt-12 lg:-mt-14">
            {/* Infinite Animated Stepped Connector 3 -> 4 */}
            <div className="hidden md:block pointer-events-none absolute right-[calc(50%-20px)] top-[40%] z-0 overflow-visible">
              <svg className="w-[50px] h-[130px] overflow-visible">
                <path
                  d="M 0 0 H 12 Q 20 0 20 8 V 105 Q 20 115 28 115 H 40"
                  stroke="#00e0da"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="step-line-flow-1 opacity-80"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative z-10 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-5 pl-7 sm:p-6 sm:pl-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-gray-200 transition-all duration-300 w-full max-w-[420px]"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md z-20">
                03
              </div>
              <div className="hidden md:block absolute -right-1.5 top-[40%] -translate-y-1/2 h-3 w-3 rounded-full bg-[#00e0da] shadow-xs z-20 border-2 border-white" />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs sm:h-16 sm:w-16">
                <FiMessageSquare className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {onboardingSteps[2].time}
                </span>
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {onboardingSteps[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {onboardingSteps[2].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 04 (Right) */}
          <div className="relative flex justify-end z-10 md:-mt-12 lg:-mt-14">
            {/* Infinite Animated Stepped Connector 4 -> 5 */}
            <div className="hidden md:block pointer-events-none absolute left-[calc(50%-20px)] top-[35%] z-0 overflow-visible">
              <svg className="w-[50px] h-[130px] overflow-visible">
                <path
                  d="M 40 0 H 28 Q 20 0 20 8 V 105 Q 20 115 12 115 H 0"
                  stroke="#00e0da"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="step-line-flow-2 opacity-80"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative z-10 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-5 pl-7 sm:p-6 sm:pl-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-gray-200 transition-all duration-300 w-full max-w-[420px]"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md z-20">
                04
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs sm:h-16 sm:w-16">
                <FiCode className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {onboardingSteps[3].time}
                </span>
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {onboardingSteps[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {onboardingSteps[3].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Step 05 (Left) */}
          <div className="relative flex justify-start z-10 md:-mt-12 lg:-mt-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative z-10 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-5 pl-7 sm:p-6 sm:pl-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-gray-200 transition-all duration-300 w-full max-w-[420px]"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-md z-20">
                05
              </div>
              <div className="hidden md:block absolute -right-1.5 top-[35%] -translate-y-1/2 h-3 w-3 rounded-full bg-[#00e0da] shadow-xs z-20 border-2 border-white" />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-100/90 bg-[#edf8f8] text-primary shadow-2xs sm:h-16 sm:w-16">
                <BiCalendarCheck className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="block mb-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {onboardingSteps[4].time}
                </span>
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {onboardingSteps[4].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {onboardingSteps[4].description}
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
