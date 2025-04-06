import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request, { params }: { params: Promise<{ myId: string }> }) {
  try {
    const { myId } = await params;

    const session = await auth();
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

    if (!myId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    if (!currentUser) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }

    const followingUser = await prisma.users.findUniqueOrThrow({
      where: {
        my_id: myId,
      },
      select: {
        id: true,
      },
    });

    await prisma.follows.create({
      data: {
        following_id: followingUser?.id,
        follower_id: currentUser.id,
      },
    });

    return NextResponse.json({ message: "フォローしました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ myId: string }> }) {
  try {
    const { myId } = await params;
    if (!myId) {
      return NextResponse.json({ error: "idが指定されていません" }, { status: 400 });
    }

    const session = await auth();
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

    const unfollowingUser = await prisma.users.findUniqueOrThrow({
      where: {
        my_id: myId,
      },
      select: {
        id: true,
      },
    });

    const followUser = await prisma.follows.findFirst({
      where: {
        following_id: unfollowingUser.id,
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
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}
