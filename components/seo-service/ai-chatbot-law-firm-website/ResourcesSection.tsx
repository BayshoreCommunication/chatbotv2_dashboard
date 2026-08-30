"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const resourceCards = [
  {
    id: "guide-1",
    category: "STRATEGY",
    title: "The complete guide to AI-powered client conversations",
    image: "/assets/resources/guide-laptop.png",
    authorName: "Sarah Chen",
    authorAvatar: "/assets/resources/avatar-sarah-chen.png",
    href: "#",
  },
  {
    id: "guide-2",
    category: "GROWTH",
    title: "How AI chatbots turn website visitors into signed clients",
    image: "/assets/resources/growth-chart.png",
    authorName: "Sarah Chen",
    authorAvatar: "/assets/resources/avatar-sarah-chen.png",
    href: "#",
  },
  {
    id: "guide-3",
    category: "INTAKE",
    title: "5 ways to capture more case inquiries while you sleep",
    image: "/assets/resources/intake-form.png",
    authorName: "Marcus Lee",
    authorAvatar: "/assets/resources/avatar-marcus-lee.png",
    href: "#",
  },
  {
    id: "guide-4",
    category: "PRODUCT",
    title: "Set up your firm's AI assistant in under 10 minutes",
    image: "/assets/resources/ai-robot.png",
    authorName: "Priya Patel",
    authorAvatar: "/assets/resources/avatar-priya-patel.png",
    href: "#",
  },
];

export default function ResourcesSection() {
  return (
    <section className="relative bg-[#f8faf9] py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-left"
        >
          {/* Top Kicker Line */}
          <div className="mb-4 flex items-center justify-start gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8a0] sm:text-sm">
              RESOURCES
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] max-w-3xl mb-4">
            Guides on converting website traffic into clients
          </h2>

          {/* Subtitle Description */}
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base font-normal">
            Actionable guides and strategies to help law firms capture more inquiries, <br className="hidden sm:inline" />
            qualify the right clients, and grow with confidence.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 RESOURCE CARDS GRID WITH HOVER EFFECT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {resourceCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <Link href={card.href} className="flex flex-col justify-between h-full">
                {/* Top Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Category Tag */}
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-[#00a8a0] mb-2">
                      {card.category}
                    </span>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#00a8a0] transition-colors duration-200 mb-6">
                      {card.title}
                    </h3>
                  </div>

                  {/* Bottom Author */}
                  <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                    <Image
                      src={card.authorAvatar}
                      alt={card.authorName}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-100"
                    />
                    <span className="text-xs font-medium text-slate-600">
                      {card.authorName}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
