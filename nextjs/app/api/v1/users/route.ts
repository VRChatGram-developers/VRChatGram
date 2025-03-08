import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const runtime = "edge";

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
        my_id: "my_id",
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
