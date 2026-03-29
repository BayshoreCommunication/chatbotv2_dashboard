import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

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
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            cache: "no-store",
          });

          if (!res.ok) return null;

          const data = await res.json();

          // FastAPI returns: access_token, user_id, company_name, role
          if (!data?.access_token || !data?.user_id) return null;

          return {
            id: data.user_id,
            email: credentials.email as string,
            name: data.company_name,
            accessToken: data.access_token,
            role: data.role,
            companyName: data.company_name,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, user object is present — persist it in the token
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
        token.companyName = (user as any).companyName;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose data to useSession / getServerSession
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).role = token.role;
        (session.user as any).companyName = token.companyName;
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
