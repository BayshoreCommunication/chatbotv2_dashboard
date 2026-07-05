import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { fetchUserProfile } from "./lib/fetchUserProfile";

export async function middleware(request: NextRequest) {
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
    "/accept-invite",
    "/verify-team-access",
  ];

  // 2. STATIC ASSETS + NEXTAUTH INTERNALS: Always allow.
  // /api/auth/* is NextAuth's own session/csrf/callback plumbing — it must
  // never be gated behind "is logged in", or sign-in itself breaks (the
  // credentials callback fires *before* a session exists).
  const excludedPaths = [
    "/_next/",
    "/favicon.ico",
    "/opengraph-image.png",
    "/assets/",
    "/api/auth/",
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

    // Allow other public paths
    if (
      publicPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/"),
      )
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
      )
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

export default middleware;
