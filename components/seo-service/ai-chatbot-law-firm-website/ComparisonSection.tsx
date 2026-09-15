"use client";

import { motion } from "framer-motion";

// Capability Row Icons
function Clock247Icon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg>
    </div>
  );
}

function LightningIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    </div>
  );
}

function UserCheckIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    </div>
  );
}

function SetupClockIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="12" x2="12" y2="8" />
        <line x1="12" y1="12" x2="15" y2="12" />
      </svg>
    </div>
  );
}

function PuzzleIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-[#e6f7f5] border border-[#c6ece9] flex items-center justify-center text-[#00a8a0] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a2.41 2.41 0 0 0-3.408-3.408l-1.568 1.568c-.23.23-.556.338-.878.289a2.41 2.41 0 0 0-2.735 2.735c.049.322-.059.648-.289.878l-1.568 1.568a2.41 2.41 0 0 0 3.408 3.408l1.568-1.568c.23-.23.556-.338.878-.289a2.41 2.41 0 0 0 2.735-2.735z" />
      </svg>
    </div>
  );
}

// Status Indicator Helpers
function RedNo() {
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium text-xs sm:text-sm">
      <svg className="w-4 h-4 text-rose-500 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      No
    </span>
  );
}

function AmberWarning({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-amber-600 font-medium text-xs sm:text-sm">
      <svg className="w-4 h-4 text-amber-500 stroke-[2.5] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      {text}
    </span>
  );
}

function TealCheck({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#00a8a0] font-bold text-xs sm:text-sm">
      <div className="w-6 h-6 rounded-full bg-[#00a8a0] text-white flex items-center justify-center shrink-0 shadow-xs">
        <svg className="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {text}
    </span>
  );
}

const tableRows = [
  {
    icon: Clock247Icon,
    capability: "24/7 availability",
    contactForm: <RedNo />,
    liveChat: <AmberWarning text="Only if staffed" />,
    goConverto: <TealCheck text="Yes" />,
  },
  {
    icon: LightningIcon,
    capability: "Instant response",
    contactForm: <RedNo />,
    liveChat: <AmberWarning text="Depends on staff" />,
    goConverto: <TealCheck text="Under 2 seconds" />,
  },
  {
    icon: UserCheckIcon,
    capability: "Preliminary screening",
    contactForm: <RedNo />,
    liveChat: <RedNo />,
    goConverto: <TealCheck text="Yes" />,
  },
  {
    icon: SetupClockIcon,
    capability: "Setup time",
    contactForm: <span className="text-slate-600 font-normal text-xs sm:text-sm">~ Minutes</span>,
    liveChat: <span className="text-slate-600 font-normal text-xs sm:text-sm">~ Hours</span>,
    goConverto: <TealCheck text="Minutes" />,
  },
  {
    icon: PuzzleIcon,
    capability: "Case management integration",
    contactForm: <span className="text-rose-500 font-semibold text-xs sm:text-sm">Manual</span>,
    liveChat: <span className="text-slate-600 font-normal text-xs sm:text-sm">Sometimes</span>,
    goConverto: <TealCheck text="Built-in" />,
  },
];

export default function ComparisonSection() {
  return (
    <section className="relative bg-white py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
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
              COMPARISON
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Go Converto vs. traditional intake
          </h2>

          {/* Subtitle Description */}
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base font-normal">
            See how Go Converto delivers faster, smarter, and better results.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* COMPARISON MATRIX TABLE WITH HIGHLIGHTED RIGHT CARD HOVER EFFECT */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-x-auto"
        >
          <div className="min-w-[700px] grid grid-cols-12 items-stretch gap-4">
            
            {/* LEFT 3 COLUMNS TABLE PORTION (Cols 1-8) */}
            <div className="col-span-8 flex flex-col justify-between">
              
              {/* Header Row */}
              <div className="grid grid-cols-8 gap-4 items-center pb-4">
                <div className="col-span-4 bg-[#e8f6f5] rounded-xl px-4 py-3 flex items-center w-max">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0]">
                    CAPABILITY
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    CONTACT FORM
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    LIVE CHAT WIDGET
                  </span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-slate-100">
                {tableRows.map((row, idx) => {
                  const IconComp = row.icon;
                  return (
                    <div key={idx} className="grid grid-cols-8 gap-4 items-center py-4">
                      {/* Capability */}
                      <div className="col-span-4 flex items-center gap-3 pr-2">
                        <IconComp />
                        <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {row.capability}
                        </span>
                      </div>

                      {/* Contact Form */}
                      <div className="col-span-2 text-center flex items-center justify-center">
                        {row.contactForm}
                      </div>

                      {/* Live Chat Widget */}
                      <div className="col-span-2 text-center flex items-center justify-center">
                        {row.liveChat}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT-MOST HIGHLIGHTED CARD COLUMN WITH HOVER EFFECT (Cols 9-12) */}
            <motion.div
              whileHover={{ scale: 1.025, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="col-span-4 flex flex-col justify-between rounded-2xl border-2 border-[#00a8a0] bg-gradient-to-b from-[#f4faf9] to-[#edf8f6] p-4 sm:p-5 shadow-md hover:shadow-2xl hover:border-[#00968f] transition-all duration-300 cursor-pointer"
            >
              {/* Header */}
              <div className="text-center pb-3 pt-1 border-b border-[#00a8a0]/20">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00a8a0]">
                  GO CONVERTO
                </span>
              </div>

              {/* Data Rows matching left table */}
              <div className="divide-y divide-[#00a8a0]/15 flex-1 flex flex-col justify-between">
                {tableRows.map((row, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-start py-3.5 px-3 rounded-lg hover:bg-white/60 transition-colors duration-200"
                  >
                    {row.goConverto}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
