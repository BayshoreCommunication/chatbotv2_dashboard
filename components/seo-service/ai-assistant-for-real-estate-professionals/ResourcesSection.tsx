"use client";

import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const articles = [
  {
    tag: "Strategy",
    title: "The ultimate guide to conversational lead capture",
    meta: "Sarah Chen · 9 min read",
  },
  {
    tag: "Growth",
    title: "How automated chat turns casual browsing into booked showings",
    meta: "Sarah Chen · 6 min read",
  },
  {
    tag: "Lead Gen",
    title: "5 ways to capture leads when you're busy with other clients",
    meta: "Marcus Lee · 4 min read",
  },
  {
    tag: "Product",
    title: "Getting your virtual assistant live in under ten minutes",
    meta: "Priya Patel · 3 min read",
  },
];

export default function ResourcesSection() {
  return (
    <section className="relative bg-white py-8 lg:py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-[#00a8a0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8a0] sm:text-sm">
              - Resources
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] leading-snug sm:leading-tight">
            Guides for turning online traffic into actual tours
          </h2>
        </motion.div>

        {/* 4 Article Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((art, index) => (
            <motion.div
              key={art.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-[#00a8a0]/40 transition-all cursor-pointer"
            >
              <div>
                <span className="inline-block mb-3 rounded-full bg-[#00a8a0]/10 px-3 py-1 text-xs font-bold text-[#00a8a0]">
                  {art.tag}
                </span>

                <h3 className="mb-4 text-base font-bold text-gray-900 group-hover:text-[#00a8a0] transition-colors leading-snug">
                  {art.title}
                </h3>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-400">
                <span>{art.meta}</span>
                <BsArrowRight className="h-4 w-4 text-[#00a8a0] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
