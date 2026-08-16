import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { OG_IMAGE } from "@/config/seo";
import PageHero from "@/components/shared/PageHero";
import BlogListContent from "./BlogListContent";

const PAGE_TITLE = "Guide Blogs on Converting Website Traffic | Go Converto";
const PAGE_DESCRIPTION =
  "Read guides and product tips on turning website visitors into paying customers, straight from the team building Go Converto's AI chatbot platform.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function BlogPage() {
  const [featuredPost, ...posts] = BLOG_POSTS;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Insights to grow your business with AI"
      />
      <BlogListContent featuredPost={featuredPost} posts={posts} />
    </>
  );
}
