"use client";

import { motion } from "framer-motion";
import { BsCheckCircleFill, BsClockHistory, BsCodeSquare, BsSliders, BsSearch } from "react-icons/bs";

const onboardingSteps = [
  {
    badge: "Minute 1",
    title: "Paste your link",
    description: "Drop in your URL. The system instantly begins analyzing your property specs.",
    icon: BsSearch,
  },
  {
    badge: "Minute 5",
    title: "Check the knowledge base",
    description: "Look at what the AI absorbed and tweak any details before it starts talking to people.",
    icon: BsSliders,
  },
  {
    badge: "Minute 8",
    title: "Pick your screening questions",
    description: "Stick with our standard prompts or rewrite them to match your personal vetting style.",
    icon: BsClockHistory,
  },
  {
    badge: "Minute 10",
    title: "Embed the widget",
    description: "Copy a single line of text onto your site. You don't need an IT guy.",
    icon: BsCodeSquare,
  },
  {
    badge: "Same day",
    title: "First tour secured",
    description: "The vast majority of our users see a vetted appointment hit their calendar within just a few hours.",
    icon: BsCheckCircleFill,
  },
];

export default function OnboardingSection() {
  return (
    <section className="relative bg-[#f8fafc] py-8 lg:py-12 overflow-hidden border-y border-gray-100">
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
              - Onboarding
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            What exactly happens after you hit sign up
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-2xl">
            No dragging out the implementation. This is the actual timeline from creating an account to securing your first booked tour.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {onboardingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#00a8a0]/10 px-3 py-1 text-xs font-bold text-[#00a8a0]">
                      {step.badge}
                    </span>
                    <Icon className="h-4 w-4 text-[#00a8a0]" />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed sm:text-sm">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#00a8a0] rounded-full"
                    style={{ width: `${(index + 1) * 20}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
