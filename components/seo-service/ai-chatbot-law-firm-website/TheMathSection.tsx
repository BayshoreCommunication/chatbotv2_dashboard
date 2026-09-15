"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counter Component for smooth count-up animation when scrolled into view
function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  from?: number;
  to: number;
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
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Icons matching the screenshot

function SpeedLightningIcon() {
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
      <circle cx="18" cy="18" r="13" />
      <path d="M19 10L14 19H19L17 26L23 16H18L19 10Z" fill="#e8f6f5" />
    </svg>
  );
}

function Calendar247Icon() {
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
      <rect x="5" y="8" width="26" height="22" rx="4" />
      <line x1="5" y1="14" x2="31" y2="14" />
      <line x1="11" y1="5" x2="11" y2="9" />
      <line x1="25" y1="5" x2="25" y2="9" />
      <text
        x="18"
        y="25"
        fontSize="9"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
        textAnchor="middle"
      >
        24/7
      </text>
    </svg>
  );
}

function UserZeroMissedIcon() {
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
      <circle cx="16" cy="12" r="5" />
      <path d="M7 27C7 22 11 20 16 20C18 20 20 20.5 21.5 21.5" />
      <circle cx="25" cy="24" r="5" fill="#e8f6f5" />
      <line x1="22.5" y1="21.5" x2="27.5" y2="26.5" />
      <line x1="27.5" y1="21.5" x2="22.5" y2="26.5" />
    </svg>
  );
}

function PieChartSavedIcon() {
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
      <circle cx="18" cy="18" r="13" />
      <path d="M18 5V18H31" fill="#e8f6f5" />
      <path d="M18 18L9 27" />
    </svg>
  );
}

const mathCards = [
  {
    id: "01",
    icon: SpeedLightningIcon,
    renderCounter: () => <AnimatedCounter from={0} to={2} suffix=" sec" />,
    description:
      "Average response time, versus voicemail or next-day callback",
  },
  {
    id: "02",
    icon: Calendar247Icon,
    renderCounter: () => <AnimatedCounter from={0} to={24} suffix="/7" />,
    description: "Coverage, including nights, weekends, and holidays",
  },
  {
    id: "03",
    icon: UserZeroMissedIcon,
    renderCounter: () => <AnimatedCounter from={10} to={0} suffix=" missed" />,
    description: "After-hours inquiries lost to a slow follow-up",
  },
  {
    id: "04",
    icon: PieChartSavedIcon,
    renderCounter: () => (
      <AnimatedCounter from={0} to={15} suffix="+ hrs saved" />
    ),
    description:
      "Intake staff time no longer spent screening unqualified calls",
  },
];

export default function TheMathSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      {/* Background Graphic Accents (Dotted Grid Top Left, Concentric Circles Bottom Right) */}
      <div className="pointer-events-none absolute left-6 top-10 opacity-25 hidden sm:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="#00a8a0">
          <circle cx="6" cy="6" r="1.5" />
          <circle cx="22" cy="6" r="1.5" />
          <circle cx="38" cy="6" r="1.5" />
          <circle cx="54" cy="6" r="1.5" />
          <circle cx="6" cy="22" r="1.5" />
          <circle cx="22" cy="22" r="1.5" />
          <circle cx="38" cy="22" r="1.5" />
          <circle cx="54" cy="22" r="1.5" />
          <circle cx="6" cy="38" r="1.5" />
          <circle cx="22" cy="38" r="1.5" />
          <circle cx="38" cy="38" r="1.5" />
          <circle cx="54" cy="38" r="1.5" />
        </svg>
      </div>

      <div className="pointer-events-none absolute -right-16 -bottom-16 opacity-20 hidden md:block">
        <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="40" stroke="#00a8a0" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="#00a8a0" strokeWidth="1" />
          <circle cx="100" cy="100" r="100" stroke="#00a8a0" strokeWidth="1" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              THE MATH
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            What faster response <br className="hidden sm:inline" />
            actually <span className="text-[#00a8a0]">adds up to</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Every second matters. Here’s what law firms gain with instant, 24/7
            intake.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 HORIZONTAL CARDS WITH CONNECTING DOTS */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-3 max-w-6xl mx-auto">
          {mathCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="flex-1 flex flex-col lg:flex-row items-center gap-3"
              >
                {/* Card Item */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="w-full flex-1 flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300 min-h-[190px]"
                >
                  {/* Top Row: Icon + Counter Number */}
                  <div className="flex items-center gap-4 mb-4">
                    {/* Icon Container */}
                    <div className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eaf7f6] border border-[#c6ece9]">
                      <IconComponent />
                    </div>

                    {/* Animated Counter Stat */}
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {card.renderCounter()}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </motion.div>

                {/* Connecting Teal Dot between Cards (Desktop only) */}
                {index < mathCards.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#00a8a0] shrink-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
