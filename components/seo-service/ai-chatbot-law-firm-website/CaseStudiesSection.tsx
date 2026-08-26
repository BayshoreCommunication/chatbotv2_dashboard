"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Flexible Animated Counter supporting integers, decimals, prefixes, and suffixes
function AnimatedStat({
  from = 0,
  to,
  decimals = 0,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  from?: number;
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(value);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  const formattedValue =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <span ref={ref}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// Icons matching the screenshot

function ShieldUserIcon() {
  return (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 text-[#00a8a0]"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 4L29 8V16C29 23.5 24 30 18 32C12 30 7 23.5 7 16V8L18 4Z" fill="#e8f6f5" />
      <circle cx="18" cy="15" r="3" />
      <path d="M13 23C13 20.5 15 19.5 18 19.5C21 19.5 23 20.5 23 23" />
    </svg>
  );
}

function FamilyGroupIcon() {
  return (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 text-[#00a8a0]"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13" cy="12" r="3.5" />
      <path d="M7 23C7 20 9.5 18.5 13 18.5C16.5 18.5 19 20 19 23" />
      <circle cx="23" cy="15" r="3" />
      <path d="M18.5 24C18.5 21.5 20.5 20.5 23 20.5C25.5 20.5 27.5 21.5 27.5 24" />
    </svg>
  );
}

function GeneralBriefcaseIcon() {
  return (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 text-[#00a8a0]"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="11" width="24" height="18" rx="3" fill="#e8f6f5" />
      <path d="M13 11V8C13 6.89543 13.8954 6 15 6H21C22.1046 6 23 6.89543 23 8V11" />
      <line x1="6" y1="17" x2="30" y2="17" />
    </svg>
  );
}

function CourthouseIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21H21" />
      <path d="M4 18H20" />
      <path d="M12 2L2 7H22L12 2Z" />
      <path d="M6 10V15" />
      <path d="M10 10V15" />
      <path d="M14 10V15" />
      <path d="M18 10V15" />
    </svg>
  );
}

const caseStudies = [
  {
    id: "01",
    category: "PERSONAL INJURY",
    icon: ShieldUserIcon,
    renderStat: () => <AnimatedStat from={0} to={41} prefix="+" suffix="%" />,
    description:
      "Increase in booked consultations after replacing the intake form with Go Converto.",
    firmName: "Carter Injury Law",
    launchTime: "90 days post-launch",
  },
  {
    id: "02",
    category: "FAMILY LAW",
    icon: FamilyGroupIcon,
    renderStat: () => (
      <AnimatedStat from={0} to={3.1} decimals={1} suffix="×" />
    ),
    description:
      "More after-hours inquiries captured and booked into next-day consultations.",
    firmName: "Melamed Law",
    launchTime: "60 days post-launch",
  },
  {
    id: "03",
    category: "GENERAL PRACTICE",
    icon: GeneralBriefcaseIcon,
    renderStat: () => <AnimatedStat from={0} to={52} prefix="-" suffix="%" />,
    description:
      "Reduction in intake time spent screening cases outside the firm's practice areas.",
    firmName: "McCulloch Law",
    launchTime: "45 days post-launch",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              CASE STUDIES
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Results across different <br className="hidden sm:inline" />
            practice areas
          </h2>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Real law firms. Real results. <br />
            Measurable impact with Go Converto.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3 CASE STUDY CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300"
              >
                <div>
                  {/* Top Card Header: Icon + Category Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Icon Container */}
                    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#eaf7f6] border border-[#c6ece9] transition-transform duration-300 group-hover:scale-105">
                      <IconComponent />
                    </div>

                    {/* Category Label */}
                    <div>
                      <div className="h-[2px] w-6 bg-[#00a8a0] mb-1.5" />
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider uppercase">
                        {card.category}
                      </h3>
                    </div>
                  </div>

                  {/* Large Stat with Animated Counter */}
                  <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#00a8a0] font-normal my-6 tracking-tight">
                    {card.renderStat()}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-8 min-h-[48px]">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer Divider & Law Firm Info */}
                <div className="border-t border-slate-100 pt-6 mt-auto flex items-center gap-3.5">
                  {/* Courthouse Icon */}
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#eaf7f6] border border-[#c6ece9]">
                    <CourthouseIcon />
                  </div>

                  {/* Firm Details */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {card.firmName}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {card.launchTime}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
