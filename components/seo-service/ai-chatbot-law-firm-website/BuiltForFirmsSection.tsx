"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "Conversational intake",
    description:
      "Visitors can answer one question at a time instead of completing a long static form. Law firm AI agent can ask follow up questions based on the information already provided. This creates a more natural intake experience while collecting fields your team requires.",
  },
  {
    id: "02",
    title: "Practice area screening",
    description:
      "Create screening questions around the legal services offered by your firm. A personal injury workflow can ask about an accident and injuries. An immigration workflow can ask about current status, visa history and filing goals. Each flow can follow needs of the practice area.",
  },
  {
    id: "03",
    title: "Important date capture",
    description:
      "Collect dates tied to legal matter during the initial conversation. Examples include accident dates, arrest dates, hearing dates, denial dates, filing deadlines and notice dates. Staff can review these details before contacting lead.",
  },
  {
    id: "04",
    title: "24/7 availability",
    description:
      "The first response remains available after your office closes. Visitors can start an intake conversation during evenings, weekends, holidays or other periods without live staff coverage. Your team can review the collected information during normal operating hours.",
  },
  {
    id: "05",
    title: "Lead routing",
    description:
      "Direct inquiries toward the right attorney, intake team, referral workflow or practice area based on your configured rules. Routing can reduce manual sorting and help staff focus on inquiries needing attention.",
  },
  {
    id: "06",
    title: "Consultation scheduling",
    description:
      "Connect the chatbot with your scheduling process when online booking is available. A visitor can provide core intake information before moving toward a consultation request. This can reduce unnecessary back and forth between the visitor and your staff.",
  },
  {
    id: "07",
    title: "Custom questions",
    description:
      "Adjust your intake questions as your firm's screening process changes. You can add questions for a new practice area, remove fields your team no longer needs or revise questions after reviewing real intake conversations.",
  },
  {
    id: "08",
    title: "Human takeover",
    description:
      "A chatbot should not prevent staff from joining a conversation. Give your team a clear way to step in when a visitor needs personal assistance, asks a complex question or reaches a point requiring human review.",
  },
  {
    id: "09",
    title: "Intake reporting",
    description:
      "Review available intake activity from one place. Your team can use reporting to monitor inquiry volume, screening activity, lead sources and other available metrics. These records can help identify gaps in the intake process.",
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
              - Features of Go Converto
            </span>
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-tight max-w-4xl mx-auto">
            Built in features of our AI chatbot for law firm website.
          </h2>

          {/* Subtitle Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg font-normal">
            A useful ai chat agent for law firm website intake should do more than answer basic questions.
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
