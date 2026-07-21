export const SITE_URL = "https://www.goconverto.com";

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
