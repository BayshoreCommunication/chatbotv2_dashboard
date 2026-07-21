"use client";

import { otpSigninAction, requestLoginOtpAction } from "@/app/actions/auth";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { BiEnvelope, BiLogIn, BiShield, BiX } from "react-icons/bi";

const SigninPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // Step 1: request a code for this email
  const [email, setEmail] = useState(
    () => searchParams.get("email") ?? ""
  );
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState("");

  // Step 2: OTP modal
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const [state, formAction, isPending] = useActionState(otpSigninAction, {
    ok: false,
    error: "",
  });

  useEffect(() => {
    if (state.ok) {
      // Full page navigation so server components (layout, navbar) re-render
      // with the fresh session cookie instead of serving a stale RSC cache.
      window.location.href = state.redirectTo || callbackUrl;
    }
  }, [state.ok, state.redirectTo, callbackUrl]);

  const startOtpCountdown = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError("");
    setRequesting(true);
    try {
      const result = await requestLoginOtpAction(email);
      if (!result.success) {
        setRequestError(result.message || "Failed to send sign-in code.");
        return;
      }
      setShowOTPModal(true);
      setOtp("");
      setOtpTimer(120);
      startOtpCountdown();
    } finally {
      setRequesting(false);
    }
  };

  const handleResendOtp = async () => {
    setRequestError("");
    setRequesting(true);
    try {
      const result = await requestLoginOtpAction(email);
      if (!result.success) {
        setRequestError(result.message || "Failed to resend code.");
        return;
      }
      setOtpTimer(120);
      startOtpCountdown();
    } finally {
      setRequesting(false);
    }
  };

  // Shared styles
  const inputWrapperClass = "relative flex items-center";
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:bg-black/40";
  const iconClass =
    "absolute left-3.5 h-5 w-5 text-gray-400 dark:text-gray-500";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050505]">
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[20%] h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/10" />
        <div className="absolute right-[20%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-thunder-black/10 blur-[120px] dark:bg-thunder-black/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:invert" />
      </div>

      <div className="container relative z-10 mx-auto flex w-full max-w-[520px] flex-col justify-center space-y-8 px-4">
        {/* --- Header --- */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                Welcome Back
              </span>
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base text-gray-500 dark:text-gray-400"
            >
              Enter your email and we&apos;ll send you a sign-in code
            </motion.p>
          </div>
        </div>

        {/* --- Card --- */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-12 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
        >
          <form onSubmit={handleRequestOtp} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <div className={inputWrapperClass}>
                <BiEnvelope className={iconClass} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Status Messages */}
            {requestError && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400"
              >
                {requestError}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={requesting}
              className="mt-2 w-full transform rounded-xl bg-thunder-black px-4 py-3 font-bold text-white shadow-lg shadow-thunder-black/25 transition-all hover:-translate-y-0.5 hover:bg-thunder-black/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {requesting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending code...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Sign-In Code <BiLogIn className="h-5 w-5" />
                </span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">New here? </span>
            <Link
              href={`/sign-up${callbackUrl !== "/dashboard" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
              className="font-semibold text-primary-dark hover:text-primary dark:text-primary"
            >
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOTPModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => !isPending && setShowOTPModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-md rounded-2xl border border-white/20 bg-white p-8 shadow-2xl"
                style={{ colorScheme: "light" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => !isPending && setShowOTPModal(false)}
                  disabled={isPending}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                >
                  <BiX className="h-5 w-5" />
                </button>

                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <BiShield className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Enter Your Code
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    We&apos;ve sent a 6-digit code to <strong>{email}</strong>
                  </p>
                </div>

                <form action={formAction} className="space-y-6">
                  <input type="hidden" name="email" value={email} />
                  <input type="hidden" name="callbackUrl" value={callbackUrl} />

                  <div className="space-y-2">
                    <input
                      type="text"
                      name="otp_code"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      maxLength={6}
                      required
                      style={{ colorScheme: "light" }}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-center text-3xl font-bold tracking-widest text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
                    />

                    <div className="flex items-center justify-between text-sm">
                      {otpTimer > 0 ? (
                        <p className="font-mono text-primary-dark">
                          Code expires in {formatTime(otpTimer)}
                        </p>
                      ) : (
                        <p className="text-red-600">Code expired</p>
                      )}
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={requesting || isPending || otpTimer > 0}
                        className="font-semibold text-primary-dark hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>

                  {(state?.error || requestError) && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {state?.error || requestError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending || otp.length !== 6}
                    className="w-full transform rounded-xl bg-thunder-black px-4 py-3.5 font-bold text-white shadow-lg shadow-thunder-black/25 transition-all hover:-translate-y-0.5 hover:bg-thunder-black/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isPending ? "Verifying..." : "Verify & Sign In"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SigninPage;
