"use server";

import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";

const API = `${process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com"}/api/v1`;

// ── Types ─────────────────────────────────────────────────────────────────────

export type ActionResult = { success: boolean; message: string };
export type SigninResult = { ok: boolean; error?: string; redirectTo?: string };

// ── Step 1: Submit signup form → backend stores temp data + sends OTP ────────

export async function signupAction(data: {
  company_name: string;
  company_type: string;
  company_website: string;
  email: string;
  password: string;
}): Promise<ActionResult> {
  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const body = await res.json();
    if (!res.ok) {
      return { success: false, message: body.detail || "Failed to send OTP." };
    }
    return {
      success: true,
      message: body.message || "OTP sent to your email.",
    };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}

// ── Step 2: Verify OTP → backend creates user + returns JWT ──────────────────

export async function verifyOTPAction(
  email: string,
  otp_code: string,
): Promise<ActionResult & { token?: string; user_id?: string }> {
  try {
    const res = await fetch(`${API}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp_code }),
      cache: "no-store",
    });
    const body = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: body.detail || "OTP verification failed.",
      };
    }
    // Save token in httpOnly cookie
    if (body.access_token) {
      const cookieStore = await cookies();
      cookieStore.set("access_token", body.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
      cookieStore.set("user_id", body.user_id || "", { path: "/" });
      cookieStore.set("company_name", body.company_name || "", { path: "/" });
    }
    return {
      success: true,
      message: body.message || "Account created successfully!",
      token: body.access_token,
      user_id: body.user_id,
    };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}

// ── Sign in via NextAuth Credentials → session maintained by NextAuth ─────────
// NextAuth's signIn() calls authorize() in auth.ts which hits the FastAPI backend.
// On success, NextAuth sets an encrypted JWT session cookie automatically.

export async function signinAction(
  prevState: SigninResult,
  formData: FormData,
): Promise<SigninResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard";

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { ok: true, redirectTo: callbackUrl };
  } catch (error: any) {
    // NextAuth throws a specific error string on failed credentials
    const msg: string = error?.message || "";
    if (
      msg.includes("CredentialsSignin") ||
      msg.includes("credentials") ||
      error?.type === "CredentialsSignin"
    ) {
      return { ok: false, error: "Invalid email or password." };
    }
    return { ok: false, error: "An error occurred. Please try again." };
  }
}

// ── Sign out ──────────────────────────────────────────────────────────────────

export async function signoutAction(): Promise<void> {
  await signOut({ redirectTo: "/sign-in" });
}
