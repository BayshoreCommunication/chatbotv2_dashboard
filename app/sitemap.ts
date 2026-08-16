import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/seo";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { INDUSTRIES } from "@/lib/industriesData";

// Next.js's file-convention route — this is what actually serves
// /sitemap.xml. Only public marketing pages belong here; authenticated app
// routes are disallowed in app/robots.ts instead, not listed for indexing.
const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/start-free-trial", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/data-deletion", priority: 0.3, changeFrequency: "yearly" },
  { path: "/user-guide", priority: 0.4, changeFrequency: "monthly" },
];

// Blog post `date` values are hand-written strings like "Jun 23, 2026" —
// parseable by the Date constructor, but fall back to now() if a future
// edit ever puts something Date can't parse rather than emitting invalid XML.
function parsePostDate(date: string): Date {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parsePostDate(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const industryEntries: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...industryEntries];
}
