"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogPosts";
import Container from "@/components/shared/Container";

const BlogListContent = ({
  featuredPost,
  posts,
}: {
  featuredPost: BlogPost;
  posts: BlogPost[];
}) => {
  return (
    <section className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Featured post --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg md:grid-cols-2"
          >
            <div
              className={`relative min-h-[240px] bg-slate-50 md:min-h-[320px] overflow-hidden flex items-center justify-center p-2 border-b border-gray-100 md:border-b-0 md:border-r`}
            >
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
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
                {featuredPost.tag}
              </span>
              <h2 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-thunder-black sm:text-[28px]">
                {featuredPost.title}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
                {featuredPost.description}
              </p>
              <div className="flex items-center gap-2.5">
                {featuredPost.initials && (
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${featuredPost.avatarColor} text-xs font-bold text-white`}
                  >
                    {featuredPost.initials}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {featuredPost.author ? `${featuredPost.author} · ` : ""}
                  {featuredPost.date} · {featuredPost.readTime}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* --- Post grid --- */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: (index % 3) * 0.1,
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
                    {post.initials && (
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${post.avatarColor} text-[10px] font-bold text-white`}
                      >
                        {post.initials}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {post.author ? `${post.author} · ` : ""}
                      {post.readTime}
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

export default BlogListContent;
