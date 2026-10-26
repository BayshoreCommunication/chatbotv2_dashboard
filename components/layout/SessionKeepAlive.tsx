"use client";

import { useEffect } from "react";

const MIN_GAP_MS = 30 * 60 * 1000;

// Pings NextAuth's session endpoint while the dashboard is in use. That call
// is what re-issues the session cookie (and, once a day, a fresh backend
// token) — Server Components can't write cookies, so without this a person
// who only browses would still be signed out 30 days after their first login.
export default function SessionKeepAlive() {
  useEffect(() => {
    let last = 0;
    const ping = () => {
      const now = Date.now();
      if (now - last < MIN_GAP_MS) return;
      last = now;
      void fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" }).catch(() => {});
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") ping();
    };
    ping();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return null;
}
