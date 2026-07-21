"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Search,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

// ============================================================================
// Custom SVG for the filled chat icon — matches the reference design exactly
// ============================================================================
const ChatFilledIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current text-primary">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    <circle cx="8" cy="10" r="1.5" fill="white" />
    <circle cx="12" cy="10" r="1.5" fill="white" />
    <circle cx="16" cy="10" r="1.5" fill="white" />
  </svg>
);

// ============================================================================
// DATA
// ============================================================================
type TimelineStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  // Tailwind translate classes staggering each node along the SVG curve
  translateX: string;
  hasBorder: boolean;
};

const STEPS: TimelineStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Scan",
    description: "BayAI crawls your pages automatically.",
    icon: <Search className="h-7 w-7 text-primary" strokeWidth={2.5} />,
    translateX: "translate-x-[20px]",
    hasBorder: true,
  },
  {
    id: "step-2",
    number: "02",
    title: "Train",
    description: "Your chatbot is trained — live in minutes.",
    icon: <GraduationCap className="h-7 w-7 text-primary" strokeWidth={2.5} />,
    translateX: "translate-x-[36px]",
    hasBorder: true,
  },
  {
    id: "step-3",
    number: "03",
    title: "Respond",
    description: "Answers questions instantly & accurately.",
    icon: <ChatFilledIcon />,
    translateX: "translate-x-[12px]",
    hasBorder: false,
  },
];

const STATS = [
  {
    icon: Zap,
    title: "Setup in Minutes",
    description: "No coding. No complexity. Just results.",
  },
  {
    icon: TrendingUp,
    title: "More Conversations",
    description: "Engage every visitor instantly.",
  },
  {
    icon: User,
    title: "More Leads & Sales",
    description: "Capture leads and convert more customers.",
  },
];

// ============================================================================
// ROBOT ILLUSTRATION (left visual)
// ============================================================================
const RobotIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    className="relative mx-auto w-full max-w-md"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/assets/how-its-work.png"
        alt="BayAI robot assistant scanning a website and responding to chats from a laptop"
        width={630}
        height={414}
        className="h-auto w-full"
      />
    </motion.div>
  </motion.div>
);

// ============================================================================
// STEPPER (right column) — curve + numbered nodes + copy rows
// ============================================================================
// Explicit pixel height for the two stepper columns. Both columns rely on
// h-full / justify-between to place the numbered nodes and copy rows —
// without a definite height on this wrapper, that math has nothing to
// resolve against and the layout collapses (nodes/rows overlap or scatter
// with huge gaps between them, at every viewport width).
const STEPPER_HEIGHT = 516;

const Stepper = () => (
  <div className="relative flex w-full max-w-lg" style={{ height: STEPPER_HEIGHT }}>
    {/* LEFT: SVG curve & number nodes */}
    <div className="relative w-28 shrink-0 py-8 sm:w-32">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 20 5 Q 70 25 70 50 T 15 95"
          fill="none"
          stroke="#80e5e0"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.circle
          cx="20"
          cy="5"
          r="2.5"
          fill="#00e0da"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx="15"
          cy="95"
          r="2.5"
          fill="#00e0da"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.1 }}
        />
      </svg>

      <div className="relative z-10 flex h-full flex-col items-start justify-between py-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={`num-${step.id}`}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ scale: 1.06 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.25 + i * 0.35,
            }}
            className={`flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-extrabold text-primary-dark shadow-[0_12px_40px_-10px_rgba(0,224,218,0.25)] ${step.translateX}`}
          >
            {step.number}
          </motion.div>
        ))}
      </div>
    </div>

    {/* RIGHT: content + dashed dividers */}
    <div className="ml-4 flex flex-1 flex-col justify-between py-14">
      {STEPS.map((step, i) => (
        <motion.div
          key={`content-${step.id}`}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.35 + i * 0.35,
          }}
          className="relative flex min-h-20 flex-col justify-center"
        >
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary/20"
            >
              {step.icon}
            </motion.div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-thunder-black">
                {step.title}
              </h3>
              <p className="max-w-[220px] text-base leading-snug text-gray-600">
                {step.description}
              </p>
            </div>
          </div>

          {step.hasBorder && (
            <div className="absolute -bottom-8 left-0 right-0 border-b border-dashed border-gray-300" />
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// ============================================================================
// STATS STRIP
// ============================================================================
const StatsStrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    className="mt-14 grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.15)] sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gray-100"
  >
    {STATS.map((stat) => {
      const Icon = stat.icon;
      return (
        <motion.div
          key={stat.title}
          whileHover={{ y: -3 }}
          className="flex items-center justify-center gap-3 px-2 text-center sm:px-6 lg:justify-start lg:text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h4 className="text-sm font-bold text-thunder-black">{stat.title}</h4>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </div>
        </motion.div>
      );
    })}
  </motion.div>
);

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================
const HowItsWork = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* --- Left: intro + illustration --- */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              How It Works
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-thunder-black sm:text-4xl lg:text-[42px]"
            >
              From website URL to Real{" "}
              <span className="text-primary">Business Results</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mb-10 max-w-md text-base text-gray-600 sm:text-lg lg:mx-0"
            >
              Eight steps, fully automatic — from setup, to training, to
              responding, to growing your business.
            </motion.p>

            <RobotIllustration />
          </div>

          {/* --- Right: stepper --- */}
          <div className="flex justify-center lg:justify-start">
            <Stepper />
          </div>
        </div>

        <StatsStrip />
      </div>
    </section>
  );
};

export default HowItsWork;
