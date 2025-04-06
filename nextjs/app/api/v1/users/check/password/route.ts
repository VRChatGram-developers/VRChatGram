import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";
import { auth as authClient } from "@/libs/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export const runtime = "edge";

export async function POST(request: Request) {
  const { password } = await request.json();

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "ログインしていません" }, { status: 401 });
  }

  const userHasEmail = await prisma.users.findUniqueOrThrow({
    where: { uid: session.user.uid },
    select: {
      email: true,
    },
  });

  const token = await signInWithEmailAndPassword(authClient, userHasEmail.email, password);
  return NextResponse.json({ isPasswordValid: token ? true : false });
}
