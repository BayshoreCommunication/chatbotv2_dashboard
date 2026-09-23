"use client";

import { motion } from "framer-motion";
import { BiBrush, BiUserCheck, BiWrench, BiVolumeFull } from "react-icons/bi";

const customizationItems = [
  {
    number: "01",
    icon: BiVolumeFull,
    title: "Fits your brand",
    description: "Trained directly on your own materials so it sounds like you, not a generic template.",
  },
  {
    number: "02",
    icon: BiWrench,
    title: "Tweak the screening",
    description: "Adjust the vetting questions so they perfectly match how you prefer to qualify people.",
  },
  {
    number: "03",
    icon: BiUserCheck,
    title: "Human override",
    description: "Step into a live chat whenever you want to take the reins.",
  },
  {
    number: "04",
    icon: BiBrush,
    title: "Seamless design",
    description: "The chat widget's colors and styling blend perfectly into your existing website.",
  },
];

export default function CustomizationSection() {
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
              - Customization
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Your actual properties, your real voice
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            This isn&apos;t a rigid, robotic flow. Every conversation is designed to your real listings and matches how you actually speak.
          </p>
        </motion.div>

        {/* 4 Customization Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customizationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-[#00a8a0]/40 transition-all"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0] transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 font-mono">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-start">
                  <div className="h-0.5 w-8 rounded-full bg-[#00a8a0]/60 transition-all group-hover:w-14" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
