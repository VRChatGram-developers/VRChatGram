import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    const currentUser = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const { blockedUserMyId } = await request.json();

    const blockedUser = await prisma.users.findUnique({
      where: {
        my_id: blockedUserMyId,
      },
    });

    if (!blockedUser) {
      return NextResponse.json(
        { error: "ブロックされたユーザーが見つかりません" },
        { status: 404 }
      );
    }

    await prisma.block_users.create({
      data: {
        blocker_user_id: currentUser.id,
        blocked_user_id: blockedUser.id,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ message: "ブロックしました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ユーザーがログインしていません" }, { status: 401 });
    }

    const currentUser = await prisma.users.findUnique({
      where: {
        uid: session.user.uid,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    const { blockedUserMyId } = await request.json();

    const blockedUser = await prisma.users.findUnique({
      where: {
        my_id: blockedUserMyId,
      },
    });

    if (!blockedUser) {
      return NextResponse.json(
        { error: "ブロックされたユーザーが見つかりません" },
        { status: 404 }
      );
    }
    await prisma.block_users.deleteMany({
      where: {
        blocker_user_id: currentUser.id,
        blocked_user_id: blockedUser.id,
      },
    });

    return NextResponse.json({ message: "ブロックを解除しました" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to connect to database ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
