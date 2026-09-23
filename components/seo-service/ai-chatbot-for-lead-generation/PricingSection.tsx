"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    id: "professional",
    name: "Professional",
    price: "$42",
    period: "/month",
    billingNote: "Billed at $499 annually · 14 day free trial",
    badge: "Starter Choice",
    features: [
      "AI training",
      "1,000 conversations per month",
      "AI lead capture",
      "Real time analytics",
      "Automated Calendly scheduling",
    ],
    ctaText: "Start Free Trial",
    ctaHref: "/start-free-trial",
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "$83",
    period: "/month",
    billingNote: "Billed at $999 annually · 14 day free trial",
    badge: "Most popular",
    features: [
      "Everything in Professional",
      "2,500 conversations per month",
      "Team member access",
      "Priority support and account management",
      "CRM and social integrations",
    ],
    ctaText: "Start Free Trial",
    ctaHref: "/start-free-trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom pricing",
    period: "",
    billingNote: "Pricing depends on usage and the required setup.",
    badge: "Custom Scale",
    features: [
      "Unlimited conversations",
      "Custom AI training",
      "Custom integrations",
      "Custom SLA and onboarding",
    ],
    ctaText: "Contact Sales",
    ctaHref: "/contact-sales",
  },
];

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              - cost
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mx-auto">
            Choose the plan that fits your lead volume.
          </h2>

          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg font-normal">
            Start capturing leads in a 14 day free trial without any long term contract. Cancel whenever you want.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
          onMouseLeave={() => setHoveredIndex(1)}
        >
          {plans.map((plan, index) => {
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
                    : "border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00a8a0] text-white text-xs font-bold px-4 py-1 rounded-md shadow-xs z-10">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                    {plan.name}
                  </h3>
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
                  <p className="text-xs text-slate-400 font-medium mb-6">
                    {plan.billingNote}
                  </p>

                  <div className="h-[1.5px] w-12 bg-[#00a8a0] mb-6" />

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                        <span className="text-[#00a8a0] font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`block w-full text-center py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isHighlighted
                      ? "bg-[#00a8a0] text-white hover:bg-[#00968f] shadow-md"
                      : "border border-[#00a8a0] text-[#00a8a0] hover:bg-[#00a8a0] hover:text-white"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
