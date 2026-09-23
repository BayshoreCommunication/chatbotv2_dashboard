"use client";

import { motion } from "framer-motion";
import { BiCheckShield, BiLockAlt, BiShieldX } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";

const securityFeatures = [
  {
    icon: BiLockAlt,
    title: "Encrypted Transmission",
    description: "Customer conversations and profile information are encrypted during transmission.",
  },
  {
    icon: BiShieldX,
    title: "No Data Brokering",
    description: "Customer information is kept confidential and is not sold to outside vendors.",
  },
  {
    icon: BiCheckShield,
    title: "Regulatory Compliance",
    description: "Built with data handling practices designed for global businesses.",
  },
  {
    icon: BsDatabase,
    title: "Complete Ownership",
    description: "Export or permanently delete customer conversation data when needed.",
  },
];

export default function SecurityPrivacySection() {
  return (
    <section className="relative bg-[#061328] py-12 lg:py-16 text-white overflow-hidden">
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00a8a0]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Security & Privacy
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Protect Your Customer Data
          </h2>

          <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg max-w-3xl mx-auto">
            Customer support involves sensitive business and customer information. Go Converto is built with data protection measures designed to keep that information under your control.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((sf, index) => {
            const Icon = sf.icon;
            return (
              <motion.div
                key={sf.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm hover:border-[#00a8a0]/40 transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-[#00a8a0]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  {sf.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {sf.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
