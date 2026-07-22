"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industriesData";
import { HiSparkles } from "react-icons/hi";
import type { Industry } from "@/lib/industriesData";

// ============================================================================
// INDUSTRY CARD — reveals as it scrolls into view
// ============================================================================
const IndustryCard = ({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) => {
  const Icon = industry.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: Math.min(index, 3) * 0.08,
      }}
    >
      <Link
        href={`/industries/${industry.slug}`}
        className="flex flex-col items-center gap-6 rounded-2xl bg-gray-50 p-7 text-center transition-shadow hover:shadow-lg lg:flex-row lg:items-center lg:text-left"
      >
        <div className="flex-1">
          <div
            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${industry.gradient} text-white shadow-lg shadow-primary/20 lg:mx-0`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-thunder-black">
            {industry.title}
          </h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-600 lg:mx-0">
            {industry.description}
          </p>
        </div>

        <div
          className={`relative h-56 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br lg:h-64 lg:w-64 ${industry.gradient}`}
        >
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            sizes="(min-width: 1024px) 256px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-thunder-black/50 via-thunder-black/10 to-transparent" />
          <Icon className="absolute bottom-4 right-4 h-8 w-8 text-white/90 drop-shadow" />
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================================
// INDUSTRIES SECTION
// ============================================================================
const IndustriesSections = () => {
  return (
    <section id="industries" className="bg-white py-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* --- Left: sticky intro --- */}
        <div className="text-center lg:sticky lg:top-32 lg:self-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
          >
            <HiSparkles className="h-4 w-4 text-primary" />
            AI Chatbot for Your Business
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-thunder-black sm:text-4xl lg:text-[42px]"
          >
            Built to Scale With Your Business One Platform.{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text italic text-transparent">
              Endless Possibilities
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto max-w-md text-base text-gray-600 sm:text-lg lg:mx-0"
          >
            Whatever industry you&apos;re in, Go Converto trains itself on your
            content and speaks your customers&apos; language from day one.
          </motion.p>
        </div>

        {/* --- Right: industry cards, reveal one by one on scroll --- */}
        <div className="flex flex-col gap-6">
          {INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.title}
              industry={industry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSections;
