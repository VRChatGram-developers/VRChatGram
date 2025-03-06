import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig, Session } from "next-auth";
// import { auth as adminAuth } from "@/libs/firebase/admin";
import { verifyIdToken } from "@/libs/firebase/firebase-auth-for-edge";
import NextAuth from "next-auth";

export const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || "kp7YkqQ9YJQQUT5KwFUsnohBcmecG7G5VHSCLsrF/wA=",
  providers: [
    CredentialsProvider({
      credentials: {
        idToken: { type: "text" },
      },
      async authorize(credentials) {
        const { idToken } = credentials ?? {};
        if (idToken) {
          try {
            const decoded = await verifyIdToken(idToken as string);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.emailVerified = token.emailVerified as boolean;
        session.user.uid = token.uid as string;
      }
      return session;
    },
  },
};

export const { auth, handlers } = NextAuth(authOptions);
