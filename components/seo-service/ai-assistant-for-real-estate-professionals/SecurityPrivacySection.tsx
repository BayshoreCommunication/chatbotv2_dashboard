"use client";

import { motion } from "framer-motion";
import { Lock, ShieldAlert, ShieldCheck, Database } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Encrypted traffic",
    description: "Every conversation and contact detail is fully encrypted from end to end.",
  },
  {
    icon: ShieldAlert,
    title: "Zero data selling",
    description: "We will never sell or hand over your buyers' information to third-party companies.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance ready",
    description: "Built to handle data with GDPR standards in mind for teams working with international clients.",
  },
  {
    icon: Database,
    title: "You own the data",
    description: "Export or permanently wipe your collected leads whenever you need to.",
  },
];

export default function SecurityPrivacySection() {
  return (
    <section className="relative bg-slate-900 py-16 sm:py-20 text-white overflow-hidden">
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
              - Security & Privacy
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.18] max-w-3xl mx-auto">
            Keeping your buyers&apos; data locked down
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityFeatures.map((sec, index) => {
            const IconComp = sec.icon;
            return (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border border-slate-800 bg-slate-800/40 p-6 text-center hover:border-[#00a8a0]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00a8a0]/10 flex items-center justify-center text-[#00a8a0] mx-auto mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {sec.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 14-Day Free Trial Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[#00a8a0]/30 bg-gradient-to-r from-teal-950/80 via-slate-900 to-teal-950/80 p-8 sm:p-12 relative overflow-hidden text-center"
        >
          {/* Animated SVG Ring */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
            <svg width="240" height="240" viewBox="0 0 240 240" className="animate-spin-slow">
              <circle cx="120" cy="120" r="100" stroke="#00a8a0" strokeWidth="4" fill="none" strokeDasharray="16 16" />
            </svg>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#00a8a0] bg-[#00a8a0]/10 mb-4">
              14-Day Free Trial
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Try it out &amp; Cancel whenever you don&apos;t need it
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every tier starts with a full two-week trial. No hidden fees, no credit card tricks, and zero long-term commitments. If this tool doesn&apos;t put more qualified buyers on your calendar than your current setup, just cancel with a single click before you are ever charged.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
