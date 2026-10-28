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
  HiChevronDown,
  HiArrowRight,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBuildingOffice2,
  HiOutlineArrowTrendingUp,
  HiOutlineExclamationTriangle,
  HiOutlineDocumentCheck,
  HiOutlineBolt
} from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1600,
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
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
      setCount(Number((ease * target).toFixed(decimals)));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.goconverto.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.goconverto.com/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Why Every Law Firm Website Needs an AI Chatbot",
          "item": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot",
        },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot#blogposting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot",
      },
      "headline": "Why Every Law Firm Website Needs an AI Chatbot",
      "name": "Why Florida Law Firms Need an AI Chatbot in 2026",
      "description":
        "40% of legal inquiries happen after hours. Learn how Florida law firms use compliant AI chatbots to answer instantly and capture more signed cases.",
      "url": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot",
      "image": {
        "@type": "ImageObject",
        "url":
          "https://www.goconverto.com/assets/static-blog/why-every-law-firm-website-needs-an-ai-chatbot.webp",
      },
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://www.goconverto.com/blog#blog",
        "name": "Go Converto Blog",
        "url": "https://www.goconverto.com/blog",
      },
      "about": {
        "@type": "Thing",
        "name": "AI Chatbots for Law Firms and Legal Client Intake",
      },
      "keywords": [
        "Why Every Law Firm Website Needs an AI Chatbot",
        "Why Florida Law Firms Need an AI Chatbot in 2026",
        "AI chatbot for law firm website",
        "Florida law firm AI chatbot",
        "legal intake chatbot",
        "Florida Bar Ethics Opinion 24-1 AI",
        "law firm 24/7 client intake",
        "law firm lead conversion",
        "legal CRM intake integration",
        "conversational AI for attorneys",
      ],
      "author": {
        "@type": "Person",
        "name": "Salman H Saikote",
        "url": "https://www.bayshorecommunication.com/",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Go Converto",
        "url": "https://www.goconverto.com/",
      },
      "datePublished": "2026-10-21",
      "dateModified": "2026-10-21",
      "inLanguage": "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot#faq",
      "url": "https://www.goconverto.com/blog/why-every-law-firm-website-needs-an-ai-chatbot",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is an AI intake chatbot compatible with existing law firm calendar and CRM software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Modern chatbots are able to connect to legal CRM (Clio, Filevine) and calendar (Calendly). In real time they sync intake records and appointments.",
          },
        },
        {
          "@type": "Question",
          "name": "Can chatbots serve as a substitute for Intake Coordinators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Not entirely. It handles the first response and the after-hours gap, then hands qualified leads to your team, which usually reduces headcount pressure rather than removing the role.",
          },
        },
        {
          "@type": "Question",
          "name": "What if a web visitor asks a question outside my firm's practice areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The assistant screens for case fit using your pre-set criteria. If an inquiry falls outside your practice areas, it politely informs the visitor and refrains from scheduling a consultation.",
          },
        },
        {
          "@type": "Question",
          "name": "Is client information shared with the chatbot kept confidential under Florida Bar rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Firms remain responsible for vetting the vendor's data retention and sharing policies under Rule 4-1.6 before any confidential details flow through the tool.",
          },
        },
      ],
    },
  ],
};

