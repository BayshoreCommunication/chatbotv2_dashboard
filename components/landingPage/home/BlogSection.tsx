"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================================
// DATA
// ============================================================================
const FEATURED_POST = {
  tag: "Featured · Strategy",
  title: "The complete guide to AI-powered customer conversations",
  description:
    "Everything you need to turn your website into a 24/7 revenue channel — from training your assistant on your own content to capturing, qualifying, and routing every lead automatically.",
  author: "Sarah Chen",
  initials: "SC",
  avatarColor: "bg-blue-600",
  date: "Jun 23, 2026",
  readTime: "9 min read",
  gradient: "from-blue-700 via-blue-600 to-blue-400",
};

const POSTS = [
  {
    tag: "Growth",
    title: "How AI chatbots turn website visitors into paying customers",
    description:
      "A practical look at how an always-on assistant qualifies, nurtures, and converts the traffic you already have.",
    author: "Sarah Chen",
    initials: "SC",
    avatarColor: "bg-blue-600",
    readTime: "6 min read",
    gradient: "from-blue-700 to-blue-400",
  },
  {
    tag: "Lead Gen",
    title: "5 ways to capture more leads while you sleep",
    description:
      "Simple, no-code tactics to make sure no after-hours inquiry ever slips through the cracks again.",
    author: "Marcus Lee",
    initials: "ML",
    avatarColor: "bg-purple-600",
    readTime: "4 min read",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    tag: "Product",
    title: "Set up your AI assistant in under 10 minutes",
    description:
      "From pasting your URL to going live — a step-by-step walkthrough of the whole BayAI setup.",
    author: "Priya Patel",
    initials: "PP",
    avatarColor: "bg-emerald-600",
    readTime: "3 min read",
    gradient: "from-purple-600 to-indigo-500",
  },
];

// ============================================================================
// BLOG SECTION
// ============================================================================
const BlogSection = () => {
  return (
    <section id="blog" className="bg-white py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Blog
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-3 text-center text-3xl font-extrabold tracking-tight text-thunder-black sm:text-4xl"
        >
          Insights to grow your business with AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mb-14 max-w-xl text-center text-base text-gray-600 sm:text-lg"
        >
          Guides, playbooks, and product tips on automating support,
          capturing more leads, and getting the most out of your AI
          assistant.
        </motion.p>

        {/* --- Featured post --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link
            href="#"
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg md:grid-cols-2"
          >
            <div
              className={`relative min-h-[220px] bg-gradient-to-br ${FEATURED_POST.gradient} md:min-h-[320px]`}
            >
              <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
                Featured
              </span>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="mb-3 text-xs font-bold uppercase tracking-wide text-primary-dark">
                {FEATURED_POST.tag}
              </span>
              <h3 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-[28px]">
                {FEATURED_POST.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                {FEATURED_POST.description}
              </p>
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${FEATURED_POST.avatarColor} text-xs font-bold text-white`}
                >
                  {FEATURED_POST.initials}
                </span>
                <span className="text-sm text-gray-500">
                  {FEATURED_POST.author} · {FEATURED_POST.date} ·{" "}
                  {FEATURED_POST.readTime}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* --- Post grid --- */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: index * 0.1,
              }}
            >
              <Link
                href="#"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`relative h-40 bg-gradient-to-br ${post.gradient}`}
                >
                  <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-900">
                    {post.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold leading-snug text-thunder-black transition-colors group-hover:text-primary-dark">
                    {post.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${post.avatarColor} text-[10px] font-bold text-white`}
                    >
                      {post.initials}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.author} · {post.readTime}
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
};

export default BlogSection;
