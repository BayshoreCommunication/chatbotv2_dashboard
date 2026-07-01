"use client";

import { acceptInviteAction } from "@/app/actions/invites";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiEnvelope, BiLoaderAlt, BiXCircle } from "react-icons/bi";

type State = "loading" | "success" | "error" | "missing";

export default function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<State>(token ? "loading" : "missing");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    acceptInviteAction(token).then((res) => {
      if (res.ok && res.data) {
        setEmail(res.data.email);
        setState("success");
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
            <h1 className="text-lg font-semibold text-gray-900">
              Accepting your invite…
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Just a moment while we set up your account.
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <BiCheckCircle size={32} className="text-green-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              You&apos;re in!
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Your account is ready. Sign in with the email below using a one-time code.
            </p>

            {email && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <BiEnvelope size={16} className="shrink-0 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 break-all">{email}</span>
              </div>
            )}

            <Link
              href={`/sign-in`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Sign In with this email
            </Link>
            <p className="mt-3 text-xs text-gray-400">
              On the sign-in page, enter your email and we&apos;ll send you a code — no password needed.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <BiXCircle size={32} className="text-red-500" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              Invite could not be accepted
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">{errorMsg}</p>
            <p className="mt-3 text-xs text-gray-400">
              The link may have already been used or was revoked. Contact the person who sent the invite for a new one.
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
            <h1 className="text-lg font-semibold text-gray-900">
              Invalid invite link
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              This link is missing the invite token. Make sure you opened the full link from the email.
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
