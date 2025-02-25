export const runtime = "edge";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/libs/firebase/admin";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { type: "text" },
      },
      async authorize(credentials) {
        const { idToken } = credentials ?? {};
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            return {
              id: decoded.uid,
              uid: decoded.uid,
              email: decoded.email,
              name: decoded.name,
              emailVerified: !!decoded.email_verified,
            };
          } catch (err) {
            console.error(err);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.emailVerified = !!user.emailVerified;
        token.uid = user.uid;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.emailVerified = token.emailVerified;
        session.user.uid = token.uid;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
