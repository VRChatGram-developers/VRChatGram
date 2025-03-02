import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return new Error(`DB接続失敗しました: ${error}`);
  }
};

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await connect();
    const { id } = params;

    const session = await getServerSession(authOptions);
    let currentUser;
    if (session) {
      currentUser = await prisma.users.findUnique({
        where: {
          uid: session.user.uid,
        },
        select: {
          id: true,
        },
      });
    }

    if (!id) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    if (!currentUser) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    await prisma.follows.create({
      data: {
        following_id: id,
        follower_id: currentUser.id,
      },
    });

    await connect();
    return NextResponse.json({ message: "フォローしました" });
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

    const session = await getServerSession(authOptions);
    let currentUser;
    if (session) {
      currentUser = await prisma.users.findUnique({
        where: {
          uid: session.user.uid,
        },
        select: {
          id: true,
        },
      });
    }

    if (!currentUser) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const followUser = await prisma.follows.findFirst({
      where: {
        following_id: id,
        follower_id: currentUser.id,
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
