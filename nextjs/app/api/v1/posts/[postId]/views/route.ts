import { NextResponse } from "next/server";
import { auth } from "@/libs/firebase/auth";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    }
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "postIdが指定されていません" }, { status: 400 });
    }

    const user = await prisma.users.findUniqueOrThrow({
      where: { uid: session.user.uid },
    });

    const views = await prisma.views.findFirst({
      where: {
        post_id: postId,
        user_id: user.id,
      },
    });

    if (views) {
      return NextResponse.json({ error: "すでに閲覧しています" }, { status: 400 });
    }

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: postId },
    });

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
