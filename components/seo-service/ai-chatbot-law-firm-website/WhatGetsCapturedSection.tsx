"use client";

import { motion } from "framer-motion";
import { BiCalendarCheck } from "react-icons/bi";
import { BsBriefcase, BsClock, BsPersonVcard, BsTag } from "react-icons/bs";

const capturedDetails = [
  {
    id: "01",
    tag: "CONTACT",
    icon: BsPersonVcard,
    line1: "Name, phone,",
    line2: "email",
    description: "Collected conversationally, never a blank form field.",
  },
  {
    id: "02",
    tag: "MATTER",
    icon: BsBriefcase,
    line1: "Case type &",
    line2: "practice area",
    description: "Screened against the practice areas your firm actually handles.",
  },
  {
    id: "03",
    tag: "TIME",
    icon: BsClock,
    line1: "Incident",
    line2: "timeline",
    description: "Key dates that matter for statutes of limitations and urgency.",
  },
  {
    id: "04",
    tag: "ACTION",
    icon: BiCalendarCheck,
    line1: "Booked",
    line2: "consultations",
    description: "Scheduled directly in the chat via automated calendar booking.",
  },
  {
    id: "05",
    tag: "FIT",
    icon: BsTag,
    line1: "Qualified",
    line2: "tag",
    description: "Every inquiry arrives pre-labeled as a fit, referral, or not a match.",
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
            <span className="h-0.5 w-6 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              WHAT GETS CAPTURED
            </span>
            <span className="h-0.5 w-6 bg-primary" />
          </div>

          {/* Main Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Every detail your intake team <br className="hidden sm:inline" />
            actually needs<span className="text-primary">.</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg">
            Not just a name and number — the case context that <br className="hidden sm:inline" />
            determines what happens next.
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
                className="group relative flex flex-col items-center text-center rounded-2xl sm:rounded-3xl border border-gray-100/90 border-t-2 border-t-primary bg-white p-6 sm:p-7 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Top Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                  {card.id}
                </div>

                {/* Circular Icon Container */}
                <div className="mt-4 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-teal-100/80 bg-[#edf8f8] text-primary shadow-2xs transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                </div>

                {/* Category Tag */}
                <span className="block mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                  {card.tag}
                </span>

                {/* Title */}
                <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                  {card.line1} <br />
                  {card.line2}
                </h3>

                {/* Bottom Accent Line */}
                <div className="my-3 h-0.5 w-8 rounded-full bg-primary/70 transition-all duration-300 group-hover:w-12" />

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
