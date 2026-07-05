import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
            console.error("Sign-in failed:", res.status, await res.text());
            return null;
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
          console.error("Authorize crashed:", error);
          return null;
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
            console.error("OTP sign-in failed:", res.status, await res.text());
            return null;
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
          console.error("OTP authorize crashed:", error);
          return null;
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
        token.role                 = user.role;
        token.companyName          = user.companyName;
        token.has_paid_subscription = user.has_paid_subscription ?? false;
        token.subscription_type    = user.subscription_type ?? "free";
        token.is_team_member       = user.is_team_member ?? false;
        token.team_member_email    = user.team_member_email ?? null;
        token.team_member_name     = user.team_member_name ?? null;
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
});
