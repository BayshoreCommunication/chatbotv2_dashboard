"use client";

import { motion } from "framer-motion";
import { BiBox, BiCheckShield, BiSmile, BiWrench } from "react-icons/bi";
import { BsFileEarmarkText } from "react-icons/bs";

const capturedItems = [
  {
    icon: BiBox,
    title: "Order and Account Status",
    description: "Pulls available live information instead of simply directing customers to a login page.",
  },
  {
    icon: BsFileEarmarkText,
    title: "Policy Questions",
    description: "Explains returns, shipping, billing, and other policies according to your business rules.",
  },
  {
    icon: BiWrench,
    title: "Basic Troubleshooting",
    description: "Guides customers through common fixes step by step and adjusts the conversation based on their responses.",
  },
  {
    icon: BiCheckShield,
    title: "Smart Escalation",
    description: "Passes complex or sensitive conversations to your team with the relevant background information attached.",
  },
  {
    icon: BiSmile,
    title: "Customer Sentiment",
    description: "Identifies frustrated customers so your team can give those conversations appropriate attention.",
  },
];

export default function WhatGetsCapturedSection() {
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
              - Use Cases
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Handle the Support Questions Customers Ask Most
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Go Converto goes beyond static FAQ answers. It handles the everyday issues that can take up an important share of your support team&apos;s time.
          </p>
        </motion.div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capturedItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-[#00a8a0]/40 transition-all"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0] transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
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
