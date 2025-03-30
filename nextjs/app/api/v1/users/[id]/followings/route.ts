import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

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

    return NextResponse.json({ message: "フォローしました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
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
    console.error(error);
    return NextResponse.json({ error: "DB接続失敗しました" }, { status: 500 });
  }
}
