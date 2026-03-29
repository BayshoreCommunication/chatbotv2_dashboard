"use client";

import { signinAction } from "@/app/actions/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { BiEnvelope, BiLockAlt, BiLogIn } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signinAction, {
    ok: false,
    error: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state.ok) {
      router.replace(state.redirectTo || "/dashboard");
    }
  }, [state.ok, state.redirectTo, router]);

  // Shared styles
  const inputWrapperClass = "relative flex items-center";
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:bg-black/40";
  const iconClass =
    "absolute left-3.5 h-5 w-5 text-gray-400 dark:text-gray-500";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050505]">
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute right-[20%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:invert" />
      </div>

      <div className="container relative z-10 mx-auto flex w-full max-w-[420px] flex-col justify-center space-y-6 px-4">
        {/* --- Header --- */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-1">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Enter your credentials to access your account
            </motion.p>
          </div>
        </div>

        {/* --- Card --- */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
        >
          <form action={formAction} className="space-y-5">
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
                  placeholder="name@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div className={inputWrapperClass}>
                <BiLockAlt className={iconClass} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {(state?.error || state?.ok) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
                  state.error
                    ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                }`}
              >
                {state.error || "Login successful! Redirecting..."}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
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
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <BiLogIn className="h-5 w-5" />
                </span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">New here? </span>
            <Link
              href="/sign-up"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Create an account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninPage;
