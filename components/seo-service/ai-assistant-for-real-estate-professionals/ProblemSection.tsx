"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BsClock, BsFileEarmarkText, BsHouseDoor, BsTelephoneInbound } from "react-icons/bs";

const problemCards = [
  {
    id: "01",
    icon: BsTelephoneInbound,
    title: "You can't text back during tours",
    description:
      "Spending an hour focused on one client usually means ignoring messages from three others.",
  },
  {
    id: "02",
    icon: BsFileEarmarkText,
    title: "Portals don't give you the full picture",
    description:
      "A lead from a major site rarely tells you if the person is ready to buy or just window-shopping.",
  },
  {
    id: "03",
    icon: BsClock,
    title: "Late-night leads disappear",
    description:
      "A prospect who reaches out at 9 PM has usually forgotten about the house by the time you reply the next morning.",
  },
  {
    id: "04",
    icon: BsHouseDoor,
    title: "You end up chasing dead ends",
    description:
      "If you don't screen people, you'll burn your weekends showing properties to buyers who haven't even talked to a lender.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-1/2 -z-10 hidden h-64 w-48 -translate-y-1/2 grid-cols-6 gap-3 text-gray-200 lg:grid opacity-60">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#00a8a0]/20" />
        ))}
      </div>

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
              - The Problem
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            You usually get buyer questions right when you&apos;re busy showing a different house
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-3xl mb-4">
            Real estate moves ridiculously fast. If a buyer doesn&apos;t get a response right away, they simply move on to the next house on their list.
          </p>

          <p className="text-xs leading-relaxed text-gray-500 sm:text-sm max-w-3xl">
            Most agents miss fresh leads simply because they are fully consumed by the work right in front of them. Between showing properties, negotiating contracts, returning client calls, and managing endless administrative tasks, schedule overloads happen naturally. Daily operations take priority, leaving very little daylight to handle incoming inquiries immediately.
          </p>
        </motion.div>

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
                  <span className="block mb-4 text-sm sm:text-base font-bold text-[#00a8a0] tracking-wide">
                    {card.id}
                  </span>

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a8a0]/10 text-[#00a8a0] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-[#00a8a0]" />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="h-0.5 w-10 rounded-full bg-[#00a8a0]/80 transition-all duration-300 group-hover:w-16" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-teal-100/80 bg-[#f2fbfb] p-5 sm:p-6 lg:p-7 shadow-xs border-l-4 border-l-[#00a8a0]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00a8a0]/15 text-[#00a8a0] sm:h-14 sm:w-14">
            <Sparkles className="h-6 w-6 text-[#00a8a0]" />
          </div>

          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-gray-700 font-medium">
            The solution is very easy. An automated assistant like AI chatbot real estate agents can use to fill listing questions instantly, screens the prospect, and schedules the tour, even while you&apos;re driving to your next appointment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
