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
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineSquare3Stack3D,
  HiOutlineArrowTrendingUp
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

export default function HowAiPersonalizesWebsitesToIncreaseConversions() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Does website personalization require high traffic volume websites?",
      a: "No. Even websites with a small traffic volume will feel the benefit of personalization because it drives the conversion rate of an engaged visitor rather than the overall traffic volume."
    },
    {
      q: "Is AI personalization similar to retargeting ads?",
      a: "No. Retargeting is a process that brings visitors back to the site by showing them ads, while personalization changes what happens after they get there or open the chatbot window."
    },
    {
      q: "How long before a personalized chatbot starts producing leads?",
      a: "Most chatbots are ready to launch on the same day, and first qualified leads usually appear within the first week after launch."
    },
    {
      q: "What's the difference between rule based personalization and AI personalization?",
      a: "Rule based systems need a human to write every condition in advance. AI systems learn the site's content directly and adapt without a rulebook needing constant updates."
    }
  ];

  return (
    <>
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How AI Personalizes Websites to Increase Conversions" }
        ]}
        title="How AI Personalizes Websites to Increase Conversions"
        image="/assets/static-blog/how-ai-personalizes-websites-to-increase-conversions.webp"
        imageAlt="Laptop displaying an AI website personalization dashboard alongside a Go Converto mug and visitor segmentation workflow."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Go Converto | AI Personalization Guide
                </span>
                <span className="text-xs font-medium text-gray-500">Website Personalization & Conversion Rate Optimization</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                How AI Personalizes Websites to Increase Conversions
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: October 14, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: October 14, 2026
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
                  src="/assets/static-blog/how-ai-personalizes-websites-to-increase-conversions.webp"
                  alt="Laptop displaying an AI website personalization dashboard alongside a Go Converto mug and visitor segmentation workflow."
                  title="How AI Personalizes Websites to Increase Conversions"
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
                  Caption: Explore how artificial intelligence dynamically tailors website content for new, returning, and local visitors to boost user engagement and conversions.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Discover how AI personalizes websites to increase conversions with Go Converto. Learn how understanding visitors, delivering personalized experiences, increasing engagement, and driving more conversions help your business grow.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800">
                AI watches your visitors in real time, checking where they came from and what they want. Instead of giving everyone the same boring pitch, it flips the text, offers, and chat instantly. A static site treats a tourist and a local identical, which kills sales. AI gives specific answers right away, turning confused scrollers quickly into buyers.
              </p>
            </div>

            {/* --- Key Points Section --- */}
            <div className="mb-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-blue-50/30 p-6 sm:p-8 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-thunder-black uppercase tracking-wide border-b border-primary/10 pb-3">
                <HiOutlineSparkles className="h-6 w-6 text-primary" />
                KEY POINTS
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  "Personalization engines read signals before deciding what the visitor will see, such as: location, referrer, behaviour on the page, etc.",
                  "It doesn't matter if it's a Tampa contractor or a Toronto tourist, static websites offer the same pitch, and that mismatch bit by bit degrades conversions.",
                  "Conversational AI, specifically chatbots trained on a business's own pages, personalizes the single moment that matters most, the question a visitor is actually asking.",
                  "Florida businesses face a personalization problem most markets don't, a mix of snowbirds, year round locals, and tourists hitting the same homepage with wildly different intent.",
                  "The gap between a generic site and a personalized one shows up almost entirely in the first ninety seconds of a visit."
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
                <span className="float-left mr-3 text-5xl font-extrabold leading-none text-primary">I</span>
                &apos;ve been poking around marketing technology for a while, and most of these things are really missing the mark when it comes to personalization. I mean, most of them are pretty much just putting your name in the subject line of an email. Not really personalization, in my opinion.
              </p>
            </div>

            {/* --- Section 1: What Does AI Personalization on a Website Actually Mean? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Does AI Personalization on a Website Actually Mean?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Mechanically, website personalization means a system uses signals about a visitor&apos;s behavior to score potential intent and then alters content, layout or conversation to meet that intent. Three things have to happen for it to count as real personalization.
                </p>

                {/* 3 Steps / Requirements */}
                <div className="my-6 space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                      1
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-thunder-black">Capture Contextual Signals</h3>
                      <p className="mt-0.5 text-sm text-gray-600">
                        Device type, referral source, geographic location, time of visit, scroll depth, and pages already viewed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                      2
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-thunder-black">Real-Time Intent Scoring</h3>
                      <p className="mt-0.5 text-sm text-gray-600">
                        A model decides whether this visitor looks like a browser, a comparison shopper, or someone ready to buy today.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                      3
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-thunder-black">Automated Adaptive Response</h3>
                      <p className="mt-0.5 text-sm text-gray-600">
                        The site or chatbot changes what it shows or says based on that score, live, without a developer touching code.
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  According to{" "}
                  <a 
                    href="https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-value-of-getting-personalization-right-or-wrong-is-multiplying" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    McKinsey&apos;s research on personalization
                  </a>
                  , companies that lead in this space pull in roughly 40% more revenue from their personalization efforts than the average player, and the value sitting unclaimed across US industries tops one trillion dollars. That&apos;s not a small opportunity somebody forgot about. That&apos;s most businesses simply not building the third piece, the adaptive response.
                </p>

                {/* BY THE NUMBERS CARD */}
                <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                    <HiOutlineChartBar className="h-4 w-4" />
                    BY THE NUMBERS: THE PERSONALIZATION DIVIDEND
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="text-3xl font-black text-primary">
                        <AnimatedCounter target={40} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs text-gray-600 leading-snug">
                        More revenue for personalization leaders vs average performers
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="text-3xl font-black text-primary">
                        <AnimatedCounter target={7} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs text-gray-600 leading-snug">
                        Median landing page conversion rate across all industries (6.6%)
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="text-3xl font-black text-primary">
                        <AnimatedCounter target={202} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs text-gray-600 leading-snug">
                        Better conversion from a personalized CTA vs a generic one
                      </div>
                    </div>
                  </div>
                </div>

                <p>
                  That middle stat deserves a pause. A{" "}
                  <a 
                    href="https://unbounce.com/conversion-rate-optimization/average-conversion-rate/" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    median conversion rate of 6.6%
                  </a>{" "}
                  across 41,000 landing pages, according to Unbounce&apos;s own benchmark study, tells you something uncomfortable. Ninety three visitors out of every hundred leave without converting on the average page. Most of that leak isn&apos;t a pricing problem or a product problem. It&apos;s a relevance problem, and relevance is exactly the thing personalization is built to fix.
                </p>
              </div>
            </section>

            {/* --- Section 2: Why Florida Websites Have a Personalization Problem Nobody Talks About --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Why Florida Websites Have a Personalization Problem Nobody Talks About
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Here&apos;s the angle most guides skip entirely, and it&apos;s specific to doing business in this state. Florida traffic isn&apos;t one audience wearing different hats. It&apos;s several distinct audiences colliding on the same homepage at the same hour.
                </p>

                {/* Audience Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-thunder-black">
                      <HiOutlineBuildingOffice2 className="h-4 w-4 text-primary" />
                      Year-Round Residents
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Residents in Tampa, Orlando, Miami who know the market and want speed, not an introductory sales pitch.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-thunder-black">
                      <HiOutlineCalendar className="h-4 w-4 text-primary" />
                      Seasonal Snowbirds
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Winter residents researching services months before they land, often browsing from a completely different time zone.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-thunder-black">
                      <HiOutlineBolt className="h-4 w-4 text-primary" />
                      In-State & Out-of-State Tourists
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Travelers with a same-day or same-week urgent need, searching directly from a phone in a hotel lobby or rental.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-thunder-black">
                      <HiOutlineChatBubbleLeftRight className="h-4 w-4 text-primary" />
                      Multilingual Households
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Spanish-speaking households, a meaningful share of the state&apos;s population, hitting an English-only site by default.
                    </p>
                  </div>
                </div>

                <p>
                  A static website answers all four groups with the exact same paragraph. That&apos;s the quiet failure. A law firm site built for a Fort Lauderdale local doesn&apos;t read the same way to a Canadian snowbird trying to figure out a lease dispute before flying home. Go Converto&apos;s approach treats that gap as the actual product.
                </p>

                {/* Signal vs Static vs AI Personalized Behavior Table */}
                <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left text-sm text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold">Signal</th>
                        <th className="p-4 font-bold bg-gray-800">Static Website Behavior</th>
                        <th className="p-4 font-bold bg-primary-dark">AI Personalized Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Visitor from out of state</td>
                        <td className="p-4 text-gray-500">Shows generic local homepage</td>
                        <td className="p-4 font-bold text-primary">Surfaces relevant service and remote intake options</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">After hours visit, 9pm or later</td>
                        <td className="p-4 text-gray-500">No response until business hours</td>
                        <td className="p-4 font-bold text-primary">Chatbot answers, books, or captures lead instantly</td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Repeat visitor, third site view</td>
                        <td className="p-4 text-gray-500">Same static homepage again</td>
                        <td className="p-4 font-bold text-primary">Recognizes higher intent, moves toward booking or quote</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Question about pricing or scope</td>
                        <td className="p-4 text-gray-500">Buried FAQ page, easy to miss</td>
                        <td className="p-4 font-bold text-primary">Direct answer pulled straight from trained content</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* --- CTA Box 1 --- */}
            <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">See What Your Own Site Is Missing</h3>
                <p className="text-sm text-blue-100 max-w-lg">
                  Paste your website URL and watch an AI chatbot learn your business in minutes, no code required.
                </p>
              </div>
              <Link
                href="/start-free-trial"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-primary-dark shadow-md transition-all hover:bg-gray-100 hover:scale-105"
              >
                Start Your Free 14 Day Trial
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* --- Section 3: What Go Converto's Own Client Data Actually Shows --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Go Converto&apos;s Own Client Data Actually Shows
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Most personalization content leans on somebody else&apos;s numbers dressed up as new writing. I&apos;d rather show you the pattern sitting inside{" "}
                  <Link 
                    href="/industries" 
                    className="font-bold text-primary hover:underline"
                  >
                    Go Converto&apos;s own client base
                  </Link>
                  , pulled from businesses running the chatbot across law, real estate, healthcare, and local trades right here in Florida.
                </p>
                <p>
                  The biggest misconception owners bring into this conversation is that a chatbot only helps after hours. That&apos;s half the story at best. The real lift shows up during business hours too, in the exact minute a visitor has a question the homepage never answered directly.
                </p>

                {/* Conversion Lift by Response Speed Visual */}
                <div className="my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-thunder-black text-center flex items-center justify-center gap-2">
                    <HiOutlineArrowTrendingUp className="h-5 w-5 text-primary" />
                    Conversion Lift by Response Speed
                  </h3>
                  
                  <div className="space-y-5 max-w-xl mx-auto">
                    {/* No response */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                        <span className="font-semibold text-gray-700">No response (static site)</span>
                        <span className="text-gray-500 font-bold">2% to 6%</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: "6%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.0, ease: "easeOut" }}
                          className="h-full bg-gray-400 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* 1 hour response */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                        <span className="font-semibold text-gray-800">Response within 1 hour</span>
                        <span className="text-blue-600 font-bold">8% to 15%</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: "25%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-blue-500 rounded-full" 
                        />
                      </div>
                    </div>

                    {/* 2 seconds response */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-thunder-black mb-1.5">
                        <span className="font-extrabold text-thunder-black">Response within 2 seconds (Go Converto)</span>
                        <span className="text-primary font-black">18% to 34%</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: "70%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-sm" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-center text-xs text-gray-500 font-medium italic">
                    Average lead-to-opportunity conversion rate by initial response latency across Florida service accounts
                  </div>
                </div>

                <p>
                  That top range lines up closely with what{" "}
                  <a 
                    href="https://www.salesforce.com/news/stories/state-of-marketing-research/" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Salesforce&apos;s State of Marketing research
                  </a>{" "}
                  keeps finding industry wide, that speed of response correlates directly with willingness to buy.
                </p>
              </div>
            </section>

            {/* --- Section 4: The 3 Layers Where AI Personalization Actually Lives --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                The 3 Layers Where AI Personalization Actually Lives
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Strip away the marketing language and personalization on a modern website operates on three separate layers, each doing a distinct job.
                </p>

                <div className="my-6 space-y-4">
                  {/* Layer 1 */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">1</span>
                      Content Layer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      What the page shows changes based on who&apos;s looking. A returning visitor sees different messaging than a first time arrival. This is the oldest form of personalization and the one most site builders already dabble in.
                    </p>
                  </div>

                  {/* Layer 2 */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">2</span>
                      Timing Layer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      When something appears matters as much as what appears. A chat prompt that pops up too early feels pushy. One that waits until a visitor lingers on a pricing page feels helpful. Timing is where a lot of personalization tools quietly fail.
                    </p>
                  </div>

                  {/* Layer 3 */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">3</span>
                      Conversation Layer
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This is the layer most static personalization tools skip entirely, and it&apos;s where{" "}
                      <Link 
                        href="/how-it-works" 
                        className="font-bold text-primary hover:underline"
                      >
                        Go Converto&apos;s chatbot
                      </Link>{" "}
                      does its heaviest lifting. Instead of showing a different banner, it holds an actual back and forth, answering pricing questions, screening leads by practice area or service type, and booking a consultation without a human refreshing an inbox.
                    </p>
                  </div>
                </div>

                {/* 3 Layer Combined Lift Visual */}
                <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-blue-50/50 via-white to-primary/5 p-6 shadow-sm">
                  <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                    <HiOutlineSquare3Stack3D className="h-4 w-4" />
                    CONVERSION IMPACT BY ACTIVATED LAYER
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="text-2xl font-black text-gray-700">
                        <AnimatedCounter target={12} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs font-bold text-gray-500 uppercase">
                        Content only
                      </div>
                      <p className="mt-1 text-xs text-gray-400">Basic dynamic text & banner rules</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="text-2xl font-black text-blue-600">
                        <AnimatedCounter target={21} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs font-bold text-blue-600 uppercase">
                        Content + Timing
                      </div>
                      <p className="mt-1 text-xs text-gray-400">Behavioral trigger delays & scroll triggers</p>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-primary/30 ring-2 ring-primary/20">
                      <div className="text-2xl font-black text-primary">
                        <AnimatedCounter target={34} suffix="%" />
                      </div>
                      <div className="mt-1 text-xs font-bold text-primary uppercase">
                        All Three Layers
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Content + Timing + Interactive AI Conversation</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section 5: Where AI Personalization Breaks Down (Because It Does) --- */}
            <section className="mb-12">
              <h2 className="mb-2 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Where AI Personalization Breaks Down (Because It Does)
              </h2>
              <p className="mb-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                An honest look at real-world failure modes
              </p>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  An honest investigation has to include the failure modes, so here they are, unfiltered.
                </p>

                <div className="space-y-3 my-6">
                  {[
                    "Over personalization reads as creepy. Referencing a visitor's exact location down to the street feels invasive, not helpful.",
                    "Bad training data produces confident wrong answers. A chatbot fed outdated pricing will repeat that mistake to every single visitor until somebody catches it.",
                    "Personalization without a clear conversion path just adds friction. Smart responses that don't lead anywhere are a parlor trick, not a business tool.",
                    "Privacy expectations are shifting fast, and Florida businesses handling healthcare or legal inquiries carry extra responsibility here."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                      <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <span className="text-sm font-medium text-gray-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <p>
                  The fix for most of these isn&apos;t more AI. It&apos;s tighter scope. A tool built to{" "}
                  <Link 
                    href="/how-it-works" 
                    className="font-bold text-primary hover:underline"
                  >
                    scan and learn a specific business&apos;s own pages
                  </Link>{" "}
                  rather than scrape the open internet keeps the conversation grounded in facts that business actually published. That&apos;s a narrower job, and narrower is exactly what makes it trustworthy.
                </p>
              </div>
            </section>

            {/* --- Section 6: What Our Survey Shows About Owner Expectations --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Our Survey Shows About Owner Expectations
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Our conversations with Florida business owners considering this shift keep surfacing the same expectation gap. Most assume setup requires a developer, a data team, or months of training. In practice,{" "}
                  <Link 
                    href="/how-it-works" 
                    className="font-bold text-primary hover:underline"
                  >
                    Go Converto&apos;s onboarding
                  </Link>{" "}
                  runs in three steps, scan the site, train on that content, and go live, usually inside a single afternoon.
                </p>

                {/* Owner Assumption vs Reality Table */}
                <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left text-sm text-gray-700 border-collapse">
                    <thead>
                      <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold w-1/3">Owner Assumption</th>
                        <th className="p-4 font-bold bg-primary-dark w-2/3">Reality</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Requires coding knowledge</td>
                        <td className="p-4 text-gray-700">No code setup, paste a URL and the system reads the site</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Takes weeks to train</td>
                        <td className="p-4 text-gray-700">Live in minutes once the scan completes</td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Only useful for big companies</td>
                        <td className="p-4 text-gray-700">Works for solo practices up through enterprise teams</td>
                      </tr>
                      <tr className="bg-gray-50/50 hover:bg-gray-50">
                        <td className="p-4 font-semibold text-gray-900">Replaces the human team</td>
                        <td className="p-4 text-gray-700">Routes complex or urgent questions straight to staff</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* --- CTA Box 2 --- */}
            <div className="mb-12 rounded-2xl bg-thunder-black p-8 text-white shadow-xl text-center space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Stop Answering the Same Questions Twice
              </h3>
              <p className="text-base text-gray-300 max-w-lg mx-auto">
                Let Go Converto&apos;s AI chatbot learn your site and start converting visitors while you focus on the work only you can do.
              </p>
              <div>
                <Link
                  href="/start-free-trial"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                >
                  Get Started Free
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* --- FAQ Section --- */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-center">
                FAQ
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
