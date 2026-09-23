"use client";

import { motion } from "framer-motion";

const integrationsList = [
  "HubSpot",
  "Salesforce",
  "Calendly",
  "Slack",
  "Zapier",
  "Email & SMS",
  "Facebook & Instagram DMs",
  "Mobile app",
];

export default function IntegrationsSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              - integrations
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Connect lead capture with your existing tools.
          </h2>

          <p className="mt-4 mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Go Converto can connect captured lead information with tools used by sales, marketing and communication teams. This ai agent can reduce manual copying between systems. It keep lead information available across the workflow.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {integrationsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-slate-200/80 bg-white px-5 py-3 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:border-[#00a8a0] transition-all"
            >
              <span className="text-sm font-bold text-slate-800">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
