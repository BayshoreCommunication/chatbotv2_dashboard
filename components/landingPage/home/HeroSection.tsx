"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsArrowRight, BsPlayFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ============================================================================
// DATA
// ============================================================================
const TRUSTED_LOGOS = [
  { icon: "⬡", name: "Northwind" },
  { icon: "◆", name: "Vertex Labs" },
  { icon: "●", name: "Brightside Co." },
  { icon: "▲", name: "Alderan" },
  { icon: "■", name: "Lumen Group" },
  { icon: "◈", name: "Crestline" },
  { icon: "✦", name: "Solace Retail" },
];

const URL_TEXT = "yourbusiness.com";

// ============================================================================
// COUNT-UP HOOK — mirrors the ease-out-cubic count animation from the
// original design (animateCount in bayai-landing.html)
// ============================================================================
function useCountUp(
  target: number,
  {
    duration = 1400,
    delay = 0,
    format,
    suffix = "",
  }: { duration?: number; delay?: number; format?: "comma"; suffix?: string }
) {
  const [display, setDisplay] = useState(() => `0${suffix}`);

  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const rounded = Math.round(target * eased);
      const formatted =
        format === "comma" ? rounded.toLocaleString("en-US") : String(rounded);
      setDisplay(`${formatted}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, format, suffix]);

  return display;
}

// ============================================================================
// GROWTH VISUAL CARD (right column)
// ============================================================================
const GrowthVisualCard = () => {
  const [typedChars, setTypedChars] = useState(0);
  const [trainStage, setTrainStage] = useState<"scanning" | "ready">(
    "scanning"
  );

  const revenuePct = useCountUp(38, { delay: 250, suffix: "%" });
  const revenue = useCountUp(24180, { delay: 330, format: "comma" });
  const leads = useCountUp(312, { delay: 410 });
  const hoursSaved = useCountUp(119, { delay: 490 });
  const moneySaved = useCountUp(4920, { delay: 570, format: "comma" });

  // Typewriter effect for the scanned URL, then flip the training chip
  // from "scanning" to "chat is live" — same beats as the source design.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const startTyping = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setTypedChars(i);
        if (i >= URL_TEXT.length) clearInterval(interval);
      }, 1400 / URL_TEXT.length);
    }, 900);

    const flipStage = setTimeout(() => setTrainStage("ready"), 4500);

    return () => {
      clearTimeout(startTyping);
      clearTimeout(flipStage);
      clearInterval(interval);
    };
  }, []);

  const urlTyped = URL_TEXT.slice(0, typedChars);
  const urlDone = typedChars >= URL_TEXT.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative mx-9 my-7 w-full max-w-[460px] rounded-2xl bg-white/[0.36] p-7 pb-14 shadow-[0_30px_60px_-20px_rgba(138,138,138,0.18)]"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">
            Revenue Impact
          </div>
          <div className="mt-0.5 text-xs text-gray-400">Since adding BayAI</div>
        </div>
        <span className="relative top-[50px] inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
          <span>▲</span> +{revenuePct}
        </span>
      </div>

      {/* Big number */}
      <div className="text-[38px] font-extrabold tracking-tight text-thunder-black">
        ${revenue}
      </div>
      <div className="mb-4 mt-0.5 text-[13px] text-gray-600">
        Extra revenue captured this month
      </div>

      {/* Growth chart */}
      <svg
        className="block h-40 w-full overflow-visible"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e0da" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#00e0da" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1="0" y1="40" x2="400" y2="40" stroke="#e5e7eb" strokeDasharray="4 5" />
        <line x1="0" y1="90" x2="400" y2="90" stroke="#e5e7eb" strokeDasharray="4 5" />
        <line x1="0" y1="140" x2="400" y2="140" stroke="#e5e7eb" strokeDasharray="4 5" />

        <motion.path
          d="M0,140 C40,135 60,120 90,118 C130,115 150,95 190,88 C230,80 250,60 290,48 C330,38 360,25 400,10 L400,160 L0,160 Z"
          fill="url(#fillGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
        />

        <motion.path
          d="M0,140 C40,135 60,120 90,118 C130,115 150,95 190,88 C230,80 250,60 290,48 C330,38 360,25 400,10"
          fill="none"
          stroke="#00e0da"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
        />

        <motion.circle
          cx="400"
          cy="10"
          r="6"
          fill="#00e0da"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.15 }}
        />
        <motion.circle
          cx="400"
          cy="10"
          r="10"
          fill="#00e0da"
          initial={{ opacity: 0.18, scale: 1 }}
          animate={{ opacity: [0.18, 0.05, 0.18], scale: [1, 1.6, 1] }}
          transition={{
            duration: 1.8,
            delay: 1.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "400px 10px" }}
        />
      </svg>

      {/* Mini stats */}
      <div className="mt-4 flex max-w-[65%] flex-col gap-1.5">
        <div className="flex flex-row items-baseline gap-1.5 whitespace-nowrap text-left">
          <span className="text-sm font-extrabold text-thunder-black">+{leads}</span>
          <span className="text-[11px] text-gray-600">Leads captured</span>
        </div>
        <div className="flex flex-row items-baseline gap-1.5 whitespace-nowrap text-left">
          <span className="text-sm font-extrabold text-thunder-black">
            {hoursSaved} hrs
          </span>
          <span className="text-[11px] text-gray-600">Staff time saved</span>
        </div>
      </div>

      {/* Floating callout: money saved */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="absolute -right-7 -top-5 z-10 hidden items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold text-thunder-black shadow-[0_16px_30px_-12px_rgba(204,204,204,0.49)] sm:flex"
      >
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-emerald-50 text-base text-emerald-600">
          $
        </span>
        <span>
          ${moneySaved} saved
          <br />
          <span className="text-[11.5px] font-semibold text-emerald-600">
            on support costs / mo
          </span>
        </span>
      </motion.div>

      {/* Floating callout: instant answers */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.4, 0, 0.2, 1] }}
        className="absolute -bottom-4 -left-8 z-10 hidden items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[13px] font-bold text-thunder-black shadow-[0_16px_30px_-12px_rgba(204,204,204,0.49)] sm:flex"
      >
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-base text-primary-dark">
          ⚡
        </span>
        <span>
          Answers in 2 sec
          <br />
          <span className="text-[11.5px] font-semibold text-primary-dark">
            24/7, every visitor
          </span>
        </span>
      </motion.div>

      {/* Floating callout: auto-training chip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
        className="absolute -bottom-12 -right-16 z-20 hidden max-w-[270px] items-start gap-2.5 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-[0_16px_30px_-12px_rgba(204,204,204,0.49)] lg:flex"
      >
        <div>
          <div className="mb-2.5 flex w-full items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
            <span className="shrink-0 text-[11px]">🌐</span>
            <span className="whitespace-nowrap border-r-2 border-primary pr-0.5 font-mono text-[11.5px] font-semibold text-gray-900">
              {urlTyped}
            </span>
            {urlDone && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] font-extrabold text-emerald-600"
              >
                ✓
              </motion.span>
            )}
          </div>

          <div className="mt-0.5 text-[11.5px] font-medium leading-[1.4] text-gray-600">
            Reads your pages, services &amp; FAQs — no manual setup.
          </div>
          <div className="mt-2 flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-primary-dark">
              ✓ No coding required
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-primary-dark">
              ✓ Ready in minutes
            </span>
          </div>

          <div className="relative mt-2.5 w-full border-t border-gray-200 pt-2.5">
            {trainStage === "scanning" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-primary-dark">
                  <motion.span
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-dark"
                  />
                  Scanning your website…
                </div>
                <div
                  className="mb-1.5 h-1.5 w-full animate-[shimmer_1.4s_linear_infinite] rounded bg-[length:400%_100%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
                  }}
                />
                <div
                  className="mb-1.5 h-1.5 w-4/5 animate-[shimmer_1.4s_linear_infinite] rounded bg-[length:400%_100%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
                  }}
                />
                <div
                  className="h-1.5 w-3/5 animate-[shimmer_1.4s_linear_infinite] rounded bg-[length:400%_100%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <motion.span
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
                  />
                  ✓ Trained — chat is live
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 rounded-lg rounded-bl-[3px] bg-primary px-2.5 py-1.5">
                  <span className="shrink-0 text-xs">🤖</span>
                  <span className="flex items-center gap-0.5 py-0.5">
                    {[0, 0.15, 0.3].map((delay) => (
                      <motion.span
                        key={delay}
                        animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay,
                          ease: "easeInOut",
                        }}
                        className="h-[5px] w-[5px] rounded-full bg-white"
                      />
                    ))}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};



// ============================================================================
// HERO SECTION
// ============================================================================
const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        @keyframes logoScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-4">
        {/* --- Left: message --- */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
          >
            <HiSparkles className="h-4 w-4 text-primary" />
            AI Chatbot for Your Business
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-thunder-black sm:text-5xl lg:text-[52px]"
          >
            AI That Turns{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text italic text-transparent">
              Visitors Into Customers
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-[480px] text-base text-gray-600 sm:text-lg"
          >
            Instant replies, more leads, and happier customers—all powered by
            AI.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-9 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/start-free-trial"
                className="inline-flex items-center gap-2 rounded-lg bg-thunder-black px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-thunder-black/90"
              >
                Start Free Trial
                <BsArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-thunder-black bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-thunder-black transition-colors hover:bg-gray-50"
              >
                <BsPlayFill className="h-4 w-4" />
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-3">
              {[
                "from-blue-400 to-purple-500",
                "from-emerald-400 to-teal-500",
                "from-orange-400 to-pink-500",
                "from-slate-400 to-slate-600",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`h-9 w-9 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-white`}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Trusted by 1000+ business
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex text-orange-400">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <FaStar key={i} className="h-3.5 w-3.5" />
                  ))}
                  <FaStarHalfAlt className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-bold text-primary-dark">4.9/5</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- Right: business growth visualization --- */}
        <div className="relative order-first flex w-full items-center justify-center overflow-hidden rounded-[32px] px-6 py-10 sm:px-12 sm:py-14 lg:order-none">
          <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(0,224,218,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,224,218,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(circle_at_center,#000_55%,transparent_90%)]" />
          <span className="pointer-events-none absolute left-[8%] top-[6%] rotate-[-8deg] text-3xl opacity-10 sm:text-4xl">
            💬
          </span>
          <span className="pointer-events-none absolute bottom-[8%] right-[6%] rotate-[6deg] text-3xl opacity-10 sm:text-4xl">
            📈
          </span>

          <GrowthVisualCard />
        </div>

      
      </div>
    </section>
  );
};

export default HeroSection;
