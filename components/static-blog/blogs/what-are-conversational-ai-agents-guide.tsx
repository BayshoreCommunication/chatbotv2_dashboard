"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HiOutlineCheckCircle, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineExclamationTriangle,
  HiChevronDown,
  HiArrowRight,
  HiOutlineBuildingOffice2
} from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";

export default function WhatAreConversationalAiAgentsGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Are conversational AI agents the same as ChatGPT on my website?",
      a: "No. ChatGPT is a broad general model that knows a little about everything but zero about your actual business. Conversational AI agents are trained on your services, pricing and policies."
    },
    {
      q: "Do conversational AI agents replace human staff entirely?",
      a: "Not for most businesses. They handle the repetitive first layer of questions and lead capture, then route complex or sensitive matters to a real person. Think freed up staff time, not eliminated staff."
    },
    {
      q: "Can I customize how the chat widget looks?",
      a: "Yes. You can match the widget colors to your brand, upload your own photo avatar, and write friendly greeting messages so the chat looks like a natural part of your website."
    },
    {
      q: "Can the agent speak multiple languages like Spanish?",
      a: "Yes. Advanced agents detect visitor language preferences instantly and switch naturally between English, Spanish, and Portuguese."
    }
  ];

  return (
    <>
      {/* --- Page Hero & Breadcrumb --- */}
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "What Are Conversational AI Agents?" }
        ]}
        title="What Are Conversational AI Agents?"
        image="/assets/blog/what-are-conversational-ai-agents-guide.webp"
        imageAlt="What Are Conversational AI Agents?"
      />

      <article className="bg-white py-10 lg:py-16 text-gray-800 antialiased">
        <Container>
          <div className="mx-auto max-w-4xl">

            {/* --- Meta Header --- */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-dark">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  Go Converto | AI Chatbot Guide
                </span>
                <span className="text-xs font-medium text-gray-500">Strategy & Tech</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl lg:text-5xl leading-tight mb-4">
                What Are Conversational AI Agents?
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 text-primary" />
                    Published: September 8, 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineClock className="h-4 w-4 text-primary" />
                    Updated: September 8, 2026
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
                  src="/assets/blog/what-are-conversational-ai-agents-guide.webp"
                  alt="Friendly white robot using a laptop next to a digital customer support chatbot interface in an office."
                  title="What Are Conversational AI Agents? Business Guide"
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
                  Caption: Explore how conversational AI agents automate customer service, qualify leads, and support modern business growth.
                </p>
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Description: Understand conversational AI agents and how automated chatbot systems engage clients, book appointments, and drive growth.
                </p>
              </div>
            </div>

            {/* --- Lead Paragraph --- */}
            <div className="mb-8 rounded-xl bg-blue-50/60 p-6 border-l-4 border-primary">
              <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-800">
                Conversational AI agents are the next logical evolution of computer proxies, allowing systems to interpret natural human conversations, delegating tasks such as lead qualification or scheduling that previously required human intervention. These digital assistants can be deployed on your website, engaging in a continual dialogue with your website visitors while completing a variety of tasks on your behalf.
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
                  "Built on large language models, not rigid decision trees",
                  "Understand rephrased or messy questions, not just exact keyword matches",
                  "Can take action (book a call, capture a lead) instead of just answering",
                  "Learn a business from its own website content, no manual scripting required",
                  "Work continuously, so a 2am inquiry gets the same quality response as a 2pm one",
                  "Sit on a spectrum from simple Q&A bots to fully autonomous task agents"
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
                have spent an unreasonable number of hours poking at chatbots. Typing nonsense into them. Trying to break them on purpose. Most of them break easy. You ask a slightly odd question and the whole thing collapses into “I&apos;m sorry, I didn&apos;t understand that.” Which, fair. Old chatbots were never built to understand you.
              </p>
              <p>
                Conversational AI agents are a different creation entirely. Run a business anywhere along the Gulf Coast, a law office in Tampa, a clinic down in Sarasota, and the difference shows more than the marketing decks let on. Let’s get into it…
              </p>
            </div>

            {/* --- Section: What’s a Conversational AI Agent? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What’s a Conversational AI Agent?
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>
                  A conversational AI agent runs on a large language model. That&apos;s the part that lets it parse a weirdly phrased question and still land on the right answer. Ask it “do y&apos;all take Aetna” instead of “what insurance do you accept” and it doesn&apos;t blink. It reads intent, not just keywords.
                </p>

                <div className="my-6 rounded-xl bg-gray-900 px-6 py-4 text-white font-semibold text-lg text-center shadow-md">
                  That&apos;s the whole game, honestly. <span className="text-primary-light">Intent over keywords.</span>
                </div>

                <p>
                  Older systems relied on decision trees. Rigid paths. Type A, get response B, no matter how you phrased it. A true conversational agent works differently. It builds a working model of what you&apos;re asking. Checks it against real information about the business. Responds in language that actually sounds like a person wrote it.
                </p>
              </div>
            </section>

            {/* --- CTA Box 1 --- */}
            <div className="mb-12 rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 p-6 sm:p-8 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">See What Go Converto Learns From Your Site in Minutes</h3>
                <p className="text-sm text-blue-100 max-w-lg">
                  Paste your URL. Watch it read your services, pricing, and FAQs automatically.
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

            {/* --- Section: This Is Different From a Regular Chatbot --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                This Is Different From a Regular Chatbot
              </h2>
              <p className="mb-6 text-base text-gray-700">
                A lot of business owners get steered wrong by vendor pitches that call everything an “agent.”
              </p>

              {/* BY THE NUMBERS CARD */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineChartBar className="h-4 w-4" />
                  BY THE NUMBERS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">80%</div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      of new enterprise apps now embed at least one AI agent
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">40%</div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      of all enterprise apps projected to run task specific agents by year end
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="text-3xl font-black text-primary">7x</div>
                    <div className="mt-1 text-xs text-gray-600 leading-snug">
                      more likely to qualify a lead when response comes within the hour
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                A rule based chatbot answers from a fixed script. It&apos;s read only. A conversational AI agent reasons about what the visitor actually needs. In more advanced setups, it acts too. Books the appointment. Routes the lead. Updates the calendar. No one finishes the job by hand later.
              </p>

              {/* Feature Comparison Table */}
              <div className="mb-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-thunder-black text-white text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Feature</th>
                      <th className="p-4 font-bold bg-gray-800">Rule Based Chatbot</th>
                      <th className="p-4 font-bold bg-primary-dark">Conversational AI Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Understands rephrased questions</td>
                      <td className="p-4 text-gray-500">Rarely</td>
                      <td className="p-4 font-bold text-primary">Yes</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Learns from your website content</td>
                      <td className="p-4 text-gray-500">No, manual scripting</td>
                      <td className="p-4 font-bold text-primary">Yes, automatically</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Takes action (books, routes leads)</td>
                      <td className="p-4 text-gray-500">No</td>
                      <td className="p-4 font-bold text-primary">Yes</td>
                    </tr>
                    <tr className="bg-gray-50/50 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Available 24/7 without staffing</td>
                      <td className="p-4 text-gray-500">Yes, but limited answers</td>
                      <td className="p-4 font-bold text-primary">Yes, with real answers</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-900">Knows when to hand off to a human</td>
                      <td className="p-4 text-gray-500">No</td>
                      <td className="p-4 font-bold text-primary">Yes, in a well built agent</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                Not every business needs the full autonomous version tomorrow. A dentist&apos;s office mostly needs accurate answers about hours and insurance. A real estate team juggling 40 active listings needs something closer to a digital coworker. Go Converto scales across that whole range. That&apos;s why it shows up equally in law firm, healthcare, and real estate deployments, no separate product required for each.
              </p>
            </section>

            {/* --- Section: Why Are Businesses Adopting These Agents So Fast Right Now? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Why Are Businesses Adopting These Agents So Fast Right Now?
              </h2>
              <p className="mb-4 text-base text-gray-700">
                Because the cost of not having one just got measured, and the number stings a little.
              </p>
              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                <a 
                  href="https://www.gartner.com" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="font-bold text-primary hover:underline"
                >
                  Gartner
                </a> projects that 40% of enterprise applications will be integrated with task specific AI agents by the end of 2026, up from less than five percent the year before. That&apos;s the floor moving under the whole industry.
              </p>

              {/* Chart Visual */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-thunder-black text-center">
                  Share of Enterprise Applications With Task Specific AI Agents
                </h3>
                <div className="space-y-4 max-w-xl mx-auto">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                      <span>2025</span>
                      <span>5%</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: "5%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-thunder-black mb-1">
                      <span>2026</span>
                      <span className="text-primary font-black">40%</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                      <span>2027 (proj.)</span>
                      <span>~55%</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-primary-dark rounded-full" style={{ width: "55%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500 font-medium">
                  Gartner, 2025-2026 projections
                </div>
              </div>

              <p className="mb-4 text-base text-gray-700 leading-relaxed">
                Small business owners feel a version of this too. Just measured in missed calls instead of enterprise software budgets.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                <a 
                  href="https://hbr.org" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="font-bold text-primary hover:underline"
                >
                  Harvard Business Review
                </a> found that companies responding to a lead within an hour are roughly 7x more likely to qualify that lead than ones responding slower. Most Florida service businesses aren&apos;t answering fast. Let’s be honest, most of us aren’t working the front desk at 11pm on a Tuesday. A conversational AI agent does. That&apos;s really the entire pitch stripped of the catchphrases.
              </p>
            </section>

            {/* --- Section: What Our Data Shows Across Florida Client Accounts --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Our Data Shows Across Florida Client Accounts
              </h2>
              <p className="mb-6 text-base text-gray-700">
                This is the part competitor blogs skip, because they don&apos;t have client accounts to look at. We do.
              </p>

              {/* OUR SURVEY FINDS CARD */}
              <div className="mb-8 rounded-2xl border border-primary/20 bg-blue-50/50 p-6 shadow-sm">
                <div className="mb-4 text-xs font-bold tracking-widest text-primary-dark uppercase flex items-center gap-1.5">
                  <HiOutlineBuildingOffice2 className="h-4 w-4" />
                  OUR SURVEY FINDS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200/60">
                    <div className="text-2xl font-black text-thunder-black">8pm–12am</div>
                    <div className="mt-1 text-xs text-gray-600 font-medium">
                      peak inbound window for Tampa area accounts
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200/60">
                    <div className="text-2xl font-black text-thunder-black">Sun</div>
                    <div className="mt-1 text-xs text-gray-600 font-medium">
                      second highest engagement day across Florida clients
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200/60">
                    <div className="text-2xl font-black text-thunder-black">Week 1</div>
                    <div className="mt-1 text-xs text-gray-600 font-medium">
                      typical timeframe before after hours leads start converting
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                <p>
                  Across the Go Converto client base, spanning law firms, medical practices, and local agencies throughout the state, the pattern holds steady. Businesses that go live report captured leads outside standard 9 to 5 hours almost immediately, often within the first week. Tampa gets a real spike between 8pm and midnight. That lines up neatly with when people finally sit down after their own workday, researching a lawyer, a clinic, a contractor, whatever their evening problem happens to be.
                </p>
                <p>
                  Sunday afternoon shows up as a second quiet surge too. Someone&apos;s on the couch, half watching a game, half Googling “personal injury attorney near me.” A business without a live assistant loses that visitor entirely. A business running one just picked up its next consultation.
                </p>
              </div>
            </section>

            {/* --- Section: Where's the Line Between Hype and Reality? --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                Where&apos;s the Line Between Hype and Reality?
              </h2>
              <p className="mb-4 text-base text-gray-700">
                I want to be straight with you here, because there&apos;s a lot of overselling in this space.
              </p>
              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                Most tools sold as AI agents in 2026 are still retrieval systems, sitting at a lower rung on a maturity spectrum than the marketing suggests. Pasting an LLM onto a chat widget and calling it “agentic” doesn&apos;t make it one. A real conversational agent does 3 things well.
              </p>

              <div className="mb-6 space-y-3">
                {[
                  "1. It holds context across a multi turn conversation.",
                  "2. It grounds answers in your actual business content instead of guessing.",
                  "3. And it hands off cleanly to a human when a question genuinely needs one."
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-thunder-black text-sm">
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                That last part is more important than most vendors admit. A good agent knows the edge of its own competence. It should never bluff a legal opinion or a medical answer. It should collect the details and route the person to someone qualified.
              </p>
            </section>

            {/* --- Section: Salman Quote Card --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What Salman H Saikote Sees Building These Systems Daily
              </h2>

              <div className="my-8 rounded-2xl bg-gradient-to-br from-gray-900 to-thunder-black p-8 text-white shadow-xl relative overflow-hidden">
                <FaQuoteLeft className="absolute right-4 bottom-2 h-28 w-28 text-white/5 pointer-events-none" />
                <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-100 mb-6">
                  “People assume the hard part is getting the AI to sound human. It&apos;s not. The hard part is getting it to know when to stop talking and hand the person to a real expert. That&apos;s where trust gets built or lost.”
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
                      (the team behind Go Converto)
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                And you know what, it’s a great point. A chatbot can act all knowing, but without the information, it loses credibility. An agent who says &quot;Let me connect you with someone who can assist you with that&quot; builds that credibility.
              </p>
            </section>

            {/* --- Section: What This Means for a Florida Business Specifically --- */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                What This Means for a Florida Business Specifically
              </h2>
              <p className="mb-6 text-base text-gray-700 leading-relaxed">
                Florida carries its own quirks here. Tourist season traffic spikes. Snowbird populations arrive every winter needing local services fast. Hurricane season brings sudden bursts of urgent inquiries too, contractors, insurance agents, legal offices, often in the dead of night while the storm&apos;s still spinning on the radar.
              </p>

              {/* Bar Chart Visual: Relative Inbound Inquiry Volume by Florida Season */}
              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-thunder-black text-center">
                  Relative Inbound Inquiry Volume by Florida Season
                </h3>
                <div className="space-y-4 max-w-xl mx-auto">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Spring</span>
                      <span>55</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: "55%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Summer (Tourist)</span>
                      <span>78</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: "78%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-thunder-black mb-1">
                      <span>Hurricane Season</span>
                      <span className="text-primary font-black">92</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                      <span>Winter (Snowbird)</span>
                      <span>70</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: "70%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500 font-medium italic">
                  Illustrative pattern based on Go Converto client inquiry data across Florida accounts
                </div>
              </div>
            </section>

            {/* --- Section: The Honest Tradeoffs Nobody Advertises --- */}
            <section className="mb-12">
              <h2 className="mb-2 text-2xl sm:text-3xl font-extrabold text-thunder-black tracking-tight">
                The Honest Tradeoffs Nobody Advertises
              </h2>
              <p className="mb-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                A few things worth knowing going in
              </p>

              <div className="mb-8 space-y-3">
                {[
                  "Setup quality depends on how clean and current the underlying website content is",
                  "Agents still need occasional human review of edge case conversations",
                  "Booking, routing, and calendar syncing capabilities require deeper integration and more than just a simple chat plug-in",
                  "Training the voice and tone to sound right takes time. And the resulting digital agent will only sound professional if it’s properly trained to sound like the brand"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                    <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <span className="text-sm font-medium text-gray-800 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-base text-gray-700 leading-relaxed">
                None of these are dealbreakers. They&apos;re just the difference between a rushed setup and a good one. Go Converto&apos;s three step process, scan the site, train on it, go live, handles most of this automatically. A quick review of the trained knowledge base before launch is still smart practice, though. Always is.
              </p>
            </section>

            {/* --- CTA Box 2 --- */}
            <div className="mb-12 rounded-2xl bg-thunder-black p-8 text-white shadow-xl text-center space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Stop Losing Leads to Silence After Hours
              </h3>
              <p className="text-base text-gray-300 max-w-md mx-auto">
                Go Converto answers every visitor in under 2 seconds.
              </p>
              <div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all hover:bg-primary-dark hover:scale-105"
                >
                  See Pricing
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
