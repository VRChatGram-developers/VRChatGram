import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "postIdが指定されていません" }, { status: 400 });
    }

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId },
    });

    const session = await auth();
    if (!session) {
      await prisma.posts.update({
        where: { id: postId },
        data: {
          view_count: post.view_count + 1,
        },
      });
      return NextResponse.json({ error: "view_countを増やしました" }, { status: 200 });
    }

    const user = await prisma.users.findUniqueOrThrow({
      where: { uid: session.user.uid },
    });

    const viewsCount = await prisma.views.count({
      where: {
        user_id: user.id,
      },
    });

    // 無課金ユーザーの場合は20件までしか閲覧できないようにする
    if (viewsCount >= 20) {
      return NextResponse.json({ error: "閲覧回数が20回を超えました" }, { status: 200 });
    }

    const views = await prisma.views.findFirst({
      where: {
        post_id: postId,
        user_id: user.id,
      },
    });

    if (views) {
      return NextResponse.json({ error: "すでに閲覧しています" }, { status: 200 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.posts.update({
        where: { id: postId },
        data: {
          view_count: post.view_count + 1,
        },
      });

      await tx.views.create({
        data: {
          post_id: post.id,
          user_id: user.id,
        },
      });
    });

    return NextResponse.json({ message: "閲覧しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
