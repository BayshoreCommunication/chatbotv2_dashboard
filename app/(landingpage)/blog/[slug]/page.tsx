import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HiOutlineMapPin } from "react-icons/hi2";
import { BLOG_POSTS, getBlogPost, getOtherPosts } from "@/lib/blogPosts";
import { OG_IMAGE } from "@/config/seo";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import Container from "@/components/shared/Container";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const otherPosts = getOtherPosts(slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        title={post.title}
        image={post.image}
      />

      <article className="bg-white py-10 lg:py-16">
      <Container>
        {/* --- Post meta --- */}
        <div className="mb-10">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wide text-primary-dark">
            {post.tag}
          </span>
          <p className="mb-5 text-base text-gray-600 sm:text-lg">
            {post.description}
          </p>
          <div className="flex items-center gap-2.5">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${post.avatarColor} text-xs font-bold text-white`}
            >
              {post.initials}
            </span>
            <div>
              <div className="text-sm font-semibold text-thunder-black">
                {post.author}
              </div>
              <div className="text-xs text-gray-500">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* --- Body --- */}
        <div className="prose-blog">
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            <span className="mr-1 float-left text-6xl font-bold leading-[0.8] text-thunder-black">
              {post.intro.charAt(0)}
            </span>
            {post.intro.slice(1)}
          </p>

          {post.sections.map((section) => (
            <div key={section.heading} className="mb-6">
              <h3 className="mb-2 text-lg font-bold text-thunder-black">
                {section.heading}
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                {section.body}
              </p>
            </div>
          ))}

          {post.callout && (
            <div className="mb-6 flex gap-3 rounded-xl bg-primary/5 p-4">
              <HiOutlineMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" />
              <p className="text-sm leading-relaxed text-primary-dark">
                <span className="font-bold">{post.callout.label}</span>{" "}
                {post.callout.body}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-bold text-thunder-black">
              {post.outro.heading}
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              {post.outro.body}
            </p>
          </div>
        </div>

        {/* --- Author bio --- */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-gray-200 p-6">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${post.avatarColor} text-sm font-bold text-white`}
          >
            {post.initials}
          </span>
          <div>
            <div className="text-sm font-semibold text-thunder-black">
              {post.author}
            </div>
            <div className="mb-1.5 text-xs font-medium text-primary-dark">
              {post.authorRole}
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {post.authorBio}
            </p>
          </div>
        </div>

        {/* --- CTA banner --- */}
        <div className="mt-10">
          <CTABanner />
        </div>

      {/* --- Keep reading --- */}
      {otherPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight text-thunder-black">
            Keep reading
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`relative h-32 bg-gradient-to-br ${other.gradient}`}
                >
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-900">
                    {other.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-sm font-bold leading-snug text-thunder-black transition-colors group-hover:text-primary-dark">
                    {other.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${other.avatarColor} text-[9px] font-bold text-white`}
                    >
                      {other.initials}
                    </span>
                    <span className="text-xs text-gray-500">
                      {other.author} · {other.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      </Container>
    </article>
    </>
  );
}
