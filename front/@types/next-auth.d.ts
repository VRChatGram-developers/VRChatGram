import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      emailVerified: boolean;
      uid: string;
    } & DefaultSession["user"];
  }
  interface User {
    emailVerified: boolean;
    uid: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    emailVerified: boolean;
    uid: string;
  }
}
