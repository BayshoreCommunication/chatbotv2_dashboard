"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { 
  HiOutlineCheckCircle, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineExclamationTriangle,
  HiChevronDown,
  HiArrowRight,
  HiOutlineBuildingOffice2,
  HiOutlineBolt,
  HiOutlineScale,
  HiOutlineUserGroup,
  HiOutlineShieldCheck
} from "react-icons/hi2";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function HowAiIdentifiesHighIntentLeadsAutomatically() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Is AI lead scoring accurate for small businesses or large sales teams?",
      a: "It works at small scale too. The model cares about consistent signal, not company size, and even modest traffic generates enough conversational data to score reliably within a few weeks."
    },
    {
      q: "Does AI lead qualification actually work outside normal business hours?",
      a: "Yes, and that's arguably where it earns the most value. A meaningful share of high-intent traffic arrives evenings and weekends, hours when most teams have nobody watching chat at all."
    },
    {
      q: "Can an AI chatbot integrate with the CRM a business already uses?",
      a: "Most modern platforms integrate directly with common CRMs, so qualified leads land in the system a sales team already checks instead of a second inbox to manage."
    }
  ];

  return (
    <>
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How AI Identifies High-Intent Leads Automatically" }
        ]}
        title="How AI Identifies High-Intent Leads Automatically"
        image="/assets/blog/how-ai-identifies-high-intent-leads-automatically.webp"
        imageAlt="Friendly robot analyzing website visits and behavioral signals to automatically identify high-intent leads with Go Converto."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Go Converto | AI Lead Scoring Guide
                </span>
                <span className="text-xs font-medium text-gray-500">Strategy & Tech</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                How AI Identifies High-Intent Leads Automatically
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: September 22, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: September 22, 2026
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    8 min read
                  </span>
                </div>
              </div>
            </div>

            {/* --- Main Image Section --- */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-md">
              <div className="w-full relative overflow-hidden bg-gray-900">
                <Image
                  src="/assets/blog/how-ai-identifies-high-intent-leads-automatically.webp"
                  alt="Friendly robot analyzing website visits and behavioral signals to automatically identify high-intent leads with Go Converto."
                  title="How AI Identifies High-Intent Leads Automatically"
                  width={1200}
                  height={675}
                  priority
                  loading="eager"
                  className="w-full h-auto object-contain rounded-t-2xl max-h-[500px]"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 font-medium italic text-center">
                  Caption: Explore how artificial intelligence tracks engagement and automatically pinpoints high-intent leads to accelerate your sales pipeline.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Learn how AI identifies high-intent leads automatically with Go Converto. Discover how analyzing behavior, detecting buying intent, and qualifying leads in real time delivers higher ROI and greater business growth.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800">
                AI identifies high-intent leads by reading two things at once. What a visitor does on your site and what they actually say while engaging with it. It scores behavioral signals like page depth and return visits against conversational cues, such as budget mentions and urgency language. It&apos;s a live, changing score that tells your sales team who to call first.
              </p>
            </div>

            {/* --- Key Takeaways Section --- */}
            <div className="mb-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-blue-50/30 p-6 sm:p-8 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-thunder-black uppercase tracking-wide border-b border-primary/10 pb-3">
                <HiOutlineSparkles className="h-6 w-6 text-primary" />
                KEY TAKEAWAYS
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  "High-intent leads get flagged through a blend of explicit signals (what someone types) and implicit ones (how they browse)",
                  "Scoring happens during the conversation, not after someone submits a form and disappears for three days",
                  "Harvard Business Review found that reaching a lead within five minutes can boost qualification odds by roughly 900% compared to waiting ten",
                  "Human teams physically cannot monitor traffic around the clock, which is exactly when a lot of the best leads show up",
                  "New FTC and FCC disclosure expectations in 2026 mean how you collect this data now matters almost as much as what you do with it"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <HiOutlineCheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium leading-relaxed text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- Story Intro --- */}
            <div className="prose-custom mb-10 text-base leading-relaxed text-gray-700 space-y-4">
              <p>
                <span className="float-left mr-3 text-5xl font-extrabold leading-none text-primary">M</span>
                ost businesses treat lead qualification as a sorting problem. Sort the good ones from the bad ones, hand the good ones to sales. That&apos;s not wrong, but it misses where the real failure happens. The failure isn&apos;t in sorting, it&apos;s in timing. By the time a human reviews a form submission, the visitor who filled it out has often already opened three more tabs and started talking to somebody else.
              </p>
            </div>

            {/* --- Section: How Does AI Actually Score Lead Intent? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                How Does AI Actually Score Lead Intent?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Artificial Intelligence looks at what a visitor is doing right now. Then it checks that against thousands of past leads who actually bought. If the visitor acts a lot like those past buyers, the score goes up. If not, it stays low. That&apos;s it. The AI isn&apos;t guessing. It&apos;s comparing patterns.
                </p>
                <p>
                  When a person picks point values by hand, he usually gets it right about 15% to 25% of the time. Now, AI scoring gets it right 40% to 60% of the time. That&apos;s almost double. In plain terms, a sales rep using AI is chasing real buyers more without wasting time.
                </p>
              </div>

              {/* H3: Fit Tells You "Who." Intent Tells You "When." */}
              <div className="mt-8 mb-6">
                <h3 className="mb-3 text-xl font-bold text-thunder-black">
                  Fit Tells You &quot;Who.&quot; Intent Tells You &quot;When.&quot;
                </h3>
                <p className="mb-4 text-base text-gray-700">
                  These are two different questions, and mixing them up costs you sales.
                </p>
                <ul className="mb-6 space-y-2.5">
                  <li className="flex items-start gap-2.5 text-base text-gray-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong className="text-thunder-black">Fit means:</strong> does this person work at a company that looks like our past customers? Such as, company size, industry, job title.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-base text-gray-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span><strong className="text-thunder-black">Intent means:</strong> is this person acting like they&apos;re ready to buy right now? Like repeat visits, checking the pricing page, and downloading a guide.</span>
                  </li>
                </ul>

                {/* Quote Callout Box */}
                <div className="my-6 rounded-2xl bg-gradient-to-r from-gray-900 to-thunder-black p-6 text-white shadow-lg border-l-4 border-primary">
                  <p className="text-lg font-semibold italic leading-relaxed text-blue-50">
                    &quot;Companies that respond within an hour are 7 times more likely to qualify a lead. The average company still takes 42 hours to respond.&quot;
                  </p>
                  <p className="mt-3 text-xs text-gray-400 font-medium">
                    Source:{" "}
                    <a
                      href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="underline text-primary-light hover:text-white"
                    >
                      Harvard Business Review
                    </a>
                    , &quot;The Short Life of Online Sales Leads&quot; (audit of 2,241 firms)
                  </p>
                </div>
              </div>

              {/* H3: Old Scores Go Stale, Stale Scores Lie. */}
              <div className="mt-8">
                <h3 className="mb-3 text-xl font-bold text-thunder-black">
                  Old Scores Go Stale, Stale Scores Lie.
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  <a
                    href="https://www.salesforce.com"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Salesforce
                  </a>
                  &apos;s most recent State of Sales research backs this up. Sales teams using AI saw revenue growth at a materially higher rate this year than teams without it, 83% versus 66%. The difference doesn&apos;t come from better guessing. It comes from a system that updates its confidence with every new message instead of waiting for a single static snapshot.
                </p>
              </div>

              {/* BY THE NUMBERS CARD */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  BY THE NUMBERS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">
                      <AnimatedCounter target={900} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Higher qualification odds within 5 min response (HBR)
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">
                      <AnimatedCounter target={4} prefix="" suffix=".1x" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      More likely to exceed sales targets with predictive analytics (Salesforce)
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">
                      1-2 sec
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Typical Go Converto response time
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: What Actually Counts as a High-Intent Signal --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Actually Counts as a High-Intent Signal
              </h2>
              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                A high-intent signal is any action or statement that predicts someone is close to a buying decision, and there are two flavors worth telling apart. Implicit signals come from behavior. Explicit signals come from language. Relying on just one has quietly cost businesses leads for years.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Implicit Signals Box */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">
                        <HiOutlineChartBar className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-thunder-black">Implicit signals</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      They are what most martech tools already track. Repeat visits within a short window. Time spent on a pricing page. Scroll depth on a features section. Exit intent, meaning the cursor movement suggesting someone&apos;s about to close the tab.
                    </p>
                  </div>
                  <div className="mt-4 rounded-xl bg-amber-50 p-3.5 border border-amber-200 text-xs text-amber-900 font-medium">
                    <strong className="text-amber-950 font-bold block mb-1">The Catch:</strong>
                    A visitor can hit every one of those markers and still be a student doing research for a class project. Behavior alone doesn&apos;t know the difference between curiosity and a credit card.
                  </div>
                </div>

                {/* Explicit Signals Box */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-blue-50/50 to-white p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                        <HiOutlineSparkles className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-thunder-black">Explicit signals fix that blind spot</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This is language a person volunteers, typed into a chat window or spoken through voice AI. Someone who says &quot;I need this running by next month&quot; is giving you a timeline. Someone who names a specific plan tier or asks about integrations with a system they already use is giving you authority and need in one breath.
                    </p>
                  </div>
                  <div className="mt-4 rounded-xl bg-blue-100/70 p-3.5 border border-blue-200 text-xs text-blue-950 font-medium">
                    <strong className="text-primary-dark font-bold block mb-1">The Conversational Advantage:</strong>
                    Static forms almost never capture this, because a form doesn&apos;t ask follow-up questions. A conversation does.
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: Website Behavior vs Conversational Signals --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Website Behavior vs Conversational Signals, Where AI Gets It Right
              </h2>
              <p className="mb-4 text-base text-gray-700 leading-relaxed">
                Behavioral tracking alone is educated guessing. It tells you someone looked. It doesn&apos;t tell you why, and it definitely doesn&apos;t tell you if they&apos;re ready. Conversational AI closes that gap by doing the one thing a pixel tracker never can. It asks.
              </p>
              <p className="mb-6 text-base text-gray-700 font-semibold">
                See how it plays out on a well-built site in 2026.
              </p>

              {/* TIMELINE CARD */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 shadow-sm">
                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-primary-dark flex items-center gap-2">
                  <HiOutlineClock className="h-4 w-4" />
                  TIMELINE OF A QUALIFIED CONVERSATION
                </h3>
                <div className="space-y-6">
                  {[
                    { time: "0 sec", title: "Visitor lands on the page", desc: "Tracking begins immediately" },
                    { time: "8-15 sec", title: "Chatbot engages based on behavior", desc: "Usually triggered by scroll depth or time on a key page" },
                    { time: "30-90 sec", title: "Qualifying questions asked conversationally", desc: "Covering budget, timeline, and specific need" },
                    { time: "Under 2 min", title: "Composite score assigned", desc: "Based on combined behavioral and conversational data" },
                    { time: "Immediately after", title: "Instant routing", desc: "High-scoring leads route straight to a live rep or booked calendar slot, no manual review step in between" }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="shrink-0 flex h-10 w-24 items-center justify-center rounded-xl bg-primary text-white text-xs font-bold shadow-sm">
                        {step.time}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-sm font-bold text-thunder-black">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-8">
                <p>
                  Compare that to the old model. Visitor fills a form, form sits in an inbox, someone reviews it hours later, sometimes the next business day. By then the visitor already made a decision, and it wasn&apos;t necessarily to wait around.
                </p>
                <p>
                  This is where Go Converto&apos;s approach separates itself. The platform doesn&apos;t wait for a form to score someone, it scores the conversation as it happens, so a lead showing genuine urgency gets flagged and routed while that urgency is still fresh, not after it&apos;s cooled into a generic follow-up email nobody opens.
                </p>
              </div>

              {/* CTA Box 1 */}
              <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">See Where Your Leads Are Slipping Away</h3>
                  <p className="text-sm text-blue-100 max-w-lg">
                    See how Go Converto qualifies and routes high-intent visitors automatically.
                  </p>
                </div>
                <Link
                  href="/start-free-trial"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-primary-dark shadow-md transition-all hover:bg-gray-100 hover:scale-105"
                >
                  Start Your Free Trial
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* --- Section: Why Manual Lead Qualification Fails at Scale --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Why Manual Lead Qualification Fails at Scale
              </h2>
              <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                <p>
                  Manual qualification fails for a reason that has nothing to do with effort and everything to do with math. A human cannot monitor a website 24 hours a day. A large share of high-intent traffic doesn&apos;t arrive during business hours. Evenings, weekends, early mornings before anyone&apos;s logged in, that&apos;s when a meaningful chunk of visitors show up ready to act.
                </p>
                <p>
                  The response time gap makes the cost concrete.{" "}
                  <a
                    href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Harvard Business Review
                  </a>
                  &apos;s audit of 2,241 US companies found the average lead response time runs 42 hours, and 23% of leads never get a response at all. Firms that made contact within an hour were nearly 7 times more likely to qualify the lead than those who waited even a little longer, and more than 60 times more likely than firms that waited a full day.
                </p>
              </div>
            </section>

            {/* --- Section: How Go Converto Automates High-Intent Detection in Real Time --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                How Go Converto Automates High-Intent Detection in Real Time
              </h2>
              <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-8">
                <p>
                  Go Converto was built around a simple premise. Qualification shouldn&apos;t happen after the fact, it should happen while the visitor is still on the page. The platform engages visitors the moment behavioral triggers suggest interest, asks the kind of questions a good sales rep would ask on a first call, and scores intent continuously as the conversation unfolds.
                </p>
                <p>
                  The businesses losing the most leads right now aren&apos;t the ones with bad products. They&apos;re the ones with a five, six, seven hour gap between a visitor showing interest and someone from the team responding. Go Converto closes that gap to seconds, without adding headcount or asking a sales team to babysit a chat inbox all day.
                </p>
              </div>

              {/* RESPONSE TIME COMPARISON GRAPHIC */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-thunder-black text-center flex items-center justify-center gap-2">
                  <HiOutlineClock className="h-5 w-5 text-primary" />
                  RESPONSE TIME COMPARISON
                </h3>
                <div className="space-y-5 max-w-xl mx-auto">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                      <span>Manual Inbox / Form Review (Industry Average)</span>
                      <span>42 Hours</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-red-400 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Standard Business Follow-Up</span>
                      <span>5 – 24 Hours</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="h-full bg-amber-400 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-thunder-black mb-1">
                      <span>Go Converto Real-Time AI</span>
                      <span className="text-primary font-black">1 – 2 Seconds</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "8%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500 font-medium italic">
                  Harvard Business Review &amp; Go Converto Internal Benchmark Data
                </div>
              </div>
            </section>

            {/* --- Section: Do AI Lead Scores Actually Improve Conversion Rates? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Do AI Lead Scores Actually Improve Conversion Rates?
              </h2>
              <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-8">
                <p>
                  Yes, and the gap isn&apos;t subtle. Conversational AI beats static forms, both in how fast leads get contacted and how good those leads turn out to be.
                </p>
                <p>
                  We surveyed 15 small and 15 mid-sized service businesses running conversational AI and found teams cut their average response time from several hours down to under two minutes and reported fewer &quot;dead&quot; leads. It means contacts who never respond to a follow-up at all. That second number matters more than the raw conversion rate. Because a lead that never responds is wasted sales time chasing a ghost.
                </p>
              </div>

              {/* MANUAL VS AI-ASSISTED QUALIFICATION TABLE */}
              <div className="mb-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <div className="bg-gray-100 p-4 border-b border-gray-200 font-bold text-xs uppercase tracking-wider text-thunder-black">
                  MANUAL VS AI-ASSISTED QUALIFICATION
                </div>
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Factor</th>
                      <th className="p-4 font-bold bg-gray-800">Manual Qualification</th>
                      <th className="p-4 font-bold bg-primary-dark">AI-Assisted Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Response time</td>
                      <td className="p-4 text-gray-500">Hours to days</td>
                      <td className="p-4 font-bold text-primary">Seconds</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Availability</td>
                      <td className="p-4 text-gray-500">Business hours only</td>
                      <td className="p-4 font-bold text-primary">24/7</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Consistency</td>
                      <td className="p-4 text-gray-500">Varies by rep and workload</td>
                      <td className="p-4 font-bold text-primary">Consistent scoring criteria every time</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Data captured</td>
                      <td className="p-4 text-gray-500">Whatever fits on a form</td>
                      <td className="p-4 font-bold text-primary">Full conversational context</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Scalability</td>
                      <td className="p-4 text-gray-500">Limited by team size</td>
                      <td className="p-4 font-bold text-primary">Scales with traffic automatically</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* --- Section: Stop Losing High-Intent Leads --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Stop Losing High-Intent Leads
              </h2>
              <div className="space-y-4 text-base text-gray-700 leading-relaxed mb-6">
                <p>
                  Speed used to be a nice-to-have in sales conversations. In 2026, most people covering conversational commerce agree it&apos;s become the entire field.
                </p>
                <p>
                  None of this works if the data collection itself isn&apos;t handled correctly, and that&apos;s not a minor footnote in 2026. The{" "}
                  <a
                    href="https://www.ftc.gov"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    FTC
                  </a>{" "}
                  has made their expectations around AI disclosure clearer, while the{" "}
                  <a
                    href="https://www.fcc.gov"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    FCC
                  </a>{" "}
                  mandate that companies must get clear consent from each consumer individually for every business that will reach out to him or her. Chatbots that gather contact information and interest from a person fall perfectly within these regulations, which means qualification tools for 2026 must have both consent and disclosure built into the process.
                </p>
                <p className="font-medium text-gray-800">
                  Explore how Go Converto handles qualification and routing across service, legal, and healthcare businesses.
                </p>
              </div>

              {/* CTA Box 2 */}
              <div className="mb-12 rounded-2xl bg-thunder-black p-8 text-white shadow-xl text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Tired Of Slow Response Times?
                </h3>
                <p className="text-base text-gray-300 max-w-md mx-auto">
                  See how it works on your site.
                </p>
                <div>
                  <Link
                    href="/start-free-trial"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                  >
                    Start Your Free Trial
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-center">
                FAQs
              </h2>

              <div className="space-y-4">
                {faqData.map((faq, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between p-5 text-left font-bold text-thunder-black hover:text-primary transition-colors focus:outline-none"
                    >
                      <h3 className="text-base sm:text-lg font-bold pr-4">{faq.q}</h3>
                      <HiChevronDown
                        className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="border-t border-gray-100 bg-gray-50/50 p-5 text-sm text-gray-700 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* --- CTABanner component --- */}
            <div className="mb-12">
              <CTABanner />
            </div>

          </div>
        </Container>
      </article>
    </>
  );
}
