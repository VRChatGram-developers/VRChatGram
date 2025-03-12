import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request) {
  const { email } = await request.json();

  const user = await prisma.users.findFirst({
    where: { email: email },
  });

  return NextResponse.json({ isRegisteredEnail: user ? true : false });
}
