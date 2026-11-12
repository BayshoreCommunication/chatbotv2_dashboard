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
  HiOutlineChatBubbleLeftRight,
  HiOutlineMagnifyingGlass,
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
      "@id": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites#breadcrumb",
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
          "name": "What Is an AI-Powered Chatbot for Websites?",
          "item": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites",
        },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites#blogposting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites",
      },
      "headline": "What Is an AI-Powered Chatbot for Websites?",
      "name": "What’s an AI Chatbot for Websites & Why You Need One Today?",
      "description":
        "AI website chatbot is a smart virtual helper that engages online users and qualifies leads. See why top brands refuse to live without this new tech.",
      "url": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites",
      "image": {
        "@type": "ImageObject",
        "url":
          "https://www.goconverto.com/assets/static-blog/what-is-an-ai-powered-chatbot-for-websites-guide.webp",
      },
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://www.goconverto.com/blog#blog",
        "name": "Go Converto Blog",
        "url": "https://www.goconverto.com/blog",
      },
      "about": {
        "@type": "Thing",
        "name": "AI-Powered Website Chatbots and Automated Lead Generation",
      },
      "keywords": [
        "What Is an AI-Powered Chatbot for Websites",
        "AI chatbot for websites",
        "AI website chatbot",
        "website chatbot guide",
        "automated lead capture",
        "24/7 customer support chatbot",
        "Florida small business chatbot",
        "conversational AI chatbot",
        "Go Converto",
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
      "datePublished": "2026-11-12",
      "dateModified": "2026-11-12",
      "inLanguage": "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites#faq",
      "url": "https://www.goconverto.com/blog/what-is-an-ai-powered-chatbot-for-websites",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can a chatbot hurt my SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A chat widget doesn’t change rankings on its own. A heavy script can slow your pages, so test load speed before and after installing.",
          },
        },
        {
          "@type": "Question",
          "name": "How to ensure my chatbot is working properly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Watch conversations started, leads captured, appointments booked, and handoffs to your team. Converto’s real time analytics give you that picture.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I manage leads via my mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, absolutely. You can see any new leads, conversations and meetings on your mobile with our App.",
          },
        },
        {
          "@type": "Question",
          "name": "Can AI chatbots replace my receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "It can take the repeat questions and the after hours shift. People should still own sensitive, urgent, and high stakes conversations.",
          },
        },
      ],
    },
  ],
};

const weeklyCoverage = [
  { day: "Monday", hasFrontDesk: true },
  { day: "Tuesday", hasFrontDesk: true },
  { day: "Wednesday", hasFrontDesk: true },
  { day: "Thursday", hasFrontDesk: true },
  { day: "Friday", hasFrontDesk: true },
  { day: "Saturday", hasFrontDesk: false },
  { day: "Sunday", hasFrontDesk: false },
];

