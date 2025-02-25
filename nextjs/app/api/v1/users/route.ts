export const runtime = 'edge';

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
    return new Response(JSON.stringify({ message: "ユーザー作成しました" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: `DB接続失敗しました: ${error}` }), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connect();
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "idが指定されていません" }), { status: 400 });
    }
    const followUser = await prisma.follows.findFirst({
      where: {
        following_id: BigInt(Number(id)),
        follower_id: 1,
      },
    });
    if (!followUser) {
      return new Response(JSON.stringify({ message: "フォローユーザー見つかりません" }), {
        status: 404,
      });
    }
    await prisma.follows.delete({
      where: {
        id: followUser.id,
      },
    });
    return new Response(JSON.stringify({ message: "フォロー解除しました" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: `DB接続失敗しました: ${error}` }), { status: 500 });
  }
}


