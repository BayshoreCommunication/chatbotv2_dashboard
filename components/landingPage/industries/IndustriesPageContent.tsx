"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongRight, HiCheck } from "react-icons/hi2";
import { INDUSTRIES, type Industry } from "@/lib/industriesData";
import Container from "@/components/shared/Container";
import CTABanner from "@/components/shared/CTABanner";

// ============================================================================
// INDUSTRY DETAIL ROW — alternating image/text layout, one per industry
// ============================================================================
const IndustryRow = ({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) => {
  const Icon = industry.icon;
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 ${
        index > 0 ? "border-t border-gray-200" : ""
      }`}
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${industry.gradient} text-white shadow-lg shadow-primary/20`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <Link href={`/industries/${industry.slug}`}>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-thunder-black transition-colors hover:text-primary-dark sm:text-3xl">
            {industry.title}
          </h2>
        </Link>
        <p className="mb-6 text-base leading-relaxed text-gray-600">
          {industry.description}
        </p>
        <ul className="mb-6 space-y-3">
          {industry.capabilities.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiCheck className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-gray-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={`/industries/${industry.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark transition-colors hover:text-primary"
        >
          Learn more about {industry.title}
          <HiArrowLongRight className="h-4 w-4" />
        </Link>
      </div>

      <Link
        href={`/industries/${industry.slug}`}
        className={`relative block h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br sm:h-80 lg:h-96 ${
          reversed ? "lg:order-1" : ""
        } ${industry.gradient}`}
      >
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-thunder-black/40 via-transparent to-transparent" />
      </Link>
    </motion.div>
  );
};

// ============================================================================
// INDUSTRIES PAGE CONTENT
// ============================================================================
const IndustriesPageContent = () => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Quick jump nav --- */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-10">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
            >
              {industry.title}
            </Link>
          ))}
        </div>

        {/* --- Industry rows --- */}
        <div>
          {INDUSTRIES.map((industry, index) => (
            <IndustryRow
              key={industry.slug}
              industry={industry}
              index={index}
            />
          ))}
        </div>

        <div className="mt-14">
          <CTABanner />
        </div>
      </Container>
    </section>
  );
};

export default IndustriesPageContent;
