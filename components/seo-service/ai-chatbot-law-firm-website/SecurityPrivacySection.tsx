"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counter Component for smooth count-up animation
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

function LockIcon() {
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
      <rect x="8" y="14" width="20" height="15" rx="3" fill="#e8f6f5" />
      <path d="M12 14V10C12 6.68629 14.6863 4 18 4C21.3137 4 24 6.68629 24 10V14" />
      <circle cx="18" cy="21" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SlashCircleIcon() {
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
      <line x1="9" y1="27" x2="27" y2="9" />
    </svg>
  );
}

function ShieldCheckIcon() {
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
      <path d="M13 17L16.5 20.5L23 13" strokeWidth="2.5" />
    </svg>
  );
}

function UserCheckIcon() {
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
      <circle cx="15" cy="12" r="4.5" />
      <path d="M6 25C6 21.5 9 20 15 20C17 20 18.5 20.3 20 21" />
      <circle cx="25" cy="24" r="5" fill="#e8f6f5" />
      <path d="M22.5 24L24 25.5L27.5 22" strokeWidth="2" />
    </svg>
  );
}

const securityCards = [
  {
    id: "01",
    icon: LockIcon,
    title: "Encrypted in transit",
    description:
      "AI conversations and case details are encrypted end to end.",
  },
  {
    id: "02",
    icon: SlashCircleIcon,
    title: "No data resale",
    description:
      "Prospective client information is never sold or shared with third parties.",
  },
  {
    id: "03",
    icon: ShieldCheckIcon,
    title: "Compliance-ready",
    description:
      "Built with GDPR-aligned data handling for firms serving global clients.",
  },
  {
    id: "04",
    icon: UserCheckIcon,
    title: "You stay in control",
    description:
      "Export or delete captured case data whenever you need to.",
  },
];

export default function SecurityPrivacySection() {
  const trialRef = useRef<HTMLDivElement>(null);
  const isTrialInView = useInView(trialRef, { once: true, margin: "-40px" });

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
              SECURITY & PRIVACY
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Client information, protected
          </h2>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Built with security by design, so you can focus on what matters most — <br className="hidden sm:inline" />
            your clients.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {securityCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-start rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300 min-h-[220px]"
              >
                {/* Icon Container */}
                <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#eaf7f6] border border-[#c6ece9] mb-6 transition-transform duration-300 group-hover:scale-105">
                  <IconComponent />
                </div>

                {/* Small Teal Dash Line */}
                <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-3 rounded-full" />

                {/* Card Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM 14-DAY FREE TRIAL BANNER WITH ANIMATED CIRCULAR BADGE */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#edf8f7] border border-[#cbece9] rounded-2xl sm:rounded-3xl p-6 sm:p-10 mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-8 shadow-xs relative overflow-hidden"
        >
          {/* Left Circular Trial Badge */}
          <div ref={trialRef} className="shrink-0 flex flex-col items-center justify-center relative w-36 h-36">
            {/* Background SVG Ring with Dotted & Arc stroke */}
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#c2e6e3"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="#00a8a0"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ strokeDasharray: "314", strokeDashoffset: 314 }}
                animate={isTrialInView ? { strokeDashoffset: 80 } : { strokeDashoffset: 314 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
            </svg>

            {/* Inner Badge Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <div className="text-xl sm:text-2xl font-bold text-[#00a8a0] leading-tight">
                <AnimatedCounter from={0} to={14} suffix=" day" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#00a8a0] leading-tight mt-0.5">
                free trial
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden sm:block w-[1px] h-28 bg-[#c2e6e3] shrink-0" />

          {/* Right Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Try it free. Cancel anytime.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl">
              Every plan starts with a full{" "}
              <strong className="font-bold text-[#00a8a0]">14-day free trial</strong> — no credit card tricks, no long-term contract. If Go Converto doesn&apos;t capture more qualified consultations than your current intake process, cancel with one click before you&apos;re ever billed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
