"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowRight as BsArrowRightIcon, BsPlayCircle as BsPlayCircleIcon } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function RealEstateHero() {
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const startAnimationCycle = () => {
      setChatStep(0);
      timeouts.push(setTimeout(() => setChatStep(1), 600));
      timeouts.push(setTimeout(() => setChatStep(2), 1600));
      timeouts.push(setTimeout(() => setChatStep(3), 2800));
      timeouts.push(setTimeout(() => setChatStep(4), 4400));
      timeouts.push(setTimeout(() => setChatStep(5), 5400));
      timeouts.push(setTimeout(() => setChatStep(6), 6600));
      timeouts.push(setTimeout(() => setChatStep(7), 7600));
      timeouts.push(setTimeout(() => startAnimationCycle(), 13000));
    };

    startAnimationCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-14">
      <div className="pointer-events-none absolute right-[-5%] top-1/2 -z-10 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#00a8a0]/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="h-0.5 w-5 bg-[#00a8a0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
                AI Assistant for Real Estate Professionals
              </span>
            </div>

            <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] leading-snug sm:leading-tight lg:leading-[1.12]">
              Catch every property inquiry before the prospect clicks away to another listing
            </h1>

            <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
              Go Converto is an AI chatbot real estate agents, can talk to every person who lands on your listings. It handles pricing details, answers property specifics, and schedules tours immediately, that means 24 hours a day, without you having to do a thing.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/start-free-trial"
                className="inline-flex items-center gap-2 rounded-lg bg-[#00a8a0] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#00968f] hover:shadow-md"
              >
                Start free trial
                <BsArrowRightIcon className="h-4 w-4" />
              </Link>

              <Link
                href="#demo"
                className="inline-flex items-center gap-2.5 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-400"
              >
                <BsPlayCircleIcon className="h-4 w-4 text-gray-800" />
                Watch demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
              <div className="flex text-[#00a8a0]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-[#00a8a0]" />
                ))}
              </div>
              <span className="font-bold text-gray-900">4.9/5</span>
              <span className="text-gray-300">·</span>
              <span>Trusted by top agents and brokerages</span>
              <span className="text-gray-300">·</span>
              <span>14-day free trial</span>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-6 lg:ml-auto lg:w-full lg:max-w-[430px]"
          >
            <div className="pointer-events-none absolute -inset-4 sm:-inset-6 -z-10 rounded-[40px] bg-[#00a8a0]/10 transition-all sm:rotate-1" />

            <div className="pointer-events-none absolute -right-6 top-8 -z-10 hidden grid-cols-6 gap-2.5 sm:grid">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#00a8a0]/40" />
              ))}
            </div>

            <div className="relative z-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-xl shadow-teal-900/10 sm:p-6 h-[470px] sm:h-[490px] flex flex-col justify-between overflow-hidden">
              <div className="shrink-0 mb-3 flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live on 128mapleave.com</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                  AI Assistant Active
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-end space-y-3.5 overflow-hidden py-1">
                <AnimatePresence mode="popLayout">
                  {chatStep >= 1 && (
                    <motion.div
                      key="msg-1"
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl bg-[#f5f3ee] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                        Hi, is 128 Maple Ave still available for a weekend tour?
                      </div>
                    </motion.div>
                  )}

                  {chatStep === 2 && (
                    <motion.div
                      key="typing-1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src="/assets/logo/go-converto-logo-short.png"
                        alt="Go Converto"
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-full object-contain"
                      />
                      <div className="flex items-center gap-1.5 rounded-2xl bg-[#edf5ff] p-3.5 px-4 text-xs">
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-[#00a8a0] animate-bounce" />
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 3 && (
                    <motion.div
                      key="msg-2"
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <Image
                        src="/assets/logo/go-converto-logo-short.png"
                        alt="Go Converto"
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 rounded-full object-contain"
                      />
                      <div className="max-w-[85%] rounded-2xl bg-[#edf5ff] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                        When are you hoping to move, and do you already have your financing pre-approved?
                      </div>
                    </motion.div>
                  )}

                  {chatStep >= 4 && (
                    <motion.div
                      key="msg-3"
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-2xl bg-[#f5f3ee] p-3.5 text-xs text-gray-800 sm:text-sm shadow-2xs">
                        Hoping to be in a new place within two months, and yes, I&apos;ve got the pre-approval letter.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-emerald-200/60 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  ✓
                </span>
                <span>Highly qualified lead | Transferred to agent</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2 pl-4">
              <svg className="h-7 w-10 text-[#00a8a0] shrink-0" viewBox="0 0 50 30" fill="none">
                <path d="M10 25 C 15 5, 35 5, 45 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 10 L46 16 L40 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={`${caveat.className} text-xl font-semibold leading-tight text-[#00a8a0]`}>
                Real listing conversation, <br />
                start to finish
              </span>
            </div>
          </motion.div>
        </div>

        {/* Intro Paragraphs & Trusted By Logos from Doc */}
        <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm sm:text-base text-gray-600 leading-relaxed mb-10">
            <p>
              It&apos;s a feeling you are all familiar with. Midway through a show when your phone begins to ring and you&apos;ve got new inquiries. One buyer wants to know if the property is still available. One more is inquiring about the price, and another wants to schedule a visit. You&apos;d like to provide your existing client with the attention they deserve, and you&apos;re already so busy responding to everyone else. By the time you show them the house and get the opportunity to respond, they could have moved onto another house or called another agent.
            </p>
            <p>
              Go Converto ensures that the buyer does not have to wait. As an AI chatbot real estate agents, it can respond to common property questions, give accurate listing information, qualify interested buyers and schedule tours while you&apos;re having lunch with clients. Therefore, you don&apos;t have to choose between serving the caller in front of you or following up on a new lead and can jump in when someone is ready for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-gray-50/80 p-6 border border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 shrink-0">
              Trusted by teams at:
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8 font-semibold text-gray-700 text-sm sm:text-base">
              <span>Prestige Realty</span>
              <span className="text-gray-300">|</span>
              <span>Harborview Homes</span>
              <span className="text-gray-300">|</span>
              <span>Meridian Group</span>
              <span className="text-gray-300">|</span>
              <span>Northgate Realty</span>
              <span className="text-gray-300">|</span>
              <span>Coastline Properties</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
