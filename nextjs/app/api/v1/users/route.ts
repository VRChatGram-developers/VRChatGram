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

    await connect();
    return NextResponse.json({ message: "ユーザー作成しました" });
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }
    const followUser = await prisma.follows.findFirst({
      where: {
        following_id: BigInt(Number(id)),
        follower_id: 1,
      },
    });
    if (!followUser) {
      return NextResponse.json({ message: "フォローユーザー見つかりません" }, { status: 404 });
    }
    await prisma.follows.delete({
      where: {
        id: followUser.id,
      },
    });
    return NextResponse.json({ message: "フォロー解除しました" });
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
}


