"use client";

import { verifyTeamAccessAction } from "@/app/actions/team-access";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiEnvelope, BiLoaderAlt, BiXCircle } from "react-icons/bi";

type State = "loading" | "success" | "already" | "error" | "missing";

export default function VerifyTeamAccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState]       = useState<State>(token ? "loading" : "missing");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail]       = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    verifyTeamAccessAction(token).then((res) => {
      if (res.ok && res.data) {
        setEmail(res.data.email);
        setState(res.data.already_verified ? "already" : "success");
      } else {
        setErrorMsg(res.error ?? "Something went wrong.");
        setState("error");
      }
    });
  }, [token]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

        {state === "loading" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <BiLoaderAlt size={28} className="animate-spin text-gray-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Verifying your access…</h1>
            <p className="mt-1.5 text-sm text-gray-500">Just a moment while we activate your team account.</p>
          </>
        )}

        {(state === "success" || state === "already") && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <BiCheckCircle size={32} className="text-green-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {state === "already" ? "Already verified!" : "Access activated!"}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              {state === "already"
                ? "Your team access was already active. Sign in below."
                : "Your team access is now active. Sign in with your email — no password needed."}
            </p>

            {email && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <BiEnvelope size={16} className="shrink-0 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 break-all">{email}</span>
              </div>
            )}

            <Link
              href="/sign-in"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <p className="mt-3 text-xs text-gray-400">
              Enter your email on the sign-in page and we&apos;ll send you a one-time code.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <BiXCircle size={32} className="text-red-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Verification failed</h1>
            <p className="mt-1.5 text-sm text-gray-500">{errorMsg}</p>
            <p className="mt-3 text-xs text-gray-400">
              The link may be invalid or expired. Contact the person who added you to the team for a new invite.
            </p>
            <Link
              href="/sign-in"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}

        {state === "missing" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50">
              <BiXCircle size={32} className="text-yellow-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Invalid link</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              This link is missing the verification token. Make sure you opened the full link from the email.
            </p>
            <Link
              href="/sign-in"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
