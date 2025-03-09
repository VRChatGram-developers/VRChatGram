import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

function generateRandomId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function generateUniqueMyId(): Promise<string> {
  while (true) {
    const myId = generateRandomId();
    const existingUser = await prisma.users.findUnique({
      where: { my_id: myId },
    });

    if (!existingUser) {
      const secondTryId = generateRandomId(); 
      return secondTryId;
    }
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, gender, profile_url, uid } = await request.json();

    await prisma.users.create({
      data: {
        name: name,
        email: email,
        gender: gender,
        profile_url: profile_url,
        status: "active",
        birthday: new Date(),
        my_id: await generateUniqueMyId(),
        show_sensitive_type: "default",
        uid: uid,
      },
    });

    return NextResponse.json({ message: "ユーザー作成しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}
