"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { FaQuoteLeft } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

// Animated Count-Up Hook that triggers when in view
function useCounter(target: number, duration: number = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease-out cubic formula
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(target);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

export default function SocialProofSection() {
  const stat1 = useCounter(41);
  const stat2 = useCounter(13);

  return (
    <section className="relative bg-[#fafcfd] py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          {/* Top Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-2.5">
            <span className="h-0.5 w-6 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
              SOCIAL PROOF
            </span>
            <span className="h-0.5 w-6 bg-primary" />
          </div>

          {/* Main Title */}
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Firms using Go Converto <br className="hidden sm:inline" />
            to screen and book more cases
          </h2>

          {/* Subtitle */}
          <p className="text-base text-gray-500 sm:text-lg">
            Real results from real law firms.
          </p>
        </div>

        {/* Main Grid: Left Testimonial Card, Right Stat Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Large Testimonial Card */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between rounded-3xl border border-gray-100 border-l-4 border-l-primary bg-white p-7 shadow-xl shadow-gray-200/50 sm:p-10 lg:col-span-7"
          >
            <div>
              {/* Quote Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaQuoteLeft className="h-5 w-5" />
              </div>

              {/* Quote Text */}
              <blockquote className="mb-8 text-base font-medium leading-relaxed text-gray-800 sm:text-lg md:text-xl">
                &ldquo;We used to lose after-hours inquiries completely. Now
                every visitor gets screened by practice area automatically, and
                intake only follows up with cases that are actually a fit.&rdquo;
              </blockquote>
            </div>

            {/* Author Info Footer */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                MC
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 sm:text-lg">
                  Maria Carter
                </h4>
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  Managing Partner, Carter Injury Law
                </p>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 2 Stacked Metric Cards with Counter */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 lg:col-span-5 justify-between">
            
            {/* Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-1 items-center gap-6 rounded-3xl border border-gray-100 bg-white p-7 shadow-xl shadow-gray-200/50 sm:p-8"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FiTrendingUp className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-baseline text-3xl font-bold font-serif text-primary sm:text-4xl lg:text-[40px]">
                  <span>+</span>
                  <span ref={stat1.ref}>{stat1.count}</span>
                  <span>%</span>
                </div>
                <div className="my-2 h-0.5 w-12 bg-primary" />
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  more consultations booked in 90 days
                </p>
              </div>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-1 items-center gap-6 rounded-3xl border border-gray-100 bg-white p-7 shadow-xl shadow-gray-200/50 sm:p-8"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BiTimeFive className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-baseline gap-1 text-3xl font-bold font-serif text-primary sm:text-4xl lg:text-[40px]">
                  <span ref={stat2.ref}>{stat2.count}</span>
                  <span className="text-2xl font-normal sm:text-3xl">hrs</span>
                </div>
                <div className="my-2 h-0.5 w-12 bg-primary" />
                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                  saved per week on unqualified intake calls
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
