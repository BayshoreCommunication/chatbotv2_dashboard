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
      "Enter your company name and website URL. Go Converto reviews your website, including your services, pricing, and FAQs, then brings in helpful business information from Google. There's nothing to upload or set up yourself.",
    icon: <Search className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "In less than a minute, your assistant organizes everything it finds into a knowledge base and gets ready to chat with visitors. There's no coding, no developer, and no training documents to create.",
    icon: <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Your assistant answers questions, qualifies leads with thoughtful follow up questions, and books appointments directly on your calendar. It keeps working around the clock, so every visitor gets a response.",
    icon: <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.5} />,
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
];

const FEATURES = [
  {
    icon: Rocket,
    title: "Easy Setup",
    description:
      "Skip the developers and technical setup. Add your website URL and your assistant can be ready to talk with customers in less than 10 minutes.",
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    icon: Settings2,
    title: "Easy to Use",
    description:
      "The dashboard is simple and prepared for business owners. Update your welcome message, brand colors, or chat widget whenever you like, and your changes appear right away.",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Content Made Simple",
    description:
      "There's no need to write FAQs from scratch. Go Converto learns from your website and pricing information, then updates its knowledge whenever your website changes.",
    gradient: "from-emerald-600 via-green-500 to-lime-400",
  },
  {
    icon: Smartphone,
    title: "Work from Anywhere",
    description:
      "View new leads, read conversations, and manage appointments from the Go Converto mobile app, whether you're at the office or on the go.",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
  },
];

const STATS = [
  {
    icon: Rocket,
    title: "Faster Time to Value",
    description:
      "Skip the coding and technical setup. Paste your website URL and start answering customer questions in minutes.",
  },
  {
    icon: TrendingUp,
    title: "More Conversations",
    description:
      "Every visitor gets a quick, accurate answer, giving them a reason to stay and start a conversation.",
  },
  {
    icon: User,
    title: "More Leads and Sales",
    description:
      "Qualified leads and booked appointments go straight to your dashboard, so your team can follow up without delay.",
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
              From website to a live assistant
            </h2>

            <p className="text-base text-gray-600">
              Get started in three simple steps, with no technical setup
              required.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line behind the numbered circles */}
            <div className="absolute bottom-7 left-7 top-7 w-px bg-gray-200" />

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

        {/* --- Why business owners choose Go Converto --- */}
        <div className="mt-20">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Why business owners choose Go Converto
            </span>

            <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-thunder-black sm:text-3xl">
              Made specifically for business owners
            </h2>

            <p className="mx-auto max-w-xl text-base text-gray-600">
              Everything about Go Converto is built to be simple to set up, easy
              to manage, and ready to use without technical help.
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
