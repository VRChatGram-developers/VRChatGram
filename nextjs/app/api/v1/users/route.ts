import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request) {
  try {
    await connect();
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

    await connect();
    return NextResponse.json({ message: "ユーザー作成しました" });
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
}


