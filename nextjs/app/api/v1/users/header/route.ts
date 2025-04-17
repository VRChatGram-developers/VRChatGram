import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/libs/firebase/auth";

export const runtime = "edge";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "ログインしていません" }, { status: 401 });
  }

  const user = await prisma.users.findFirst({
    where: { uid: session.user.uid },
    select: {
      id: true,
      header_url: true,
      profile_url: true,
      name: true,
      my_id: true,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
