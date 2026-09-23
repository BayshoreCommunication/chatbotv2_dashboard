"use client";

import { motion } from "framer-motion";
import { BsCheckCircle, BsLightning, BsShieldCheck } from "react-icons/bs";

const steps = [
  {
    stepNumber: "01",
    title: "Scan",
    description:
      "The system reads through your property details and FAQs, building a custom knowledge base instantly.",
  },
  {
    stepNumber: "02",
    title: "Train",
    description:
      "It absorbs your listing info and adopts the exact vetting questions you prefer to ask new leads.",
  },
  {
    stepNumber: "03",
    title: "Convert",
    description:
      "It greets site visitors, gauges how serious they are, and books showings on its own.",
  },
];

const highlights = [
  {
    icon: BsLightning,
    title: "Setup completed in minutes",
    description: "Skip the tech headaches. You can easily go live the same day you register.",
  },
  {
    icon: BsShieldCheck,
    title: "Total coverage",
    description: "Nobody is left waiting while you finish up another client call. An AI chatbot real estate agents use for lead response can keep conversations moving when they are not online.",
  },
  {
    icon: BsCheckCircle,
    title: "Better appointments",
    description: "Reserve your weekends for buyers who are actually ready to sign.",
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
              - How It Works
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Get up and running in three steps. <span className="text-[#00a8a0]">Zero coding required</span>
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-2xl">
            Drop in your website or listing link. The platform studies your inventory and starts engaging buyers that same afternoon.
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

        {/* 3 Bottom Benefits Highlights */}
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
