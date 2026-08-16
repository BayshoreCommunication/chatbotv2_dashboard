"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, Code2, Layers, Headphones, Mail } from "lucide-react";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";

// ============================================================================
// DATA
// ============================================================================
const COOKIE_SECTIONS = [
  {
    icon: Code2,
    title: "Zero Developer Dependency",
    description:
      "Software tools often fail because their setup processes are overly complex. Go Converto designs every automation feature specifically for non-technical business operators. You can customize, test, and deploy your customer service AI assistant without opening a user manual or writing code.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    title: "Industry Specific AI Framework",
    description:
      "Generic customer chatbots fail to grasp specific industry terminology and compliance needs. Go Converto adapts its response engine to match the operational workflows of law practices, real estate agencies, healthcare providers, and local services. Your automated assistant operates using your company’s precise knowledge base rather than generic response templates.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "Capture High-Value Sales Leads 24/7",
    description:
      "Prospective customers submit high-intent questions well past standard business hours. The Go Converto AI engine maintains active engagement with site visitors 24 hours a day. Your sales funnel continues capturing qualified lead data and booking client calls outside regular operational hours.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
  {
    icon: Headphones,
    title: "Automate Technical Support",
    description:
      "Software providers often hide behind automated email scripts and unhelpful ticketing systems. Go Converto backs its software with accessible, dedicated account specialists. Our support team personally reviews your technical inquiries and delivers human responses within one business day.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
];

// ============================================================================
// COOKIE POLICY CONTENT
// ============================================================================
const CookiePolicyPageContent = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Header --- */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            What We Believe
          </span>

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-4xl">
            Meet the AI Assistant Built for Direct Lead Conversion
          </h1>

          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Most website visitors leave without buying because nobody answers
            their instant inquiries. Go Converto solves this drop-off by
            deploying an automated AI assistant and trains directly on your
            business data. This platform addresses customer queries in real
            time, turning passive traffic into qualified sales leads and
            scheduled appointments. Business owners execute this entire lead
            capture process without writing code, hiring developers, or managing
            call centers.
          </p>
        </div>

        {/* --- Cookie Sections --- */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COOKIE_SECTIONS.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary/20 ${section.gradient}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mb-3 text-base font-bold text-thunder-black">
                  {section.title}
                </h2>

                <p className="text-sm leading-relaxed text-gray-600">
                  {section.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* --- Contact --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-bold text-thunder-black">
                Need help with Go Converto?
              </p>

              <p className="text-sm text-gray-600">
                hello@goconverto.com · 1211 Tech Blvd Suite 120, Tampa, FL
                33619, United States
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thunder-black/90"
          >
            Contact Us
          </Link>
        </motion.div>

        <div className="mt-14">
          <CTABanner />
        </div>
      </Container>
    </section>
  );
};

export default CookiePolicyPageContent;
