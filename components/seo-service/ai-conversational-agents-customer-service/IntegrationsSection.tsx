"use client";

import { motion } from "framer-motion";
import { BiCalendar, BiEnvelope, BiMobileAlt } from "react-icons/bi";
import { FaInstagram, FaSlack } from "react-icons/fa";
import { SiZapier } from "react-icons/si";

const integrationsList = [
  { name: "Zendesk", category: "Help Desk", icon: BiCalendar },
  { name: "Intercom", category: "Support Messaging", icon: BiCalendar },
  { name: "Freshdesk", category: "Ticketing System", icon: BiCalendar },
  { name: "Slack", category: "Team Communication", icon: FaSlack },
  { name: "Zapier", category: "Workflow Automation", icon: SiZapier },
  { name: "Email & SMS", category: "Customer Outreach", icon: BiEnvelope },
  { name: "FB & Instagram DMs", category: "Social Messaging", icon: FaInstagram },
  { name: "Mobile Application", category: "iOS & Android", icon: BiMobileAlt },
];

export default function IntegrationsSection() {
  return (
    <section className="relative bg-[#061328] py-12 lg:py-16 text-white overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a8a0]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Integrations
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Works With the Tools Your Team Already Uses
          </h2>

          <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg max-w-2xl mx-auto">
            Go Converto connects with the systems your support team already relies on, helping conversations and resolutions move through your existing workflow.
          </p>
        </motion.div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 max-w-5xl mx-auto">
          {integrationsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/60 p-6 text-center backdrop-blur-sm hover:border-[#00a8a0]/50 hover:bg-gray-800/80 transition-all"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-[#00a8a0] group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-white sm:text-base mb-1">
                  {item.name}
                </h3>
                <span className="text-[11px] text-gray-400 font-mono">
                  {item.category}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
