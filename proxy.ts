import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { fetchUserProfile } from "./lib/fetchUserProfile";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. PUBLIC PATHS: Accessible to everyone (Guests + Users)
  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/start-free-trial",
    "/landing",
    "/payment-success",
    "/google",
    "/create-assistent",
    "/chatbot",
    "/pricing",
    "/about",
    "/industries",
    "/how-it-works",
    "/faq",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/accept-invite",
    "/verify-team-access",
    "/user-guide",
    "/ai-chatbot-law-firm-website",
  ];

  // 2. STATIC ASSETS + NEXTAUTH INTERNALS: Always allow.
  // /api/auth/* is NextAuth's own session/csrf/callback plumbing — it must
  // never be gated behind "is logged in", or sign-in itself breaks (the
  // credentials callback fires *before* a session exists).
  const excludedPaths = [
    "/_next/",
    "/favicon.ico",
    // Next's file-based metadata routes (app/opengraph-image.png etc.) are
    // served at a generated URL that drops the original file extension —
    // "/opengraph-image", not "/opengraph-image.png". Without this, social
    // media crawlers (which never carry an auth cookie) get redirected to
    // /sign-in instead of the actual preview image.
    "/opengraph-image",
    "/twitter-image",
    "/icon",
    "/apple-icon",
    "/assets/",
    "/api/auth/",
    // Crawlers/bots never carry a session cookie — gating these behind
    // sign-in silently breaks robots.txt/sitemap discovery entirely (Google
    // just sees a redirect to a login page and gives up).
    "/robots.txt",
    "/sitemap.xml",
    // The User Guide's "Download as PDF" button — same public page as
    // /user-guide above, must work for signed-out visitors too.
    "/api/user-guide/",
  ];

  // Check for static assets
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // --- OAUTH CALLBACK HANDLING ---
  if (pathname === "/auth/callback") {
    try {
      const session = await auth();

      if (!session || !session.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      const token = (session.user as { accessToken?: string }).accessToken;
      const user = token ? await fetchUserProfile(token) : null;

      if (user?.is_subscribed) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/start-free-trial", request.url));
      }
    } catch (error) {
      console.error("💥 [Middleware] Callback Error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  try {
    const session = await auth();

    // --- AUTH PAGE REDIRECT (UX Improvement) ---
    // If user is already logged in, don't let them see Sign-In/Up pages
    if (session?.user && (pathname === "/sign-in" || pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow other public paths (including SEO service landing pages)
    if (
      publicPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/"),
      ) ||
      pathname.startsWith("/ai-chatbot-")
    ) {
      return NextResponse.next();
    }

    // --- PROTECTED ROUTES ---

    // 1. Require Authentication
    if (!session || !session.user) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
      return NextResponse.redirect(url);
    }

    // 2. Subscription Check logic
    // These paths require auth but are allowed WITHOUT an active subscription
    const subscriptionExemptPaths = [
      "/start-free-trial",
      "/confirm-subscription",
      "/paymenttest",
      "/checkout",
      // WidgetSettingView already gates itself on subscription_status (its own
      // "paywall" view state) and has a dedicated "activating" polling state
      // for the exact post-checkout webhook race this middleware check can't
      // safely wait out — double-gating it here only fights that logic and
      // bounces users mid-poll.
      "/widget-settings",
    ];

    if (subscriptionExemptPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // For all other protected paths, require active subscription (checked fresh from API)
    const token = (session.user as { accessToken?: string }).accessToken;

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const user = await fetchUserProfile(token);

    if (!user?.is_subscribed) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // A thrown error here (e.g. a corrupted/expired session cookie) would
    // otherwise crash every single page request with "Internal Server
    // Error" — fall back to treating the visitor as unauthenticated
    // instead of taking the whole site down.
    console.error("💥 [Middleware] Unexpected error:", error);
    if (
      publicPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/"),
      ) ||
      pathname.startsWith("/ai-chatbot-")
    ) {
      return NextResponse.next();
    }
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"],
};

export default proxy;
