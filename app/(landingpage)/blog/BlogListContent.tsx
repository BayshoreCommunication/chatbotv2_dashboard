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
              className={`relative min-h-[220px] bg-gradient-to-br ${featuredPost.gradient} md:min-h-[320px]`}
            >
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
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
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${featuredPost.avatarColor} text-xs font-bold text-white`}
                >
                  {featuredPost.initials}
                </span>
                <span className="text-sm text-gray-500">
                  {featuredPost.author} · {featuredPost.date} ·{" "}
                  {featuredPost.readTime}
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
                  className={`relative h-40 bg-gradient-to-br ${post.gradient}`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
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
      </Container>
    </section>
  );
};

export default BlogListContent;
