"use client";

import Container from "@/components/shared/Container";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MessageCircle,
  Rocket,
  Search,
  Settings2,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

// ============================================================================
// DATA
// ============================================================================
const STEPS: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
}[] = [
  {
    number: "01",
    title: "Scan",
    description:
      "Add your company name and website URL. Go Converto crawls every page — your services, pricing, and FAQs — and pulls in details from Google too, with nothing to upload or configure by hand.",
    icon: <Search className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Train",
    description:
      "In under a minute, your assistant builds a knowledge base from everything it found and is ready to go live — no developer, no scripts, and no training documents to write yourself.",
    icon: <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Your assistant answers visitor questions instantly and accurately, qualifies leads with the right follow-up questions, and can book appointments directly into your calendar — all day, every day.",
    icon: <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
];

const FEATURES = [
  {
    icon: Rocket,
    title: "Easy Setup",
    description:
      "No developers, no scripts, no waiting on IT. Paste your website URL and your assistant is live in under 10 minutes — ready to start talking to customers the same day.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: Settings2,
    title: "Easy to Use",
    description:
      "Your dashboard is built for business owners, not engineers. Update your welcome message, brand color, and widget placement yourself, and see every change reflected instantly.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Effortless Content",
    description:
      "You don't have to write a single FAQ. Go Converto reads your website and pricing and turns it into a knowledge base automatically — and re-trains itself any time your site changes.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
  {
    icon: Smartphone,
    title: "Manage On the Go",
    description:
      "Check new leads, review conversations, and confirm appointments from the Go Converto mobile app — your dashboard, in your pocket, wherever business takes you.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
];

const STATS = [
  {
    icon: Rocket,
    title: "Faster Time to Value",
    description:
      "No coding, no complexity — paste your URL and your assistant is answering customers the same day.",
  },
  {
    icon: TrendingUp,
    title: "More Conversations",
    description:
      "Every visitor gets an instant, accurate answer, so fewer of them leave without engaging.",
  },
  {
    icon: User,
    title: "More Leads & Sales",
    description:
      "Qualified leads and booked appointments land straight in your dashboard, ready for follow-up.",
  },
];

// ============================================================================
// HOW IT WORKS PAGE CONTENT
// ============================================================================
const HowItWorksPageContent = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Steps (timeline) --- */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The process
            </span>
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-thunder-black sm:text-3xl">
              From website to working assistant
            </h2>
            <p className="text-base text-gray-600">
              Three steps, no technical work required.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line behind the numbered circles */}
            <div className="absolute left-7 top-7 bottom-7 w-px bg-gray-200" />

            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                <div
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg shadow-primary/20 ${step.gradient}`}
                >
                  {step.icon}
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-primary-dark">
                    Step {step.number}
                  </span>
                  <h3 className="mb-2 mt-1 text-xl font-extrabold text-thunder-black">
                    {step.title}
                  </h3>
                  <p className="max-w-lg text-base leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Built to be easy --- */}
        <div className="mt-20">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Why business owners choose us
            </span>
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-thunder-black sm:text-3xl">
              Built for business owners, not developers
            </h2>
            <p className="mx-auto max-w-xl text-base text-gray-600">
              Every part of Go Converto — setup, daily use, content, and
              management — is designed so you never need a developer to run it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-2xl border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-primary/20 ${feature.gradient}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-thunder-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Stats banner --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-thunder-black via-thunder-black to-primary-dark px-6 py-12 sm:px-10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:20px_20px]" />
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">
                    {stat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowItWorksPageContent;
