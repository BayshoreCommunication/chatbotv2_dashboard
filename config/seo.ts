export const SITE_URL = "https://www.goconverto.com";

// The marketing site is still being built out in production, so we keep it
// out of Google's index until it's actually ready to launch. Flip
// NEXT_PUBLIC_SITE_LIVE=true in the environment when it's ready to go live —
// no code change needed.
export const SITE_IS_LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

// Declared explicitly rather than relying on Next's file-convention
// auto-detection of app/opengraph-image.png — that convention reliably
// serves the image itself (confirmed 200 in both dev and a production
// build), but doesn't reliably inject the corresponding <meta og:image>
// tag on this Next.js version. Pointing at it explicitly here is what
// makes the same image show up on every page/section, landing and
// dashboard alike.
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 3600,
  height: 1890,
  alt: "Go Converto — AI chatbot for your business",
};
