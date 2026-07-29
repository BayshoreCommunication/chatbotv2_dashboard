import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { OG_IMAGE } from "@/config/seo";
import PageHero from "@/components/shared/PageHero";
import BlogListContent from "./BlogListContent";

const PAGE_TITLE = "Blog — Go Converto";
const PAGE_DESCRIPTION =
  "Guides, playbooks, and product tips on automating support, capturing more leads, and getting the most out of your AI assistant.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
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
