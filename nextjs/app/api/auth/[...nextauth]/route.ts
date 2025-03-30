import NextAuth from "next-auth";
import { authOptions } from "@/libs/firebase/auth";

export const runtime = "edge";
const {
  handlers: { GET, POST },
} = NextAuth(authOptions);

export { GET, POST };
