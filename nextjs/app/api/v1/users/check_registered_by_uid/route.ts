import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request) {
  const { uid } = await request.json();

  const user = await prisma.users.findFirst({
    where: { uid: uid },
  });

  return NextResponse.json({ isRegisteredByUid: user ? true : false });
}
