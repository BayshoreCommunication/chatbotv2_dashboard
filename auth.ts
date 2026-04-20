import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
 
        try {
          console.log("Attempting sign-in for:", credentials.email, "at", `${BACKEND_URL}/api/v1/auth/signin`);
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            cache: "no-store",
          });
 
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Sign-in failed with status:", res.status, errorText);
            return null;
          }
 
          const data = await res.json();
          console.log("Sign-in response data received successfully");
 
          if (!data?.access_token || !data?.user_id) {
            console.error("Response missing required fields:", data);
            return null;
          }

          return {
            id: data.user_id,
            email: credentials.email as string,
            name: data.company_name,
            accessToken: data.access_token,
            role: data.role,
            companyName: data.company_name,
            has_paid_subscription: data.has_paid_subscription ?? false,
            subscription_type: data.subscription_type ?? "free",
          };
        } catch (error) {
          console.error("Authorize function crashed:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.companyName = (user as any).companyName;
        token.has_paid_subscription = (user as any).has_paid_subscription ?? false;
        token.subscription_type = (user as any).subscription_type ?? "free";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).role = token.role;
        (session.user as any).companyName = token.companyName;
        (session.user as any).has_paid_subscription = token.has_paid_subscription;
        (session.user as any).subscription_type = token.subscription_type;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days — matches ACCESS_TOKEN_EXPIRE_MINUTES in backend
  },
});
