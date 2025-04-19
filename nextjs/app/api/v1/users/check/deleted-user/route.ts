import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request) {
  const { email } = await request.json();
  const user = await prisma.users.findFirst({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json({ isDeleted: false }, { status: 200 });
  }

  if (user.status === "deleted") {
    return NextResponse.json({ isDeleted: true }, { status: 200 });
  }

  return NextResponse.json({ isDeleted: false }, { status: 200 });
}
