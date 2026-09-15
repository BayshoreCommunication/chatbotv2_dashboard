"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "No-form case intake",
    description:
      "Collects contact and case details through natural conversation instead of a static form.",
  },
  {
    id: "02",
    title: "Practice-area screening",
    description:
      "Automatically checks new inquiries against the practice areas your firm handles.",
  },
  {
    id: "03",
    title: "Statute-aware timelines",
    description:
      "Captures incident dates so intake can flag time-sensitive matters immediately.",
  },
  {
    id: "04",
    title: "24/7 availability",
    description:
      "Engages inquiries nights, weekends, and holidays — whenever people actually search for a lawyer.",
  },
  {
    id: "05",
    title: "Smart routing",
    description:
      "Sends qualified cases to the right attorney or team, with full context attached.",
  },
  {
    id: "06",
    title: "Consultation booking",
    description:
      "Books free consultations directly in the chat via automated Calendly scheduling.",
  },
  {
    id: "07",
    title: "Custom intake questions",
    description:
      "Tailor the screening flow to match exactly how your firm qualifies new matters.",
  },
  {
    id: "08",
    title: "Human takeover",
    description:
      "Jump into any live conversation yourself when a case needs a personal touch.",
  },
  {
    id: "09",
    title: "Real-time analytics",
    description:
      "See inquiry volume, screen rate, and case quality as it happens.",
  },
];

export default function BuiltForFirmsSection() {
  return (
    <section className="relative bg-white pt-8 pb-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          {/* Top Line Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
              BUILT FOR HOW FIRMS ACTUALLY TAKE IN CASES
            </span>
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-tight max-w-4xl mx-auto">
            Every feature exists to move a new inquiry closer to a booked, qualified consultation<span className="text-primary-dark">.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg font-normal">
            Every feature exists to move a new inquiry closer to a booked, qualified consultation.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3x3 FEATURE CARDS MATRIX GRID */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto max-w-6xl rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-gray-200/70 p-[1px] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-gray-200/70 rounded-2xl sm:rounded-3xl overflow-hidden">
            {features.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="group relative flex flex-col justify-start bg-white p-7 sm:p-9 transition-all duration-300 hover:bg-gradient-to-b hover:from-[#f4fcfc] hover:to-white hover:z-10 hover:shadow-xl"
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark via-primary to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Number Badge Pill */}
                <div className="mb-6 flex">
                  <span className="inline-flex items-center justify-center rounded-lg bg-[#e8f8f6] px-3.5 py-1 text-xs sm:text-sm font-bold text-primary-dark transition-all duration-300 group-hover:bg-primary-dark group-hover:text-white group-hover:shadow-xs group-hover:scale-105">
                    {card.id}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="mb-2.5 text-lg font-bold text-gray-900 sm:text-xl leading-snug group-hover:text-primary-dark transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
