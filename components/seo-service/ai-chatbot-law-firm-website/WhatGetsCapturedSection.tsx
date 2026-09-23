"use client";

import { motion } from "framer-motion";
import { BiCalendarCheck } from "react-icons/bi";
import { BsBriefcase, BsClock, BsPersonVcard, BsTag } from "react-icons/bs";

const capturedDetails = [
  {
    id: "01",
    tag: "CONTACT INFORMATION",
    icon: BsPersonVcard,
    line1: "Contact",
    line2: "information",
    description: "Collect visitor's name, phone number, email address and preferred contact method during the conversation. Ai chatbot for law firm website can ask for contact information after visitor explains the reason for reaching out. This creates a usable lead record without forcing visitor to complete a separate form.",
  },
  {
    id: "02",
    tag: "PRACTICE AREA",
    icon: BsBriefcase,
    line1: "Case type &",
    line2: "practice area",
    description: "Ask visitor to describe the legal issue in simple terms. AI agent can use your firm's configured practice areas to identify type of inquiry. This helps your intake team separate personal injury, family law, immigration, criminal defense, business matters and other legal requests.",
  },
  {
    id: "03",
    tag: "TIMELINE",
    icon: BsClock,
    line1: "Incident",
    line2: "timeline",
    description: "Dates can affect urgency and case handling. Intake questions can collect incident date, notice date, filing deadline, court date, consultation date or other relevant timeline details. Your team can use information for faster review and appropriate follow up.",
  },
  {
    id: "04",
    tag: "CONSULTATION",
    icon: BiCalendarCheck,
    line1: "Consultation",
    line2: "request",
    description: "A visitor may be ready to speak with an attorney instead of continuing through a long intake process. If your firm offers online scheduling, AI assistant can direct qualified visitors toward your consultation process. Intake questions can still collect basic information before scheduling.",
  },
  {
    id: "05",
    tag: "LEAD STATUS",
    icon: BsTag,
    line1: "Lead",
    line2: "status",
    description: "Your workflow can classify inquiries based on your firm's intake rules. A conversation may indicate a potential new case, an existing client request, a referral opportunity or a matter outside your services. Clear lead status can help staff decide how each inquiry should be handled.",
  },
];

export default function WhatGetsCapturedSection() {
  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-18 text-center"
        >
          {/* Subtitle / Kicker */}
          <div className="mb-4 flex items-center justify-center gap-2.5">
            <span className="h-0.5 w-6 bg-primary-dark" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
              - What AI assistant captured
            </span>
            <span className="h-0.5 w-6 bg-primary-dark" />
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Every detail your intake team actually needs.
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            A useful intake conversation collect enough context for your team to understand what visitor needs along with name and number. Based on context AI assistant setting up a follow up call.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 5 CAPTURED CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {capturedDetails.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col items-center text-center rounded-2xl sm:rounded-3xl border border-gray-100/90 border-t-2 border-t-primary-dark bg-white p-6 sm:p-7 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Top Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-dark text-xs font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                  {card.id}
                </div>

                {/* Circular Icon Container */}
                <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-teal-100/80 bg-[#edf8f8] text-primary-dark shadow-2xs transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 text-primary-dark sm:h-8 sm:w-8" />
                </div>

                {/* Category Tag */}
                <span className="block mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-dark">
                  {card.tag}
                </span>

                {/* Title */}
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {card.line1} <br />
                  {card.line2}
                </h3>

                {/* Bottom Accent Line */}
                <div className="my-3 h-0.5 w-8 rounded-full bg-primary-dark/70 transition-all duration-300 group-hover:w-12" />

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
