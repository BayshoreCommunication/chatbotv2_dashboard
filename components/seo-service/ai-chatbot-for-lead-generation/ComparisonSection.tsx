"use client";

import { motion } from "framer-motion";

const rows = [
  {
    capability: "Visitor can ask questions",
    contactForm: "limited",
    liveChat: "yes",
    goConverto: "yes",
  },
  {
    capability: "Available outside office hours",
    contactForm: "form available but wait for follow up",
    liveChat: "depends on staffing",
    goConverto: "yes",
  },
  {
    capability: "Automatic qualification",
    contactForm: "no",
    liveChat: "usually limited",
    goConverto: "yes",
  },
  {
    capability: "Conversational lead capture",
    contactForm: "no",
    liveChat: "sometimes",
    goConverto: "yes",
  },
  {
    capability: "Appointment booking",
    contactForm: "separate setup",
    liveChat: "depends on tool",
    goConverto: "available through calendar integration",
  },
  {
    capability: "CRM connection",
    contactForm: "often requires a workflow",
    liveChat: "depends on tool",
    goConverto: "supported through available integrations",
  },
  {
    capability: "Human handover",
    contactForm: "manual",
    liveChat: "yes",
    goConverto: "yes",
  },
  {
    capability: "Conversation context",
    contactForm: "usually limited",
    liveChat: "yes",
    goConverto: "yes",
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative bg-white py-8 sm:py-10 overflow-hidden">
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
              - comparison
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Go Converto vs. Traditional Lead Capture
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-x-auto"
        >
          <div className="min-w-[700px] grid grid-cols-12 items-stretch gap-4">
            <div className="col-span-8 flex flex-col justify-between">
              <div className="grid grid-cols-8 gap-4 items-center pb-4 border-b border-slate-100">
                <div className="col-span-4 bg-[#e8f6f5] rounded-xl px-4 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0]">
                    CAPABILITY
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    CONTACT FORM
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    BASIC LIVE CHAT
                  </span>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {rows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-8 gap-4 items-center py-4">
                    <div className="col-span-4 text-xs sm:text-sm font-bold text-slate-900 pr-2">
                      {row.capability}
                    </div>
                    <div className="col-span-2 text-center text-xs sm:text-sm text-slate-600 font-medium">
                      {row.contactForm}
                    </div>
                    <div className="col-span-2 text-center text-xs sm:text-sm text-slate-600 font-medium">
                      {row.liveChat}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 flex flex-col justify-between rounded-2xl border-2 border-[#00a8a0] bg-gradient-to-b from-[#f4faf9] to-[#edf8f6] p-4 sm:p-5 shadow-md">
              <div className="text-center pb-3 pt-1 border-b border-[#00a8a0]/20">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00a8a0]">
                  GO CONVERTO
                </span>
              </div>
              <div className="divide-y divide-[#00a8a0]/15 flex-1 flex flex-col justify-between">
                {rows.map((row, idx) => (
                  <div key={idx} className="flex items-center justify-start py-3.5 px-3 font-bold text-[#00a8a0] text-xs sm:text-sm">
                    ✓ {row.goConverto}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
