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
    const { name, password, email, introduce, gender, profile_url, uid } = await request.json();

    // TODO パスワードをHash化
    await prisma.users.create({
      data: {
        name: name,
        password: password,
        email: email,
        introduce: introduce,
        gender: gender,
        profile_url: profile_url,
        status: "active",
        birthday: new Date(),
        my_id: "my_id",
        show_sensitive: false,
        uid: uid,
      },
    });

    return NextResponse.json({ message: "ユーザー作成しました" });
  } catch (error) {
    return NextResponse.json({ error: `ユーザー作成に失敗しました: ${error}` }, { status: 500 });
  }
}
