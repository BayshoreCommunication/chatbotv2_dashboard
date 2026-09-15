"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogPosts";
import Container from "@/components/shared/Container";

const FEATURED_POST = BLOG_POSTS[0];
const POSTS = BLOG_POSTS.slice(1);

// ============================================================================
// BLOG SECTION
// ============================================================================
const BlogSection = () => {
  return (
    <section id="blog" className="bg-white py-10 lg:py-20">
      <Container>
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
          Guides on Converting Website Traffic Into Customers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mb-14 max-w-2xl text-center text-base text-gray-600 sm:text-lg"
        >
          Real guides, playbooks, and product tips on automating support for
          turning your website traffic into paying customers rather than just
          page views.
        </motion.p>

        {/* --- Featured post --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link
            href={`/blog/${FEATURED_POST.slug}`}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg md:grid-cols-2"
          >
            <div
              className={`relative min-h-[240px] bg-slate-50 md:min-h-[320px] overflow-hidden flex items-center justify-center p-2 border-b border-gray-100 md:border-b-0 md:border-r`}
            >
              <Image
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-1"
              />
              <span className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900 shadow-md border border-gray-100">
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
              key={post.slug}
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
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`relative h-48 sm:h-52 bg-slate-50 overflow-hidden flex items-center justify-center p-2 border-b border-gray-100`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-1"
                  />
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-900 shadow-md border border-gray-100">
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
      </Container>
    </section>
  );
};

export default BlogSection;
