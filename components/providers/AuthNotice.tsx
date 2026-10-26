"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AUTH_NOTICES } from "@/lib/authMessages";

// Shows the reason behind a redirect (?notice=session_expired etc.) once,
// then removes it from the URL so a refresh doesn't repeat it.
export default function AuthNotice() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  useEffect(() => {
    if (!notice) return;
    const message = AUTH_NOTICES[notice];
    if (message) toast.error(message, { id: `notice-${notice}`, duration: 7000 });

    const url = new URL(window.location.href);
    url.searchParams.delete("notice");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [notice]);

  return null;
}