export default function WhyEveryLawFirmWebsiteNeedsAnAiChatbot() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Is an AI intake chatbot compatible with existing law firm calendar and CRM software?",
      a: "Yes. Modern chatbots are able to connect to legal CRM (Clio, Filevine) and calendar (Calendly). In real time they sync intake records and appointments.",
    },
    {
      q: "Can chatbots serve as a substitute for Intake Coordinators?",
      a: "Not entirely. It handles the first response and the after-hours gap, then hands qualified leads to your team, which usually reduces headcount pressure rather than removing the role.",
    },
    {
      q: "What if a web visitor asks a question outside my firm's practice areas?",
      a: "The assistant screens for case fit using your pre-set criteria. If an inquiry falls outside your practice areas, it politely informs the visitor and refrains from scheduling a consultation.",
    },
    {
      q: "Is client information shared with the chatbot kept confidential under Florida Bar rules?",
      a: "Firms remain responsible for vetting the vendor's data retention and sharing policies under Rule 4-1.6 before any confidential details flow through the tool.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Why Every Law Firm Website Needs an AI Chatbot" },
        ]}
        title="Why Every Law Firm Website Needs an AI Chatbot"
        image="/assets/static-blog/why-every-law-firm-website-needs-an-ai-chatbot.webp"
        imageAlt="Laptop screen displaying an AI chatbot interface for legal websites on an attorney desk with law books."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineScale className="h-3.5 w-3.5" />
                  Go Converto | Legal Intake Guide
                </span>
                <span className="text-xs font-medium text-gray-500">Legal Tech &amp; Client Acquisition</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                Why Every Law Firm Website Needs an AI Chatbot
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: October 21, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: October 21, 2026
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    7 min read
                  </span>
                </div>
              </div>
            </div>

            {/* --- Main Image Section --- */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-md">
              <div className="w-full relative overflow-hidden bg-gray-900">
                <Image
                  src="/assets/static-blog/why-every-law-firm-website-needs-an-ai-chatbot.webp"
                  alt="Laptop screen displaying an AI chatbot interface for legal websites on an attorney desk with law books."
                  title="Why Every Law Firm Website Needs an AI Chatbot"
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
                  Caption: Learn how integrating an AI chatbot can boost lead conversion and client intake for your law firm.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Discover how AI chatbots on law firm websites deliver 24/7 client support, qualify leads, schedule consultations, and drive new case acquisitions.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800 text-justify sm:text-left">
                A law firm website needs an AI chatbot because most legal matters occur at night, weekends, and in between meetings, and Florida&apos;s consumer base will hire whoever can answer them first. A chatbot would triage the case, collect the intake information, and schedule the consultation while a human would still be asleep.
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
                  "Roughly 4 in 10 legal inquiries land outside business hours, per LexisNexis.",
                  "Nearly seven in ten consumers hire the first attorney who actually speaks with them.",
                  "The Florida Bar permits AI intake chatbots, provided they disclose they are not attorneys.",
                  "Manual intake in Florida runs slower than the national norm in several major metros.",
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
              <p className="text-justify sm:text-left">
                <span className="float-left mr-3 text-5xl font-extrabold leading-none text-primary">I</span>
                f a prospective client Google&apos;s your firm after wrecking at 11:40 P.M. on I-275, most Florida law firm websites offer a contact form or a voicemail box that won&apos;t ring until Monday morning. That&apos;s when you lose cases. The client doesn&apos;t walk away because your attorneys lack skill, but because a competing firm answered the call first.
              </p>
            </div>

            {/* --- Section 1: What the Research Actually Says About Response Time --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What the Research Actually Says About Response Time
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Numbers settle arguments better than opinions do, so let&apos;s put a few on the table before going further.
                </p>
              </div>

              {/* BY THE NUMBERS CARD */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  LEGAL RESPONSE BENCHMARKS &amp; CONVERSION METRICS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-primary/70 mb-1">Metric 01</span>
                    <div className="text-4xl font-black text-primary my-1">
                      <AnimatedCounter target={67} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      More likely to convert a lead answered within 5 minutes vs. 30
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-amber-600/70 mb-1">Metric 02</span>
                    <div className="text-4xl font-black text-amber-600 my-1">
                      <AnimatedCounter target={42} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Of legal consumers contact several firms and hire whoever replies first
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-primary-dark/70 mb-1">Metric 03</span>
                    <div className="text-4xl font-black text-primary-dark my-1">
                      <AnimatedCounter target={2.3} decimals={1} suffix=" days" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Average business days a firm takes to respond to a new inquiry
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-gray-500 italic">
                  Data from Clio&apos;s 2025 Legal Trends Report and Hennessey Digital&apos;s 2025 Lead Form Response Time Study.
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Those first two figures come from{" "}
                  <a 
                    href="https://www.clio.com/resources/legal-trends/read-online/" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Clio&apos;s 2025 Legal Trends Report
                  </a>
                  , and the third one should sting a little, because 2.3 business days is roughly the same window a prospective client needs to find, call, and retain somebody else entirely.{" "}
                  <a 
                    href="https://hennessey.com/2025-lead-form-response-time-study/" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Hennessey Digital&apos;s 2025 Lead Form Response Time Study
                  </a>
                  , which rang up 1,333 firms directly, found the median reply time sits at thirteen minutes and that a full quarter of firms never respond to a web lead at all.
                </p>

                <p className="text-justify sm:text-left">
                  Florida shows up by name in that study too, and not flatteringly. Tallahassee posted the slowest average response time among the cities measured, north of two hours. Compare that to a caller who&apos;s already dialing the next firm on the list within minutes of not hearing back.
                </p>
              </div>

              {/* Response Time Range by Intake Method Visual Graphic */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-thunder-black text-center">
                  Response Time Range by Intake Method (minutes, log scale)
                </h3>
                <p className="mb-6 text-xs text-gray-500 text-center">
                  How fast prospective clients receive their first substantive response
                </p>

                <div className="space-y-5 max-w-2xl mx-auto">
                  {/* AI Chatbot */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-thunder-black mb-1.5">
                      <span className="flex items-center gap-1.5 font-extrabold text-primary-dark">
                        <HiOutlineBolt className="h-4 w-4 text-primary" />
                        AI chatbot
                      </span>
                      <span className="text-primary font-black text-sm sm:text-base">0–1 min</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "8%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-sm" 
                      />
                    </div>
                  </div>

                  {/* Fastest firms */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>Fastest firms (staffed hotline)</span>
                      <span className="text-emerald-600 font-extrabold">5–10 min</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "22%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        className="h-full bg-emerald-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Industry median */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>Industry median</span>
                      <span className="text-amber-600 font-extrabold">13–25 min</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "42%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-amber-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Manual, after hours */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>Manual, after hours</span>
                      <span className="text-rose-600 font-extrabold">240–480 min (4–8 hrs)</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "95%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="h-full bg-rose-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500 font-medium italic">
                  The range represents published data from Hennessey Digital (2025), Clio Legal Trends Report (2025) and Bloomberg Law Practice Management Survey (2025).
                </div>
              </div>
            </section>

            {/* --- CTA Box 1 --- */}
            <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">See What Go Converto Learns From Your Law Firm Site in Minutes</h3>
                <p className="text-sm text-blue-100 max-w-lg">
                  Paste your URL. Watch it scan your practice areas, intake questions, and FAQs automatically to answer prospective clients and book consultations 24/7.
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

            {/* --- Section 2: Florida Makes This Worse, or Better, Depending on Who's Ready --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Florida Makes This Worse, or Better, Depending on Who&apos;s Ready
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Every state has law firms. Florida has a uniquely loud version of the business. Tampa Bay carries more than 400 personal injury firms competing for the same pool of accident cases, and the I-275 corridor has turned into something like a rolling billboard war. Add in Florida&apos;s status as one of the fastest growing legal markets in the country, with the{" "}
                  <a 
                    href="https://wpcms.chambers.com/topics/florida-law-firms-growth-spotlight-2026/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Chambers Spotlight Florida 2026 Guide
                  </a>{" "}
                  tracking depth across dozens of practice areas statewide, and you get a market where visibility alone doesn&apos;t win. Response speed wins.
                </p>

                <p className="text-justify sm:text-left">
                  Nearly all legal consumers now begin their search online, and mobile searches for phrases like personal injury attorney near me have climbed sharply across Florida metros. That searcher is not patient. She is standing in a parking lot with a cracked windshield and a phone in her hand, and she will scroll past your firm the moment the site goes quiet.
                </p>
              </div>
            </section>

            {/* --- Section 3: The Ethics Question, Answered Properly --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                The Ethics Question, Answered Properly
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Some Florida attorneys still hesitate here, and the hesitation is fair. Using artificial intelligence to talk with prospective clients sounds, on its face, like something that could go sideways. The Florida Bar addressed this directly in{" "}
                  <a 
                    href="https://www.floridabar.org/etopinions/opinion-24-1/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Ethics Opinion 24-1
                  </a>
                  , issued in January 2024.
                </p>

                <p className="text-justify sm:text-left">
                  The bot must say, that it&apos;s an AI program and not a lawyer or an employee of the firm. The opinion also holds attorneys responsible for anything a chatbot tells a prospective client.
                </p>
              </div>

              {/* Ethics Requirements Table */}
              <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-700 border-collapse min-w-[620px]">
                    <thead>
                      <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold w-1/4">Requirement</th>
                        <th className="p-4 font-bold w-1/2">What It Means for Your Site</th>
                        <th className="p-4 font-bold bg-primary-dark text-center w-1/4">Where It Lives</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-semibold text-gray-900">AI disclosure</td>
                        <td className="p-4 text-gray-700">Chatbot must state clearly it is not a lawyer</td>
                        <td className="p-4 text-center font-semibold text-primary bg-primary/5">Fla. Bar Ethics Op. 24-1</td>
                      </tr>
                      <tr className="bg-gray-50/40 hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-semibold text-gray-900">No misleading claims</td>
                        <td className="p-4 text-gray-700">Bot answers must be accurate and verifiable</td>
                        <td className="p-4 text-center font-semibold text-primary bg-primary/5">Fla. Bar Ethics Op. 24-1</td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-semibold text-gray-900">Advertising rules apply</td>
                        <td className="p-4 text-gray-700">Chatbot conduct falls under Subchapter 4-7</td>
                        <td className="p-4 text-center font-semibold text-primary bg-primary/5">Rules Reg. The Florida Bar</td>
                      </tr>
                      <tr className="bg-gray-50/40 hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-semibold text-gray-900">Confidentiality</td>
                        <td className="p-4 text-gray-700">Vet how the AI vendor stores conversation data</td>
                        <td className="p-4 text-center font-semibold text-primary bg-primary/5">Rule 4-1.6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 p-3 border-t border-gray-200">
                  <p className="text-center text-xs text-gray-500 italic">
                    Summary of Florida Bar compliance mandates under Ethics Opinion 24-1 and Rule 4-1.6.
                  </p>
                </div>
              </div>
            </section>

            {/* --- Section 4: What This Looks Like on an Actual Florida Law Firm Site --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What This Looks Like on an Actual Florida Law Firm Site
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Strip away the marketing language and the mechanics are almost boring in their simplicity, which is exactly why they work. Someone lands on the practice area page for, say, motorcycle accidents. They start typing instead of leaving. The assistant asks what happened, when, and where, the same three questions your intake coordinator would ask on the phone.
                </p>

                <p className="text-justify sm:text-left">
                  It checks that against your actual practice areas, so a workers&apos; comp question doesn&apos;t waste anyone&apos;s time if you only handle personal injury. Then it books straight into your calendar.
                </p>
              </div>

              {/* Where Missed Inquiries Come From Visual Progress Bars */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-thunder-black text-center">
                  Where Missed Inquiries Come From
                </h3>
                <p className="mb-6 text-xs text-gray-500 text-center">
                  Common leak points in traditional law firm intake workflows
                </p>

                <div className="space-y-5 max-w-2xl mx-auto">
                  {/* Category 1 */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>After hours (nights/weekends)</span>
                      <span className="text-rose-600 font-extrabold"><AnimatedCounter target={48} suffix="%" /></span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "48%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                        className="h-full bg-rose-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>During lunch or court</span>
                      <span className="text-amber-600 font-extrabold"><AnimatedCounter target={22} suffix="%" /></span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "22%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-amber-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>Voicemail, never returned</span>
                      <span className="text-purple-600 font-extrabold"><AnimatedCounter target={18} suffix="%" /></span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "18%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="h-full bg-purple-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span>Form filled, no follow-up</span>
                      <span className="text-teal-600 font-extrabold"><AnimatedCounter target={12} suffix="%" /></span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "12%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="h-full bg-teal-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500 font-medium italic">
                  Modeled from LexisNexis Law Firm Technology Survey (2025) and Filevine follow-up data on unreturned legal leads.
                </div>
              </div>
            </section>

            {/* --- Section 5: Our Survey Findings from Florida Firms Running AI Intake --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Our Survey Findings from Florida Firms Running AI Intake
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  We pulled usage patterns across a sample of Florida law firm accounts running conversational intake through 2026 to see what actually changes once the chatbot goes live, rather than what vendors promise it will do.
                </p>
              </div>

              {/* SURVEY METRIC CARDS */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  PRACTICAL IMPACT ACROSS FLORIDA LAW OFFICES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-primary/70 mb-1">Metric 01</span>
                    <div className="text-4xl font-black text-primary my-1">
                      24/7
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Coverage window, including the 9pm to 7am gap most firms leave open
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-600/70 mb-1">Metric 02</span>
                    <div className="text-4xl font-black text-emerald-600 my-1">
                      <AnimatedCounter target={2} prefix="<" suffix="s" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Typical time to first response once a visitor starts typing
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-primary-dark/70 mb-1">Metric 03</span>
                    <div className="text-4xl font-black text-primary-dark my-1">
                      3 steps
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      From first message to a booked consultation, no phone tag
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  Our surveys show this pattern holding steady across practice areas, though personal injury and family law firms saw the sharpest gains, which tracks with what the Clio and FindLaw data already suggested. Those are the crisis-driven practice areas where a person picks the first firm willing to talk, not the firm with the nicest website.
                </p>
              </div>

              {/* Salman Quote Card */}
              <div className="my-8 rounded-2xl bg-gradient-to-br from-gray-900 via-thunder-black to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                <FaQuoteLeft className="absolute right-4 bottom-2 h-28 w-28 text-white/5 pointer-events-none" />
                <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-100 mb-6 text-justify sm:text-left">
                  “The law firms signing the most high-value cases from their web traffic don&apos;t rely on Monday morning voicemails. They deploy compliant AI chatbots that answer questions instantly, respect Florida Bar boundaries, and immediately secure consultation appointments on the attorney&apos;s calendar.”
                </p>
                <div className="border-t border-gray-800 pt-4 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-white text-base">Salman H Saikote</div>
                    <div className="text-xs text-primary-light">
                      Managing Partner,{" "}
                      <a 
                        href="https://bayshorecommunication.com" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        Bayshore Communication
                      </a>{" "}
                      (the team behind Go Converto.)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section 6: Where This Fits Into the Bigger Local SEO Picture --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Where This Fits Into the Bigger Local SEO Picture
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  What people forget (or choose to ignore), however, is that Google&apos;s algorithm favors engagement. This means dwell time, answering the questions of the visitors, and far more than just keyword stuffing. A chatbot that keeps a Tampa visitor engaged, answering their questions about your practice areas in real language, feeds exactly the signals search engines reward.
                </p>

                <p className="text-justify sm:text-left">
                  It&apos;s not a replacement for content or for the trust signals that E-E-A-T rewards, reviews, citations, a real attorney bio behind every page. It&apos;s the mechanism that keeps a visitor on your domain long enough for those signals to matter. Pair a chatbot with the kind of local content strategy outlined in Go Converto&apos;s breakdown of{" "}
                  <Link 
                    href="/blog/what-are-conversational-ai-agents-guide"
                    className="font-bold text-primary hover:underline"
                  >
                    conversational AI agents
                  </Link>
                  , and the two start reinforcing each other. Content brings the Tampa searcher in. The chatbot keeps her talking instead of bouncing to the next tab.
                </p>
              </div>
            </section>

            {/* --- Section 7: Setting It Up Without Touching a Line of Code --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Setting It Up Without Touching a Line of Code
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  The technical barrier that used to justify putting this off no longer exists. The setup runs in 3 plain steps.
                </p>
              </div>

              {/* 3 Step Visual Cards */}
              <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                    1
                  </div>
                  <h3 className="text-base font-bold text-thunder-black mb-2">Paste URL</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Paste the firm&apos;s website URL into Go Converto to initiate the automatic knowledge scan.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                    2
                  </div>
                  <h3 className="text-base font-bold text-thunder-black mb-2">Auto-Scan</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    The system scans every page, every FAQ, and every practice area description already published.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black text-lg mb-4">
                    3
                  </div>
                  <h3 className="text-base font-bold text-thunder-black mb-2">Deploy Live</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    It trains itself on that content and goes live within minutes, handling inquiries accurately 24/7.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  From there, it answers new visitors accurately, at any hour, without a human rewriting its lines every time a new practice area gets added to the site.
                </p>

                <p className="text-justify sm:text-left">
                  Pricing scales with the size of the practice, from a solo attorney testing the waters up through firms running unlimited visitor volume on an enterprise plan with custom training and dedicated onboarding. The entry point carries a 14-day free trial across every tier, which is long enough to watch actual Florida visitors interact with it before committing a dime.
                </p>
              </div>
            </section>

            {/* --- Section 8: The Honest Trade-Off Nobody Advertises --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                The Honest Trade-Off Nobody Advertises
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify sm:text-left">
                  A chatbot will not argue a motion. It will not negotiate a settlement or read a jury&apos;s mood in a Hillsborough County courtroom. Anyone selling it as a replacement for legal judgment is selling something dishonest, and the Florida Bar&apos;s own guidance makes that distinction explicit by requiring the disclosure in the first place. What it does is smaller and, frankly, more urgent.
                </p>

                <p className="text-justify sm:text-left">
                  Firms that treat that as a small thing tend to be the same firms wondering, every quarter, why the marketing budget keeps climbing while signed cases stay flat. The two problems are usually the same problem.
                </p>
              </div>

              {/* Callout Box: Your Next Client Is Searching Right Now */}
              <div className="my-10 rounded-2xl bg-gradient-to-br from-thunder-black via-gray-900 to-primary-dark p-8 sm:p-10 text-white shadow-xl text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Your Next Client Is Searching Right Now
                </h3>
                <p className="text-base text-gray-300 max-w-md mx-auto">
                  Every plan opens with a 14-day free trial. Capture after-hours accident and injury leads on autopilot.
                </p>
                <div className="pt-2">
                  <Link
                    href="/start-free-trial"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                  >
                    Start My Free Trial &nbsp;&rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* --- Section 9: FAQ Section --- */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-center">
                Frequently Asked Questions
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
                      <div className="border-t border-gray-100 bg-gray-50/50 p-5 text-sm text-gray-700 leading-relaxed text-justify sm:text-left">
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
