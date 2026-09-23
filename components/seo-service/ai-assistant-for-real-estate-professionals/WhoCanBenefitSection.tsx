"use client";

import { motion } from "framer-motion";
import { BiBuilding, BiHomeAlt, BiKey, BiUserCheck } from "react-icons/bi";

const audiences = [
  {
    icon: BiUserCheck,
    title: "Solo Agents",
    description: "Never drop a lead while you're busy with another client. The assistant watches your entire portfolio while you are offline.",
  },
  {
    icon: BiBuilding,
    title: "Teams & Brokerages",
    description: "Catch incoming questions across a massive inventory and automatically route the solid leads to the right agent.",
  },
  {
    icon: BiKey,
    title: "Rentals",
    description: "Immediately answer questions about pet policies, pricing, and application requirements, booking tours without the endless back-and-forth.",
  },
  {
    icon: BiHomeAlt,
    title: "New Construction",
    description: "Handle repetitive questions about floor plans, lot premiums, and build timelines for buyers looking at pre-construction.",
  },
];

export default function WhoCanBenefitSection() {
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
              - Who Can Benefit
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Designed for the reality of selling real estate
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Go Converto understands your inventory from day one. You don&apos;t have to write any awkward scripts.
          </p>
        </motion.div>

        {/* 4 Audience Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((aud, index) => {
            const Icon = aud.icon;
            return (
              <motion.div
                key={aud.title}
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
                    {aud.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {aud.description}
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
