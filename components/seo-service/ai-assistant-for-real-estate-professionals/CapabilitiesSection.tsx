"use client";

import { motion } from "framer-motion";
import {
  BiBuilding,
  BiCalendarCheck,
  BiChat,
  BiTime,
  BiLineChart,
  BiMessageSquareCheck,
  BiSearchAlt,
  BiShieldQuarter,
  BiUserCheck,
} from "react-icons/bi";

const capabilities = [
  {
    number: "01",
    icon: BiChat,
    title: "Conversational capture",
    description: "Gathers crucial buyer details through a natural chat instead of forcing them to fill out a static form.",
  },
  {
    number: "02",
    icon: BiSearchAlt,
    title: "Immediate property answers",
    description: "Flawlessly handles inquiries about asking prices, layout features, and showing times.",
  },
  {
    number: "03",
    icon: BiUserCheck,
    title: "Prospect screening",
    description: "Checks on lending status and moving timeframes so you know who is actually prepared to buy.",
  },
  {
    number: "04",
    icon: BiTime,
    title: "Always on the clock",
    description: "Responds to questions late at night, on weekends, and over holidays. It happens when people actually look at real estate.",
  },
  {
    number: "05",
    icon: BiMessageSquareCheck,
    title: "Intelligent handoffs",
    description: "Routes the best buyers directly to you, passing along the complete chat history.",
  },
  {
    number: "06",
    icon: BiCalendarCheck,
    title: "Calendar syncing",
    description: "Schedules walkthroughs right in the conversation using an automated Calendly link.",
  },
  {
    number: "07",
    icon: BiBuilding,
    title: "Full portfolio awareness",
    description: "It knows your entire active inventory, not just a single featured house.",
  },
  {
    number: "08",
    icon: BiShieldQuarter,
    title: "Step in anytime",
    description: "Take over the chat yourself the second a prospect needs a real human touch.",
  },
  {
    number: "09",
    icon: BiLineChart,
    title: "Live tracking",
    description: "Watch your inbound message volume and lead quality metrics update in real time.",
  },
];

export default function CapabilitiesSection() {
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
              - Capabilities
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Engineered for how modern buyers actually search
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Every single tool is designed to push a casual browser toward committing to a verified property tour.
          </p>
        </motion.div>

        {/* 9 Capabilities Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-lg hover:border-[#00a8a0]/40 transition-all"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a8a0]/10 text-[#00a8a0] transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 tracking-wider">
                      {cap.number}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-start">
                  <div className="h-0.5 w-8 rounded-full bg-[#00a8a0]/60 transition-all group-hover:w-16" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
