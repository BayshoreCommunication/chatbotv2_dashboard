"use client";

import { motion } from "framer-motion";
import { BiChat, BiGlobe, BiMobileAlt, BiShareAlt } from "react-icons/bi";

const deploymentChannels = [
  {
    title: "Website Widget",
    description: "Add the support interface to any webpage with a single snippet.",
    icon: BiGlobe,
  },
  {
    title: "Facebook and Instagram",
    description: "Respond to incoming direct messages using the same support information and rules.",
    icon: BiShareAlt,
  },
  {
    title: "SMS",
    description: "Handle support questions through text messaging for customers who prefer SMS.",
    icon: BiChat,
  },
  {
    title: "Mobile Application",
    description: "Monitor conversations and step in when needed from wherever your team is working.",
    icon: BiMobileAlt,
  },
];

export default function DeploymentSection() {
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
              - Deployment
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Support Customers Wherever They Already Message You
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Customers have different preferences when it comes to contacting a business. Go Converto lets the same trained agent handle conversations across your available channels.
          </p>
        </motion.div>

        {/* 4 Channel Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deploymentChannels.map((ch, index) => {
            const Icon = ch.icon;
            return (
              <motion.div
                key={ch.title}
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
                    {ch.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {ch.description}
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
