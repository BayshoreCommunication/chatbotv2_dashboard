"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { 
  HiOutlineCheckCircle, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiChevronDown,
  HiArrowRight,
  HiOutlineBuildingOffice2
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

export default function AiLeadQualificationVsManualLeadScoringWhichIsBetter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Does AI lead qualification meet modern data privacy standards?",
      a: "Yes. Qualified platforms use strong data encryption to protect prospect information. They process visitor details safely while complying with standard privacy laws."
    },
    {
      q: "What happens to leads an AI chatbot doesn't completely qualify?",
      a: "They get marked and routed, simply de-prioritized to make sure your team's time is spent wisely."
    },
    {
      q: "Is AI lead qualification accurate enough to trust without a human double check?",
      a: "It's accurate enough to prioritize, not replace judgment entirely. Most businesses keep a human review step for high value leads even with AI qualification running."
    },
    {
      q: "Do chatbots hurt the personal feel of a local Florida business?",
      a: "Not when trained correctly. A chatbot that answers in your actual business voice tends to feel more responsive, not less personal, especially compared to a missed call."
    }
  ];

  return (
    <>
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "AI Lead Qualification vs Manual Lead Scoring: Which Is Better?" }
        ]}
        title="AI Lead Qualification vs Manual Lead Scoring: Which Is Better?"
        image="/assets/static-blog/ai-lead-qualification-vs-manual-lead-scoring.webp"
        imageAlt="Comparison of AI lead qualification with a friendly robot versus manual lead scoring with a stressed worker."
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Go Converto | AI Lead Qualification
                </span>
                <span className="text-xs font-medium text-gray-500">Strategy & Tech</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                AI Lead Qualification vs Manual Lead Scoring: Which Is Better?
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: September 15, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: September 15, 2026
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
                  src="/assets/static-blog/ai-lead-qualification-vs-manual-lead-scoring.webp"
                  alt="Comparison of AI lead qualification with a friendly robot versus manual lead scoring with a stressed worker."
                  title="AI Lead Qualification vs Manual Lead Scoring Which Is Better"
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
                  Caption: Explore the pros and cons of AI lead qualification versus manual lead scoring to optimize your sales pipeline.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Compare AI lead qualification with manual lead scoring to see which approach is better for your business. Discover how Go Converto helps you achieve faster results, higher accuracy, increased conversions, and scalable growth.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800">
                AI lead qualification beats manual scoring on nearly every measurable front in 2026. Manual scoring runs on static fields and averages 15% to 25% accuracy. AI systems that read live behavior and conversation reach 40% to 60%, and they never sleep, stall, or forget to follow up.
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
                  "Manual scoring relies on fixed fields like job title, budget, and company size",
                  "AI qualification reads real time behavior, page intent, and conversational answers",
                  "Response speed influences qualification more than the scoring model itself",
                  "Florida service businesses lose leads nightly to whichever competitor replies first",
                  "A chatbot that asks discovery questions during the visit does the qualifying before a rep even opens the lead"
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
                have spent the better part of a decade taking techs apart to see what actually makes them tick, and lead scoring software deserves the same treatment. Everybody in sales tech throws around the word &quot;AI&quot; like it&apos;s a magic sticker you slap on a spreadsheet. So let&apos;s open this thing up.
              </p>
            </div>

            {/* --- Section: What Is Manual Lead Scoring, Really? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Is Manual Lead Scoring, Really?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Manual lead scoring assigns points to a lead based on fields a human decided mattered months ago. Job title gets 10 points. Company size gets 15. Downloaded a whitepaper? Add 5 more. Someone in the marketing team sat down one day and made up this list and put it in a spreadsheet and that was that.
                </p>
                <p>
                  The issue with this lead scoring model is not that it&apos;s stupid (it isn&apos;t). A prospect&apos;s real intent shifts by the hour. Your point system doesn&apos;t. The system scores the same in August and March, which is almost meaningless since much has changed in the meantime.
                </p>
                <p>
                  According to a recent{" "}
                  <a 
                    href="https://www.moneypenny.com" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Moneypenny
                  </a>{" "}
                  survey, 83% of consumers will choose the first company that responds to their request, regardless of price or reputation. Manual scoring was never designed to compete on that axis.
                </p>
                <p>
                  Go Converto exists precisely because that gap between &quot;scored&quot; and &quot;actually ready to buy&quot; costs Florida businesses substantial money each week.
                </p>
              </div>
            </section>

            {/* --- Section: How Does AI Lead Qualification Actually Work? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                How Does AI Lead Qualification Actually Work?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  AI qualification skips the fixed rulebook entirely. Instead of assigning arbitrary points to static fields, it reads what a visitor does and says, then compares that pattern against outcomes from thousands of prior conversations. A chatbot for tech companies doesn&apos;t just log that someone visited a pricing page. It asks them directly what they&apos;re trying to solve, what their team size looks like and whether they need something enterprise grade or a quick self serve signup.
                </p>
                <p>
                  That distinction matters enormously. Manual scoring infers intent from breadcrumbs. AI qualification simply asks, in real language, right there in the chat window.
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
                      <AnimatedCounter target={60} prefix="40-" suffix="%" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug font-medium">
                      AI qualification accuracy vs 15-25% for manual scoring
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">
                      <AnimatedCounter target={7} suffix="x" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug font-medium">
                      more likely a lead qualifies when contacted within the first hour
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">
                      <AnimatedCounter target={42} suffix=" hrs" />
                    </div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug font-medium">
                      average time it takes a business to respond to a new lead
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: Why Does Response Speed Matter More Than the Scoring Method? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Why Does Response Speed Matter More Than the Scoring Method?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Research from the{" "}
                  <a 
                    href="https://www.leadresponsemanagement.org" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Lead Response Management Study with MIT
                  </a>{" "}
                  revealed a harsh reality for modern sales teams. Contacting a new lead within 5 minutes versus 30 minutes can increase your qualification odds by 21x.
                </p>
                <p>
                  Read that again. The scoring model barely matters if the lead goes cold before anyone looks at it. This is where manual scoring falls apart structurally, not just technically. A human has to notice the lead, open the CRM, review the fields, then decide to act. Every one of those steps burns minutes a Tampa contractor or a Sarasota real estate agent simply doesn&apos;t have at 9 on a Tuesday night.
                </p>
                <p>
                  An AI chatbot skips every one of those steps. It asks the qualifying question the second the visitor lands on the pricing page, and it does it whether that visitor shows up at noon or at midnight.
                </p>
              </div>
            </section>

            {/* --- Section: AI Qualification vs Manual Scoring. The Direct Comparison --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                AI Qualification vs Manual Scoring. The Direct Comparison
              </h2>

              {/* Feature Comparison Table */}
              <div className="mb-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Factor</th>
                      <th className="p-4 font-bold bg-gray-800">Manual Scoring</th>
                      <th className="p-4 font-bold bg-primary-dark">AI Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Data used</td>
                      <td className="p-4 text-gray-500">Static fields (title, company size)</td>
                      <td className="p-4 font-bold text-primary">Live behavior, conversation, timing</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Speed to first contact</td>
                      <td className="p-4 text-gray-500">Hours, often days</td>
                      <td className="p-4 font-bold text-primary">Seconds, around the clock</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Accuracy range</td>
                      <td className="p-4 text-gray-500">15 to 25 percent</td>
                      <td className="p-4 font-bold text-primary">40 to 60 percent</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Updates itself</td>
                      <td className="p-4 text-gray-500">No, needs manual rebuild</td>
                      <td className="p-4 font-bold text-primary">Yes, learns from every outcome</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Works after hours</td>
                      <td className="p-4 text-gray-500">No</td>
                      <td className="p-4 font-bold text-primary">Yes</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Best fit</td>
                      <td className="p-4 text-gray-500">Small, slow moving pipelines</td>
                      <td className="p-4 font-bold text-primary">Any business competing for fast replies</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Notice the pattern here. Manual scoring isn&apos;t wrong so much as it&apos;s outdated for how fast buying decisions move now. It made sense when a rep could realistically review every lead by hand. Florida&apos;s service economy doesn&apos;t run on that kind of leisure anymore. Industry research from{" "}
                  <a 
                    href="https://www.landbase.com" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Landbase
                  </a>{" "}
                  puts the number of companies still running manual qualification at 56%, which means over half the market is competing with one hand tied behind its back and doesn&apos;t fully know it yet.
                </p>
              </div>
            </section>

            {/* --- Section: What Do Our Own Conversations Show? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Do Our Own Conversations Show?
              </h2>

              {/* SURVEY CARD */}
              <div className="mb-8 rounded-2xl border border-primary/20 bg-blue-50/50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineBuildingOffice2 className="h-4 w-4" />
                  OUR CONVERSATION DATA
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200/60">
                    <div className="text-3xl font-black text-thunder-black">7 out of 10</div>
                    <div className="mt-1 text-xs text-gray-600 font-medium">
                      qualifying conversations happen outside standard 9-to-5 business hours
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200/60">
                    <div className="text-3xl font-black text-thunder-black">Late Evenings & Sundays</div>
                    <div className="mt-1 text-xs text-gray-600 font-medium">
                      produce a disproportionate share of the highest intent conversations
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                <p>
                  Our survey of chat transcripts running through Go Converto across law, healthcare, and real estate clients shows a consistent pattern. Roughly seven out of ten qualifying conversations happen outside standard nine to five business hours. Late evenings and Sunday afternoons produce a disproportionate share of the highest intent conversations we see, not the lowest.
                </p>
                <p>
                  That single data point should reframe how you think about &quot;off hours.&quot; There is no such thing anymore for a website. There&apos;s just staffed hours and unstaffed hours, and only one of those actually loses business.
                </p>
              </div>
            </section>

            {/* --- CTA Box 1 --- */}
            <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold">Stop Losing Leads While You Sleep</h3>
                <p className="text-sm text-blue-100 max-w-lg">
                  Go Converto scans your site, learns your business, and starts qualifying visitors in minutes.
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

            {/* --- Section: Does AI Qualification Actually Improve Conversion, or Just Speed? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Does AI Qualification Actually Improve Conversion, or Just Speed?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Both, and the two are related.{" "}
                  <a 
                    href="https://www.gartner.com" 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    Gartner
                  </a>
                  &apos;s most recent sales technology research found that organizations using AI enabled next best actions were 2.6 times more likely to hit strong commercial growth targets than those relying on older methods. That&apos;s not a speed metric. That&apos;s a revenue metric, and it exists because faster, better qualified leads free up your actual sales time for the conversations worth having.
                </p>
                <p>
                  Manual scoring can&apos;t replicate that because it was never built to act. It was built to rank. Ranking a list of 40 warm leads doesn&apos;t mean anything if none of the top three get called before another company has beaten you to first place.
                </p>
              </div>
            </section>

            {/* --- Section: What About The Businesses That Aren't Ready for Full Automation Yet? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What About The Businesses That Aren&apos;t Ready for Full Automation Yet?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700 mb-8">
                <p>
                  Great question. And one that needs an equally thoughtful answer, rather than a &quot;you&apos;re crazy&quot; dismissal. Not every business needs enterprise grade AI qualification on day one. A two person shop with 12 leads a month can survive on a spreadsheet. But the moment volume climbs past what one person can review daily, manual scoring turns from &quot;adequate&quot; into &quot;actively leaking revenue.&quot;
                </p>
                <p>
                  Go Converto was built for that exact turning point. It scans a business&apos;s existing site, trains itself on the actual services and pricing already published, and goes live without a developer or a rebuilt CRM.
                </p>
              </div>

              {/* Salman Quote Card */}
              <div className="my-8 rounded-2xl bg-gradient-to-br from-gray-900 to-thunder-black p-8 text-white shadow-xl relative overflow-hidden">
                <FaQuoteLeft className="absolute right-4 bottom-2 h-28 w-28 text-white/5 pointer-events-none" />
                <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-100 mb-6">
                  “We built Go Converto because Florida business owners kept telling us the same thing. They weren&apos;t losing deals to bigger competitors but to slower response times.”
                </p>
                <div className="border-t border-gray-800 pt-4 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-white text-base">Salman H. Saikote</div>
                    <div className="text-xs text-primary-light">
                      Managing Partner of parent company{" "}
                      <a 
                        href="https://bayshorecommunication.com" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        Bayshore Communication
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                That&apos;s a founder level observation, not a marketing line and the response time data backs it up completely.
              </p>
            </section>

            {/* --- Section: Is Manual Scoring Ever the Better Choice? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Is Manual Scoring Ever the Better Choice?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  Occasionally, yes. Highly regulated, low volume sales cycles, think aerospace procurement or certain government contracts, still benefit from a human reviewing every single field by hand. Nuance matters more than speed in those narrow cases. But that&apos;s a shrinking sliver of the market, and it almost certainly isn&apos;t the local law firm, clinic, or agency reading this.
                </p>
                <p>
                  For the other 95% of Florida businesses fielding website inquiries, speed and consistency win. An AI system doesn&apos;t call in sick. It doesn&apos;t forget to update the spreadsheet. It doesn&apos;t decide a Friday afternoon lead can wait until Monday.
                </p>
              </div>
            </section>

            {/* --- CTA Box 2 --- */}
            <div className="mb-12 rounded-2xl bg-thunder-black p-8 text-white shadow-xl text-center space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                See Your Own Website Qualify Leads in Minutes
              </h3>
              <p className="text-base text-gray-300 max-w-md mx-auto">
                Paste your URL. Go Converto learns your business and starts talking to visitors the way your best rep would, at 2am included.
              </p>
              <div>
                <Link
                  href="/start-free-trial"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                >
                  Try Go Converto Free
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