export default function WhatIsAnAiPoweredChatbotForWebsites() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Can a chatbot hurt my SEO?",
      a: "A chat widget doesn’t change rankings on its own. A heavy script can slow your pages, so test load speed before and after installing.",
    },
    {
      q: "How to ensure my chatbot is working properly?",
      a: "Watch conversations started, leads captured, appointments booked, and handoffs to your team. Converto’s real time analytics give you that picture.",
    },
    {
      q: "Can I manage leads via my mobile?",
      a: "Yes, absolutely. You can see any new leads, conversations and meetings on your mobile with our App.",
    },
    {
      q: "Can AI chatbots replace my receptionist?",
      a: "It can take the repeat questions and the after hours shift. People should still own sensitive, urgent, and high stakes conversations.",
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
          { label: "What Is an AI-Powered Chatbot for Websites?" },
        ]}
        title="What Is an AI-Powered Chatbot for Websites?"
        image="/assets/static-blog/what-is-an-ai-powered-chatbot-for-websites-guide.webp"
        imageAlt="3D AI robot gesturing toward a laptop displaying an automated website chat assistant with feature icons above."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                  Go Converto | AI Website Chatbot Guide
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Automated Support &amp; Lead Generation
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                What Is an AI-Powered Chatbot for Websites?
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: November 12, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: November 12, 2026
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
                  src="/assets/static-blog/what-is-an-ai-powered-chatbot-for-websites-guide.webp"
                  alt="3D AI robot gesturing toward a laptop displaying an automated website chat assistant with feature icons above."
                  title="What Is an AI-Powered Chatbot for Websites? Guide"
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
                  Caption: Discover how AI-powered website chatbots automate support and capture qualified leads around the clock.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Learn what an AI-powered website chatbot is and how it delivers instant support, engages visitors, qualifies leads, and drives higher conversions 24/7.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800 text-justify">
                AI powered chatbots for your website are smart pieces of software that can learn from your web pages. They can understand free text queries and respond in seconds. They allow you to get information from your leads, book appointments and pass on complex conversations to a person. This wouldn&apos;t be possible with scripted menus and contact forms.
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
                  "Modern chatbots unite the language model with your website content. So answers come from your facts.",
                  "The real quality test is how the bot behaves when it doesn’t know something.",
                  "Reply speed decides who wins the lead and a bot is the only channel with no queue.",
                  "Florida businesses should check consent rules before any chatbot starts texting leads.",
                  "Setup takes minutes, so a trial teaches you more than any sales demo.",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <HiOutlineCheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium leading-relaxed text-gray-700 text-justify">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- Intro Paragraph & Benchmark Cards --- */}
            <section className="mb-12">
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  <span className="float-left mr-3 text-5xl font-extrabold leading-none text-primary">
                    Y
                  </span>
                  ou already know what a chatbot is. What you want to know is whether the new generation is a real revenue tool or a shinier way to annoy visitors. Fair question. Go Converto builds one, so we have opinions, and we will show our work.
                </p>
              </div>

              {/* STAT BENCHMARK CARDS */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  RESPONSE SPEED &amp; MARKET BENCHMARKS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-primary-dark/80 mb-1">
                      Lead Response
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-primary my-1">
                      <AnimatedCounter target={37} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Share of 2,241 audited US companies that answered a web lead inside an hour
                    </div>
                    <div className="mt-2 text-[11px] font-semibold italic text-gray-400">
                      Harvard Business Review
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-600/80 mb-1">
                      AI Resolution
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-600 my-1">
                      <AnimatedCounter target={80} suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Common service issues Gartner expects AI agents to resolve alone by 2029
                    </div>
                    <div className="mt-2 text-[11px] font-semibold italic text-gray-400">
                      Gartner, March 2025
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-xs font-bold uppercase text-blue-600/80 mb-1">
                      Florida Market
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-primary-dark my-1">
                      <AnimatedCounter target={3.5} decimals={1} suffix="M" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      Small businesses operating in Florida today
                    </div>
                    <div className="mt-2 text-[11px] font-semibold italic text-gray-400">
                      SBA Office of Advocacy, 2025
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section 1: AI-powered chatbots are different from the bot that frustrated you in 2019 --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                AI-powered chatbots are different from the bot that frustrated you in 2019
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  The old guard ran on decision trees. If you pressed one, you got a price; if you pressed two, you got hours, and any other button you hit, you just hit a brick wall. They also relied on matching keywords, so if you made one typo then it would fail completely.
                </p>

                <p className="text-justify">
                  The next generation understands intent. If I type &apos;Can you fit me in on Saturday? I&apos;m out in Brandon.&apos; The system understands what I need, pulls out the relevant facts and will reply in obvious English. This is a real step forward but the language model itself is a simple chatterbot. It&apos;s easy to get a chatterbot to speak well. The interesting stuff happens in the bits that support it.
                </p>
              </div>

              {/* 3-Layer Architecture Comparison Table */}
              <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-700 border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold w-1/4">Layer</th>
                        <th className="p-4 font-bold w-[37.5%]">What it does</th>
                        <th className="p-4 font-bold bg-primary-dark w-[37.5%]">How it usually fails</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Language model</td>
                        <td className="p-4 text-gray-700">
                          Parses messy human phrasing and writes the reply
                        </td>
                        <td className="p-4 font-medium text-gray-900 bg-primary/5">
                          Confident guessing once the facts run out
                        </td>
                      </tr>
                      <tr className="bg-gray-50/40 hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Knowledge source</td>
                        <td className="p-4 text-gray-700">
                          Supplies your services, pricing, hours, and policies
                        </td>
                        <td className="p-4 font-medium text-gray-900 bg-primary/5">
                          Stale pages, missing details, or generic filler
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Action layer</td>
                        <td className="p-4 text-gray-700">
                          Captures leads, books calls, and escalates to a person
                        </td>
                        <td className="p-4 font-medium text-gray-900 bg-primary/5">
                          Dead ends with no exit and no follow up
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-left">
                  Here is my take. Vendor demos obsess over the first row because it dazzles. Buy on the second and third. A bot that speaks beautifully from stale facts is a liability with excellent manners.
                </p>
              </div>
            </section>

            {/* --- Section 2: Where do website chatbots fail and who pays when they do? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                Where do website chatbots fail and who pays when they do?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Air Canada learned this the expensive way. Its website chatbot misquoted a bereavement fare policy, a grieving passenger relied on it, and British Columbia&apos;s Civil Resolution Tribunal made the airline pay, a ruling covered in detail by{" "}
                  <a
                    href="https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    the American Bar Association&apos;s Business Law Today
                  </a>
                  . The airline had argued its bot was a separate legal entity. The tribunal was unmoved.
                </p>
              </div>

              {/* Quote Card: Christopher C. Rivers */}
              <div className="my-8 rounded-2xl bg-gradient-to-br from-gray-900 via-thunder-black to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
                <FaQuoteLeft className="absolute right-4 bottom-2 h-28 w-28 text-white/5 pointer-events-none" />
                <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-100 mb-6 text-left">
                  &ldquo;&hellip;makes no difference whether the information comes from a static page or a chatbot.&rdquo;
                </p>
                <div className="border-t border-gray-800 pt-4 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-white text-base">Christopher C. Rivers</div>
                    <div className="text-xs text-primary">
                      Tribunal Member, British Columbia Civil Resolution Tribunal, Moffatt v. Air Canada (2024)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Read that as a small business owner. Your chatbot is part of your website, legally and practically. If they&apos;re quoting a price you didn&apos;t set, then congratulations, you&apos;ve just set a price. This is why grounding is better than personality. A bot who can say I&apos;ll get a human for you will gain more trust than one who has answers for everything.
                </p>

                <p className="text-justify">
                  So you need to ask questions before any bot touches your traffic. 5 probes expose most weaknesses.
                </p>
              </div>

              {/* 5 Diagnostic Probes Card */}
              <div className="my-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineMagnifyingGlass className="h-4 w-4" />
                  5 Vendor Probes Before Launch
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Ask something your site never covers and watch for a confident invention.",
                    "Then you can change a price on your site and calculate how long it takes for the bot to update.",
                    "Type like a tired human, with typos and half sentences.",
                    "Get angry on purpose and see whether it hands you to a person.",
                    "Try booking a call from the first message to the confirmed slot.",
                  ].map((probe, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary-dark mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-gray-700 text-justify">
                        {probe}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Run them on every vendor, including us.
                </p>
              </div>
            </section>

            {/* --- Section 3: Why does speed after hours decide who wins the lead? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                Why does speed after hours decide who wins the lead?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Researchers James Oldroyd, Kristina McElheran and David Elkington took measurements at what speed companies respond to web queries which is still used in all serious speed to lead arguments in{" "}
                  <a
                    href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    Harvard Business Review
                  </a>
                  . The boxes above carry the headline numbers. The part worth sitting with is the schedule.
                </p>

                <p className="text-justify">
                  A contact form inherits the working hours of whoever reads it. A chatbot inherits nothing. In Florida, that gap has local color. Tourists plan trips at 10 PM. Snowbirds vet contractors from living rooms in Ohio. They search, they click, and they pick whoever answers first.{" "}
                  <a
                    href="https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-20290"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    Gartner predicts that by 2029
                  </a>
                  , AI will reduce operating costs by 30% in customer service (although all predictions are weather dependent).
                </p>
              </div>

              {/* Interactive Range Chart: Hours Covered in a Standard Week */}
              <div
                className="my-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-md"
                role="img"
                aria-label="Range graph of hours covered in a standard week by a front desk versus a chatbot"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-thunder-black">
                      Hours covered in a standard week
                    </h3>
                    <p className="text-xs text-gray-500">
                      9 to 5 front desk (40 hours a week) vs. AI Chatbot (168 hours a week)
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-3 w-5 rounded-sm bg-thunder-black inline-block" />
                      9 to 5 front desk (40 hrs)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-3 w-5 rounded-sm bg-primary/40 border border-primary-dark inline-block" />
                      Chatbot (168 hrs)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {weeklyCoverage.map((row, idx) => (
                    <div key={row.day} className="flex items-center gap-3">
                      <div className="w-20 sm:w-24 shrink-0 text-xs sm:text-sm font-semibold text-gray-700">
                        {row.day}
                      </div>
                      <div className="relative h-7 flex-1 rounded-lg bg-primary/25 border border-primary/40 overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                          style={{ originX: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-primary/25 via-primary/35 to-primary/25"
                        />
                        {row.hasFrontDesk && (
                          <div
                            className="absolute top-1 bottom-1 rounded bg-thunder-black shadow-sm"
                            style={{ left: "37.5%", width: "33.33%" }}
                            title="9 AM - 5 PM Front Desk"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Axis */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-20 sm:w-24 shrink-0" />
                  <div className="flex-1 flex justify-between text-[10px] sm:text-xs font-medium text-gray-500">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500 italic">
                  Range graph of hours covered in a standard week by a front desk versus a chatbot.
                </p>
              </div>
            </section>

            {/* --- CTA Box 1 --- */}
            <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-100">
                  TRY IT ON YOUR OWN SITE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  See what your website would say back
                </h2>
                <p className="text-sm text-blue-50 max-w-lg">
                  Paste your URL and Go Converto reads your pages and builds a chatbot in minutes.
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

            {/* --- Section 4: Go Converto built a chatbot that actually knows your business --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                Go Converto built a chatbot that actually knows your business
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Converto works in three moves, and the{" "}
                  <Link
                    href="/how-it-works"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    how it works page
                  </Link>{" "}
                  walks through each one.
                </p>
              </div>

              {/* 3 Moves Cards */}
              <div className="my-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <ol className="space-y-5">
                  {[
                    {
                      title: "Scan.",
                      desc: "You enter a company name and website URL. Converto reads your services, pricing, and FAQs, then pulls in useful business details from Google. There is nothing to upload and nothing to write.",
                    },
                    {
                      title: "Learn.",
                      desc: "In under a minute, everything lands in a knowledge base. And when your website changes, that knowledge changes with it. No retraining ritual, no forgotten PDF from 2023 haunting your answers.",
                    },
                    {
                      title: "Respond.",
                      desc: "Visitors get answers, follow up questions that qualify them, and bookings dropped onto your calendar through Calendly. When a human should step in, takeover is built in. A mobile app lets you watch leads arrive from the driveway or the dock.",
                    },
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-thunder-black text-xs font-black mt-0.5">
                        {i + 1}
                      </span>
                      <div className="text-sm sm:text-base leading-relaxed text-gray-700 text-justify">
                        <strong className="text-thunder-black font-bold">{step.title}</strong>{" "}
                        {step.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Our bias is showing, but the reasoning holds. Zero upload training removes the most common cause of bot dishonesty, which is outdated source material.
                </p>
              </div>

              {/* Quote Card: Go Converto Team */}
              <div className="my-8 rounded-2xl border-l-4 border-primary bg-blue-50/70 p-6 sm:p-7 shadow-sm">
                <p className="text-base sm:text-lg font-medium leading-relaxed italic text-gray-900 mb-3 text-left">
                  &ldquo;A chatbot that guesses is a liability. One that reads your own pages and knows when to hand off is a teammate.&rdquo;
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                  <span className="text-primary-dark font-bold">The Go Converto team</span>
                  <span className="text-gray-400">&mdash;</span>
                  <span className="text-gray-600 font-normal">Tampa, Florida</span>
                </div>
              </div>

              {/* 4-Metric Feature Strip */}
              <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                {[
                  {
                    value: "2 sec",
                    label: "Answer time for every visitor, day or night",
                    source: "Go Converto",
                    color: "text-primary-dark",
                  },
                  {
                    value: "10 min",
                    label: "Or less from pasting a URL to a live chatbot",
                    source: "Go Converto",
                    color: "text-blue-600",
                  },
                  {
                    value: "1,000+",
                    label: "Businesses using the platform",
                    source: "Go Converto",
                    color: "text-emerald-600",
                  },
                  {
                    value: "14 days",
                    label: "Free trial on every plan",
                    source: "Go Converto",
                    color: "text-thunder-black",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1.5`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 leading-snug mb-2">
                      {stat.label}
                    </div>
                    <div className="text-[11px] font-semibold italic text-gray-400">
                      {stat.source}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- Section 5: What should Florida businesses check before turning one on? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                What should Florida businesses check before turning one on?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Florida runs on small firms. The{" "}
                  <a
                    href="https://advocacy.sba.gov/wp-content/uploads/2025/06/Florida_2025-State-Profile.pdf"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    SBA Office of Advocacy
                  </a>{" "}
                  puts them at 99.8 percent of the state&apos;s businesses, which means most owners are also their own night shift. That is exactly where a chatbot earns its keep.
                </p>

                <p className="text-justify">
                  One caution before you flip the switch. As soon as a bot asks for a phone number, Florida&apos;s Telephone Solicitation Act (
                  <a
                    href="https://codes.findlaw.com/fl/title-xxxiii-regulation-of-trade-commerce-investments-and-solicitations/fl-st-sect-501-059/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    Section 501.059 Florida Statutes
                  </a>
                  ) comes into play. This has been{" "}
                  <a
                    href="https://laws.flrules.org/2023/150"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    amended in 2023
                  </a>{" "}
                  to include affirmative consent such as clicking a box or texting &apos;yes&apos;.
                </p>

                <p className="text-justify">
                  There&apos;s also a provision allowing the sender a 15-day cooling off period after receiving a STOP notice. In practice, ask for the number, say plainly what texting will follow, and honor STOP immediately. We are a software company and not your attorney, so walk the flow past counsel.
                </p>

                <p className="text-justify">
                  Fit matters too. As you can see, the questions that a spa in Tampa may have are very different to the questions an injury company in Orlando would ask. So we tailor our platform to law firms, healthcare, real estate, consultancy, agencies and tech companies. You can{" "}
                  <Link
                    href="/industries"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    browse these industries here
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* --- Section 6: AI-powered website chatbot cost in 2026 --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                AI-powered website chatbot cost in 2026
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Converto publishes its prices, which is rarer than it should be. Two named tiers, one custom route, and a free trial on every plan with no long term contract. Current details live on the{" "}
                  <Link
                    href="/pricing"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    pricing page
                  </Link>
                  , and here is the snapshot.
                </p>
              </div>

              {/* Pricing Table */}
              <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-700 border-collapse min-w-[660px]">
                    <thead>
                      <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold">Plan</th>
                        <th className="p-4 font-bold">Per month, billed yearly</th>
                        <th className="p-4 font-bold">Per year</th>
                        <th className="p-4 font-bold">Visitors per month</th>
                        <th className="p-4 font-bold bg-primary-dark">What it adds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Professional</td>
                        <td className="p-4 font-semibold text-gray-900">$42</td>
                        <td className="p-4 text-gray-700">$499</td>
                        <td className="p-4 text-gray-700">1,000</td>
                        <td className="p-4 text-gray-800 bg-primary/5">
                          AI and human takeover, lead capture without forms, Calendly booking, analytics, mobile app
                        </td>
                      </tr>
                      <tr className="bg-gray-50/40 hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Advanced</td>
                        <td className="p-4 font-semibold text-gray-900">$83</td>
                        <td className="p-4 text-gray-700">$999</td>
                        <td className="p-4 text-gray-700">2,500</td>
                        <td className="p-4 text-gray-800 bg-primary/5">
                          Team access, CRM and social integrations, priority support, dedicated account manager
                        </td>
                      </tr>
                      <tr className="bg-white hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-thunder-black">Enterprise</td>
                        <td className="p-4 font-semibold text-gray-900">Custom</td>
                        <td className="p-4 text-gray-700">Custom</td>
                        <td className="p-4 text-gray-700">Unlimited</td>
                        <td className="p-4 text-gray-800 bg-primary/5">
                          Custom AI training, custom integrations, tailored SLA
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Figure 2: Cost per 1,000 visitors vertical bar chart */}
              <div
                className="my-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md"
                role="img"
                aria-label="Vertical bar chart of cost per 1,000 visitors at plan capacity for the Professional and Advanced plans"
              >
                <h3 className="text-base sm:text-lg font-extrabold text-thunder-black text-center mb-1">
                  Cost per 1,000 visitors at plan capacity
                </h3>
                <p className="text-xs text-gray-500 text-center mb-6">
                  Dollars per 1,000 visitors (annual billing capacity comparison)
                </p>

                <div className="max-w-lg mx-auto">
                  <div className="relative h-56 sm:h-64 flex items-end justify-center gap-10 sm:gap-20 border-b border-gray-300 px-4 pt-8">
                    {/* Horizontal reference gridlines */}
                    <div className="absolute inset-x-0 bottom-[84%] border-t border-dashed border-gray-200 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-[66.4%] border-t border-dashed border-gray-200 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-[40%] border-t border-dashed border-gray-200 pointer-events-none" />

                    {/* Bar 1: Professional ($42.00 / 50 max = 84%) */}
                    <div className="flex flex-col items-center w-28 sm:w-36 h-full justify-end">
                      <span className="mb-2 text-base sm:text-lg font-black text-thunder-black">
                        $<AnimatedCounter target={42} decimals={2} />
                      </span>
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "84%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full rounded-t-xl bg-thunder-black shadow-md"
                      />
                    </div>

                    {/* Bar 2: Advanced ($33.20 / 50 max = 66.4%) */}
                    <div className="flex flex-col items-center w-28 sm:w-36 h-full justify-end">
                      <span className="mb-2 text-base sm:text-lg font-black text-primary-dark">
                        $<AnimatedCounter target={33.2} decimals={2} />
                      </span>
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "66.4%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-primary-dark to-primary shadow-md"
                      />
                    </div>
                  </div>

                  {/* X-axis Labels */}
                  <div className="flex justify-center gap-10 sm:gap-20 mt-3 text-center">
                    <div className="w-28 sm:w-36">
                      <div className="text-xs sm:text-sm font-bold text-thunder-black">
                        Professional
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500">
                        1,000 visitors
                      </div>
                    </div>
                    <div className="w-28 sm:w-36">
                      <div className="text-xs sm:text-sm font-bold text-thunder-black">
                        Advanced
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500">
                        2,500 visitors
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-center text-xs text-gray-500 italic">
                  Figure 2. Cost per 1,000 visitors at full plan capacity, based on published annual billing rates, rounded.
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Divide each plan&apos;s price by its visitor cap and the scaling logic appears. The bigger tier is the cheaper way to serve a crowd, so steady traffic argues for climbing a rung. For the wider business case, our guide on{" "}
                  <Link
                    href="/blog/why-every-business-needs-an-ai-lead-generation-chatbot"
                    className="font-bold text-primary-dark hover:underline"
                  >
                    why every business needs an AI lead generation chatbot
                  </Link>{" "}
                  picks up where this section stops.
                </p>
              </div>
            </section>

            {/* --- Section 7: What do our surveys show about real visitor behavior? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                What do our surveys show about real visitor behavior?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Our surveys of Converto setups across Florida law firms, home service shops, and wellness studios keep surfacing one misconception. Owners assume visitors want to chat but they don&apos;t. Visitors want a verdict on three things, whether you do what they need, roughly what it costs, and when they can be seen. Chat is merely the fastest delivery truck.
                </p>

                <p className="text-justify">
                  Our surveys also show that the best performing bots are the ones fed the most specific pricing and availability pages, while bots built on a vague homepage tend to stall. And a booked slot beats a captured email almost every time. Email addresses are polite. Calendar invites are commitments.
                </p>
              </div>
            </section>

            {/* --- Section 8: So, should your website have one? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
                So, should your website have one?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-justify">
                  Yes, if you choose well. Skip any bot that can&apos;t cite its sources, hides its handoff, or needs retraining by hand. Pick one that learns from your site, refreshes itself, and escalates gracefully. We think that describes Converto, and the free trial is the cheapest way to prove us wrong.
                </p>

                <p className="text-justify">
                  A good chatbot is a porch light left on in a Gulf Coast storm. It does not close the sale. It just makes sure nobody drives past thinking you are closed.
                </p>
              </div>

              {/* Callout Box 2: YOUR WEBSITE, ANSWERING BACK */}
              <div className="my-10 rounded-2xl bg-gradient-to-br from-thunder-black via-gray-900 to-primary-dark p-8 sm:p-10 text-white shadow-xl text-center space-y-4">
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-primary">
                  YOUR WEBSITE, ANSWERING BACK
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Leave the porch light on
                </h3>
                <p className="text-base text-gray-300 max-w-md mx-auto">
                  Watch your own pages talk to your next customer.
                </p>
                <div className="pt-2">
                  <Link
                    href="/start-free-trial"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-thunder-black shadow-lg transition-all hover:bg-primary-dark hover:text-white hover:scale-105"
                  >
                    Start Your Free Trial
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* --- Section 9: FAQ --- */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight text-left">
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
                      className="flex w-full items-center justify-between p-5 text-left font-bold text-thunder-black hover:text-primary-dark transition-colors focus:outline-none"
                    >
                      <h3 className="text-base sm:text-lg font-bold pr-4">{faq.q}</h3>
                      <HiChevronDown
                        className={`h-5 w-5 shrink-0 text-primary-dark transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="border-t border-gray-100 bg-gray-50/50 p-5 text-sm text-gray-700 leading-relaxed text-left">
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

