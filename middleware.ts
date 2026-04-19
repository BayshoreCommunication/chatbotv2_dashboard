import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. PUBLIC PATHS: Accessible to everyone (Guests + Users)
  // Removed "/start-free-trial" so it forces a login first.
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
  ];

  // 2. STATIC ASSETS: Always allow
  const excludedPaths = [
    "/_next/",
    "/favicon.ico",
    "/opengraph-image.png",
    "/assets/",
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
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      console.error("💥 [Middleware] Callback Error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  const session = await auth();

  // --- AUTH PAGE REDIRECT (UX Improvement) ---
  // If user is already logged in, don't let them see Sign-In/Up pages.
  // Honor callbackUrl so the post-auth redirect flow works correctly.
  if (session?.user && (pathname === "/sign-in" || pathname === "/sign-up")) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl") || "/dashboard";
    return NextResponse.redirect(new URL(callbackUrl, request.url));
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
    // Redirect to sign-in, but remember where they wanted to go
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"],
};

export default middleware;
