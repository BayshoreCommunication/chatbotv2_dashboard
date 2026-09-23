"use client";

import { motion } from "framer-motion";
import {
  BiHeadphone,
  BiLineChart,
  BiMessageDetail,
  BiRefresh,
  BiSync,
  BiWrench,
} from "react-icons/bi";
import { BsClock, BsDatabase, BsSliders } from "react-icons/bs";

const capabilities = [
  {
    number: "01",
    icon: BsDatabase,
    title: "Live Database Queries",
    description: "Checks shipment progress, profile information, and order history using available live data.",
  },
  {
    number: "02",
    icon: BiWrench,
    title: "Interactive Troubleshooting",
    description: "Guides customers through technical fixes step by step and changes the next response based on what they tell the agent.",
  },
  {
    number: "03",
    icon: BsSliders,
    title: "Strategic Routing Rules",
    description: "Sends conversations to a live representative based on the categories, keywords, or customer sentiment you define.",
  },
  {
    number: "04",
    icon: BsClock,
    title: "Round-the-Clock Availability",
    description: "Handles support conversations during evenings, weekends, holidays, and other hours when your regular team may not be available.",
  },
  {
    number: "05",
    icon: BiMessageDetail,
    title: "Full Handoff Context",
    description: "Your representatives receive the conversation history, so customers do not have to explain the same issue again.",
  },
  {
    number: "06",
    icon: BiSync,
    title: "Ticketing Platform Sync",
    description: "Connects with your existing help desk software instead of requiring you to replace it.",
  },
  {
    number: "07",
    icon: BiRefresh,
    title: "Customized Voice & Procedures",
    description: "Uses your brand personality, support content, and operational guidelines when responding to customers.",
  },
  {
    number: "08",
    icon: BiHeadphone,
    title: "Live Intervention",
    description: "Your team can step into an active conversation whenever personal assistance is needed.",
  },
  {
    number: "09",
    icon: BiLineChart,
    title: "Resolution Analytics",
    description: "Track resolution rates, deflection rates, and customer conversation volume over time.",
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
              - Features
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Features Built Around Resolution
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Go Converto is built to help bring support conversations to a useful conclusion, rather than simply sending another automated response.
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
                    <span className="text-xs font-bold text-gray-400 font-mono">
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
