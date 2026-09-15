"use client";

import { motion } from "framer-motion";

// Custom SVG Icons matching the design pixel-for-pixel

function SpeechBubbleIcon() {
  return (
    <svg
      className="w-10 h-10 sm:w-11 sm:h-11 text-[#00a8a0]"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 36L8 40V33C5.5 30 4 26 4 22C4 12 13 4 24 4C35 4 44 12 44 22C44 32 35 40 24 40C20 40 16 38.5 12 36Z" />
      <circle cx="16" cy="22" r="2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="22" r="2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="22" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EditableDocIcon() {
  return (
    <svg
      className="w-10 h-10 sm:w-11 sm:h-11 text-[#00a8a0]"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Document rectangle with lines */}
      <rect x="8" y="6" width="26" height="36" rx="4" />
      <line x1="14" y1="14" x2="26" y2="14" />
      <line x1="14" y1="20" x2="26" y2="20" />
      <line x1="14" y1="26" x2="20" y2="26" />
      {/* Pencil */}
      <path d="M26 38L38 26L42 30L30 42L24 44L26 38Z" fill="#e8f6f5" />
      <line x1="30" y1="22" x2="36" y2="28" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      className="w-10 h-10 sm:w-11 sm:h-11 text-[#00a8a0]"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Headband */}
      <path d="M8 24C8 15.163 15.163 8 24 8C32.837 8 40 15.163 40 24" />
      {/* Left ear cup */}
      <rect x="6" y="22" width="6" height="14" rx="3" fill="#e8f6f5" />
      {/* Right ear cup */}
      <rect x="36" y="22" width="6" height="14" rx="3" fill="#e8f6f5" />
      {/* Mic stem & tip */}
      <path d="M12 33C12 38 16 41 22 41H25" />
      <circle cx="27" cy="41" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WidgetIcon() {
  return (
    <svg
      className="w-10 h-10 sm:w-11 sm:h-11 text-[#00a8a0]"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main browser window */}
      <rect x="6" y="8" width="36" height="32" rx="4" />
      <line x1="6" y1="16" x2="42" y2="16" />
      {/* Inner widget box on left */}
      <rect x="10" y="20" width="16" height="16" rx="2" fill="#e8f6f5" />
      <line x1="14" y1="24" x2="22" y2="24" />
      <line x1="14" y1="28" x2="20" y2="28" />
    </svg>
  );
}

const customizationCards = [
  {
    id: "01",
    icon: SpeechBubbleIcon,
    title: "Matches your firm's tone",
    description:
      "Trained on your own content, so it sounds like your intake team — not a template.",
  },
  {
    id: "02",
    icon: EditableDocIcon,
    title: "Editable intake questions",
    description:
      "Review and adjust the screening flow to fit your actual intake process.",
  },
  {
    id: "03",
    icon: HeadsetIcon,
    title: "Human takeover, anytime",
    description:
      "Step into a live conversation whenever a case needs a personal touch.",
  },
  {
    id: "04",
    icon: WidgetIcon,
    title: "Widget matches your site",
    description:
      "Colors, position, and styling adapt to your existing design — looks like it's always been there.",
  },
];

export default function CustomizationSection() {
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
          {/* Top Line Kicker Badge with Horizontal Line Segment Accents */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              CUSTOMIZATION
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Your firm’s voice, <br className="hidden sm:inline" />
            your <span className="text-[#00a8a0]">intake process</span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            This isn’t a generic, robotic script. Every conversation reflects how your firm actually talks to prospective clients.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2x2 CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {customizationCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="group flex items-start gap-5 sm:gap-6 rounded-2xl sm:rounded-3xl border border-slate-100/90 bg-white p-7 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-slate-200 transition-all duration-300"
              >
                {/* Left Circular Icon Container */}
                <div className="shrink-0 flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#eaf7f6] border border-[#c6ece9] transition-transform duration-300 group-hover:scale-105">
                  <IconComponent />
                </div>

                {/* Right Content */}
                <div className="flex-1 pt-1">
                  {/* Small Teal Dash Line */}
                  <div className="h-[2.5px] w-7 bg-[#00a8a0] mb-2.5 rounded-full" />

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm md:text-[15px] text-slate-500 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
