"use client";

import { verifyTeamAccessAction } from "@/app/actions/team-access";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiCheckCircle,
  BiEnvelope,
  BiLoaderAlt,
  BiXCircle,
} from "react-icons/bi";

type State = "loading" | "success" | "already" | "error" | "missing";

export default function VerifyTeamAccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<State>(token ? "loading" : "missing");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        {/* ── Loading ── */}
        {state === "loading" && (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <BiLoaderAlt size={30} className="animate-spin text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Activating your account…
            </h1>
            <p className="mt-2 text-sm text-gray-500">Just a moment.</p>
          </>
        )}

        {/* ── Success / Already verified ── */}
        {(state === "success" || state === "already") && (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <BiCheckCircle size={36} className="text-green-500" />
            </div>

            <h1 className="text-xl font-semibold text-gray-900">
              Your account is successfully active
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {state === "already"
                ? "Your team access was already active."
                : "You now have access to the team dashboard."}
            </p>

            {email && (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <BiEnvelope size={15} className="shrink-0 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 break-all">
                  {email}
                </span>
              </div>
            )}

            <Link
              href={`/sign-in`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Sign In to Dashboard
            </Link>

            <p className="mt-3 text-xs text-gray-400">
              Use your email above — we&apos;ll send you a one-time sign-in
              code.
            </p>
          </>
        )}

        {/* ── Error ── */}
        {state === "error" && (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <BiXCircle size={36} className="text-red-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Verification failed
            </h1>
            <p className="mt-2 text-sm text-gray-500">{errorMsg}</p>
            <p className="mt-1 text-xs text-gray-400">
              The link may be invalid or expired. Contact the person who invited
              you for a new one.
            </p>
            <Link
              href="/sign-in"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}

        {/* ── Missing token ── */}
        {state === "missing" && (
          <>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
              <BiXCircle size={36} className="text-yellow-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Invalid link
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              This link is missing a verification token. Make sure you copied
              the full link from the email.
            </p>
            <Link
              href="/sign-in"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
