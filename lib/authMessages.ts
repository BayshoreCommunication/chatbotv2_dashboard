// One place for every "why couldn't I get in" message, so the sign-in form,
// the middleware redirects and the toast all say the same thing.

export const AUTH_NOTICES: Record<string, string> = {
  session_expired:
    "Your session has expired. Please sign in again.",
  server_unavailable:
    "We couldn't reach the server. Please try again in a moment.",
  owner_only:
    "Billing is only available to the account owner.",
  subscription_required:
    "You need an active plan to open the dashboard. Start your free trial to continue.",
};

export const LOGIN_ERRORS: Record<string, string> = {
  invalid_credentials: "Invalid email or password.",
  invalid_code: "That code isn't right. Check the email and try again.",
  code_expired: "That code has expired or was used too many times. Request a new one.",
  account_not_found: "No account found with this email.",
  not_verified: "Please verify your email before signing in.",
  account_disabled: "Your account has been disabled. Contact support.",
  server_error: "We couldn't reach the server. Please try again in a moment.",
};

/** Turn a backend sign-in failure (status + detail text) into a LOGIN_ERRORS key. */
export function loginErrorCode(status: number, detail: string): string {
  const d = detail.toLowerCase();
  if (status >= 500) return "server_error";
  if (d.includes("disabled")) return "account_disabled";
  if (d.includes("verify")) return "not_verified";
  if (d.includes("expired") || d.includes("request a sign-in code")) return "code_expired";
  if (d.includes("invalid otp")) return "invalid_code";
  if (status === 404) return "account_not_found";
  return "invalid_credentials";
}
