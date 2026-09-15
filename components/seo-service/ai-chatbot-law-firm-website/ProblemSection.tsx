"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BsClock, BsFileEarmarkText, BsPeople, BsTelephoneInbound } from "react-icons/bs";

const problemCards = [
  {
    id: "01",
    icon: BsTelephoneInbound,
    title: "Callers reach voicemail",
    description:
      "After hours or during a busy day, inquiries go straight to voicemail — and most don't leave one.",
  },
  {
    id: "02",
    icon: BsFileEarmarkText,
    title: "Forms collect no context",
    description:
      "A name and email tells intake nothing about the case, the practice area, or the urgency.",
  },
  {
    id: "03",
    icon: BsClock,
    title: "Intake time is wasted",
    description:
      "Staff spend hours screening inquiries that were never a fit for your practice areas.",
  },
  {
    id: "04",
    icon: BsPeople,
    title: "Competing firms respond first",
    description:
      "The firm that answers fastest often wins the client — regardless of who's actually the better fit.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-white py-6 lg:py-8 overflow-hidden">
      {/* Background Soft Dot Grid Decoration */}
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 hidden h-64 w-48 -translate-y-1/2 grid-cols-6 gap-3 text-gray-200 lg:grid opacity-60">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          {/* Subtitle / Kicker */}
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              THE PROBLEM
            </span>
          </div>

          {/* Headline */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Most legal inquiries never <br className="hidden sm:inline" />
            make it past the contact form<span className="text-primary">.</span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl">
            Someone searching for a lawyer is usually in a stressful moment. <br className="hidden sm:inline" />
            If your site doesn&apos;t respond immediately, they call the next firm on the list.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 PROBLEM CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10">
          {problemCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100/90 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <div>
                  {/* Card Number Badge */}
                  <span className="block mb-4 text-sm sm:text-base font-bold text-primary tracking-wide">
                    {card.id}
                  </span>

                  {/* Icon Circle */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Teal Accent Bar */}
                <div className="mt-6 flex justify-center">
                  <div className="h-0.5 w-10 rounded-full bg-primary/80 transition-all duration-300 group-hover:w-16" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FIX BANNER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-teal-100/80 bg-[#f2fbfb] p-5 sm:p-6 lg:p-7 shadow-xs border-l-4 border-l-primary"
        >
          {/* Icon Circle */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-14 sm:w-14">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>

          {/* Banner Text */}
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-gray-700">
            <strong className="font-bold text-gray-900">Here&apos;s the fix:</strong>{" "}
            an assistant that engages every inquiry immediately, screens it by practice area, and hands your intake team a ready-to-book case.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
