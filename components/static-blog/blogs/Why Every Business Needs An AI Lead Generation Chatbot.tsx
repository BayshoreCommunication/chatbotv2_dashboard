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
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowTrendingUp,
  HiOutlineUserGroup,
  HiOutlineCpuChip
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

export default function WhyEveryBusinessNeedsAnAiLeadGenerationChatbot() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Is an AI chatbot the same as live chat?",
      a: "No. Live chat requires the involvement of a person, whereas an AI chatbot replies based on the learning process on the business’s data."
    },
    {
      q: "Will people know they are chatting with a bot?",
      a: "Most platforms disclose this somewhere in the widget, and honestly, most visitors don't mind once the answers are fast and accurate. What frustrates people is a slow answer, not an honest one."
    },
    {
      q: "Can a chatbot handle appointment scheduling directly?",
      a: "Yes, modern platforms connect directly to calendar tools so a visitor can book a slot inside the chat itself, no separate scheduling email required."
    }
  ];

  return (
    <>
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Why Every Business Needs An AI Lead Generation Chatbot" }
        ]}
        title="Why Every Business Needs An AI Lead Generation Chatbot"
        image="/assets/static-blog/why-every-business-needs-an-ai-lead-generation-chatbot.webp"
        imageAlt="Friendly robot using a Go Converto chatbot interface to engage visitors and qualify leads for a business."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Go Converto | AI Lead Generation Guide
                </span>
                <span className="text-xs font-medium text-gray-500">Strategy & Tech</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                Why Every Business Needs An AI Lead Generation Chatbot
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: September 27, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: September 27, 2026
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
                  src="/assets/static-blog/why-every-business-needs-an-ai-lead-generation-chatbot.webp"
                  alt="Friendly robot using a Go Converto chatbot interface to engage visitors and qualify leads for a business."
                  title="Why Every Business Needs An AI Lead Generation Chatbot"
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
                  Caption: Learn how implementing an AI lead generation chatbot helps your business attract more leads, stay available 24/7, and boost conversions.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Discover why every business needs an AI lead generation chatbot with Go Converto. Learn how automated chatbots engage visitors 24/7, qualify leads instantly, book appointments, and turn conversations into customers for greater growth.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800 text-left sm:text-justify">
                Every business needs an AI chatbot because it&rsquo;ll greet the online visitors immediately, engaging them in a reasonable conversation. It answers their questions and collects their contact details at the time of engagement. This means that you can turn any website visitor into a paying customer 24/7 and get dramatically more leads than with conventional web forms.
              </p>
            </div>

            {/* --- Key Points Section --- */}
            <div className="mb-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-blue-50/30 p-6 sm:p-8 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-thunder-black uppercase tracking-wide border-b border-primary/10 pb-3">
                <HiOutlineSparkles className="h-6 w-6 text-primary" />
                Key Points
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  {
                    title: "Speed decides the sale.",
                    desc: "Leads contacted within five minutes convert dramatically better than leads left waiting an hour."
                  },
                  {
                    title: "Forms make people work.",
                    desc: "Chatbots make people talk, and talking converts at a far higher rate than filling boxes."
                  },
                  {
                    title: "Every visitor gets attention.",
                    desc: "A chatbot works nights, weekends, and holidays, the exact hours a form sits ignored."
                  },
                  {
                    title: "Qualification happens in real time.",
                    desc: "The bot separates a browser from a buyer before your team ever picks up the phone."
                  },
                  {
                    title: "Setup is not the barrier it used to be.",
                    desc: "A no-code chatbot can scan a site and start answering questions the same day."
                  }
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <HiOutlineCheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-gray-700">
                      <strong className="text-thunder-black font-semibold">{point.title}</strong>{" "}
                      {point.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- Section: Let's Talk About The Number Nobody Wants To Say Out Loud --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Let&apos;s Talk About The Number Nobody Wants To Say Out Loud
              </h2>

              <div className="prose-custom mb-6 text-base leading-relaxed text-gray-700 space-y-4">
                <p className="text-left sm:text-justify">
                  <span className="float-left mr-3 text-5xl font-extrabold leading-none text-primary">L</span>
                  et&rsquo;s start with something basic, shall we? How many users did your website have this past month? How many of them you can actually remember?
                </p>
                <p className="text-left sm:text-justify">
                  Most business owners would stop at the first number because analytics software can tell them that. However, the moment you can&rsquo;t name the visitors or score them as leads, you begin losing money. That&rsquo;s the point where a business begins to hemorrhage funds with every new visitor who doesn&rsquo;t convert.
                </p>
              </div>

              {/* STAT CARDS 1 */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  AT A GLANCE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      <AnimatedCounter target={2} suffix=" sec" />
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Typical AI chatbot response time
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      24/7
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Hours a chatbot stays on duty
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      2–4x
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Conversion lift over static forms
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-base leading-relaxed text-gray-700">
                <p className="text-left sm:text-justify">
                  Florida makes this worse, not better. Snowbirds search at 11pm from a hotel room. Contractors get pinged mid job when a hand is covered in drywall dust. Tampa traffic eats up enough attention that a slow website reply loses the moment completely. A static contact form was built for a slower internet. It waits patiently. Nobody else is waiting patiently anymore.
                </p>
              </div>
            </section>

            {/* --- Section: What Happens When Visitors Land On Your Site --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Happens When Visitors Land On Your Site
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-left sm:text-justify">
                  Let&rsquo;s say someone finds your business through a Google search, clicks through, skims the homepage, and hits a wall. A contact form. Name, email, phone, message, submit, and hope. Most people close the tab right there. They came with a question and not to get tangled in papers.
                </p>
                <p className="text-left sm:text-justify">
                  Now flip it. A chatbot greets them, answers the question they actually had, mentions pricing or availability without being asked twice, and only then asks for a name and number. By the time it asks, trust already exists.
                </p>
                <p className="text-left sm:text-justify">
                  Chatbot funnels are shown to convert at roughly <strong className="font-bold text-thunder-black">2.4 times</strong> the rate of a static web form across the wider research on this, based on data reported by{" "}
                  <a
                    href="https://www.hubspot.com/state-of-marketing"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    HubSpot&apos;s State of Marketing research
                  </a>
                  . That single stat should reorganize how any Florida business thinks about its homepage.
                </p>
              </div>
            </section>

            {/* --- Section: How Fast Does A Response Actually Need To Be? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                How Fast Does A Response Actually Need To Be?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-6">
                <p className="text-left sm:text-justify">
                  Speed to lead research from InsideSales and echoed widely across sales operations studies found something brutal. Leads contacted within five minutes are dramatically more likely to convert than leads reached even thirty minutes later. Not double. Not triple. Dramatically.
                </p>
                <p className="text-left sm:text-justify">
                  A chatbot doesn&apos;t get tired, doesn&apos;t step away for lunch, doesn&apos;t miss the notification because a phone was on silent during a job site walkthrough. It answers in seconds, every time, and that consistency compounds into revenue most businesses never trace back to its source.
                </p>
              </div>

              {/* RESPONSE TIME VS LIKELY OUTCOME GRAPHIC */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-thunder-black text-center flex items-center justify-center gap-2">
                  <HiOutlineClock className="h-5 w-5 text-primary" />
                  Lead Response Window vs Likely Outcome
                </h3>
                <div className="space-y-6 max-w-xl mx-auto">
                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        Under 5 min
                      </span>
                      <span className="text-emerald-700 font-extrabold">78%–92% Likely Outcome</span>
                    </div>
                    <div className="h-5 w-full rounded-full bg-gray-100 overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "88%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                      >
                        88%
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                        5 to 30 min
                      </span>
                      <span className="text-amber-700 font-extrabold">35%–55% Likely Outcome</span>
                    </div>
                    <div className="h-5 w-full rounded-full bg-gray-100 overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "45%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                      >
                        45%
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-600 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                        Over 1 hour
                      </span>
                      <span className="text-rose-700 font-extrabold">8%–22% Likely Outcome</span>
                    </div>
                    <div className="h-5 w-full rounded-full bg-gray-100 overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "15%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                      >
                        15%
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center text-xs text-gray-500 font-medium italic">
                  Ranges reflect the wide spread reported across multiple 2026 sales response studies, since exact figures vary by industry and lead source. The direction never changes though. Faster wins.
                </div>
              </div>
            </section>

            {/* --- Section: Static Form Vs AI Chatbot --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Static Form Vs AI Chatbot
              </h2>
              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                Strip away the marketing language and compare the two mechanically.
              </p>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Factor</th>
                      <th className="p-4 font-bold bg-gray-800">Static Contact Form</th>
                      <th className="p-4 font-bold bg-primary-dark">AI Lead Generation Chatbot</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Response time</td>
                      <td className="p-4 text-gray-500">Hours to days</td>
                      <td className="p-4 font-bold text-primary">Seconds, day or night</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Visitor effort</td>
                      <td className="p-4 text-gray-500">Fills fields before getting anything</td>
                      <td className="p-4 font-bold text-primary">Gets answers, then shares details</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">After hours coverage</td>
                      <td className="p-4 text-gray-500">None</td>
                      <td className="p-4 font-bold text-primary">Full coverage, no staff needed</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Qualification</td>
                      <td className="p-4 text-gray-500">Happens later, by a human</td>
                      <td className="p-4 font-bold text-primary">Happens instantly, in the chat</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Typical conversion rate</td>
                      <td className="p-4 text-gray-500">3% to 7%</td>
                      <td className="p-4 font-bold text-primary">15% to 25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* --- Section: This Is Exactly The Gap Go Converto Was Built To Close --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                This Is Exactly The Gap Go Converto Was Built To Close
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-left sm:text-justify">
                  <Link
                    href="/"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    Go Converto
                  </Link>{" "}
                  reads a business website the way a sharp new hire would on day one. Show it a domain, and it will read the services, pricing and FAQ pages till it knows enough to have a decent conversation with a prospect.
                </p>
                <p className="text-left sm:text-justify">
                  Watch it work for a minute, and you realize, that&apos;s not what it&apos;s really built to do. It was built to ensure that no one, anywhere, anytime, hits a dead end on a call with your bot at 10pm on a tuesday. It closes the loop. It answers, qualifies and books a call with your team while everyone sleeps, to pick up where the humans left off, first thing in the morning.
                </p>
                <p className="text-left sm:text-justify">
                  For a law firm, that&apos;s an intake form filled out correctly at midnight instead of a voicemail nobody returns. For a{" "}
                  <Link
                    href="/industries/healthcare"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    healthcare practice
                  </Link>
                  , it&apos;s an appointment request captured instead of a caller who tries a competitor next. For a{" "}
                  <Link
                    href="/industries/real-estate"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    real estate agent
                  </Link>
                  , it&apos;s a buyer who gets a listing question answered before they scroll to the next property.
                </p>
              </div>
            </section>

            {/* --- Section: What We're Watching Across Florida Client Accounts --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What We&apos;re Watching Across Florida Client Accounts
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-6">
                <p className="text-left sm:text-justify">
                  The number one misconception that new clients come in with is that their chatbot needs to be scripted before it can be useful. This is an expensive mistake, as it delays the launch of your chatbot by weeks and ultimately provides no value.
                </p>
                <p className="text-left sm:text-justify">
                  Our internal review of Go Converto accounts shows the bot needs the <strong className="font-bold text-thunder-black">existing website content</strong>, nothing more, to start answering real questions correctly within the first day live. Businesses that stall on writing custom scripts before launching are almost always the same businesses still losing after hours leads a month later.
                </p>
              </div>

              {/* VERTICAL BAR CHART: WHERE CHATBOT CONVERSATIONS HAPPEN MOST */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 shadow-sm">
                <h3 className="mb-8 text-sm font-bold uppercase tracking-wider text-thunder-black text-center flex items-center justify-center gap-2">
                  <HiOutlineClock className="h-5 w-5 text-primary" />
                  Where Chatbot Conversations Happen Most, By Hour Block
                </h3>
                
                <div className="flex items-end justify-center gap-8 sm:gap-16 h-56 pt-6 pb-2 max-w-lg mx-auto">
                  {/* Bar 1: 9am-5pm */}
                  <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="text-xs sm:text-sm font-bold text-thunder-black mb-2">38%</div>
                    <div className="w-full bg-gray-200 rounded-t-xl h-40 flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-full bg-primary rounded-t-xl"
                      />
                    </div>
                    <div className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 text-center">
                      9am–5pm
                      <span className="block text-[11px] text-gray-500 font-normal">Business</span>
                    </div>
                  </div>

                  {/* Bar 2: 5pm-9pm */}
                  <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="text-xs sm:text-sm font-bold text-thunder-black mb-2">31%</div>
                    <div className="w-full bg-gray-200 rounded-t-xl h-40 flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "82%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="w-full bg-blue-500 rounded-t-xl"
                      />
                    </div>
                    <div className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 text-center">
                      5pm–9pm
                      <span className="block text-[11px] text-gray-500 font-normal">Evening</span>
                    </div>
                  </div>

                  {/* Bar 3: 9pm-7am */}
                  <div className="flex flex-col items-center flex-1 max-w-[100px]">
                    <div className="text-xs sm:text-sm font-bold text-thunder-black mb-2">31%</div>
                    <div className="w-full bg-gray-200 rounded-t-xl h-40 flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "82%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        className="w-full bg-indigo-600 rounded-t-xl"
                      />
                    </div>
                    <div className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 text-center">
                      9pm–7am
                      <span className="block text-[11px] text-gray-500 font-normal">Overnight</span>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-center text-xs sm:text-sm text-gray-600 italic max-w-xl mx-auto">
                  Roughly 6 in 10 conversations across accounts we&apos;ve observed land outside the traditional 9 to 5 window. A business that only staffs a phone line during business hours is, by definition, missing the majority of its own website traffic&apos;s questions.
                </p>
              </div>
            </section>

            {/* --- Section: What This Costs, And What It Actually Saves --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What This Costs, And What It Actually Saves
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-6">
                <p className="text-left sm:text-justify">
                  Budget conversations always come up, so let&apos;s have it plainly instead of dancing around it. A chatbot subscription is a monthly line item. A missed lead is an invisible one, and invisible costs are the ones businesses never fix.
                </p>
                <p className="text-left sm:text-justify">
                  An{" "}
                  <Link
                    href="/pricing"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    Enterprise plan built for larger teams
                  </Link>{" "}
                  removes visitor caps entirely, which matters once a Florida business starts running seasonal campaigns or paid ads that spike traffic overnight. A capped plan quietly stops qualifying leads right at the moment demand peaks, which is the worst possible time for a bot to go quiet.
                </p>
                <p className="text-left sm:text-justify">
                  Compare that monthly cost against a single missed client. A missed consultation, a missed listing tour, a missed appointment. Most Florida service businesses lose that math badly when they actually run the numbers, and most never run the numbers at all.
                </p>
              </div>

              {/* STAT CARDS 2 */}
              <div className="my-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      6 in 10
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Chatbot chats happen after hours
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      <AnimatedCounter target={113} prefix="$" />
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Reported cost per qualified lead with AI qualification
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <div className="text-3xl sm:text-4xl font-black text-primary">
                      <AnimatedCounter target={38} suffix="%" />
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
                      Reported lift, lead to opportunity, vs forms
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: Setting One Up Without Losing A Week To It --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Setting One Up Without Losing A Week To It
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-6">
                <p className="text-left sm:text-justify">
                  The old objection to any of this used to be legitimate. Chatbots meant developers, meant scripting trees, meant weeks before anything went live. That objection is mostly dead now, and businesses still repeating it haven&apos;t looked recently.
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs mt-0.5">
                      1
                    </span>
                    <span className="text-left sm:text-justify">
                      Paste the website&rsquo;s URL and let the AI scan through all services, FAQ, and pricing tables automatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs mt-0.5">
                      2
                    </span>
                    <span className="text-left sm:text-justify">
                      Check the responses generated by the AI, edit the mistakes, and tune the tone to match the brand&rsquo;s style.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs mt-0.5">
                      3
                    </span>
                    <span className="text-left sm:text-justify">
                      Publish the widget and start capturing conversations the same day, no code touched at any point.
                    </span>
                  </li>
                </ul>
                <p className="text-left sm:text-justify">
                  The full walkthrough on{" "}
                  <Link
                    href="/how-it-works"
                    className="font-semibold text-primary underline hover:text-primary-dark transition-colors"
                  >
                    how the scan, train, and respond process works
                  </Link>{" "}
                  lays out each step for anyone who wants to see it before committing to a trial.
                </p>
              </div>

              {/* QUOTE CALLOUT BOX */}
              <div className="my-8 rounded-2xl bg-gradient-to-br from-teal-50/70 via-blue-50/50 to-white p-6 sm:p-8 text-gray-900 shadow-sm border-l-4 border-teal-600">
                <p className="text-base sm:text-lg font-medium italic leading-relaxed text-gray-800">
                  &quot;Every client we onboard asks the same question first. Will this sound robotic? It won&apos;t, because the bot is trained on their actual pages, their actual pricing, their actual voice. That&apos;s the whole difference between a chatbot people tolerate and one people actually trust.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-sm">
                    SS
                  </div>
                  <div>
                    <div className="text-sm font-bold text-thunder-black">Salman H Saikote</div>
                    <div className="text-xs text-gray-600">
                      Managing Partner, Bayshore Communication (parent company of Go Converto)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: The Honest Trade Off Nobody Advertises --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                The Honest Trade Off Nobody Advertises
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-8">
                <p className="text-left sm:text-justify">
                  No tool is ever completely free of trade offs, so pretending otherwise serves no one. An AI chatbot will misunderstand at least some questions that are presented to it, even if it has been improved to understand an enormous amount of text. It can&rsquo;t replace the judgment call a seasoned employee makes on a genuinely complex case.
                </p>
                <p className="text-left sm:text-justify">
                  What it does reliably is handle the 80% of questions that are honestly repetitive. Hours, pricing ranges, service areas, appointment availability. Freeing a human from answering the same 6 questions 40 times a week is not a small win. It is, for most small teams, the entire point.
                </p>
              </div>

              {/* IN-ARTICLE CTA BOX */}
              <div className="my-10 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-8 text-white shadow-xl text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  See What Your Website Is Missing
                </h3>
                <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto">
                  Paste your URL and Go Converto starts learning your business in minutes.
                </p>
                <div className="pt-2">
                  <Link
                    href="/start-free-trial"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-extrabold text-primary-dark shadow-md transition-all hover:bg-gray-100 hover:scale-105"
                  >
                    Start Free 14 Day Trial
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* --- FAQ Section --- */}
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
                      <div className="border-t border-gray-100 bg-gray-50/50 p-5 text-sm sm:text-base text-gray-700 leading-relaxed text-left sm:text-justify">
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
