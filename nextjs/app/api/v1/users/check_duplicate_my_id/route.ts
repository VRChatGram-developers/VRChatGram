import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";


export async function POST(request: Request) {
  const { my_id } = await request.json();
  const user = await prisma.users.findUnique({
    where: { my_id: my_id },
  });
  if (user) {
    return NextResponse.json({ isRegisteredMyId: true });
  }
  return NextResponse.json({ isRegisteredMyId: false });
}
