import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { loginErrorCode } from "@/lib/authMessages";

// Carries a LOGIN_ERRORS key back to the sign-in action (as the `code` query
// param on the failure redirect) instead of the generic "CredentialsSignin".
class LoginError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
  }
}

async function failureFrom(res: Response): Promise<LoginError> {
  let detail = "";
  try {
    const body = await res.json();
    detail = typeof body?.detail === "string" ? body.detail : "";
  } catch {}
  return new LoginError(loginErrorCode(res.status, detail));
}

const TOKEN_REFRESH_AFTER_MS = 24 * 60 * 60 * 1000;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    // ── Password-based sign-in ────────────────────────────────────────────────
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ email: credentials.email, password: credentials.password }),
            cache:   "no-store",
          });

          if (!res.ok) {
            console.error("Sign-in failed:", res.status);
            throw await failureFrom(res);
          }

          const data = await res.json();
          if (!data?.access_token || !data?.user_id) return null;

          const isTeamMember = data.is_team_member === true;

          return {
            id:                   data.user_id,
            // For team members show their own name; for owners show company name
            name:                 isTeamMember ? (data.team_member_name ?? data.company_name) : data.company_name,
            email:                credentials.email as string,
            accessToken:          data.access_token,
            role:                 data.role,
            companyName:          data.company_name,
            has_paid_subscription: data.has_paid_subscription ?? false,
            subscription_type:    data.subscription_type ?? "free",
            is_team_member:       isTeamMember,
            team_member_email:    data.team_member_email ?? null,
            team_member_name:     data.team_member_name ?? null,
          };
        } catch (error) {
          if (error instanceof LoginError) throw error;
          console.error("Authorize crashed:", error);
          throw new LoginError("server_error");
        }
      },
    }),

    // ── Passwordless OTP sign-in ──────────────────────────────────────────────
    Credentials({
      id:   "otp-credentials",
      name: "OTP",
      credentials: {
        email:    { label: "Email", type: "email" },
        otp_code: { label: "OTP",   type: "text"  },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp_code) return null;

        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/verify-login-otp`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ email: credentials.email, otp_code: credentials.otp_code }),
            cache:   "no-store",
          });

          if (!res.ok) {
            console.error("OTP sign-in failed:", res.status);
            throw await failureFrom(res);
          }

          const data = await res.json();
          if (!data?.access_token || !data?.user_id) return null;

          const isTeamMember = data.is_team_member === true;

          return {
            id:                   data.user_id,
            name:                 isTeamMember ? (data.team_member_name ?? data.company_name) : data.company_name,
            email:                credentials.email as string,
            accessToken:          data.access_token,
            role:                 data.role,
            companyName:          data.company_name,
            has_paid_subscription: data.has_paid_subscription ?? false,
            subscription_type:    data.subscription_type ?? "free",
            is_team_member:       isTeamMember,
            team_member_email:    data.team_member_email ?? null,
            team_member_name:     data.team_member_name ?? null,
          };
        } catch (error) {
          if (error instanceof LoginError) throw error;
          console.error("OTP authorize crashed:", error);
          throw new LoginError("server_error");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // `user` is only set on the initial sign-in — copy everything into the token
      if (user) {
        token.id                   = user.id;
        token.accessToken          = user.accessToken;
        token.accessTokenIssuedAt  = Date.now();
        token.role                 = user.role;
        token.companyName          = user.companyName;
        token.has_paid_subscription = user.has_paid_subscription ?? false;
        token.subscription_type    = user.subscription_type ?? "free";
        token.is_team_member       = user.is_team_member ?? false;
        token.team_member_email    = user.team_member_email ?? null;
        token.team_member_name     = user.team_member_name ?? null;
        return token;
      }

      // Sliding session: while the user keeps using the app, swap the backend
      // token for a fresh one at most once a day. Every session read also
      // re-issues the cookie with a new 30-day expiry, so only 30 days of
      // inactivity signs someone out. Tokens issued before this existed have
      // no issue time and get refreshed on their next use.
      const issuedAt = (token.accessTokenIssuedAt as number | undefined) ?? 0;
      if (token.accessToken && Date.now() - issuedAt > TOKEN_REFRESH_AFTER_MS) {
        try {
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
            method:  "POST",
            headers: { Authorization: `Bearer ${token.accessToken}` },
            cache:   "no-store",
          });
          if (res.status === 401) return null; // expired, disabled or revoked — sign out
          if (res.ok) {
            const data = await res.json();
            if (data?.access_token) {
              token.accessToken         = data.access_token;
              token.accessTokenIssuedAt = Date.now();
            }
          }
        } catch {
          // Backend unreachable — keep the current token and try again later.
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id                   = token.id as string;
      session.user.accessToken          = token.accessToken as string;
      session.user.role                 = (token.role as string) ?? "organization";
      session.user.companyName          = (token.companyName as string) ?? "";
      session.user.has_paid_subscription = (token.has_paid_subscription as boolean) ?? false;
      session.user.subscription_type    = (token.subscription_type as string) ?? "free";
      session.user.is_team_member       = (token.is_team_member as boolean) ?? false;
      session.user.team_member_email    = (token.team_member_email as string | null) ?? null;
      session.user.team_member_name     = (token.team_member_name as string | null) ?? null;
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error:  "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // Cookies aren't isolated per port, so on localhost another app's (or an
  // older run's) default `authjs.session-token` cookie — encrypted with a
  // different secret — keeps colliding with this one and the session fails
  // to decrypt, bouncing every dashboard click back to "/". Use an
  // app-specific name in development only; production keeps the defaults so
  // live sessions are unaffected.
  ...(process.env.NODE_ENV !== "production" && {
    cookies: {
      sessionToken: {
        name: "goconverto-dev.session-token",
        options: { httpOnly: true, sameSite: "lax" as const, path: "/", secure: false },
      },
    },
  }),
});
