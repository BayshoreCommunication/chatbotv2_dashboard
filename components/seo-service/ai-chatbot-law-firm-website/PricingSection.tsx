"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// Icons matching the image design
function BriefcaseIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#00a8a0]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#00a8a0] shrink-0 stroke-[2.5]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-[#00a8a0] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

const plans = [
  {
    id: "professional",
    name: "Professional",
    tagline: "Ideal for growing firms",
    price: "$42",
    period: "/mo",
    billingNote: "Billed $499 annually • 14-day free trial",
    badge: "Starter Choice",
    icon: BriefcaseIcon,
    features: [
      "AI training in 5 minutes",
      "1,000 conversations per month",
      "AI & human takeover",
      "AI case intake — no forms",
      "Automated consultation scheduling",
    ],
    ctaText: "Start free trial",
    ctaHref: "/start-free-trial",
  },
  {
    id: "advanced",
    name: "Advanced",
    tagline: "Maximum value for multi-attorney firms",
    price: "$83",
    period: "/mo",
    billingNote: "Billed $999 annually • 14-day free trial",
    badge: "Most popular",
    icon: StarIcon,
    features: [
      "Everything in Professional",
      "2,500 conversations per month",
      "Team member access",
      "Priority support & account manager",
      "Case management integrations",
    ],
    ctaText: "Start free trial",
    ctaHref: "/start-free-trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom solutions for large firms",
    price: "Custom",
    period: "",
    billingNote: "Tailored to your usage",
    badge: "Custom Scale",
    icon: BuildingIcon,
    features: [
      "Unlimited conversations",
      "Fully custom AI training",
      "Custom integrations",
      "Custom SLA & onboarding",
    ],
    ctaText: "Contact sales",
    ctaHref: "/contact-sales",
  },
];

export default function PricingSection() {
  // Middle card (index 1) active by default, updates dynamically on hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
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
          {/* Top Line Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              PRICING
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Start screening cases in a <br className="hidden sm:inline" />
            14-day free trial
          </h2>

          {/* Subtitle */}
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            No long-term contract. Cancel whenever you want.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* PRICING CARDS GRID WITH DYNAMIC HOVER HIGHLIGHT */}
        {/* ========================================================================= */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-10"
          onMouseLeave={() => setHoveredIndex(1)}
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isHighlighted = hoveredIndex === index;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 cursor-pointer ${
                  isHighlighted
                    ? "border-2 border-[#00a8a0] bg-gradient-to-b from-[#f7fcfa] to-white shadow-xl -translate-y-1.5"
                    : "border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-md"
                }`}
              >
                {/* Dynamic Top Badge */}
                {isHighlighted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00a8a0] text-white text-xs font-bold px-4 py-1 rounded-md shadow-xs z-10"
                  >
                    {plan.badge}
                  </motion.div>
                )}

                <div>
                  {/* Top Circle Icon */}
                  <div className={`mb-6 flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
                    isHighlighted ? "bg-[#e6f7f5] border border-[#00a8a0]/40" : "bg-[#e6f7f5] border border-[#c6ece9]"
                  }`}>
                    <IconComponent />
                  </div>

                  {/* Plan Name & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 leading-snug">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-5 font-normal">
                    {plan.tagline}
                  </p>

                  {/* Accent Line */}
                  <div className={`h-[1.5px] w-12 mb-6 transition-all duration-300 ${
                    isHighlighted ? "bg-[#00a8a0] w-16" : "bg-[#00a8a0]/30"
                  }`} />

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-base font-normal text-slate-500">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Billing Note */}
                  <p className="text-xs text-slate-400 font-medium mb-8">
                    {plan.billingNote}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic CTA Button */}
                <Link
                  href={plan.ctaHref}
                  className={`block w-full text-center py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isHighlighted
                      ? "bg-[#00a8a0] text-white hover:bg-[#00968f] shadow-md hover:shadow-lg"
                      : "border border-[#00a8a0] text-[#00a8a0] hover:bg-[#00a8a0] hover:text-white"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM TRUST BADGE FOOTER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-slate-500"
        >
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheckIcon />
            <span>Enterprise-grade security</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">GDPR-aligned</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Your data, always protected</span>
        </motion.div>

      </div>
    </section>
  );
}
