"use client";

import { motion } from "framer-motion";
import { BsCheckCircle, BsClockHistory, BsLightning } from "react-icons/bs";

const steps = [
  {
    stepNumber: "01",
    title: "Scan",
    description:
      "Go Converto indexes your website, help center, and documentation to create its support knowledge base.",
  },
  {
    stepNumber: "02",
    title: "Train",
    description:
      "The platform learns your brand voice, support procedures, common customer issues, and the routing rules you define.",
  },
  {
    stepNumber: "03",
    title: "Resolve",
    description:
      "Go Converto answers questions, investigates issues, and handles supported conversations. When a situation needs your team, it escalates the conversation according to your rules.",
  },
];

const highlights = [
  {
    icon: BsLightning,
    title: "Instant Answers",
    description: "Customers receive responses within seconds, regardless of the time of day or time zone.",
  },
  {
    icon: BsCheckCircle,
    title: "Fewer Tickets",
    description: "Routine questions can be resolved before they become formal help desk tickets.",
  },
  {
    icon: BsClockHistory,
    title: "More Time for Your Support Team",
    description: "Your representatives can focus on conversations that require human judgment and personal attention.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - How Go Converto Works
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Get Go Converto Up and Running in Three Steps
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl mb-2">
            You do not need to build complicated conversation trees or have a developer create the support experience from scratch.
          </p>

          <p className="text-xs leading-relaxed text-gray-500 sm:text-sm max-w-3xl">
            Provide your website and support information, review what Go Converto has learned, set your escalation rules, and start handling conversations.
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10 sm:mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all"
            >
              <div>
                <span className="block mb-3 text-sm font-bold text-[#00a8a0] tracking-wide">
                  Step {step.stepNumber}
                </span>

                <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 flex justify-start">
                <div className="h-0.5 w-12 rounded-full bg-[#00a8a0]/70" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Bottom Highlights */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 rounded-2xl bg-gray-50/80 p-6 sm:p-8 border border-gray-100">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="flex flex-col items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 sm:text-base mb-1">
                    {h.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed sm:text-sm">
                    {h.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
