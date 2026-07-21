"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaBalanceScale,
  FaGraduationCap,
  FaHeartbeat,
  FaHome,
  FaMicrochip,
  FaShoppingBag,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

// ============================================================================
// DATA
// ============================================================================
interface Industry {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

const INDUSTRIES: Industry[] = [
  {
    icon: FaMicrochip,
    title: "Tech Company",
    description:
      "Answers product, pricing, and integration questions instantly, triages support tickets, and routes qualified demo requests to your sales team — without adding headcount.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: FaHeartbeat,
    title: "Healthcare",
    description:
      "Handles appointment scheduling, insurance questions, and clinic hours around the clock — freeing your front desk to focus on patients in the room.",
    gradient: "from-rose-600 via-red-500 to-orange-400",
  },
  {
    icon: FaHome,
    title: "Real Estate",
    description:
      "Qualifies buyers and renters, shares listing details instantly, and books showings — so no lead goes cold waiting for a callback.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
  {
    icon: FaShoppingBag,
    title: "E-commerce & Retail",
    description:
      "Tracks orders, answers sizing and shipping questions, and recovers abandoned carts with instant, on-brand replies — 24/7, every time zone.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: FaBalanceScale,
    title: "Legal Services",
    description:
      "Screens new inquiries, explains your practice areas, and books consultations — giving your team qualified leads instead of cold intake calls.",
    gradient: "from-slate-700 via-slate-600 to-slate-400",
  },
  {
    icon: FaGraduationCap,
    title: "Education",
    description:
      "Guides prospective students through programs, admissions, and deadlines, and hands off enrollment-ready leads to your team.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
];

// ============================================================================
// INDUSTRY CARD — reveals as it scrolls into view
// ============================================================================
const IndustryCard = ({ industry, index }: { industry: Industry; index: number }) => {
  const Icon = industry.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: Math.min(index, 3) * 0.08,
      }}
      className="flex flex-col items-start gap-6 rounded-2xl bg-gray-50 p-7 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${industry.gradient} text-white shadow-lg shadow-primary/20`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-thunder-black">
          {industry.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-gray-600">
          {industry.description}
        </p>
      </div>

      <div
        className={`relative h-56 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br sm:h-64 sm:w-64 ${industry.gradient}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-thunder-black/30 via-transparent to-transparent" />
        <Icon className="absolute bottom-4 right-4 h-16 w-16 text-white/25" />
      </div>
    </motion.div>
  );
};

// ============================================================================
// INDUSTRIES SECTION
// ============================================================================
const IndustriesSections = () => {
  return (
    <section id="industries" className="bg-white py-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* --- Left: sticky intro --- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
          >
            <HiSparkles className="h-4 w-4 text-primary" />
            AI Chatbot for Your Business
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-thunder-black sm:text-4xl lg:text-[42px]"
          >
            Built to Scale With Your Business One Platform.{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text italic text-transparent">
              Endless Possibilities
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="max-w-md text-base text-gray-600 sm:text-lg"
          >
            Whatever industry you&apos;re in, BayAI trains itself on your
            content and speaks your customers&apos; language from day one.
          </motion.p>
        </div>

        {/* --- Right: industry cards, reveal one by one on scroll --- */}
        <div className="flex flex-col gap-6">
          {INDUSTRIES.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSections;
