"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsCheckCircleFill } from "react-icons/bs";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative bg-white py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - 14-Day Free Trial
            </span>
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Start getting tours on your calendar today with a 14-day trial
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg max-w-2xl mx-auto mb-6">
            No extended contracts. Walk away whenever you want. Try it out & Cancel whenever you don&apos;t need it.
          </p>

          {/* Banner Box */}
          <div className="max-w-3xl mx-auto rounded-2xl bg-[#f2fbfb] border border-teal-100 p-5 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
            Every tier starts with a full two-week trial. No hidden fees, no credit card tricks, and zero long-term commitments. If this tool doesn&apos;t put more qualified buyers on your calendar than your current setup, just cancel with a single click before you are ever charged.
          </div>
        </motion.div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          
          {/* Professional Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs hover:border-[#00a8a0]/40 transition-all"
          >
            <div>
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900">Professional</h3>
                <p className="text-xs text-gray-500 font-medium">Best for solo agents</p>
              </div>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-gray-900">$42</span>
                <span className="text-sm text-gray-500 font-medium">/mo</span>
                <p className="text-xs text-gray-400 mt-1 font-mono">Billed $499 annually | 14-day free trial</p>
              </div>

              <ul className="space-y-3.5 border-t border-gray-100 pt-6 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Setup takes 5 minutes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>1,000 monthly conversations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Form-free lead capture</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Live analytics tracking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Automated calendar booking</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/start-free-trial"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00a8a0] bg-white px-5 py-3 text-sm font-semibold text-[#00a8a0] hover:bg-[#00a8a0] hover:text-white transition-all shadow-xs"
              >
                Start free trial
                <BsArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Advanced Plan (Most Popular) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex flex-col justify-between rounded-3xl border-2 border-[#00a8a0] bg-white p-6 sm:p-8 shadow-xl shadow-teal-900/10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#00a8a0] px-4 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-xs">
              Most Popular
            </div>

            <div>
              <div className="mb-2 pt-2">
                <h3 className="text-xl font-bold text-gray-900">Advanced</h3>
                <p className="text-xs text-gray-500 font-medium">The sweet spot for teams and small brokerages</p>
              </div>

              <div className="my-6">
                <span className="text-4xl font-extrabold text-gray-900">$83</span>
                <span className="text-sm text-gray-500 font-medium">/mo</span>
                <p className="text-xs text-gray-400 mt-1 font-mono">Billed $999 annually | 14-day free trial</p>
              </div>

              <ul className="space-y-3.5 border-t border-gray-100 pt-6 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Everything in the Professional tier</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>2,500 monthly conversations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Multi-agent team logins</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Priority tech support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>CRM and social media connections</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/start-free-trial"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a8a0] px-5 py-3 text-sm font-semibold text-white hover:bg-[#00968f] transition-all shadow-md"
              >
                Start free trial
                <BsArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs hover:border-[#00a8a0]/40 transition-all"
          >
            <div>
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                <p className="text-xs text-gray-500 font-medium">Custom builds for massive brokerages</p>
              </div>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-gray-900">Custom Pricing</span>
                <p className="text-xs text-gray-400 mt-1 font-mono">Designed entirely to your volume</p>
              </div>

              <ul className="space-y-3.5 border-t border-gray-100 pt-6 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Unlimited monthly conversations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Bespoke system training</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Customized integrations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="h-4 w-4 text-[#00a8a0] shrink-0" />
                  <span>Dedicated account management</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-all shadow-xs"
              >
                Contact sales
                <BsArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
