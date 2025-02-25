
export const runtime = 'edge';

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request) {
  await connect();
  const { email } = await request.json();

  const user = await prisma.users.findFirst({
    where: { email: email },
  });

  return NextResponse.json({ isRegisteredEnail: user ? true : false });
}
