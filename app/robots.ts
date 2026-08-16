import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/seo";

// Next.js's file-convention route — this is what actually serves /robots.txt.
// Authenticated app routes are already `noindex` via their own layout's
// metadata (see app/(dashboard)/layout.tsx) — disallowing them here too
// saves crawl budget by keeping bots from fetching a login wall at all.
const DISALLOWED_PATHS = [
  "/dashboard",
  "/chats",
  "/leads",
  "/settings",
  "/train-ai",
  "/appointments",
  "/apps-integration",
  "/widget-settings",
  "/user-settings",
  "/billing",
  "/ai",
  "/checkout",
  "/create-assistent",
  "/chatbot",
  "/api/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
